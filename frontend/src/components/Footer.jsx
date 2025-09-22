import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center gap-4">
        {/* Links (legal + social all in one row) */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
          <Link to="/terms" className="hover:text-gray-900">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link to="/imprint" className="hover:text-gray-900">
            Imprint
          </Link>

          {/* Divider (optional dot between sections) */}
          <span className="text-gray-400">•</span>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900"
          >
            <Instagram className="w-5 h-5 inline" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900"
          >
            <Facebook className="w-5 h-5 inline" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900"
          >
            <Linkedin className="w-5 h-5 inline" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} putzELF. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

