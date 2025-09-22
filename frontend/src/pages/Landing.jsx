import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import logo from "../assets/logo.png";
import cover from "../assets/cover.svg";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { UserCheck, DollarSign, CalendarDays } from "lucide-react";

export default function Landing() {
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
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    localStorage.setItem("cookieConsentTime", Date.now().toString());
    setShowBanner(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Left side: Contact */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <img src={logo} alt="putzELF Logo" className="h-20 w-auto" />

            {/* Call us */}
            <a
              href="tel:+436603100725"
              className="flex flex-col items-center text-[#0097b2] font-semibold hover:underline"
            >
              <Phone size={32} className="mb-1" />
              <span className="text-base text-gray-700">+43 660 3100725</span>
            </a>

            {/* Email us */}
            <a
              href="mailto:info@putzelf.com"
              className="flex flex-col items-center text-[#5be3e3] font-semibold hover:underline"
            >
              <Mail size={32} className="mb-1" />
              <span className="text-base text-gray-700">info@putzelf.com</span>
            </a>
          </div>

          {/* Right side: CTA */}
          <div>
            <Link
              to="/book"
              className="bg-[#0097b2] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              Book an Appointment Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 bg-gray-50">
        <h1 className="text-4xl md:text-6xl font-bold text-[#000000] mb-6">
          Professional Cleaning at Your Fingertips
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          Book reliable and affordable cleaning services in just a few clicks.
        </p>
        <Link
          to="/book"
          className="bg-[#0097b2] text-white px-10 py-4 rounded-xl text-xl font-semibold hover:shadow-lg hover:scale-105 transition"
        >
          BOOK HERE
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
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <UserCheck size={48} className="text-[#5be3e3] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">Reliable</h3>
            <p className="text-gray-600">
              Our cleaners are vetted and trusted by hundreds of customers.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <DollarSign size={48} className="text-[#0097b2] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">Transparent Pricing</h3>
            <p className="text-gray-600">Just €36/hour, no hidden costs.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <CalendarDays size={48} className="text-[#5be3e3] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">Easy Booking</h3>
            <p className="text-gray-600">Book online in less than 2 minutes and relax.</p>
          </div>
        </div>

        {/* Booking CTA Buttons */}
        <div className="grid sm:grid-cols-3 gap-8">
          <Link
  to="/book?type=Standard"
  className="bg-gradient-to-r from-[#5be3e3] to-[#0097b2] text-black font-semibold rounded-2xl p-8 text-center hover:scale-105 hover:shadow-xl transition"
>
  <h4 className="text-2xl font-bold mb-2">Standard Cleaning</h4>
  <p>Quick and efficient regular cleaning.</p>
</Link>

<Link
  to="/book?type=Deep"
  className="bg-gradient-to-r from-[#48c6ef] to-[#006994] text-white font-semibold rounded-2xl p-8 text-center hover:scale-105 hover:shadow-xl transition"
>
  <h4 className="text-2xl font-bold mb-2">Deep Cleaning</h4>
  <p>Detailed cleaning for every corner.</p>
</Link>

<Link
  to="/book?type=Office"
  className="bg-gradient-to-r from-[#3acfd5] to-[#3a7bd5] text-black font-semibold rounded-2xl p-8 text-center hover:scale-105 hover:shadow-xl transition"
>
  <h4 className="text-2xl font-bold mb-2">Office Cleaning</h4>
  <p>Professional cleaning for your office spaces.</p>
</Link>
          

        </div>
      </section>

      {/* Footer */}       <footer className="bg-gray-100 text-gray-600 py-6 mt-auto">
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

      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center space-y-4">
            <p className="text-gray-700">
              We use cookies to improve your experience. By using our site, you agree to our{" "}
              <Link to="/privacy" className="underline text-[#5be3e3]">
                Privacy Policy
              </Link>.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={declineCookies}
                className="bg-gray-300 text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="bg-[#5be3e3] text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

