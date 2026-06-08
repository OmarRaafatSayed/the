import type { SearchResponse, ChatMessageData } from "./types"

/**
 * Formats a SearchResponse into a ChatMessageData object for display.
 *
 * @param response - A valid SearchResponse from the SearchEngine
 * @returns ChatMessageData with role "assistant"
 */
export function formatResults(response: SearchResponse): ChatMessageData {
  const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  // No results case
  if (response.results.length === 0) {
    const queryText = response.query.originalText
    const suggestions = response.suggestions.join("، ")
    const content = suggestions
      ? `لم أجد نتائج لـ "${queryText}". جرّب البحث عن: ${suggestions}`
      : `لم أجد نتائج لـ "${queryText}". حاول استخدام كلمات مختلفة.`

    return {
      id,
      role: "assistant",
      content,
      results: [],
      timestamp: new Date(),
      type: "text",
    }
  }

  // Results found case
  return {
    id,
    role: "assistant",
    content: `وجدت ${response.results.length} نتيجة لـ "${response.query.originalText}"`,
    results: response.results,
    timestamp: new Date(),
    type: "results",
  }
}
