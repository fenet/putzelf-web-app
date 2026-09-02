import { apiFetch } from "./api";
import { readConsent } from "./consent";

let initialized = false;
let gaId = null;
let fbId = null;
let gtmId = null;
let leadinfoId = null;

let consentState = {
  analytics: false,
  marketing: false,
};

export function hasAnalyticsConsent() {
  try {
    return !!readConsent().analytics;
  } catch (_) {
    return false;
  }
}

function getStoredConsentState() {
  try {
    const stored = readConsent();

    return {
      analytics: !!stored.analytics,
      marketing: !!stored.marketing,
    };
  } catch (_) {
    return {
      analytics: false,
      marketing: false,
    };
  }
}

function loadGa(measurementId) {
  if (!measurementId) return;
  if (document.getElementById("ga4-src")) return;

  const s = document.createElement("script");

  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  s.id = "ga4-src";

  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
  });
}

function loadFb(pixelId) {
  if (!pixelId) return;
  if (document.getElementById("fb-pixel-src")) return;

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;

    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };

    if (!f._fbq) f._fbq = n;

    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];

    t = b.createElement(e);
    t.async = true;
    t.src = v;
    t.id = "fb-pixel-src";

    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

function loadGtm(gtmId) {
  if (!gtmId) return;
  if (document.getElementById("gtm-src")) return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const s = document.createElement("script");

  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  s.id = "gtm-src";

  document.head.appendChild(s);
}

function loadLeadinfo(id) {
  if (!id) return;
  // Prevent duplicate initialization
  if (typeof window.leadinfo !== "undefined") return;
  if (document.getElementById("leadinfo-init")) return;

  const initCode = `(function(l,e,a,d,i,n,f,o){if(!l[i]){l.GlobalLeadinfoNamespace=l.GlobalLeadinfoNamespace||[];l.GlobalLeadinfoNamespace.push(i);l[i]=function(){(l[i].q=l[i].q||[]).push(arguments)};l[i].t=l[i].t||n;l[i].q=l[i].q||[];o=e.createElement(a);f=e.getElementsByTagName(a)[0];o.async=1;o.src=d;f.parentNode.insertBefore(o,f);} }(window,document,'script','https://cdn.leadinfo.net/ping.js','leadinfo','${id}'));`;

  const s = document.createElement("script");
  s.type = "text/javascript";
  s.id = "leadinfo-init";
  s.text = initCode;
  document.head.appendChild(s);
}

export function initAnalytics({ gaMeasurementId, fbPixelId }) {
  if (initialized) return;

  initialized = true;

  gaId = gaMeasurementId || null;
  fbId = fbPixelId || null;
  gtmId = import.meta.env.VITE_GTM_ID || null;
  leadinfoId = import.meta.env.VITE_LEADINFO_ID || "LI-6A5A69438E145";

  // Read existing consent.
  consentState = getStoredConsentState();

  // IMPORTANT:
  // Nothing is loaded unless the corresponding consent exists.
  if (consentState.analytics && gaId) {
    loadGa(gaId);
  }

  // Leadinfo is classified under analytics consent
  if (consentState.analytics && leadinfoId) {
    loadLeadinfo(leadinfoId);
  }

  if (consentState.marketing) {
    if (fbId) {
      loadFb(fbId);
    }

    if (gtmId) {
      loadGtm(gtmId);
    }
  }

  // Listen for future consent changes.
  window.addEventListener("consentChanged", (event) => {
    const detail = event?.detail || {};

    consentState = {
      analytics: !!detail.analytics,
      marketing: !!detail.marketing,
    };

    if (consentState.analytics && gaId) {
      loadGa(gaId);
    }

    if (consentState.analytics && leadinfoId) {
      loadLeadinfo(leadinfoId);
    }

    if (consentState.marketing) {
      if (fbId) {
        loadFb(fbId);
      }

      if (gtmId) {
        loadGtm(gtmId);
      }
    }
  });
}
export function trackPageview(pathname) {
  if (!pathname || !hasAnalyticsConsent()) return;
  try {
    if (window.gtag && gaId) {
      window.gtag('event', 'page_view', { page_path: pathname });
    }
    if (window.fbq && fbId) {
      const eventId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      window.fbq('track', 'PageView', {}, { eventID: eventId });
      if (consentState.marketing) {
        try {
          apiFetch("/api/meta/event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventName: "PageView",
              eventId,
              eventSourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
              customData: {
                page_path: pathname,
              },
            }),
          }).catch(() => {});
        } catch (_) {}
      }
    }
  } catch (_) {}
}

export function trackEvent(eventName, params = {}) {
  if (!eventName || !hasAnalyticsConsent()) return;
  try {
    if (window.gtag && gaId) {
      window.gtag('event', eventName, params || {});
    }
    if (window.fbq && fbId) {
      // Use Meta's recommended event names for better tracking
      const metaEventName = getMetaEventName(eventName);
      const metaParams = getMetaParams(metaEventName, eventName, params);
      const eventId =
        params?.event_id ||
        params?.eventId ||
        (typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`);
      const metaOptions = eventId ? { eventID: eventId } : undefined;
      window.fbq('track', metaEventName, metaParams, metaOptions);

      if (consentState.marketing && metaEventName !== 'Lead') {
        try {
          apiFetch("/api/meta/event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventName: metaEventName,
              eventId,
              eventSourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
              customData: metaParams,
            }),
          }).catch(() => {});
        } catch (_) {}
      }
      
      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log('Meta Event Tracked:', {
          eventName: metaEventName,
          params: metaParams,
          originalEvent: eventName,
          pixelId: fbId
        });
      }
    } else if (import.meta.env.DEV) {
      console.warn('Meta Pixel not loaded. Check VITE_FB_PIXEL_ID environment variable.');
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error tracking event:', error);
    }
  }
}

// Map custom events to Meta's standard events for better tracking
function getMetaEventName(eventName) {
  const eventMap = {
    // Only fire Meta Lead on the final confirm booking action
    'Booking_Confirmed': 'Lead',

    // Non-lead events map to generic content views
    'Order_Submit_Click': 'ViewContent',
    'Navbar_Book_Click': 'ViewContent',
    'Landing_CTA_Click': 'ViewContent',
    'AltLanding_Nav_CTA_Click': 'ViewContent',
    'AltLanding_Hero_CTA_Click': 'ViewContent',
    'AltLanding_Process_CTA_Click': 'ViewContent',
    'AltLanding_Mobile_Book_Click': 'ViewContent',
    'Service_Standard_Click': 'ViewContent',
    'Service_Deep_Click': 'ViewContent',
    'Service_Office_Click': 'ViewContent',
    'Service_Office_Premium_Click': 'ViewContent',
    'Service_Home_Click': 'ViewContent',
    'Service_Type_Selected': 'ViewContent',
    'Booking_Form_Submit': 'ViewContent',
    'Booking_Created': 'ViewContent',
    'Confirmation_View': 'ViewContent',
    // Contact events
    'Contact_Phone_Click': 'Contact',
    'Contact_Email_Click': 'Contact',
    // Social media events
    'Social_Instagram_Click': 'ViewContent',
    'Social_Facebook_Click': 'ViewContent',
    'Social_LinkedIn_Click': 'ViewContent',
    // Cookie events
    'Cookie_Accept_Click': 'CompleteRegistration',
    'Cookie_Decline_Click': 'ViewContent'
  };
  
  return eventMap[eventName] || 'ViewContent';
}

// Format parameters for Meta events; only add lead fields when metaEventName is 'Lead'
function getMetaParams(metaEventName, eventName, params) {
  const { event_id, eventId, ...cleanParams } = params || {};
  const baseParams = {
    content_name: eventName,
    content_category: 'cleaning_services',
    ...cleanParams
  };

  if (metaEventName === 'Lead') {
    baseParams.value = 0; // Optionally set actual value
    baseParams.currency = 'EUR';
    baseParams.content_type = 'service_booking';
    baseParams.lead_type = 'cleaning_service_inquiry';
    baseParams.lead_source = 'website';
    baseParams.lead_quality = 'high_intent';
  }

  return baseParams;
}











