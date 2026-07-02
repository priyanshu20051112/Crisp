import { useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlineCheckCircle, HiOutlineClipboard, HiOutlineClipboardCheck } from 'react-icons/hi'

export default function ResultCard({ shortUrl }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 1800)
    } catch {
      toast.error('Could not copy — copy it manually instead.')
    }
  }

  return (
    <div className="animate-fade-in-up rounded-xl border border-green-200 bg-green-50 p-4">
      <div className="mb-3 flex items-center gap-2 text-green-700">
        <HiOutlineCheckCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">Your short link is ready!</p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 pl-3 shadow-sm">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 truncate text-sm font-medium text-brand-600 hover:underline"
        >
          {shortUrl}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5
            text-xs font-medium text-white transition-all duration-150 ease-out
            hover:bg-gray-800 hover:shadow-sm active:scale-[0.97]"
        >
          {copied ? (
            <>
              <HiOutlineClipboardCheck className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <HiOutlineClipboard className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  )
}
