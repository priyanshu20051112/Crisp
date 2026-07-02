import Spinner from './Spinner'

const VARIANTS = {
  primary:
    'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300',
  ghost: 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100',
}

/**
 * Shared button used across the app so hover/press/disabled states stay
 * consistent. Pass `loading` to show a spinner and auto-disable.
 */
export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...rest
}) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5
        text-sm font-medium transition-all duration-150 ease-out
        disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98]
        ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  )
}
