import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        bookNow: "Book an Appointment Now",
        phone: "+43 667 3302277",
        email: "office@putzelf.com"
      },
      imprint: {
        title: "Imprint",
        companyNameTitle: "Company name",
        companyNameLine1: "Sebastijan Aleksandar Kerculj",
        companyNameLine2: "Putzelf",
        founderTitle: "Founder and owner",
        founderName: "Sebastijan Aleksandar Kerculj",
        purposeTitle: "Corporate purpose",
        purposeBody: "Exceptional Cleaning Services.",
        vatTitle: "VAT number",
        vatValue: "ATU78448967",
        regNoTitle: "Company registration number",
        regNoValue: "-",
        courtTitle: "Commercial Register Court",
        courtValue: "Vienna Commercial Court, Marxergasse 1a, A-1030 Vienna",
        hqTitle: "Company headquarters",
        hqValue: "Simmeringer Hauptstraße 24, 1110 Vienna",
        contactTitle: "Contact details",
        phoneLabel: "Phone",
        phoneValue: "+43 (0)676 6300167",
        emailLabel: "Email",
        emailValue: "info@putzelf.com",
        membership: "Member of the Vienna Economic Chamber, Vienna Commercial Service Providers Section"
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
        reliableLine: "Our cleaners are vetted and trusted by hundreds of customers.",
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
      alt: {
        logo: "putzELF Logo",
        homeCleaning: "Home Cleaning",
        officeCleaning: "Office Cleaning"
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
      },
      home: {
        title: "Book Your Cleaning",
        selectType: "Select Cleaning Type",
        types: {
          standard: "House Cleaning",
          office: "Office Cleaning",
          apartmentHotel: "Apartment / Hotel"
        },
        subcategories: {
          title: "Choose Subcategory",
          intensive: "Intensive",
          window: "Window"
        },
        descriptions: {
          standard: "Regular maintenance clean for homes; surfaces, bathrooms, and floors.",
          office: "Professional office cleaning tailored to workspaces and common areas.",
          apartmentHotel: "Detailed clean for apartments and hotel rooms between stays."
        },
        durationLabel: "Hours (min 3)",
        dateLabel: "Date",
        timeLabel: "Time",
        renegotiate: "Willing to renegotiate if job takes longer",
        durationHelp: "Minimum booking is 3 hours.",
        estimated: "Estimated Price",
        rate: "Rate: €{{rate}}/hour",
        submit: "Let's Go",
        alerts: {
          missing: "Please fill date, time and select a cleaning type.",
          createError: "Error creating booking: {{msg}}"
        }
      },
      order: {
        loading: "Loading booking...",
        confirmTitle: "Confirm Your Booking",
        summary: "Booking Summary",
        date: "Date",
        time: "Time",
        cleaningType: "Cleaning Type",
        duration: "Duration",
        durationUnit: "hours",
        price: "Price",
        enterDetails: "Enter your details to confirm",
        placeholders: {
          name: "Full name",
          email: "Email",
          address: "Street & House No.",
          phone: "Phone"
        },
        gdprPrefix: "I agree to the processing of my personal data in accordance with the ",
        gdprLink: "Privacy Policy (GDPR)",
        confirming: "Confirming...",
        confirmBtn: "Confirm Booking",
        confirmedTitle: "Booking confirmed ✅",
        confirmedMsg: "A confirmation email has been sent to {{email}}.",
        errorPrefix: ""
      }
    }
  },
  de: {
    translation: {
      nav: {
        bookNow: "Jetzt Termin buchen",
        phone: "+43 667 3302277",
        email: "office@putzelf.com"
      },
      imprint: {
        title: "Impressum",
        companyNameTitle: "Firmenname",
        companyNameLine1: "Sebastijan Aleksandar Kerculj",
        companyNameLine2: "Putzelf",
        founderTitle: "Gründer und Eigentümer",
        founderName: "Sebastijan Aleksandar Kerculj",
        purposeTitle: "Unternehmensgegenstand",
        purposeBody: "Außergewöhnliche Reinigungsdienste.",
        vatTitle: "USt-IdNr.",
        vatValue: "ATU78448967",
        regNoTitle: "Firmenbuchnummer",
        regNoValue: "-",
        courtTitle: "Firmenbuchgericht",
        courtValue: "Handelsgericht Wien, Marxergasse 1a, A-1030 Wien",
        hqTitle: "Firmensitz",
        hqValue: "Simmeringer Hauptstraße 24, 1110 Wien",
        contactTitle: "Kontaktdaten",
        phoneLabel: "Telefon",
        phoneValue: "+43 (0)676 6300167",
        emailLabel: "E-Mail",
        emailValue: "info@putzelf.com",
        membership: "Mitglied der Wirtschaftskammer Wien, Fachgruppe Gewerbliche Dienstleister"
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
        reliableLine: "Unsere Reinigungskräfte sind geprüft und von Hunderten Kund:innen vertrauenswürdig.",
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
      alt: {
        logo: "putzELF Logo",
        homeCleaning: "Haushaltsreinigung",
        officeCleaning: "Büroreinigung"
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
      },
      home: {
        title: "Reinigung buchen",
        selectType: "Reinigungsart auswählen",
        types: {
          standard: "Hausreinigung",
          office: "Büroreinigung",
          apartmentHotel: "Apartment / Hotel"
        },
        subcategories: {
          title: "Unterkategorie wählen",
          intensive: "Intensiv",
          window: "Fenster"
        },
        descriptions: {
          standard: "Regelmäßige Unterhaltsreinigung: Oberflächen, Bäder, Küche, Böden etc",
          office: "Professionelle Büroreinigung für Arbeitsplätze, Küche, Gemeinschaftsflächen etc",
          apartmentHotel: "Gruendliche Reinigung nach Check-out und des oeffentlichen Berreiches"
        },
        durationLabel: "Geschätzte Arbeitszeit",
        dateLabel: "Datum",
        timeLabel: "Uhrzeit",
        renegotiate: "Wir nehmen zur Kenntniss, dass die Dienstleistung nach tatsächlicher Arbeitszeit verrechnet wird",
        durationHelp: "Mindestbuchung ist 3 Stunden.",
        estimated: "Geschätzter Preis",
        rate: "Preis: €{{rate}}/Stunde",
        submit: "Jetzt anfragen",
        alerts: {
          missing: "Bitte Datum, Uhrzeit ausfüllen und eine Reinigungsart wählen.",
          createError: "Fehler bei der Erstellung der Buchung: {{msg}}"
        }
      },
      order: {
        loading: "Buchung wird geladen...",
        confirmTitle: "Buchung bestätigen",
        summary: "Buchungsübersicht",
        date: "Datum",
        time: "Uhrzeit",
        cleaningType: "Reinigungsart",
        duration: "Dauer",
        durationUnit: "Stunden",
        price: "Preis",
        enterDetails: "Daten eingeben und bestätigen",
        placeholders: {
          name: "Vollständiger Name",
          email: "E-Mail",
          address: "Straße & Hausnummer",
          phone: "Telefon"
        },
        gdprPrefix: "Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß ",
        gdprLink: "Datenschutzerklärung (DSGVO)",
        confirming: "Wird bestätigt...",
        confirmBtn: "Buchung anfragen",
        confirmedTitle: "Buchung bestätigt ✅",
        confirmedMsg: "Eine Bestätigungs-E-Mail wurde an {{email}} gesendet.",
        errorPrefix: ""
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;


