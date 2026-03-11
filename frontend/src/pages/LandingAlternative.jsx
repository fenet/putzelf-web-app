import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  ShieldCheck,
  CalendarDays,
  PhoneCall,
  FileText,
  Sparkles,
  Building2,
  UtensilsCrossed,
  Store,
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  Star,
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import logo from "../assets/logo.png";
import cover from "../assets/cover.svg";
import Footer from "../components/Footer";

const content = {
  en: {
    navCta: "Book Your First Order",
    heroTitle: "Professional Cleaning Services for Businesses",
    heroSubtitle:
      "Reliable cleaning for offices, restaurants, and retail spaces with consistent quality and flexible schedules.",
    heroPrimaryCta: "Book a Free Consultation",
    heroSecondaryCta: "Book Your First Order",
    trust: ["4.9/5 Average Rating", "500+ Completed Jobs", "Trusted by Local Businesses"],
    socialTitle: "Trusted by Growing Teams",
    socialSubtitle: "Real feedback from businesses that rely on us every week.",
    testimonials: [
      {
        quote:
          "Always on time, always spotless. Our office has never looked better.",
        author: "Operations Manager, Vienna",
      },
      {
        quote:
          "Reliable team and clear communication. Exactly what we needed.",
        author: "Restaurant Owner, 3rd District",
      },
      {
        quote:
          "Flexible scheduling and quality work every single visit.",
        author: "Retail Store Lead, Simmering",
      },
    ],
    problemTitle: "Why Businesses Switch to PutzELF",
    problems: [
      "Unreliable cleaning providers",
      "Inconsistent quality from visit to visit",
      "No flexibility for business schedules",
    ],
    solutions: [
      "Professional and vetted cleaning staff",
      "Reliable scheduling and quality checks",
      "Customized cleaning plans for your business",
    ],
    servicesTitle: "Our Business Cleaning Services",
    services: [
      { title: "Office cleaning", desc: "Desks, kitchens, meeting rooms, and common areas." },
      { title: "Restaurant cleaning", desc: "Guest areas, kitchens, and hygiene-focused routines." },
      { title: "Retail cleaning", desc: "Clean and welcoming spaces for your customers." },
      { title: "Medical / studio cleaning", desc: "Detail-oriented cleaning for sensitive environments." },
    ],
    processTitle: "How It Works",
    process: [
      "Booking",
      "Short call or on-site visit",
      "Receive a customized offer",
      "Cleaning service starts",
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "How is pricing calculated?",
        a: "Pricing depends on location, size, frequency, and service type. You receive a clear custom offer after the consultation.",
      },
      {
        q: "Which areas do you serve?",
        a: "We primarily serve Vienna and nearby districts. Ask us for availability in your area.",
      },
      {
        q: "Do I need a long-term contract?",
        a: "No. We offer flexible plans, from one-time jobs to recurring service agreements.",
      },
      {
        q: "How quickly can service start?",
        a: "In most cases, we can start within a few days after confirming your plan.",
      },
    ],
    finalTitle: "Ready for Reliable Cleaning?",
    finalSubtitle: "Book your free consultation or contact us directly.",
    finalCta: "Schedule a Free Consultation",
  },
  de: {
    navCta: "Erste Reinigung buchen",
    heroTitle: "Professionelle Reinigungsservices für Unternehmen",
    heroSubtitle:
      "Zuverlässige Reinigung für Büros, Restaurants und Einzelhandel – mit gleichbleibender Qualität und flexiblen Zeiten.",
    heroPrimaryCta: "Kostenlose Beratung buchen",
    heroSecondaryCta: "Erste Reinigung buchen",
    trust: ["4,9/5 Durchschnittsbewertung", "500+ Abgeschlossene Aufträge", "Vertrauen von lokalen Unternehmen"],
    socialTitle: "Vertrauen von wachsenden Teams",
    socialSubtitle: "Echtes Feedback von Unternehmen, die wöchentlich auf uns setzen.",
    testimonials: [
      {
        quote: "Immer pünktlich, immer sauber. Unser Büro war noch nie so gepflegt.",
        author: "Operations Manager, Wien",
      },
      {
        quote: "Zuverlässiges Team und klare Kommunikation. Genau das, was wir brauchten.",
        author: "Restaurantinhaber, 3. Bezirk",
      },
      {
        quote: "Flexible Termine und konstant hohe Qualität bei jedem Einsatz.",
        author: "Filialleitung, Simmering",
      },
    ],
    problemTitle: "Warum Unternehmen zu PutzELF wechseln",
    problems: [
      "Unzuverlässige Reinigungsanbieter",
      "Schwankende Qualität von Termin zu Termin",
      "Keine Flexibilität für Geschäftszeiten",
    ],
    solutions: [
      "Professionelles und geprüftes Reinigungspersonal",
      "Zuverlässige Planung und Qualitätskontrollen",
      "Individuelle Reinigungspläne für Ihr Unternehmen",
    ],
    servicesTitle: "Unsere Reinigungsleistungen für Unternehmen",
    services: [
      { title: "Büroreinigung", desc: "Schreibtische, Küchen, Besprechungsräume und Gemeinschaftsflächen." },
      { title: "Restaurantreinigung", desc: "Gästebereiche, Küchen und hygienefokussierte Abläufe." },
      { title: "Einzelhandelsreinigung", desc: "Saubere und einladende Flächen für Ihre Kundschaft." },
      { title: "Praxis- / Studioreinigung", desc: "Sorgfältige Reinigung für sensible Bereiche." },
    ],
    processTitle: "So funktioniert es",
    process: [
      "Buchung",
      "Kurzer Anruf oder Vor-Ort-Termin",
      "Individuelles Angebot erhalten",
      "Reinigungsservice startet",
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Wie wird der Preis berechnet?",
        a: "Der Preis richtet sich nach Standort, Größe, Häufigkeit und Leistungsumfang. Nach der Beratung erhalten Sie ein klares Angebot.",
      },
      {
        q: "Welche Gebiete bedienen Sie?",
        a: "Wir bedienen vor allem Wien und umliegende Bezirke. Fragen Sie uns gerne für Ihre Region.",
      },
      {
        q: "Brauche ich einen langfristigen Vertrag?",
        a: "Nein. Wir bieten flexible Modelle – von einmaligen Einsätzen bis zu laufenden Vereinbarungen.",
      },
      {
        q: "Wie schnell kann der Service starten?",
        a: "In den meisten Fällen starten wir innerhalb weniger Tage nach Bestätigung Ihres Plans.",
      },
    ],
    finalTitle: "Bereit für zuverlässige Reinigung?",
    finalSubtitle: "Buchen Sie Ihre kostenlose Beratung oder kontaktieren Sie uns direkt.",
    finalCta: "Kostenlose Beratung planen",
  },
};

const serviceIcons = [Building2, UtensilsCrossed, Store, Stethoscope];

export default function LandingAlternative() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("de") ? "de" : "en";
  const c = useMemo(() => content[lang], [lang]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Go to home page">
              <img src={logo} alt="PutzELF" className="h-14 w-auto md:h-20" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/profile"
              className="hidden rounded-xl bg-[#0097b2] px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-[#007f95] sm:inline-flex md:px-8 md:py-3.5 md:text-lg"
              onClick={() => trackEvent("AltLanding_Nav_CTA_Click", { cta: "nav_book" })}
            >
              {c.navCta}
            </Link>
            <button
              onClick={() => i18n.changeLanguage("en")}
              title="English"
              aria-label="Switch to English"
              className={`h-9 w-9 rounded-full border text-sm ${lang === "en" ? "ring-2 ring-[#0097b2]" : ""}`}
            >
              🇬🇧
            </button>
            <button
              onClick={() => i18n.changeLanguage("de")}
              title="Deutsch"
              aria-label="Auf Deutsch umschalten"
              className={`h-9 w-9 rounded-full border text-sm ${lang === "de" ? "ring-2 ring-[#0097b2]" : ""}`}
            >
              🇩🇪
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5be3e3]/30 via-white to-[#0097b2]/20" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">{c.heroTitle}</h1>
            <p className="mt-4 max-w-xl text-lg text-slate-700">{c.heroSubtitle}</p>

            <div className="mt-8 flex justify-center">
              <Link
                to="/profile"
                className="rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#f97316] to-[#fb923c] px-8 py-3 text-base font-bold text-white shadow-lg hover:opacity-95 md:px-10 md:py-4 md:text-lg"
                onClick={() => trackEvent("AltLanding_Hero_CTA_Click", { cta: "book_first_order" })}
              >
                {c.heroSecondaryCta}
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {c.trust.map((item, idx) => {
                const trustIconColors = [
                  "text-amber-500",
                  "text-teal-600",
                  "text-indigo-600",
                ];
                const trustIcons = [Star, CheckCircle2, ShieldCheck];
                const TrustIcon = trustIcons[idx] || ShieldCheck;

                return (
                  <div
                    key={item}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-center text-sm font-semibold text-slate-700"
                  >
                    <TrustIcon className={`h-4 w-4 ${trustIconColors[idx] || trustIconColors[0]}`} />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0097b2]/10 px-3 py-1 text-sm font-semibold text-[#0097b2]">
              <Phone className="h-4 w-4" />
              {lang === "de" ? "Direkter Kontakt" : "Direct Contact"}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              {lang === "de" ? "Kostenlose Beratung sofort per Anruf" : "Get a free consultation by phone now"}
            </h2>
            <p className="mt-3 text-slate-600">
              {lang === "de"
                ? "Kein Kalender nötig – rufen Sie uns direkt an und wir besprechen Ihren Bedarf sofort."
                : "No scheduling calendar needed — call us directly and we’ll discuss your needs right away."}
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+436766300167"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5be3e3] to-[#0097b2] px-5 py-3 font-semibold text-white shadow-lg"
                onClick={() => trackEvent("AltLanding_Hero_Call_Click", { cta: "free_consultation_call_card" })}
              >
                <Phone className="h-4 w-4" /> {c.heroPrimaryCta}
              </a>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">+43 676 6300167 · office@putzelf.com</p>
          </div>
        </div>
      </section>

      <section
        className="relative h-[40vh] min-h-[220px] bg-cover bg-center bg-no-repeat md:h-[50vh]"
        style={{ backgroundImage: `url(${cover})` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/10" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h3 className="text-2xl font-bold">{c.socialTitle}</h3>
        <p className="mt-2 text-slate-600">{c.socialSubtitle}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {c.testimonials.map((item) => (
            <div key={item.author} className="rounded-2xl bg-white p-5 shadow">
              <div className="mb-3 flex text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-slate-700">“{item.quote}”</p>
              <p className="mt-3 text-sm font-semibold text-slate-500">{item.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h3 className="text-2xl font-bold">{c.problemTitle}</h3>
            <ul className="mt-6 space-y-5">
              {c.problems.map((p, idx) => {
                const gradients = [
                  "from-rose-500 to-orange-500",
                  "from-fuchsia-500 to-purple-500",
                  "from-amber-500 to-orange-600",
                ];
                const icons = [AlertTriangle, Star, Phone];
                const Icon = icons[idx] || AlertTriangle;

                return (
                  <li key={p} className="flex items-start gap-3 text-slate-700">
                    <span
                      className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${gradients[idx] || gradients[0]} text-white shadow`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-base leading-relaxed">{p}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold">{lang === "de" ? "Unsere Lösung" : "Our Solution"}</h3>
            <ul className="mt-6 space-y-5">
              {c.solutions.map((s, idx) => {
                const gradients = [
                  "from-emerald-500 to-teal-500",
                  "from-cyan-500 to-sky-600",
                  "from-indigo-500 to-blue-600",
                ];
                const icons = [ShieldCheck, CheckCircle2, Building2];
                const Icon = icons[idx] || CheckCircle2;

                return (
                  <li key={s} className="flex items-start gap-3 text-slate-700">
                    <span
                      className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${gradients[idx] || gradients[0]} text-white shadow`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-base leading-relaxed">{s}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h3 className="text-center text-2xl font-bold">{c.servicesTitle}</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {c.services.map((s, idx) => {
            const Icon = serviceIcons[idx];
            return (
              <div key={s.title} className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow">
                <Icon className="h-8 w-8 text-[#0097b2]" />
                <h4 className="mt-3 text-lg font-semibold">{s.title}</h4>
                <p className="mt-1 text-slate-600">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h3 className="text-center text-2xl font-bold">{c.processTitle}</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {c.process.map((step, i) => {
              const stepGradients = [
                "from-[#14b8a6] via-[#0ea5a3] to-[#0284c7]",
                "from-[#06b6d4] via-[#0891b2] to-[#2563eb]",
                "from-[#22c55e] via-[#0ea5a3] to-[#0284c7]",
                "from-[#0ea5e9] via-[#0284c7] to-[#1d4ed8]",
              ];
              const stepIcons = [CalendarDays, PhoneCall, FileText, Sparkles];
              const StepIcon = stepIcons[i % 4];

              return (
                <div
                  key={step}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-center text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl ${stepGradients[i % 4]}`}
                >
                  <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-white/20" />
                  <div className="relative mx-auto mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="relative mx-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <p className="relative mt-3 font-semibold">{step}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/profile"
              className="rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#f97316] to-[#fb923c] px-10 py-4 text-center text-lg font-bold text-white shadow-lg hover:opacity-95 md:px-12 md:py-5"
              onClick={() => trackEvent("AltLanding_Process_CTA_Click", { cta: "book_cleaning" })}
            >
              {lang === "de" ? "Reinigung buchen" : "Book Your Cleaning"}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h3 className="text-2xl font-bold">{c.faqTitle}</h3>
        <div className="mt-6 space-y-3">
          {c.faqs.map((f) => (
            <details key={f.q} className="rounded-xl bg-white p-4 shadow">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="rounded-2xl bg-slate-900 px-6 py-10 text-white md:px-10">
            <h3 className="text-3xl font-bold">{c.finalTitle}</h3>
            <p className="mt-2 text-slate-200">{c.finalSubtitle}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+436766300167"
                className="rounded-xl bg-gradient-to-r from-[#5be3e3] to-[#0097b2] px-6 py-3 font-semibold text-white shadow-lg"
                onClick={() => trackEvent("AltLanding_Final_CTA_Click", { cta: "final_consultation_call" })}
              >
                {c.finalCta}
              </a>
              <a href="tel:+436766300167" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 px-5 py-3">
                <Phone className="h-4 w-4" /> +43 676 6300167
              </a>
              <a href="mailto:office@putzelf.com" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3">
                <Mail className="h-4 w-4" /> office@putzelf.com
              </a>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-[#5be3e3]" />
              {lang === "de" ? "DSGVO-konforme Prozesse" : "GDPR-compliant processes"}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl gap-2">
          <a
            href="tel:+436766300167"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5be3e3] to-[#0097b2] px-4 py-3 text-sm font-semibold text-white"
            onClick={() => trackEvent("AltLanding_Mobile_Call_Click", { cta: "sticky_mobile_call" })}
          >
            <Phone className="h-4 w-4" /> {lang === "de" ? "Jetzt anrufen" : "Call now"}
          </a>
          <Link
            to="/profile"
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#0097b2] to-[#3b82f6] px-4 py-3 text-sm font-semibold text-white"
            onClick={() => trackEvent("AltLanding_Mobile_Book_Click", { cta: "sticky_mobile_book" })}
          >
            {lang === "de" ? "Buchen" : "Book"}
          </Link>
        </div>
      </div>
    </div>
  );
}
