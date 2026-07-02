import ShortenerForm from './ShortenerForm'
import ResultCard from './ResultCard'
import ErrorAlert from './ErrorAlert'
import Button from './Button'
import { STATUS } from '../hooks/useShorten'

export default function ShortenerCard({ status, result, error, onSubmit, onReset }) {
  const isLoading = status === STATUS.LOADING

  return (
    <section
      className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white
        p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover sm:p-8"
    >
      <ShortenerForm onSubmit={onSubmit} isLoading={isLoading} />

      {status === STATUS.SUCCESS && result?.shortUrl && (
        <div className="mt-5">
          <ResultCard shortUrl={result.shortUrl} />
        </div>
      )}

      {status === STATUS.ERROR && error && (
        <div className="mt-5">
          <ErrorAlert message={error.message} status={error.status} />
        </div>
      )}

      {(status === STATUS.SUCCESS || status === STATUS.ERROR) && (
        <div className="mt-4 flex justify-center">
          <Button variant="ghost" onClick={onReset} className="text-xs">
            Shorten another link
          </Button>
        </div>
      )}
    </section>
  )
}
