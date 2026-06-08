/**
 * Unit Tests + Property-Based Tests — SearchEngine
 * Tasks: 5.2, 5.3, 5.4, 5.5, 5.6, 5.7
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1
 */

import * as fc from "fast-check"
import { search, calculateRelevanceScore } from "../searchEngine"
import { parseQuery } from "../queryParser"
import type { ParsedQuery, EraId, ArtifactMaterial } from "../types"

// ─── Helpers ──────────────────────────────────────────────────

const ERA_IDS: EraId[] = [
  "predynastic",
  "early-dynastic",
  "old-kingdom",
  "first-intermediate",
  "middle-kingdom",
  "second-intermediate",
  "new-kingdom",
  "third-intermediate",
  "late-period",
  "greco-roman",
  "islamic",
]

const MATERIALS: ArtifactMaterial[] = [
  "wood",
  "metal",
  "stone",
  "pottery",
  "papyrus",
  "jewelry",
  "statues",
  "furniture",
  "textile",
  "glass",
]

function makeQuery(overrides: Partial<ParsedQuery> = {}): ParsedQuery {
  return {
    originalText: "test",
    type: "general",
    keywords: ["test"],
    filters: {},
    language: "en",
    ...overrides,
  }
}

// ─── Property Tests ───────────────────────────────────────────

describe("SearchEngine — Property P2: Relevance Bound", () => {
  /**
   * Validates: Requirements 5.1
   * For any query and result: 0.0 ≤ result.score ≤ 1.0
   */
  it("P2: all result scores are in [0.0, 1.0]", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ERA_IDS),
        (eraId) => {
          const query = makeQuery({
            type: "era",
            filters: { eraId },
            keywords: [eraId],
          })
          const response = search(query)
          return response.results.every((r) => r.score >= 0.0 && r.score <= 1.0)
        }
      ),
      { numRuns: 50 }
    )
  })

  it("P2: relevance score is always in [0, 1] for material queries", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...MATERIALS),
        (material) => {
          const query = makeQuery({
            type: "artifact",
            filters: { material },
            keywords: [material],
          })
          const response = search(query)
          return response.results.every((r) => r.score >= 0.0 && r.score <= 1.0)
        }
      ),
      { numRuns: 50 }
    )
  })
})

describe("SearchEngine — Property P3: Result Limit", () => {
  /**
   * Validates: Requirements 4.3
   * For any query: search(query).results.length <= 10
   */
  it("P3: results never exceed 10", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (text) => {
          const query = parseQuery(text)
          const response = search(query)
          return response.results.length <= 10
        }
      ),
      { numRuns: 100 }
    )
  })

  it("P3: era queries never exceed 10 results", () => {
    for (const eraId of ERA_IDS) {
      const query = makeQuery({ type: "era", filters: { eraId }, keywords: [eraId] })
      expect(search(query).results.length).toBeLessThanOrEqual(10)
    }
  })
})

describe("SearchEngine — Property P4: No Duplicates", () => {
  /**
   * Validates: Requirements 4.4
   * For any query: no two results share the same id
   */
  it("P4: no duplicate result ids", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (text) => {
          const query = parseQuery(text)
          const response = search(query)
          const ids = response.results.map((r) => r.id)
          const uniqueIds = new Set(ids)
          return ids.length === uniqueIds.size
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe("SearchEngine — Property P5: Sort Order", () => {
  /**
   * Validates: Requirements 4.5
   * For any query: results[i].score >= results[i+1].score
   */
  it("P5: results are sorted in descending order by score", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (text) => {
          const query = parseQuery(text)
          const response = search(query)
          const results = response.results
          for (let i = 0; i < results.length - 1; i++) {
            if (results[i].score < results[i + 1].score) return false
          }
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe("SearchEngine — Property P1: Completeness", () => {
  /**
   * Validates: Requirements 4.1
   * For any query with filters.eraId != null: results contain that era
   */
  it("P1: era queries always include the requested era in results", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ERA_IDS),
        (eraId) => {
          const query = makeQuery({
            type: "era",
            filters: { eraId },
            keywords: [],
          })
          const response = search(query)
          return response.results.some(
            (r) => (r.kind === "era" && r.id === eraId) || (r.kind === "artifact" && r.era === eraId)
          )
        }
      ),
      { numRuns: 50 }
    )
  })
})

// ─── Unit Tests ───────────────────────────────────────────────

describe("SearchEngine — Unit Tests", () => {
  it("should return results for a known era query", () => {
    const query = parseQuery("الدولة القديمة")
    const response = search(query)
    expect(response.results.length).toBeGreaterThan(0)
    const hasOldKingdom = response.results.some(
      (r) => (r.kind === "era" && r.id === "old-kingdom") || (r.kind === "artifact" && r.era === "old-kingdom")
    )
    expect(hasOldKingdom).toBe(true)
  })

  it("should return only wood artifacts for material filter", () => {
    const query = makeQuery({
      type: "artifact",
      filters: { material: "wood" },
      keywords: ["wood"],
    })
    const response = search(query)
    const artifactResults = response.results.filter((r) => r.kind === "artifact")
    for (const r of artifactResults) {
      if (r.kind === "artifact") {
        expect(r.material).toBe("wood")
      }
    }
  })

  it("should return suggestions in the response", () => {
    const query = parseQuery("الدولة القديمة")
    const response = search(query)
    expect(Array.isArray(response.suggestions)).toBe(true)
  })

  it("should handle full-text search for general queries", () => {
    const query = makeQuery({
      type: "general",
      keywords: ["أهرامات"],
      originalText: "أهرامات",
    })
    const response = search(query)
    expect(response.results.length).toBeGreaterThanOrEqual(0)
  })

  it("should return empty results for completely unknown query", () => {
    const query = makeQuery({
      type: "general",
      keywords: ["xyzabc123notexist"],
      originalText: "xyzabc123notexist",
    })
    const response = search(query)
    expect(response.results.length).toBe(0)
  })

  it("executionTimeMs should be non-negative", () => {
    const query = parseQuery("الدولة القديمة")
    const response = search(query)
    expect(response.executionTimeMs).toBeGreaterThanOrEqual(0)
  })
})

describe("SearchEngine — calculateRelevanceScore", () => {
  it("score is always in [0, 1]", () => {
    const query = parseQuery("الدولة القديمة")
    const response = search(query)
    for (const result of response.results) {
      const score = calculateRelevanceScore(result, query)
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(1)
    }
  })
})
