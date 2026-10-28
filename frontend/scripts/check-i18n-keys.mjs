import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import babelParser from "@babel/parser";

const { parse } = babelParser;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const i18nPath = path.resolve(scriptDirectory, "../src/i18n.js");
const source = fs.readFileSync(i18nPath, "utf8");
const ast = parse(source, { sourceType: "module" });

function propertyName(property) {
  if (!property || property.type !== "ObjectProperty") return null;
  if (!property.computed && property.key.type === "Identifier") return property.key.name;
  if (property.key.type === "StringLiteral" || property.key.type === "NumericLiteral") {
    return String(property.key.value);
  }
  return null;
}

function getProperty(objectNode, name) {
  if (!objectNode || objectNode.type !== "ObjectExpression") return null;
  const property = objectNode.properties.find((candidate) => propertyName(candidate) === name);
  return property?.value || null;
}

const resourcesDeclaration = ast.program.body
  .flatMap((statement) => statement.type === "VariableDeclaration" ? statement.declarations : [])
  .find((declaration) => declaration.id.type === "Identifier" && declaration.id.name === "resources");

if (!resourcesDeclaration?.init || resourcesDeclaration.init.type !== "ObjectExpression") {
  throw new Error(`Could not locate the resources object in ${i18nPath}`);
}

function collectObjectShapes(node, prefix, shapes) {
  if (node?.type === "ArrayExpression") {
    node.elements.forEach((element) => collectObjectShapes(element, prefix, shapes));
    return;
  }

  if (node?.type !== "ObjectExpression") return;

  const entries = node.properties
    .map((property) => [propertyName(property), property])
    .filter(([name]) => name !== null);
  const shape = shapes.get(prefix) || new Set();
  entries.forEach(([name]) => shape.add(name));
  shapes.set(prefix, shape);

  entries.forEach(([name, property]) => {
    const childPath = prefix ? `${prefix}.${name}` : name;
    collectObjectShapes(property.value, childPath, shapes);
  });
}

function memberPath(node) {
  if (node?.type === "Identifier") return [node.name];
  if (node?.type !== "MemberExpression") return null;

  const parentPath = memberPath(node.object);
  let property;
  if (!node.computed && node.property.type === "Identifier") property = node.property.name;
  else if (node.computed && node.property.type === "StringLiteral") property = node.property.value;
  if (!parentPath || property === undefined) return null;
  return [...parentPath, property];
}

const localeShapes = {};
for (const locale of ["en", "de"]) {
  const localeNode = getProperty(resourcesDeclaration.init, locale);
  const translationNode = getProperty(localeNode, "translation");
  if (!translationNode) throw new Error(`Missing ${locale}.translation in ${i18nPath}`);
  localeShapes[locale] = new Map();
  collectObjectShapes(translationNode, "", localeShapes[locale]);
}

// Include locale resources added after the initial object literal, such as services.overview.
function collectResourceAssignments(node) {
  if (!node || typeof node !== "object") return;

  if (node.type === "AssignmentExpression" && node.operator === "=") {
    const pathParts = memberPath(node.left);
    if (
      pathParts?.[0] === "resources" &&
      ["en", "de"].includes(pathParts[1]) &&
      pathParts[2] === "translation" &&
      node.right.type === "ObjectExpression"
    ) {
      const pathWithinTranslation = pathParts.slice(3).join(".");
      collectObjectShapes(node.right, pathWithinTranslation, localeShapes[pathParts[1]]);
    }
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === "loc" || key === "start" || key === "end") continue;
    if (Array.isArray(value)) value.forEach(collectResourceAssignments);
    else if (value && typeof value === "object") collectResourceAssignments(value);
  }
}

collectResourceAssignments(ast.program);

function translationPaths(shapes) {
  const paths = new Set();
  for (const [objectPath, keys] of shapes) {
    for (const key of keys) paths.add(objectPath ? `${objectPath}.${key}` : key);
  }
  return paths;
}

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(entryPath);
    return /\.jsx?$/.test(entry.name) ? [entryPath] : [];
  });
}

function translationCallName(callee) {
  if (callee?.type === "Identifier" && callee.name === "t") return true;
  return callee?.type === "MemberExpression" &&
    !callee.computed &&
    callee.property.type === "Identifier" &&
    callee.property.name === "t";
}

function literalTranslationKey(argument) {
  if (argument?.type === "StringLiteral") return argument.value;
  if (argument?.type === "TemplateLiteral" && argument.expressions.length === 0) {
    return argument.quasis.map((quasi) => quasi.value.cooked || "").join("");
  }
  return null;
}

const staticReferences = [];
const sourceDirectory = path.resolve(scriptDirectory, "../src");
for (const filePath of sourceFiles(sourceDirectory)) {
  const fileAst = parse(fs.readFileSync(filePath, "utf8"), {
    sourceType: "unambiguous",
    plugins: ["jsx"]
  });

  function collectTranslationCalls(node) {
    if (!node || typeof node !== "object") return;
    if (node.type === "CallExpression" && translationCallName(node.callee)) {
      const key = literalTranslationKey(node.arguments[0]);
      if (key) staticReferences.push({ key, filePath, line: node.loc?.start.line || 1 });
    }

    for (const [key, value] of Object.entries(node)) {
      if (["loc", "start", "end", "leadingComments", "innerComments", "trailingComments"].includes(key)) continue;
      if (Array.isArray(value)) value.forEach(collectTranslationCalls);
      else if (value && typeof value === "object") collectTranslationCalls(value);
    }
  }

  collectTranslationCalls(fileAst.program);
}

const allPaths = new Set([...localeShapes.en.keys(), ...localeShapes.de.keys()]);
const problems = [];
for (const objectPath of allPaths) {
  const englishKeys = localeShapes.en.get(objectPath) || new Set();
  const germanKeys = localeShapes.de.get(objectPath) || new Set();
  const allKeys = new Set([...englishKeys, ...germanKeys]);

  for (const key of allKeys) {
    const fullKey = objectPath ? `${objectPath}.${key}` : key;
    if (!englishKeys.has(key)) problems.push(`Missing English key: ${fullKey}`);
    if (!germanKeys.has(key)) problems.push(`Missing German key: ${fullKey}`);
  }
}

const englishPaths = translationPaths(localeShapes.en);
const germanPaths = translationPaths(localeShapes.de);
for (const reference of staticReferences) {
  for (const [locale, paths] of [["English", englishPaths], ["German", germanPaths]]) {
    if (!paths.has(reference.key)) {
      const relativePath = path.relative(path.resolve(scriptDirectory, ".."), reference.filePath);
      problems.push(`Missing ${locale} key used in ${relativePath}:${reference.line}: ${reference.key}`);
    }
  }
}

if (problems.length) {
  console.error(`Found ${problems.length} locale key mismatch${problems.length === 1 ? "" : "es"}:`);
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exitCode = 1;
} else {
  console.log("English and German locale keys are in sync.");
}
