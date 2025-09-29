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


