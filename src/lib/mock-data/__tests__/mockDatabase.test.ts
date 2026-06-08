/**
 * Unit Tests — MockDatabase (Task 2.4)
 * Requirements: 12.1, 12.2
 */

import { ERAS } from "../eras"
import { ARTIFACTS } from "../artifacts"
import { loadMockDatabase } from "../index"
import type { EraId, ArtifactMaterial } from "../../chatbot/types"

const ALL_ERA_IDS: EraId[] = [
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

const ALL_MATERIALS: ArtifactMaterial[] = [
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

describe("MockDatabase — EraRecords", () => {
  it("should contain all 11 EraId values", () => {
    const eraIds = ERAS.map((e) => e.id)
    for (const id of ALL_ERA_IDS) {
      expect(eraIds).toContain(id)
    }
  })

  it("should have exactly 11 era records", () => {
    expect(ERAS).toHaveLength(11)
  })

  it("each era should have required fields", () => {
    for (const era of ERAS) {
      expect(era.id).toBeTruthy()
      expect(era.nameAr).toBeTruthy()
      expect(era.nameEn).toBeTruthy()
      expect(typeof era.startYear).toBe("number")
      expect(typeof era.endYear).toBe("number")
      expect(Array.isArray(era.dynasties)).toBe(true)
      expect(era.description).toBeTruthy()
      expect(Array.isArray(era.characteristics)).toBe(true)
      expect(Array.isArray(era.keyArtifacts)).toBe(true)
    }
  })
})

describe("MockDatabase — ArtifactRecords", () => {
  it("should contain all 10 ArtifactMaterial values", () => {
    const materials = ARTIFACTS.map((a) => a.material)
    for (const material of ALL_MATERIALS) {
      expect(materials).toContain(material)
    }
  })

  it("each artifact should have required fields", () => {
    for (const artifact of ARTIFACTS) {
      expect(artifact.id).toBeTruthy()
      expect(artifact.nameAr).toBeTruthy()
      expect(artifact.nameEn).toBeTruthy()
      expect(artifact.material).toBeTruthy()
      expect(artifact.era).toBeTruthy()
      expect(artifact.museum).toBeTruthy()
      expect(artifact.description).toBeTruthy()
    }
  })

  it("all artifact era references should be valid EraIds", () => {
    for (const artifact of ARTIFACTS) {
      expect(ALL_ERA_IDS).toContain(artifact.era)
    }
  })
})

describe("MockDatabase — loadMockDatabase", () => {
  it("should return a database with eras and artifacts", () => {
    const db = loadMockDatabase()
    expect(db.eras.length).toBeGreaterThan(0)
    expect(db.artifacts.length).toBeGreaterThan(0)
  })

  it("should return the same instance on subsequent calls (lazy loading)", () => {
    const db1 = loadMockDatabase()
    const db2 = loadMockDatabase()
    expect(db1).toBe(db2)
  })
})
