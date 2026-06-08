/**
 * Unit Tests — ResultFormatter (Task 6.2)
 * Requirements: 6.1, 6.2, 6.3
 */

import { formatResults } from "../resultFormatter"
import type { SearchResponse, ParsedQuery } from "../types"

function makeSearchResponse(overrides: Partial<SearchResponse> = {}): SearchResponse {
  const query: ParsedQuery = {
    originalText: "الدولة القديمة",
    type: "era",
    keywords: ["الدولة", "القديمة"],
    filters: {},
    language: "ar",
  }

  return {
    query,
    results: [],
    totalCount: 0,
    suggestions: ["الدولة الوسطى", "الدولة الحديثة"],
    executionTimeMs: 5,
    ...overrides,
  }
}

describe("ResultFormatter", () => {
  it("should always return role === 'assistant'", () => {
    const response = makeSearchResponse()
    const message = formatResults(response)
    expect(message.role).toBe("assistant")
  })

  it("should return type 'text' when no results", () => {
    const response = makeSearchResponse({ results: [], totalCount: 0 })
    const message = formatResults(response)
    expect(message.type).toBe("text")
  })

  it("should include original query text in no-results message", () => {
    const response = makeSearchResponse({ results: [], totalCount: 0 })
    const message = formatResults(response)
    expect(message.content).toContain("الدولة القديمة")
  })

  it("should include suggestions in no-results message", () => {
    const response = makeSearchResponse({
      results: [],
      suggestions: ["الدولة الوسطى", "تماثيل"],
    })
    const message = formatResults(response)
    expect(message.content).toContain("الدولة الوسطى")
  })

  it("should return type 'results' when results exist", () => {
    const response = makeSearchResponse({
      results: [
        {
          kind: "era",
          id: "old-kingdom",
          name: "Old Kingdom",
          nameAr: "الدولة القديمة",
          period: "2686 ق.م — 2181 ق.م",
          dynasties: [],
          description: "عصر الأهرامات",
          keyFindings: [],
          score: 0.8,
        },
      ],
      totalCount: 1,
    })
    const message = formatResults(response)
    expect(message.type).toBe("results")
  })

  it("should populate results array when results exist", () => {
    const mockResult = {
      kind: "era" as const,
      id: "old-kingdom",
      name: "Old Kingdom",
      nameAr: "الدولة القديمة",
      period: "2686 ق.م — 2181 ق.م",
      dynasties: [],
      description: "عصر الأهرامات",
      keyFindings: [],
      score: 0.8,
    }
    const response = makeSearchResponse({
      results: [mockResult],
      totalCount: 1,
    })
    const message = formatResults(response)
    expect(message.results).toBeDefined()
    expect(message.results!.length).toBe(1)
    expect(message.results![0].id).toBe("old-kingdom")
  })

  it("should generate a unique id for each message", () => {
    const response = makeSearchResponse()
    const msg1 = formatResults(response)
    const msg2 = formatResults(response)
    expect(msg1.id).not.toBe(msg2.id)
  })

  it("should set timestamp to current time", () => {
    const before = new Date()
    const response = makeSearchResponse()
    const message = formatResults(response)
    const after = new Date()
    expect(message.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime())
    expect(message.timestamp.getTime()).toBeLessThanOrEqual(after.getTime())
  })
})
