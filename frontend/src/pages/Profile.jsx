import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { trackEvent } from "../lib/analytics";
import { apiFetch, parseJsonSafe } from "../lib/api";
import { Phone, Mail, Star } from "lucide-react";
import logo from "../assets/logo.png";
import Seo from "../components/Seo";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [employeesError, setEmployeesError] = useState(null);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = String(name)
      .replace(/\./g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return `${first}${last}`.toUpperCase();
  };

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent");
    const storedTime = localStorage.getItem("cookieConsentTime");

    if (!storedConsent || !storedTime) {
      setShowBanner(true);
      return;
    }

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    if (now - parseInt(storedTime, 10) > oneDay) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("cookieConsentTime", Date.now().toString());
    setShowBanner(false);
    window.dispatchEvent(
      new CustomEvent("consentChanged", { detail: { consent: true } })
    );
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    localStorage.setItem("cookieConsentTime", Date.now().toString());
    setShowBanner(false);
    window.dispatchEvent(
      new CustomEvent("consentChanged", { detail: { consent: false } })
    );
  };

  const handleSelectWorker = (workerId) => {
    trackEvent("Profile_Select_Worker", { workerId });
    navigate(`/book?worker=${workerId}`);
  };

  const workers = useMemo(() => {
    const shuffle = (items) => {
      const arr = [...items];
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const baseWorkers = Array.isArray(employees) ? employees : [];
    const normalized = baseWorkers
      .map((emp) => {
        const code = String(emp?.code || "").trim();
        if (!code) return null;
        const name = String(emp?.name || code).trim() || code;
        const active = emp?.active !== false;
        return active ? { id: code, name } : null;
      })
      .filter(Boolean);

    return shuffle(normalized);
  }, [employees]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setEmployeesLoading(true);
        setEmployeesError(null);
        const res = await apiFetch("/api/workers", { signal: controller.signal });
        const data = await parseJsonSafe(res);
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load workers");
        }
        const next = Array.isArray(data?.employees) ? data.employees : [];
        setEmployees(next);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setEmployees([]);
        setEmployeesError(err?.message || "Failed to load workers");
      } finally {
        setEmployeesLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-gray-50">
      <Seo
        title={i18n.language?.startsWith("de") ? "Reinigungskraft auswählen" : "Choose a cleaner"}
        description={
          i18n.language?.startsWith("de")
            ? "Wählen Sie Ihre Reinigungskraft aus und buchen Sie Ihren Termin."
            : "Choose your cleaner and book your appointment."
        }
        path="/profile"
        noindex
      />
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3 md:space-x-6 min-w-0">
            <Link
              to="/"
              className="shrink-0"
              aria-label={t("nav.home", { defaultValue: "Home" })}
            >
              <img src={logo} alt={t("alt.logo")} className="h-12 md:h-20 w-auto" />
            </Link>
            <a
              href="tel:+436673302277"
              className="flex flex-col items-center text-[#0097b2] font-semibold hover:underline"
              aria-label="Call us"
              onClick={() =>
                trackEvent("Contact_Phone_Click", {
                  contact_method: "phone",
                  source: "navbar",
                })
              }
            >
              <Phone size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden md:inline text-base text-gray-700">
                +43 676 6300167
              </span>
            </a>
            <a
              href="mailto:office@putzelf.com"
              className="flex flex-col items-center text-[#5be3e3] font-semibold hover:underline"
              aria-label="Email us"
              onClick={() =>
                trackEvent("Contact_Email_Click", {
                  contact_method: "email",
                  source: "navbar",
                })
              }
            >
              <Mail size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden md:inline text-base text-gray-700">
                office@putzelf.com
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <Link
              to="/book"
              className="hidden md:block bg-[#0097b2] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-lg font-semibold shadow-md animate-pulse-button whitespace-nowrap"
              onClick={() =>
                trackEvent("Navbar_Book_Click", { source: "navbar_desktop" })
              }
            >
              {t("nav.bookNow")}
            </Link>
            <button
              onClick={() => i18n.changeLanguage("en")}
              title="English"
              aria-label="Switch to English"
              className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border text-sm md:text-base hover:bg-gray-50 ${
                i18n.language && i18n.language.startsWith("en")
                  ? "ring-2 ring-[#0097b2]"
                  : ""
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
              className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border text-sm md:text-base hover:bg-gray-50 ${
                i18n.language && i18n.language.startsWith("de")
                  ? "ring-2 ring-[#0097b2]"
                  : ""
              }`}
            >
              <span role="img" aria-label="German flag">
                🇩🇪
              </span>
            </button>
          </div>

          <div className="w-full flex justify-center mt-2 md:hidden">
            <Link
              to="/book"
              className="bg-[#0097b2] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md animate-pulse-button whitespace-nowrap"
              onClick={() =>
                trackEvent("Navbar_Book_Click", { source: "navbar_mobile" })
              }
            >
              {t("nav.bookNow")}
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 md:pt-20 pb-16 flex-1 w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#000000]">
            {t("profile.title")}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t("profile.subtitle")}
          </p>
        </header>

        {employeesLoading && (
          <p className="text-center text-gray-600">{t("common.loading", { defaultValue: "Loading…" })}</p>
        )}
        {!employeesLoading && employeesError && (
          <p className="text-center text-red-600">{employeesError}</p>
        )}

        {!employeesLoading && !employeesError && workers.length === 0 && (
          <p className="text-center text-gray-600">
            {t("profile.noWorkers", { defaultValue: "No active workers available." })}
          </p>
        )}

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {workers.map((worker) => (
            <article
              key={worker.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-200 hover:-translate-y-1 p-8 flex flex-col space-y-5"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="relative">
                  {worker.photoUrl ? (
                    <img
                      src={worker.photoUrl}
                      alt={worker.name}
                      className="h-36 w-36 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full object-cover shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-36 w-36 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full bg-gradient-to-br from-[#5be3e3] via-[#0097b2] to-[#48c6ef] flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-sm">
                      {getInitials(worker.name)}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold text-[#000000]">
                  {worker.name.toUpperCase()}, Putzfrau in Wien
                </h2>

                <span className="inline-flex items-center justify-center text-gray-500 font-medium">
                  <Star size={18} className="text-gray-400 mr-1" />
                  {t("profile.workerLabel", { defaultValue: "Cleaner" })}
                </span>
              </div>
              <p className="text-sm text-gray-500">{t("profile.chooseSubtitle", { defaultValue: "Choose this cleaner to continue." })}</p>
              <button
                type="button"
                onClick={() => handleSelectWorker(worker.id)}
                className="mt-auto inline-flex items-center justify-center bg-gradient-to-r from-[#5be3e3] via-[#0097b2] to-[#48c6ef] text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition"
              >
                {t("profile.choose")}
              </button>
            </article>
          ))}
        </section>
      </main>

      {showBanner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center space-y-4">
            <p className="text-gray-700">
              {t("cookies.msg")}
              <Link to="/privacy" className="underline text-[#5be3e3]">
                {t("cookies.privacyPolicy")}
              </Link>
              .
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  declineCookies();
                  trackEvent("Cookie_Decline_Click", {
                    consent: false,
                    source: "banner",
                  });
                }}
                className="bg-gray-300 text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                {t("cookies.decline")}
              </button>
              <button
                onClick={() => {
                  acceptCookies();
                  trackEvent("Cookie_Accept_Click", {
                    consent: true,
                    source: "banner",
                  });
                }}
                className="bg-[#5be3e3] text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                {t("cookies.accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}