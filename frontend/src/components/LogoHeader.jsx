import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";

export default function LogoHeader() {
  const { i18n } = useTranslation();
  return (
    <header className="py-3 flex flex-col items-center text-center">
      {/* Logo as a clickable link */}
      <a href="/">
  <img
    src={logo}
    alt="Logo"
    className="w-48 h-auto mb-1 cursor-pointer"
  />
</a>


      {/* Bigger text */}
      <h1 className="text-6xl font-extrabold text-black">
        Putz<span style={{ color: "#0097b2" }}>ELF</span>
      </h1>
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => i18n.changeLanguage('en')}
          title="English"
          aria-label="Switch to English"
          className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm hover:bg-gray-50 ${i18n.language && i18n.language.startsWith('en') ? 'ring-2 ring-[#0097b2]' : ''}`}
        >
          <span role="img" aria-label="English flag">🇬🇧</span>
        </button>
        <button
          onClick={() => i18n.changeLanguage('de')}
          title="Deutsch"
          aria-label="Auf Deutsch umschalten"
          className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm hover:bg-gray-50 ${i18n.language && i18n.language.startsWith('de') ? 'ring-2 ring-[#0097b2]' : ''}`}
        >
          <span role="img" aria-label="German flag">🇩🇪</span>
        </button>
      </div>
    </header>
  );
}

