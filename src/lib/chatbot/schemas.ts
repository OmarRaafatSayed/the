import { z } from "zod"

// ─── Era Schemas ──────────────────────────────────────────────

export const EraIdSchema = z.enum([
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
])

export const DynastySchema = z.object({
  number: z.number().int(),
  nameAr: z.string().min(1),
  nameEn: z.string().min(1),
  startYear: z.number().int(),
  endYear: z.number().int(),
  capital: z.string().min(1),
  notableRulers: z.array(z.string()),
  keyEvents: z.array(z.string()),
})

export const EraRecordSchema = z.object({
  id: EraIdSchema,
  nameAr: z.string().min(1),
  nameEn: z.string().min(1),
  startYear: z.number().int(),
  endYear: z.number().int(),
  dynasties: z.array(DynastySchema),
  description: z.string().min(1),
  characteristics: z.array(z.string()),
  keyArtifacts: z.array(z.string()),
  relatedPageLink: z.string().optional(),
})

// ─── Artifact Schemas ─────────────────────────────────────────

export const ArtifactMaterialSchema = z.enum([
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
])

export const ArtifactRecordSchema = z.object({
  id: z.string().min(1),
  nameAr: z.string().min(1),
  nameEn: z.string().min(1),
  material: ArtifactMaterialSchema,
  subType: z.string().min(1),
  era: EraIdSchema,
  dynasty: z.number().int().optional(),
  approximateDate: z.string().min(1),
  museum: z.string().min(1),
  museumLocation: z.string().min(1),
  dimensions: z.string().optional(),
  condition: z.enum(["excellent", "good", "fair", "poor"]),
  description: z.string().min(1),
  conservationNotes: z.string().optional(),
  imageUrl: z.string().optional(),
  relatedPageLink: z.string().optional(),
})

// ─── Validation Functions ─────────────────────────────────────

/**
 * Validates an array of EraRecord entries and returns only valid ones.
 * Logs warnings for malformed entries.
 */
export function validateEraRecords<T>(records: T[]): T[] {
  return records.filter((record) => {
    const result = EraRecordSchema.safeParse(record)
    if (!result.success) {
      console.warn("[MockDatabase] Invalid EraRecord:", result.error.flatten())
      return false
    }
    return true
  })
}

/**
 * Validates an array of ArtifactRecord entries and returns only valid ones.
 * Logs warnings for malformed entries.
 */
export function validateArtifactRecords<T>(records: T[]): T[] {
  return records.filter((record) => {
    const result = ArtifactRecordSchema.safeParse(record)
    if (!result.success) {
      console.warn("[MockDatabase] Invalid ArtifactRecord:", result.error.flatten())
      return false
    }
    return true
  })
}
