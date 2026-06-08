import type {
  ParsedQuery,
  SearchResponse,
  SearchResult,
  EraResult,
  ArtifactResult,
  EraRecord,
  ArtifactRecord,
} from "./types"
import { getMockDatabase } from "../mock-data/index"

// ─── Relevance Scoring ────────────────────────────────────────

/**
 * Calculates a relevance score for a search result against a query.
 * Score is always in the range [0.0, 1.0].
 */
export function calculateRelevanceScore(result: SearchResult, query: ParsedQuery): number {
  let score = 0.0
  const originalLower = query.originalText.toLowerCase()

  // Exact name match → highest weight (+0.5)
  if (result.nameAr.toLowerCase().includes(originalLower)) {
    score += 0.5
  }

  // Keyword matches in name (+0.2 per keyword)
  for (const keyword of query.keywords) {
    if (result.nameAr.toLowerCase().includes(keyword.toLowerCase())) {
      score += 0.2
    }
    // Keyword matches in description (+0.1 per keyword)
    if (result.description.toLowerCase().includes(keyword.toLowerCase())) {
      score += 0.1
    }
  }

  // Filter match bonuses
  if (query.filters.eraId) {
    if (result.kind === "era" && result.id === query.filters.eraId) {
      score += 0.3
    }
    if (result.kind === "artifact" && result.era === query.filters.eraId) {
      score += 0.3
    }
  }

  if (query.filters.material) {
    if (result.kind === "artifact" && result.material === query.filters.material) {
      score += 0.3
    }
  }

  // Normalize to [0, 1]
  return Math.min(score, 1.0)
}

// ─── Conversion Helpers ───────────────────────────────────────

function eraRecordToResult(era: EraRecord, score = 0): EraResult {
  return {
    kind: "era",
    id: era.id,
    name: era.nameEn,
    nameAr: era.nameAr,
    period: `${Math.abs(era.startYear)} ${era.startYear < 0 ? "ق.م" : "م"} — ${Math.abs(era.endYear)} ${era.endYear < 0 ? "ق.م" : "م"}`,
    dynasties: era.dynasties,
    description: era.description,
    keyFindings: era.keyArtifacts,
    score,
    link: era.relatedPageLink,
  }
}

function artifactRecordToResult(artifact: ArtifactRecord, score = 0): ArtifactResult {
  return {
    kind: "artifact",
    id: artifact.id,
    name: artifact.nameEn,
    nameAr: artifact.nameAr,
    material: artifact.material,
    era: artifact.era,
    museum: artifact.museum,
    description: artifact.description,
    score,
    imageUrl: artifact.imageUrl,
    link: artifact.relatedPageLink,
  }
}

// ─── Search Functions ─────────────────────────────────────────

/**
 * Searches eras based on the parsed query.
 */
export function searchEras(query: ParsedQuery): EraResult[] {
  const db = getMockDatabase()
  let candidates = db.eras

  // Apply era filter if present
  if (query.filters.eraId) {
    candidates = candidates.filter((era) => era.id === query.filters.eraId)
  }

  // Apply dynasty filter if present
  if (query.filters.dynastyNumber !== undefined) {
    candidates = candidates.filter((era) =>
      era.dynasties.some((d) => d.number === query.filters.dynastyNumber)
    )
  }

  // Full-text filter on remaining candidates
  if (query.keywords.length > 0) {
    candidates = candidates.filter((era) => {
      const searchText = [
        era.nameAr,
        era.nameEn,
        era.description,
        ...era.dynasties.map((d) => d.nameAr),
        ...era.dynasties.map((d) => d.nameEn),
        ...era.characteristics,
        ...era.keyArtifacts,
      ]
        .join(" ")
        .toLowerCase()

      return query.keywords.some((kw) => searchText.includes(kw.toLowerCase()))
    })
  }

  return candidates.map((era) => eraRecordToResult(era))
}

/**
 * Searches artifacts based on the parsed query.
 */
export function searchArtifacts(query: ParsedQuery): ArtifactResult[] {
  const db = getMockDatabase()
  let candidates = db.artifacts

  // Apply material filter if present
  if (query.filters.material) {
    candidates = candidates.filter((a) => a.material === query.filters.material)
  }

  // Apply era filter if present
  if (query.filters.eraId) {
    candidates = candidates.filter((a) => a.era === query.filters.eraId)
  }

  // Full-text filter on remaining candidates
  if (query.keywords.length > 0) {
    candidates = candidates.filter((artifact) => {
      const searchText = [
        artifact.nameAr,
        artifact.nameEn,
        artifact.description,
        artifact.museum,
        artifact.subType,
        artifact.material,
      ]
        .join(" ")
        .toLowerCase()

      return query.keywords.some((kw) => searchText.includes(kw.toLowerCase()))
    })
  }

  return candidates.map((artifact) => artifactRecordToResult(artifact))
}

/**
 * Searches dynasties based on the parsed query.
 */
export function searchDynasties(query: ParsedQuery): EraResult[] {
  const db = getMockDatabase()
  let candidates = db.eras

  if (query.filters.dynastyNumber !== undefined) {
    candidates = candidates.filter((era) =>
      era.dynasties.some((d) => d.number === query.filters.dynastyNumber)
    )
  } else if (query.keywords.length > 0) {
    candidates = candidates.filter((era) =>
      era.dynasties.some((d) => {
        const dynastyText = [d.nameAr, d.nameEn, ...d.notableRulers, ...d.keyEvents]
          .join(" ")
          .toLowerCase()
        return query.keywords.some((kw) => dynastyText.includes(kw.toLowerCase()))
      })
    )
  }

  return candidates.map((era) => eraRecordToResult(era))
}

/**
 * Performs a full-text search across all fields in the database.
 */
export function fullTextSearch(keywords: string[]): SearchResult[] {
  if (keywords.length === 0) return []

  const db = getMockDatabase()
  const results: SearchResult[] = []

  // Search eras
  for (const era of db.eras) {
    const searchText = [
      era.nameAr,
      era.nameEn,
      era.description,
      ...era.characteristics,
      ...era.keyArtifacts,
      ...era.dynasties.flatMap((d) => [d.nameAr, d.nameEn, ...d.notableRulers, ...d.keyEvents]),
    ]
      .join(" ")
      .toLowerCase()

    if (keywords.some((kw) => searchText.includes(kw.toLowerCase()))) {
      results.push(eraRecordToResult(era))
    }
  }

  // Search artifacts
  for (const artifact of db.artifacts) {
    const searchText = [
      artifact.nameAr,
      artifact.nameEn,
      artifact.description,
      artifact.museum,
      artifact.subType,
      artifact.material,
    ]
      .join(" ")
      .toLowerCase()

    if (keywords.some((kw) => searchText.includes(kw.toLowerCase()))) {
      results.push(artifactRecordToResult(artifact))
    }
  }

  return results
}

/**
 * Deduplicates results by id.
 */
function deduplicate(results: SearchResult[]): SearchResult[] {
  const seen = new Set<string>()
  return results.filter((r) => {
    if (seen.has(r.id)) return false
    seen.add(r.id)
    return true
  })
}

/**
 * Generates search suggestions based on the query and results.
 */
export function generateSuggestions(query: ParsedQuery, results: SearchResult[]): string[] {
  const suggestions: string[] = []

  // If no results, suggest related eras
  if (results.length === 0) {
    suggestions.push("الدولة القديمة", "الدولة الوسطى", "الدولة الحديثة")
    suggestions.push("آثار خشبية", "تماثيل", "مجوهرات")
  } else {
    // Suggest related eras from results
    const eras = results
      .filter((r): r is EraResult => r.kind === "era")
      .map((r) => r.nameAr)
      .slice(0, 2)
    suggestions.push(...eras)

    // Suggest related materials from artifact results
    const materials = results
      .filter((r): r is ArtifactResult => r.kind === "artifact")
      .map((r) => {
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
        return materialNames[r.material] || r.material
      })
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 2)
    suggestions.push(...materials)
  }

  // Remove duplicates and limit to 5
  return [...new Set(suggestions)].slice(0, 5)
}

// ─── Main Search Function ─────────────────────────────────────

/**
 * Executes a search based on the parsed query and returns a SearchResponse.
 *
 * @param query - A valid ParsedQuery object
 * @returns SearchResponse with results, suggestions, and metadata
 */
export function search(query: ParsedQuery): SearchResponse {
  const startTime = Date.now()
  let results: SearchResult[] = []

  // Route to appropriate search function based on query type
  // ALWAYS search artifacts first (primary results)
  const artifactResults = searchArtifacts(query)
  results = [...results, ...artifactResults]

  // Only add era results if explicitly searching for era information AND no artifacts found
  if ((query.type === "era" || query.type === "dynasty") && artifactResults.length === 0) {
    const eraResults = searchEras(query)
    results = [...results, ...eraResults]
  }

  // Fall back to full-text search if no results or general query
  if (query.type === "general" || results.length === 0) {
    const generalResults = fullTextSearch(query.keywords)
    results = [...results, ...generalResults]
  }

  // Score all results
  results = results.map((result) => ({
    ...result,
    score: calculateRelevanceScore(result, query),
  }))

  // Sort by relevance score (descending)
  results.sort((a, b) => b.score - a.score)

  // Deduplicate
  results = deduplicate(results)

  // Generate suggestions
  const suggestions = generateSuggestions(query, results)

  // Limit to 10 results
  const limitedResults = results.slice(0, 10)

  return {
    query,
    results: limitedResults,
    totalCount: results.length,
    suggestions,
    executionTimeMs: Date.now() - startTime,
  }
}
