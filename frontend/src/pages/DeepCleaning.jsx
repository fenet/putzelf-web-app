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
    title: "Tiefenreinigung",
    intro: "Gründliche Tiefenreinigung für Büros, Wohnungen und Gewerbeflächen.",
    metaTitle: "Tiefenreinigung Wien | Grundreinigung & Sanierung – PutzELF",
    metaDescription: "Tiefenreinigung in Wien: gründliche Entfernung von Schmutz, Feinstaub und hartnäckigen Rückständen. Angebote nach Objektgröße.",
    pointsTitle: "Was enthalten ist",
    points: ["Entfernung von Staub an schwer erreichbaren Stellen", "Intensivreinigung von Küche und Sanitärbereichen", "Teppich- und Fleckenbehandlung", "Desinfektion von Kontaktflächen"],
    whenTitle: "Wann sinnvoll",
    when: "Nach Renovierungen, vor Ein- oder Auszug oder saisonal für einen gründlichen Neustart.",
    painTitle: "Wann eine Tiefenreinigung erforderlich ist",
    painPoints: ["Renovationsstaub und Feinstaub", "Langfristige Verschmutzungen", "Allergene und hartnäckige Flecken"],
    solutionTitle: "Unsere Methode bei der Tiefenreinigung",
    solutionPoints: ["Raum-für-Raum Intensivreinigung", "Sanitär- und Küchendescaling", "Teppich- und Polsterbehandlung"],
    processTitle: "So arbeiten wir",
    process: [
      { title: "Anfrage", desc: "Sie übermitteln Fotos oder beschreiben den Reinigungsbedarf." },
      { title: "Einschätzung", desc: "Wir schlagen Aufwand, Zeit und benötigte Mittel vor." },
      { title: "Tiefenreinigung", desc: "Unser Team kommt mit spezialisiertem Equipment und führt die Arbeiten durch." }
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      { q: "Wie lange dauert eine Tiefenreinigung?", a: "Die Dauer hängt von Fläche und Verschmutzungsgrad ab; wir geben eine Schätzung nach Sichtung." },
      { q: "Muss ich Möbel wegräumen?", a: "Leichte Möbel werden durch uns bewegt; schweres Inventar bitte freistellen." },
      { q: "Sind spezielle Reinigungsmittel notwendig?", a: "Ja, wir verwenden professionelle Mittel, abgestimmt auf die Oberfläche." },
      { q: "Gibt es eine Garantie für die Arbeit?", a: "Wir kontrollieren die Ergebnisse und beheben berechtigte Beanstandungen zeitnah." }
    ],
    pricingTitle: "Buchung & Preis",
    pricing: "Der Preis hängt von Größe und Umfang ab. Fotos oder ein Vor-Ort-Termin helfen bei einem genauen Angebot.",
    cta: "Angebot anfordern",
  },
  en: {
    title: "Deep Cleaning",
    intro: "Thorough deep cleaning for offices, homes and commercial spaces.",
    metaTitle: "Deep Cleaning Vienna | Intensive Cleaning Services – PutzELF",
    metaDescription: "Deep cleaning in Vienna for post-renovation, move-in/out and allergen reduction. Detailed quotes after review.",
    pointsTitle: "What we include",
    points: ["Removal of dust from hard-to-reach areas", "Intensive kitchen and sanitation cleaning", "Carpet and stain treatment", "Disinfection of high-touch surfaces"],
    whenTitle: "When to choose it",
    when: "After renovations, before move-ins/outs, or seasonally for a fresh reset.",
    painTitle: "When deep cleaning is needed",
    painPoints: ["Post-renovation dust", "Long-term dirt accumulation", "Allergens and persistent stains"],
    solutionTitle: "Our deep cleaning approach",
    solutionPoints: ["Room-by-room intensive treatment", "Sanitary descaling", "Carpet and upholstery restoration"],
    processTitle: "How it works",
    process: [
      { title: "Request", desc: "Send photos or details about the required areas." },
      { title: "Assessment", desc: "We provide an estimate of time, scope and products." },
      { title: "Deep cleaning", desc: "Our team performs the intensive cleaning with specialised tools." }
    ],
    faqTitle: "FAQs",
    faqs: [
      { q: "How long does deep cleaning take?", a: "Duration depends on size and soiling; we estimate after review." },
      { q: "Do you move furniture?", a: "Light furniture can be moved; heavy items are handled on request." },
      { q: "Are special detergents used?", a: "We use professional products suitable for the surfaces." },
      { q: "Do you provide follow-up support?", a: "We address justified complaints promptly after delivery." }
    ],
    pricingTitle: "Booking & pricing",
    pricing: "Pricing depends on size and scope. Photos or an on-site visit help us provide an accurate quote.",
    cta: "Request an Offer",
  },
};

export default function DeepCleaning() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
      <Seo title={c.metaTitle || `${c.title} – PutzELF`} description={c.metaDescription || c.intro} path={getLocalizedPath(locale, "deepCleaning")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "deepCleaning")} />
      
      <h1 className="text-3xl font-bold">{c.title}</h1>
      <p className="mt-4 text-slate-700">{c.intro}</p>

      <div className="mt-6">
        <div className="w-full h-56 bg-slate-100 border border-dashed border-slate-200 rounded flex items-center justify-center text-slate-500">[IMAGE PLACEHOLDER: {c.title}]</div>
      </div>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{c.pointsTitle}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">
            {c.points.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.painTitle}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">{(c.painPoints||[]).map(p=> <li key={p}>{p}</li>)}</ul>

          <h2 className="text-xl font-semibold mt-4">{c.solutionTitle}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">{(c.solutionPoints||[]).map(s=> <li key={s}>{s}</li>)}</ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.whenTitle}</h2>
          <p className="mt-2 text-slate-600">{c.when}</p>
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
