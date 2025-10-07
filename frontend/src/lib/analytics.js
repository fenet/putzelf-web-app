let initialized = false;
let gaId = null;
let fbId = null;
let consentGranted = null; // null=unknown, true/false stored

function getStoredConsent() {
  try {
    const val = localStorage.getItem('cookieConsent');
    return val === 'true';
  } catch (_) {
    return false;
  }
}

function loadGa(measurementId) {
  if (!measurementId || document.getElementById('ga4-src')) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  s.id = 'ga4-src';
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
}

function loadFb(pixelId) {
  if (!pixelId || document.getElementById('fb-pixel-src')) return;
  !(function(f,b,e,v,n,t,s){
    if(f.fbq) return; n=f.fbq=function(){ n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments) };
    if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[];
    t=b.createElement(e); t.async=!0; t.src=v; t.id='fb-pixel-src';
    s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
}

export function initAnalytics({ gaMeasurementId, fbPixelId }) {
  if (initialized) return;
  initialized = true;
  gaId = gaMeasurementId || null;
  fbId = fbPixelId || null;
  consentGranted = getStoredConsent();

  if (consentGranted) {
    if (gaId) loadGa(gaId);
    if (fbId) loadFb(fbId);
  }

  window.addEventListener('consentChanged', (e) => {
    const granted = !!(e && e.detail && e.detail.consent);
    consentGranted = granted;
    if (granted) {
      if (gaId) loadGa(gaId);
      if (fbId) loadFb(fbId);
    }
  });
}

export function trackPageview(pathname) {
  if (!pathname) return;
  try {
    if (window.gtag && gaId) {
      window.gtag('event', 'page_view', { page_path: pathname });
    }
    if (window.fbq && fbId) {
      window.fbq('track', 'PageView');
    }
  } catch (_) {}
}

export function trackEvent(eventName, params = {}) {
  if (!eventName) return;
  try {
    if (window.gtag && gaId) {
      window.gtag('event', eventName, params || {});
    }
    if (window.fbq && fbId) {
      // Use Meta's recommended event names for better tracking
      const metaEventName = getMetaEventName(eventName);
      const metaParams = getMetaParams(metaEventName, eventName, params);
      window.fbq('track', metaEventName, metaParams);
      
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
    'Order_Submit_Click': 'Lead',

    // Non-lead events map to generic content views
    'Navbar_Book_Click': 'ViewContent',
    'Landing_CTA_Click': 'ViewContent',
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
  const baseParams = {
    content_name: eventName,
    content_category: 'cleaning_services',
    ...params
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











