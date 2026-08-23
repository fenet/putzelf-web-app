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
    title: "Büroreinigung",
    intro: "Professionelle Büroreinigung für saubere, repräsentative und produktive Arbeitsplätze.",
    metaTitle: "Büroreinigung Wien | Professionelle Reinigung für Unternehmen – PutzELF",
    metaDescription: "Büroreinigung in Wien für Unternehmen: flexible Zeitfenster, gründliche Arbeitsplatzpflege und dokumentierte Abläufe.",
    includeTitle: "Was enthalten ist",
    include: ["Reinigung und Desinfektion von Tischen und Oberflächen", "Reinigung von Besprechungsräumen", "Küche und Pausenbereiche", "Müllentsorgung und Recycling", "Regelmäßige Tiefenpflege nach Plan"],
    suitableTitle: "Geeignet für",
    suitable: "Kleine und mittlere Büros, Coworking-Spaces und professionelle Dienstleister.",
    frequencyTitle: "Rhythmus und Optionen",
    frequency: "Einmalig, wöchentlich, zweiwöchentlich oder monatlich. Individuelle Pläne sind möglich.",
    whyTitle: "Warum PutzELF",
    why: "Geprüfte Teams, klare Checklisten, verlässliche Termine und transparente Preise.",
    areaTitle: "Einsatzgebiet",
    area: "Verfügbar in Wien und Graz. Verfügbarkeit bitte bei der Buchung prüfen.",
    painTitle: "Warum Büroreinigung wichtig ist",
    painPoints: ["Staub und Schmutz an Arbeitsplätzen", "Kontaminierte Kontaktflächen", "Unprofessioneller Eindruck bei Kund:innen"],
    solutionTitle: "Unsere Lösung für Ihr Büro",
    solutionPoints: ["Flexible Einsätze ausserhalb der Kernarbeitszeit", "Checklisten für jeden Bereich", "Dokumentierte Qualitätssicherung"],
    processTitle: "So funktioniert die Zusammenarbeit",
    process: [
      { title: "Anfrage starten", desc: "Sie senden uns Angaben zu Bürogröße und gewünschten Zeiten." },
      { title: "Bedarf klären", desc: "Wir legen Umfang, Frequenz und Zugang ab." },
      { title: "Reinigung starten", desc: "Das Team reinigt zum vereinbarten Termin nach Checkliste." }
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      { q: "Wie häufig sollte ein Büro gereinigt werden?", a: "Je nach Nutzung empfehlen wir 1× pro Woche bis 3× pro Woche für stark frequentierte Bereiche." },
      { q: "Können Reinigungen ausserhalb der Arbeitszeit stattfinden?", a: "Ja, wir koordinieren Termine frühmorgens oder abends." },
      { q: "Wer bringt Reinigungsmittel mit?", a: "Unser Team bringt professionelle Reinigungsmittel; eigene Produkte sind möglich." },
      { q: "Gibt es einen Ansprechpartner vor Ort?", a: "Ja, wir bieten einen Ansprechpartner für die Koordination und Qualitätskontrolle." }
    ],
    cta: "Angebot anfordern",
  },
  en: {
    title: "Office Cleaning",
    intro: "Professional office cleaning for clean, presentable and productive workplaces.",
    metaTitle: "Office Cleaning Vienna | Professional Commercial Cleaning – PutzELF",
    metaDescription: "Office cleaning in Vienna for businesses: flexible schedules, thorough desk and communal area cleaning, and documented workflows.",
    includeTitle: "What we include",
    include: ["Desk and surface cleaning and disinfection", "Meeting room cleaning", "Kitchen and break areas", "Trash removal and recycling", "Scheduled deep-care maintenance"],
    suitableTitle: "Suitable for",
    suitable: "Small and mid-sized offices, coworking spaces, and professional service firms.",
    frequencyTitle: "Frequency & options",
    frequency: "One-time, weekly, bi-weekly or monthly. Custom plans are available.",
    whyTitle: "Why PutzELF",
    why: "Vetted teams, clear checklists, reliable scheduling and transparent pricing.",
    areaTitle: "Service area",
    area: "Available in Vienna and Graz. Please confirm availability during booking.",
    painTitle: "Why office cleaning matters",
    painPoints: ["Dust and dirt on workstations", "Contaminated high-touch surfaces", "Poor impression for clients"],
    solutionTitle: "Our office cleaning solution",
    solutionPoints: ["Flexible visits outside working hours", "Area-specific checklists", "Documented quality checks"],
    processTitle: "How it works",
    process: [
      { title: "Start an Inquiry", desc: "You tell us office size and preferred times." },
      { title: "Clarify requirements", desc: "We agree on scope, frequency and access." },
      { title: "Cleaning begins", desc: "The team arrives and cleans according to the checklist." }
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "How often should an office be cleaned?", a: "Depending on use, weekly to multiple times per week is common for busy areas." },
      { q: "Can cleaning happen outside business hours?", a: "Yes — we schedule early morning or evening slots." },
      { q: "Do you bring cleaning supplies?", a: "Our team brings professional products; you can request specific products." },
      { q: "Is there a contact person?", a: "We provide a contact for coordination and quality control." }
    ],
    cta: "Request an Offer",
  },
};

export default function OfficeCleaning() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
      <Seo title={c.metaTitle || `${c.title} – PutzELF`} description={c.metaDescription || c.intro} path={getLocalizedPath(locale, "officeCleaning")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "officeCleaning")} />
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

        <div>
          <h2 className="text-xl font-semibold">{c.frequencyTitle}</h2>
          <p className="mt-2 text-slate-600">{c.frequency}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.whyTitle}</h2>
          <p className="mt-2 text-slate-600">{c.why}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.areaTitle}</h2>
          <p className="mt-2 text-slate-600">{c.area}</p>
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
