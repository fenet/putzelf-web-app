import { Helmet } from "react-helmet-async";

function joinTitle(parts) {
  return parts.filter(Boolean).join(" | ");
}

function getOrigin() {
  if (typeof window === "undefined") return "";
  return window.location?.origin || "";
}

export default function Seo({
  title,
  description,
  path = "/",
  imagePath = "/logo.png",
  noindex = false,
}) {
  const origin = getOrigin();
  const canonical = origin ? `${origin}${path}` : path;
  const image = origin ? `${origin}${imagePath}` : imagePath;

  const fullTitle = joinTitle([title, "PutzELF"]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={canonical} />

      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
