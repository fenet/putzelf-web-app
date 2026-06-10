export function getApiBaseUrl() {
  // Note: do NOT optional-chain `import.meta.env` in Vite projects.
  // Vite statically replaces `import.meta.env.*` but may not detect
  // `import.meta?.env?.*`, which would evaluate to undefined at runtime.
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (fromEnv && typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    let cleaned = fromEnv.trim().replace(/\/$/, '');
    // Guard against common misconfig: setting VITE_API_BASE_URL to a full endpoint
    // like "http://127.0.0.1:5001/api/workers" instead of just the server base.
    cleaned = cleaned.replace(/\/api(?:\/.*)?$/i, '');
    return cleaned;
  }
  // If no env is set: use localhost in dev, same-origin in prod
  const isDev = Boolean(import.meta.env.DEV);
  if (isDev) {
    return 'http://localhost:5001';
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return '';
}

export async function apiFetch(path, options = {}) {
  const base = getApiBaseUrl();
  const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`;
  const headers = new Headers(options.headers || {});
  try {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${storedToken}`);
    }
  } catch {
    // ignore storage errors
  }
  return fetch(url, { ...options, headers });
}

export async function parseJsonSafe(response) {
  try {
    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}


