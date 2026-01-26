export function getApiBaseUrl() {
  const fromEnv = import.meta?.env?.VITE_API_BASE_URL;
  if (fromEnv && typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/$/, '');
  }
  // If no env is set: use localhost in dev, same-origin in prod
  const isDev = Boolean(import.meta?.env?.DEV);
  if (isDev) {
    return 'http://localhost:5000';
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


