"use client"

import { useChatbot } from "@/hooks/useChatbot"
import { ChatbotTrigger } from "./ChatbotTrigger"
import { ChatbotPanel } from "./ChatbotPanel"

/**
 * ChatbotRoot — Client Component that wraps the entire chatbot UI.
 * Used in layout.tsx to avoid converting the root layout to a Client Component.
 */
export function ChatbotRoot() {
  const {
    isOpen,
    messages,
    inputValue,
    isLoading,
    activeFilter,
    handleToggle,
    handleClose,
    handleSubmit,
    handleInputChange,
    handleChipSelect,
  } = useChatbot()

  return (
    <>
      <ChatbotTrigger isOpen={isOpen} onToggle={handleToggle} />
      <ChatbotPanel
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        inputValue={inputValue}
        isLoading={isLoading}
        activeFilter={activeFilter}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onChipSelect={handleChipSelect}
      />
    </>
  )
}
