import { Helmet } from "react-helmet-async";
import StructuredData from "./StructuredData";
import i18n from "../i18n";
import { serviceCatalog } from "../data/servicesData";

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
  lang,
  alternates,
  xDefaultPath,
  imagePath = "/logo.png",
  noindex = false,
}) {
  const origin = getOrigin();
  const canonical = origin ? `${origin}${path}` : path;
  const image = origin ? `${origin}${imagePath}` : imagePath;

  const fullTitle = joinTitle([title, "PutzELF"]);

  // Build basic site-level JSON-LD (localized)
  const langForData = lang || "de";
  const siteName = "PutzELF";
  const descriptionLocalized = i18n.t("hero.subtitle", { lng: langForData, defaultValue: description || "" });
  const addressLocalized = i18n.t("imprint.hqValue", { lng: langForData, defaultValue: null });
  const phone = i18n.t("nav.phone", { lng: langForData });
  const email = i18n.t("nav.email", { lng: langForData });

  const originForData = origin || getOrigin();
  const logoUrl = originForData ? `${originForData}/logo.png` : "/logo.png";

  const services = (serviceCatalog[langForData] || serviceCatalog.de) || {};
  const areaServed = [];
  if (services.wien && services.wien.length) areaServed.push(langForData === "de" ? "Wien" : "Vienna");
  if (services.graz && services.graz.length) areaServed.push("Graz");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: originForData || undefined,
    logo: logoUrl,
    sameAs: [
      "https://www.instagram.com/putzelf11/",
      "https://www.facebook.com/profile.php?id=61580613673114",
      "https://www.linkedin.com/in/putz-elf-wien1110/",
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: siteName,
    description: descriptionLocalized || undefined,
    url: canonical,
    telephone: phone || undefined,
    email: email || undefined,
    image: logoUrl,
    areaServed: areaServed.length ? areaServed : undefined,
    address: addressLocalized ? { "@type": "PostalAddress", streetAddress: addressLocalized } : undefined,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: fullTitle,
    url: originForData ? `${originForData}${path}` : path,
    inLanguage: langForData,
  };

  const siteJsonLd = [organization, localBusiness, websiteSchema];

  return (
    <>
      <Helmet>
        {lang ? <html lang={lang} /> : null}
        <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={canonical} />
      {alternates?.de ? <link rel="alternate" hrefLang="de" href={origin ? `${origin}${alternates.de}` : alternates.de} /> : null}
      {alternates?.en ? <link rel="alternate" hrefLang="en" href={origin ? `${origin}${alternates.en}` : alternates.en} /> : null}
      {xDefaultPath ? <link rel="alternate" hrefLang="x-default" href={origin ? `${origin}${xDefaultPath}` : xDefaultPath} /> : null}

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
      {/* Inject site-level JSON-LD via StructuredData component. Pages can add page-specific JSON-LD separately. */}
      <StructuredData json={siteJsonLd} id="site-jsonld" />
    </>
  );
}
