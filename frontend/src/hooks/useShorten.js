import { useCallback, useState } from 'react'
import { createShortUrl, ApiError } from '../api/urlApi'

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

/**
 * Owns the request lifecycle for POST /short. Components stay dumb —
 * they just read `status`/`result`/`error` and call `shorten`/`reset`.
 */
export function useShorten() {
  const [status, setStatus] = useState(STATUS.IDLE)
  const [result, setResult] = useState(null) // { shortUrl, message }
  const [error, setError] = useState(null) // { message, status }

  const reset = useCallback(() => {
    setStatus(STATUS.IDLE)
    setResult(null)
    setError(null)
  }, [])

  const shorten = useCallback(async ({ longUrl, alias }) => {
    setStatus(STATUS.LOADING)
    setError(null)

    try {
      const response = await createShortUrl({ longUrl, alias })
      setResult(response)
      setStatus(STATUS.SUCCESS)
      return response
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Could not reach the server. Check your connection and try again.'
      const status = err instanceof ApiError ? err.status : null
      setError({ message, status })
      setStatus(STATUS.ERROR)
      throw err
    }
  }, [])

  return { status, result, error, shorten, reset }
}
