import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Navbar, { Unternehmen, Privatkunden, copy as navCopy } from "../components/Navbar";
import Footer from "../components/Footer";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  Briefcase,
  Home,
  ChevronRight,
  ChevronDown,
  Building2,
  UtensilsCrossed,
  Store,
  Stethoscope,
  Sparkles,
  CheckCircle2,
} from "lucide-react";



export default function ServicesOverview() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const { t } = useTranslation();
  const [openGroup, setOpenGroup] = useState("business");

  const iconMap = {
    businessMaintenance: Building2,
    businessDeep: CheckCircle2,
    businessStaircase: Briefcase,
    businessWindow: Sparkles,
    businessIndustrial: Store,
    privateMaintenance: Home,
    privateDeep: CheckCircle2,
    privateResidential: Home,
    privateConstruction: UtensilsCrossed,
    privateWindow: Sparkles,
    privateIndustrial: Stethoscope,
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12">
      <Seo
        title={locale === "de" ? "Unsere Services – PutzELF" : "Our Services – PutzELF"}
        description={locale === "de" ? "Reinigungsservices für Unternehmen und Privatkunden bei PutzELF." : "Cleaning services for businesses and private customers at PutzELF."}
        path={getLocalizedPath(locale, "servicesOverview")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "servicesOverview")}
      />

      

      <header className="mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#fff7ed] via-white to-white border border-transparent shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{t(`services.overview.title`)}</h1>
            <p className="mt-3 text-slate-700 max-w-2xl">{t(`services.overview.subtitle`)}</p>
            <div className="mt-4">
              <Link to={getLocalizedPath(locale, "booking")} className="inline-block bg-[#0097b2] text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-[#007f95]">{navCopy[locale]?.book || t('book') }</Link>
            </div>
          </div>
          <div className="w-48 h-48 hidden md:flex items-center justify-center bg-slate-100 rounded-lg border border-slate-200">
            {/* decorative area - keep simple to match site */}
            <Building2 className="w-12 h-12 text-[#0097b2]" />
          </div>
        </div>
      </header>

      <section className="mt-8">
        {/* Business Accordion */}
        <div className="mb-4">
          <button
            type="button"
            aria-expanded={openGroup === 'business'}
            onClick={() => setOpenGroup((v) => (v === 'business' ? null : 'business'))}
            className={`w-full flex items-center justify-between p-4 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097b2]`}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-[#0097b2]" />
              <span className="font-semibold text-slate-800">{navCopy[locale]?.company || t('company')}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${openGroup === 'business' ? 'rotate-180' : ''}`} />
          </button>

          {openGroup === 'business' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Unternehmen.map((s) => {
                const raw = t('services.overview.cards', { returnObjects: true }) || [];
                const card = raw.find((c) => c.key === s.key) || {};
                const title = card.title || (navCopy[locale] && navCopy[locale][s.key]) || s.key;
                const desc = card.desc || '';
                const Icon = iconMap[s.key] || Building2;
                return (
                  <Link key={s.key} to={getLocalizedPath(locale, s.key)} className="group block rounded-xl border border-slate-200 bg-white p-4 hover:shadow-lg focus:ring-2 focus:ring-[#0097b2] focus:outline-none transition-transform transform hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0097b2]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
                        <p className="mt-1 text-sm text-slate-600">{desc}</p>
                      </div>
                      <div className="ml-3 flex items-center">
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0097b2]" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Private Accordion */}
        <div className="mb-6">
          <button
            type="button"
            aria-expanded={openGroup === 'private'}
            onClick={() => setOpenGroup((v) => (v === 'private' ? null : 'private'))}
            className={`w-full flex items-center justify-between p-4 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097b2]`}
          >
            <div className="flex items-center gap-3">
              <Home className="w-6 h-6 text-[#0097b2]" />
              <span className="font-semibold text-slate-800">{navCopy[locale]?.private || t('private')}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${openGroup === 'private' ? 'rotate-180' : ''}`} />
          </button>

          {openGroup === 'private' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Privatkunden.map((s) => {
                const raw = t('services.overview.cards', { returnObjects: true }) || [];
                const card = raw.find((c) => c.key === s.key) || {};
                const title = card.title || (navCopy[locale] && navCopy[locale][s.key]) || s.key;
                const desc = card.desc || '';
                const Icon = iconMap[s.key] || Home;
                return (
                  <Link key={s.key} to={getLocalizedPath(locale, s.key)} className="group block rounded-xl border border-slate-200 bg-white p-4 hover:shadow-lg focus:ring-2 focus:ring-[#0097b2] focus:outline-none transition-transform transform hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0097b2]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
                        <p className="mt-1 text-sm text-slate-600">{desc}</p>
                      </div>
                      <div className="ml-3 flex items-center">
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0097b2]" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{t('services.overview.whoForTitle')}</h2>
        <p className="mt-3 text-slate-700">{t('services.overview.whoForText')}</p>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-semibold">{t('services.overview.challengesTitle')}</h3>
        <ul className="mt-3 list-disc list-inside text-slate-700">
          {(() => {
            const raw = t('services.overview.challenges', { returnObjects: true });
            const items = Array.isArray(raw) ? raw : [];
            return items.map((it) => <li key={it}>{it}</li>);
          })()}
        </ul>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-semibold">{t('services.overview.approachTitle')}</h3>
        <ul className="mt-3 list-disc list-inside text-slate-700">
          {(() => {
            const raw = t('services.overview.approach', { returnObjects: true });
            const items = Array.isArray(raw) ? raw : [];
            return items.map((it) => <li key={it}>{it}</li>);
          })()}
        </ul>
      </section>

      <section className="mt-8 grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold">{t('services.overview.benefitsTitle')}</h4>
          <ul className="mt-3 list-disc list-inside text-slate-700">
            {(() => {
              const raw = t('services.overview.benefits', { returnObjects: true });
              const items = Array.isArray(raw) ? raw : [];
              return items.map((it) => <li key={it}>{it}</li>);
            })()}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">{t('services.overview.includedTitle')}</h4>
          <ul className="mt-3 list-disc list-inside text-slate-700">
            {(() => {
              const raw = t('services.overview.included', { returnObjects: true });
              const items = Array.isArray(raw) ? raw : [];
              return items.map((it) => <li key={it}>{it}</li>);
            })()}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <p className="text-slate-800 font-medium">{t('services.overview.conclusion')}</p>
      </section>

      </main>
      <Footer />
    </>
  );
}
