import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
import GoogleReviewsCarousel from "../components/GoogleReviewsCarousel";
import { getRouteKeyFromPathname, getLocalizedPath, getLocalizedAlternates, getLocaleFromPathname } from "../lib/localeRoutes";

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
  const description = t(`${tBase}.description`);
  const features = t(`${tBase}.features`, { returnObjects: true }) || [];
  const painPoints = t(`${tBase}.painPoints`, { returnObjects: true }) || [];
  const solutionPoints = t(`${tBase}.solutionPoints`, { returnObjects: true }) || [];
  const processSteps = t(`${tBase}.process`, { returnObjects: true }) || [];
  const faqs = t(`${tBase}.faqs`, { returnObjects: true }) || [];

  const metaTitle = t(`${tBase}.metaTitle`, { defaultValue: `${title} – PutzELF` });
  const metaDescription = t(`${tBase}.metaDescription`, { defaultValue: description });

  const canonical = getLocalizedPath(locale, key);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonicalUrl = origin ? `${origin}${canonical}` : canonical;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: description || undefined,
    provider: {
      "@type": "LocalBusiness",
      name: "PutzELF",
      url: origin || undefined,
    },
    url: canonicalUrl,
    inLanguage: locale,
  };

  const isWindowService = key === "privateWindow" || key === "businessWindow";
  const heroImage = isWindowService
    ? "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
    : "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80";

  const solutionImage = isWindowService
    ? "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    : "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80";

  const galleryImages = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
  ];

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

  const serviceLabel = isWindowService
    ? locale === "de" ? "Fensterreinigung" : "Window Cleaning"
    : locale === "de" ? "Service" : "Service";

  return (
    <>
      <Navbar />

      <main className="bg-[#f5f4f1] text-slate-900">
        <Seo title={metaTitle} description={metaDescription} path={canonical} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", key)} />

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
            </div>

            <div className="overflow-hidden rounded-[30px] bg-white/40 shadow-[0_30px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
              <img src={heroImage} alt={title} className="h-[420px] w-full object-cover sm:h-[500px]" />
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
              {t(`${tBase}.painTitle`, { defaultValue: locale === "de" ? "Die Herausforderung" : "The challenge" })}
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
              <img src={solutionImage} alt={title} className="h-[420px] w-full object-cover sm:h-[500px]" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">{locale === "de" ? "Unsere Lösung" : "Our approach"}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
                {t(`${tBase}.solutionTitle`, { defaultValue: locale === "de" ? "Sauberer Ablauf. Mehr Klarheit." : "Clear process. Better results." })}
              </h2>

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
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{t("services.whatWeOffer", { defaultValue: locale === "de" ? "Leistungsumfang" : "Service scope" })}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
                  {title}
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <div key={feature} className="pt-1">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-600" aria-hidden="true" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{locale === "de" ? "Leistung" : "Service"}</span>
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
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{locale === "de" ? "Ablauf" : "Process"}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
                  {t(`${tBase}.processTitle`, { defaultValue: locale === "de" ? "So funktioniert die Zusammenarbeit" : "How we work together" })}
                </h2>
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
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{locale === "de" ? "Bilder" : "Gallery"}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">{title}</h2>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] bg-slate-100 ring-1 ring-slate-200/70">
              <div className="flex gap-4 overflow-x-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-max gap-4 animate-[marquee_26s_linear_infinite]">
                  {[...galleryImages, ...galleryImages].map((image, index) => (
                    <div key={`${image}-${index}`} className="relative h-[260px] w-[360px] shrink-0 overflow-hidden rounded-[22px] bg-slate-200 sm:h-[300px] sm:w-[430px]">
                      <img src={image} alt={title} className="h-full w-full object-cover" />
                    </div>
                  ))}
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

        {faqs.length > 0 && (
          <section className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{locale === "de" ? "FAQ" : "FAQ"}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
                  {t(`${tBase}.faqTitle`, { defaultValue: locale === "de" ? "Häufige Fragen" : "Frequently asked questions" })}
                </h2>
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

        <section className="bg-[#0b2f39] text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{locale === "de" ? "Kontakt" : "Get in touch"}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{t("services.cta", { defaultValue: locale === "de" ? "Angebot anfordern" : "Request an Offer" })}</h2>
            </div>

            <a href={getLocalizedPath(locale, "booking")} className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-50">
              {t("services.cta", { defaultValue: locale === "de" ? "Jetzt anfragen" : "Request now" })}
            </a>
          </div>
        </section>
      </main>

      <StructuredData json={serviceJsonLd} id={`service-jsonld-${key || "unknown"}`} />
      {faqJson ? <StructuredData json={faqJson} id={`service-faq-${key || "unknown"}`} /> : null}

      <Footer />
    </>
  );
}
