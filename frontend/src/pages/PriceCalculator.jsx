import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Calculator, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import logo from "../assets/logo.png";

const cleaningTypes = [
  { key: "standard", emoji: "✨" },
  { key: "office", emoji: "🏢" },
  { key: "apartmentHotel", emoji: "🏨" },
];

const premiumSubcategories = [
  { key: "intensive", emoji: "🧹" },
  { key: "window", emoji: "🪟" },
];

const MIN_HOURS = 3;

const getHourlyRate = (typeKey, subcategories) => {
  const premiumCount = Array.isArray(subcategories) ? subcategories.length : 0;
  if (typeKey === "standard" || typeKey === "apartmentHotel") {
    if (premiumCount === 0) return 30;
    if (premiumCount === 1) return 42;
    return 48;
  }
  return 30;
};

export default function PriceCalculator() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const [form, setForm] = useState({
    duration: MIN_HOURS,
    typeKey: "standard",
    subcategories: [],
    renegotiate: false,
  });

  const hourlyRate = useMemo(
    () => getHourlyRate(form.typeKey, form.subcategories),
    [form.typeKey, form.subcategories]
  );
  const normalizedDuration = useMemo(
    () => Math.max(MIN_HOURS, Number(form.duration) || MIN_HOURS),
    [form.duration]
  );
  const totalPrice = useMemo(
    () => normalizedDuration * hourlyRate,
    [normalizedDuration, hourlyRate]
  );

  const chooseType = (key) =>
    setForm((prev) => ({ ...prev, typeKey: key, subcategories: [] }));

  const toggleSubcategory = (key) =>
    setForm((prev) => {
      const current = Array.isArray(prev.subcategories) ? prev.subcategories : [];
      return {
        ...prev,
        subcategories: current.includes(key)
          ? current.filter((item) => item !== key)
          : [...current, key],
      };
    });

  const incrementDuration = () =>
    setForm((prev) => ({ ...prev, duration: normalizedDuration + 1 }));

  const decrementDuration = () =>
    setForm((prev) => ({ ...prev, duration: Math.max(MIN_HOURS, normalizedDuration - 1) }));

  const handleDurationChange = (e) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) {
      setForm((prev) => ({ ...prev, duration: Math.max(MIN_HOURS, value) }));
    }
  };

  const handleDurationKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      incrementDuration();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrementDuration();
    }
  };

  const resetForm = () =>
    setForm({
      duration: MIN_HOURS,
      typeKey: "standard",
      subcategories: [],
      renegotiate: false,
    });

  const shouldShowSubcategories =
    form.typeKey === "standard" || form.typeKey === "apartmentHotel";

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafa]">
      <nav className="bg-white shadow-md fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 md:px-6 md:py-4">
          <div className="flex min-w-0 items-center space-x-3 md:space-x-6">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => trackEvent("Navbar_Logo_Click", { source: "calculator" })}
            >
              <img src={logo} alt={t("alt.logo")} className="h-12 w-auto shrink-0 md:h-20" />
            </Link>
            
            <a
              href="tel:+436673302277"
              className="flex flex-col items-center font-semibold text-[#0097b2] hover:underline"
              aria-label="Call us"
              onClick={() =>
                trackEvent("Contact_Phone_Click", { contact_method: "phone", source: "navbar_calculator" })
              }
            >
              <Phone size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden text-base text-gray-700 md:inline">+43 676 6300167</span>
            </a>
            <a
              href="mailto:office@putzelf.com"
              className="flex flex-col items-center font-semibold text-[#5be3e3] hover:underline"
              aria-label="Email us"
              onClick={() =>
                trackEvent("Contact_Email_Click", { contact_method: "email", source: "navbar_calculator" })
              }
            >
              <Mail size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden text-base text-gray-700 md:inline">office@putzelf.com</span>
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <Link
              to="/profile"
              className="hidden whitespace-nowrap rounded-lg bg-[#0097b2] px-4 py-2 text-sm font-semibold text-white shadow-md md:block md:px-6 md:py-3 md:text-lg"
              onClick={() => trackEvent("Navbar_Book_Click", { source: "navbar_calculator_desktop" })}
            >
              {t("nav.bookNow")}
            </Link>
            <button
              onClick={() => i18n.changeLanguage("en")}
              title="English"
              aria-label="Switch to English"
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm hover:bg-gray-50 md:h-9 md:w-9 md:text-base ${
                i18n.language?.startsWith("en") ? "ring-2 ring-[#0097b2]" : ""
              }`}
            >
              <span role="img" aria-label="English flag">
                🇬🇧
              </span>
            </button>
            <button
              onClick={() => i18n.changeLanguage("de")}
              title="Deutsch"
              aria-label="Auf Deutsch umschalten"
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm hover:bg-gray-50 md:h-9 md:w-9 md:text-base ${
                i18n.language?.startsWith("de") ? "ring-2 ring-[#0097b2]" : ""
              }`}
            >
              <span role="img" aria-label="German flag">
                🇩🇪
              </span>
            </button>
          </div>

          <div className="mt-2 flex w-full justify-center md:hidden">
            <Link
              to="/profile"
              className="whitespace-nowrap rounded-lg bg-[#0097b2] px-4 py-2 text-sm font-semibold text-white shadow-md"
              onClick={() => trackEvent("Navbar_Book_Click", { source: "navbar_calculator_mobile" })}
            >
              {t("nav.bookNow")}
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex flex-1 justify-center px-4 pb-16 pt-32 md:px-6 md:pt-36">
        <div className="flex w-full max-w-5xl flex-col gap-10">
          <header className="text-center space-y-4">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6fbff] text-[#0097b2]">
              <Calculator size={32} />
            </span>
            <h1 className="text-3xl font-bold text-[#000000] md:text-4xl">{t("calculator.title")}</h1>
            <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base">
              {t("calculator.subtitle")}
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
            <section className="space-y-8 rounded-2xl border border-[#e0f7f7] bg-white p-5 shadow-lg md:p-6">
              <div>
                <h2 className="mb-4 text-lg font-semibold text-[#0097b2]">{t("calculator.typeHeading")}</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {cleaningTypes.map(({ key, emoji }) => {
                    const selected = form.typeKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => chooseType(key)}
                        className={`flex flex-col items-center justify-center rounded-xl border p-4 text-sm font-medium transition shadow-sm ${
                          selected
                            ? "border-[#00b3c1] bg-[#5be3e3] text-black shadow-lg"
                            : "bg-gray-50 hover:shadow"
                        }`}
                        aria-pressed={selected}
                      >
                        <span className="mb-2 text-3xl">{emoji}</span>
                        {t(`home.types.${key}`)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {shouldShowSubcategories && (
                <div>
                  <h3 className="mb-3 text-md font-semibold text-[#0097b2]">{t("calculator.subHeading")}</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {premiumSubcategories.map(({ key, emoji }) => {
                      const selected = form.subcategories.includes(key);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleSubcategory(key)}
                          className={`flex items-center justify-center rounded-lg border p-3 text-sm font-medium transition ${
                            selected
                              ? "border-[#00b3c1] bg-[#5be3e3] text-black shadow"
                              : "bg-gray-50 hover:shadow"
                          }`}
                          aria-pressed={selected}
                        >
                          <span className="mr-2 text-xl">{emoji}</span>
                          {t(`home.subcategories.${key}`)}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">{t("calculator.premiumNotice")}</p>
                </div>
              )}

              <div>
                <label htmlFor="duration" className="mb-2 block text-sm font-medium text-gray-700">
                  {t("calculator.durationLabel")}
                </label>
                <div className="flex items-stretch">
                  <button
                    type="button"
                    onClick={decrementDuration}
                    className="rounded-l-lg border border-r-0 bg-gray-50 px-4 hover:bg-gray-100"
                    aria-label="Decrease hours"
                  >
                    −
                  </button>
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    min={MIN_HOURS}
                    value={normalizedDuration}
                    onChange={handleDurationChange}
                    onKeyDown={handleDurationKeyDown}
                    className="w-full border border-gray-300 text-center focus:ring-2 focus:ring-[#5be3e3]"
                  />
                  <button
                    type="button"
                    onClick={incrementDuration}
                    className="rounded-r-lg border border-l-0 bg-gray-50 px-4 hover:bg-gray-100"
                    aria-label="Increase hours"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">{t("calculator.durationHelp")}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center space-x-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={form.renegotiate}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, renegotiate: e.target.checked }))
                    }
                    className="h-4 w-4"
                  />
                  <span>{t("calculator.renegotiateLabel")}</span>
                </label>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm font-semibold text-[#0097b2] hover:underline"
                >
                  {t("calculator.resetBtn")}
                </button>
              </div>
            </section>

            <aside className="h-fit space-y-5 rounded-2xl border border-[#e0f7f7] bg-white p-5 shadow-lg md:p-6">
              <div className="rounded-xl bg-[#0097b2] p-5 text-white shadow-md">
                <p className="text-sm uppercase tracking-wide opacity-80">
                  {t("calculator.estimatedTotalLabel")}
                </p>
                <p className="mt-2 text-3xl font-bold md:text-4xl">€{totalPrice.toFixed(2)}</p>
                <p className="mt-3 text-sm text-[#d8f7fb]">
                  {t("calculator.hourlyRate", { rate: hourlyRate.toFixed(2) })}
                </p>
              </div>

              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>{t("home.durationLabel")}:</strong> {normalizedDuration}h
                </li>
                <li>
                  <strong>{t("calculator.typeHeading")}:</strong> {t(`home.types.${form.typeKey}`)}
                </li>
                <li>
                  <strong>{t("home.subcategories.title")}:</strong>{" "}
                  {form.subcategories.length
                    ? form.subcategories.map((key) => t(`home.subcategories.${key}`)).join(", ")
                    : t("home.subcategories.none", { defaultValue: "—" })}
                </li>
              </ul>

              <Link
                to="/profile"
                className="block rounded-xl bg-[#5be3e3] py-3 text-center font-semibold text-black transition hover:bg-[#48c9c9]"
                onClick={() => trackEvent("Calculator_Book_Now_Click")}
              >
                {t("calculator.cta")}
              </Link>

              <p className="text-xs text-gray-500">{t("calculator.disclaimer")}</p>
            </aside>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white text-gray-700">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-4">
          <div>
            <h4 className="mb-4 border-b border-gray-300 pb-2 text-lg font-semibold">
              {t("footer.staff.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/files/Datenschutzblat.pdf" download className="transition-colors hover:text-gray-900">
                  {t("footer.staff.links.privacySheet")}
                </a>
              </li>
              <li>
                <a href="/files/Dienstliste.pdf" download className="transition-colors hover:text-gray-900">
                  {t("footer.staff.links.dutyRoster")}
                </a>
              </li>
              <li>
                <a href="/files/Stammdatenblatt.pdf" download className="transition-colors hover:text-gray-900">
                  {t("footer.staff.links.masterData")}
                </a>
              </li>
              <li>
                <a
                  href="/files/Urlaubsschein_Zeitausgleich.pdf"
                  download
                  className="transition-colors hover:text-gray-900"
                >
                  {t("footer.staff.links.leaveForm")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 border-b border-gray-300 pb-2 text-lg font-semibold">
              {t("footer.partners.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/files/Partnerantrag.pdf" download className="transition-colors hover:text-gray-900">
                  {t("footer.partners.links.partnerApplication")}
                </a>
              </li>
              <li>
                <a href="/files/Dienstleistungsvertrag.pdf" download className="transition-colors hover:text-gray-900">
                  {t("footer.partners.links.serviceContract")}
                </a>
              </li>
              <li>
                <a href="/files/Subvertrag.pdf" download className="transition-colors hover:text-gray-900">
                  {t("footer.partners.links.subcontract")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 border-b border-gray-300 pb-2 text-lg font-semibold">
              {t("footer.customers.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/files/Dienstleistungsvertrag1.pdf"
                  download
                  className="transition-colors hover:text-gray-900"
                >
                  {t("footer.customers.links.cleaningStandards")}
                </a>
              </li>
              <li>
                <a href="/files/Pricelist.pdf" download className="transition-colors hover:text-gray-900">
                  {t("footer.customers.links.priceList")}
                </a>
              </li>
              <li>
                <a href="/files/Contract.pdf" download className="transition-colors hover:text-gray-900">
                  {t("footer.customers.links.serviceContract")}
                </a>
              </li>
              <li>
                <Link to="/calculator" className="transition-colors hover:text-gray-900">
                  {t("footer.customers.links.calculator")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 border-b border-gray-300 pb-2 text-lg font-semibold">
              {t("footer.connect.title")}
            </h4>
            <div className="mb-6 flex space-x-4">
              <a
                href="https://www.instagram.com/putzelf11/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gray-900"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580613673114"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gray-900"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/putz-elf-wien1110/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gray-900"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <div className="flex flex-col space-y-2 text-sm">
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/files/Allgemeine_Geschäftsbedingungen_ Neu.pdf"
                    download
                    className="transition-colors hover:text-gray-900"
                  >
                    {t("footer.connect.links.terms")}
                  </a>
                </li>
                <li>
                  <a
                    href="/files/Datenschutzbestimmungen.pdf"
                    download
                    className="transition-colors hover:text-gray-900"
                  >
                    {t("footer.connect.links.privacy")}
                  </a>
                </li>
              </ul>

              <Link to="/imprint" className="transition-colors hover:text-gray-900">
                {t("footer.connect.links.imprint")}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Putzelf — Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
}