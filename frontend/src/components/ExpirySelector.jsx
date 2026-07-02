const OPTIONS = [
  { value: '1h', label: '1 hour', enabled: false },
  { value: '24h', label: '24 hours', enabled: true },
  { value: '7d', label: '7 days', enabled: false },
  { value: '30d', label: '30 days', enabled: false },
]

/**
 * NOTE: the Flask backend (`app(url=..., expires_at=now+timedelta(days=1))`)
 * hardcodes every link to expire in 24 hours — it doesn't accept an expiry
 * param. Rather than silently ignoring a user's choice, the other options
 * are rendered disabled with a "soon" badge until the API supports it.
 */
export default function ExpirySelector({ value, onChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">Expires in</label>
      <div className="grid grid-cols-4 gap-1.5 rounded-lg bg-gray-100 p-1">
        {OPTIONS.map((opt) => {
          const isActive = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              disabled={!opt.enabled}
              onClick={() => opt.enabled && onChange(opt.value)}
              title={opt.enabled ? undefined : 'Not supported by the API yet'}
              className={`relative rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-150
                ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-sm'
                    : opt.enabled
                      ? 'text-gray-500 hover:text-gray-800'
                      : 'cursor-not-allowed text-gray-300'
                }`}
            >
              {opt.label}
              {!opt.enabled && (
                <span className="absolute -top-1.5 -right-1 rounded-full bg-gray-200 px-1 text-[9px] font-semibold text-gray-500">
                  soon
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
