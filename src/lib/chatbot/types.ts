// ============================================================
// Archaeology Chatbot — Type Definitions
// ============================================================

// ─── Era Types ───────────────────────────────────────────────

export type EraId =
  | "predynastic"
  | "early-dynastic"
  | "old-kingdom"
  | "first-intermediate"
  | "middle-kingdom"
  | "second-intermediate"
  | "new-kingdom"
  | "third-intermediate"
  | "late-period"
  | "greco-roman"
  | "islamic"

export interface Dynasty {
  number: number
  nameAr: string
  nameEn: string
  startYear: number // negative = BC
  endYear: number
  capital: string
  notableRulers: string[]
  keyEvents: string[]
}

export interface EraRecord {
  id: EraId
  nameAr: string
  nameEn: string
  startYear: number
  endYear: number
  dynasties: Dynasty[]
  description: string
  characteristics: string[]
  keyArtifacts: string[]
  relatedPageLink?: string
}

// ─── Artifact Types ──────────────────────────────────────────

export type ArtifactMaterial =
  | "wood"
  | "metal"
  | "stone"
  | "pottery"
  | "papyrus"
  | "jewelry"
  | "statues"
  | "furniture"
  | "textile"
  | "glass"

export interface ArtifactRecord {
  id: string
  nameAr: string
  nameEn: string
  material: ArtifactMaterial
  subType: string
  era: EraId
  dynasty?: number
  approximateDate: string
  museum: string
  museumLocation: string
  dimensions?: string
  condition: "excellent" | "good" | "fair" | "poor"
  description: string
  conservationNotes?: string
  imageUrl?: string
  relatedPageLink?: string
}

// ─── Query & Search Types ─────────────────────────────────────

export interface ParsedQuery {
  originalText: string
  type: "era" | "artifact" | "dynasty" | "mixed" | "general"
  keywords: string[]
  filters: {
    eraId?: EraId
    material?: ArtifactMaterial
    dynastyNumber?: number
    yearRange?: { from: number; to: number }
  }
  language: "ar" | "en" | "mixed"
}

export interface EraResult {
  kind: "era"
  id: string
  name: string
  nameAr: string
  period: string
  dynasties: Dynasty[]
  description: string
  keyFindings: string[]
  score: number
  link?: string
}

export interface ArtifactResult {
  kind: "artifact"
  id: string
  name: string
  nameAr: string
  material: ArtifactMaterial
  era: string
  museum: string
  description: string
  score: number
  imageUrl?: string
  link?: string
}

export type SearchResult = EraResult | ArtifactResult

export interface SearchResponse {
  query: ParsedQuery
  results: SearchResult[]
  totalCount: number
  suggestions: string[]
  executionTimeMs: number
}

// ─── Chat Message Types ───────────────────────────────────────

export interface ChatMessageData {
  id: string
  role: "user" | "assistant"
  content: string
  results?: SearchResult[]
  timestamp: Date
  type: "text" | "results" | "welcome" | "error"
}

// ─── Category & Filter Types ──────────────────────────────────

export type SearchCategory =
  | { type: "era"; value: EraId }
  | { type: "artifact"; value: ArtifactMaterial }
  | { type: "dynasty"; value: string }

export interface FilterState {
  category: SearchCategory
}
