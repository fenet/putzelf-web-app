import React from "react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Aktuelle Jobangebote",
    description: "Offene Stellen bei PutzELF: Call Center Agents, Reinigungskräfte in Graz und mehr.",
    roles: [
      {
        title: "Call Center Agents",
        body: "Bearbeitung von Kundenanfragen, Terminvereinbarungen und Unterstützung unseres Buchungsprozesses. Gute Deutschkenntnisse und freundliches Auftreten erforderlich.",
        subject: "Bewerbung - Call Center",
        cta: "Bewerben / Kontakt",
      },
      {
        title: "Reinigungskräfte - Graz",
        body: "Wir suchen Reinigungskräfte in Graz. Erfahrung von Vorteil, aber nicht erforderlich. Flexible Arbeitszeiten und faire Bezahlung.",
        subject: "Bewerbung - Reinigung Graz",
        cta: "Bewerben / Kontakt",
      },
    ],
  },
  en: {
    title: "Current Job Openings",
    description: "Open roles at PutzELF: call center agents, cleaners in Graz and more.",
    roles: [
      {
        title: "Call Center Agents",
        body: "Handling customer inquiries, scheduling appointments, and supporting our booking process. Good German skills and a friendly attitude are required.",
        subject: "Application - Call Center",
        cta: "Apply / Contact",
      },
      {
        title: "Cleaners - Graz",
        body: "We are looking for cleaners in Graz. Experience is a plus, but not required. Flexible hours and fair pay.",
        subject: "Application - Cleaner Graz",
        cta: "Apply / Contact",
      },
    ],
  },
};

export default function JobOpening() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];

  return (
    <div className="min-h-screen bg-[#f5f7f7] text-slate-900">
      <Navbar />
      <Seo
        title={locale === "de" ? "Jobangebote – PutzELF" : "Job Openings – PutzELF"}
        description={c.description}
        path={getLocalizedPath(locale, "jobOpening")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "jobOpening")}
      />

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.16),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.13),_transparent_48%)]" aria-hidden="true" />

          <div className="relative grid items-stretch gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                PutzELF
              </div>

              <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-[4rem] lg:leading-[0.96]">
                {c.title}
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                {c.description}
              </p>
            </div>

            <div className="relative min-h-[260px] lg:min-h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(2, 6, 23, 0.34), rgba(2, 6, 23, 0.12)), url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/20 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          {c.roles.map((role, index) => (
            <article
              key={role.title}
              className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white"
            >
              <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-stretch lg:justify-between lg:px-8 lg:py-8">
                <div className="flex min-h-[120px] w-full flex-col justify-start lg:max-w-[30%] lg:min-w-[250px]">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                  <h2 className="min-h-[72px] text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2rem]">
                    {role.title}
                  </h2>
                </div>

                <div className="flex w-full flex-1 flex-col justify-between lg:pl-8">
                  <div className="min-h-[120px] max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                    {role.body}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={`mailto:office@putzelf.com?subject=${encodeURIComponent(role.subject)}`}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2"
                    >
                      <span>{role.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
