"use client"

import { MessageCircle, X } from "lucide-react"

interface ChatbotTriggerProps {
  isOpen: boolean
  onToggle: () => void
}

export function ChatbotTrigger({ isOpen, onToggle }: ChatbotTriggerProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-[10000] flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] text-black shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] active:scale-95"
      aria-label={isOpen ? "إغلاق الشات بوت" : "فتح الشات بوت"}
      aria-expanded={isOpen}
    >
      <span
        className={`absolute transition-all duration-300 ${
          isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
        }`}
      >
        <X size={22} />
      </span>
      <span
        className={`absolute transition-all duration-300 ${
          isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      >
        <MessageCircle size={22} />
      </span>
    </button>
  )
}
