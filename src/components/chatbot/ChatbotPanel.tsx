"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import type { ChatMessageData, SearchCategory, FilterState } from "@/lib/chatbot/types"
import { ChatMessage } from "./ChatMessage"
import { CategoryChips } from "./CategoryChips"
import { ChatInput } from "./ChatInput"

interface ChatbotPanelProps {
  isOpen: boolean
  onClose: () => void
  messages: ChatMessageData[]
  inputValue: string
  isLoading: boolean
  activeFilter: FilterState | null
  onInputChange: (value: string) => void
  onSubmit: () => void
  onChipSelect: (category: SearchCategory) => void
}

export function ChatbotPanel({
  isOpen,
  onClose,
  messages,
  inputValue,
  isLoading,
  activeFilter,
  onInputChange,
  onSubmit,
  onChipSelect,
}: ChatbotPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Centered popup */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 z-[9999] flex flex-col overflow-hidden rounded-2xl border border-[#C9A84C]/20 bg-[#111] shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen
            ? "w-[90vw] max-w-[800px] h-[85vh] max-h-[700px] opacity-100 -translate-y-1/2 scale-100 pointer-events-auto"
            : "w-[90vw] max-w-[800px] h-[85vh] max-h-[700px] opacity-0 -translate-y-[45%] scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-label="شات بوت الآثار"
        aria-hidden={!isOpen}
      >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#C9A84C]/20 bg-[#0d0d0d] px-4 py-3" dir="rtl">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="text-sm font-semibold text-[#C9A84C] font-mono">المساعد الأثري</span>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-400 hover:text-white transition-colors"
          aria-label="إغلاق"
        >
          <X size={16} />
        </button>
      </div>

      {/* Category Chips */}
      <div className="border-b border-white/5 bg-[#0d0d0d]">
        <CategoryChips onSelect={onChipSelect} activeFilter={activeFilter} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-0">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex justify-end" dir="rtl">
            <div className="rounded-2xl rounded-tr-sm bg-[#2a2a2a] border border-white/10 px-3 py-2">
              <div className="flex gap-1 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
    </>
  )
}
