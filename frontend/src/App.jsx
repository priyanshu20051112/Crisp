import { Toaster, toast } from 'react-hot-toast'
import Hero from './components/Hero'
import ShortenerCard from './components/ShortenerCard'
import Footer from './components/Footer'
import { useShorten } from './hooks/useShorten'

export default function App() {
  const { status, result, error, shorten, reset } = useShorten()

  async function handleSubmit(values) {
    try {
      await shorten(values)
      toast.success('Short link created!')
    } catch {
      // Error state is already captured by the hook; surface a toast too
      // so the failure is noticeable even if the card scrolls out of view.
      toast.error('Something went wrong.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '10px',
            background: '#111827',
            color: '#fff',
            fontSize: '13px',
            padding: '10px 14px',
          },
        }}
      />

      <main className="flex-1 px-4">
        <Hero />
        <ShortenerCard
          status={status}
          result={result}
          error={error}
          onSubmit={handleSubmit}
          onReset={reset}
        />
      </main>

      <Footer />
    </div>
  )
}
