const STORAGE_KEY = "cookieConsent";

export function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        analytics: false,
        marketing: false,
        time: null,
      };
    }

    const parsed = JSON.parse(raw);

    return {
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      time: parsed.time || null,
    };
  } catch (_) {
    return {
      analytics: false,
      marketing: false,
      time: null,
    };
  }
}

export function writeConsent(state) {
  try {
    const payload = {
      analytics: !!state.analytics,
      marketing: !!state.marketing,
      time: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

    window.dispatchEvent(
      new CustomEvent("consentChanged", {
        detail: {
          analytics: payload.analytics,
          marketing: payload.marketing,
        },
      })
    );
  } catch (_) {}
}

export function openSettings() {
  try {
    window.dispatchEvent(new Event("openCookieSettings"));
  } catch (_) {}
}

export default {
  readConsent,
  writeConsent,
  openSettings,
};