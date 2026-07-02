// All network calls to the Flask backend live here. Endpoint paths and
// payload shape are untouched — do not change these without also updating
// the backend blueprint.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

/** Error type so components can branch on HTTP status (409, 429, etc). */
export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/**
 * POST /short
 * Body: { long_url, alias? } — exactly what the Flask route expects.
 * @returns {Promise<{ shortUrl: string, message: string }>}
 */
export async function createShortUrl({ longUrl, alias }) {
  const res = await fetch(`${BASE_URL}/short`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      long_url: longUrl,
      ...(alias ? { alias } : {}),
    }),
  })

  let payload = null
  try {
    payload = await res.json()
  } catch {
    // no/invalid JSON body — handled by the !res.ok branch below
  }

  if (!res.ok) {
    const message = payload?.message || `Request failed with status ${res.status}`
    throw new ApiError(message, res.status)
  }

  // The backend returns "short_url" on the alias/existing-link branch and
  // "Short_url" (capital S) on the auto-generated branch — normalize both
  // here so nothing downstream needs to know about the inconsistency.
  const shortUrl = payload?.short_url || payload?.Short_url
  return { shortUrl, message: payload?.message }
}

/** Builds the redirect URL for a given short code — GET /<short_url>. */
export function buildRedirectUrl(shortCode) {
  return `${BASE_URL}/${shortCode}`
}
