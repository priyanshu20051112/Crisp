import { HiOutlineExclamationCircle } from 'react-icons/hi'

const STATUS_HINTS = {
  409: 'That alias is already taken — try a different one.',
  429: "You've hit the hourly limit for new links. Try again later.",
  400: 'Double-check the URL and try again.',
  503: 'The service is temporarily unavailable. Please try again shortly.',
}

export default function ErrorAlert({ message, status }) {
  const hint = status ? STATUS_HINTS[status] : null

  return (
    <div
      role="alert"
      className="animate-fade-in-up flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
    >
      <HiOutlineExclamationCircle className="h-5 w-5 shrink-0 text-red-500" />
      <div>
        <p className="text-sm font-medium text-red-700">{message}</p>
        {hint && <p className="mt-0.5 text-xs text-red-500">{hint}</p>}
      </div>
    </div>
  )
}
