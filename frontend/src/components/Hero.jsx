import { HiOutlineLink } from 'react-icons/hi'

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-4 pt-16 pb-10 sm:pt-20 sm:pb-12">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 shadow-sm">
        <HiOutlineLink className="h-6 w-6 text-white" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        URL Shortener
      </h1>

      <p className="mt-3 max-w-md text-balance text-sm text-gray-500 sm:text-base">
        Turn long, unwieldy links into short, shareable ones in a second —
        no sign-up required.
      </p>
    </section>
  )
}
