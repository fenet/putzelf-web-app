import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-white text-gray-700 mt-auto border-t border-gray-200">
  <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
    
    {/* Employee Section */}
    <div>
      <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
        Mitarbeiter
      </h4>
      <ul className="space-y-2 text-sm">
        <li>
          <a href="/files/Datenschutzblat.pdf" download className="hover:text-gray-900 transition-colors">
            Datenschutzblatt
          </a>
        </li>
        <li>
          <a href="/files/Dienstliste.pdf" download className="hover:text-gray-900 transition-colors">
            Dienstliste
          </a>
        </li>
        <li>
          <a href="/files/Stammdatenblatt.pdf" download className="hover:text-gray-900 transition-colors">
            Stammdatenblatt
          </a>
        </li>
        <li>
          <a href="/files/Urlaubsschein_Zeitausgleich.pdf" download className="hover:text-gray-900 transition-colors">
            Urlaubsschein / Zeitausgleich
          </a>
        </li>
      </ul>
    </div>

    {/* Partner Section */}
    <div>
      <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
        Partner
      </h4>
      <ul className="space-y-2 text-sm">
        <li>
          <a href="/files/Partnerantrag.pdf" download className="hover:text-gray-900 transition-colors">
            Partnerantrag
          </a>
        </li>
        <li>
          <a href="/files/Dienstleistungsvertrag.pdf" download className="hover:text-gray-900 transition-colors">
            Dienstleistungsvertrag
          </a>
        </li>
        <li>
          <a href="/files/Subvertrag.pdf" download className="hover:text-gray-900 transition-colors">
            Subvertrag
          </a>
        </li>
      </ul>
    </div>

    {/* Social + Legal */}
    <div>
      <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
        Connect
      </h4>
      <div className="flex space-x-4 mb-6">
        <a href="https://www.instagram.com/putzelf11/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61580613673114" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
          <Facebook className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/putz-elf-wien1110/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>

      <div className="flex flex-col space-y-2 text-sm">
        <ul className="space-y-2 text-sm">
        <li>
          <a href="/files/Allgemeine_Geschäftsbedingungen_ Neu.pdf" download className="hover:text-gray-900 transition-colors">
            AGB
          </a>
        </li>
        <li>
          <a href="/files/Datenschutzbestimmungen.pdf" download className="hover:text-gray-900 transition-colors">
            Datenschutz
          </a>
        </li>
        </ul>
        
        <Link to="/imprint" className="hover:text-gray-900 transition-colors">Impressum</Link>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Putzelf — Alle Rechte vorbehalten.
  </div>
</footer>

  );
}

