import { useNavigate, useLocation } from "react-router-dom";
import { getEquivalentPath, getLocaleFromPathname } from "../lib/localeRoutes";

export default function LanguageSwitcher({ className = "", compact = false }) {
  const navigate = useNavigate();
  const location = useLocation();
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
        title="English"
        aria-label="Switch to English"
        className={`${buttonBase} ${locale === "en" ? "ring-2 ring-[#0097b2]" : ""}`}
      >
        {compact ? <span role="img" aria-label="English flag">🇬🇧</span> : "EN"}
      </button>
      <button
        onClick={() => switchTo("de")}
        title="Deutsch"
        aria-label="Auf Deutsch umschalten"
        className={`${buttonBase} ${locale === "de" ? "ring-2 ring-[#0097b2]" : ""}`}
      >
        {compact ? <span role="img" aria-label="German flag">🇩🇪</span> : "DE"}
      </button>
    </div>
  );
}
