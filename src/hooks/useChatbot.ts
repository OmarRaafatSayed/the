"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { ChatMessageData, SearchCategory, FilterState } from "@/lib/chatbot/types"
import { parseQuery } from "@/lib/chatbot/queryParser"
import { search } from "@/lib/chatbot/searchEngine"
import { formatResults } from "@/lib/chatbot/resultFormatter"
import { loadMockDatabase } from "@/lib/mock-data/index"

// ─── Cache Types ──────────────────────────────────────────────

interface CacheEntry {
  key: string
  message: ChatMessageData
}

const MAX_CACHE_SIZE = 5

// ─── Welcome Message ──────────────────────────────────────────

function createWelcomeMessage(): ChatMessageData {
  return {
    id: "welcome-msg",
    role: "assistant",
    content:
      "مرحباً! أنا مساعدك الأثري. يمكنني مساعدتك في البحث عن العصور المصرية القديمة والآثار المختلفة. اكتب استفسارك أو اختر من الفئات أدناه.",
    timestamp: new Date(),
    type: "welcome",
  }
}

// ─── useChatbot Hook ──────────────────────────────────────────

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageData[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterState | null>(null)

  // Cache for last 5 unique queries
  const queryCache = useRef<CacheEntry[]>([])
  // Debounce timer
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Track if database has been loaded
  const dbLoaded = useRef(false)

  // ─── Database Lazy Loading ──────────────────────────────────

  const ensureDbLoaded = useCallback(() => {
    if (!dbLoaded.current) {
      loadMockDatabase()
      dbLoaded.current = true
    }
  }, [])

  // ─── Open / Close ───────────────────────────────────────────

  const handleOpen = useCallback(() => {
    ensureDbLoaded()
    setIsOpen(true)
    // Add welcome message if no messages yet
    setMessages((prev) => {
      if (prev.length === 0) {
        return [createWelcomeMessage()]
      }
      return prev
    })
  }, [ensureDbLoaded])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen()
    }
  }, [isOpen, handleOpen, handleClose])

  // ─── Cache Helpers ──────────────────────────────────────────

  function getCached(key: string): ChatMessageData | null {
    const entry = queryCache.current.find((e) => e.key === key)
    return entry ? entry.message : null
  }

  function setCached(key: string, message: ChatMessageData) {
    // Remove existing entry with same key
    queryCache.current = queryCache.current.filter((e) => e.key !== key)
    // Add new entry at front
    queryCache.current.unshift({ key, message })
    // Trim to max size
    if (queryCache.current.length > MAX_CACHE_SIZE) {
      queryCache.current = queryCache.current.slice(0, MAX_CACHE_SIZE)
    }
  }

  // ─── Execute Search ─────────────────────────────────────────

  const executeSearch = useCallback(
    async (text: string) => {
      if (!text.trim()) return

      ensureDbLoaded()

      const cacheKey = text.trim().toLowerCase()

      // Add user message
      const userMessage: ChatMessageData = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      // Check cache
      const cached = getCached(cacheKey)
      if (cached) {
        // Return cached result with new timestamp
        const cachedWithNewId: ChatMessageData = {
          ...cached,
          id: `cached-${Date.now()}`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, cachedWithNewId])
        setIsLoading(false)
        return
      }

      // Parse and search
      const parsed = parseQuery(text)
      const response = search(parsed)
      const assistantMessage = formatResults(response)

      // Cache the result
      setCached(cacheKey, assistantMessage)

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    },
    [ensureDbLoaded]
  )

  // ─── Submit Handler ─────────────────────────────────────────

  const handleSubmit = useCallback(
    (text?: string) => {
      const queryText = text ?? inputValue
      if (!queryText.trim()) return

      setInputValue("")
      setActiveFilter(null)
      executeSearch(queryText)
    },
    [inputValue, executeSearch]
  )

  // ─── Input Change with Debounce ─────────────────────────────

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value)

    // Clear existing debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Debounce: 300ms before any search operation
    // (actual search only happens on submit, debounce is for future live-search)
    debounceTimer.current = setTimeout(() => {
      // Reserved for live search if needed in the future
    }, 300)
  }, [])

  // ─── Category Chip Selection ────────────────────────────────

  const handleChipSelect = useCallback(
    (category: SearchCategory) => {
      // Toggle: deactivate if already active
      if (
        activeFilter &&
        activeFilter.category.type === category.type &&
        activeFilter.category.value === category.value
      ) {
        setActiveFilter(null)
        return
      }

      setActiveFilter({ category })

      // Build query text from category
      let queryText = ""
      if (category.type === "era") {
        const eraNames: Record<string, string> = {
          "old-kingdom": "الدولة القديمة",
          "middle-kingdom": "الدولة الوسطى",
          "new-kingdom": "الدولة الحديثة",
          "first-intermediate": "عصر الانتقال الأول",
          "second-intermediate": "عصر الانتقال الثاني",
          "third-intermediate": "عصر الانتقال الثالث",
          "late-period": "العصر المتأخر",
          predynastic: "عصر ما قبل الأسرات",
          "early-dynastic": "عصر الأسرات المبكرة",
          "greco-roman": "العصر اليوناني الروماني",
          islamic: "العصر الإسلامي",
        }
        queryText = eraNames[category.value] || category.value
      } else if (category.type === "artifact") {
        const materialNames: Record<string, string> = {
          wood: "آثار خشبية",
          metal: "آثار معدنية",
          stone: "آثار حجرية",
          pottery: "فخار",
          papyrus: "بردي",
          jewelry: "مجوهرات",
          statues: "تماثيل",
          furniture: "أثاث",
          textile: "منسوجات",
          glass: "زجاج",
        }
        queryText = materialNames[category.value] || category.value
      }

      if (queryText) {
        executeSearch(queryText)
      }
    },
    [activeFilter, executeSearch]
  )

  // ─── Escape Key Handler ─────────────────────────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleClose])

  // ─── Cleanup ────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return {
    isOpen,
    messages,
    inputValue,
    isLoading,
    activeFilter,
    handleOpen,
    handleClose,
    handleToggle,
    handleSubmit,
    handleInputChange,
    handleChipSelect,
  }
}
