import { Instagram, Facebook, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";
import { copy as navCopy } from "./Navbar";

const privateServiceKeys = [
  "privateMaintenance", "privateDeep", "privateResidential",
  "privateConstruction", "privateWindow", "privateIndustrial",
];
const businessServiceKeys = [
  "businessMaintenance", "businessDeep", "businessStaircase",
  "businessConstruction", "businessWindow", "businessIndustrial",
];

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = navCopy[locale] || navCopy.en;
  return (
           <footer className="bg-white text-gray-700 mt-auto border-t border-gray-200">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {c.services}
            </h4>
            <Link to={getLocalizedPath(locale, "servicesOverview")} className="inline-block mb-5 font-semibold text-[#0097b2] underline underline-offset-4 hover:text-[#007f95]">
              {locale === "de" ? "Alle Leistungen" : "All services"}
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold text-gray-900 transition hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  <span>{c.private}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="space-y-2 px-4 pb-4 text-gray-600">
                  {privateServiceKeys.map((key) => (
                    <li key={key}>
                      <Link to={getLocalizedPath(locale, key)} className="hover:text-[#0097b2] transition-colors">{c[key]}</Link>
                    </li>
                  ))}
                </ul>
              </details>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold text-gray-900 transition hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  <span>{c.company}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="space-y-2 px-4 pb-4 text-gray-600">
                  {businessServiceKeys.map((key) => (
                    <li key={key}>
                      <Link to={getLocalizedPath(locale, key)} className="hover:text-[#0097b2] transition-colors">{c[key]}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.connect.title")}
            </h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.instagram.com/putzelf11/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580613673114"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-col space-y-2 text-sm">
              <ul className="space-y-2 text-sm">
                <li><Link to={getLocalizedPath(locale, "contact")} className="hover:text-gray-900 transition-colors">{c.contact}</Link></li>
                <li><Link to={getLocalizedPath(locale, "blog")} className="hover:text-gray-900 transition-colors">{c.blog}</Link></li>
                <li><Link to={getLocalizedPath(locale, "jobOpening")} className="hover:text-gray-900 transition-colors">{c.jobOpening}</Link></li>
                <li><Link to={getLocalizedPath(locale, "getPartners")} className="hover:text-gray-900 transition-colors">{c.getPartners}</Link></li>
                <li>
                  <a href="/files/04_AGB_PutzELF.docx" download="04_AGB_PutzELF.docx" className="hover:text-gray-900 transition-colors">
                    {t("footer.connect.links.terms")}
                  </a>
                </li>
                <li>
                  <a href="/files/06_FAGG_Ruecktrittsbelehrung_PutzELF.docx" download="06_FAGG_Ruecktrittsbelehrung_PutzELF.docx" className="hover:text-gray-900 transition-colors">
                    {t("footer.connect.links.withdrawal")}
                  </a>
                </li>
                <li>
                  <Link to={getLocalizedPath(locale, "privacy")} className="hover:text-gray-900 transition-colors">
                    {t("footer.connect.links.privacy")}
                  </Link>
                </li>
                <li>
                  <Link to={getLocalizedPath(locale, "imprint")} className="hover:text-gray-900 transition-colors">
                    {t("footer.connect.links.imprint")}
                  </Link>
                </li>
              </ul>

              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                  className="hover:text-gray-900 underline"
                >
                  {locale === 'de' ? 'Cookie-Einstellungen' : 'Cookie Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PutzELF — Alle Rechte vorbehalten.
        </div>
      </footer>


  );
}
