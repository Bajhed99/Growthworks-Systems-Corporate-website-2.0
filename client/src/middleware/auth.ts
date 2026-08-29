/**
 * Simple password protection middleware for the GWS Website
 * Checks for a valid access token in cookies or URL parameter
 */

const ACCESS_PASSWORD = import.meta.env.VITE_GWS_ACCESS_PASSWORD || '@gws-internal-2026';

export function checkAccess(): boolean {
  if (typeof window === 'undefined') return true; // Server-side, skip check

  // Check localStorage for auth token
  const storedToken = localStorage.getItem('gws_access_token');
  if (storedToken === ACCESS_PASSWORD) {
    return true;
  }

  // Check URL parameter
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get('access');
  if (urlToken === ACCESS_PASSWORD) {
    // Store the token for future visits
    localStorage.setItem('gws_access_token', ACCESS_PASSWORD);
    return true;
  }

  return false;
}

export function getAccessPassword(): string {
  return ACCESS_PASSWORD;
}
