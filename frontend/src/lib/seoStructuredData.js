export const siteOrigin = String(import.meta.env.VITE_SITE_URL || "https://putzelf.com")
  .trim()
  .replace(/\/+$/, "");

export const siteHomeUrl = new URL("/de/", `${siteOrigin}/`).href;

export const schemaIds = {
  organization: `${siteOrigin}/#organization`,
  localBusiness: `${siteOrigin}/#localbusiness`,
  webSite: `${siteOrigin}/#website`,
  logo: `${siteOrigin}/#logo`,
};

const officialProfiles = [
  "https://www.instagram.com/putzelf11/",
  "https://www.facebook.com/profile.php?id=61580613673114",
];

const businessDescriptions = {
  de: "PutzELF bietet Reinigungsdienstleistungen für Privatkunden und Unternehmen in Wien und Graz samt Umgebung.",
  en: "PutzELF provides cleaning services for private customers and businesses in Vienna and Graz and surrounding areas.",
};

export function buildSiteStructuredData({
  canonical,
  title,
  description,
  lang = "de",
  pageSchemas = [],
  mainEntityId,
  breadcrumbs = [],
}) {
  const pageId = `${canonical}#webpage`;
  const breadcrumbSchema = breadcrumbs.length
    ? {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
    : null;

  const additionalNodes = pageSchemas.map((schema) => {
    const { "@context": _context, ...node } = schema;
    return node;
  });

  const page = {
    "@type": "WebPage",
    "@id": pageId,
    url: canonical,
    name: title,
    description: description || undefined,
    inLanguage: lang,
    isPartOf: { "@id": schemaIds.webSite },
    about: { "@id": schemaIds.localBusiness },
    publisher: { "@id": schemaIds.organization },
    mainEntity: mainEntityId ? { "@id": mainEntityId } : undefined,
    breadcrumb: breadcrumbSchema ? { "@id": breadcrumbSchema["@id"] } : undefined,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": schemaIds.organization,
        name: "PutzELF",
        legalName: "Sebastijan-Aleksandar Kerčulj, Einzelunternehmer",
        url: siteHomeUrl,
        logo: { "@id": schemaIds.logo },
        sameAs: officialProfiles,
      },
      {
        "@type": "LocalBusiness",
        "@id": schemaIds.localBusiness,
        name: "PutzELF",
        url: siteHomeUrl,
        description: businessDescriptions[lang] || businessDescriptions.de,
        telephone: "+436766300167",
        email: ["office@putzelf.com", "office.stmk@putzelf.com"],
        image: { "@id": schemaIds.logo },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Simmeringer Hauptstraße 24",
          postalCode: "1110",
          addressLocality: lang === "en" ? "Vienna" : "Wien",
          addressCountry: "AT",
        },
        areaServed: lang === "en"
          ? ["Vienna and surrounding areas", "Graz and surrounding areas"]
          : ["Wien samt Umgebung", "Graz samt Umgebung"],
        parentOrganization: { "@id": schemaIds.organization },
      },
      {
        "@type": "ImageObject",
        "@id": schemaIds.logo,
        url: new URL("/logo.png", `${siteOrigin}/`).href,
        contentUrl: new URL("/logo.png", `${siteOrigin}/`).href,
        caption: "PutzELF logo",
      },
      {
        "@type": "WebSite",
        "@id": schemaIds.webSite,
        name: "PutzELF",
        url: siteHomeUrl,
        inLanguage: ["de", "en"],
        publisher: { "@id": schemaIds.organization },
      },
      page,
      ...additionalNodes,
      ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ],
  };
}
