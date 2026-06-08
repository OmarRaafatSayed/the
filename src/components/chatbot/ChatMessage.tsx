"use client"

import type { ChatMessageData } from "@/lib/chatbot/types"
import { SearchResultCard } from "./SearchResultCard"

interface ChatMessageProps {
  message: ChatMessageData
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  if (isUser) {
    return (
      <div className="flex justify-start" dir="rtl">
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[#C9A84C]/20 border border-[#C9A84C]/30 px-3 py-2">
          <p className="text-sm text-gray-100 text-right">{message.content}</p>
        </div>
      </div>
    )
  }

  // Assistant messages
  if (message.type === "results" && message.results && message.results.length > 0) {
    return (
      <div className="flex justify-end" dir="rtl">
        <div className="w-full max-w-full space-y-2">
          <p className="text-xs text-gray-400 text-right px-1">{message.content}</p>
          {message.results.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </div>
      </div>
    )
  }

  // Text / welcome / error messages
  return (
    <div className="flex justify-end" dir="rtl">
      <div
        className={`max-w-[85%] rounded-2xl rounded-tr-sm px-3 py-2 ${
          message.type === "welcome"
            ? "bg-[#C9A84C]/10 border border-[#C9A84C]/20"
            : message.type === "error"
              ? "bg-red-900/20 border border-red-500/30"
              : "bg-[#2a2a2a] border border-white/10"
        }`}
      >
        <p className="text-sm text-gray-200 text-right leading-relaxed">{message.content}</p>
      </div>
    </div>
  )
}
