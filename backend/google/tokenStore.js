import fs from "fs";
import path from "path";

// Development-only token store. Stores tokens to backend/google_tokens.json.
// PRODUCTION: replace with secure storage (encrypted DB, secrets manager).

const STORE_PATH = path.resolve(new URL("./../google_tokens.json", import.meta.url).pathname);

function readStore() {
  try {
    if (!fs.existsSync(STORE_PATH)) return {};
    const raw = fs.readFileSync(STORE_PATH, "utf8");
    return JSON.parse(raw || "{}");
  } catch (err) {
    console.warn("Failed to read token store:", err.message);
    return {};
  }
}

function writeStore(obj) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(obj, null, 2), { mode: 0o600 });
  } catch (err) {
    console.error("Failed to write token store:", err.message);
  }
}

export function saveTokens(key, tokens) {
  const store = readStore();
  store[key] = { ...tokens, savedAt: new Date().toISOString() };
  writeStore(store);
}

export function getTokens(key) {
  const store = readStore();
  return store[key] || null;
}

export function clearTokens(key) {
  const store = readStore();
  delete store[key];
  writeStore(store);
}

export default { saveTokens, getTokens, clearTokens };
