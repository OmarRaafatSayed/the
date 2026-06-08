"use client"

import { Send } from "lucide-react"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading?: boolean
}

export function ChatInput({ value, onChange, onSubmit, isLoading = false }: ChatInputProps) {
  const isEmpty = !value.trim()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isEmpty && !isLoading) {
      onSubmit()
    }
  }

  return (
    <div className="flex items-center gap-2 border-t border-white/10 bg-[#111] px-3 py-2" dir="rtl">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اسأل عن عصر أو أثر..."
        disabled={isLoading}
        className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none text-right disabled:opacity-50"
        aria-label="حقل البحث"
        dir="rtl"
      />
      <button
        onClick={onSubmit}
        disabled={isEmpty || isLoading}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C9A84C] text-black transition-opacity disabled:opacity-30 hover:opacity-90"
        aria-label="إرسال"
      >
        <Send size={13} />
      </button>
    </div>
  )
}
