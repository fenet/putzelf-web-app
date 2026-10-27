import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResponsiveServiceImage from "../components/ResponsiveServiceImage";
import GoogleReviewsCarousel from "../components/GoogleReviewsCarousel";
import ExpectationsSection from "../components/ExpectationsSection";
import { getRouteKeyFromPathname, getLocalizedPath, getLocalizedAlternates, getLocaleFromPathname } from "../lib/localeRoutes";
import { schemaIds, siteOrigin } from "../lib/seoStructuredData";

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-cyan-700">
    <path d="m5 10 3 3 7-7" />
  </svg>
);

export default function ServiceGeneric() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const { t } = useTranslation();

  const match = getRouteKeyFromPathname(location.pathname);
  const key = match?.key || null;

  const translationMap = {
    privateMaintenance: ["services", "private", "maintenance"],
    privateDeep: ["services", "private", "deep"],
    privateResidential: ["services", "private", "residential"],
    privateConstruction: ["services", "private", "construction"],
    privateWindow: ["services", "private", "window"],
    privateIndustrial: ["services", "private", "industrial"],
    businessMaintenance: ["services", "business", "maintenance"],
    businessDeep: ["services", "business", "deep"],
    businessStaircase: ["services", "business", "staircase"],
    businessConstruction: ["services", "business", "construction"],
    businessWindow: ["services", "business", "window"],
    businessIndustrial: ["services", "business", "industrial"],
  };

  const pathSegments = translationMap[key] || ["services", "private", "maintenance"];
  const tBase = pathSegments.join(".");

  const title = t(`${tBase}.title`);
  const pageHeading = t(`${tBase}.pageHeading`, { defaultValue: title });
  const description = t(`${tBase}.description`);
  const features = t(`${tBase}.features`, { returnObjects: true }) || [];
  const painPoints = t(`${tBase}.painPoints`, { returnObjects: true }) || [];
  const solutionPoints = t(`${tBase}.solutionPoints`, { returnObjects: true }) || [];
  const processSteps = t(`${tBase}.process`, { returnObjects: true }) || [];
  const faqs = t(`${tBase}.faqs`, { returnObjects: true }) || [];

  const metaTitle = t(`${tBase}.metaTitle`, { defaultValue: `${title} – PutzELF` });
  const metaDescription = t(`${tBase}.metaDescription`, { defaultValue: description });

  const canonical = getLocalizedPath(locale, key);
  const canonicalUrl = new URL(canonical, `${siteOrigin}/`).href;

  const serviceJsonLd = {
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: title,
    serviceType: title,
    description: description || undefined,
    provider: { "@id": schemaIds.localBusiness },
    areaServed: locale === "en"
      ? ["Vienna and surrounding areas", "Graz and surrounding areas"]
      : ["Wien samt Umgebung", "Graz samt Umgebung"],
    url: canonicalUrl,
    inLanguage: locale,
  };

  const isWindowService = key === "privateWindow" || key === "businessWindow";
  // Use special residential images from the public folder for the private residential page
  const residentialImages = [
    "/resedential/a1.jpg",
    "/resedential/a2.jpg",
    "/resedential/a3.jpg",
    "/resedential/a4.jpg",
    "/resedential/a5.jpg"
  ];

  const isResidential = key === "privateResidential" || key === "businessResidential";
  // Per-service image mapping for non-residential services.
  // Keep residential behavior unchanged above.
  const serviceImages = {
    privateMaintenance: {
      hero: "/services/privateMaintenance/pm1.jpg",
      solution: "/services/privateMaintenance/pm2.jpg",
      gallery: [
        "/services/privateMaintenance/pm3.jpg",
        "/services/privateMaintenance/pm4.jpeg",
        "/services/privateMaintenance/pm5.jpeg",
        "/services/privateMaintenance/pm6.jpg",
        "/services/privateMaintenance/pm7.avif",
      ],
    },
    privateDeep: {
      hero: "/services/privateDeep/pd1.jpg",
      solution: "/services/privateDeep/pd2.jpg",
      gallery: [
        "/services/privateDeep/pd3.jpg",
        "/services/privateDeep/pd4.jpeg",
        "/services/privateDeep/pd5.jpeg",
        "/services/privateDeep/pd6.jpg",
      ],
    },
    privateConstruction: {
      hero: "/services/privateConstruction/pc1.jpeg",
      solution: "/services/privateConstruction/pc2.jpeg",
      gallery: [
        "/services/privateConstruction/pc3.jpeg",
        "/services/privateConstruction/pc4.jpeg",
        "/services/privateConstruction/pc5.jpg",
      ],
    },
    privateWindow: {
      hero: "/services/privateWindow/pw1.jpg",
      solution: "/services/privateWindow/pw2.jpg",
      gallery: [
        "/services/privateWindow/pw3.jpg",
        "/services/privateWindow/pw4.jpeg",
        "/services/privateWindow/pw5.jpeg",
        "/services/privateWindow/pw6.jpeg",
      ],
    },
    privateIndustrial: {
      hero: "/services/privateIndustrial/pi1.avif",
      solution: "/services/privateIndustrial/pi2.jpg",
      gallery: [
        "/services/privateIndustrial/pi3.jpg",
        "/services/privateIndustrial/pi4.jpeg",
        "/services/privateIndustrial/pi5.avif",
        "/services/privateIndustrial/pi6.jpg",
        "/services/privateIndustrial/pi7.jpg",
      ],
    },
    businessMaintenance: {
      hero: "/services/businessMaintenance/bm1.jpg",
      solution: "/services/businessMaintenance/bm2.png",
      gallery: [
        "/services/businessMaintenance/bm3.jpg",
        "/services/businessMaintenance/bm4.jpg",
        "/services/businessMaintenance/bm5.jpeg",
        "/services/businessMaintenance/bm6.jpeg",
        "/services/businessMaintenance/bm7.jpeg",
        "/services/businessMaintenance/bm8.jpeg",
      ],
    },
    businessDeep: {
      hero: "/services/businessDeep/bd1.jpg",
      solution: "/services/businessDeep/bd2.jpeg",
      gallery: [
        "/services/businessDeep/bd3.jpeg",
        "/services/businessDeep/bd4.jpeg",
        "/services/businessDeep/bd5.jpeg",
        "/services/businessDeep/bd6.jpg",
      ],
    },
    businessStaircase: {
      hero: "/services/businessStaircase/bs1.jpeg",
      solution: "/services/businessStaircase/bs2.jpeg",
      gallery: [
        "/services/businessStaircase/bs3.jpeg",
        "/services/businessStaircase/bs4.jpeg",
        "/services/businessStaircase/bs5.jpg",
        "/services/businessStaircase/bs6.jpg",
        "/services/businessStaircase/bs7.jpg",
      ],
    },
    businessConstruction: {
      hero: "/services/businessConstruction/bc1.png",
      solution: "/services/businessConstruction/bc2.jpeg",
      gallery: [
        "/services/businessConstruction/bc3.jpeg",
        "/services/businessConstruction/bc4.jpeg",
        "/services/businessConstruction/bc5.jpeg",
        "/services/businessConstruction/bc6.png",
      ],
    },
    businessWindow: {
      hero: "/services/businessWindow/bw1.jpeg",
      solution: "/services/businessWindow/bw2.jpeg",
      gallery: [
        "/services/businessWindow/bw3.jpeg",
        "/services/businessWindow/bw4.jpeg",
        "/services/businessWindow/bw5.jpeg",
        "/services/businessWindow/bw6.jpg",
        "/services/businessWindow/bw7.jpg",
        "/services/businessWindow/bw8.jpg",
        "/services/businessWindow/bw9.jpg",
      ],
    },
    businessIndustrial: {
      hero: "/services/businessIndustrial/bi1.jpg",
      solution: "/services/businessIndustrial/bi2.jpg",
      gallery: [
        "/services/businessIndustrial/bi3.jpeg",
        "/services/businessIndustrial/bi4.jpg",
        "/services/businessIndustrial/bi5.jpg",
        "/services/businessIndustrial/bi6.jpg",
      ],
    },
  };

  const mapped = serviceImages[key] || null;

  const heroImage = isWindowService
    ? (mapped?.hero || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80")
    : isResidential
    ? residentialImages[0]
    : (mapped?.hero || "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80");

  const solutionImage = isWindowService
    ? (mapped?.solution || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80")
    : isResidential
    ? residentialImages[1]
    : (mapped?.solution || "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80");

  const galleryImages = isResidential
    ? residentialImages
    : (mapped?.gallery || [
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      ]);

  const faqJson = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const serviceLabel = isWindowService ? t("services.ui.windowCleaning") : t("services.ui.service");
  const relatedServiceGroup = key?.startsWith("business")
    ? ["businessMaintenance", "businessDeep", "businessStaircase", "businessConstruction", "businessWindow", "businessIndustrial"]
    : ["privateMaintenance", "privateDeep", "privateResidential", "privateConstruction", "privateWindow", "privateIndustrial"];
  const relatedServices = relatedServiceGroup
    .filter((relatedKey) => relatedKey !== key)
    .slice(0, 3)
    .map((relatedKey) => ({
      key: relatedKey,
      title: t(`${(translationMap[relatedKey] || []).join(".")}.title`),
    }));

  return (
    <>
      <Navbar />

      <main className="bg-[#f5f4f1] text-slate-900">
        <Seo
          title={metaTitle}
          description={metaDescription}
          path={canonical}
          lang={locale}
          alternates={getLocalizedAlternates(location.pathname)}
          xDefaultPath={getLocalizedPath("de", key)}
          pageSchemas={[serviceJsonLd, ...(faqJson ? [faqJson] : [])]}
          mainEntityId={serviceJsonLd["@id"]}
          breadcrumbs={[
            { name: t("services.ui.home"), url: getLocalizedPath(locale, "home") },
            { name: t("nav.services"), url: getLocalizedPath(locale, "servicesOverview") },
            { name: title, url: canonical },
          ]}
        />

        <nav aria-label={t("services.ui.breadcrumb")} className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link to={getLocalizedPath(locale, "home")} className="hover:text-[#0097b2]">{t("services.ui.home")}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to={getLocalizedPath(locale, "servicesOverview")} className="hover:text-[#0097b2]">{t("nav.services")}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-slate-700">{title}</li>
          </ol>
        </nav>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        <section className="bg-gradient-to-br from-[#edf9f8] via-[#f7f8f6] to-[#eef4fb]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">{serviceLabel}</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-[4.25rem] lg:leading-[0.96]">
                {title}
              </h1>
              {description ? <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">{description}</p> : null}
              <div className="mt-6 inline-flex max-w-lg items-start gap-3 rounded-2xl border border-cyan-900/10 bg-white/75 px-4 py-3 shadow-sm">
                <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0097b2]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">{t("services.ui.coverageLabel")}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{t("services.ui.coverageText")}</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] bg-white/40 shadow-[0_30px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
              <ResponsiveServiceImage
                src={heroImage}
                alt={title}
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
              {pageHeading}
            </h2>

            <ol className="space-y-5">
              {painPoints.map((point, index) => (
                <li key={point} className="flex gap-4 border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
                  <span className="w-10 text-sm font-medium tracking-[0.2em] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                  <p className="max-w-2xl text-lg leading-7 text-slate-700">{point}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-[#eef8f8]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
            <div className="overflow-hidden rounded-[30px] ring-1 ring-slate-200/60">
              <ResponsiveServiceImage
                src={solutionImage}
                alt={title}
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">{t("services.ui.approach")}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
                {t(`${tBase}.solutionTitle`)}
              </h3>

              <ul className="mt-8 space-y-4">
                {solutionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 border-b border-slate-200/80 pb-4 last:border-b-0 last:pb-0">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-cyan-700 ring-1 ring-cyan-200">
                      <CheckIcon />
                    </span>
                    <span className="text-base leading-7 text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
                  {t("services.whatWeOffer")}
                </h3>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <div key={feature} className="pt-1">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-600" aria-hidden="true" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{t("services.ui.service")}</span>
                  </div>
                  <p className="max-w-xs text-lg leading-7 text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-[#f7f7f5]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
                  {t(`${tBase}.processTitle`)}
                </h3>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-start gap-4">
                {processSteps.map((step, index) => (
                  <React.Fragment key={step.title || index}>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold tracking-[0.2em] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                        <div className="h-px flex-1 bg-slate-300" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="space-y-5 md:hidden">
              {processSteps.map((step, index) => (
                <div key={step.title || index} className="flex gap-4 border-t border-slate-200 pt-5 first:border-t-0 first:pt-0">
                  <span className="w-10 text-sm font-semibold tracking-[0.2em] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">{t("services.ui.gallery")}</h3>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] bg-slate-100 ring-1 ring-slate-200/70">
              <div className="flex gap-4 overflow-x-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-max gap-4 animate-[marquee_26s_linear_infinite]">
                  {[...galleryImages, ...galleryImages].map((image, index) => {
                    const isDecorativeClone = index >= galleryImages.length;
                    return (
                      <div
                        key={`${image}-${index}`}
                        aria-hidden={isDecorativeClone ? "true" : undefined}
                        className="relative h-[260px] w-[360px] shrink-0 overflow-hidden rounded-[22px] bg-slate-200 sm:h-[300px] sm:w-[430px]"
                      >
                        <ResponsiveServiceImage
                          src={image}
                          alt={isDecorativeClone ? "" : title}
                          sizes="(min-width: 640px) 430px, 360px"
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-[#f6f7f6]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <GoogleReviewsCarousel />
          </div>
        </section>
        
        <ExpectationsSection tBase={tBase} locale={locale} bookingHref={getLocalizedPath(locale, "booking")} />

        {faqs.length > 0 && (
          <section className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{t("services.ui.faq")}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
                  {t(`${tBase}.faqTitle`)}
                </h3>
              </div>

              <div className="divide-y divide-slate-200">
                {faqs.map((f, index) => (
                  <div key={`${f.q}-${index}`} className="py-6 first:pt-0">
                    <div className="text-lg font-medium text-slate-900">{f.q}</div>
                    <div className="mt-2 max-w-3xl text-base leading-7 text-slate-600">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedServices.length > 0 && (
          <section className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-900">
                {t("services.relatedTitle")}
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((service) => (
                  <Link key={service.key} to={getLocalizedPath(locale, service.key)} className="rounded-xl border border-slate-200 bg-[#f7f7f5] p-4 font-medium text-slate-800 transition hover:border-cyan-300 hover:text-[#0097b2]">
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-[#0b2f39] text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{t("services.ui.contact")}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{t("services.cta")}</h3>
            </div>

            <a href={getLocalizedPath(locale, "booking")} className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-50">
              {t("services.cta")}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
