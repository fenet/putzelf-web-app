import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Calculator } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getLocalizedAlternates,
  getLocalizedPath,
  getLocaleFromPathname,
} from "../lib/localeRoutes";

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
const TAX_RATE = 0.2;

const getHourlyRate = (typeKey, subcategories) => {
  if (typeKey === "standard" || typeKey === "apartmentHotel") {
    const subs = Array.isArray(subcategories) ? subcategories : [];

    if (subs.includes("intensive") && subs.includes("window")) return 50;
    if (subs.includes("window")) return 44.9;
    if (subs.includes("intensive")) return 43.2;

    return 30;
  }

  return 30;
};

export default function PriceCalculator() {
  const { t } = useTranslation();
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);

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

  const netPrice = totalPrice;

  const taxAmount = useMemo(
    () => netPrice * TAX_RATE,
    [netPrice]
  );

  const grossPrice = useMemo(
    () => netPrice + taxAmount,
    [netPrice, taxAmount]
  );

  const chooseType = (key) => {
    setForm((prev) => ({
      ...prev,
      typeKey: key,
      subcategories: [],
    }));
  };

  const toggleSubcategory = (key) => {
    setForm((prev) => {
      const current = Array.isArray(prev.subcategories)
        ? prev.subcategories
        : [];

      return {
        ...prev,
        subcategories: current.includes(key)
          ? current.filter((item) => item !== key)
          : [...current, key],
      };
    });
  };

  const incrementDuration = () => {
    setForm((prev) => ({
      ...prev,
      duration: normalizedDuration + 1,
    }));
  };

  const decrementDuration = () => {
    setForm((prev) => ({
      ...prev,
      duration: Math.max(MIN_HOURS, normalizedDuration - 1),
    }));
  };

  const handleDurationChange = (e) => {
    const value = Number(e.target.value);

    if (!Number.isNaN(value)) {
      setForm((prev) => ({
        ...prev,
        duration: Math.max(MIN_HOURS, value),
      }));
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
    form.typeKey === "standard" ||
    form.typeKey === "apartmentHotel";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Seo
        title={
          locale === "de"
            ? "Preisrechner Reinigung Wien"
            : "Cleaning Price Calculator Vienna"
        }
        description={
          locale === "de"
            ? "Preisrechner für Reinigung in Wien: Kosten (brutto) in wenigen Sekunden berechnen."
            : "Cleaning price calculator for Vienna: estimate the gross cost in seconds."
        }
        path={getLocalizedPath(locale, "calculator")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "calculator")}
      />

      <Navbar />

      {/* =========================
          BACK BUTTON
      ========================== */}
      <div className="flex justify-center px-4 pt-4 md:pt-5">
        <Link
          to={getLocalizedPath(locale, "home")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0097b2] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#007f96] hover:shadow-md active:scale-95 sm:px-6 sm:py-3 sm:text-base"
        >
          <span className="text-lg leading-none">←</span>
          {t("common.backToHome", {
            defaultValue:
              locale === "de" ? "Zur Startseite" : "Back to home",
          })}
        </Link>
      </div>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <main className="flex flex-1 justify-center px-4 pb-16 pt-6 md:px-6 md:pt-8">
        <div className="flex w-full max-w-5xl flex-col gap-8">
          
          {/* =========================
              HEADER
          ========================== */}
          <header className="space-y-4 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6fbff] text-[#0097b2]">
              <Calculator size={32} />
            </span>

            <h1 className="text-3xl font-bold text-[#000000] md:text-4xl">
              {t("calculator.title")}
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base">
              {t("calculator.subtitle")}
            </p>
          </header>

          {/* =========================
              CALCULATOR
          ========================== */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
            
            {/* LEFT SIDE */}
            <section className="space-y-8 rounded-2xl border border-[#e0f7f7] bg-white p-5 shadow-lg md:p-6">
              
              {/* Cleaning Type */}
              <div>
                <h2 className="mb-4 text-lg font-semibold text-[#0097b2]">
                  {t("calculator.typeHeading")}
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {cleaningTypes.map(({ key, emoji }) => {
                    const selected = form.typeKey === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => chooseType(key)}
                        className={`flex flex-col items-center justify-center rounded-xl border p-4 text-sm font-medium shadow-sm transition ${
                          selected
                            ? "border-[#00b3c1] bg-[#5be3e3] text-black shadow-lg"
                            : "bg-gray-50 hover:shadow"
                        }`}
                        aria-pressed={selected}
                      >
                        <span className="mb-2 text-3xl">
                          {emoji}
                        </span>

                        {t(`home.types.${key}`)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subcategories */}
              {shouldShowSubcategories && (
                <div>
                  <h3 className="mb-3 text-md font-semibold text-[#0097b2]">
                    {t("calculator.subHeading")}
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {premiumSubcategories.map(({ key, emoji }) => {
                      const selected =
                        form.subcategories.includes(key);

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
                          <span className="mr-2 text-xl">
                            {emoji}
                          </span>

                          {t(`home.subcategories.${key}`)}
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    {t("calculator.premiumNotice")}
                  </p>
                </div>
              )}

              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
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

                <p className="mt-2 text-xs text-gray-500">
                  {t("calculator.durationHelp")}
                </p>
              </div>

              {/* Renegotiate / Reset */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center space-x-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={form.renegotiate}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        renegotiate: e.target.checked,
                      }))
                    }
                    className="h-4 w-4"
                  />

                  <span>
                    {t("calculator.renegotiateLabel")}
                  </span>
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

            {/* RIGHT SIDE */}
            <aside className="h-fit space-y-5 rounded-2xl border border-[#e0f7f7] bg-white p-5 shadow-lg md:p-6">
              
              {/* Price */}
              <div className="rounded-2xl bg-gradient-to-br from-[#0097b2] to-[#007a90] p-5 text-white shadow-md">
                <p className="text-sm uppercase tracking-wide opacity-80">
                  {t("calculator.estimatedTotalLabel", {
                    defaultValue: "Price breakdown",
                  })}
                </p>

                <div className="mt-3 rounded-xl bg-white/10 p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-[#d8f7fb]">
                    {t("calculator.bruttoLabelShort", {
                      defaultValue: "Brutto",
                    })}
                  </p>

                  <p className="mt-1 text-4xl font-bold md:text-5xl">
                    €{grossPrice.toFixed(2)}
                  </p>

                  <p className="mt-1 text-xs text-[#d8f7fb]">
                    {t("calculator.bruttoLabel", {
                      defaultValue: "Includes 20% tax",
                    })}
                  </p>
                </div>

                <div className="mt-4 space-y-2 rounded-xl bg-white/10 p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="opacity-90">
                      {t("calculator.bruttoLabelShort", {
                        defaultValue: "Brutto",
                      })}
                    </span>

                    <span>
                      €{grossPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="opacity-90">
                      {t("calculator.taxLabel", {
                        defaultValue: "Tax (20%)",
                      })}
                    </span>

                    <span>
                      €{taxAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/20 pt-2 text-base font-semibold">
                    <span>
                      {t("calculator.bruttoLabelShort", {
                        defaultValue: "Brutto",
                      })}
                    </span>

                    <span>
                      €{grossPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-[#d8f7fb]">
                  {t("calculator.hourlyRate", {
                    rate: (hourlyRate * (1 + TAX_RATE)).toFixed(2),
                  })}
                </p>
              </div>

              {/* Summary */}
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>
                    {t("home.durationLabel")}:
                  </strong>{" "}
                  {normalizedDuration}h
                </li>

                <li>
                  <strong>
                    {t("calculator.typeHeading")}:
                  </strong>{" "}
                  {t(`home.types.${form.typeKey}`)}
                </li>

                <li>
                  <strong>
                    {t("home.subcategories.title")}:
                  </strong>{" "}
                  {form.subcategories.length
                    ? form.subcategories
                        .map((key) =>
                          t(`home.subcategories.${key}`)
                        )
                        .join(", ")
                    : t("home.subcategories.none", {
                        defaultValue: "—",
                      })}
                </li>
              </ul>

              {/* Book Now */}
              <Link
                to={getLocalizedPath(locale, "booking")}
                className="block rounded-xl bg-[#5be3e3] py-3 text-center font-semibold text-black transition hover:bg-[#48c9c9]"
                onClick={() => {
                  try {
                    trackEvent("Calculator_Book_Now_Click");
                  } catch (_) {}
                }}
              >
                {t("calculator.cta")}
              </Link>

              <p className="text-xs text-gray-500">
                {t("calculator.disclaimer")}
              </p>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}