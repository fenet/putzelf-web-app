import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        bookNow: "Book an Appointment Now",
        phone: "+43 676 6300167",
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
        emailValue: "office@putzelf.com",
        membership: "Member of the Vienna Economic Chamber, Vienna Commercial Service Providers Section"
      },
      hero: {
        title: "Professional Cleaning at Your Fingertips",
        subtitle: "Book reliable and affordable cleaning services in just a few clicks.",
        cta: "BOOK HERE",
        jobCta: "Looking for a Job?",
        jobModalTitle: "Join the Putzelf team",
        jobModalBody: "Please email us your contact details and application to {{email}}. We’ll get back to you shortly.",
        jobModalEmailCta: "Send email",
        jobModalClose: "Close"
      },
      profile: {
        title: "Choose your favorite worker",
        subtitle: "Review our trusted professionals and pick the cleaner who fits your booking best.",
        choose: "Choose me",
        rating: "{{rating}} rating · {{reviews}} reviews",
        workers: {
          agnesC: "AGNES C.",
          slavkaS: "SLAVKA S.",
          dobrilaN: "DOBRILA N.",
          kataK: "KATA K.",
          hajkunaD: "HAJKUNA D.",
          haianeM: "HAIANE M.",
          dijanaV: "DIJANA V.",
          milicaV: "MILICA V.",
          amelia: "Amelia K.",
          markus: "Markus L.",
          selin: "Selin A.",
          leon: "Leon M.",
          maria: "Maria S.",
          yusuf: "Yusuf T.",
          sofia: "Sofia P.",
          jakob: "Jakob R.",
          noemi: "Noemi F.",
          anna: "Anna D."
        }
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
          officeCta: "Book Office Cleaning",
          // New structured services translations (private + business)
          private: {
            maintenance: {
              title: "Maintenance Cleaning",
              description: "Regular cleaning for private households, tailored to your schedule.",
              features: ["Regular room cleaning", "Kitchen and bathroom cleaning", "Flexible time slots"]
            },
            deep: {
              title: "Deep Cleaning",
              description: "Thorough cleaning for hard-to-reach areas and stubborn dirt.",
              features: ["Deep floor and surface cleaning", "Descaling and sanitary care", "Intensive kitchen cleaning"]
            },
            residential: {
              title: "Residential Cleaning",
              description: "Careful cleaning for apartments and family homes.",
              features: ["Dusting and vacuuming", "Surface care", "Window cleaning (optional)"]
            },
            construction: {
              title: "Post-construction / Rough Cleaning",
              description: "Cleaning after construction or renovation work, removing debris and fine dust.",
              features: ["Debris and dust removal", "Fine cleaning after rough cleaning", "Safe disposal"]
            },
            window: {
              title: "Window & Frame Cleaning",
              description: "Cleaning of windows and frames for streak-free results.",
              features: ["Interior & exterior windows", "Frame and groove cleaning", "Optional prep for repainting frames"]
            },
            industrial: {
              title: "Industrial Cleaning & Machinery",
              description: "Specialized cleaning for machinery and industrial areas (no maintenance).",
              features: ["Machine surface cleaning", "Safe cleaning procedures", "Removal of production residues"]
            }
          },
          business: {
            maintenance: {
              title: "Maintenance Cleaning",
              description: "Regular cleaning plans for businesses and offices.",
              features: ["Workstation cleaning", "Sanitary and kitchen care", "Flexible scheduling"]
            },
            deep: {
              title: "Deep Cleaning",
              description: "Comprehensive deep cleaning for commercial spaces.",
              features: ["Intensive floor cleaning", "Carpet and upholstery care", "Contact surface disinfection"]
            },
            staircase: {
              title: "Staircase Cleaning",
              description: "Regular upkeep and cleaning of staircases and common areas.",
              features: ["Step cleaning", "Handrail care", "Garbage room and cellar cleaning"]
            },
            construction: {
              title: "Post-construction / Rough Cleaning",
              description: "Cleaning after construction work in commercial properties.",
              features: ["Rough cleaning", "Fine cleaning after construction", "Removal of construction materials"]
            },
            window: {
              title: "Window & Frame Cleaning",
              description: "Professional window and frame cleaning for facades and interiors.",
              features: ["Facade windows", "Interior and exterior cleaning", "Safety and lift work if required"]
            },
            industrial: {
              title: "Industrial Cleaning & Machinery",
              description: "Cleaning in industrial settings aligned with safety requirements.",
              features: ["Machine cleaning", "Production line cleaning", "Safe disposal of residues"]
            }
          },
          whatWeOffer: "What we offer",
          benefitsTitle: "Benefits",
          benefit1: "Vetted cleaning professionals",
          benefit2: "Flexible scheduling",
          benefit3: "Transparent pricing",
          cta: "Request an Offer"
      },
      alt: {
        logo: "putzELF Logo",
        homeCleaning: "Home Cleaning",
        officeCleaning: "Office Cleaning"
      },
      footer: {
        staff: {
          title: "Employees",
          links: {
            privacySheet: "Privacy Sheet",
            dutyRoster: "Duty Roster",
            masterData: "Master Data Sheet",
            leaveForm: "Leave / Comp Time"
          }
        },
        partners: {
          title: "Partners",
          links: {
            partnerApplication: "Partner Application",
            serviceContract: "Service Agreement",
            subcontract: "Subcontract"
          }
        },
        customers: {
          title: "Customers",
          links: {
            serviceContract: "Service Contract",
            cleaningStandards: "Cleaning Standards",
            priceList: "Price List",
            calculator: "Price Calculator"
          }
        },
        connect: {
          title: "Connect",
          links: {
            terms: "Terms & Conditions",
            privacy: "Privacy Policy",
            imprint: "Imprint"
          }
        }
      },
      cookies: {
        msg: "We use cookies to improve your experience. By using our site, you agree to our ",
        privacyPolicy: "Privacy Policy",
        decline: "Decline",
        accept: "Accept"
      },
      home: {
        title: "Book a cleaning",
        locationModal: {
          title: "Where would you like to book the cleaning?",
          prompt: "Select the city for your service",
          vienna: "Vienna",
          graz: "Graz",
          validation: "Please choose a location to continue."
        },
        successTitle: "Booking confirmed",
        successMessage: "Thank you — your booking is confirmed.",
        bookingId: "Booking ID: {{id}}",
        serviceLocationLabel: "Service location:",
        selectType: "Choose a cleaning type",
        types: {
          standard: "Home cleaning",
          office: "Office cleaning",
          apartmentHotel: "Apartment / Hotel"
        },
        flow: {
          inquiry: "Send Inquiry",
          calculator: "Price Calculator"
        },
        subcategories: {
          title: "Choose subcategory",
          intensive: "Intensive",
          window: "Windows"
        },
        descriptions: {
          standard: "Regular maintenance clean for homes; surfaces, bathrooms, and floors.",
          office: "Professional office cleaning tailored to workspaces and common areas.",
          apartmentHotel: "Detailed clean for apartments and hotel rooms between stays."
        },
        calendar: {
          loading: "Loading availability…",
          errorFetchDates: "Failed to fetch dates.",
          errorFetchSlots: "Failed to fetch available times."
        },
        durationLabel: "Estimated hours",
        dateLabel: "Date",
        timeLabel: "Time",
        renegotiate: "I understand the service is billed based on the actual time worked",
        durationHelp: "Minimum booking is 3 hours.",
        estimated: "Estimated price",
        rate: "Rate: €{{rate}}/hour",
        submit: "Submit",
        alerts: {
          missing: "Please fill date, time and select a cleaning type.",
          createError: "Error creating booking: {{msg}}",
          noWorker: "Please choose your cleaner before completing the booking."
        },
        selectedWorker: {
          label: "Your cleaner",
          selected: "{{name}} is ready to help.",
          change: "Choose a different cleaner",
          missing: "You haven't selected a cleaner yet.",
          choose: "Select your cleaner"
        }
      },
      calculator: {
        title: "Price Calculator",
        subtitle: "Estimate the cost of your cleaning based on duration and extras.",
        typeHeading: "Choose a cleaning type",
        subHeading: "Add premium services",
        durationLabel: "Duration (hours)",
        durationHelp: "Bookings start at 3 hours. Use the arrows to adjust.",
        estimatedTotalLabel: "Estimated total",
        estimatedTotal: "Estimated total: €{{price}}",
        hourlyRate: "Hourly rate: €{{rate}}/h",
        premiumNotice: "Premium add-ons adjust the hourly rate.",
        renegotiateLabel: "Allow renegotiation if the job needs more time",
        resetBtn: "Reset selection",
        cta: "Select a professional",
        disclaimer: "This is an estimate. Final pricing is confirmed during booking."
      },
      order: {
        title: "Order",
        quoteRequestTitle: "Quote request",
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
          address: "Street name & House No. & Door No.",
          phone: "Phone"
        },
        errors: {
          invalidEmail: "Please enter a valid email address.",
          invalidPhone: "Please enter a valid phone number including country code."
        },
        gdprPrefix: "I agree to the processing of my personal data in accordance with the ",
        gdprLink: "Privacy Policy (GDPR)",
        confirming: "Confirming...",
        confirmBtn: "Confirm Booking",
        confirmedTitle: "Booking confirmed ✅",
        confirmedMsg: "A confirmation email has been sent to {{email}}.",
        bookingId: "Booking ID: {{id}}",
        errorPrefix: ""
      }
    }
  },
  de: {
    translation: {
      nav: {
        bookNow: "Jetzt Termin buchen",
        phone: "+43 676 6300167",
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
        emailValue: "office@putzelf.com",
        membership: "Mitglied der Wirtschaftskammer Wien, Fachgruppe Gewerbliche Dienstleister"
      },
      profile: {
        title: "Putzfrau in Wien gesucht?",
        subtitle: "Überprüfen Sie unsere vertrauenswürdigen Fachkräfte und wählen Sie die Reinigungskraft, die am besten zu Ihrer Buchung passt.",
        choose: "Wähle mich",
        rating: "{{rating}} Bewertung · {{reviews}} Bewertungen",
        workers: {
          agnesC: "AGNES C.",
          slavkaS: "SLAVKA S.",
          dobrilaN: "DOBRILA N.",
          kataK: "KATA K.",
          hajkunaD: "HAJKUNA D.",
          haianeM: "HAIANE M.",
          dijanaV: "DIJANA V.",
          milicaV: "MILICA V.",
          amelia: "Amelia K.",
          markus: "Markus L.",
          selin: "Selin A.",
          leon: "Leon M.",
          maria: "Maria S.",
          yusuf: "Yusuf T.",
          sofia: "Sofia P.",
          jakob: "Jakob R.",
          noemi: "Noemi F.",
          anna: "Anna D."
        }
      },
      hero: {
        title: "Reinigung in Wien – schnell & extra sauber",
        subtitle: "Buche deine Reinigungskraft in Wien in wenigen Klicks: Haushaltsreinigung, Grundreinigung, Fensterreinigung oder Büroreinigung.",
        cta: "JETZT BUCHEN",
        jobCta: "Job gesucht?",
        jobModalTitle: "Werde Teil des PutzELF-Teams",
        jobModalBody: "Schick uns deine Kontaktdaten und Bewerbung an {{email}} – wir melden uns schnell zurück.",
        jobModalEmailCta: "E-Mail senden",
        jobModalClose: "Schließen"
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
      ,
      // Neue strukturierte Services (privat + gewerblich)
      private: {
        maintenance: {
          title: "Unterhaltsreinigung",
          description: "Regelmäßige Reinigung für Privathaushalte, abgestimmt auf Ihre Abläufe.",
          features: ["Regelmäßige Raumreinigung", "Reinigung von Küche und Bad", "Flexible Zeitfenster"]
        },
        deep: {
          title: "Grundreinigung",
          description: "Tiefgehende Reinigung für schwer zugängliche Bereiche und hartnäckige Verschmutzungen.",
          features: ["Grundreinigung von Böden und Oberflächen", "Entkalkung und Sanitärpflege", "Intensive Küchenreinigung"]
        },
        residential: {
          title: "Wohnreinigung",
          description: "Sorgfältige Reinigung von Wohnungen und Einfamilienhäusern.",
          features: ["Staubwischen und Saugen", "Oberflächenpflege", "Fensterreinigung (optional)"]
        },
        construction: {
          title: "Bauendreinigung / Grobreinigung",
          description: "Reinigung nach Bau- oder Renovierungsarbeiten, Entfernen von Bauschutt und Feinstaub.",
          features: ["Bauschutt- und Feinstaubentfernung", "Feinreinigung nach Grobreinigung", "Sichere Entsorgung"]
        },
        window: {
          title: "Glas- & Rahmenreinigung",
          description: "Reinigung von Fenstern und Rahmen für ein streifenfreies Ergebnis.",
          features: ["Fenster innen & außen", "Rahmen- und Falzreinigung", "Optionaler Rahmenanstrich-Vorbereitung"]
        },
        industrial: {
          title: "Industriereinigung & Maschinen",
          description: "Spezialisierte Reinigung für Maschinen und industrielle Bereiche (keine Wartung).",
          features: ["Maschinenoberflächenreinigung", "Sichere Reinigungsverfahren", "Entfernung von Produktionsrückständen"]
        }
      },
      business: {
        maintenance: {
          title: "Unterhaltsreinigung",
          description: "Regelmäßige Reinigungspläne für Unternehmen und Büros.",
          features: ["Reinigung von Arbeitsplätzen", "Sanitär- und Küchenpflege", "Flexible Zeitfenster"]
        },
        deep: {
          title: "Grundreinigung",
          description: "Umfassende Grundreinigung für Geschäftsräume und gewerbliche Flächen.",
          features: ["Intensive Bodenreinigung", "Teppich- und Polsterpflege", "Desinfektion von Kontaktflächen"]
        },
        staircase: {
          title: "Treppenhausreinigung",
          description: "Regelmäßige Pflege und Reinigung von Treppenhäusern und Gemeinschaftsbereichen.",
          features: ["Treppenstufenreinigung", "Geländerpflege", "Müllraum- und Kellerreinigung"]
        },
        construction: {
          title: "Bauendreinigung / Grobreinigung",
          description: "Reinigung nach Bauarbeiten in gewerblichen Objekten.",
          features: ["Grobreinigung", "Feinreinigung nach Bau", "Entfernung von Baumaterialien"]
        },
        window: {
          title: "Glas- & Rahmenreinigung",
          description: "Professionelle Glas- und Rahmenreinigung für Geschäftsfassaden und Innenbereiche.",
          features: ["Fassadenfenster", "Innen- und Außenreinigung", "Sicherheits- und Hebebühnenarbeiten (falls erforderlich)"]
        },
        industrial: {
          title: "Industriereinigung & Maschinen",
          description: "Reinigung in industriellen Umgebungen, abgestimmt auf Sicherheitsanforderungen.",
          features: ["Maschinenreinigung", "Produktionslinienreinigung", "Sichere Entsorgung von Rückständen"]
        }
      },
      whatWeOffer: "Was wir anbieten",
      benefitsTitle: "Vorteile",
      benefit1: "Geprüfte Reinigungskräfte",
      benefit2: "Flexible Terminplanung",
      benefit3: "Transparente Preise",
      cta: "Angebot anfordern"
      },
      alt: {
        logo: "putzELF Logo",
        homeCleaning: "Haushaltsreinigung",
        officeCleaning: "Büroreinigung"
      },
      footer: {
        staff: {
          title: "Mitarbeiter",
          links: {
            privacySheet: "Datenschutzblatt",
            dutyRoster: "Dienstliste",
            masterData: "Stammdatenblatt",
            leaveForm: "Urlaubsschein / Zeitausgleich"
          }
        },
        partners: {
          title: "Partner",
          links: {
            partnerApplication: "Partnerantrag",
            serviceContract: "Dienstleistungsvertrag",
            subcontract: "Subvertrag"
          }
        },
        customers: {
          title: "Kunden",
          links: {
            serviceContract: "Servicevertrag",
            cleaningStandards: "Reinigungsstandards",
            priceList: "Preisliste",
            priceCalculator: "Preiskalkulator"
          }
        },
        connect: {
          title: "Connect",
          links: {
            terms: "AGB",
            privacy: "Datenschutz",
            imprint: "Impressum"
          }
        }
      },
      cookies: {
        msg: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Durch die Nutzung unserer Website stimmen Sie unserer ",
        privacyPolicy: "Datenschutzerklärung",
        decline: "Ablehnen",
        accept: "Akzeptieren"
      },
      home: {
        title: "Reinigung buchen",
        locationModal: {
          title: "Wo möchten Sie die Reinigung buchen?",
          prompt: "Wählen Sie die Stadt für Ihre Dienstleistung",
          vienna: "Wien",
          graz: "Graz",
          validation: "Bitte wählen Sie einen Ort, um fortzufahren."
        },
        successTitle: "Buchung bestätigt",
        successMessage: "Vielen Dank – Ihre Buchung wurde bestätigt.",
        bookingId: "Buchungs-ID: {{id}}",
        serviceLocationLabel: "Servicestandort:",
        selectType: "Reinigungsart auswählen",
        contactTitle: "Ihre Kontaktdaten",
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
        flow: {
          inquiry: "Anfrage senden",
          calculator: "Preiskalkulator",
          calculatorPrompt: "Möchten Sie zuerst einen ungefähren Preis sehen?",
          inquiryDescription: "Füllen Sie das untenstehende Formular aus und wir melden uns mit einem individuellen Angebot bei Ihnen."
        },
        contact: {
          name: "Vollständiger Name",
          phone: "Telefonnummer",
          email: "E-Mail-Adresse",
          address: "Straße,Hausnummer,Türnummer"
        },
        descriptions: {
          standard: "Regelmäßige Unterhaltsreinigung: Oberflächen, Bäder, Küche, Böden etc",
          office: "Professionelle Büroreinigung für Arbeitsplätze, Küche, Gemeinschaftsflächen etc",
          apartmentHotel: "Gründliche Reinigung nach Check-out und der öffentlichen Bereiche"
        },
        slots: {
          enterAddress: "Geben Sie Ihre Adresse ein, um verfügbare Tage anzuzeigen.",
          chooseDate: "Wählen Sie ein Datum, um verfügbare Zeiten anzuzeigen.",
          loading: "Verfügbare Zeiten werden geladen…",
          none: "Für diesen Tag sind keine Zeiten verfügbar. Bitte wählen Sie ein anderes Datum."
        },
        calendar: {
          loading: "Verfügbarkeit wird geladen…",
          errorFetchDates: "Fehler beim Laden der verfügbaren Tage.",
          errorFetchSlots: "Fehler beim Laden der verfügbaren Zeiten."
        },
        
        durationLabel: "Geschätzte Arbeitszeit",
        dateLabel: "Datum",
        timeLabel: "Uhrzeit",
        renegotiate: "Wir nehmen zur Kenntnis, dass die Dienstleistung nach tatsächlicher Arbeitszeit verrechnet wird",
        durationHelp: "Mindestbuchung ist 3 Stunden.",
        estimated: "Geschätzter Preis",
        rate: "Preis: €{{rate}}/Stunde",
        submit: "Jetzt anfragen",
        alerts: {
          missing: "Bitte Datum, Uhrzeit ausfüllen und eine Reinigungsart wählen.",
          createError: "Fehler bei der Erstellung der Buchung: {{msg}}",
          noWorker: "Bitte wähle deine Reinigungskraft, bevor du die Buchung abschließt."
        },
        selectedWorker: {
          label: "Deine Reinigungskraft",
          selected: "{{name}} ist bereit zu helfen.",
          change: "Andere Reinigungskraft wählen",
          missing: "Du hast noch keine Reinigungskraft ausgewählt.",
          choose: "Reinigungskraft auswählen"
        }
      },
      calculator: {
        title: "Preisrechner",
        subtitle: "Schätzen Sie die Kosten Ihrer Reinigung basierend auf Dauer und Extras.",
        typeHeading: "Reinigungsart wählen",
        subHeading: "Optionale Premium-Services",
        durationLabel: "Dauer (Stunden)",
        durationHelp: "Buchungen starten bei 3 Stunden. Verwenden Sie die Pfeile zur Anpassung.",
        estimatedTotalLabel: "Geschätzte Gesamtkosten",
        estimatedTotal: "Geschätzte Gesamtkosten: {{price}} €",
        hourlyRate: "Stundensatz: {{rate}} €/h",
        premiumNotice: "Premium-Extras beeinflussen den Stundensatz.",
        renegotiateLabel: "Nachverhandlung erlauben, falls mehr Zeit nötig ist",
        resetBtn: "Auswahl zurücksetzen",
        cta: "Jetzt Reinigungskraft auswählen",
        disclaimer: "Dies ist eine Schätzung. Der finale Preis wird bei der Buchung bestätigt."
      },
      order: {
        title: "Buchung",
        quoteRequestTitle: "Angebot anfragen",
        loading: "Buchung wird geladen...",
        confirmTitle: "Buchung bestätigen",
        summary: "Buchungsübersicht",
        date: "Datum",
        time: "Uhrzeit",
        cleaningType: "Reinigungsart",
        duration: "Dauer",
        durationUnit: "Stunden",
        price: "Preis",
        notesLabel: "Anmerkungen",
        enterDetails: "Daten eingeben und bestätigen",
        placeholders: {
          name: "Vollständiger Name",
          email: "E-Mail",
          address: "Straße & Hausnummer & Türnummer",
          phone: "Telefon",
          notes: "Zusätzliche Anmerkungen oder Wünsche",
          bookingAddress: "Ihre Adresse"  
        },
        errors: {
          invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
          invalidPhone: "Bitte geben Sie eine gültige Telefonnummer mit Ländervorwahl ein.",
          requiredName: "Name ist erforderlich",
          requiredAddress: "Adresse ist erforderlich",
          requiredPhone: "Telefonnummer ist erforderlich",
          requiredEmail: "E-Mail-Adresse ist erforderlich",
          requiredGdpr: "Bitte stimmen Sie der DSGVO-Einwilligung zu",
        },
        gdprPrefix: "Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß ",
        gdprText: "Ich stimme zu, dass meine Daten für die Buchung verarbeitet und ich bezüglich dieser Buchung kontaktiert werde.",
        gdprLink: "Datenschutzerklärung (DSGVO)",
        confirming: "Wird bestätigt...",
        confirmBtn: "Buchung anfragen",
        confirmedTitle: "Buchung bestätigt ✅",
        confirmedMsg: "Eine Bestätigungs-E-Mail wurde an {{email}} gesendet.",
        bookingId: "Buchungs-ID: {{id}}",
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