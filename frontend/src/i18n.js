import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        bookNow: "Start an Inquiry",
        phone: "+43 676 6300167",
        email: "office@putzelf.com"
      },
      contact: {
        callNow: "Call now"
      },
      common: {
        cancel: "Cancel",
        ok: "OK"
      },
      imprint: {
        title: "Imprint",
        companyNameTitle: "Company name",
        companyNameLine1: "Sebastijan Aleksandar Kerculj",
        companyNameLine2: "PutzELF",
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
        cta: "Start an Inquiry",
        jobCta: "Looking for a Job?",
        jobModalTitle: "Join the PutzELF team",
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
              title: "Home Maintenance Cleaning",
              description: "Regular cleaning for private homes, tailored to your routine and preferred schedule.",
              features: ["Regular room cleaning", "Kitchen and bathroom care", "Flexible time slots to suit your routine"],
              painTitle: "When regular home upkeep matters",
              painPoints: ["A busy routine leaves too little time for thorough cleaning", "Kitchens, bathrooms and hallways quickly become visibly untidy", "Comfort and hygiene decline when cleaning is inconsistent"],
              solutionTitle: "Our solution for a calm, clean home",
              solutionPoints: ["Regular cleaning intervals that fit your schedule", "Clear room-by-room checklists", "Reliable appointments with professional attention to detail"],
              processTitle: "How the service works",
              process: [
                { title: "Inquiry & scope", desc: "You share your preferences and the ideal cleaning rhythm." },
                { title: "Appointment planning", desc: "We confirm time slots, tasks and access details with you." },
                { title: "Cleaning on site", desc: "Our team cleans the agreed areas carefully and on time." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "How often should home maintenance cleaning be done?", a: "The ideal frequency depends on how the home is used. For private households, we usually recommend 1 to 4 cleaning visits per month." },
                { q: "Can certain areas be prioritized?", a: "Yes. In your inquiry, you can tell us which rooms or tasks matter most to you." },
                { q: "Who supplies the cleaning products?", a: "If requested, our team can bring suitable cleaning products. Please let us know in advance." },
                { q: "Can the cleaning be scheduled flexibly?", a: "Yes. We coordinate time windows and access arrangements to suit your everyday routine." }
              ],
              metaTitle: "Home Cleaning Vienna | Regular Domestic Cleaning – PutzELF",
              metaDescription: "Home maintenance cleaning in Vienna: regular cleaning according to your schedule, flexible appointments and clear quality standards."
            },
            deep: {
              title: "Deep Cleaning",
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
              metaTitle: "Deep Cleaning Vienna | Intensive House Cleaning – PutzELF",
              metaDescription: "Deep cleaning in Vienna for stubborn dirt, renovation residue and intensive care for kitchens, bathrooms and living spaces."
            },
            residential: {
              title: "Residential Cleaning",
              description: "Careful cleaning for apartments, houses and family homes with a focus on comfort and cleanliness.",
              features: ["Dust removal and vacuuming", "Surface care and finishing touches", "Optional window cleaning"],
              painTitle: "When residential cleaning is useful",
              painPoints: ["A busy routine leaves little time for proper care", "Moves, special occasions or regular upkeep require smooth service", "Hygiene and order matter even more with children or pets"],
              solutionTitle: "How we support your home",
              solutionPoints: ["Tailored cleaning plans to suit your needs", "Reliable professionals with proven experience", "Optional extras such as window care"],
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
              metaTitle: "Residential Cleaning Vienna | Reliable Home Cleaning – PutzELF",
              metaDescription: "Residential cleaning in Vienna: thorough, reliable and punctual service for apartments, homes and one-off cleans."
            },
            construction: {
              title: "Post-Construction / Rough Cleaning",
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
              metaTitle: "Construction Cleaning Vienna | Rough & Final Cleaning – PutzELF",
              metaDescription: "Construction cleaning in Vienna: safe and thorough cleaning after build or renovation work with clear planning and handover standards."
            },
            window: {
              title: "Window & Frame Cleaning",
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
              metaTitle: "Glass Cleaning Vienna | Windows & Frames – PutzELF",
              metaDescription: "Glass and frame cleaning in Vienna: streak-free windows, professional frame care and safe execution when needed."
            },
            industrial: {
              title: "Industrial Cleaning & Machinery",
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
              metaTitle: "Industrial Cleaning Vienna | Machinery Cleaning – PutzELF",
              metaDescription: "Industrial cleaning in Vienna: safe cleaning for machines and production areas, with a focus on safety, documentation and efficiency."
            }
          },
          business: {
            maintenance: {
              title: "Commercial Maintenance Cleaning",
              description: "Regular cleaning for businesses, offices and commercial spaces with clear processes and flexible scheduling.",
              features: ["Cleaning of work areas and offices", "Sanitary and kitchen upkeep", "Flexible time windows outside business hours"],
              painTitle: "Why regular commercial cleaning matters",
              painPoints: ["Visible dirt in customer or staff areas makes a poor impression", "High-touch surfaces quickly become neglected in daily use", "Hygiene and comfort deteriorate when cleaning is inconsistent"],
              solutionTitle: "Our solution for business premises",
              solutionPoints: ["Discreet scheduled visits outside opening hours", "Space-specific checklists and quality control", "Clear communication and reliable service standards"],
              processTitle: "How we work",
              process: [
                { title: "Inquiry", desc: "You share your location, opening hours and specific requirements." },
                { title: "Tailored proposal", desc: "We build a cleaning plan that suits your operations." },
                { title: "Regular service", desc: "Cleaning is carried out according to the agreed rhythm and checklist." }
              ],
              faqTitle: "Frequently asked questions",
              faqs: [
                { q: "Can cleaning take place outside business hours?", a: "Yes. We plan early morning or evening visits to minimise disruption." },
                { q: "Do you offer long-term service contracts?", a: "Yes. Recurring service agreements with clear scope and transparent pricing are available." },
                { q: "Can sensitive areas be cleaned?", a: "Yes. Our teams respect access rules, confidentiality and operational requirements." },
                { q: "How is quality assured?", a: "Through checklists, routine inspections and documented handovers." }
              ],
              metaTitle: "Commercial Cleaning Vienna | Business Maintenance – PutzELF",
              metaDescription: "Commercial maintenance cleaning in Vienna: flexible schedules, clear quality standards and clean business premises."
            },
            deep: {
              title: "Commercial Deep Cleaning",
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
              metaTitle: "Commercial Deep Cleaning Vienna | Business Cleaning – PutzELF",
              metaDescription: "Commercial deep cleaning in Vienna: intensive cleaning, disinfection and carpet care for offices, hospitality and business premises."
            },
            staircase: {
              title: "Staircase Cleaning",
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
              metaTitle: "Staircase Cleaning Vienna | Property & Business – PutzELF",
              metaDescription: "Staircase cleaning in Vienna for residential and commercial buildings: regular care, rail cleaning and waste room services."
            },
            construction: {
              title: "Post-Construction / Rough Cleaning (Commercial)",
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
              metaTitle: "Construction Cleaning Vienna | Commercial Rough & Final Cleaning – PutzELF",
              metaDescription: "Commercial construction cleaning in Vienna: planned rough and final cleaning up to handover quality."
            },
            window: {
              title: "Window & Frame Cleaning (Commercial)",
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
              metaTitle: "Glass Cleaning Vienna | Commercial Window Cleaning – PutzELF",
              metaDescription: "Commercial glass and frame cleaning in Vienna: professional execution, safety planning and clear pricing for business properties."
            },
            industrial: {
              title: "Industrial Cleaning & Machinery (Commercial)",
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
              metaTitle: "Industrial Cleaning Vienna | Machinery Cleaning – PutzELF",
              metaDescription: "Industrial cleaning and machinery cleaning in Vienna: safe, documented and efficient work for commercial operating spaces."
            }
          }
        },
      whatWeOffer: "What we offer",
      benefitsTitle: "Benefits",
      benefit1: "Vetted cleaning professionals",
      benefit2: "Flexible scheduling",
      benefit3: "Transparent pricing",
      cta: "Start an Inquiry",
      alt: {
        logo: "PutzELF Logo",
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
        empty: "No reviews available yet."
      },
      contact: {
        seo: {
          title: "Contact – PutzELF",
          description: "Contact PutzELF for cleaning inquiries, business requests, and information about our services."
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
          firstName: "First Name *",
          lastName: "Last Name *",
          streetName: "Street Name *",
          houseNumber: "House No.*",
          doorNumber: "Door No. *",
          buildingNumber: "Building No. *",
          postalCode: "Postal Code *",
          city: "City *",
          phone: "Phone Number *",
          email: "Email Address *"
        },
        locations: {
          vienna: "Vienna / Wien",
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
      cookies: {
        msg: "We only activate analytics and marketing tools after your explicit consent. No tracking is active until you accept. Please review our ",
        privacyPolicy: "Privacy Policy",
        decline: "Decline",
        accept: "Accept"
      },
      privacyPolicy: {
        title: "Privacy Policy",
        intro: "This website privacy notice explains which personal data we may process, for which purposes, how long we keep it, and what choices you have regarding consent and tracking.",
        lastUpdated: "Last updated",
        sections: {
          overview: {
            title: "1. Overview",
            body: "We process personal data only to the extent necessary to provide and improve our cleaning services, respond to inquiries, and manage bookings. We do not use non-essential tracking tools until you explicitly accept cookies and tracking.",
          },
          data: {
            title: "2. Data we process",
            body: "Depending on the service request, we may process your name, phone number, email address, address details, preferred date and time, cleaning type, and any additional notes you provide in the contact or booking form.",
          },
          purposes: {
            title: "3. Purpose of processing",
            body: "We use your data to answer your inquiry, prepare an offer, coordinate a cleaning appointment, communicate with you about the request, and maintain our service quality and operational records."
          },
          tracking: {
            title: "4. Cookies and tracking",
            body: "Tracking, analytics, marketing, and advertising tools are disabled by default. These services are only initialized after you explicitly accept cookies. Until then, we do not activate Google Analytics, Google Ads, Meta Pixel or similar tools, and we do not create tracking cookies for non-essential marketing and analytics purposes."
          },
          retention: {
            title: "5. Retention and sharing",
            body: "We keep information only as long as necessary for the relevant service, legal obligations, and operational records. We do not share personal data with third parties for marketing purposes without your consent. If a service provider is involved, they only receive the minimum data required to fulfill the request."
          },
          rights: {
            title: "6. Your rights",
            body: "You may ask for access, correction, deletion, or restriction of your personal data, and you may withdraw consent at any time where processing is based on consent. Please contact us using the details listed below if you want to exercise these rights."
          },
          contact: {
            title: "7. Contact",
            body: "If you have questions about this privacy policy or your personal data, please contact us by email at office@putzelf.com or by phone at +43 676 6300167."
          },
          disclaimer: {
            title: "8. Important note",
            body: "This page is a website privacy notice and not a substitute for formal legal advice. Exact legal requirements may vary by case and jurisdiction."
          }
        }
      },
      home: {
        title: "Request a cleaning",
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
        types: {
          standard: "Home cleaning",
          office: "Office cleaning",
          apartmentHotel: "Apartment / Hotel"
        },
        flow: {
          inquiry: "Start an Inquiry",
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
          errorFetchSlots: "Failed to fetch available times.",
          available: "Available",
          unavailable: "Unavailable",
          selected: "Selected",
          selectedAvailable: "Selected and available",
          dateHint: "Choose a date from the calendar."
        },
        durationLabel: "Estimated hours",
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
        title: "Price Calculator",
        subtitle: "Estimate the cost of your cleaning based on duration and extras.",
        typeHeading: "Choose a cleaning type",
        subHeading: "Add premium services",
        durationLabel: "Duration (hours)",
        durationHelp: "Bookings start at 2 hours. Use the arrows to adjust.",
        estimatedTotalLabel: "Estimated total",
        estimatedTotal: "Estimated total: €{{price}}",
        hourlyRate: "Hourly rate: €{{rate}}/h",
        premiumNotice: "Premium add-ons adjust the hourly rate.",
        renegotiateLabel: "Allow renegotiation if the job needs more time",
        resetBtn: "Reset selection",
        cta: "Request a Booking",
        disclaimer: "This is an estimate. Final pricing is confirmed after your inquiry is reviewed.",
        taxLabel: "Tax (20%)"
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
        enterDetails: "Enter your details to request a cleaning",
        placeholders: {
          name: "Full name",
          email: "Email",
          address: "Street name & House No. & Door No.",
          phone: "Phone"
        },
        errors: {
          invalidEmail: "Please enter a valid email address.",
          invalidPhone: "Please enter a valid phone number including country code."
          ,requiredFirstName: "Please enter your first name.",
          requiredLastName: "Please enter your last name.",
          requiredStreet: "Please enter your street name.",
          requiredHouseNumber: "Please enter your house number.",
          requiredPostal: "Please enter your postal code.",
          requiredCity: "Please enter your city.",
          requiredAddress: "Please enter your address.",
          requiredName: "Please enter your name."
        },
        gdprPrefix: "I agree to the processing of my personal data in accordance with the ",
        gdprLink: "Privacy Policy (GDPR)",
        confirming: "Sending request...",
        confirmBtn: "Request a Booking",
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
        email: "office@putzelf.com"
      },
      common: {
        cancel: "Abbrechen",
        ok: "OK"
      },
      imprint: {
        title: "Impressum",
        companyNameTitle: "Firmenname",
        companyNameLine1: "Sebastijan Aleksandar Kerculj",
        companyNameLine2: "PutzELF",
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
        title: "Reinigung in Wien – schnell & extra sauber",
        subtitle: "Buchen Sie Ihre Reinigungskraft in Wien in wenigen Klicks: Haushaltsreinigung, Grundreinigung, Fensterreinigung oder Büroreinigung.",
        cta: "Anfrage starten",
        jobCta: "Job gesucht?",
        jobModalTitle: "Werden Sie Teil des PutzELF-Teams",
        jobModalBody: "Senden Sie uns Ihre Kontaktdaten und Bewerbung an {{email}} – wir melden uns schnell zurück.",
        jobModalEmailCta: "E-Mail senden",
        jobModalClose: "Schließen"
      },
      contact: {
        callNow: "Rufen Sie uns an"
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
        homeCta: "Buchung starten",
        officeTitle: "Büroreinigung",
        officeDesc: "Ein sauberes Büro bedeutet einen produktiven Tag. Wir halten Ihre Arbeitsräume sauber, hygienisch und professionell.",
        officeCta: "Buchung starten",
        private: {
          maintenance: {
            title: "Unterhaltsreinigung",
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
            metaTitle: "Unterhaltsreinigung Wien | Regelmäßige Haushaltsreinigung – PutzELF",
            metaDescription: "Unterhaltsreinigung in Wien: regelmäßige Haushaltsreinigung nach Ihrem Zeitplan. Flexible Termine, klare Checklisten und faire Preise."
          },
          deep: {
            title: "Grundreinigung",
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
            metaTitle: "Grundreinigung Wien | Tiefenreinigung & Sanierung – PutzELF",
            metaDescription: "Grundreinigung in Wien für hartnäckigen Schmutz, Renovationsrückstände und Allergien. Individuelle Angebote nach Besichtigung."
          },
          residential: {
            title: "Wohnreinigung",
            description: "Sorgfältige Reinigung von Wohnungen und Einfamilienhäusern.",
            features: ["Staubwischen und Saugen", "Oberflächenpflege", "Fensterreinigung (optional)"],
            painTitle: "Wann Wohnungsreinigung hilft",
            painPoints: ["Enge Zeitplanung im Alltag", "Vor/ Nach Einzug", "Besondere Sauberkeitsanforderungen"],
            solutionTitle: "So unterstützen wir Ihr Zuhause",
            solutionPoints: ["Individuelle Checklisten", "Erfahrene und geprüfte Teams", "Optionale Extras wie Fensterreinigung"],
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
            metaTitle: "Wohnungsreinigung Wien | Zuverlässige Wohnungsreinigung – PutzELF",
            metaDescription: "Wohnungsreinigung in Wien: gründlich, zuverlässig und termintreu. Ideal für regelmäßige Reinigungen oder einmalige Einsätze."
          },
          construction: {
            title: "Bauendreinigung / Grobreinigung",
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
            metaTitle: "Bauendreinigung Wien | Grobreinigung & Feinreinigung – PutzELF",
            metaDescription: "Bauendreinigung in Wien: sichere und gründliche Reinigung nach Bau- oder Renovierungsarbeiten. Angebote nach Besichtigung oder Fotoanalyse."
          },
          window: {
            title: "Glas- & Rahmenreinigung",
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
            metaTitle: "Glasreinigung Wien | Fenster & Rahmen – PutzELF",
            metaDescription: "Glas- und Rahmenreinigung in Wien: streifenfreie Fenster, fachgerechte Rahmepflege und Hebebühneneinsatz bei Bedarf."
          },
          industrial: {
            title: "Industriereinigung & Maschinen",
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
            metaTitle: "Industriereinigung Wien | Maschinenreinigung – PutzELF",
            metaDescription: "Industriereinigung in Wien: sichere Reinigung von Maschinen und Produktionsbereichen mit Fokus auf Betriebssicherheit und Dokumentation."
          }
        },
        business: {
          maintenance: {
            title: "Unterhaltsreinigung (Gewerbe)",
            description: "Regelmäßige Reinigungspläne für Büros, Praxen und gewerbliche Flächen.",
            features: ["Arbeitsplatzreinigung und Hygiene", "Sanitär- und Küchenpflege", "Flexible, nach Betrieb angepasste Zeitfenster"],
            painTitle: "Warum Unterhaltsreinigung für Unternehmen wichtig ist",
            painPoints: ["Sichtbare Verschmutzung im Kunden- oder Mitarbeiterbereich", "Infektionsrisiken durch Kontaktflächen", "Unprofessioneller Eindruck bei Kundenbesuch"],
            solutionTitle: "Unsere Lösung für Unternehmen",
            solutionPoints: ["Diskrete, planbare Einsätze außerhalb der Geschäftszeiten", "Checklisten abgestimmt auf Betriebsbereiche", "Dokumentierte Übergabe und Qualitätskontrolle"],
            processTitle: "So arbeiten wir",
            process: [
              { title: "Anfrage", desc: "Sie senden Angaben zu Fläche, Betriebszeiten und Wünschen." },
              { title: "Individuelles Angebot", desc: "Wir erstellen einen auf Ihren Betrieb abgestimmten Plan." },
              { title: "Regelmäßiger Einsatz", desc: "Wir führen die Reinigung gemäß vereinbartem Rhythmus und Checkliste durch." }
            ],
            faqTitle: "Häufige Fragen (Gewerbe)",
            faqs: [
              { q: "Können Reinigungen ausserhalb der Geschäftszeiten stattfinden?", a: "Ja, wir koordinieren Einsätze frühmorgens oder abends, um Ihren Betrieb nicht zu stören." },
              { q: "Gibt es Serviceverträge?", a: "Ja, wir bieten wiederkehrende Serviceverträge mit klaren Leistungen und Preisen." },
              { q: "Können Sie vertrauliche Bereiche reinigen?", a: "Unsere Teams sind geschult und halten Betriebsgeheimnisse und Diskretion ein." },
              { q: "Wie wird die Qualität sichergestellt?", a: "Durch Checklisten, Stichproben und auf Wunsch Übergabeprotokolle." }
            ],
            metaTitle: "Unterhaltsreinigung Wien | Gewerbliche Reinigung – PutzELF",
            metaDescription: "Unterhaltsreinigung für Unternehmen in Wien: flexible Einsatzzeiten, dokumentierte Abläufe und hygienische Standards für Büros, Praxen und Betriebe."
          },
          deep: {
            title: "Grundreinigung (Gewerbe)",
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
            metaTitle: "Grundreinigung Wien | Gewerbliche Tiefenreinigung – PutzELF",
            metaDescription: "Grundreinigung für Geschäftsräume in Wien: intensive Reinigung, Desinfektion und Teppichpflege für Büros, Hotels und Gastronomie."
          },
          staircase: {
            title: "Treppenhausreinigung",
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
            metaTitle: "Treppenhausreinigung Wien | Hausverwaltung & Gewerbe – PutzELF",
            metaDescription: "Treppenhausreinigung in Wien für Wohn- und Geschäftsgebäude. Regelmäßige Pflege, Geländerreinigung und Müllraumservice."
          },
          construction: {
            title: "Bauendreinigung / Grobreinigung (Gewerbe)",
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
            metaTitle: "Bauendreinigung Wien | Gewerbliche Grob- & Feinreinigung – PutzELF",
            metaDescription: "Bauendreinigung für gewerbliche Objekte in Wien: staged Grob- und Feinreinigung bis zur Übergabequalität."
          },
          window: {
            title: "Glas- & Rahmenreinigung (Gewerbe)",
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
              { title: "Reinigung", desc: "Fachgerechte Reinigung inklusive Rahmepflege und, falls nötig, Hebebühnenarbeiten." }
            ],
            faqTitle: "FAQ Glasreinigung Gewerbe",
            faqs: [
              { q: "Können Sie Fassadenfenster großflächig reinigen?", a: "Ja, wir planen Hebebühnen- oder Gerüstarbeiten je nach Anforderung." },
              { q: "Wie erfolgt die Preisgestaltung?", a: "Nach Fläche, Zugang und benötigtem Gerät; Pauschalen möglich." },
              { q: "Gibt es Sicherheitszertifikate?", a: "Unsere Teams arbeiten gemäß aktueller Sicherheitsstandards." },
              { q: "Kann die Reinigung ausserhalb der Geschäftszeiten stattfinden?", a: "Ja, wir koordinieren Einsätze, um Ihren Betrieb nicht zu stören." }
            ],
            metaTitle: "Glasreinigung Wien | Gewerbliche Fensterreinigung – PutzELF",
            metaDescription: "Glas- und Rahmenreinigung für Geschäftsfassaden in Wien: Hebebühnen-Einsatz, Rah- menpflege und sichere Durchführung für Unternehmen."
          },
          industrial: {
            title: "Industriereinigung & Maschinen (Gewerbe)",
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
            metaTitle: "Industriereinigung Wien | Maschinenreinigung – PutzELF",
            metaDescription: "Industriereinigung in Wien: sichere Reinigung von Maschinen und Produktionsflächen mit Fokus auf Sicherheit und Dokumentation."
          }
        }
      },
      whatWeOffer: "Was wir anbieten",
      benefitsTitle: "Vorteile",
      benefit1: "Geprüfte Reinigungskräfte",
      benefit2: "Flexible Terminplanung",
      benefit3: "Transparente Preise",
      cta: "Anfrage starten",
      alt: {
        logo: "PutzELF Logo",
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
        empty: "Noch keine Bewertungen verfügbar."
      },
      contact: {
        seo: {
          title: "Kontakt – PutzELF",
          description: "Kontaktieren Sie PutzELF für Reinigungsanfragen, Geschäftsanfragen und weitere Informationen."
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
        fields: {
          name: "Name",
          email: "E-Mail",
          phone: "Telefon",
          location: "Standort",
          subject: "Betreff",
          message: "Nachricht"
        },
        bookingContact: {
          title: "Titel",
          firstName: "Vorname *",
          lastName: "Nachname *",
          streetName: "Straßenname *",
          houseNumber: "Hausnummer *",
          doorNumber: "Türnummer *",
          buildingNumber: "Gebäudenummer",
          postalCode: "Postleitzahl *",
          city: "Ort *",
          phone: "Telefonnummer *",
          email: "E-Mail-Adresse *"
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
      cookies: {
        msg: "Wir verwenden technisch notwendige Cookies, um die Sicherheit unserer Website zu gewährleisten. Mit Ihrer Einwilligung nutzen wir zudem Analyse-Tools (wie Google Analytics und Leadinfo), um unser Angebot zu verbessern und Unternehmensbesuche zu analysieren. Ein Tracking erfolgt erst nach Ihrer Zustimmung. Sie können Ihre Einwilligung erteilen, ablehnen oder in unserer Datenschutzerklärung mehr dazu erfahren.",
        privacyPolicy: "Datenschutzerklärung",
        decline: "Ablehnen",
        accept: "Akzeptieren"
      },
      privacyPolicy: {
        title: "Datenschutzerklärung",
        intro: "Diese Datenschutzerklärung erklärt, welche personenbezogenen Daten wir verarbeiten, zu welchen Zwecken, wie lange wir sie aufbewahren und welche Rechte Sie in Bezug auf Einwilligungen und Tracking haben.",
        lastUpdated: "Stand",
        sections: {
          overview: {
            title: "1. Überblick",
            body: "Wir verarbeiten personenbezogene Daten nur insoweit, wie dies für die Bereitstellung und Verbesserung unserer Reinigungsleistungen, die Beantwortung von Anfragen und die Verwaltung von Buchungen erforderlich ist. Nicht notwendige Tracking-Tools werden erst aktiviert, wenn Sie Cookies und Tracking ausdrücklich akzeptieren."
          },
          data: {
            title: "2. Verarbeitete Daten",
            body: "Je nach Anfrage können wir Ihren Namen, Ihre Telefonnummer, Ihre E-Mail-Adresse, Adressdaten, bevorzugtes Datum und Uhrzeit, die gewünschte Reinigungsart sowie zusätzliche Hinweise aus dem Kontakt- oder Buchungsformular verarbeiten."
          },
          purposes: {
            title: "3. Zwecke der Verarbeitung",
            body: "Wir nutzen Ihre Daten, um Ihre Anfrage zu beantworten, ein Angebot vorzubereiten, einen Reinigungstermin zu koordinieren, mit Ihnen zu kommunizieren und die Qualität und Organisation unserer Leistungen zu gewährleisten."
          },
          tracking: {
            title: "4. Cookies und Tracking",
            body: "Tracking, Analyse- und Marketing-Tools sind standardmäßig deaktiviert. Diese Dienste werden erst nach Ihrer ausdrücklichen Cookie-Einwilligung initialisiert. Bis dahin aktivieren wir kein Google Analytics, Google Ads, Meta Pixel oder ähnliche Tools und erstellen keine nicht notwendigen Tracking-Cookies für Marketing oder Analysezwecke."
          },
          retention: {
            title: "5. Aufbewahrung und Weitergabe",
            body: "Wir speichern Informationen nur so lange, wie es für den jeweiligen Service, rechtliche Verpflichtungen und interne Betriebsabläufe erforderlich ist. Wir geben personenbezogene Daten nicht ohne Ihre Einwilligung an Dritte für Marketingzwecke weiter. Falls ein Dienstleister beteiligt ist, erhält dieser nur die minimal erforderlichen Daten zur Aufgabenerfüllung."
          },
          rights: {
            title: "6. Ihre Rechte",
            body: "Sie können Auskunft, Berichtigung, Löschung oder Einschränkung Ihrer personenbezogenen Daten verlangen und Ihre Einwilligung jederzeit widerrufen, soweit die Verarbeitung auf Einwilligung beruht. Bitte kontaktieren Sie uns über die unten genannten Angaben, wenn Sie Ihre Rechte ausüben möchten."
          },
          contact: {
            title: "7. Kontakt",
            body: "Wenn Sie Fragen zur Datenschutzerklärung oder zu Ihren personenbezogenen Daten haben, erreichen Sie uns per E-Mail unter office@putzelf.com oder telefonisch unter +43 676 6300167."
          },
          disclaimer: {
            title: "8. Wichtiger Hinweis",
            body: "Diese Seite dient als Website-Information und ersetzt keine fachliche Rechtsberatung. Die genauen rechtlichen Anforderungen können je nach Fall und Rechtsprechung variieren."
          }
        }
      },
      home: {
        title: "Reinigung anfragen",
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
          window: "Fenster"
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
          errorFetchDates: "Fehler beim Laden der verfügbaren Tage.",
          errorFetchSlots: "Fehler beim Laden der verfügbaren Zeiten.",
          available: "Verfügbar",
          unavailable: "Nicht verfügbar",
          selected: "Ausgewählt",
          selectedAvailable: "Ausgewählt und verfügbar",
          dateHint: "Wählen Sie ein Datum aus dem Kalender."
        },
        
        durationLabel: "Geschätzte Arbeitszeit",
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
        title: "Preisrechner",
        subtitle: "Schätzen Sie die Kosten Ihrer Reinigung basierend auf Dauer und Extras.",
        typeHeading: "Reinigungsart wählen",
        subHeading: "Optionale Premium-Services",
        durationLabel: "Dauer (Stunden)",
        durationHelp: "Buchungen starten bei 2 Stunden. Verwenden Sie die Pfeile zur Anpassung.",
        estimatedTotalLabel: "Geschätzte Gesamtkosten",
        estimatedTotal: "Geschätzte Gesamtkosten: {{price}} €",
        hourlyRate: "Stundensatz: {{rate}} €/h",
        premiumNotice: "Premium-Extras beeinflussen den Stundensatz.",
        renegotiateLabel: "Nachverhandlung erlauben, falls mehr Zeit nötig ist",
        resetBtn: "Auswahl zurücksetzen",
        cta: "Buchung anfragen",
        disclaimer: "Dies ist eine Schätzung. Der finale Preis wird nach Prüfung Ihrer Anfrage bestätigt.",
        taxLabel: "Umsatzsteuer (20%)"
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
          requiredFirstName: "Bitte geben Sie Ihren Vornamen ein.",
          requiredLastName: "Bitte geben Sie Ihren Nachnamen ein.",
          requiredStreet: "Bitte geben Sie den Straßennamen ein.",
          requiredHouseNumber: "Bitte geben Sie die Hausnummer ein.",
          requiredPostal: "Bitte geben Sie die Postleitzahl ein.",
          requiredCity: "Bitte geben Sie den Ort ein.",
        },
        gdprPrefix: "Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß ",
        gdprText: "Ich stimme zu, dass meine Daten für die Buchung verarbeitet und ich bezüglich dieser Buchung kontaktiert werde.",
        gdprLink: "Datenschutzerklärung (DSGVO)",
        confirming: "Anfrage wird gesendet...",
        confirmBtn: "Buchung anfragen",
        confirmedTitle: "Anfrage erfolgreich gesendet",
        confirmedMsg: "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Unser Team meldet sich telefonisch bei Ihnen, um den Termin zu besprechen und zu bestätigen.",
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