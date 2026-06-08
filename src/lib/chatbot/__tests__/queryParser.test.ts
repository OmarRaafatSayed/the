/**
 * Unit Tests + Property-Based Tests — QueryParser
 * Tasks: 3.2, 3.3, 3.4
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 9.1, 9.4
 */

import * as fc from "fast-check"
import { parseQuery, sanitizeText, detectLanguage } from "../queryParser"

// ─── Property Tests ───────────────────────────────────────────

describe("QueryParser — Property P6: Empty Query Handling", () => {
  /**
   * Validates: Requirements 3.8, 9.1
   * For any empty or whitespace-only text: parseQuery(text).keywords.length === 0
   */
  it("P6: empty or whitespace-only input always produces empty keywords", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^\s*$/),
        (text) => {
          const result = parseQuery(text)
          return result.keywords.length === 0
        }
      ),
      { numRuns: 100 }
    )
  })

  it("P6: empty string produces empty keywords", () => {
    expect(parseQuery("").keywords).toHaveLength(0)
  })

  it("P6: whitespace-only string produces empty keywords", () => {
    expect(parseQuery("   ").keywords).toHaveLength(0)
    expect(parseQuery("\t\n").keywords).toHaveLength(0)
  })
})

describe("QueryParser — Property: originalText preservation", () => {
  /**
   * Validates: Requirements 3.1
   * For any non-empty text: parseQuery(text).originalText === text
   */
  it("originalText always equals the submitted text exactly", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        (text) => {
          const result = parseQuery(text)
          return result.originalText === text
        }
      ),
      { numRuns: 200 }
    )
  })

  it("originalText is preserved for Arabic text", () => {
    const text = "الدولة القديمة"
    expect(parseQuery(text).originalText).toBe(text)
  })

  it("originalText is preserved for English text", () => {
    const text = "old kingdom artifacts"
    expect(parseQuery(text).originalText).toBe(text)
  })
})

// ─── Unit Tests ───────────────────────────────────────────────

describe("QueryParser — Query Type Classification", () => {
  it("should classify era queries correctly", () => {
    const result = parseQuery("الدولة القديمة")
    expect(result.type).toBe("era")
    expect(result.filters.eraId).toBe("old-kingdom")
  })

  it("should classify artifact queries correctly", () => {
    const result = parseQuery("آثار خشبية")
    expect(result.type).toBe("artifact")
    expect(result.filters.material).toBe("wood")
  })

  it("should classify mixed queries correctly", () => {
    const result = parseQuery("الدولة القديمة تماثيل")
    expect(result.type).toBe("mixed")
  })

  it("should classify dynasty queries correctly", () => {
    const result = parseQuery("الأسرة الرابعة")
    expect(result.type).toBe("dynasty")
  })

  it("should classify unknown queries as general", () => {
    const result = parseQuery("xyzabc123")
    expect(result.type).toBe("general")
  })

  it("should classify English era queries correctly", () => {
    const result = parseQuery("old kingdom")
    expect(result.type).toBe("era")
    expect(result.filters.eraId).toBe("old-kingdom")
  })

  it("should classify English artifact queries correctly", () => {
    const result = parseQuery("wooden artifacts")
    expect(result.type).toBe("artifact")
    expect(result.filters.material).toBe("wood")
  })
})

describe("QueryParser — Language Detection", () => {
  it("should detect Arabic language", () => {
    expect(parseQuery("الدولة القديمة").language).toBe("ar")
  })

  it("should detect English language", () => {
    expect(parseQuery("old kingdom").language).toBe("en")
  })

  it("should detect mixed language", () => {
    expect(parseQuery("old kingdom الأهرامات").language).toBe("mixed")
  })
})

describe("QueryParser — Sanitization (XSS Prevention)", () => {
  it("should remove HTML tags", () => {
    const result = sanitizeText("<b>الدولة القديمة</b>")
    expect(result).not.toContain("<b>")
    expect(result).not.toContain("</b>")
    expect(result).toContain("الدولة القديمة")
  })

  it("should remove script tags and content", () => {
    const result = sanitizeText('<script>alert("xss")</script>الدولة القديمة')
    expect(result).not.toContain("<script>")
    expect(result).not.toContain("alert")
    expect(result).toContain("الدولة القديمة")
  })

  it("should process sanitized text without throwing", () => {
    expect(() => parseQuery('<script>alert("xss")</script>')).not.toThrow()
    expect(() => parseQuery("<img src=x onerror=alert(1)>")).not.toThrow()
  })

  it("should set type to general for HTML-only input after sanitization", () => {
    const result = parseQuery("<b></b>")
    expect(result.type).toBe("general")
  })
})

describe("QueryParser — Stop Words Removal", () => {
  it("should remove Arabic stop words from keywords", () => {
    const result = parseQuery("ما هي الدولة القديمة")
    expect(result.keywords).not.toContain("ما")
    expect(result.keywords).not.toContain("هي")
  })

  it("should remove English stop words from keywords", () => {
    const result = parseQuery("what is the old kingdom")
    expect(result.keywords).not.toContain("what")
    expect(result.keywords).not.toContain("is")
    expect(result.keywords).not.toContain("the")
  })
})

describe("QueryParser — Type Invariant", () => {
  it("type is always one of the valid values", () => {
    const validTypes = ["era", "artifact", "dynasty", "mixed", "general"]
    const queries = [
      "الدولة القديمة",
      "تماثيل",
      "الأسرة الرابعة",
      "الدولة القديمة تماثيل",
      "random text",
      "",
      "old kingdom",
      "wooden",
    ]
    for (const q of queries) {
      expect(validTypes).toContain(parseQuery(q).type)
    }
  })

  it("language is always one of the valid values", () => {
    const validLangs = ["ar", "en", "mixed"]
    const queries = ["الدولة القديمة", "old kingdom", "الدولة old", ""]
    for (const q of queries) {
      expect(validLangs).toContain(parseQuery(q).language)
    }
  })
})
