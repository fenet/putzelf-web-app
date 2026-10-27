import { Helmet } from "react-helmet-async";
import StructuredData from "./StructuredData";
import { buildSiteStructuredData, siteOrigin } from "../lib/seoStructuredData";

const defaultImagePath = "/logo-resize.png";
const brandName = "PutzELF";

function formatTitle(value) {
  const title = String(value || "").trim();
  if (!title) return brandName;

  const firstBrand = title.match(/\bPutzELF\b/i);
  if (!firstBrand || firstBrand.index === undefined) return `${title} | ${brandName}`;

  const brandEnd = firstBrand.index + firstBrand[0].length;
  const prefix = `${title.slice(0, firstBrand.index)}${brandName}`;
  const suffix = title
    .slice(brandEnd)
    .replace(/\bPutzELF\b/gi, "")
    .replace(/([|–—])\s*(?:[|–—]\s*)+/g, "$1 ")
    .replace(/(?:\s*[|–—]\s*)+$/g, "");

  return `${prefix}${suffix}`.trim() || brandName;
}

function absoluteHttpUrl(value, fallbackPath = defaultImagePath) {
  try {
    const url = new URL(value || fallbackPath, `${siteOrigin}/`);
    if (url.protocol === "http:" || url.protocol === "https:") return url.href;
  } catch {}
  return new URL(fallbackPath, `${siteOrigin}/`).href;
}

export default function Seo({
  title,
  description,
  path = "/",
  lang,
  alternates,
  xDefaultPath,
  imagePath = defaultImagePath,
  imageAlt = "PutzELF brand image",
  type = "website",
  noindex = false,
  pageSchemas = [],
  mainEntityId,
  breadcrumbs = [],
}) {
  const canonical = absoluteHttpUrl(path || "/");
  const image = absoluteHttpUrl(imagePath);

  // Normalize every route to one brand suffix, including already branded titles.
  const fullTitle = formatTitle(title);

  const langForData = lang || "de";
  const siteName = "PutzELF";
  const siteJsonLd = buildSiteStructuredData({
    canonical,
    title: fullTitle,
    description,
    lang: langForData,
    pageSchemas,
    mainEntityId,
    breadcrumbs: breadcrumbs.map((item) => ({
      ...item,
      url: absoluteHttpUrl(item.url),
    })),
  });

  return (
    <>
      <Helmet defer={false}>
        {lang ? <html lang={lang} /> : null}
        <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={canonical} />
      {alternates?.de ? <link rel="alternate" hrefLang="de" href={absoluteHttpUrl(alternates.de)} /> : null}
      {alternates?.en ? <link rel="alternate" hrefLang="en" href={absoluteHttpUrl(alternates.en)} /> : null}
      {xDefaultPath ? <link rel="alternate" hrefLang="x-default" href={absoluteHttpUrl(xDefaultPath)} /> : null}

      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={langForData === "de" ? "de_AT" : "en_US"} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      </Helmet>
      {/* Keep site and route entities together in the server-rendered JSON-LD graph. */}
      <StructuredData json={siteJsonLd} id="site-jsonld" />
    </>
  );
}
