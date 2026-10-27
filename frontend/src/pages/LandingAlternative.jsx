import { useMemo, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  House,
  Hammer,
  Factory,
  GlassWater,
  MapPin,
  Briefcase,
  Home,
  ChevronDown,
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import cover from "../assets/cover.svg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import GoogleReviewsCarousel from "../components/GoogleReviewsCarousel";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";
// static map preview removed — we rely on iframe + consent

const content = {
  en: {
    navCta: "Start an Inquiry",
    heroTitle: "Professional Cleaning in Vienna and Graz",
    heroTitleLine2: "For businesses of every kind.",
    heroSubtitle: "Reliable cleaning for businesses in Vienna and Graz, with consistent quality and flexible schedules.",
    heroPrimaryCta: "Start an Inquiry",
    heroSecondaryCta: "Start an Inquiry",
    trust: ["4.9/5 Average Rating"],
    socialTitle: "Trusted by Growing Teams",
    socialSubtitle: "Real feedback from businesses that rely on us every week.",
    testimonials: [
      {
        quote:
          "Always on time, always spotless. Our premises have never looked better.",
        author: "Business Client, Vienna",
      },
      {
        quote:
          "Reliable team and clear communication. Exactly what we needed.",
        author: "Business Client, Graz",
      },
      {
        quote:
          "Flexible scheduling and quality work every single visit.",
        author: "Business Client, Simmering",
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
      { key: "businessMaintenance", title: "Maintenance cleaning", desc: "Scheduled cleaning tailored to your business premises." },
      { key: "businessDeep", title: "Deep cleaning", desc: "Detailed cleaning for heavier soiling and one-time needs." },
      { key: "businessStaircase", title: "Staircase cleaning", desc: "Reliable upkeep for shared building areas." },
      { key: "businessConstruction", title: "Construction cleaning", desc: "Rough and final cleaning after building work." },
      { key: "businessWindow", title: "Window and frame cleaning", desc: "Clear glass and carefully cleaned frames." },
      { key: "businessIndustrial", title: "Industrial cleaning", desc: "Cleaning for machinery and production spaces." },
    ],
    processTitle: "How It Works",
    process: [
      "Inquiry",
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
        a: "We serve Vienna and Graz. Ask us to confirm availability for your area.",
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
    finalSubtitle: "Request your free consultation or contact us directly.",
    finalCta: "Start an Inquiry",
    callNow: "Call now",
    directContact: "Direct Contact",
    freeConsultTitle: "Get a free consultation by phone now",
    freeConsultNote: "No scheduling calendar needed — call us directly and we’ll discuss your needs right away.",
    solutionTitle: "Our Solution",
    gdprText: "GDPR-compliant processes",
  },
  de: {
    navCta: "Anfrage starten",
    heroTitle: "Professionelle Reinigung in Wien und Graz:",
    heroTitleLine2: "Für Unternehmen jeder Art.",
    heroSubtitle:
      "Zuverlässige Reinigung für Unternehmen in Wien und Graz – mit gleichbleibender Qualität und flexiblen Zeiten.",
    heroPrimaryCta: "Anfrage starten",
    heroSecondaryCta: "Anfrage starten",
    trust: ["4,9/5 Durchschnittsbewertung"],
    socialTitle: "Vertrauen von wachsenden Teams",
    socialSubtitle: "Echtes Feedback von Unternehmen, die wöchentlich auf uns setzen.",
    testimonials: [
      {
        quote: "Immer pünktlich, immer sauber. Unsere Räumlichkeiten waren noch nie so gepflegt.",
        author: "Geschäftskund:in, Wien",
      },
      {
        quote: "Zuverlässiges Team und klare Kommunikation. Genau das, was wir brauchten.",
        author: "Geschäftskund:in, Graz",
      },
      {
        quote: "Flexible Termine und konstant hohe Qualität bei jedem Einsatz.",
        author: "Geschäftskund:in, Simmering",
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
      { key: "businessMaintenance", title: "Unterhaltsreinigung", desc: "Planbare Reinigung, abgestimmt auf Ihre Unternehmensräume." },
      { key: "businessDeep", title: "Grundreinigung", desc: "Gründliche Reinigung bei stärkerer Verschmutzung und einmaligem Bedarf." },
      { key: "businessStaircase", title: "Stiegenhausreinigung", desc: "Zuverlässige Pflege gemeinschaftlicher Gebäudebereiche." },
      { key: "businessConstruction", title: "Bauendreinigung", desc: "Grob- und Feinreinigung nach Bauarbeiten." },
      { key: "businessWindow", title: "Glas- und Rahmenreinigung", desc: "Klare Glasflächen und sorgfältig gereinigte Rahmen." },
      { key: "businessIndustrial", title: "Industriereinigung", desc: "Reinigung von Maschinen und Produktionsflächen." },
    ],
    processTitle: "So funktioniert es",
    process: [
      "Anfrage",
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
        a: "Wir bieten unsere Leistungen in Wien und Graz an. Fragen Sie uns gerne nach der Verfügbarkeit in Ihrer Region.",
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
    finalSubtitle: "Fordern Sie Ihre kostenlose Beratung an oder kontaktieren Sie uns direkt.",
    finalCta: "Anfrage starten",
    callNow: "Jetzt anrufen",
    directContact: "Direkter Kontakt",
    freeConsultTitle: "Kostenlose Beratung sofort per Anruf",
    freeConsultNote: "Kein Kalender nötig – rufen Sie uns direkt an und wir besprechen Ihren Bedarf sofort.",
    solutionTitle: "Unsere Lösung",
    gdprText: "DSGVO-konforme Prozesse",
  },
};

const serviceIcons = {
  businessMaintenance: Building2,
  businessDeep: Sparkles,
  businessStaircase: House,
  businessConstruction: Hammer,
  businessWindow: GlassWater,
  businessIndustrial: Factory,
};

const Unternehmen = [
  { key: "businessMaintenance" },
  { key: "businessStaircase" },
];

const Privatkunden = [
  { key: "privateMaintenance" },
];

const navCopy = {
  de: {
    services: "Leistungen",
    contact: "Kontakt",
    company: "Unternehmen",
    private: "Privatkunden",
    businessNote: "Für Unternehmen",
    privateNote: "Für Privatkunden",
    deepCleaning: "Tiefenreinigung",
    /* oneTimeCleaning removed */
    permanentCleaning: "Regelmäßige Reinigung",
    wienServices: "Services in Wien",
    grazServices: "Services in Graz",
    jobOpening: "Jobs",
    getPartners: "Partner werden",
  },
  en: {
    services: "Services",
    contact: "Contact",
    company: "Business",
    private: "Private Customers",
    businessNote: "For businesses",
    privateNote: "For private customers",
    deepCleaning: "Deep Cleaning",
    /* oneTimeCleaning removed */
    permanentCleaning: "Permanent Cleaning",
    wienServices: "Vienna Services",
    grazServices: "Graz Services",
    jobOpening: "Job Opening",
    getPartners: "Get Partners",
  },
};

export default function LandingAlternative() {
  const location = useLocation();
  const lang = getLocaleFromPathname(location.pathname);
  const c = useMemo(() => content[lang], [lang]);
  const n = navCopy[lang];

  const { t } = useTranslation();

  // controlled services menu (desktop + mobile)
  const [open, setOpen] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [openPrivate, setOpenPrivate] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const timerRef = useRef(null);
  useEffect(() => () => clearTimeout(timerRef.current), []);
  const openMenu = () => { clearTimeout(timerRef.current); setOpen(true); };
  const closeMenu = () => { clearTimeout(timerRef.current); timerRef.current = setTimeout(() => setOpen(false), 150); };

  const seoTitle = lang === "de"
    ? "Reinigung für Unternehmen in Wien & Graz | PutzELF"
    : "Business Cleaning Vienna & Graz | PutzELF";
  const seoDescription = lang === "de"
    ? "Zuverlässige Reinigung für Unternehmen in Wien und Graz. Klare Abläufe, feste Ansprechpartner und kostenlose Beratung."
    : "Reliable cleaning for businesses in Vienna and Graz, with clear routines, consistent contacts and quality checks.";

  const serviceLinks = [
    { key: "servicesOverview", label: lang === "de" ? "Alle Leistungen" : "All services" },
    { key: "privateMaintenance", label: lang === "de" ? "Unterhaltsreinigung" : "Maintenance cleaning" },
    { key: "privateDeep", label: lang === "de" ? "Grundreinigung" : "Deep cleaning" },
    { key: "privateResidential", label: lang === "de" ? "Wohnreinigung" : "Residential cleaning" },
    { key: "privateWindow", label: lang === "de" ? "Glas- & Rahmenreinigung" : "Window cleaning" },
    { key: "businessMaintenance", label: lang === "de" ? "Gewerbliche Unterhaltsreinigung" : "Business maintenance cleaning" },
    { key: "businessStaircase", label: lang === "de" ? "Treppenhausreinigung" : "Staircase cleaning" },
    { key: "contact", label: lang === "de" ? "Kontakt" : "Contact" },
    { key: "blog", label: "Blog" },
    { key: "privacy", label: lang === "de" ? "Datenschutz" : "Privacy policy" },
    { key: "imprint", label: lang === "de" ? "Impressum" : "Imprint" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={getLocalizedPath(lang, "home")}
        lang={lang}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "home")}
      />
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5be3e3]/30 via-white to-[#0097b2]/20" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {c.heroTitle}
              {c.heroTitleLine2 ? (
                <>
                  <br />
                  {c.heroTitleLine2}
                </>
              ) : null}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-700">{c.heroSubtitle}</p>

            <div className="mt-8 flex justify-center">
              <Link
                to={getLocalizedPath(lang, "booking")}
                className="rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#f97316] to-[#fb923c] px-8 py-3 text-base font-bold text-white shadow-lg hover:opacity-95 md:px-10 md:py-4 md:text-lg"
                onClick={() => trackEvent("AltLanding_Hero_CTA_Click", { cta: "inquiry_primary" })}
              >
                {c.heroPrimaryCta}
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-1">
              {c.trust.map((item, idx) => {
                const trustIconColors = ["text-amber-500"];
                const trustIcons = [Star];
                const TrustIcon = trustIcons[idx] || Star;

                if (idx === 0) {
                  return (
                    <a
                      key={item}
                      href="https://www.google.com/search?q=putzelf&oq=putzelf&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDwyBggCEEUYOzIGCAMQRRg8MgYIBBBFGDzSAQg1MTUyajBqN6gCALACAA&sourceid=chrome&ie=UTF-8"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-[#0097b2] hover:text-[#0097b2]"
                    >
                      <TrustIcon className={`h-4 w-4 ${trustIconColors[idx] || trustIconColors[0]}`} />
                      <span>{item}</span>
                    </a>
                  );
                }

                return null;
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0097b2]/10 px-3 py-1 text-sm font-semibold text-[#0097b2]">
              <Phone className="h-4 w-4" />
              {c.directContact}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">{c.freeConsultTitle}</h2>
            <p className="mt-3 text-slate-600">{c.freeConsultNote}</p>
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

      {/* Reviews carousel (replaces previous testimonials placeholder) */}
      <GoogleReviewsCarousel />

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
            <h3 className="text-2xl font-bold">{c.solutionTitle}</h3>
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
          {c.services.map((s) => {
            const Icon = serviceIcons[s.key] || Building2;
            return (
              <Link key={s.key} to={getLocalizedPath(lang, s.key)} className="group flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow transition hover:-translate-y-1 hover:shadow-lg">
                <Icon className="h-8 w-8 text-[#0097b2]" />
                <h4 className="mt-3 text-lg font-semibold group-hover:text-[#0097b2]">{s.title}</h4>
                <p className="mt-1 text-slate-600">{s.desc}</p>
              </Link>
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
                to={getLocalizedPath(lang, "booking")}
                className="rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#f97316] to-[#fb923c] px-10 py-4 text-center text-lg font-bold text-white shadow-lg hover:opacity-95 md:px-12 md:py-5"
                onClick={() => trackEvent("AltLanding_Process_CTA_Click", { cta: "book_cleaning_secondary" })}
              >
                {c.heroSecondaryCta}
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

      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">{lang === "de" ? "Unsere Standorte" : "Our locations"}</h3>
            <p className="mt-2 text-slate-600">
              {lang === "de"
                ? "PutzELF ist in Wien und Graz für Sie da."
                : "PutzELF is here for you in Vienna and Graz."}
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <article className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0097b2]/10 text-[#0097b2]">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h4 className="text-xl font-bold">{lang === "de" ? "Wien" : "Vienna"}</h4>
                <p className="mt-1 text-sm font-medium text-[#0097b2]">
                  {lang === "de" ? "Unternehmenssitz" : "Company headquarters"}
                </p>
                <address className="mt-2 not-italic leading-relaxed text-slate-700">
                  Simmeringer Hauptstraße 24<br />
                  {lang === "de" ? "1110 Wien" : "1110 Vienna"}
                </address>
              </div>
            </article>

            <article className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0097b2]/10 text-[#0097b2]">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h4 className="text-xl font-bold">Graz</h4>
                <p className="mt-1 text-sm font-medium text-[#0097b2]">
                  {lang === "de" ? "Filiale" : "Branch"}
                </p>
                <address className="mt-2 not-italic leading-relaxed text-slate-700">
                  Waagner-Biro-Straße 47<br />
                  8020 Graz
                </address>
              </div>
            </article>
          </div>
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
              {c.gdprText}
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
            <Phone className="h-4 w-4" /> {c.callNow}
          </a>
          <Link
            to={getLocalizedPath(lang, "booking")}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#0097b2] to-[#3b82f6] px-4 py-3 text-sm font-semibold text-white"
            onClick={() => trackEvent("AltLanding_Mobile_Book_Click", { cta: "sticky_mobile_book" })}
          >
            {c.heroSecondaryCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
