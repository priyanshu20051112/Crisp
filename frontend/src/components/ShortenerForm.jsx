import { useState } from 'react'
import { HiOutlineLink, HiOutlineTag } from 'react-icons/hi'
import Button from './Button'
import ExpirySelector from './ExpirySelector'

export default function ShortenerForm({ onSubmit, isLoading }) {
  const [longUrl, setLongUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [expiry, setExpiry] = useState('24h')
  const [fieldError, setFieldError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setFieldError(null)

    if (!longUrl.trim()) {
      setFieldError('Paste a link to shorten it.')
      return
    }
    if (alias && !/^[a-zA-Z0-9_-]{3,32}$/.test(alias)) {
      setFieldError('Custom alias must be 3–32 letters, numbers, - or _.')
      return
    }

    onSubmit({ longUrl: longUrl.trim(), alias: alias.trim() || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="long-url" className="mb-1.5 block text-sm font-medium text-gray-700">
          Long URL
        </label>
        <div className="relative">
          <HiOutlineLink className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="long-url"
            type="text"
            inputMode="url"
            autoComplete="off"
            placeholder="https://example.com/a/very/long/path"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm
              text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors duration-150
              focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
              disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="alias" className="mb-1.5 block text-sm font-medium text-gray-700">
          Custom alias <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <div className="relative">
          <HiOutlineTag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="alias"
            type="text"
            autoComplete="off"
            placeholder="launch-day"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm
              text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors duration-150
              focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
              disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>
      </div>

      <ExpirySelector value={expiry} onChange={setExpiry} />

      {fieldError && (
        <p className="animate-shake text-sm font-medium text-red-600">{fieldError}</p>
      )}

      <Button type="submit" variant="primary" loading={isLoading} className="w-full py-3">
        {isLoading ? 'Shortening…' : 'Shorten URL'}
      </Button>
    </form>
  )
}
