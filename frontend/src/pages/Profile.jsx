import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { trackEvent } from "../lib/analytics";
import { Phone, Mail, Star } from "lucide-react";
import logo from "../assets/logo.png";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);

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

  const workers = [
    { id: "agnesC", name: "Agnes C.", rating: 4.96, reviews: 182 },
    { id: "kaldesalC", name: "Kalderal C.", rating: 4.9, reviews: 128 },
    { id: "dobrilaN", name: "Dobrila N.", rating: 4.85, reviews: 97 },
    { id: "chirstyM", name: "Chirsty M.", rating: 4.93, reviews: 175 },
    { id: "eojleceT", name: "Erika T.", rating: 4.92, reviews: 143 },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-gray-50">
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

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {workers.map((worker) => (
            <article
              key={worker.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-200 hover:-translate-y-1 p-6 flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#000000]">
                  {worker.name.toUpperCase()}
                </h2>
                
                <span className="flex items-center text-[#facc15] font-semibold">
                  <Star size={20} className="fill-[#facc15] text-[#facc15] mr-1" />
                  {worker.rating.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {t("profile.rating", {
                  rating: worker.rating.toFixed(2),
                  reviews: worker.reviews,
                })}
              </p>
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