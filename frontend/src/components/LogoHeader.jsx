import logo from "../assets/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocation, Link } from "react-router-dom";
import { getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

export default function LogoHeader() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  return (
    <header className="py-3 flex flex-col items-center text-center">
      {/* Logo as a clickable link */}
      <Link to={getLocalizedPath(locale, "home")}>
        <img src={logo} alt="PutzELF logo" className="w-48 h-auto mb-1 cursor-pointer" />
      </Link>


      {/* Bigger text */}
      <h1 className="text-6xl font-extrabold text-black">
        Putz<span style={{ color: "#0097b2" }}>ELF</span>
      </h1>
      <LanguageSwitcher className="mt-3" compact />
    </header>
  );
}

