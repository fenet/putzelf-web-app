import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  Briefcase,
  ChevronRight,
  Home,
  ChevronDown,
  Phone,
  Mail,
  MessageSquareText,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const Unternehmen = [
  { key: "businessMaintenance" },
  { key: "businessDeep" },
  { key: "businessStaircase" },
  { key: "businessWindow" },
  { key: "businessIndustrial" },
];

const Privatkunden = [
  { key: "privateMaintenance" },
  { key: "privateDeep" },
  { key: "privateResidential" },
  { key: "privateConstruction" },
  { key: "privateWindow" },
  { key: "privateIndustrial" },
];

const copy = {
  de: {
    services: "Leistungen",
    jobOpening: "Jobs",
    getPartners: "Partner werden",

    // Main CTA
    book: "Anfrage starten",

    company: "Unternehmen",
    private: "Privatkunden",

    officeCleaning: "Büroreinigung",
    deepCleaning: "Tiefenreinigung",
    restaurantCleaning: "Restaurantreinigung",
      /* oneTimeCleaning removed */
    permanentCleaning: "Regelmäßige Reinigung",
    // new private labels
    privateMaintenance: "Unterhaltsreinigung",
    privateDeep: "Grundreinigung",
    privateResidential: "Wohnreinigung",
    privateConstruction: "Bauendreinigung / Grobreinigung",
    privateWindow: "Glas- & Rahmenreinigung",
    privateIndustrial: "Industriereinigung & Maschinen",
    // new business labels
    businessMaintenance: "Unterhaltsreinigung",
    businessDeep: "Grundreinigung",
    businessStaircase: "Stiegenhausreingung",
    businessConstruction: "Bauendreinigung / Grobreinigung",
    businessWindow: "Glas- & Rahmenreinigung",
    businessIndustrial: "Industriereinigung & Maschinen",

    // Contact
    contact: "Kontakt",
    phone: "Telefon",
    email: "E-Mail",

    // Mobile
    menu: "Menü",
  },

  en: {
    services: "Services",
    jobOpening: "Job Opening",
    getPartners: "Get Partners",

    // Main CTA
    book: "Start an Inquiry",

    company: "Business",
    private: "Private Customers",

    officeCleaning: "Office Cleaning",
    deepCleaning: "Deep Cleaning",
    restaurantCleaning: "Restaurant Cleaning",
      /* oneTimeCleaning removed */
    permanentCleaning: "Permanent Cleaning",
    // new private labels
    privateMaintenance: "Maintenance Cleaning",
    privateDeep: "Deep Cleaning (Private)",
    privateResidential: "Residential Cleaning",
    privateConstruction: "Construction / Post-Construction Cleaning",
    privateWindow: "Window & Frame Cleaning",
    privateIndustrial: "Industrial Cleaning & Machinery",
    // new business labels
    businessMaintenance: "Maintenance Cleaning (Business)",
    businessDeep: "Deep Cleaning (Business)",
    businessStaircase: "Staircase Cleaning",
    businessConstruction: "Construction / Post-Construction Cleaning (Business)",
    businessWindow: "Window & Frame Cleaning (Business)",
    businessIndustrial: "Industrial Cleaning & Machinery (Business)",

    // Contact
    contact: "Contact",
    phone: "Phone",
    email: "Email",

    // Mobile
    menu: "Menu",
  },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState("company");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  const [contactOpen, setContactOpen] = useState(false);

  const timerRef = useRef(null);
  const contactTimerRef = useRef(null);

  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);

  // Fallback to English if an unexpected locale is returned
  const c = copy[locale] || copy.en;

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(contactTimerRef.current);
    };
  }, []);

  // =========================
  // SERVICES MENU
  // =========================

  const openMenu = () => {
    clearTimeout(timerRef.current);
    setActiveGroup((current) => current || "company");
    setOpen(true);
  };

  const closeMenu = () => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  // =========================
  // CONTACT MENU
  // =========================

  const openContactMenu = () => {
    clearTimeout(contactTimerRef.current);
    setContactOpen(true);
  };

  const closeContactMenu = () => {
    clearTimeout(contactTimerRef.current);

    contactTimerRef.current = setTimeout(() => {
      setContactOpen(false);
    }, 200);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4 flex items-center">

        {/* Mobile top bar: hamburger (left), centered logo, language (right) */}
        <div className="w-full flex items-center justify-between md:hidden">
          {/* Hamburger (left) */}
          <button
            type="button"
            className="px-2 py-1 border border-slate-300 rounded text-sm"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-services"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Centered logo */}
          <Link to={getLocalizedPath(locale, "home")} aria-label="Go to home page" className="absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="PutzELF" className="h-10 w-auto" />
          </Link>

          {/* Language switcher (right) */}
          <div className="flex items-center">
            <LanguageSwitcher className="flex" compact />
          </div>
        </div>

        {/* =========================
            LEFT: LOGO
        ========================== */}
        <div className="flex items-center">
          <Link
            to={getLocalizedPath(locale, "home")}
            aria-label="Go to home page"
          >
            <img
              src={logo}
              alt="PutzELF"
              className="hidden md:block h-14 w-auto md:h-20"
            />
          </Link>
        </div>

        {/* =========================
            CENTER: DESKTOP NAV
        ========================== */}
        <div className="hidden md:flex md:flex-1 md:justify-center md:text-center">
          <div className="md:inline-flex md:items-center md:gap-6">

            {/* =========================
                SERVICES
            ========================== */}
            <div
              className="relative"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <button
                type="button"
                className="text-[#0097b2] font-semibold hover:underline flex items-center"
              >
                {c.services}
              </button>

              {open && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                >
                  <div className="flex flex-col">

                    {/* =========================
                        BUSINESS
                    ========================== */}
                    <div
                      className="relative"
                      onMouseEnter={() => {
                        clearTimeout(timerRef.current);
                        setActiveGroup("company");
                      }}
                    >
                      <button
                        type="button"
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded ${
                          activeGroup === "company"
                            ? "bg-slate-50"
                            : ""
                        }`}
                      >
                        <span>{c.company}</span>

                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            activeGroup === "company"
                              ? "rotate-0"
                              : ""
                          }`}
                        />
                      </button>

                      {activeGroup === "company" && (
                        <div
                          className="absolute left-full top-0 w-64 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50"
                          onMouseEnter={() => {
                            clearTimeout(timerRef.current);
                            setOpen(true);
                          }}
                        >
                          {Unternehmen.map((s) => (
                            <Link
                              key={s.key}
                              to={getLocalizedPath(locale, s.key)}
                              className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 rounded"
                            >
                              {c[s.key]}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* =========================
                        PRIVATE CUSTOMERS
                    ========================== */}
                    <div
                      className="relative mt-1"
                      onMouseEnter={() => {
                        clearTimeout(timerRef.current);
                        setActiveGroup("private");
                      }}
                    >
                      <button
                        type="button"
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded ${
                          activeGroup === "private"
                            ? "bg-slate-50"
                            : ""
                        }`}
                      >
                        <span>{c.private}</span>

                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {activeGroup === "private" && (
                        <div
                          className="absolute left-full top-0 w-48 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50"
                          onMouseEnter={() => {
                            clearTimeout(timerRef.current);
                            setOpen(true);
                          }}
                        >
                          {Privatkunden.map((s) => (
                            <Link
                              key={s.key}
                              to={getLocalizedPath(locale, s.key)}
                              className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 rounded"
                            >
                              {c[s.key]}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* =========================
                JOBS
            ========================== */}
            <Link
              to={getLocalizedPath(locale, "jobOpening")}
              className="text-gray-700 hover:text-[#0097b2] font-medium"
            >
              {c.jobOpening}
            </Link>

            {/* =========================
                PARTNERS
            ========================== */}
            <Link
              to={getLocalizedPath(locale, "getPartners")}
              className="text-gray-700 hover:text-[#0097b2] font-medium"
            >
              {c.getPartners}
            </Link>

            {/* =========================
                CONTACT DROPDOWN
            ========================== */}
            <div
              className="relative"
              onMouseEnter={openContactMenu}
              onMouseLeave={closeContactMenu}
            >
              <button
                type="button"
                className="text-gray-700 hover:text-[#0097b2] font-medium flex items-center"
              >
                {c.contact}
              </button>

              {contactOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-50"
                  onMouseEnter={openContactMenu}
                  onMouseLeave={closeContactMenu}
                >
                  <Link
                    to={getLocalizedPath(locale, "contact")}
                    className="flex items-center gap-3 px-3 py-3 text-sm text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                    onClick={() => setContactOpen(false)}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-[#0097b2]">
                      <MessageSquareText size={16} />
                    </span>
                    <div className="text-left">
                      <div className="font-medium">{c.contact}</div>
                      <div className="text-gray-500">{locale === "de" ? "Kontaktseite" : "Contact page"}</div>
                    </div>
                  </Link>

                  {/* PHONE */}
                  <a
                    href="tel:+436766300167"
                    className="flex items-center gap-3 px-3 py-3 text-sm text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Phone
                      size={20}
                      className="text-[#0097b2] shrink-0"
                    />

                    <div className="text-left">
                      <div className="font-medium">
                        {c.phone}
                      </div>

                      <div className="text-gray-500">
                        +43 676 6300167
                      </div>
                    </div>
                  </a>

                  {/* EMAIL VIENNA */}
                  <a
                    href="mailto:office@putzelf.com"
                    className="flex items-center gap-3 px-3 py-3 text-sm text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Mail
                      size={20}
                      className="text-[#0097b2] shrink-0"
                    />

                    <div className="text-left min-w-0">
                      <div className="font-medium">
                        {c.email} · Wien
                      </div>

                      <div className="text-gray-500 truncate">
                        office@putzelf.com
                      </div>
                    </div>
                  </a>

                  {/* EMAIL GRAZ */}
                  <a
                    href="mailto:office.stmk@putzelf.com"
                    className="flex items-center gap-3 px-3 py-3 text-sm text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Mail
                      size={20}
                      className="text-[#0097b2] shrink-0"
                    />

                    <div className="text-left min-w-0">
                      <div className="font-medium">
                        {c.email} · Graz
                      </div>

                      <div className="text-gray-500 truncate">
                        office.stmk@putzelf.com
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* =========================
            RIGHT: ACTIONS
        ========================== */}
        <div className="flex items-center gap-3">

          {/* LANGUAGE */}
          <LanguageSwitcher
            className="hidden md:flex"
            compact
          />

          {/* MAIN CTA */}
          <Link
            to={getLocalizedPath(locale, "booking")}
            className="hidden md:inline-block bg-[#0097b2] text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-[#007f95] transition-colors whitespace-nowrap"
          >
            {c.book}
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-services"
          >
            {c.menu}
          </button>

        </div>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}
      <div
        id="mobile-services"
        className={`md:hidden bg-white border-t ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="p-4">

          {/* =========================
              BUSINESS
          ========================== */}
          <button
            type="button"
            onClick={() =>
              setMobileGroup((current) =>
                current === "company" ? null : "company"
              )
            }
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold text-slate-800 hover:bg-slate-50"
          >
            <span className="inline-flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-[#0097b2]" />
              {c.company}
            </span>

            <ChevronDown
              className={`h-4 w-4 transition ${
                mobileGroup === "company"
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {mobileGroup === "company" && (
            <ul className="mt-2 space-y-2 pl-4">
              {Unternehmen.map((s) => (
                <li key={s.key}>
                  <Link
                    to={getLocalizedPath(locale, s.key)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {c[s.key]}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* =========================
              PRIVATE CUSTOMERS
          ========================== */}
          <button
            type="button"
            onClick={() =>
              setMobileGroup((current) =>
                current === "private" ? null : "private"
              )
            }
            className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold text-slate-800 hover:bg-slate-50"
          >
            <span className="inline-flex items-center gap-2">
              <Home className="h-4 w-4 text-[#0097b2]" />
              {c.private}
            </span>

            <ChevronDown
              className={`h-4 w-4 transition ${
                mobileGroup === "private"
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {mobileGroup === "private" && (
            <ul className="mt-2 space-y-2 pl-4">
              {Privatkunden.map((s) => (
                <li key={s.key}>
                  <Link
                    to={getLocalizedPath(locale, s.key)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {c[s.key]}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* =========================
              JOBS
          ========================== */}
          <Link
            to={getLocalizedPath(locale, "jobOpening")}
            className="mt-2 block rounded-xl px-4 py-3 font-semibold text-slate-800 hover:bg-slate-50"
            onClick={() => setMobileOpen(false)}
          >
            {c.jobOpening}
          </Link>

          {/* =========================
              PARTNERS
          ========================== */}
          <Link
            to={getLocalizedPath(locale, "getPartners")}
            className="mt-2 block rounded-xl px-4 py-3 font-semibold text-slate-800 hover:bg-slate-50"
            onClick={() => setMobileOpen(false)}
          >
            {c.getPartners}
          </Link>

          {/* =========================
              CONTACT
          ========================== */}
          <button
            type="button"
            onClick={() =>
              setMobileContactOpen((current) => !current)
            }
            className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold text-slate-800 hover:bg-slate-50"
          >
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#0097b2]" />
              {c.contact}
            </span>

            <ChevronDown
              className={`h-4 w-4 transition ${
                mobileContactOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {mobileContactOpen && (
            <div className="mt-2 space-y-2 pl-4">
              <Link
                to={getLocalizedPath(locale, "contact")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                <MessageSquareText className="h-4 w-4 text-[#0097b2]" />
                <span>{c.contact}</span>
              </Link>

              {/* Mobile phone */}
              <a
                href="tel:+436766300167"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                <Phone
                  className="h-4 w-4 text-[#0097b2]"
                />

                <span>
                  +43 676 6300167
                </span>
              </a>

              {/* Mobile email Vienna */}
              <a
                href="mailto:office@putzelf.com"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                <Mail
                  className="h-4 w-4 text-[#0097b2]"
                />

                <span>
                  office@putzelf.com · Wien
                </span>
              </a>

              {/* Mobile email Graz */}
              <a
                href="mailto:office.stmk@putzelf.com"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                <Mail
                  className="h-4 w-4 text-[#0097b2]"
                />

                <span>
                  office.stmk@putzelf.com · Graz
                </span>
              </a>

            </div>
          )}

          {/* =========================
              MOBILE BOOK CTA
          ========================== */}
          <Link
            to={getLocalizedPath(locale, "booking")}
            className="mt-4 block w-full rounded-xl bg-[#0097b2] px-4 py-3 text-center font-semibold text-white shadow-md hover:bg-[#007f95] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {c.book}
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
export { Unternehmen, Privatkunden, copy };