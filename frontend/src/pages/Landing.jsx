import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import logo from "../assets/logo.png";
import cover from "../assets/cover.svg";
import homeImg from "../assets/home.jpg";
import officeImg from "../assets/office.jpg";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { UserCheck, DollarSign, CalendarDays } from "lucide-react";

export default function Landing() {
  const { t, i18n } = useTranslation();
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
    window.dispatchEvent(new CustomEvent('consentChanged', { detail: { consent: true } }));
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    localStorage.setItem("cookieConsentTime", Date.now().toString());
    setShowBanner(false);
    window.dispatchEvent(new CustomEvent('consentChanged', { detail: { consent: false } }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-wrap justify-between items-center gap-2">
          {/* Left side: Contact */}
          <div className="flex items-center space-x-3 md:space-x-6 min-w-0">
            {/* Logo */}
            <img src={logo} alt={t('alt.logo')} className="h-12 md:h-20 w-auto shrink-0" />

            {/* Call us */}
            <a
              href="tel:+436673302277"
              className="flex flex-col items-center text-[#0097b2] font-semibold hover:underline"
              aria-label="Call us"
            >
              <Phone size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden md:inline text-base text-gray-700">+43 667 3302277</span>
            </a>

            {/* Email us */}
            <a
              href="mailto:office@putzelf.com"
              className="flex flex-col items-center text-[#5be3e3] font-semibold hover:underline"
              aria-label="Email us"
            >
              <Mail size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden md:inline text-base text-gray-700">office@putzelf.com</span>
            </a>
          </div>

          {/* Right side: CTA + Language */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <Link
              to="/book"
              className="hidden md:block bg-[#0097b2] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-lg font-semibold shadow-md animate-pulse-button whitespace-nowrap"
            >
              {t('nav.bookNow')}
            </Link>
            <button
              onClick={() => i18n.changeLanguage('en')}
              title="English"
              aria-label="Switch to English"
              className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border text-sm md:text-base hover:bg-gray-50 ${i18n.language && i18n.language.startsWith('en') ? 'ring-2 ring-[#0097b2]' : ''}`}
            >
              <span role="img" aria-label="English flag">🇬🇧</span>
            </button>
            <button
              onClick={() => i18n.changeLanguage('de')}
              title="Deutsch"
              aria-label="Auf Deutsch umschalten"
              className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border text-sm md:text-base hover:bg-gray-50 ${i18n.language && i18n.language.startsWith('de') ? 'ring-2 ring-[#0097b2]' : ''}`}
            >
              <span role="img" aria-label="German flag">🇩🇪</span>
            </button>
          </div>
          {/* Mobile CTA centered within nav, slightly lower */}
          <div className="w-full flex justify-center mt-2 md:hidden">
            <Link
              to="/book"
              className="bg-[#0097b2] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md animate-pulse-button whitespace-nowrap"
            >
              {t('nav.bookNow')}
            </Link>
          </div>
        </div>
      </nav>

      

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-40 pb-24 bg-gray-50">
        <h1 className="text-4xl md:text-6xl font-bold text-[#000000] mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          {t('hero.subtitle')}
        </p>
        <Link
          to="/book"
          className="bg-[#0097b2] text-white px-10 py-4 rounded-xl text-xl font-semibold hover:shadow-lg hover:scale-105 transition"
        >
          {t('hero.cta')}
        </Link>
      </section>

      {/* Hero Image */}
      <section
        className="relative h-[70vh] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </section>

      {/* Features & Booking Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">

        {/* Booking CTA Buttons */}
        <div className="grid sm:grid-cols-3 gap-8">
          <Link
            to="/book?type=Standard"
            className="bg-gradient-to-r from-[#5be3e3] to-[#0097b2] text-black font-semibold rounded-2xl p-8 text-center hover:scale-105 hover:shadow-xl transition"
          >
            <h4 className="text-2xl font-bold mb-2">{t('services.standard.title')}</h4>
            <p>{t('services.standard.desc')}</p>
          </Link>

          <Link
            to="/book?type=Deep"
            className="bg-gradient-to-r from-[#48c6ef] to-[#006994] text-white font-semibold rounded-2xl p-8 text-center hover:scale-105 hover:shadow-xl transition"
          >
            <h4 className="text-2xl font-bold mb-2">{t('services.deep.title')}</h4>
            <p>{t('services.deep.desc')}</p>
          </Link>

          <Link
            to="/book?type=Office"
            className="bg-gradient-to-r from-[#3acfd5] to-[#3a7bd5] text-black font-semibold rounded-2xl p-8 text-center hover:scale-105 hover:shadow-xl transition"
          >
            <h4 className="text-2xl font-bold mb-2">{t('services.office.title')}</h4>
            <p>{t('services.office.desc')}</p>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <UserCheck size={48} className="text-[#5be3e3] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">{t('services.reliable')}</h3>
            <p className="text-gray-600">{t('services.reliableLine')}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <DollarSign size={48} className="text-[#0097b2] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">
              {t('services.pricing')}
            </h3>
            <p className="text-gray-600">{t('services.priceLine')}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <CalendarDays size={48} className="text-[#5be3e3] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">
              {t('services.easy')}
            </h3>
            <p className="text-gray-600">
              {t('services.easyLine')}
            </p>
          </div>
        </div>
      </section>
      
{/* Premium Services Section */}
<section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
  {/* Home Cleaning */}
  <div className="grid md:grid-cols-2 gap-8 items-center">
    {/* Image */}
    <div className="overflow-hidden rounded-2xl shadow-lg">
      <img
        src={homeImg}
        alt={t('alt.homeCleaning')}
        className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
    {/* Text */}
    <div className="space-y-4">
      <h3 className="text-3xl font-bold text-[#000000]">{t('services.homeTitle')}</h3>
      <p className="text-gray-600 text-lg">
        {t('services.homeDesc')}
      </p>
      <Link
        to="/book?type=Home"
        className="inline-block bg-[#0097b2] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
      >
        {t('services.homeCta')}
      </Link>
    </div>
  </div>

  {/* Office Cleaning */}
  <div className="grid md:grid-cols-2 gap-8 items-center">
    {/* Text */}
    <div className="space-y-4 order-2 md:order-1">
      <h3 className="text-3xl font-bold text-[#000000]">{t('services.officeTitle')}</h3>
      <p className="text-gray-600 text-lg">
        {t('services.officeDesc')}
      </p>
      <Link
        to="/book?type=Office"
        className="inline-block bg-[#5be3e3] text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
      >
        {t('services.officeCta')}
      </Link>
    </div>
    {/* Image */}
    <div className="overflow-hidden rounded-2xl shadow-lg order-1 md:order-2">
      <img
        src={officeImg}
        alt={t('alt.officeCleaning')}
        className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-6 mt-auto">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
    {/* Employee Section */}
    <div>
      <h4 className="font-semibold mb-2">{t('footer.employee')}</h4>
      <ul className="space-y-1 text-sm">
        <li>
          <a
            href="/files/employee-handbook.pdf"
            download
            className="hover:text-gray-900"
          >
            {t('footer.employeeHandbook')}
          </a>
        </li>
        <li>
          <a
            href="/files/employee-policies.pdf"
            download
            className="hover:text-gray-900"
          >
            {t('footer.policies')}
          </a>
        </li>
      </ul>
    </div>

    {/* Middle: Legal + Social */}
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
        <Link to="/terms" className="hover:text-gray-900">{t('footer.terms')}</Link>
        <Link to="/privacy" className="hover:text-gray-900">{t('footer.privacy')}</Link>
        <Link to="/imprint" className="hover:text-gray-900">{t('footer.imprint')}</Link>

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

      <div className="text-sm text-gray-500">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </div>
    </div>

    {/* Partner Section */}
    <div>
      <h4 className="font-semibold mb-2">{t('footer.partner')}</h4>
      <ul className="space-y-1 text-sm">
        <li>
          <a
            href="/files/partner-guide.pdf"
            download
            className="hover:text-gray-900"
          >
            {t('footer.partnerGuide')}
          </a>
        </li>
        <li>
          <a
            href="/files/partner-contract.pdf"
            download
            className="hover:text-gray-900"
          >
            {t('footer.contractTemplate')}
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>

      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center space-y-4">
            <p className="text-gray-700">
              {t('cookies.msg')}
              <Link to="/privacy" className="underline text-[#5be3e3]">
                {t('cookies.privacyPolicy')}
              </Link>
              .
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={declineCookies}
                className="bg-gray-300 text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                {t('cookies.decline')}
              </button>
              <button
                onClick={acceptCookies}
                className="bg-[#5be3e3] text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                {t('cookies.accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
