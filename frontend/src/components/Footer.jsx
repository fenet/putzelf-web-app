import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
           <footer className="bg-white text-gray-700 mt-auto border-t border-gray-200">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.staff.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/files/Datenschutzblat.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.staff.links.privacySheet")}
                </a>
              </li>
              <li>
                <a href="/files/Dienstliste.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.staff.links.dutyRoster")}
                </a>
              </li>
              <li>
                <a href="/files/Stammdatenblatt.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.staff.links.masterData")}
                </a>
              </li>
              <li>
                <a href="/files/Urlaubsschein_Zeitausgleich.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.staff.links.leaveForm")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.partners.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/files/Partnerantrag.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.partners.links.partnerApplication")}
                </a>
              </li>
              <li>
                <a href="/files/Dienstleistungsvertrag.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.partners.links.serviceContract")}
                </a>
              </li>
              <li>
                <a href="/files/Subvertrag.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.partners.links.subcontract")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.customers.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/files/Dienstleistungsvertrag1.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.customers.links.cleaningStandards")}
                </a>
              </li>
              <li>
                <a href="/files/Pricelist.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.customers.links.priceList")}
                </a>
              </li>
              <li>
                <a href="/files/Contract.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.customers.links.serviceContract")}
                </a>
              </li>
            </ul>
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
              <a
                href="https://www.linkedin.com/in/putz-elf-wien1110/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-col space-y-2 text-sm">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/files/Allgemeine_Geschäftsbedingungen_ Neu.pdf" download className="hover:text-gray-900 transition-colors">
                    {t("footer.connect.links.terms")}
                  </a>
                </li>
                <li>
                  <a href="/files/Datenschutzbestimmungen.pdf" download className="hover:text-gray-900 transition-colors">
                    {t("footer.connect.links.privacy")}
                  </a>
                </li>
              </ul>

              <Link to="/imprint" className="hover:text-gray-900 transition-colors">
                {t("footer.connect.links.imprint")}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Putzelf — Alle Rechte vorbehalten.
        </div>
      </footer>


  );
}

