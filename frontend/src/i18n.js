import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        bookNow: "Start an Inquiry",
        phone: "+43 676 6300167",
        email: "office@putzelf.com",
        services: "Services",
        blog: "Blog",
        jobOpening: "Job Opening",
        getPartners: "Become a Partner",
        book: "Start an Inquiry",
        company: "Business",
        private: "Private Customers",
        privateMaintenance: "Maintenance Cleaning",
        privateDeep: "Deep Cleaning (Private)",
        privateResidential: "Residential Cleaning",
        privateConstruction: "Construction / Post-Construction Cleaning",
        privateWindow: "Window & Frame Cleaning",
        privateIndustrial: "Industrial Cleaning & Machinery",
        businessMaintenance: "Maintenance Cleaning (Business)",
        businessDeep: "Deep Cleaning (Business)",
        businessStaircase: "Staircase Cleaning",
        businessConstruction: "Construction / Post-Construction Cleaning (Business)",
        businessWindow: "Window & Frame Cleaning (Business)",
        businessIndustrial: "Industrial Cleaning & Machinery (Business)",
        contact: "Contact",
        contactPage: "Contact page",
        phoneLabel: "Phone",
        emailLabel: "Email",
        vienna: "Vienna",
        graz: "Graz",
        menu: "Menu",
        homeAria: "Go to home page",
        switchEnglish: "Switch to English",
        switchGerman: "Switch to German",
        englishFlag: "English flag",
        germanFlag: "German flag"
      },
      contact: {
        callNow: "Call now"
      },
      common: {
        cancel: "Cancel",
        ok: "OK",
        backToHome: "Back to home"
      },
      notFound: {
        title: "Oops! Nothing to clean here. 🧹",
        message: "Looks like this page has gone missing. Don't worry – we'll get you back on track.",
        home: "Back to home",
        back: "Or start your search again"
      },
      auth: {
        login: {
          seoTitle: "Sign in",
          seoDescription: "Sign in to manage your bookings.",
          title: "Sign in",
          description: "Sign in to manage your bookings.",
          email: "Email",
          password: "Password",
          loading: "Signing in…",
          submit: "Sign in",
          noAccount: "Don't have an account?",
          registerLink: "Register"
        },
        register: {
          seoTitle: "Register",
          seoDescription: "Create an account to book appointments.",
          title: "Create an account",
          description: "Register to book and manage appointments.",
          email: "Email",
          password: "Password",
          inviteCode: "Admin invitation code (optional)",
          invitePlaceholder: "Only fill this in if you were invited as an admin",
          loading: "Creating account…",
          submit: "Create account",
          hasAccount: "Already have an account?",
          loginLink: "Sign in"
        }
      },
      form: {
        requiredField: "Please fill out this field."
      },
      cookies: {
        heading: "Your privacy matters",
        msg: "We use technically necessary cookies to ensure the security of our website. With your consent, we also use analytics tools (such as Google Analytics and Leadinfo) to improve our services and analyze visits. Tracking only takes place after you have given your consent. You can grant or decline your consent, or find out more in our <0>Privacy Policy</0>.",
        decline: "Decline",
        /* oneTimeCleaning removed */
        privacyPolicy: "Privacy Policy",
        settings: "Cookie settings",
        necessary: "Necessary only",
        acceptAll: "Accept all",
        preferencesTitle: "Cookie preferences",
        preferencesIntro: "Choose which cookies you want to allow. Necessary cookies are always enabled because they are required for the website to function properly.",
        necessaryTitle: "Necessary cookies",
        necessaryDesc: "These cookies are required for essential website functions, security, and basic operation.",
        alwaysOn: "Always active",
        analyticsTitle: "Analytics cookies",
        analyticsDesc: "These cookies help us understand how visitors use our website so we can improve our services and user experience.",
        enable: "Enable",
        marketingTitle: "Marketing cookies",
        marketingDesc: "These cookies help us measure and improve our marketing activities and understand how visitors interact with our website.",
        save: "Save preferences",
        cancel: "Cancel"
      },
      imprint: {
        title: "Imprint",
        seoTitle: "Legal Notice | PutzELF",
        seoDescription: "Provider identification and contact details for PutzELF.",
        legalIntro: "Information pursuant to Section 5 of the E-Commerce Act (ECG), Section 63 of the Trade Regulation Act 1994 (GewO 1994), and disclosure pursuant to Section 25 of the Media Act.",
        providerTitle: "Media owner and service provider",
        nameLabel: "Name",
        nameValue: "Sebastijan-Aleksandar Kerčulj, sole proprietor",
        businessNameLabel: "Business name",
        businessNameValue: "PutzELF",
        businessPurposeLabel: "Business purpose",
        businessPurposeValue: "Monument, façade and building cleaning, as well as property care",
        addressLabel: "Company headquarters and address",
        serviceAreaLabel: "Graz branch",
        serviceAreaValue: "Waagner-Biro-Straße 47, 8020 Graz, Austria",
        vatTitle: "UID number",
        vatValue: "ATU78448967",
        gisaTitle: "GISA number",
        gisaValue: "38010538",
        authorityTitle: "Trade authority",
        authorityValue: "Magistratisches Bezirksamt für den 3. und 5. Bezirk",
        membershipTitle: "Membership",
        membershipValue: "Vienna Economic Chamber (Wirtschaftskammer Wien)",
        associationsTitle: "Professional associations",
        associationsValue: "Landesinnung Wien der Denkmal-, Fassaden- und Gebäudereiniger; Fachgruppe Wien der gewerblichen Dienstleister; Fachgruppe Wien der persönlichen Dienstleister; Fachgruppe Werbung und Marktkommunikation Wien",
        lawTitle: "Applicable legislation",
        lawBeforeLink: "Trade Regulation Act 1994 (GewO), available in the",
        lawLinkText: "Federal Legal Information System",
        lawAfterLink: ".",
        hqValue: "Simmeringer Hauptstraße 24, 1110 Vienna, Austria",
        contactTitle: "Contact",
        phoneLabel: "Phone",
        phoneValue: "+43 676 630 01 67",
        emailLabel: "Email",
        emailValue: "office@putzelf.com",
        grazEmailLabel: "Email for Graz and Styria",
        grazEmailValue: "office.stmk@putzelf.com",
        companyDetailsTitle: "Company details",
        disputeTitle: "Consumer dispute resolution",
        disputeBody: "We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration body. If a dispute with a consumer cannot be resolved directly, we will inform the consumer, in accordance with the Alternative Dispute Resolution Act, on a durable medium about the competent body and whether we will participate in proceedings.",
        generalInfoLabel: "General information:",
        arbitrationLinkText: "Consumer Arbitration for Business Transactions",
        disclosureTitle: "Disclosure pursuant to Section 25 of the Media Act",
        disclosureBody: "Media owner: Sebastijan-Aleksandar Kerčulj, sole proprietor. Registered office: Vienna. Business purpose: as stated above. This website provides information about the company and its services and facilitates the initiation of orders, partnerships and employment relationships."
      },
      hero: {
        title: "Professional Cleaning in Vienna and Graz",
        subtitle: "Book reliable and affordable home or office cleaning in Vienna or Graz.",
        cta: "Start an Inquiry",
        jobCta: "Looking for a Job?",
        jobModalTitle: "Join the PutzELF team",
        jobModalBody: "Please email us your contact details and application to {{email}}. We’ll get back to you shortly.",
        jobModalEmailCta: "Send email",
        jobModalClose: "Close"
      },
      landingAlternative: {
        seoTitle: "Commercial Cleaning Vienna & Graz | PutzELF",
        seoDescription: "Reliable office and maintenance cleaning for businesses in Vienna and Graz, with clear routines, consistent contacts and quality checks.",
        heroTitle: "Professional Cleaning in Vienna and Graz",
        heroTitleLine2: "For businesses of every kind.",
        heroSubtitle: "Reliable cleaning for businesses in Vienna and Graz, with consistent quality and flexible schedules.",
        heroPrimaryCta: "Start an Inquiry",
        heroSecondaryCta: "Start an Inquiry",
        trust: ["Read Google reviews"],
        problemTitle: "Why Businesses Switch to PutzELF",
        problems: [
          "Unreliable cleaning providers",
          "Inconsistent quality from visit to visit",
          "No flexibility for business schedules"
        ],
        solutions: [
          "Cleaning teams for your business premises",
          "Reliable scheduling and quality checks",
          "Customized cleaning plans for your business"
        ],
        solutionTitle: "Our Solution",
        servicesTitle: "Our Business Cleaning Services",
        services: [
          { key: "businessMaintenance", title: "Maintenance cleaning", desc: "Scheduled cleaning tailored to your business premises." },
          { key: "businessDeep", title: "Deep cleaning", desc: "Detailed cleaning for heavier soiling and one-time needs." },
          { key: "businessStaircase", title: "Staircase cleaning", desc: "Reliable upkeep for shared building areas." },
          { key: "businessConstruction", title: "Construction cleaning", desc: "Rough and final cleaning after building work." },
          { key: "businessWindow", title: "Window and frame cleaning", desc: "Clear glass and carefully cleaned frames." },
          { key: "businessIndustrial", title: "Industrial cleaning", desc: "Cleaning for machinery and production spaces." }
        ],
        processTitle: "How It Works",
        process: ["Inquiry", "Short call or on-site visit", "Receive a customized offer", "Cleaning service starts"],
        faqTitle: "Frequently Asked Questions",
        faqs: [
          { q: "How is pricing calculated?", a: "Pricing depends on location, size, frequency, and service type. You receive a clear custom offer after the consultation." },
          { q: "Which areas do you serve?", a: "We serve Vienna and Graz. Ask us to confirm availability for your area." },
          { q: "Do I need a long-term contract?", a: "No. We offer flexible plans, from one-time jobs to recurring service agreements." },
          { q: "How quickly can service start?", a: "In most cases, we can start within a few days after confirming your plan." }
        ],
        finalTitle: "Ready for Reliable Cleaning?",
        finalSubtitle: "Request your free consultation or contact us directly.",
        finalCta: "Start an Inquiry",
        callNow: "Call now",
        directContact: "Direct Contact",
        freeConsultTitle: "Get a free consultation by phone now",
        freeConsultNote: "No scheduling calendar needed — call us directly and we’ll discuss your needs right away.",
        gdprText: "GDPR-compliant processes",
        locations: {
          title: "Our locations",
          description: "PutzELF is here for you in Vienna and Graz.",
          vienna: "Vienna",
          headquarters: "Company headquarters",
          viennaStreet: "Simmeringer Hauptstraße 24",
          viennaPostal: "1110 Vienna",
          graz: "Graz",
          branch: "Branch",
          grazStreet: "Waagner-Biro-Straße 47",
          grazPostal: "8020 Graz"
        },
        serviceLinks: [
          { key: "servicesOverview", label: "All services" },
          { key: "privateMaintenance", label: "Maintenance cleaning" },
          { key: "privateDeep", label: "Deep cleaning" },
          { key: "privateResidential", label: "Residential cleaning" },
          { key: "privateWindow", label: "Window cleaning" },
          { key: "businessMaintenance", label: "Business maintenance cleaning" },
          { key: "businessStaircase", label: "Staircase cleaning" },
          { key: "contact", label: "Contact" },
          { key: "blog", label: "Blog" },
          { key: "privacy", label: "Privacy policy" },
          { key: "imprint", label: "Imprint" }
        ]
      },
      profile: {
        title: "Choose your favorite worker",
        subtitle: "Review the available cleaners and choose the person who fits your booking best.",
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
        cta: "Request an offer",
        pricingLine: "Clear pricing with no hidden costs.",
        schedule: "Flexible scheduling",
        scheduleLine: "Choose appointment times that work for you.",
        whatWeOffer: "Service scope",
        relatedTitle: "Related services",
        ui: {
          home: "Home",
          breadcrumb: "Breadcrumb",
          service: "Service",
          windowCleaning: "Window Cleaning",
          challenge: "The challenge",
          approach: "Our approach",
          process: "Process",
          gallery: "Gallery",
          faq: "FAQ",
          contact: "Get in touch",
          coverageLabel: "Service area",
          coverageText: "Vienna and surrounding areas, as well as Graz and surrounding areas."
        },
        expectations: {
          kicker: "What you can expect",
          title: "What You Can Expect"
        },
        standard: { title: "Standard Cleaning", desc: "Quick and efficient regular cleaning." },
        deep: { title: "Deep Cleaning", desc: "Detailed cleaning for every corner." },
        office: { title: "Office Cleaning", desc: "Professional cleaning for your office spaces." },
        reliable: "Reliable",
        reliableLine: "Cleaning services arranged around your needs and schedule.",
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
            expectations: [
              { key: "analysis", title: "Individual Assessment", desc: "We assess your home and propose the right cleaning scope for lasting results." },
              { key: "fairPrice", title: "Fair Pricing", desc: "Transparent rates with no hidden fees so you know what to expect." },
              { key: "qualifiedStaff", title: "Cleaning Team", desc: "Cleaners treat your home with care and respect." },
              { key: "fixedTeams", title: "Consistent Teams", desc: "Familiar teams deliver steady results and understand your preferences." },
              { key: "excellentQuality", title: "Excellent Quality", desc: "High cleaning standards and checklists ensure thorough, reliable work." },
              { key: "desiredTimes", title: "Preferred Times", desc: "Flexible appointment windows to suit your daily routine and needs." }
            ],
            maintenance: {
              title: "Home Maintenance Cleaning",
              pageHeading: "A reliable cleaning routine built around your home",
              description: "Regular, dependable cleaning for private homes — scheduled to match your rhythm and priorities.",
              features: ["Room-by-room checklists", "Kitchen & bathroom care", "Flexible appointment windows"],
              painTitle: "Typical household challenges",
              painPoints: ["Too little time for thorough cleaning in a busy week", "Kitchens and bathrooms get untidy quickly", "Inconsistent cleaning lowers comfort and hygiene"],
              solutionTitle: "What we do to help",
              solutionPoints: ["Agree a clear scope and checklist for each visit", "Schedule regular visits that fit your life", "Reliable teams who know your home and preferences"],
              processTitle: "How the service works",
              process: [
                { title: "Inquiry & scope", desc: "Tell us which rooms and tasks matter most and the frequency you prefer." },
                { title: "Plan & confirm", desc: "We propose time windows, tasks and any product preferences for your approval." },
                { title: "Recurring visits", desc: "Our team performs the agreed checklist and reports back after each visit." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "How often should I book maintenance cleaning?", a: "Most households choose between weekly and monthly visits depending on use and preference." },
                { q: "Can I prioritise certain rooms?", a: "Yes. You can specify priorities in the inquiry so teams focus where it matters most." },
                { q: "Do you bring cleaning products?", a: "We can bring professional supplies or use your products on request — please tell us beforehand." },
                { q: "Can appointment times be adjusted?", a: "Yes. We offer flexible windows and will coordinate times that work for you." }
              ],
              metaTitle: "Home Cleaning Vienna & Graz | PutzELF",
              metaDescription: "Reliable home maintenance cleaning in Vienna & Graz: recurring visits, clear checklists and flexible appointment windows."
            },
            deep: {
              title: "Deep Cleaning",
              pageHeading: "A detailed clean for stubborn dirt and renovation residue",
              description: "Intensive cleaning for stubborn dirt, residue and areas that need extra care.",
              features: ["Thorough floor and surface cleaning", "Descaling and sanitary care", "Detailed kitchen and bathroom cleaning"],
              painTitle: "When your home needs a deeper level of care",
              painPoints: ["Old grime is no longer removed by regular cleaning", "Construction dust and residues affect the living environment", "Allergens and stubborn stains become noticeable"],
              solutionTitle: "Our approach to deep cleaning",
              solutionPoints: ["Room-by-room intensive cleaning", "Professional care for sanitary surfaces", "Detailed treatment of kitchens, bathrooms and daily-use spaces"],
              processTitle: "How deep cleaning works",
              process: [
                { title: "Inquiry & assessment", desc: "You tell us which areas need attention and if there are any special requirements." },
                { title: "Timing & scope", desc: "We advise on timing, effort and the right cleaning measures." },
                { title: "Execution", desc: "Our team carries out the intensive cleaning with suitable tools and products." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Is deep cleaning useful after renovation work?", a: "Yes. After renovation, a deep clean removes dust, residue and visible soiling from surfaces." },
                { q: "Do you move furniture during cleaning?", a: "Light furniture can be moved by arrangement. Heavier items are handled in coordination." },
                { q: "Do you use special cleaners for the kitchen?", a: "Yes. We use professional products suited to kitchen surfaces and sanitary areas." },
                { q: "Can I book a one-off deep clean?", a: "Yes. A thorough deep clean is also available as a single service." }
              ],
              metaTitle: "Deep Cleaning Vienna & Graz | PutzELF",
              metaDescription: "Deep cleaning in Vienna & Graz for stubborn dirt, renovation residue and intensive care for kitchens, bathrooms and living spaces."
            },
            residential: {
              title: "Residential Cleaning",
              pageHeading: "Thoughtful cleaning for apartments and family homes",
              description: "Careful cleaning for apartments, houses and family homes with a focus on comfort and cleanliness.",
              features: ["Dust removal and vacuuming", "Surface care and finishing touches", "Optional window cleaning"],
              painTitle: "When residential cleaning is useful",
              painPoints: ["A busy routine leaves little time for proper care", "Moves, special occasions or regular upkeep require smooth service", "Hygiene and order matter even more with children or pets"],
              solutionTitle: "How we support your home",
              solutionPoints: ["Tailored cleaning plans to suit your needs", "Careful cleaning based on your requested scope", "Optional extras such as window care"],
              processTitle: "How residential cleaning works",
              process: [
                { title: "Start your inquiry", desc: "You send us your preferences through the form." },
                { title: "Timing & scope", desc: "We confirm the schedule, scope and any special requests." },
                { title: "Cleaning on site", desc: "The team carries out the agreed tasks carefully and reliably." }
              ],
              faqTitle: "Questions & answers",
              faqs: [
                { q: "Are pets a problem for the cleaning team?", a: "No. Our teams are used to working with pets and will consider any special circumstances in advance." },
                { q: "Can I specify the cleaning products used?", a: "Yes. If you prefer your own products, simply let us know." },
                { q: "How quickly can I book?", a: "Short-notice appointments are possible depending on availability." },
                { q: "Is there a minimum booking length?", a: "Yes. The minimum booking duration is 2 hours." }
              ],
              metaTitle: "Residential Cleaning Vienna & Graz | PutzELF",
              metaDescription: "Residential cleaning in Vienna & Graz: thorough, reliable and punctual service for apartments, homes and one-off cleans."
            },
          overview: {
            title: "Unsere Services – Reinigungsleistungen für Privat und Gewerbe",
            subtitle: "übersichtliche, verlässliche Reinigungsangebote für Haushalte und Unternehmen in Wien und Graz. Wählen Sie eine Leistung, um Details, Umfang und mögliche Termine zu sehen.",
            cards: [
              { key: "privateMaintenance", title: "Unterhaltsreinigung (Privat)", desc: "Regelmäßige Reinigung nach Wunsch – passend zu Ihrem Haushalt und Rhythmus." },
              { key: "privateDeep", title: "Grundreinigung", desc: "Intensive, einmalige Reinigung bei starker Verschmutzung oder nach Renovierungen." },
              { key: "businessMaintenance", title: "Unterhaltsreinigung (Gewerbe)", desc: "Flexible, planbare Reinigung für Büros und gewerbliche Flächen außerhalb der Betriebszeiten." },
              { key: "businessDeep", title: "Gewerbliche Grundreinigung", desc: "Gründliche Reinigung für Übergaben, Renovationsrückstände und stark frequentierte Bereiche." },
              { key: "window", title: "Glas- & Rahmenreinigung", desc: "Professionelle Fenster- und Rahmenpflege für klare Sicht und gepflegtes Erscheinungsbild." }
            ],
            whoForTitle: "Für wen sind unsere Services geeignet?",
            whoForText: "Wir betreuen Privatkundinnen und -kunden, Vermieter sowie Unternehmen jeder Größe. Ob einmalige Spezialreinigung oder regelmäßiger Unterhalt – wir passen Leistungen, Intervalle und Termine an Ihre Situation an.",
            challengesTitle: "Häufige Reinigungsprobleme",
            challenges: [
              "Zu wenig Zeit für gründliche Reinigung im Alltag",
              "Hartnäckiger Schmutz nach Renovierungen oder Veranstaltungen",
              "Anforderungen an Hygiene und Erscheinungsbild für Kundschaft und Mitarbeitende"
            ],
            approachTitle: "Unsere Arbeitsweise",
            approach: [
              "Klare Leistungsbeschreibungen und Raum-für-Raum-Checklisten",
              "Flexible Terminfenster, abgestimmt auf Ihren Tagesablauf oder Betriebszeiten",
              "Erfahrene Teams mit standardisierten Abläufen und Qualitätskontrolle"
            ],
            benefitsTitle: "Ihre Vorteile",
            benefits: [
              "Planbare Termine und transparente Preise",
              "Konstante Reinigungsqualität dank Checklisten und Nachkontrollen",
              "Klare Kommunikation und einfache Anfrageprozesse"
            ],
            includedTitle: "Was ist enthalten",
            included: [
              "Raum-für-Raum-Checkliste entsprechend der Anfrage",
              "Sanitär- und Küchenpflege, wo vereinbart",
              "Optionale Zusatzleistungen (z. B. Fenster oder Teppichpflege) auf Anfrage"
            ],
            conclusion: ""
          },
            construction: {
              title: "Post-Construction / Rough Cleaning",
              pageHeading: "A clean, ready-to-use home after building work",
              description: "Cleaning after construction or renovation work, with a focus on debris, dust and visible residue.",
              features: ["Removal of debris and construction dust", "Fine cleaning after rough work", "Safe disposal of materials"],
              painTitle: "Why post-construction cleaning matters",
              painPoints: ["Construction residue and dust affect usability", "Safety risks and dirty surfaces can appear quickly", "Handover to tenants, customers or owners becomes harder"],
              solutionTitle: "Our post-construction cleaning for clean handovers",
              solutionPoints: ["Staged rough and final cleaning", "Preparation for handover, painting or moving in", "Organised disposal and follow-up touch-ups"],
              processTitle: "Typical workflow",
              process: [
                { title: "Inquiry & site details", desc: "You send us details and photos so we can assess the scope." },
                { title: "Planning", desc: "We create a coordinated cleaning schedule with time windows." },
                { title: "Execution", desc: "Our team works through the phases until handover quality is reached." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Can you remove construction debris?", a: "Yes. We remove light debris as part of the work; larger disposal needs are coordinated with partners." },
                { q: "Do I need site access?", a: "Please share access conditions, safety requirements and working hours with us." },
                { q: "Are protective measures used?", a: "Yes. We use dust protection and careful working methods to protect surfaces." },
                { q: "How is billing handled?", a: "For smaller projects, billing is based on effort; for larger jobs, we provide clear flat-rate quotes." }
              ],
              metaTitle: "Construction Cleaning Vienna & Graz | PutzELF",
              metaDescription: "Construction cleaning in Vienna & Graz: safe and thorough cleaning after build or renovation work with clear planning and handover standards."
            },
            window: {
              title: "Window & Frame Cleaning",
              pageHeading: "Clear windows and cared-for frames throughout your home",
              description: "Professional cleaning of glass surfaces and frames for crystal-clear views and a well-kept appearance.",
              features: ["Cleaning of interior and exterior windows", "Frame and groove cleaning", "Optional preparation for repainting or renovation"],
              painTitle: "Why professional window cleaning is worthwhile",
              painPoints: ["Streaks, limescale and reduced visibility look unprofessional", "Outdoor areas are often hard to reach", "Frames and joints collect dust, residue and grime"],
              solutionTitle: "Our glass and frame cleaning service",
              solutionPoints: ["Interior and exterior cleaning with streak-free results", "Care for frames, grooves and edges", "Optional preparation before painting or refurbishment"],
              processTitle: "How the cleaning works",
              process: [
                { title: "Inquiry", desc: "You tell us the number of windows, the floor and any special requirements." },
                { title: "Appointment confirmation", desc: "We propose a suitable time and the right equipment for the job." },
                { title: "Execution", desc: "The windows are cleaned streak-free, while the frames and joints are carefully maintained." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Do you also clean exterior windows in higher locations?", a: "Yes. If required, we use lifts or specialist safety equipment." },
                { q: "How is the price calculated?", a: "Pricing depends on the number of windows, accessibility and scope of work." },
                { q: "Do you offer frame cleaning as well?", a: "Yes. Frame and groove cleaning is part of the service." },
                { q: "Which products do you use?", a: "We work with professional, environmentally conscious cleaning products and take care with sensitive surfaces." }
              ],
              metaTitle: "Glass Cleaning Vienna & Graz | PutzELF",
              metaDescription: "Glass and frame cleaning in Vienna & Graz: streak-free windows, professional frame care and safe execution when needed."
            },
            industrial: {
              title: "Industrial Cleaning & Machinery",
              pageHeading: "Careful cleaning for machinery and industrial surfaces",
              description: "Specialised cleaning for machinery, production spaces and industrial operating areas.",
              features: ["Machine surface cleaning", "Safe working procedures", "Removal of production residue"],
              painTitle: "Typical challenges in industrial cleaning",
              painPoints: ["Oil, dust and production residue affect safety and quality", "Dirty machines and surfaces disrupt production", "Downtime and cleaning windows must be carefully planned"],
              solutionTitle: "Our approach for industrial environments",
              solutionPoints: ["Planned cleaning windows to minimise downtime", "Safety-focused procedures and processes", "Documented handovers and clean operational surfaces"],
              processTitle: "How we work",
              process: [
                { title: "Inquiry & assessment", desc: "You provide details about the machines and any access constraints." },
                { title: "Planning & safety", desc: "We coordinate cleaning windows and safety measures with you." },
                { title: "Execution", desc: "Our team cleans the areas professionally and records the handover." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Do you work during production breaks?", a: "Yes. We coordinate cleaning windows so production disruption is kept to a minimum." },
                { q: "Can you handle hazardous materials?", a: "We assess hazardous materials in advance and apply the appropriate safety procedures." },
                { q: "Is there documentation after cleaning?", a: "Yes. We can provide cleaning and handover documentation on request." },
                { q: "Do you offer regular cleaning plans?", a: "Yes. We can schedule recurring intervals based on production cycles and safety requirements." }
              ],
              metaTitle: "Industrial Cleaning Vienna & Graz | PutzELF",
              metaDescription: "Industrial cleaning in Vienna & Graz: safe cleaning for machines and production areas, with a focus on safety, documentation and efficiency."
            }
          },
          business: {
            expectations: [
              { key: "analysis", title: "Individual Assessment", desc: "Site assessment and tailored cleaning scope for business spaces." },
              { key: "fairPrice", title: "Fair Pricing", desc: "Transparent, contract-ready pricing with clear scope and intervals." },
              { key: "qualifiedStaff", title: "Service Teams", desc: "Teams follow the operational and confidentiality requirements agreed for your site." },
              { key: "fixedTeams", title: "Consistent Teams", desc: "Stable teams ensure consistent standards and efficient handovers." },
              { key: "excellentQuality", title: "Excellent Quality", desc: "Standardised checklists and inspections for reliable results." },
              { key: "desiredTimes", title: "Preferred Times", desc: "Flexible scheduling to avoid disruption to your operations." }
            ],
            maintenance: {
                title: "Commercial Maintenance Cleaning",
                pageHeading: "Consistent cleaning routines for business premises",
                description: "Recurring cleaning for offices and commercial spaces with agreed routines, clear responsibilities and documented quality checks.",
                features: [
                  "Workplace & communal area cleaning",
                  "Sanitary & kitchen upkeep",
                  "Flexible scheduling to avoid operational disruption"
                ],
                painTitle: "Typical business challenges",
                painPoints: [
                  "Visible dirt in customer or staff areas",
                  "High-touch surfaces that require regular disinfection",
                  "Variable cleaning quality and unclear responsibilities",
                  "Scheduling that conflicts with operating hours"
                ],
                solutionTitle: "Our approach for reliable service",
                solutionPoints: [
                  "Room-by-room checklists and clear task owners",
                  "Fixed visit rhythms with transparent scheduling",
                  "Regular quality checks, documented handovers and concise communication"
                ],
                processTitle: "How it works",
                process: [
                  { title: "Inquiry & requirements", desc: "Share site details, opening hours and prioritised areas so we can plan efficiently." },
                  { title: "Proposal & schedule", desc: "We create a tailored plan, agree time windows and define responsibilities." },
                  { title: "Execution & oversight", desc: "Recurring teams deliver tasks according to the checklist with routine inspections." }
                ],
                faqTitle: "Frequently asked questions",
                faqs: [
                  { q: "Can cleaning be scheduled outside business hours?", a: "Yes. We arrange early-morning, evening or weekend slots to minimise disruption." },
                  { q: "Do you offer service agreements?", a: "Yes. We provide recurring contracts with transparent scopes and pricing." },
                  { q: "Can confidential areas be included?", a: "Yes. We follow security and access rules for sensitive zones." },
                  { q: "How is quality maintained?", a: "Through checklists, inspections and documented handovers after visits." }
                ],
                metaTitle: "Maintenance Cleaning Vienna & Graz | PutzELF",
                metaDescription: "Recurring cleaning for offices, practices and commercial spaces with clear routines, quality checks and flexible service times."
            },
            deep: {
              title: "Commercial Deep Cleaning",
              pageHeading: "Intensive cleaning for busy commercial spaces",
              description: "Comprehensive deep cleaning for offices, retail spaces and commercial sites with higher upkeep needs.",
              features: ["Intensive floor and surface cleaning", "Carpet and upholstery care", "Disinfection of contact points"],
              painTitle: "When commercial deep cleaning is needed",
              painPoints: ["High footfall creates heavy soiling", "Audits or handovers require a clean and polished standard", "Stubborn marks and residue harm the appearance of the space"],
              solutionTitle: "Our commercial deep cleaning service",
              solutionPoints: ["Intensive cleaning with professional products", "Precise treatment of carpets and surfaces", "Documented release and clean handover"],
              processTitle: "How the process works",
              process: [
                { title: "Assessment", desc: "Photos or a short site visit help estimate effort and materials needed." },
                { title: "Quotation & scheduling", desc: "We plan the work to avoid unnecessary disruption to your operations." },
                { title: "Execution", desc: "Specialist teams tackle the agreed areas efficiently and to a high standard." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Can you work after closing hours?", a: "Yes. We schedule the work to minimise disruption to your business." },
                { q: "How do you protect sensitive equipment?", a: "We assess the surfaces and apply the relevant protection and handling measures." },
                { q: "Do you offer disinfection services?", a: "Yes. Targeted disinfection of contact points is available on request." },
                { q: "How is billing handled?", a: "For smaller jobs, billing is based on effort; for larger projects, we provide clear fixed-price quotes." }
              ],
              metaTitle: "Commercial Deep Cleaning | PutzELF",
              metaDescription: "Detailed deep cleaning after renovation or for periodic intensive requirements in Vienna and Graz. Request a proposal."
            },
            staircase: {
              title: "Staircase Cleaning",
              pageHeading: "Scheduled care for stairwells and shared building areas",
              description: "Regular upkeep and cleaning of stairwells, corridors and shared areas.",
              features: ["Cleaning of steps and rails", "Care for common areas", "Waste room and basement areas included"],
              painTitle: "Why staircase cleaning is important",
              painPoints: ["Dirt and marks in shared spaces quickly look untidy", "Accumulated grime can create safety issues", "Visitors and tenants form a strong impression of the building"],
              solutionTitle: "Our staircase care service",
              solutionPoints: ["Regular intervals for long-term cleanliness", "Special treatment for rails, steps and walls", "Waste room maintenance and odour control"],
              processTitle: "Typical workflow",
              process: [
                { title: "Inquiry", desc: "You share the building areas, frequency and your exact requirements." },
                { title: "Planning", desc: "We agree the intervals, working time and team size." },
                { title: "Execution", desc: "Regular cleaning is performed with quality checks and clear documentation." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Can the cleaning be done several times a week?", a: "Yes. The frequency can be adjusted to your needs and budget." },
                { q: "How is key access managed?", a: "We coordinate access arrangements with the property manager or responsible contact." },
                { q: "Are add-ons available?", a: "Yes. Window or glass surfaces can be added when needed." },
                { q: "How are invoices issued?", a: "Monthly or according to the agreed schedule, with transparent itemisation." }
              ],
              metaTitle: "Staircase Cleaning Vienna & Graz | PutzELF",
              metaDescription: "Scheduled cleaning for staircases and shared areas in residential and commercial buildings. Request a proposal."
            },
            construction: {
              title: "Post-Construction / Rough Cleaning (Commercial)",
              pageHeading: "A planned clean for commercial project handovers",
              description: "Cleaning after construction or renovation work in commercial properties, with a focus on handover quality and safety.",
              features: ["Rough cleaning after construction", "Final cleaning before handover", "Removal of building residue"],
              painTitle: "When post-construction cleaning is necessary",
              painPoints: ["Construction dust and residue interfere with use", "Handover deadlines must be met reliably", "Safety risks for staff and visitors can arise quickly"],
              solutionTitle: "Our commercial post-construction offer",
              solutionPoints: ["Staged rough and final cleaning", "Preparation for inspections and handovers", "Coordination with the building process"],
              processTitle: "Workflow",
              process: [
                { title: "Photos & details", desc: "Photos and plans help us assess scope and technical needs." },
                { title: "Planning", desc: "We coordinate the phases to fit your schedule and working rhythm." },
                { title: "Execution", desc: "Rough and final cleaning continues until the agreed handover standard is reached." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Do you also remove remaining building materials?", a: "We remove light debris as part of the service; larger disposal needs are coordinated with partners." },
                { q: "Do you need access to the construction site?", a: "Yes. Please share access conditions, safety requirements and time windows with us." },
                { q: "Can interim cleanings be carried out?", a: "Yes. We can schedule several cleaning phases to match the build progress." },
                { q: "How long does the final cleaning take?", a: "This depends on the condition and size of the area. After review, we provide a realistic estimate." }
              ],
              metaTitle: "Construction Cleaning Vienna & Graz | PutzELF",
              metaDescription: "Commercial construction cleaning in Vienna & Graz: planned rough and final cleaning up to handover quality."
            },
            window: {
              title: "Window & Frame Cleaning (Commercial)",
              pageHeading: "Clear glass and clean frames for business premises",
              description: "Professional cleaning of glass surfaces, facades and frames for visibility, safety and a polished appearance.",
              features: ["Facade and interior window cleaning", "Frame and joint care", "Special equipment where required"],
              painTitle: "Why professional glass cleaning matters",
              painPoints: ["Dirty windows harm the building’s appearance", "Large surfaces can be safety-sensitive", "Limescale, dust and environmental deposits reduce clarity and quality"],
              solutionTitle: "Our commercial glass and frame maintenance",
              solutionPoints: ["Interior and exterior window cleaning", "Use of lifts and safety equipment when needed", "Frame, groove and edge care"],
              processTitle: "How it works",
              process: [
                { title: "Inquiry", desc: "You tell us the area, height and access requirements." },
                { title: "Planning", desc: "We create a safe and efficient cleaning plan." },
                { title: "Execution", desc: "The work is carried out professionally, including frame care and any required safety measures." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Can you clean large facade windows?", a: "Yes. We plan lift or scaffold work in advance when larger surfaces require it." },
                { q: "How is pricing calculated?", a: "Pricing depends on area, accessibility and equipment required. We provide an individual quote." },
                { q: "Are safety standards followed?", a: "Yes. All work is carried out in line with current safety regulations and working standards." },
                { q: "Can the cleaning take place outside business hours?", a: "Yes. We coordinate the schedule so your operations are affected as little as possible." }
              ],
              metaTitle: "Commercial Window Cleaning | PutzELF",
              metaDescription: "Streak-free glass, frames and storefronts for businesses in Vienna and Graz, scheduled around operating hours."
            },
            industrial: {
              title: "Industrial Cleaning & Machinery (Commercial)",
              pageHeading: "Documented cleaning for machinery and production areas",
              description: "Cleaning of industrial facilities and working areas, aligned with safety requirements and operational efficiency.",
              features: ["Machine cleaning", "Production area cleaning", "Safe disposal of residue"],
              painTitle: "Typical challenges in industrial cleaning",
              painPoints: ["Contamination and residue affect quality and safety", "Production and workflow must be protected", "Cleaning windows need exact planning and documentation"],
              solutionTitle: "Our industrial cleaning approach",
              solutionPoints: ["Planned cleaning windows to reduce downtime", "Safety-first procedures and pre-agreed measures", "Documented handover and clean operating surfaces"],
              processTitle: "How we work",
              process: [
                { title: "Inquiry & assessment", desc: "You tell us about the machines, surfaces and access conditions." },
                { title: "Planning", desc: "We coordinate time slots and safety measures with you." },
                { title: "Execution", desc: "Our specialist teams clean the area and document the handover." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Can you work during production breaks?", a: "Yes. We schedule the cleaning windows so production impact is kept to a minimum." },
                { q: "Can you handle hazardous materials?", a: "Yes. We assess the requirements in advance and apply suitable safety procedures." },
                { q: "Is cleaning documentation provided?", a: "Yes. We provide cleaning and handover documentation on request." },
                { q: "Do you offer recurring cleaning plans?", a: "Yes. The schedule can be adapted to production cycles and safety requirements." }
              ],
              metaTitle: "Industrial Cleaning Vienna & Graz | PutzELF",
              metaDescription: "Safe, documented cleaning for machinery and production areas in Vienna and Graz, planned around operational and safety requirements."
            }
          }
            },
            overview: {
              title: "Cleaning Services for Homes & Businesses",
              subtitle: "Practical, reliable cleaning services for private households and commercial customers in Vienna and Graz. Select a service to see what’s included and request a quote.",
              cards: [
                { key: "privateMaintenance", title: "Home Maintenance", desc: "Recurring cleaning visits adapted to your household and schedule." },
                { key: "privateDeep", title: "Deep Cleaning", desc: "Intensive one‑off cleaning for heavy soiling or post‑renovation." },
                { key: "businessMaintenance", title: "Business Maintenance", desc: "Flexible, scheduled cleaning for offices and commercial premises." },
                { key: "businessDeep", title: "Commercial Deep Cleaning", desc: "Thorough cleaning for handovers, renovations and high‑traffic areas." },
                { key: "window", title: "Window & Frame Cleaning", desc: "Professional window and frame care for clear views and a tidy appearance." }
              ],
              whoForTitle: "Who we serve",
              whoForText: "Private households, landlords, property managers and businesses of all sizes. We tailor scope, frequency and timing to your specific needs.",
              challengesTitle: "Common cleaning challenges",
              challenges: [
                "Limited time for regular, detailed cleaning",
                "Stubborn dirt and renovation residue",
                "Maintaining hygiene and a presentable appearance for customers and staff"
              ],
              approachTitle: "Our approach",
              approach: [
                "Clear room‑by‑room checklists and transparent scopes",
                "Flexible appointment windows to reduce disruption",
                "Teams working with agreed routines and quality checks"
              ],
              benefitsTitle: "Why choose PutzELF",
              benefits: [
                "Reliable, scheduled visits and transparent pricing",
                "Consistent results through checklists and follow‑ups",
                "Straightforward communication and an easy inquiry process"
              ],
              includedTitle: "What’s included",
              included: [
                "Room‑by‑room checklist as agreed in the inquiry",
                "Sanitary and kitchen care where applicable",
                "Optional extras on request (windows, carpets)"
              ],
              conclusion: "Request a free, no‑obligation quote or start an inquiry. We’ll propose a suitable time window and a clear scope so you know exactly what to expect."
            },
      whatWeOffer: "What we offer",
      benefitsTitle: "Benefits",
      benefit1: "Cleaning matched to your needs",
      benefit2: "Flexible scheduling",
      benefit3: "Transparent pricing",
      cta: "Start an Inquiry",
      alt: {
        logo: "PutzELF Logo",
        homeCleaning: "Home Cleaning",
        officeCleaning: "Office Cleaning"
      },
      footer: {
        allServices: "All services",
        copyright: "All rights reserved.",
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
          instagramAria: "PutzELF on Instagram",
          facebookAria: "PutzELF on Facebook",
          links: {
            terms: "Terms & Conditions",
            withdrawal: "Right of Withdrawal",
            privacy: "Privacy Policy",
            imprint: "Imprint",
            calculator: "Price Calculator"
          }
        }
      },
      reviews: {
        kicker: "Google",
        sectionTitle: "Google Reviews",
        subtitle: "Customer reviews from satisfied clients.",
        previous: "Previous reviews",
        next: "Next reviews",
        googleBadge: "Google review",
        ratingLabel: "{{rating}} out of 5 stars",
        reviewBy: "Review by {{name}}",
        paginationLabel: "Review carousel",
        slide: "Review slide",
        empty: "No reviews available yet.",
        loading: "Loading reviews...",
        recently: "Recently",
        weekAgo: "A week ago",
        monthAgo: "A month ago",
        twoMonthsAgo: "Two months ago",
        reviewerFallback: "Google Reviewer"
      },
      blogUi: {
        seoTitle: "Commercial Cleaning Blog | PutzELF",
        seoDescription: "Practical guidance on office cleaning, hygiene, service planning and property care from the PutzELF team.",
        title: "News & Tips",
        empty: "No blog posts published yet.",
        readMore: "Read more",
        previous: "Previous",
        next: "Next",
        notFound: "Post not found",
        back: "Back to blog",
        home: "Home",
        relatedServices: "Related services"
      },
      jobOpening: {
        seoTitle: "Jobs at PutzELF – Cleaning & Customer Service",
        seoDescription: "Current opportunities at PutzELF in Vienna and Graz, with role details, requirements and application contact.",
        title: "Current Job Openings",
        description: "Open roles at PutzELF: customer service representatives and cleaners in Graz.",
        roles: [
          {
            title: "Customer Service Representative",
            body: "Handle customer inquiries, schedule appointments, and support our booking process. Good German skills and a friendly manner are required.",
            subject: "Application - Customer Service",
            cta: "Apply / Contact"
          },
          {
            title: "Cleaners - Graz",
            body: "We are looking for cleaners in Graz. Experience is an advantage but not required. Flexible working hours and fair pay.",
            subject: "Application - Cleaner Graz",
            cta: "Apply / Contact"
          }
        ]
      },
      contact: {
        seo: {
          title: "Contact PutzELF Vienna & Graz",
          description: "Contact PutzELF by phone, email or form. We will respond promptly with clear next steps."
        },
        kicker: "Contact",
        title: "Contact",
        intro: "Whether you have a question about our services, need a custom quote, or want to learn more about our support, we are happy to help.",
        support: "Customer support",
        phoneLabel: "Phone",
        emailLabel: "Email",
        locationsLabel: "Locations",
        helpLabel: "How we can help",
        helpText: "We support both private households and businesses with fast, friendly guidance and clear next steps.",
        formLabel: "Contact form",
        privacyNotice: "We use your details to handle your request. For details, see our",
        privacyPolicyLink: "Privacy Policy",
        fields: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          location: "Location",
          subject: "Subject",
          message: "Message"
        },
        bookingContact: {
          title: "Title",
          firstName: "First Name",
          lastName: "Last Name",
          streetName: "Street Name",
          houseNumber: "House No.",
          doorNumber: "Door No.",
          buildingNumber: "Building No.",
          postalCode: "Postal Code",
          city: "City",
          phone: "Phone Number",
          email: "Email Address"
        },
        locations: {
          vienna: "Vienna",
          graz: "Graz"
        },
        errors: {
          name: "Please enter your name.",
          emailRequired: "Please enter your email address.",
          emailInvalid: "Please enter a valid email address.",
          phone: "Please enter your phone number.",
          location: "Please select a location.",
          subject: "Please enter a subject.",
          message: "Please enter your message.",
          submitFailed: "Your message could not be sent. Please try again."
        },
        submit: {
          label: "Send message",
          loading: "Sending…",
          success: "Your message has been sent successfully. We will get back to you soon."
        }
      },
      partnerInquiryPage: {
        seoTitle: "Become a PutzELF Partner",
        description: "Information for cleaning companies, independent cleaners and cooperation partners in Vienna and Graz.",
        title: "Become a Partner",
        intro: "We welcome partnerships with companies and subcontractors. Please fill out the form and we will get back to you.",
        partnership: "Partnership",
        coverage: "Vienna · Graz",
        fields: {
          location: "Location",
          company: "Company",
          name: "Name",
          address: "Address",
          email: "Email",
          phone: "Phone",
          message: "Message"
        },
        privacyNotice: "We use your details to handle your partnership request. For details, see our",
        privacyPolicyLink: "Privacy Policy",
        submit: "Send Partnership Request",
        loading: "Sending…",
        success: "Request sent — we will contact you.",
        error: "Failed to send — try again later.",
        errors: {
          phoneDigitsOnly: "Phone must contain only numbers."
        }
      },
      
      privacyPolicy: {
        title: "Privacy Policy",
        seoTitle: "Privacy Policy | PutzELF",
        seoDescription: "Information about personal-data processing, cookies and privacy rights when using PutzELF services and this website.",
        intro: "Information pursuant to Articles 13 and 14 of the General Data Protection Regulation (GDPR)",
        sections: {
          controller: {
            title: "Controller",
            identity: "Sebastijan-Aleksandar Kerčulj, sole proprietor (PutzELF)",
            address: "Simmeringer Hauptstraße 24, 1110 Vienna, Austria",
            phone: "Phone: +43 676 630 01 67",
            email: "Email: office@putzelf.com",
          },
          generalPrinciples: {
            title: "General principles",
            body: "We process personal data only insofar as this is necessary for the purposes described below. The legal bases are in particular the performance of pre-contractual measures and contracts, legal obligations, legitimate interests and—in the case of optional services—your consent. Data is deleted or anonymized as soon as the purpose no longer applies and no statutory retention or evidentiary obligations remain.",
          },
          hosting: {
            title: "Hosting and server log files",
            body: "The website is hosted by Hetzner Online GmbH, Industriestraße 25, 91710 Gunzenhausen, Germany. When the website is accessed, the server processes, in particular, the IP address, date and time, page or file accessed, amount of data transferred, browser type, operating system and referrer URL. The processing serves the secure, stable and error-free operation of the website and is based on Article 6(1)(f) GDPR. Our legitimate interest lies in the secure operation of our online offering. Server log files are generally deleted no later than 14 days, unless a security-relevant incident makes longer retention necessary. An agreement on processing on our behalf pursuant to Article 28 GDPR is in place with the hosting provider."
          },
          appointments: {
            title: "Appointment inquiries and offer preparation",
            data: "If you submit a non-binding appointment inquiry through the website, we process the contact details you entered, the address of the property to be cleaned, information about the requested service, the requested appointment and the estimated duration, as well as voluntary comments. In addition, the IP address and time of receipt may be logged to detect technical errors and misuse.",
            purpose: "The processing serves to handle your inquiry, check availability, prepare an offer and—after conclusion of a contract—perform and invoice the order. The legal basis is Article 6(1)(b) GDPR; for technical security, Article 6(1)(f) GDPR.",
            retention: "Inquiries that do not lead to a contract are generally deleted after six months, unless longer storage is necessary to handle an open matter or to defend or pursue claims. Contract and invoice documents are retained in accordance with statutory retention obligations, generally for seven years.",
          },
          contact: {
            title: "Contact",
            body: "When you contact us by telephone, email or contact form, we process the contact details you provided and the content of your message to handle your request and for any necessary follow-up questions. The legal basis is Article 6(1)(b) GDPR if the inquiry is directed at a contract or pre-contractual measures; otherwise, Article 6(1)(f) GDPR. Our legitimate interest lies in handling business and other inquiries. The data is deleted when the matter has been dealt with and no statutory retention or evidentiary interests stand in the way."
          },
          serviceDelivery: {
            title: "Service teams and subcontractors",
            body: "To plan and perform an order, the employees or contractually engaged subcontractors assigned to it receive only the information required for this purpose, in particular name, property address, appointment, access information and service-related instructions. The legal basis is Article 6(1)(b) GDPR. Assigned personnel are required to maintain confidentiality. Where a service provider processes personal data exclusively on our behalf, an agreement pursuant to Article 28 GDPR is concluded."
          },
          applications: {
            title: "Job applications",
            body: "If you apply for a job, we process the contact, CV, qualification and application data you provided to carry out the application procedure on the basis of Article 6(1)(b) GDPR and the relevant employment-law provisions. After the procedure has ended, we store the documents for up to seven months on the basis of Article 6(1)(f) GDPR. Our legitimate interest lies in documenting the selection procedure and establishing or defending possible claims. Longer retention on file takes place only with your separate consent."
          },
          partners: {
            title: "Inquiries from prospective business partners",
            body: "For an inquiry through “Become a partner” or another channel, we process, in particular, company name, contact person, contact details, location and message to assess and initiate a collaboration. The legal basis is Article 6(1)(b) GDPR insofar as pre-contractual measures are concerned; otherwise, Article 6(1)(f) GDPR. Inquiries that are not pursued are generally deleted after six months, unless statutory retention or evidentiary interests stand in the way."
          },
          cookies: {
            title: "Cookies and consent management",
            necessary: "Strictly necessary cookies or comparable storage technologies may be used for the technical operation of the website. This includes, in particular, storing your language, location selection and consent decision. The legal basis is Section 165(3) TKG 2021; insofar as personal data is processed, Article 6(1)(f) GDPR.",
            optional: "Optional analytics, marketing and map services are activated only after you have consented through the consent banner. The legal bases are Article 6(1)(a) GDPR and Section 165(3) TKG 2021. You may change or withdraw your consent at any time with effect for the future through “Cookie settings” in the footer. The overview there contains the specific technologies, providers, purposes and storage periods used in each case.",
          },
          googleAds: {
            title: "Google Tag Manager and Google Ads",
            service: "After you consent, we use Google Tag Manager and Google Ads, provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Tag Manager is used to manage website tags. Google Ads measures the effectiveness of our advertising and, where selected, creates audiences for personalized advertising or remarketing. Information sent to Google may include your IP address, device and browser information, pages visited, referrer, timestamps, interactions and cookie or other online identifiers.",
            legalBasis: "The legal bases are your consent under Article 6(1)(a) GDPR and Section 165(3) TKG 2021. These marketing services are not activated before you consent. Processing by Google LLC in the United States cannot be ruled out. Google may rely on applicable adequacy decisions, in particular the EU–US Data Privacy Framework, or standard contractual clauses.",
            moreInfo: "More information: <googlePrivacy>Google Privacy Policy</googlePrivacy> and <googlePartnerSites>Data use in embedded Google services</googlePartnerSites>.",
          },
          analytics: {
            title: "Google Analytics 4",
            service: "After you consent, we use Google Analytics 4, a web analytics service provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Google Analytics evaluates how our website is used, including pages visited, time spent, approximate region, device and browser used, and interactions, helping us improve our services. Cookies may be set, in particular “_ga” and “_ga_*”, with storage periods of up to two years; the current details in Cookie settings apply. According to Google, Google Analytics 4 does not log or store IP addresses. We do not use it to identify individual visitors.",
            legalBasis: "The legal bases are your consent under Article 6(1)(a) GDPR and Section 165(3) TKG 2021. Google Analytics is not activated without your consent. Processing by Google LLC in the United States cannot be ruled out. Google may rely on applicable adequacy decisions, in particular the EU–US Data Privacy Framework, or standard contractual clauses. You can withdraw your consent at any time through Cookie settings.",
            moreInfo: "More information: <googlePrivacy>Google Privacy Policy</googlePrivacy> and <googlePartnerSites>Data use in embedded Google services</googlePartnerSites>.",
          },
          leadinfo: {
            title: "Leadinfo",
            service: "After you consent, we use the lead generation service of Leadinfo B.V., Rivium Quadrant 141, 2909 LC Capelle aan den IJssel, the Netherlands. Leadinfo compares a website visitor’s IP address with company data from publicly available sources to associate visits with companies, and provides us with company information and details about pages visited. Leadinfo also processes domains entered in forms to improve the matching of IP addresses to companies and the service.",
            cookies: "When the analytics function is enabled, two first-party cookies may be used: “_li_id.*” distinguishes new and returning visits for up to two years, and “_li_ses.*” groups pages visited during a session for the duration of that session. The current details in Cookie settings apply.",
            legalBasis: "The legal bases are your consent under Article 6(1)(a) GDPR and Section 165(3) TKG 2021. Leadinfo is not activated on our website without your consent. You can withdraw consent through Cookie settings and can also use Leadinfo’s opt-out option.",
            moreInfo: "More information: <leadinfoPrivacy>Privacy at Leadinfo</leadinfoPrivacy>; <leadinfoOptOut>Leadinfo opt-out</leadinfoOptOut>.",
          },
          maps: {
            title: "Google Maps",
            body: "We may embed Google Maps, provided by Google Ireland Limited, to show our service area. The interactive map loads only after you consent to the “External media” category or activate the map using the provided two-click solution. Only then is information such as your IP address, device and browser information, and the page visited sent to Google. The legal bases are Article 6(1)(a) GDPR and Section 165(3) TKG 2021. Processing by Google LLC in the United States cannot be ruled out. Without consent, only a local placeholder or a simple <maps>link to Google Maps</maps> is shown."
          },
          socialMedia: {
            title: "Social media links",
            body: "Our website may contain simple links to Instagram, Facebook and LinkedIn. Until you click one of these links, the link itself does not transmit data to the relevant provider. After clicking, you leave our website; the provider’s privacy information applies to subsequent processing."
          },
          recipients: {
            title: "Recipients and transfers to third countries",
            body: "Where necessary for the relevant purpose, recipients of personal data may include hosting and IT service providers, communications providers, assigned employees and subcontractors, tax advisors, public authorities and the providers named in this notice. Data is transferred only to the extent necessary. For transfers to countries outside the European Economic Area, we use safeguards provided for under the GDPR, in particular adequacy decisions or standard contractual clauses, unless a statutory exception applies."
          },
          rights: {
            title: "Your rights",
            body: "Subject to the statutory requirements, you have the right to access, rectification, erasure, restriction of processing and data portability. You may object to processing based on Article 6(1)(f) GDPR for reasons arising from your particular situation. You may withdraw consent you have given at any time with effect for the future. To exercise your rights, a message to office@putzelf.com is sufficient.",
            complaint: "You also have the right to lodge a complaint with the <supervisoryAuthority>Austrian Data Protection Authority</supervisoryAuthority>, Barichgasse 40-42, 1030 Vienna, telephone +43 1 52 152-0, email dsb@dsb.gv.at."
          },
          security: {
            title: "Data security",
            body: "We take appropriate technical and organizational measures to protect personal data against loss, unauthorized access, alteration and disclosure. The website is transmitted using TLS/SSL encryption."
          },
          updates: {
            title: "Updates",
            body: "We update this privacy notice when the services used, processing procedures or the legal situation change. As of: September 10, 2026."
          }
        }
      },
      home: {
        title: "Request a cleaning",
        seoTitle: "Booking",
        seoDescription: "Book a cleaning and enter your details.",
        locationModal: {
          title: "Where would you like to request the cleaning?",
          prompt: "Select the city for your service",
          vienna: "Vienna",
          graz: "Graz",
          validation: "Please choose a location to continue."
        },
        successTitle: "Inquiry sent successfully",
        successMessage: "Thank you! Your inquiry has been successfully submitted.",
        bookingId: "Booking ID: {{id}}",
        serviceLocationLabel: "Service location:",
        selectType: "Choose a cleaning type",
        contactTitle: "Your contact details",
        durationPlaceholder: "2+",
        decreaseHours: "Decrease hours",
        increaseHours: "Increase hours",
        types: {
          standard: "Home cleaning",
          office: "Office cleaning",
          apartmentHotel: "Apartment / Hotel"
        },
        flow: {
          inquiry: "Start an Inquiry",
          calculator: "Price Calculator",
          inquiryDescription: "Fill in the form below and we will get back to you with a personalized offer."
        },
        subcategories: {
          title: "Choose subcategory",
          intensive: "Intensive",
          window: "Windows",
          none: "—"
        },
        descriptions: {
          standard: "Regular maintenance clean for homes; surfaces, bathrooms, and floors.",
          office: "Professional office cleaning tailored to workspaces and common areas.",
          apartmentHotel: "Detailed clean for apartments and hotel rooms between stays."
        },
        calendar: {
          loading: "Loading availability…",
          prev: "Previous month",
          next: "Next month",
          errorFetchDates: "Failed to fetch dates.",
          errorFetchSlots: "Failed to fetch available times.",
          available: "Available",
          unavailable: "Unavailable",
          selected: "Selected",
          selectedAvailable: "Selected and available",
          dateHint: "Choose a date from the calendar."
        },
        durationLabel: "Estimated hours",
        slots: {
          chooseDate: "Pick a date to see available times.",
          loading: "Loading available times…",
          none: "No available times for this day. Please choose another date."
        },
        dateLabel: "Date",
        timeLabel: "Time",
        renegotiate: "I understand the service is billed based on the actual time worked",
        durationHelp: "Minimum booking is 2 hours.",
        estimated: "Estimated price",
        rate: "Rate: €{{rate}}/hour",
        submit: "Send Request",
        submitInquiry: "Send Request",
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
        seoTitle: "Cleaning Price Calculator Vienna",
        seoDescription: "Cleaning price calculator for Vienna: estimate the gross cost in seconds.",
        title: "Price Calculator",
        subtitle: "Estimate the cost of your cleaning based on duration and extras.",
        typeHeading: "Choose a cleaning type",
        subHeading: "Add premium services",
        durationLabel: "Duration (hours)",
        durationHelp: "Bookings start at 2 hours. Use the arrows to adjust.",
        estimatedTotalLabel: "Price breakdown",
        estimatedTotal: "Estimated total: €{{price}}",
        hourlyRate: "Hourly rate: {{rate}}",
        premiumNotice: "Premium add-ons adjust the hourly rate.",
        renegotiateLabel: "Allow renegotiation if the job needs more time",
        resetBtn: "Reset selection",
        cta: "Request a Booking",
        disclaimer: "This is an estimate. Final pricing is confirmed after your inquiry is reviewed.",
        netLabel: "Net",
        vatLabel: "VAT (20%)",
        grossLabel: "Gross",
        decreaseHours: "Decrease hours",
        increaseHours: "Increase hours"
      },

      windowModal: {
        title: "How many windows would you like cleaned?"
      },
      order: {
        title: "Order",
        quoteRequestTitle: "Quote request",
        loading: "Loading booking...",
        confirmTitle: "Request a Booking",
        summary: "Booking Summary",
        date: "Date",
        time: "Time",
        cleaningType: "Cleaning Type",
        duration: "Duration",
        durationUnit: "hours",
        price: "Price",
        directInquiry: "Send a direct inquiry",
        discountTitle: "You have received a 20% discount!",
        discountBody: "Your price will be sent to you by email once you confirm.",
        countrySelectLabel: "Select country",
        countries: {
          at: "Austria",
          de: "Germany",
          ch: "Switzerland",
          cz: "Czechia",
          sk: "Slovakia",
          hu: "Hungary",
          pl: "Poland",
          it: "Italy",
          si: "Slovenia",
          hr: "Croatia",
          nl: "Netherlands",
          be: "Belgium",
          fr: "France",
          es: "Spain"
        },
        notesLabel: "Notes (optional)",
        labels: { name: "Name", email: "Email", address: "Address", phone: "Phone" },
        enterDetails: "Enter your details to request a cleaning",
        placeholders: {
          name: "Full name",
          email: "Email",
          address: "Street name & House No. & Door No.",
          phone: "Phone",
          notes: "Please add any additional notes or requests..."
        },
        errors: {
          invalidEmail: "Please enter a valid email address.",
          invalidEmailDoubleDot: "Email cannot contain consecutive dots.",
          invalidPhone: "Please enter a valid phone number including country code.",
          createQuoteFailed: "The inquiry could not be created. Please try again.",
          confirmFailed: "The request could not be confirmed. Please try again."
          ,requiredFirstName: "Please enter your first name.",
          requiredLastName: "Please enter your last name.",
          requiredStreet: "Please enter your street name.",
          requiredHouseNumber: "Please enter your house number.",
          requiredDoorNumber: "Please enter your door number.",
          requiredEmail: "Please enter your email address.",
          requiredPhone: "Please enter your phone number.",
          requiredGdpr: "Please agree to GDPR consent.",
          requiredPostal: "Please enter your postal code.",
          requiredCity: "Please enter your city.",
          requiredAddress: "Please enter your address.",
          requiredName: "Please enter your name."
        },
        gdprPrefix: "I agree to the processing of my personal data in accordance with the ",
        gdprText: "I agree that my data will be processed for this inquiry and that I may be contacted about it.",
        gdprFull: "I agree that my data will be processed for this inquiry and that I may be contacted about it.",
        gdprLink: "Privacy Policy",
        confirming: "Sending request...",
        confirmBtn: "Request a Booking",
        submitBtn: "Send inquiry",
        confirmedTitle: "Inquiry sent successfully",
        confirmedMsg: "Thank you! Your inquiry has been successfully submitted. A member of our team will contact you to confirm the appointment.",
        bookingId: "Booking ID: {{id}}",
        errorPrefix: ""
      }
    }
  },
  de: {
    translation: {
      nav: {
        bookNow: "Anfrage starten",
        phone: "+43 676 6300167",
        email: "office@putzelf.com",
        services: "Leistungen",
        blog: "Blog",
        jobOpening: "Jobs",
        getPartners: "Partner werden",
        book: "Anfrage starten",
        company: "Unternehmen",
        private: "Privatkunden",
        privateMaintenance: "Unterhaltsreinigung",
        privateDeep: "Grundreinigung",
        privateResidential: "Wohnreinigung",
        privateConstruction: "Bauendreinigung / Grobreinigung",
        privateWindow: "Glas- & Rahmenreinigung",
        privateIndustrial: "Industriereinigung & Maschinen",
        businessMaintenance: "Unterhaltsreinigung",
        businessDeep: "Grundreinigung",
        businessStaircase: "Stiegenhausreinigung",
        businessConstruction: "Bauendreinigung / Grobreinigung",
        businessWindow: "Glas- & Rahmenreinigung",
        businessIndustrial: "Industriereinigung & Maschinen",
        contact: "Kontakt",
        contactPage: "Kontaktseite",
        phoneLabel: "Telefon",
        emailLabel: "E-Mail",
        vienna: "Wien",
        graz: "Graz",
        menu: "Menü",
        homeAria: "Zur Startseite",
        switchEnglish: "Auf Englisch umschalten",
        switchGerman: "Auf Deutsch umschalten",
        englishFlag: "Englische Flagge",
        germanFlag: "Deutsche Flagge"
      },
      common: {
        cancel: "Abbrechen",
        ok: "OK",
        backToHome: "Zur Startseite"
      },
      notFound: {
        title: "Ups! Hier ist nichts zu putzen. 🧹",
        message: "Diese Seite wurde leider nicht gefunden. Wir bringen Sie zurück zur Startseite.",
        home: "Zur Startseite",
        back: "Oder starten Sie Ihre Suche neu"
      },
      auth: {
        login: {
          seoTitle: "Anmelden",
          seoDescription: "Melden Sie sich an, um Ihre Buchungen zu verwalten.",
          title: "Anmelden",
          description: "Melden Sie sich an, um Ihre Buchungen zu verwalten.",
          email: "E-Mail",
          password: "Passwort",
          loading: "Anmeldung läuft…",
          submit: "Anmelden",
          noAccount: "Noch kein Konto?",
          registerLink: "Registrieren"
        },
        register: {
          seoTitle: "Registrieren",
          seoDescription: "Konto erstellen, um Termine zu buchen.",
          title: "Konto erstellen",
          description: "Registrieren Sie sich, um Termine zu buchen und zu verwalten.",
          email: "E-Mail",
          password: "Passwort",
          inviteCode: "Admin-Einladungscode (optional)",
          invitePlaceholder: "Nur ausfüllen, wenn Sie als Admin eingeladen wurden",
          loading: "Konto wird erstellt…",
          submit: "Konto erstellen",
          hasAccount: "Sie haben bereits ein Konto?",
          loginLink: "Anmelden"
        }
      },
      form: {
        requiredField: "Bitte füllen Sie dieses Feld aus."
      },
      cookies: {
        heading: "Ihre Privatsphäre ist uns wichtig",
        msg: "Wir verwenden technisch notwendige Cookies, um die Sicherheit unserer Website zu gewährleisten. Mit Ihrer Einwilligung nutzen wir zudem Analyse-Tools (wie Google Analytics und Leadinfo), um unser Angebot zu verbessern und Unternehmensbesuche zu analysieren. Ein Tracking erfolgt erst nach Ihrer Zustimmung. Sie können Ihre Einwilligung erteilen, ablehnen oder in unserer <0>Datenschutzerklärung</0> mehr dazu erfahren.",
        decline: "Ablehnen",
        privacyPolicy: "Datenschutzerklärung",
        settings: "Cookie-Einstellungen",
        necessary: "Nur notwendige",
        acceptAll: "Alle akzeptieren",
        preferencesTitle: "Cookie-Einstellungen",
        preferencesIntro: "Wählen Sie aus, welche Cookies Sie zulassen möchten. Notwendige Cookies sind immer aktiviert, da sie für die grundlegende Funktion und Sicherheit der Website erforderlich sind.",
        necessaryTitle: "Notwendige Cookies",
        necessaryDesc: "Diese Cookies sind für grundlegende Funktionen, die Sicherheit und den ordnungsgemäßen Betrieb der Website erforderlich.",
        alwaysOn: "Immer aktiv",
        analyticsTitle: "Analyse-Cookies",
        analyticsDesc: "Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen, damit wir unsere Dienstleistungen und das Nutzererlebnis verbessern können.",
        enable: "Aktivieren",
        marketingTitle: "Marketing-Cookies",
        marketingDesc: "Diese Cookies helfen uns, unsere Marketingaktivitäten zu messen und zu verbessern und zu verstehen, wie Besucher mit unserer Website interagieren.",
        save: "Einstellungen speichern",
        cancel: "Abbrechen"
      },
      imprint: {
        title: "Impressum",
        seoTitle: "Impressum | PutzELF",
        seoDescription: "Anbieterkennzeichnung und Kontaktdaten von PutzELF.",
        legalIntro: "Informationen gemäß § 5 ECG, § 63 GewO 1994 und Offenlegung gemäß § 25 Mediengesetz",
        providerTitle: "Medieninhaber und Diensteanbieter",
        nameLabel: "Name",
        nameValue: "Sebastijan-Aleksandar Kerčulj, Einzelunternehmer",
        businessNameLabel: "Geschäftsbezeichnung",
        businessNameValue: "PutzELF",
        businessPurposeLabel: "Unternehmensgegenstand",
        businessPurposeValue: "Denkmal-, Fassaden- und Gebäudereinigung sowie Hausbetreuung",
        addressLabel: "Unternehmenssitz und Anschrift",
        serviceAreaLabel: "Filiale Graz",
        serviceAreaValue: "Waagner-Biro-Straße 47, 8020 Graz, Österreich",
        vatTitle: "UID-Nummer",
        vatValue: "ATU78448967",
        gisaTitle: "GISA-Zahl",
        gisaValue: "38010538",
        authorityTitle: "Gewerbebehörde",
        authorityValue: "Magistratisches Bezirksamt für den 3. und 5. Bezirk",
        membershipTitle: "Mitgliedschaft",
        membershipValue: "Wirtschaftskammer Wien",
        associationsTitle: "Fachorganisationen",
        associationsValue: "Landesinnung Wien der Denkmal-, Fassaden- und Gebäudereiniger; Fachgruppe Wien der gewerblichen Dienstleister; Fachgruppe Wien der persönlichen Dienstleister; Fachgruppe Werbung und Marktkommunikation Wien",
        lawTitle: "Anwendbare Rechtsvorschriften",
        lawBeforeLink: "Gewerbeordnung 1994 (GewO), abrufbar im",
        lawLinkText: "Rechtsinformationssystem des Bundes",
        lawAfterLink: ".",
        hqValue: "Simmeringer Hauptstraße 24, 1110 Wien, Österreich",
        contactTitle: "Kontakt",
        phoneLabel: "Telefon",
        phoneValue: "+43 676 630 01 67",
        emailLabel: "E-Mail",
        emailValue: "office@putzelf.com",
        grazEmailLabel: "E-Mail für Graz und die Steiermark",
        grazEmailValue: "office.stmk@putzelf.com",
        companyDetailsTitle: "Unternehmensdaten",
        disputeTitle: "Verbraucherstreitbeilegung",
        disputeBody: "Wir sind weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Kommt es zu einer Streitigkeit mit einem Verbraucher, die wir nicht unmittelbar beilegen können, informieren wir den Verbraucher nach Maßgabe des Alternative-Streitbeilegung-Gesetzes auf einem dauerhaften Datenträger über die zuständige Stelle und darüber, ob wir an einem Verfahren teilnehmen.",
        generalInfoLabel: "Allgemeine Informationen:",
        arbitrationLinkText: "Schlichtung für Verbrauchergeschäfte",
        disclosureTitle: "Offenlegung gemäß § 25 Mediengesetz",
        disclosureBody: "Medieninhaber: Sebastijan-Aleksandar Kerčulj, Einzelunternehmer. Sitz: Wien. Unternehmensgegenstand: wie oben. Die Website informiert über das Unternehmen und seine Dienstleistungen und dient der Anbahnung von Aufträgen, Kooperationen und Beschäftigungsverhältnissen."
      },
      profile: {
        title: "Putzfrau in Wien gesucht?",
        subtitle: "Sehen Sie sich verfügbare Reinigungskräfte an und wählen Sie die passende Person für Ihre Buchung.",
        choose: "Wählen Sie mich",
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
        title: "Reinigung in Wien und Graz – schnell & extra sauber",
        subtitle: "Buchen Sie Ihre Reinigungskraft in Wien oder Graz in wenigen Klicks: Haushaltsreinigung, Grundreinigung, Fensterreinigung oder Büroreinigung.",
        cta: "Anfrage starten",
        jobCta: "Job gesucht?",
        jobModalTitle: "Werden Sie Teil des PutzELF-Teams",
        jobModalBody: "Senden Sie uns Ihre Kontaktdaten und Bewerbung an {{email}} – wir melden uns schnell zurück.",
        jobModalEmailCta: "E-Mail senden",
        jobModalClose: "Schließen"
      },
      landingAlternative: {
        seoTitle: "Reinigungsfirma Wien & Graz – Büro- & Unterhaltsreinigung | PutzELF",
        seoDescription: "Zuverlässige Büro- und Unterhaltsreinigung für Unternehmen in Wien und Graz. Klare Abläufe, feste Ansprechpartner und kostenlose Beratung.",
        heroTitle: "Professionelle Reinigung in Wien und Graz:",
        heroTitleLine2: "Für Unternehmen jeder Art.",
        heroSubtitle: "Zuverlässige Reinigung für Unternehmen in Wien und Graz – mit gleichbleibender Qualität und flexiblen Zeiten.",
        heroPrimaryCta: "Anfrage starten",
        heroSecondaryCta: "Anfrage starten",
        trust: ["Google-Bewertungen ansehen"],
        problemTitle: "Warum Unternehmen zu PutzELF wechseln",
        problems: [
          "Unzuverlässige Reinigungsanbieter",
          "Schwankende Qualität von Termin zu Termin",
          "Keine Flexibilität für Geschäftszeiten"
        ],
        solutions: [
          "Reinigungsteams für Ihre Unternehmensräume",
          "Zuverlässige Planung und Qualitätskontrollen",
          "Individuelle Reinigungspläne für Ihr Unternehmen"
        ],
        solutionTitle: "Unsere Lösung",
        servicesTitle: "Unsere Reinigungsleistungen für Unternehmen",
        services: [
          { key: "businessMaintenance", title: "Unterhaltsreinigung", desc: "Planbare Reinigung, abgestimmt auf Ihre Unternehmensräume." },
          { key: "businessDeep", title: "Grundreinigung", desc: "Gründliche Reinigung bei stärkerer Verschmutzung und einmaligem Bedarf." },
          { key: "businessStaircase", title: "Stiegenhausreinigung", desc: "Zuverlässige Pflege gemeinschaftlicher Gebäudebereiche." },
          { key: "businessConstruction", title: "Bauendreinigung", desc: "Grob- und Feinreinigung nach Bauarbeiten." },
          { key: "businessWindow", title: "Glas- und Rahmenreinigung", desc: "Klare Glasflächen und sorgfältig gereinigte Rahmen." },
          { key: "businessIndustrial", title: "Industriereinigung", desc: "Reinigung von Maschinen und Produktionsflächen." }
        ],
        processTitle: "So funktioniert es",
        process: ["Anfrage", "Kurzer Anruf oder Vor-Ort-Termin", "Individuelles Angebot erhalten", "Reinigungsservice startet"],
        faqTitle: "Häufig gestellte Fragen",
        faqs: [
          { q: "Wie wird der Preis berechnet?", a: "Der Preis richtet sich nach Standort, Größe, Häufigkeit und Leistungsumfang. Nach der Beratung erhalten Sie ein klares Angebot." },
          { q: "Welche Gebiete bedienen Sie?", a: "Wir bieten unsere Leistungen in Wien und Graz an. Fragen Sie uns gerne nach der Verfügbarkeit in Ihrer Region." },
          { q: "Brauche ich einen langfristigen Vertrag?", a: "Nein. Wir bieten flexible Modelle – von einmaligen Einsätzen bis zu laufenden Vereinbarungen." },
          { q: "Wie schnell kann der Service starten?", a: "In den meisten Fällen starten wir innerhalb weniger Tage nach Bestätigung Ihres Plans." }
        ],
        finalTitle: "Bereit für zuverlässige Reinigung?",
        finalSubtitle: "Fordern Sie Ihre kostenlose Beratung an oder kontaktieren Sie uns direkt.",
        finalCta: "Anfrage starten",
        callNow: "Jetzt anrufen",
        directContact: "Direkter Kontakt",
        freeConsultTitle: "Kostenlose Beratung sofort per Anruf",
        freeConsultNote: "Kein Kalender nötig – rufen Sie uns direkt an und wir besprechen Ihren Bedarf sofort.",
        gdprText: "DSGVO-konforme Prozesse",
        locations: {
          title: "Unsere Standorte",
          description: "PutzELF ist in Wien und Graz für Sie da.",
          vienna: "Wien",
          headquarters: "Unternehmenssitz",
          viennaStreet: "Simmeringer Hauptstraße 24",
          viennaPostal: "1110 Wien",
          graz: "Graz",
          branch: "Filiale",
          grazStreet: "Waagner-Biro-Straße 47",
          grazPostal: "8020 Graz"
        },
        serviceLinks: [
          { key: "servicesOverview", label: "Alle Leistungen" },
          { key: "privateMaintenance", label: "Unterhaltsreinigung" },
          { key: "privateDeep", label: "Grundreinigung" },
          { key: "privateResidential", label: "Wohnreinigung" },
          { key: "privateWindow", label: "Glas- & Rahmenreinigung" },
          { key: "businessMaintenance", label: "Gewerbliche Unterhaltsreinigung" },
          { key: "businessStaircase", label: "Treppenhausreinigung" },
          { key: "contact", label: "Kontakt" },
          { key: "blog", label: "Blog" },
          { key: "privacy", label: "Datenschutz" },
          { key: "imprint", label: "Impressum" }
        ]
      },
      contact: {
        callNow: "Rufen Sie uns an"
      },
      services: {
        cta: "Jetzt anfragen",
        pricingLine: "Transparente Preise ohne versteckte Kosten.",
        schedule: "Flexible Terminplanung",
        scheduleLine: "Wählen Sie einen Termin, der zu Ihrem Alltag passt.",
        whatWeOffer: "Leistungsumfang",
        relatedTitle: "Weitere Services",
        ui: {
          home: "Startseite",
          breadcrumb: "Brotkrümelnavigation",
          service: "Leistung",
          windowCleaning: "Fensterreinigung",
          challenge: "Die Herausforderung",
          approach: "Unsere Lösung",
          process: "Ablauf",
          gallery: "Bilder",
          faq: "FAQ",
          contact: "Kontakt",
          coverageLabel: "Einsatzgebiet",
          coverageText: "In Wien und Umgebung sowie in Graz und Umgebung."
        },
        expectations: {
          kicker: "Was Sie erwartet",
          title: "Was Sie erwartet"
        },
        standard: { title: "Standardreinigung", desc: "Schnelle und effiziente Regelreinigung." },
        deep: { title: "Grundreinigung", desc: "Gründliche Reinigung bis in jede Ecke." },
        office: { title: "Büroreinigung", desc: "Professionelle Reinigung für Ihre Büroräume." },
        reliable: "Zuverlässig",
        reliableLine: "Reinigungsleistungen nach Ihren Anforderungen und Ihrem Zeitplan.",
        pricing: "Transparente Preise",
        easy: "Einfache Buchung",
        priceLine: "Nur €36/Stunde, keine versteckten Kosten.",
        easyLine: "Online buchen in weniger als 2 Minuten und entspannen.",
        homeTitle: "Haushaltsreinigung",
        homeDesc: "Frisch, makellos und einladend. Unser Team reinigt Ihr Zuhause sorgfältig und präzise, damit Sie sich wohlfühlen.",
        homeCta: "Buchung starten",
        officeTitle: "Büroreinigung",
        officeDesc: "Ein sauberes Büro bedeutet einen produktiven Tag. Wir halten Ihre Arbeitsräume sauber, hygienisch und professionell.",
        officeCta: "Buchung starten",
          private: {
            expectations: [
              { key: "analysis", title: "Individuelle Analyse", desc: "Wir prüfen Ihre Wohnung und empfehlen den passenden Reinigungsumfang." },
              { key: "fairPrice", title: "Faire Preise", desc: "Klare Preise ohne versteckte Kosten für planbare Haushaltsreinigungen." },
              { key: "qualifiedStaff", title: "Reinigungsteam", desc: "Wir achten auf einen sorgfältigen und respektvollen Umgang mit Ihrem Zuhause." },
              { key: "fixedTeams", title: "Feste Teams", desc: "Konstante Teams sorgen für Vertrautheit und gleichbleibende Qualität." },
              { key: "excellentQuality", title: "Exzellente Qualität", desc: "Checklisten und Nachkontrollen sichern zuverlässige Ergebnisse." },
              { key: "desiredTimes", title: "Wunschzeiten", desc: "Flexible Termine, angepasst an Ihren Alltag und Ihre Bedürfnisse." }
            ],
          maintenance: {
            title: "Unterhaltsreinigung",
            pageHeading: "Regelmäßige Reinigung passend zu Ihrem Zuhause",
            description: "Regelmäßige Reinigung für Privathaushalte, abgestimmt auf Ihre Abläufe.",
            features: ["Regelmäßige Raumreinigung", "Reinigung von Küche und Bad", "Flexible Zeitfenster"],
            painTitle: "Wann eine Unterhaltsreinigung sinnvoll ist",
            painPoints: ["Zeitmangel im Alltag", "Sichtbarer Schmutz zwischen Reinigungen", "Hygiene in Küche und Bad"],
            solutionTitle: "Unsere Lösung für Privathaushalte",
            solutionPoints: ["Regelmäßige, planbare Einsätze", "Detaillierte Checklisten pro Raum", "Flexible Terminfenster – morgens oder abends"],
            processTitle: "So funktioniert es",
            process: [
              { title: "Anfrage starten", desc: "Sie senden Ihre Anforderungen über das Buchungsformular." },
              { title: "Bedarf besprechen", desc: "Wir klären Umfang, Häufigkeit und besondere Wünsche." },
              { title: "Reinigung starten", desc: "Das Team reinigt zum vereinbarten Termin nach Checkliste." }
            ],
            faqTitle: "Häufige Fragen",
            faqs: [
              { q: "Wie oft sollte eine Unterhaltsreinigung stattfinden?", a: "Je nach Nutzung empfehlen wir 1× bis 4× pro Monat; wir beraten Sie gern." },
              { q: "Können bestimmte Bereiche priorisiert werden?", a: "Ja. Geben Sie bei der Anfrage an, welche Räume besonders wichtig sind." },
              { q: "Wer bringt die Reinigungsmittel mit?", a: "Auf Wunsch bringt unser Team geeignete Mittel mit; eigene Produkte sind möglich." },
              { q: "Gibt es eine Mindestbuchungsdauer?", a: "Die Mindestbuchung beträgt 2 Stunden." }
            ],
            metaTitle: "Unterhaltsreinigung Wien & Graz | PutzELF",
            metaDescription: "Unterhaltsreinigung in Wien und Graz: regelmäßige Haushaltsreinigung nach Ihrem Zeitplan. Flexible Termine, klare Checklisten und faire Preise."
          },
          deep: {
            title: "Grundreinigung",
            pageHeading: "Gründliche Pflege bei hartnäckigem Schmutz und Rückständen",
            description: "Tiefgehende Reinigung für schwer zugängliche Bereiche und hartnäckige Verschmutzungen.",
            features: ["Grundreinigung von Böden und Oberflächen", "Entkalkung und Sanitärpflege", "Intensive Küchenreinigung"],
            painTitle: "Wann eine Grundreinigung nötig ist",
            painPoints: ["Starke Verschmutzungen", "Renovationsrückstände", "Allergien und hartnäckige Flecken"],
            solutionTitle: "Unsere Vorgehensweise bei Grundreinigung",
            solutionPoints: ["Raum-für-Raum Intensivreinigung", "Entkalkung und Sanitärpflege", "Teppich- und Polsterbehandlung"],
            processTitle: "Ablauf",
            process: [
              { title: "Anfrage", desc: "Beschreiben Sie die betroffenen Bereiche; Fotos helfen bei der Einschätzung." },
              { title: "Einschätzung", desc: "Wir geben Zeit- und Leistungsaufwand an; ggf. Vor-Ort-Termin möglich." },
              { title: "Durchführung", desc: "Unser Team führt die gründliche Reinigung mit geeignetem Equipment aus." }
            ],
            faqTitle: "Fragen zur Grundreinigung",
            faqs: [
              { q: "Ist eine Grundreinigung nach Renovierung sinnvoll?", a: "Ja, wir entfernen Feinstaub und bereiten Oberflächen für weitere Arbeiten vor." },
              { q: "Wer bewegt Möbel?", a: "Leichtere Möbel können wir bei Bedarf verrücken; schwere Objekte nur nach Absprache." },
              { q: "Werden spezielle Reinigungsmittel eingesetzt?", a: "Wir verwenden professionelle Mittel, abgestimmt auf Oberfläche und Bedarf." },
              { q: "Kann ich eine einmalige Grundreinigung buchen?", a: "Ja, Grundreinigung ist als Einzeltermin möglich." }
            ],
            metaTitle: "Grundreinigung Wien & Graz | PutzELF",
            metaDescription: "Grundreinigung in Wien und Graz für hartnäckigen Schmutz, Renovationsrückstände und Allergien. Individuelle Angebote nach Besichtigung."
          },
          residential: {
            title: "Wohnreinigung",
            pageHeading: "Sorgfältige Reinigung für Wohnungen und Einfamilienhäuser",
            description: "Sorgfältige Reinigung von Wohnungen und Einfamilienhäusern.",
            features: ["Staubwischen und Saugen", "Oberflächenpflege", "Fensterreinigung (optional)"],
            painTitle: "Wann Wohnungsreinigung hilft",
            painPoints: ["Enge Zeitplanung im Alltag", "Vor/ Nach Einzug", "Besondere Sauberkeitsanforderungen"],
            solutionTitle: "So unterstützen wir Ihr Zuhause",
            solutionPoints: ["Individuelle Checklisten", "Reinigung nach Ihren Vorgaben", "Optionale Extras wie Fensterreinigung"],
            processTitle: "Vorgehen",
            process: [
              { title: "Anfrage starten", desc: "Senden Sie Ihre Wünsche über das Formular." },
              { title: "Termin & Umfang", desc: "Wir bestätigen Zeit, Umfang und besondere Wünsche." },
              { title: "Reinigung vor Ort", desc: "Das Team führt die vereinbarten Aufgaben zuverlässig aus." }
            ],
            faqTitle: "Fragen zur Wohnreinigung",
            faqs: [
              { q: "Sind Haustiere ein Problem?", a: "Unsere Teams sind erfahren im Umgang mit Haustieren; Besonderheiten bitte vorher mitteilen." },
              { q: "Kann ich eigene Reinigungsmittel angeben?", a: "Ja, geben Sie bitte an, wenn Sie eigene Produkte wünschen." },
              { q: "Wie kurzfristig sind Termine möglich?", a: "Kurzfristige Termine sind abhängig von Verfügbarkeit möglich." },
              { q: "Gibt es eine Mindestbuchung?", a: "Ja, die Mindestbuchung beträgt 2 Stunden." }
            ],
            metaTitle: "Wohnungsreinigung Wien & Graz | PutzELF",
            metaDescription: "Wohnungsreinigung in Wien und Graz: gründlich, zuverlässig und termintreu. Ideal für regelmäßige Reinigungen oder einmalige Einsätze."
          },
          construction: {
            title: "Bauendreinigung / Grobreinigung",
            pageHeading: "Ein sauberes Zuhause nach Bau- und Renovierungsarbeiten",
            description: "Reinigung nach Bau- oder Renovierungsarbeiten, Entfernen von Bauschutt und Feinstaub.",
            features: ["Bauschutt- und Feinstaubentfernung", "Feinreinigung nach Grobreinigung", "Sichere Entsorgung"],
            painTitle: "Warum Bauendreinigung wichtig ist",
            painPoints: ["Bauschutt und Feinstaub", "Sicherheitsaspekte", "Vorbereitung für Übergabe oder Anstrich"],
            solutionTitle: "Unsere Bauendreinigung",
            solutionPoints: ["Grobreinigung und Schuttentfernung", "Feinreinigung und Oberflächenvorbereitung", "Fachgerechte Entsorgung"],
            processTitle: "Ablauf",
            process: [
              { title: "Anfrage", desc: "Senden Sie Details und Fotos, damit wir den Aufwand einschätzen können." },
              { title: "Planung", desc: "Wir erstellen einen Reinigungsplan mit Etappen und Zeiten." },
              { title: "Durchführung", desc: "Team führt Grob- und Feinreinigung bis zur Übergabequalität durch." }
            ],
            faqTitle: "Fragen zur Bauendreinigung",
            faqs: [
              { q: "Entfernen Sie Bauschutt?", a: "Leichten Bauschutt entfernen wir; für größere Mengen koordinieren wir Partner." },
              { q: "Brauche ich besondere Zugänge?", a: "Bitte geben Sie Zugangsbedingungen und Arbeitszeiten bei der Anfrage an." },
              { q: "Wer schützt empfindliche Oberflächen?", a: "Wir nutzen Schutzmaßnahmen und stellen Oberflächenschutz nach Bedarf bereit." },
              { q: "Wie erfolgt die Abrechnung?", a: "Nach Aufwand; für größere Objekte erstellen wir gern ein Pauschalangebot." }
            ],
            metaTitle: "Bauendreinigung Wien & Graz | PutzELF",
            metaDescription: "Bauendreinigung in Wien und Graz: sichere und gründliche Reinigung nach Bau- oder Renovierungsarbeiten. Angebote nach Besichtigung oder Fotoanalyse."
          },
          window: {
            title: "Glas- & Rahmenreinigung",
            pageHeading: "Streifenfreie Fenster und gepflegte Rahmen für Ihr Zuhause",
            description: "Reinigung von Fenstern und Rahmen für ein streifenfreies Ergebnis.",
            features: ["Fenster innen & außen", "Rahmen- und Falzreinigung", "Optionaler Rahmenanstrich-Vorbereitung"],
            painTitle: "Warum professionelle Fensterreinigung sinnvoll ist",
            painPoints: ["Streifen und Kalkrückstände", "Schwierige Erreichbarkeit von Außenflächen", "Rahmen- und Falzverschmutzung"],
            solutionTitle: "Unsere Fensterreinigung",
            solutionPoints: ["Innen- und Außenreinigung", "Rahmen- und Falzpflege", "Optionale Politur und Vorbereitung für Anstrich"],
            processTitle: "Ablauf",
            process: [
              { title: "Anfrage", desc: "Beschreiben Sie Fensteranzahl und Etage; Fotos sind hilfreich." },
              { title: "Terminbestätigung", desc: "Wir schlagen einen Termin mit passendem Equipment vor." },
              { title: "Durchführung", desc: "Fenster werden streifenfrei gereinigt; Rahmen und Falze werden gepflegt." }
            ],
            faqTitle: "FAQ Fensterreinigung",
            faqs: [
              { q: "Reinigen Sie Außenfenster in höheren Lagen?", a: "Ja, wir setzen bei Bedarf Hebebühnen oder geeignete Sicherung ein." },
              { q: "Wie berechnet sich der Preis?", a: "Die Kalkulation erfolgt je Fenster; pauschale Angebote auf Anfrage." },
              { q: "Ist Rahmenreinigung inklusive?", a: "Ja, Reinigung von Rahmen und Fälzen ist Teil unserer Leistung." },
              { q: "Welche Reinigungsmittel verwenden Sie?", a: "Wir verwenden professionelle und umweltverträgliche Mittel; ökologische Optionen möglich." }
            ],
            metaTitle: "Glasreinigung Wien & Graz | PutzELF",
            metaDescription: "Glas- und Rahmenreinigung in Wien und Graz: streifenfreie Fenster, fachgerechte RahmeNpflege und Hebebühneneinsatz bei Bedarf."
          },
          industrial: {
            title: "Industriereinigung & Maschinen",
            pageHeading: "Fachgerechte Reinigung von Maschinen und technischen Flächen",
            description: "Spezialisierte Reinigung für Maschinen und industrielle Bereiche (keine Wartung).",
            features: ["Maschinenoberflächenreinigung", "Sichere Reinigungsverfahren", "Entfernung von Produktionsrückständen"],
            painTitle: "Herausforderungen in der Industriereinigung",
            painPoints: ["Ölrückstände und Produktionsrückstände", "Sicherheits- und Kontaminationsrisiken", "Ausfallzeiten"],
            solutionTitle: "Unser industrielles Vorgehen",
            solutionPoints: ["Geplante Reinigungsfenster zur Minimierung von Ausfallzeiten", "Sicherheitsorientierte Verfahren", "Fachgerechte Entsorgung"],
            processTitle: "Ablauf",
            process: [
              { title: "Anfrage & Einschätzung", desc: "Teilen Sie uns Maschinenarten und Zugangsbeschränkungen mit." },
              { title: "Planung & Sicherheit", desc: "Wir planen Einsätze und vereinbaren Sicherheitsprotokolle." },
              { title: "Durchführung", desc: "Fachteams führen die Reinigung durch und übergeben dokumentiert." }
            ],
            faqTitle: "Industriereinigung – Fragen",
            faqs: [
              { q: "Arbeiten Sie während Produktionspausen?", a: "Ja, wir koordinieren Reinigungsfenster, um Produktionsausfälle zu minimieren." },
              { q: "Können Sie mit Gefahrstoffen umgehen?", a: "Gefährliche Stoffe erfordern spezielle Verfahren; wir klären das vorab." },
              { q: "Gibt es Dokumentation?", a: "Auf Wunsch erstellen wir Übergabeprotokolle und Reinigungsdokumentationen." },
              { q: "Bieten Sie regelmäßige Pläne an?", a: "Ja, abgestimmt auf Produktionszyklen und Sicherheitsanforderungen." }
            ],
            metaTitle: "Industriereinigung Wien & Graz | PutzELF",
            metaDescription: "Industriereinigung in Wien und Graz: sichere Reinigung von Maschinen und Produktionsbereichen mit Fokus auf Betriebssicherheit und Dokumentation."
          }
        },
        business: {
          expectations: [
            { key: "analysis", title: "Individuelle Analyse" },
            { key: "fairPrice", title: "Faire Preise" },
            { key: "qualifiedStaff", title: "Einsatzteams" },
            { key: "fixedTeams", title: "Feste Teams" },
            { key: "excellentQuality", title: "Exzellente Qualität" },
            { key: "desiredTimes", title: "Wunschzeiten" }
          ],
          maintenance: {
            title: "Unterhaltsreinigung für Unternehmen",
            pageHeading: "Verlässliche Reinigungsabläufe für Büros und Gewerbeflächen",
            description: "Regelmäßige, strukturierte Reinigung für Büros, Praxen und gewerbliche Flächen. Wir sorgen für hygienische Arbeitsbereiche, planbare Einsätze und transparente Qualitätskontrollen.",
            features: [
              "Reinigung von Arbeitsplätzen und Gemeinschaftsflächen",
              "Sanitär- und Küchenpflege nach Vereinbarung",
              "Flexible Zeitfenster, abgestimmt auf Ihre Betriebszeiten"
            ],
            painTitle: "Herausforderungen im Betriebsalltag",
            painPoints: [
              "Sichtbare Verschmutzung in Kunden‑ und Mitarbeiterbereichen",
              "Anhaftender Schmutz an häufig berührten Kontaktflächen",
              "Schwankende Reinigungsqualität oder unzuverlässige Zeitpläne",
              "Unklare Zuständigkeiten und mangelhafte Kommunikation mit Dienstleistern"
            ],
            solutionTitle: "Wie PutzELF wiederkehrende Reinigung organisiert",
            solutionPoints: [
              "Klare Raum‑für‑Raum‑Checklisten und festgelegte Verantwortlichkeiten",
            "Regelmäßige Einsätze nach vereinbartem Rhythmus und transparenter Planung",
              "Qualitätskontrollen, dokumentierte Übergaben und eindeutige Kommunikation"
            ],
            processTitle: "So arbeiten wir",
            process: [
              { title: "Anfrage & Anforderungen", desc: "Sie nennen Standort, Betriebszeiten und welche Bereiche für Sie Priorität haben." },
              { title: "Individuelles Angebot", desc: "Wir erstellen einen Reinigungsplan mit Aufgaben, Rhythmus und passenden Zeitfenstern." },
              { title: "Regelmäßiger Einsatz", desc: "Unsere Teams führen die vereinbarten Aufgaben anhand der Checkliste und des Zeitplans durch." }
            ],
            faqTitle: "Häufige Fragen (Gewerbe)",
            faqs: [
              { q: "Können Reinigungen außerhalb der Geschäftszeiten stattfinden?", a: "Ja. Wir koordinieren Einsätze frühmorgens oder abends, um Ihren Betrieb nicht zu stören." },
              { q: "Bieten Sie wiederkehrende Verträge an?", a: "Ja. Wir bieten Servicevereinbarungen mit klar definiertem Leistungsumfang und transparenter Preisgestaltung." },
              { q: "Können vertrauliche Bereiche einbezogen werden?", a: "Ja. Unsere Teams arbeiten diskret und beachten Zugangs‑ sowie Sicherheitsregeln." },
              { q: "Wie wird Qualität geprüft?", a: "Durch Checklisten, stichprobenartige Kontrollen und auf Wunsch dokumentierte Übergaben nach Einsätzen." }
            ],
            metaTitle: "Unterhaltsreinigung Wien & Graz | PutzELF",
            metaDescription: "Regelmäßige Reinigung für Büros, Praxen und Gewerbeflächen mit festen Abläufen, Qualitätskontrollen und flexiblen Zeiten."
          },
          deep: {
            title: "Grundreinigung (Gewerbe)",
            pageHeading: "Intensive Pflege stark genutzter Geschäftsräume",
            description: "Umfassende Grundreinigung für Geschäftsräume und gewerbliche Flächen.",
            features: ["Intensive Bodenreinigung", "Teppich- und Polsterpflege", "Desinfektion von Kontaktflächen"],
            painTitle: "Wann eine Grundreinigung im Gewerbe nötig ist",
            painPoints: ["Anhäufung von Schmutz durch hohen Publikumsverkehr", "Vor Übergaben oder Hygiene-Audits", "Hartnäckige Flecken und Rückstände"],
            solutionTitle: "Unsere Grundreinigung für Unternehmen",
            solutionPoints: ["Intensive Reinigung mit Branchenmitteln", "Teppich- und Polsterbehandlung", "Protokollierte Flächenfreigabe"],
            processTitle: "Ablauf",
            process: [
              { title: "Bedarfsklärung", desc: "Fotos oder Objektbegehung helfen, Zeitbedarf und Mittel zu planen." },
              { title: "Angebot & Termin", desc: "Wir planen Einsätze, die Ihren Betriebsablauf berücksichtigen." },
              { title: "Durchführung", desc: "Spezialteams führen die Grundreinigung effizient und sicher durch." }
            ],
            faqTitle: "Fragen zur Grundreinigung (Gewerbe)",
            faqs: [
              { q: "Können Sie nach Geschäftsschluss reinigen?", a: "Ja, wir stimmen Termine so ab, dass Ihr Betrieb nicht gestört wird." },
              { q: "Wer haftet für empfindliche Geräte?", a: "Wir besprechen Schutzmaßnahmen und dokumentieren die Reinigung." },
              { q: "Sind Desinfektionsmaßnahmen möglich?", a: "Ja, wir bieten gezielte Desinfektionen von Kontaktflächen an." },
              { q: "Wie wird abgerechnet?", a: "Je nach Umfang nach Aufwand oder als Pauschale bei größeren Objekten." }
            ],
            metaTitle: "Grundreinigung für Unternehmen | PutzELF",
            metaDescription: "Intensive Grundreinigung nach Umbau, Renovierung oder bei besonderem Bedarf in Wien und Graz. Unverbindlich anfragen."
          },
          staircase: {
            title: "Treppenhausreinigung",
            pageHeading: "Saubere Stiegenhäuser und Gemeinschaftsflächen im festen Rhythmus",
            description: "Regelmäßige Pflege und Reinigung von Treppenhäusern und Gemeinschaftsbereichen.",
            features: ["Treppenstufenreinigung", "Geländerpflege", "Müllraum- und Kellerreinigung"],
            painTitle: "Warum Treppenhausreinigung wichtig ist",
            painPoints: ["Schmutzablagerungen in Gemeinschaftsflächen", "Sicherheitsrisiken durch Verschmutzungen", "Unangenehmer Eindruck für Besucher"],
            solutionTitle: "Unser Treppenhaus-Service",
            solutionPoints: ["Regelmäßige Reinigungsintervalle", "Spezielle Pflege für Geländer und Stufen", "Entsorgung und Geruchskontrolle"],
            processTitle: "Ablauf",
            process: [
              { title: "Angebot anfragen", desc: "Nennen Sie Anzahl Stufen, Stockwerke und Besonderheiten." },
              { title: "Planung", desc: "Wir legen Intervalle und Teamgröße fest." },
              { title: "Regelmäßige Reinigung", desc: "Durchführung nach vereinbartem Rhythmus mit Qualitätskontrollen." }
            ],
            faqTitle: "Treppenhaus-FAQ",
            faqs: [
              { q: "Kann die Reinigung mehrmals pro Woche erfolgen?", a: "Ja, wir passen Intervalle an Bedarf und Budget an." },
              { q: "Wer organisiert die Schlüsselübergabe?", a: "Wir stimmen Zugangsregelungen mit der Hausverwaltung ab." },
              { q: "Gibt es Zusatzleistungen?", a: "Fenster im Treppenhaus oder Glasflächen können optional gereinigt werden." },
              { q: "Wie wird die Rechnung gestellt?", a: "Monatlich oder nach Vereinbarung, mit transparenten Leistungen." }
            ],
            metaTitle: "Treppenhausreinigung Wien & Graz | PutzELF",
            metaDescription: "Saubere Stiegenhäuser und Gemeinschaftsflächen in abgestimmten Intervallen. Angebot für Wien und Graz anfordern."
          },
          construction: {
            title: "Bauendreinigung / Grobreinigung (Gewerbe)",
            pageHeading: "Geplante Bauendreinigung bis zur Übergabe gewerblicher Objekte",
            description: "Reinigung nach Bauarbeiten in gewerblichen Objekten.",
            features: ["Grobreinigung", "Feinreinigung nach Bau", "Entfernung von Baumaterialien"],
            painTitle: "Wann Bauendreinigung nötig ist",
            painPoints: ["Baustaub und Rückstände", "Übergabefristen", "Sicherheitsaspekte für Mitarbeiter und Kunden"],
            solutionTitle: "Unsere Bauendreinigung für Gewerbe",
            solutionPoints: ["Grob- und Feinreinigung gestaffelt", "Vorbereitung für Abnahmen", "Koordination mit Handwerkern"],
            processTitle: "Ablauf",
            process: [
              { title: "Anfrage & Fotos", desc: "Fotos oder Skizzen helfen, Aufwand und Equipment zu planen." },
              { title: "Planung", desc: "Einsatzphasen und Zeitfenster werden mit Ihnen abgestimmt." },
              { title: "Durchführung", desc: "Grob- und Feinreinigung bis zur Abnahmequalität." }
            ],
            faqTitle: "Bauendreinigung – Fragen",
            faqs: [
              { q: "Führen Sie auch Entsorgung durch?", a: "Für Bauschutt organisieren wir Entsorgungspartner; leichte Materialreste entfernen wir." },
              { q: "Brauche ich einen Baustellenzugang?", a: "Bitte informieren Sie uns über Zugangsbedingungen und Sicherheitsregeln." },
              { q: "Können Sie Zwischenreinigungen durchführen?", a: "Ja, wir stimmen Reinigungsphasen mit dem Bauablauf ab." },
              { q: "Wie lange dauert die Feinreinigung?", a: "Abhängig vom Zustand; wir geben nach Sichtung eine realistische Zeitabschätzung." }
            ],
            metaTitle: "Bauendreinigung Wien & Graz | PutzELF",
            metaDescription: "Bauendreinigung für gewerbliche Objekte in Wien und Graz: staged Grob- und Feinreinigung bis zur Übergabequalität."
          },
          window: {
            title: "Glas- & Rahmenreinigung (Gewerbe)",
            pageHeading: "Klare Glasflächen und gepflegte Rahmen für Unternehmen",
            description: "Professionelle Glas- und Rahmenreinigung für Geschäftsfassaden und Innenbereiche.",
            features: ["Fassadenfenster", "Innen- und Außenreinigung", "Sicherheits- und Hebebühnenarbeiten (falls erforderlich)"],
            painTitle: "Warum Glasreinigung im Gewerbe wichtig ist",
            painPoints: ["Sichtbarkeit und Außenwirkung", "Sicherheitsanforderungen bei großen Flächen", "Kalk- und Umwelteinflüsse"],
            solutionTitle: "Unser Glasreinigungsangebot",
            solutionPoints: ["Fassaden- und Innenreinigung", "Einsatz von Hebebühnen und Sicherheitsausrüstung", "Rahmen- und Falzpflege"],
            processTitle: "Ablauf",
            process: [
              { title: "Anfrage", desc: "Beschreiben Sie Fläche, Etage und besondere Anforderungen." },
              { title: "Einsatzplanung", desc: "Wir schlagen sichere und effiziente Maßnahmen vor." },
              { title: "Reinigung", desc: "Fachgerechte Reinigung inklusive RahmeNpflege und, falls nötig, Hebebühnenarbeiten." }
            ],
            faqTitle: "FAQ Glasreinigung Gewerbe",
            faqs: [
              { q: "Können Sie Fassadenfenster großflächig reinigen?", a: "Ja, wir planen Hebebühnen- oder Gerüstarbeiten je nach Anforderung." },
              { q: "Wie erfolgt die Preisgestaltung?", a: "Nach Fläche, Zugang und benötigtem Gerät; Pauschalen möglich." },
              { q: "Gibt es Sicherheitszertifikate?", a: "Unsere Teams arbeiten gemäß aktueller Sicherheitsstandards." },
              { q: "Kann die Reinigung außerhalb der Geschäftszeiten stattfinden?", a: "Ja, wir koordinieren Einsätze, um Ihren Betrieb nicht zu stören." }
            ],
            metaTitle: "Glas- & Rahmenreinigung | PutzELF",
            metaDescription: "Streifenfreie Glasflächen, Rahmen und Schaufronten für Unternehmen in Wien und Graz. Termine passend zu Ihren Betriebszeiten."
          },
          industrial: {
            title: "Industriereinigung & Maschinen (Gewerbe)",
            pageHeading: "Sichere, dokumentierte Reinigung von Maschinen und Produktionsflächen",
            description: "Reinigung in industriellen Umgebungen, abgestimmt auf Sicherheitsanforderungen.",
            features: ["Maschinenreinigung", "Produktionslinienreinigung", "Sichere Entsorgung von Rückständen"],
            painTitle: "Spezifische Herausforderungen in der Industriereinigung",
            painPoints: ["Kontamination und Rückstände", "Sicherheitsanforderungen", "Produktionsunterbrechungen"],
            solutionTitle: "Unser Industriereinigungsansatz",
            solutionPoints: ["Geplante Reinigungsfenster", "Sicherheitsorientierte Verfahren", "Dokumentierte Übergaben"],
            processTitle: "Vorgehen",
            process: [
              { title: "Anfrage & Prüfung", desc: "Nennen Sie Maschinen und Sicherheitsvorgaben." },
              { title: "Planung", desc: "Wir legen Zeitfenster und Abläufe fest, um Ausfallzeiten zu minimieren." },
              { title: "Durchführung", desc: "Fachteams reinigen mit dokumentierten Prozessen und Übergabeprotokoll." }
            ],
            faqTitle: "Industriereinigung – FAQ",
            faqs: [
              { q: "Können Sie Reinigungen während Produktionspausen durchführen?", a: "Ja, wir koordinieren Termine, um Produktionsausfälle gering zu halten." },
              { q: "Arbeiten Sie mit Gefahrstoffen?", a: "Einsatz mit Gefahrstoffen klären wir vorab; spezielle Verfahren sind möglich." },
              { q: "Gibt es eine Dokumentation der Reinigung?", a: "Ja, wir liefern auf Wunsch Reinigungsprotokolle." },
              { q: "Bieten Sie regelmäßige Reinigungspläne an?", a: "Ja, individuell abgestimmt auf Produktionszyklen." }
            ],
            metaTitle: "Industriereinigung Wien & Graz | PutzELF",
            metaDescription: "Industriereinigung in Wien und Graz: sichere Reinigung von Maschinen und Produktionsflächen mit Fokus auf Sicherheit und Dokumentation."
          }
        }
      },
      whatWeOffer: "Was wir anbieten",
      benefitsTitle: "Vorteile",
      benefit1: "Reinigung nach Ihrem Bedarf",
      benefit2: "Flexible Terminplanung",
      benefit3: "Transparente Preise",
      cta: "Anfrage starten",
      alt: {
        logo: "PutzELF Logo",
        homeCleaning: "Haushaltsreinigung",
        officeCleaning: "Büroreinigung"
      },
      footer: {
        allServices: "Alle Leistungen",
        copyright: "Alle Rechte vorbehalten.",
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
          title: "Kontakt & Rechtliches",
          instagramAria: "PutzELF auf Instagram",
          facebookAria: "PutzELF auf Facebook",
          links: {
            terms: "AGB",
            withdrawal: "Rücktrittsbelehrung",
            privacy: "Datenschutz",
            imprint: "Impressum",
            calculator: "Preiskalkulator"
          }
        }
      },
      reviews: {
        kicker: "Google",
        sectionTitle: "Google-Bewertungen",
        subtitle: "Bewertungen zufriedener Kundinnen und Kunden.",
        previous: "Vorherige Bewertungen",
        next: "Nächste Bewertungen",
        googleBadge: "Google-Bewertung",
        ratingLabel: "{{rating}} von 5 Sternen",
        reviewBy: "Bewertung von {{name}}",
        paginationLabel: "Bewertungs-Carousel",
        slide: "Bewertungsfolie",
        empty: "Noch keine Bewertungen verfügbar.",
        loading: "Bewertungen werden geladen …",
        recently: "Kürzlich",
        weekAgo: "Vor einer Woche",
        monthAgo: "Vor einem Monat",
        twoMonthsAgo: "Vor zwei Monaten",
        reviewerFallback: "Google-Rezensent:in"
      },
      blogUi: {
        seoTitle: "Blog: Reinigung im Betrieb | PutzELF",
        seoDescription: "Praktische Hinweise zu Büroreinigung, Hygiene, Reinigungsplanung und Werterhalt vom PutzELF-Team.",
        title: "Neuigkeiten & Tipps",
        empty: "Noch keine Blogbeiträge veröffentlicht.",
        readMore: "Weiterlesen",
        previous: "Zurück",
        next: "Weiter",
        notFound: "Beitrag nicht gefunden",
        back: "Zurück zum Blog",
        home: "Startseite",
        relatedServices: "Passende Services"
      },
      jobOpening: {
        seoTitle: "Jobs bei PutzELF – Reinigung & Kundenservice",
        seoDescription: "Aktuelle Stellen bei PutzELF in Wien und Graz. Aufgaben, Anforderungen und Kontakt zur Bewerbung.",
        title: "Aktuelle Jobangebote",
        description: "Offene Stellen bei PutzELF: Mitarbeiter:in Kundenservice und Reinigungskräfte in Graz.",
        roles: [
          {
            title: "Mitarbeiter:in Kundenservice",
            body: "Bearbeitung von Kundenanfragen, Terminvereinbarungen und Unterstützung unseres Buchungsprozesses. Gute Deutschkenntnisse und ein freundliches Auftreten sind erforderlich.",
            subject: "Bewerbung - Kundenservice",
            cta: "Bewerben / Kontakt"
          },
          {
            title: "Reinigungskräfte - Graz",
            body: "Wir suchen Reinigungskräfte in Graz. Erfahrung ist von Vorteil, aber nicht erforderlich. Flexible Arbeitszeiten und faire Bezahlung.",
            subject: "Bewerbung - Reinigung Graz",
            cta: "Bewerben / Kontakt"
          }
        ]
      },
      contact: {
        seo: {
          title: "Kontakt – PutzELF Wien & Graz",
          description: "Kontaktieren Sie PutzELF per Telefon, E-Mail oder Formular. Wir melden uns rasch mit den nächsten Schritten."
        },
        kicker: "Kontakt",
        title: "Kontakt",
        intro: "Ob Sie eine Frage zu unseren Dienstleistungen haben, ein individuelles Angebot wünschen oder weitere Informationen benötigen – wir freuen uns auf Ihre Nachricht.",
        support: "Kundenservice",
        phoneLabel: "Telefon",
        emailLabel: "E-Mail",
        locationsLabel: "Standorte",
        helpLabel: "Wie wir helfen",
        helpText: "Wir unterstützen Privatkunden und Unternehmen mit schneller, freundlicher Beratung und klaren nächsten Schritten.",
        formLabel: "Kontaktformular",
        privacyNotice: "Wir verwenden Ihre Angaben zur Bearbeitung Ihrer Anfrage. Einzelheiten finden Sie in unserer",
        privacyPolicyLink: "Datenschutzerklärung",
        fields: {
          name: "Name",
          email: "E-Mail",
          phone: "Telefon",
          location: "Standort",
          subject: "Betreff",
          message: "Nachricht"
        },
        bookingContact: {
          title: "Anrede",
          firstName: "Vorname",
          lastName: "Nachname",
          streetName: "Straßenname",
          houseNumber: "Hausnummer",
          doorNumber: "Türnummer",
          buildingNumber: "Gebäudenummer",
          postalCode: "Postleitzahl",
          city: "Ort",
          phone: "Telefonnummer",
          email: "E-Mail-Adresse"
        },
        locations: {
          vienna: "Wien",
          graz: "Graz"
        },
        errors: {
          name: "Bitte geben Sie Ihren Namen ein.",
          emailRequired: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
          emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
          phone: "Bitte geben Sie Ihre Telefonnummer ein.",
          location: "Bitte wählen Sie einen Standort aus.",
          subject: "Bitte geben Sie einen Betreff ein.",
          message: "Bitte geben Sie Ihre Nachricht ein.",
          submitFailed: "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
          requiredFirstName: "Bitte geben Sie Ihren Vornamen ein.",
          requiredLastName: "Bitte geben Sie Ihren Nachnamen ein.",
          requiredStreet: "Bitte geben Sie den Straßennamen ein.",
          requiredHouseNumber: "Bitte geben Sie die Hausnummer ein.",
          requiredPostal: "Bitte geben Sie die Postleitzahl ein.",
          requiredCity: "Bitte geben Sie den Ort ein.",
          requiredAddress: "Bitte geben Sie Ihre Adresse ein.",
          requiredName: "Bitte geben Sie Ihren Namen ein."
        },
        submit: {
          label: "Nachricht senden",
          loading: "Wird gesendet…",
          success: "Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen."
        }
      },
      partnerInquiryPage: {
        seoTitle: "Partner von PutzELF werden",
        description: "Informationen für Reinigungsunternehmen, selbständige Reinigungskräfte und Kooperationspartner in Wien und Graz.",
        title: "Partner werden",
        intro: "Wir freuen uns auf Partnerschaften mit Unternehmen und Subunternehmen. Bitte füllen Sie das Formular aus.",
        partnership: "Partnerschaft",
        coverage: "Wien · Graz",
        fields: {
          location: "Standort",
          company: "Firmenname",
          name: "Ansprechpartner",
          address: "Adresse",
          email: "E-Mail",
          phone: "Telefon",
          message: "Nachricht"
        },
        privacyNotice: "Wir verwenden Ihre Angaben zur Bearbeitung Ihrer Partnerschaftsanfrage. Einzelheiten finden Sie in unserer",
        privacyPolicyLink: "Datenschutzerklärung",
        submit: "Partnerschaftsanfrage senden",
        loading: "Wird gesendet…",
        success: "Anfrage gesendet — wir melden uns bei Ihnen.",
        error: "Senden fehlgeschlagen — bitte später erneut versuchen.",
        errors: {
          phoneDigitsOnly: "Telefonnummer darf nur Ziffern enthalten."
        }
      },
      
      privacyPolicy: {
        title: "Datenschutzerklärung",
        seoTitle: "Datenschutzerklärung | PutzELF",
        seoDescription: "Informationen zur Verarbeitung personenbezogener Daten, zu Cookies und zu Ihren Datenschutzrechten bei PutzELF.",
        intro: "Informationen gemäß Art. 13 und 14 Datenschutz-Grundverordnung (DSGVO)",
        exactGerman: {
          identity: "Sebastijan-Aleksandar Kerčulj, Einzelunternehmer (PutzELF)",
          address: "Simmeringer Hauptstraße 24, 1110 Wien, Österreich",
          phone: "Telefon: +43 676 630 01 67",
          email: "E-Mail: office@putzelf.com",
          processing: "Wir verarbeiten personenbezogene Daten nur, soweit dies für die nachfolgend beschriebenen Zwecke erforderlich ist. Rechtsgrundlagen sind insbesondere die Durchführung vorvertraglicher Maßnahmen und von Verträgen, gesetzliche Verpflichtungen, berechtigte Interessen sowie - bei optionalen Diensten - Ihre Einwilligung. Daten werden gelöscht oder anonymisiert, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungs- oder Nachweispflichten mehr bestehen.",
          hosting: "Die Website wird bei der Hetzner Online GmbH, Industriestraße 25, 91710 Gunzenhausen, Deutschland, gehostet. Beim Aufruf der Website verarbeitet der Server insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Seite oder Datei, übertragene Datenmenge, Browsertyp, Betriebssystem und Referrer-URL. Die Verarbeitung dient dem sicheren, stabilen und fehlerfreien Betrieb der Website und beruht auf Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren Betrieb unseres Online-Angebots. Server-Logfiles werden grundsätzlich spätestens nach 14 Tagen gelöscht, sofern kein sicherheitsrelevanter Vorfall eine längere Aufbewahrung erforderlich macht. Mit dem Hostinganbieter besteht eine Vereinbarung zur Auftragsverarbeitung gemäß Art. 28 DSGVO.",
          appointmentData: "Wenn Sie über die Website eine unverbindliche Terminanfrage stellen, verarbeiten wir die von Ihnen eingegebenen Kontaktdaten, die Adresse des zu reinigenden Objekts, Angaben zur gewünschten Leistung, zum gewünschten Termin und zur geschätzten Dauer sowie freiwillige Anmerkungen. Zusätzlich können IP-Adresse und Eingangszeitpunkt zur technischen Fehler- und Missbrauchserkennung protokolliert werden.",
          appointmentPurpose: "Die Verarbeitung dient der Bearbeitung Ihrer Anfrage, der Prüfung der Verfügbarkeit, der Angebotserstellung und - nach Vertragsabschluss - der Durchführung und Abrechnung des Auftrags. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO; für die technische Sicherheit Art. 6 Abs. 1 lit. f DSGVO.",
          appointmentRetention: "Anfragen, die nicht zu einem Vertrag führen, werden grundsätzlich nach sechs Monaten gelöscht, sofern keine längere Speicherung zur Bearbeitung einer offenen Angelegenheit oder zur Abwehr oder Durchsetzung von Ansprüchen erforderlich ist. Vertrags- und Rechnungsunterlagen werden nach Maßgabe der gesetzlichen Aufbewahrungspflichten, insbesondere grundsätzlich sieben Jahre, aufbewahrt.",
          contact: "Bei einer Kontaktaufnahme per Telefon, E-Mail oder Kontaktformular verarbeiten wir die übermittelten Kontaktdaten und den Inhalt der Nachricht zur Bearbeitung Ihres Anliegens und für erforderliche Rückfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn die Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Bearbeitung geschäftlicher und sonstiger Anfragen. Die Daten werden gelöscht, wenn die Angelegenheit erledigt ist und keine gesetzlichen Aufbewahrungs- oder Nachweisinteressen entgegenstehen.",
          serviceDelivery: "Zur Planung und Durchführung eines Auftrags erhalten die eingesetzten Mitarbeiter oder vertraglich gebundenen Subunternehmer nur die hierfür erforderlichen Angaben, insbesondere Name, Objektadresse, Termin, Zutrittsinformationen und leistungsbezogene Hinweise. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Einsatzkräfte werden zur Vertraulichkeit verpflichtet. Soweit ein Dienstleister personenbezogene Daten ausschließlich in unserem Auftrag verarbeitet, wird eine Vereinbarung gemäß Art. 28 DSGVO geschlossen.",
          applications: "Bei einer Bewerbung verarbeiten wir die von Ihnen übermittelten Kontakt-, Lebenslauf-, Qualifikations- und Bewerbungsdaten zur Durchführung des Bewerbungsverfahrens auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO und den einschlägigen arbeitsrechtlichen Bestimmungen. Nach Abschluss des Verfahrens speichern wir die Unterlagen für bis zu sieben Monate auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Dokumentation des Auswahlverfahrens und der Abwehr oder Durchsetzung möglicher Ansprüche. Eine längere Evidenzhaltung erfolgt nur mit Ihrer gesonderten Einwilligung.",
          partners: "Bei einer Anfrage über „Partner werden“ oder auf anderem Weg verarbeiten wir insbesondere Unternehmensname, Ansprechpartner, Kontaktdaten, Standort und Nachricht zur Prüfung und Anbahnung einer Zusammenarbeit. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche Maßnahmen geht, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Nicht weiterverfolgte Anfragen werden grundsätzlich nach sechs Monaten gelöscht, sofern keine gesetzlichen Aufbewahrungs- oder Nachweisinteressen entgegenstehen.",
          necessaryCookies: "Für den technischen Betrieb der Website können unbedingt erforderliche Cookies oder vergleichbare Speichertechnologien eingesetzt werden. Hierzu gehört insbesondere die Speicherung Ihrer Sprache, Standortauswahl und Einwilligungsentscheidung. Rechtsgrundlage ist § 165 Abs. 3 TKG 2021; soweit personenbezogene Daten verarbeitet werden, Art. 6 Abs. 1 lit. f DSGVO.",
          optionalServices: "Optionale Analyse-, Marketing- und Kartendienste werden erst aktiviert, nachdem Sie über das Einwilligungs-Banner zugestimmt haben. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über „Cookie-Einstellungen“ im Footer ändern oder widerrufen. Die dortige Übersicht enthält die jeweils konkret eingesetzten Technologien, Anbieter, Zwecke und Speicherdauern.",
          googleAds: "Nach Ihrer Einwilligung verwenden wir Google Tag Manager und Google Ads, bereitgestellt durch Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Tag Manager dient der Verwaltung von Website-Tags. Google Ads dient der Erfolgsmessung unserer Werbung und - soweit ausgewählt - der Bildung von Zielgruppen für personalisierte Werbung oder Remarketing. Dabei können insbesondere IP-Adresse, Geräte- und Browserinformationen, aufgerufene Seiten, Referrer, Zeitstempel, Interaktionen sowie Cookie- oder sonstige Online-Kennungen an Google übermittelt werden.",
          googleAdsLegalBasis: "Rechtsgrundlagen sind Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Vor Ihrer Einwilligung werden diese Marketingdienste nicht aktiviert. Eine Verarbeitung durch Google LLC in den USA kann nicht ausgeschlossen werden. Google kann hierfür anwendbare Angemessenheitsbeschlüsse, insbesondere das EU-US Data Privacy Framework, oder Standardvertragsklauseln einsetzen.",
          googleAdsMoreInfo: "Weitere Informationen: <googlePrivacy>Datenschutzerklärung von Google</googlePrivacy> und <googlePartnerSites>Datennutzung bei eingebundenen Google-Diensten</googlePartnerSites>.",
          googleAnalytics: "Nach Ihrer Einwilligung setzen wir Google Analytics 4 ein, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics wertet die Nutzung unserer Website aus, insbesondere aufgerufene Seiten, Verweildauer, ungefähre Region, verwendetes Gerät und Browser sowie Interaktionen, und hilft uns so, unser Angebot zu verbessern. Dabei können Cookies gesetzt werden (insbesondere „_ga“ und „_ga_*“, Speicherdauer bis zu zwei Jahre); maßgeblich sind die aktuellen Angaben in den Cookie-Einstellungen. IP-Adressen werden von Google Analytics 4 nach Angaben von Google nicht protokolliert oder gespeichert. Wir identifizieren einzelne Besucher dabei nicht.",
          googleAnalyticsLegalBasis: "Rechtsgrundlagen sind Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Ohne Ihre Einwilligung wird Google Analytics nicht aktiviert. Eine Verarbeitung durch Google LLC in den USA kann nicht ausgeschlossen werden. Google kann hierfür anwendbare Angemessenheitsbeschlüsse, insbesondere das EU-US Data Privacy Framework, oder Standardvertragsklauseln einsetzen. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen widerrufen.",
          googleAnalyticsMoreInfo: "Weitere Informationen: <googlePrivacy>Datenschutzerklärung von Google</googlePrivacy> und <googlePartnerSites>Datennutzung bei eingebundenen Google-Diensten</googlePartnerSites>.",
          leadinfo: "Nach Ihrer Einwilligung nutzen wir den Lead-Generation-Dienst der Leadinfo B.V., Rivium Quadrant 141, 2909 LC Capelle aan den IJssel, Niederlande. Leadinfo gleicht die IP-Adresse eines Websitebesuchs mit Unternehmensdaten aus öffentlich zugänglichen Quellen ab, um Besuche Unternehmen zuzuordnen, und stellt uns hierzu Unternehmensinformationen und Angaben über besuchte Seiten zur Verfügung. Leadinfo verarbeitet außerdem Domains aus Formulareingaben, um die Zuordnung von IP-Adressen zu Unternehmen und den Dienst zu verbessern.",
          leadinfoCookies: "Soweit die Analysefunktion aktiviert ist, können zwei First-Party-Cookies eingesetzt werden: „_li_id.*“ zur Unterscheidung neuer und wiederkehrender Besuche für bis zu zwei Jahre und „_li_ses.*“ zur Zusammenfassung der während einer Sitzung besuchten Seiten für die Dauer der Sitzung. Maßgeblich sind die aktuellen Angaben in den Cookie-Einstellungen.",
          leadinfoLegalBasis: "Rechtsgrundlagen sind Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Ohne Einwilligung wird Leadinfo auf unserer Website nicht aktiviert. Sie können die Einwilligung über die Cookie-Einstellungen widerrufen und zusätzlich die Opt-out-Möglichkeit von Leadinfo verwenden.",
          leadinfoMoreInfo: "Weitere Informationen: <leadinfoPrivacy>Datenschutz bei Leadinfo</leadinfoPrivacy>; <leadinfoOptOut>Leadinfo Opt-out</leadinfoOptOut>.",
          maps: "Zur Darstellung unseres Einsatzgebiets können wir Google Maps von Google Ireland Limited einbinden. Die interaktive Karte wird erst geladen, wenn Sie in die Kategorie „Externe Medien“ einwilligen oder die Karte über die vorgesehene Zwei-Klick-Lösung aktivieren. Erst dann werden insbesondere Ihre IP-Adresse, Geräte- und Browserinformationen sowie Informationen über die aufgerufene Seite an Google übermittelt. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Eine Verarbeitung durch Google LLC in den USA kann nicht ausgeschlossen werden. Ohne Einwilligung wird lediglich ein lokaler Platzhalter oder ein einfacher <maps>Link zu Google Maps</maps> angezeigt.",
          socialLinks: "Unsere Website kann einfache Links zu Auftritten bei Instagram, Facebook und LinkedIn enthalten. Solange Sie einen solchen Link nicht anklicken, werden über den Link selbst keine Daten an den jeweiligen Anbieter übertragen. Nach dem Anklicken verlassen Sie unsere Website; für die weitere Verarbeitung gelten die Datenschutzhinweise des jeweiligen Anbieters.",
          recipients: "Empfänger personenbezogener Daten können - soweit für den jeweiligen Zweck erforderlich - Hosting- und IT-Dienstleister, Kommunikationsdienstleister, eingesetzte Mitarbeiter und Subunternehmer, Steuerberatung, Behörden sowie die in dieser Erklärung genannten Anbieter sein. Daten werden nur im erforderlichen Umfang übermittelt. Bei Übermittlungen in Staaten außerhalb des Europäischen Wirtschaftsraums nutzen wir die nach der DSGVO vorgesehenen Garantien, insbesondere Angemessenheitsbeschlüsse oder Standardvertragsklauseln, soweit keine gesetzliche Ausnahme greift.",
          rights: "Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Gegen eine Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, Widerspruch einlegen. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zur Ausübung Ihrer Rechte genügt eine Nachricht an office@putzelf.com.",
          complaint: "Sie haben außerdem das Recht auf Beschwerde bei der <supervisoryAuthority>Österreichischen Datenschutzbehörde</supervisoryAuthority>, Barichgasse 40-42, 1030 Wien, Telefon +43 1 52 152-0, E-Mail dsb@dsb.gv.at.",
          security: "Wir treffen angemessene technische und organisatorische Maßnahmen, um personenbezogene Daten vor Verlust, unbefugtem Zugriff, Veränderung und Offenlegung zu schützen. Die Website wird verschlüsselt über TLS/SSL übertragen.",
          updates: "Wir aktualisieren diese Datenschutzerklärung, wenn sich eingesetzte Dienste, Verarbeitungsabläufe oder die Rechtslage ändern. Stand: 10.09.2026."
        },
        sections: {
          controller: {
            title: "Verantwortlicher",
            details: "Sebastijan-Aleksandar Kerčulj, Einzelunternehmer (PutzELF). Anschrift: Simmeringer Hauptstraße 24, 1110 Wien, Österreich. Telefon: +43 676 630 01 67. E-Mail: office@putzelf.com.",
            processing: "Wir verarbeiten personenbezogene Daten nur, soweit dies für die nachfolgend beschriebenen Zwecke erforderlich ist. Rechtsgrundlagen sind insbesondere die Durchführung vorvertraglicher Maßnahmen und von Verträgen, gesetzliche Verpflichtungen, berechtigte Interessen sowie - bei optionalen Diensten - Ihre Einwilligung. Daten werden gelöscht oder anonymisiert, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungs- oder Nachweispflichten mehr bestehen.",
          },
          generalPrinciples: {
            title: "Allgemeine Grundsätze",
            body: ""
          },
          hosting: {
            title: "Hosting und Server-Logfiles",
            body: "Die Website wird bei der Hetzner Online GmbH, Industriestraße 25, 91710 Gunzenhausen, Deutschland, gehostet. Beim Aufruf der Website verarbeitet der Server insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Seite oder Datei, übertragene Datenmenge, Browsertyp, Betriebssystem und Referrer-URL. Die Verarbeitung dient dem sicheren, stabilen und fehlerfreien Betrieb der Website und beruht auf Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren Betrieb unseres Online-Angebots. Server-Logfiles werden grundsätzlich spätestens nach 14 Tagen gelöscht, sofern kein sicherheitsrelevanter Vorfall eine längere Aufbewahrung erforderlich macht. Mit dem Hostinganbieter besteht eine Vereinbarung zur Auftragsverarbeitung gemäß Art. 28 DSGVO."
          },
          appointments: {
            title: "Terminanfragen und Angebotserstellung",
            data: "Wenn Sie über die Website eine unverbindliche Terminanfrage stellen, verarbeiten wir die von Ihnen eingegebenen Kontaktdaten, die Adresse des zu reinigenden Objekts, Angaben zur gewünschten Leistung, zum gewünschten Termin und zur geschätzten Dauer sowie freiwillige Anmerkungen. Zusätzlich können IP-Adresse und Eingangszeitpunkt zur technischen Fehler- und Missbrauchserkennung protokolliert werden.",
            purpose: "Die Verarbeitung dient der Bearbeitung Ihrer Anfrage, der Prüfung der Verfügbarkeit, der Angebotserstellung und - nach Vertragsabschluss - der Durchführung und Abrechnung des Auftrags. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO; für die technische Sicherheit Art. 6 Abs. 1 lit. f DSGVO.",
            retention: "Anfragen, die nicht zu einem Vertrag führen, werden grundsätzlich nach sechs Monaten gelöscht, sofern keine längere Speicherung zur Bearbeitung einer offenen Angelegenheit oder zur Abwehr oder Durchsetzung von Ansprüchen erforderlich ist. Vertrags- und Rechnungsunterlagen werden nach Maßgabe der gesetzlichen Aufbewahrungspflichten, insbesondere grundsätzlich sieben Jahre, aufbewahrt."
          },
          contact: {
            title: "Kontaktaufnahme",
            body: "Bei einer Kontaktaufnahme per Telefon, E-Mail oder Kontaktformular verarbeiten wir die übermittelten Kontaktdaten und den Inhalt der Nachricht zur Bearbeitung Ihres Anliegens und für erforderliche Rückfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn die Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Bearbeitung geschäftlicher und sonstiger Anfragen. Die Daten werden gelöscht, wenn die Angelegenheit erledigt ist und keine gesetzlichen Aufbewahrungs- oder Nachweisinteressen entgegenstehen."
          },
          serviceDelivery: {
            title: "Einsatzteams und Subunternehmer",
            body: "Zur Planung und Durchführung eines Auftrags erhalten die eingesetzten Mitarbeiter oder vertraglich gebundenen Subunternehmer nur die hierfür erforderlichen Angaben, insbesondere Name, Objektadresse, Termin, Zutrittsinformationen und leistungsbezogene Hinweise. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Einsatzkräfte werden zur Vertraulichkeit verpflichtet. Soweit ein Dienstleister personenbezogene Daten ausschließlich in unserem Auftrag verarbeitet, wird eine Vereinbarung gemäß Art. 28 DSGVO geschlossen."
          },
          applications: {
            title: "Bewerbungen",
            body: "Bei einer Bewerbung verarbeiten wir die von Ihnen übermittelten Kontakt-, Lebenslauf-, Qualifikations- und Bewerbungsdaten zur Durchführung des Bewerbungsverfahrens auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO und den einschlägigen arbeitsrechtlichen Bestimmungen. Nach Abschluss des Verfahrens speichern wir die Unterlagen für bis zu sieben Monate auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Dokumentation des Auswahlverfahrens und der Abwehr oder Durchsetzung möglicher Ansprüche. Eine längere Evidenzhaltung erfolgt nur mit Ihrer gesonderten Einwilligung."
          },
          partners: {
            title: "Anfrage potenzieller Geschäftspartner",
            body: "Bei einer Anfrage über „Partner werden“ oder auf anderem Weg verarbeiten wir insbesondere Unternehmensname, Ansprechpartner, Kontaktdaten, Standort und Nachricht zur Prüfung und Anbahnung einer Zusammenarbeit. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche Maßnahmen geht, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Nicht weiterverfolgte Anfragen werden grundsätzlich nach sechs Monaten gelöscht, sofern keine gesetzlichen Aufbewahrungs- oder Nachweisinteressen entgegenstehen."
          },
          cookies: {
            title: "Cookies und Einwilligungsverwaltung",
            necessary: "Für den technischen Betrieb der Website können unbedingt erforderliche Cookies oder vergleichbare Speichertechnologien eingesetzt werden. Hierzu gehört insbesondere die Speicherung Ihrer Sprache, Standortauswahl und Einwilligungsentscheidung. Rechtsgrundlage ist § 165 Abs. 3 TKG 2021; soweit personenbezogene Daten verarbeitet werden, Art. 6 Abs. 1 lit. f DSGVO.",
            optional: "Optionale Analyse-, Marketing- und Kartendienste werden erst aktiviert, nachdem Sie über das Einwilligungs-Banner zugestimmt haben. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über „Cookie-Einstellungen“ im Footer ändern oder widerrufen. Die dortige Übersicht enthält die jeweils konkret eingesetzten Technologien, Anbieter, Zwecke und Speicherdauern."
          },
          googleAds: {
            title: "Google Tag Manager und Google Ads",
            service: "Nach Ihrer Einwilligung verwenden wir Google Tag Manager und Google Ads, bereitgestellt durch Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Tag Manager dient der Verwaltung von Website-Tags. Google Ads dient der Erfolgsmessung unserer Werbung und - soweit ausgewählt - der Bildung von Zielgruppen für personalisierte Werbung oder Remarketing. Dabei können insbesondere IP-Adresse, Geräte- und Browserinformationen, aufgerufene Seiten, Referrer, Zeitstempel, Interaktionen sowie Cookie- oder sonstige Online-Kennungen an Google übermittelt werden.",
            legalBasis: "Rechtsgrundlagen sind Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Vor Ihrer Einwilligung werden diese Marketingdienste nicht aktiviert. Eine Verarbeitung durch Google LLC in den USA kann nicht ausgeschlossen werden. Google kann hierfür anwendbare Angemessenheitsbeschlüsse, insbesondere das EU-US Data Privacy Framework, oder Standardvertragsklauseln einsetzen.",
            moreInfo: "Weitere Informationen: <googlePrivacy>Datenschutzerklärung von Google</googlePrivacy> und <googlePartnerSites>Datennutzung bei eingebundenen Google-Diensten</googlePartnerSites>.",
          },
          analytics: {
            title: "Google Analytics 4",
            service: "Nach Ihrer Einwilligung setzen wir Google Analytics 4 ein, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics wertet die Nutzung unserer Website aus, insbesondere aufgerufene Seiten, Verweildauer, ungefähre Region, verwendetes Gerät und Browser sowie Interaktionen, und hilft uns so, unser Angebot zu verbessern. Dabei können Cookies gesetzt werden (insbesondere „_ga“ und „_ga_*“, Speicherdauer bis zu zwei Jahre); maßgeblich sind die aktuellen Angaben in den Cookie-Einstellungen. IP-Adressen werden von Google Analytics 4 nach Angaben von Google nicht protokolliert oder gespeichert. Wir identifizieren einzelne Besucher dabei nicht.",
            legalBasis: "Rechtsgrundlagen sind Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Ohne Ihre Einwilligung wird Google Analytics nicht aktiviert. Eine Verarbeitung durch Google LLC in den USA kann nicht ausgeschlossen werden. Google kann hierfür anwendbare Angemessenheitsbeschlüsse, insbesondere das EU-US Data Privacy Framework, oder Standardvertragsklauseln einsetzen. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen widerrufen.",
            moreInfo: "Weitere Informationen: <googlePrivacy>Datenschutzerklärung von Google</googlePrivacy> und <googlePartnerSites>Datennutzung bei eingebundenen Google-Diensten</googlePartnerSites>.",
          },
          leadinfo: {
            title: "Leadinfo",
            service: "Nach Ihrer Einwilligung nutzen wir den Lead-Generation-Dienst der Leadinfo B.V., Rivium Quadrant 141, 2909 LC Capelle aan den IJssel, Niederlande. Leadinfo gleicht die IP-Adresse eines Websitebesuchs mit Unternehmensdaten aus öffentlich zugänglichen Quellen ab, um Besuche Unternehmen zuzuordnen, und stellt uns hierzu Unternehmensinformationen und Angaben über besuchte Seiten zur Verfügung. Leadinfo verarbeitet außerdem Domains aus Formulareingaben, um die Zuordnung von IP-Adressen zu Unternehmen und den Dienst zu verbessern.",
            cookies: "Soweit die Analysefunktion aktiviert ist, können zwei First-Party-Cookies eingesetzt werden: „_li_id.*“ zur Unterscheidung neuer und wiederkehrender Besuche für bis zu zwei Jahre und „_li_ses.*“ zur Zusammenfassung der während einer Sitzung besuchten Seiten für die Dauer der Sitzung. Maßgeblich sind die aktuellen Angaben in den Cookie-Einstellungen.",
            legalBasis: "Rechtsgrundlagen sind Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Ohne Einwilligung wird Leadinfo auf unserer Website nicht aktiviert. Sie können die Einwilligung über die Cookie-Einstellungen widerrufen und zusätzlich die Opt-out-Möglichkeit von Leadinfo verwenden.",
            moreInfo: "Weitere Informationen: <leadinfoPrivacy>Datenschutz bei Leadinfo</leadinfoPrivacy>; <leadinfoOptOut>Leadinfo Opt-out</leadinfoOptOut>.",
          },
          maps: {
            title: "Google Maps",
            body: ""
          },
          socialMedia: {
            title: "Social-Media-Links",
            body: ""
          },
          recipients: {
            title: "Empfänger und Drittlandübermittlungen",
            body: "Empfänger personenbezogener Daten können - soweit für den jeweiligen Zweck erforderlich - Hosting- und IT-Dienstleister, Kommunikationsdienstleister, eingesetzte Mitarbeiter und Subunternehmer, Steuerberatung, Behörden sowie die in dieser Erklärung genannten Anbieter sein. Daten werden nur im erforderlichen Umfang übermittelt. Bei Übermittlungen in Staaten außerhalb des Europäischen Wirtschaftsraums nutzen wir die nach der DSGVO vorgesehenen Garantien, insbesondere Angemessenheitsbeschlüsse oder Standardvertragsklauseln, soweit keine gesetzliche Ausnahme greift."
          },
          rights: {
            title: "Ihre Rechte",
            body: "Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Gegen eine Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, Widerspruch einlegen. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zur Ausübung Ihrer Rechte genügt eine Nachricht an office@putzelf.com.",
            complaint: "Sie haben außerdem das Recht auf Beschwerde bei der <supervisoryAuthority>Österreichischen Datenschutzbehörde</supervisoryAuthority>, Barichgasse 40-42, 1030 Wien, Telefon +43 1 52 152-0, E-Mail dsb@dsb.gv.at."
          },
          security: {
            title: "Datensicherheit",
            body: "Wir treffen angemessene technische und organisatorische Maßnahmen, um personenbezogene Daten vor Verlust, unbefugtem Zugriff, Veränderung und Offenlegung zu schützen. Die Website wird verschlüsselt über TLS/SSL übertragen."
          },
          updates: {
            title: "Aktualisierung",
            body: "Wir aktualisieren diese Datenschutzerklärung, wenn sich eingesetzte Dienste, Verarbeitungsabläufe oder die Rechtslage ändern."
          }
        }
      },
      home: {
        title: "Reinigung anfragen",
        seoTitle: "Reinigung buchen",
        seoDescription: "Termin auswählen und Ihre Daten eingeben.",
        locationModal: {
          title: "Wo möchten Sie die Reinigung anfragen?",
          prompt: "Wählen Sie die Stadt für Ihre Dienstleistung",
          vienna: "Wien",
          graz: "Graz",
          validation: "Bitte wählen Sie einen Ort, um fortzufahren."
        },
        successTitle: "Anfrage erfolgreich gesendet",
        successMessage: "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.",
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
          window: "Fenster",
          none: "—"
        },
        flow: {
          inquiry: "Anfrage starten",
          calculator: "Preiskalkulator",
          calculatorPrompt: "Möchten Sie zuerst einen ungefähren Preis sehen?",
          inquiryDescription: "Füllen Sie das untenstehende Formular aus und wir melden uns mit einem individuellen Angebot bei Ihnen."
        },
        contact: {
          name: "Vollständiger Name",
          phone: "Telefonnummer*",
          email: "E-Mail-Adresse*",
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
          prev: "Vorheriger Monat",
          next: "Nächster Monat",
          errorFetchDates: "Fehler beim Laden der verfügbaren Tage.",
          errorFetchSlots: "Fehler beim Laden der verfügbaren Zeiten.",
          available: "verfügbar",
          unavailable: "Nicht verfügbar",
          selected: "Ausgewählt",
          selectedAvailable: "Ausgewählt und verfügbar",
          dateHint: "Wählen Sie ein Datum aus dem Kalender."
        },
        
        durationLabel: "Geschätzte Arbeitszeit",
        durationPlaceholder: "2+",
        decreaseHours: "Weniger Stunden",
        increaseHours: "Mehr Stunden",
        slots: {
          chooseDate: "Wählen Sie ein Datum, um verfügbare Zeiten anzuzeigen.",
          loading: "Verfügbare Zeiten werden geladen …",
          none: "Für diesen Tag sind keine Zeiten verfügbar. Bitte wählen Sie ein anderes Datum."
        },
        dateLabel: "Datum",
        timeLabel: "Uhrzeit",
        renegotiate: "Wir nehmen zur Kenntnis, dass die Dienstleistung nach tatsächlicher Arbeitszeit verrechnet wird",
        durationHelp: "Mindestbuchung ist 2 Stunden.",
        estimated: "Geschätzter Preis",
        rate: "Preis: €{{rate}}/Stunde",
        submit: "Anfragebestätigung",
        submitInquiry: "Anfragebestätigung",
        alerts: {
          missing: "Bitte Datum, Uhrzeit ausfüllen und eine Reinigungsart wählen.",
          createError: "Fehler bei der Erstellung der Buchung: {{msg}}",
          noWorker: "Bitte wählen Sie Ihre Reinigungskraft, bevor Sie die Buchung abschließen."
        },
        selectedWorker: {
          label: "Ihre Reinigungskraft",
          selected: "{{name}} ist bereit zu helfen.",
          change: "Wählen Sie eine andere Reinigungskraft",
          missing: "Sie haben noch keine Reinigungskraft ausgewählt.",
          choose: "Reinigungskraft auswählen"
        }
      },
      calculator: {
        seoTitle: "Preisrechner Reinigung Wien",
        seoDescription: "Preisrechner für Reinigung in Wien: Kosten (brutto) in wenigen Sekunden berechnen.",
        title: "Preisrechner",
        subtitle: "Schätzen Sie die Kosten Ihrer Reinigung basierend auf Dauer und Extras.",
        typeHeading: "Reinigungsart wählen",
        subHeading: "Optionale Premium-Services",
        durationLabel: "Dauer (Stunden)",
        durationHelp: "Buchungen starten bei 2 Stunden. Verwenden Sie die Pfeile zur Anpassung.",
        estimatedTotalLabel: "Preisübersicht",
        estimatedTotal: "Geschätzte Gesamtkosten: {{price}} €",
        hourlyRate: "Stundensatz: {{rate}}",
        premiumNotice: "Premium-Extras beeinflussen den Stundensatz.",
        renegotiateLabel: "Nachverhandlung erlauben, falls mehr Zeit nötig ist",
        resetBtn: "Auswahl zurücksetzen",
        cta: "Buchung anfragen",
        disclaimer: "Dies ist eine Schätzung. Der finale Preis wird nach Prüfung Ihrer Anfrage bestätigt.",
        netLabel: "Netto",
        vatLabel: "Umsatzsteuer (20 %)",
        grossLabel: "Brutto",
        decreaseHours: "Weniger Stunden",
        increaseHours: "Mehr Stunden"
      },
      windowModal: {
        title: "Wie viele Fenster möchten Sie gereinigt haben?"
      },
      order: {
        title: "Buchung",
        quoteRequestTitle: "Anfrage starten",
        loading: "Buchung wird geladen...",
        confirmTitle: "Buchung bestätigen",
        summary: "Buchungsübersicht",
        date: "Datum",
        time: "Uhrzeit",
        cleaningType: "Reinigungsart",
        duration: "Dauer",
        durationUnit: "Stunden",
        price: "Preis",
        directInquiry: "Direkt anfragen",
        discountTitle: "Sie haben 20 % Rabatt erhalten!",
        discountBody: "Ihr Preis wird Ihnen per E-Mail gesendet, sobald Sie bestätigen.",
        countrySelectLabel: "Land auswählen",
        countries: {
          at: "Österreich",
          de: "Deutschland",
          ch: "Schweiz",
          cz: "Tschechien",
          sk: "Slowakei",
          hu: "Ungarn",
          pl: "Polen",
          it: "Italien",
          si: "Slowenien",
          hr: "Kroatien",
          nl: "Niederlande",
          be: "Belgien",
          fr: "Frankreich",
          es: "Spanien"
        },
        notesLabel: "Anmerkungen",
        labels: { name: "Name", email: "E-Mail", address: "Adresse", phone: "Telefon" },
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
          invalidEmailDoubleDot: "Die E-Mail-Adresse darf keine zwei aufeinanderfolgenden Punkte enthalten.",
          invalidPhone: "Bitte geben Sie eine gültige Telefonnummer mit Ländervorwahl ein.",
          createQuoteFailed: "Die Anfrage konnte nicht erstellt werden. Bitte versuchen Sie es erneut.",
          confirmFailed: "Die Anfrage konnte nicht bestätigt werden. Bitte versuchen Sie es erneut.",
          requiredName: "Name ist erforderlich",
          requiredAddress: "Adresse ist erforderlich",
          requiredPhone: "Telefonnummer ist erforderlich",
          requiredEmail: "E-Mail-Adresse ist erforderlich",
          requiredGdpr: "Bitte stimmen Sie der DSGVO-Einwilligung zu",
          requiredFirstName: "Bitte geben Sie Ihren Vornamen ein.",
          requiredLastName: "Bitte geben Sie Ihren Nachnamen ein.",
          requiredStreet: "Bitte geben Sie den Straßennamen ein.",
          requiredHouseNumber: "Bitte geben Sie die Hausnummer ein.",
          requiredPostal: "Bitte geben Sie die Postleitzahl ein.",
          requiredCity: "Bitte geben Sie den Ort ein.",
        },
        gdprPrefix: "Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß ",
        gdprText: "Ich stimme zu, dass meine Daten für die Buchung verarbeitet und ich bezüglich dieser Buchung kontaktiert werde.",
        gdprFull: "Ich stimme zu, dass meine Daten für die Buchung verarbeitet und ich bezüglich dieser Buchung kontaktiert werde.",
        gdprLink: "Datenschutzerklärung",
        confirming: "Anfrage wird gesendet...",
        submitBtn: "Jetzt anfragen",
        confirmBtn: "Buchung anfragen",
        confirmedTitle: "Anfrage erfolgreich gesendet",
        confirmedMsg: "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Unser Team meldet sich telefonisch bei Ihnen, um den Termin zu besprechen und zu bestätigen.",
        bookingId: "Buchungs-ID: {{id}}",
        errorPrefix: ""
      }
    }
  }
};

// Ensure `services.overview` exists at the top-level `services` key for both locales.
// This guards against accidental nesting of `overview` inside sub-objects.
resources.en.translation.services = resources.en.translation.services || {};
resources.en.translation.services.overview = {
  seoTitle: "Cleaning Services Vienna & Graz | PutzELF",
  seoDescription: "Maintenance, deep, staircase, glass and frame cleaning for businesses in Vienna and Graz.",
  title: "Cleaning Services for Homes & Businesses",
  subtitle: "Practical, reliable cleaning services for private households and commercial customers in Vienna and Graz. Select a service to see what’s included and request a quote.",
  cards: [
    /* oneTimeCleaning removed */
    { key: "privateMaintenance", title: "Home Maintenance", desc: "Recurring cleaning visits adapted to your household and schedule." },
    { key: "privateDeep", title: "Deep Cleaning", desc: "Intensive one‑off cleaning for heavy soiling or post‑renovation." },
    { key: "businessMaintenance", title: "Business Maintenance", desc: "Flexible, scheduled cleaning for offices and commercial premises." },
    { key: "businessDeep", title: "Commercial Deep Cleaning", desc: "Thorough cleaning for handovers, renovations and high‑traffic areas." },
    { key: "window", title: "Window & Frame Cleaning", desc: "Professional window and frame care for clear views and a tidy appearance." }
  ],
  whoForTitle: "Who we serve",
  whoForText: "Private households, landlords, property managers and businesses of all sizes. We tailor scope, frequency and timing to your specific needs.",
  challengesTitle: "Common cleaning challenges",
  challenges: [
    "Limited time for regular, detailed cleaning",
    "Stubborn dirt and renovation residue",
    "Maintaining hygiene and a presentable appearance for customers and staff"
  ],
  approachTitle: "Our approach",
  approach: [
    "Clear room‑by‑room checklists and transparent scopes",
    "Flexible appointment windows to reduce disruption",
    "Teams working with agreed routines and quality checks"
  ],
  benefitsTitle: "Why choose PutzELF",
  benefits: [
    "Reliable, scheduled visits and transparent pricing",
    "Consistent results through checklists and follow‑ups",
    "Straightforward communication and an easy inquiry process"
  ],
  includedTitle: "What’s included",
  included: [
    "Room‑by‑room checklist as agreed in the inquiry",
    "Sanitary and kitchen care where applicable",
    "Optional extras on request (windows, carpets)"
  ],
  conclusion: ""
};

resources.de.translation.services = resources.de.translation.services || {};
resources.de.translation.services.overview = {
  seoTitle: "Reinigungsleistungen Wien & Graz | PutzELF",
  seoDescription: "Unterhalts-, Grund-, Treppenhaus- sowie Glas- und Rahmenreinigung für Unternehmen in Wien und Graz.",
  title: "Unsere Services – Reinigungsleistungen für Privat und Gewerbe",
  subtitle: "Übersichtliche, verlässliche Reinigungsangebote für Haushalte und Unternehmen in Wien und Graz. Wählen Sie eine Leistung, um Details, Umfang und mögliche Termine zu sehen.",
  cards: [
    /* oneTimeCleaning removed */
    { key: "privateMaintenance", title: "Unterhaltsreinigung (Privat)", desc: "Regelmäßige Reinigung nach Wunsch – passend zu Ihrem Haushalt und Rhythmus." },
    { key: "privateDeep", title: "Grundreinigung", desc: "Intensive, einmalige Reinigung bei starker Verschmutzung oder nach Renovierungen." },
    { key: "businessMaintenance", title: "Unterhaltsreinigung (Gewerbe)", desc: "Flexible, planbare Reinigung für Büros und gewerbliche Flächen außerhalb der Betriebszeiten." },
    { key: "businessDeep", title: "Gewerbliche Grundreinigung", desc: "Gründliche Reinigung für Übergaben, Renovationsrückstände und stark frequentierte Bereiche." },
    { key: "window", title: "Glas- & Rahmenreinigung", desc: "Professionelle Fenster- und Rahmenpflege für klare Sicht und gepflegtes Erscheinungsbild." }
  ],
  whoForTitle: "Für wen sind unsere Services geeignet?",
  whoForText: "Wir betreuen Privatkundinnen und -kunden, Vermieter sowie Unternehmen jeder Größe. Ob einmalige Spezialreinigung oder regelmäßiger Unterhalt – wir passen Leistungen, Intervalle und Termine an Ihre Situation an.",
  challengesTitle: "Häufige Reinigungsprobleme",
  challenges: [
    "Zu wenig Zeit für gründliche Reinigung im Alltag",
    "Hartnäckiger Schmutz nach Renovierungen oder Veranstaltungen",
    "Anforderungen an Hygiene und Erscheinungsbild für Kundschaft und Mitarbeitende"
  ],
  approachTitle: "Unsere Arbeitsweise",
  approach: [
    "Klare Leistungsbeschreibungen und Raum-für-Raum-Checklisten",
    "Flexible Terminfenster, abgestimmt auf Ihren Tagesablauf oder Betriebszeiten",
    "Teams mit vereinbarten Abläufen und Qualitätskontrollen"
  ],
  benefitsTitle: "Ihre Vorteile",
  benefits: [
    "Planbare Termine und transparente Preise",
    "Konstante Reinigungsqualität dank Checklisten und Nachkontrollen",
    "Klare Kommunikation und einfache Anfrageprozesse"
  ],
  includedTitle: "Was ist enthalten",
  included: [
    "Raum-für-Raum-Checkliste entsprechend der Anfrage",
    "Sanitär- und Küchenpflege, wo vereinbart",
    "Optionale Zusatzleistungen (z. B. Fenster oder Teppichpflege) auf Anfrage"
  ],
  conclusion: ""
};

i18n.use(initReactI18next).init({
  resources,
  lng: typeof window !== "undefined" && /^\/en(?:\/|$)/.test(window.location.pathname) ? "en" : "de",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
