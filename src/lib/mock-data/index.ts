import type { EraRecord, ArtifactRecord } from "../chatbot/types"
import { validateEraRecords, validateArtifactRecords } from "../chatbot/schemas"
import { ERAS } from "./eras"
import { ARTIFACTS } from "./artifacts"

export interface MockDatabase {
  eras: EraRecord[]
  artifacts: ArtifactRecord[]
}

let _db: MockDatabase | null = null

/**
 * Lazy-loads the mock database and caches it in memory for the session.
 * Validates all records against Zod schemas and rejects malformed entries.
 * Subsequent calls return the cached instance without re-loading.
 */
export function loadMockDatabase(): MockDatabase {
  if (_db !== null) return _db

  const validatedEras = validateEraRecords(ERAS) as EraRecord[]
  const validatedArtifacts = validateArtifactRecords(ARTIFACTS) as ArtifactRecord[]

  _db = {
    eras: validatedEras,
    artifacts: validatedArtifacts,
  }

  return _db
}

/**
 * Returns the cached database or loads it if not yet initialized.
 */
export function getMockDatabase(): MockDatabase {
  return loadMockDatabase()
}

// Re-export raw data for direct access
export { ERAS, ARTIFACTS }
