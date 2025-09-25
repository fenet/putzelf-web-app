import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        bookNow: "Book an Appointment Now",
        phone: "+43 667 3302277",
        email: "info@putzelf.com"
      },
      hero: {
        title: "Professional Cleaning at Your Fingertips",
        subtitle: "Book reliable and affordable cleaning services in just a few clicks.",
        cta: "BOOK HERE"
      },
      services: {
        standard: { title: "Standard Cleaning", desc: "Quick and efficient regular cleaning." },
        deep: { title: "Deep Cleaning", desc: "Detailed cleaning for every corner." },
        office: { title: "Office Cleaning", desc: "Professional cleaning for your office spaces." },
        reliable: "Reliable",
        pricing: "Transparent Pricing",
        easy: "Easy Booking",
        priceLine: "Just €36/hour, no hidden costs.",
        easyLine: "Book online in less than 2 minutes and relax.",
        homeTitle: "Home Cleaning",
        homeDesc: "Fresh, spotless, and welcoming. Our team ensures your home is cleaned with care and precision so you can relax and enjoy your space.",
        homeCta: "Book Home Cleaning",
        officeTitle: "Office Cleaning",
        officeDesc: "A spotless office means a productive day for your team. We keep your workspaces clean, hygienic, and professional.",
        officeCta: "Book Office Cleaning"
      },
      footer: {
        employee: "Employee",
        employeeHandbook: "Employee Handbook",
        policies: "Policies",
        terms: "Terms & Conditions",
        privacy: "Privacy Policy",
        imprint: "Imprint",
        copyright: "© {{year}} putzELF. All rights reserved.",
        partner: "Partner",
        partnerGuide: "Partner Guide",
        contractTemplate: "Contract Template"
      },
      cookies: {
        msg: "We use cookies to improve your experience. By using our site, you agree to our ",
        privacyPolicy: "Privacy Policy",
        decline: "Decline",
        accept: "Accept"
      }
    }
  },
  de: {
    translation: {
      nav: {
        bookNow: "Jetzt Termin buchen",
        phone: "+43 667 3302277",
        email: "info@putzelf.com"
      },
      hero: {
        title: "Professionelle Reinigung auf Knopfdruck",
        subtitle: "Buchen Sie zuverlässige und preiswerte Reinigungen in wenigen Klicks.",
        cta: "JETZT BUCHEN"
      },
      services: {
        standard: { title: "Standardreinigung", desc: "Schnelle und effiziente Regelreinigung." },
        deep: { title: "Grundreinigung", desc: "Gründliche Reinigung bis in jede Ecke." },
        office: { title: "Büroreinigung", desc: "Professionelle Reinigung für Ihre Büroräume." },
        reliable: "Zuverlässig",
        pricing: "Transparente Preise",
        easy: "Einfache Buchung",
        priceLine: "Nur €36/Stunde, keine versteckten Kosten.",
        easyLine: "Online buchen in weniger als 2 Minuten und entspannen.",
        homeTitle: "Haushaltsreinigung",
        homeDesc: "Frisch, makellos und einladend. Unser Team reinigt Ihr Zuhause sorgfältig und präzise, damit Sie sich wohlfühlen.",
        homeCta: "Haushaltsreinigung buchen",
        officeTitle: "Büroreinigung",
        officeDesc: "Ein sauberes Büro bedeutet einen produktiven Tag. Wir halten Ihre Arbeitsräume sauber, hygienisch und professionell.",
        officeCta: "Büroreinigung buchen"
      },
      footer: {
        employee: "Mitarbeiter",
        employeeHandbook: "Mitarbeiterhandbuch",
        policies: "Richtlinien",
        terms: "Allgemeine Geschäftsbedingungen",
        privacy: "Datenschutzerklärung",
        imprint: "Impressum",
        copyright: "© {{year}} putzELF. Alle Rechte vorbehalten.",
        partner: "Partner",
        partnerGuide: "Partnerleitfaden",
        contractTemplate: "Vertragsvorlage"
      },
      cookies: {
        msg: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Durch die Nutzung unserer Website stimmen Sie unserer ",
        privacyPolicy: "Datenschutzerklärung",
        decline: "Ablehnen",
        accept: "Akzeptieren"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;


