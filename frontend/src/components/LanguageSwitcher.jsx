import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getEquivalentPath, getLocaleFromPathname } from "../lib/localeRoutes";

export default function LanguageSwitcher({ className = "", compact = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const locale = getLocaleFromPathname(location.pathname);

  const switchTo = (targetLocale) => {
    const nextPath = getEquivalentPath(location.pathname, targetLocale);
    navigate(nextPath);
  };

  const buttonBase = compact
    ? "w-8 h-8 flex items-center justify-center rounded-full border text-sm hover:bg-gray-50"
    : "h-9 px-3 rounded-full border text-sm font-medium hover:bg-gray-50";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => switchTo("en")}
        title={t("nav.switchEnglish")}
        aria-label={t("nav.switchEnglish")}
        className={`${buttonBase} ${locale === "en" ? "ring-2 ring-[#0097b2]" : ""}`}
      >
        {compact ? <span role="img" aria-label={t("nav.englishFlag")}>🇬🇧</span> : "EN"}
      </button>
      <button
        onClick={() => switchTo("de")}
        title={t("nav.switchGerman")}
        aria-label={t("nav.switchGerman")}
        className={`${buttonBase} ${locale === "de" ? "ring-2 ring-[#0097b2]" : ""}`}
      >
        {compact ? <span role="img" aria-label={t("nav.germanFlag")}>🇩🇪</span> : "DE"}
      </button>
    </div>
  );
}
