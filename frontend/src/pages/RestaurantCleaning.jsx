import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import GoogleReviewsCarousel from "../components/GoogleReviewsCarousel";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Restaurantreinigung",
    intro: "Hygienefokussierte Reinigung für Küchen, Servicebereiche und Gasträume.",
    metaTitle: "Restaurantreinigung Wien | Hygienereinigung für Gastronomie – PutzELF",
    metaDescription: "Restaurantreinigung in Wien: professionelle Entfettung, Hygiene-Checklisten und korrekte Entsorgung für Gastronomiebetriebe.",
    includeTitle: "Was enthalten ist",
    include: ["Entfettung und Reinigung der Küche", "Reinigung von Speise- und Gästebereichen", "Abfallmanagement und fachgerechte Entsorgung", "Hygiene-Checkliste und Unterstützung bei Abläufen"],
    suitableTitle: "Geeignet für",
    suitable: "Kleine Restaurants, Cafés, Bars und Catering-Küchen.",
    painTitle: "Warum professionelle Restaurantreinigung wichtig ist",
    painPoints: ["Fettablagerungen in der Küche", "Hygienerisiken in Gästebereichen", "Regulatorische Anforderungen"],
    solutionTitle: "Unsere Lösung für Gastronomiebetriebe",
    solutionPoints: ["Entfettung und Desinfektion der Küche", "Service- und Gästebereich-Pflege", "Unterstützung bei Hygieneabläufen"],
    processTitle: "Ablauf",
    process: [
      { title: "Anfrage", desc: "Nennen Sie Betriebszeiten und Bereiche zur Reinigung." },
      { title: "Abstimmung", desc: "Wir planen Einsätze so, dass Ihr Betrieb läuft." },
      { title: "Durchführung", desc: "Hygienefokussierte Reinigung durch geschulte Teams." }
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      { q: "Reinigen Sie auch Küchengeräte?", a: "Wir reinigen Oberflächen und Abzugshauben; tiefergehende Wartung koordinieren wir mit Technikern." },
      { q: "Arbeiten Sie während des Betriebs?", a: "Wir planen Einsätze so, dass Serviceabläufe nicht gestört werden." },
      { q: "Können Sie Abfall fachgerecht entsorgen?", a: "Ja, wir übernehmen Abfallmanagement und Entsorgung nach Vorgabe." },
      { q: "Bieten Sie flexible Intervalle an?", a: "Ja, tägliche bis wöchentliche Reinigungsintervalle sind möglich." }
    ],
    cta: "Angebot anfordern",
  },
  en: {
    title: "Restaurant Cleaning",
    intro: "Hygiene-focused cleaning for kitchens, service areas and guest rooms.",
    metaTitle: "Restaurant Cleaning Vienna | Hygiene Services for Restaurants – PutzELF",
    metaDescription: "Restaurant cleaning in Vienna: professional degreasing, hygiene checklists and waste handling for catering businesses.",
    includeTitle: "What we include",
    include: ["Kitchen degreasing and sanitation", "Dining and guest area cleaning", "Waste handling and proper disposal", "Hygiene checklist and process support"],
    suitableTitle: "Suitable for",
    suitable: "Small restaurants, cafes, bars and catering kitchens.",
    painTitle: "Why professional restaurant cleaning matters",
    painPoints: ["Grease build-up in kitchens", "Hygiene risks in guest areas", "Regulatory hygiene requirements"],
    solutionTitle: "Our solution for catering businesses",
    solutionPoints: ["Degreasing and sanitation", "Dining area and guest room cleaning", "Support for hygiene workflows"],
    processTitle: "Process",
    process: [
      { title: "Inquiry", desc: "Tell us your operating hours and areas to clean." },
      { title: "Coordination", desc: "We plan interventions to avoid service disruption." },
      { title: "Execution", desc: "Hygiene-focused cleaning by trained teams." }
    ],
    faqTitle: "FAQs",
    faqs: [
      { q: "Do you clean kitchen equipment?", a: "We clean surfaces and extraction hoods; deeper technical maintenance is coordinated separately." },
      { q: "Can you work during service hours?", a: "We arrange times to avoid disrupting your service." },
      { q: "Do you handle waste disposal?", a: "Yes, we manage waste according to regulations." },
      { q: "Are daily visits possible?", a: "Yes, daily to weekly schedules are available." }
    ],
    cta: "Request an Offer",
  },
};

export default function RestaurantCleaning() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
      <Seo title={c.metaTitle || (locale === "de" ? "Restaurantreinigung – PutzELF" : "Restaurant Cleaning – PutzELF")} description={c.metaDescription || c.intro} path={getLocalizedPath(locale, "restaurantCleaning")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "restaurantCleaning")} />
      <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>
      <h1 className="text-3xl font-bold">{c.title} {locale === 'de' ? 'Wien' : 'Vienna'}</h1>
      <p className="mt-4 text-slate-700">{c.intro}</p>

      <div className="mt-6">
        <div className="w-full h-56 bg-slate-100 border border-dashed border-slate-200 rounded flex items-center justify-center text-slate-500">[IMAGE PLACEHOLDER: {c.title}]</div>
      </div>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{c.includeTitle}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">
            {c.include.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.painTitle}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">{(c.painPoints||[]).map(p=> <li key={p}>{p}</li>)}</ul>

          <h2 className="text-xl font-semibold mt-4">{c.solutionTitle}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">{(c.solutionPoints||[]).map(s=> <li key={s}>{s}</li>)}</ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.suitableTitle}</h2>
          <p className="mt-2 text-slate-600">{c.suitable}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">{c.processTitle}</h2>
          <div className="mt-4 space-y-3">{(c.process||[]).map((step, idx) => (
            <div key={idx}><h3 className="font-semibold">{`${idx+1}. ${step.title}`}</h3><p className="text-slate-600 mt-1">{step.desc}</p></div>
          ))}</div>
        </div>

        <div className="mt-10">
          <GoogleReviewsCarousel />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">{c.faqTitle}</h2>
          <div className="mt-4 space-y-4">{(c.faqs||[]).map((f,i)=> <div key={i}><div className="font-medium">{f.q}</div><div className="mt-1 text-slate-600">{f.a}</div></div>)}</div>
        </div>

        <div className="mt-4">
          <Link to={getLocalizedPath(locale, "getPartners")} className="inline-block rounded bg-[#0097b2] px-5 py-3 text-white font-semibold">{c.cta}</Link>
        </div>
      </section>
      </main>
    </>
  );
}
