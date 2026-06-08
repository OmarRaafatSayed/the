import type { ParsedQuery, EraId, ArtifactMaterial } from "./types"

// ─── Keyword Maps ─────────────────────────────────────────────

export const ERA_KEYWORDS: Record<string, EraId> = {
  // Predynastic
  "ما قبل الأسرات": "predynastic",
  "قبل الأسرات": "predynastic",
  predynastic: "predynastic",
  "prehistoric egypt": "predynastic",

  // Early Dynastic
  "الأسرات المبكرة": "early-dynastic",
  "عصر الأسرات المبكرة": "early-dynastic",
  "early dynastic": "early-dynastic",
  "early-dynastic": "early-dynastic",

  // Old Kingdom
  "الدولة القديمة": "old-kingdom",
  "دولة قديمة": "old-kingdom",
  "old kingdom": "old-kingdom",
  "old-kingdom": "old-kingdom",
  الأهرامات: "old-kingdom",
  أهرامات: "old-kingdom",
  pyramids: "old-kingdom",

  // First Intermediate
  "الانتقال الأول": "first-intermediate",
  "عصر الانتقال الأول": "first-intermediate",
  "first intermediate": "first-intermediate",
  "first-intermediate": "first-intermediate",

  // Middle Kingdom
  "الدولة الوسطى": "middle-kingdom",
  "دولة وسطى": "middle-kingdom",
  "middle kingdom": "middle-kingdom",
  "middle-kingdom": "middle-kingdom",

  // Second Intermediate
  "الانتقال الثاني": "second-intermediate",
  "عصر الانتقال الثاني": "second-intermediate",
  الهكسوس: "second-intermediate",
  hyksos: "second-intermediate",
  "second intermediate": "second-intermediate",
  "second-intermediate": "second-intermediate",

  // New Kingdom
  "الدولة الحديثة": "new-kingdom",
  "دولة حديثة": "new-kingdom",
  "new kingdom": "new-kingdom",
  "new-kingdom": "new-kingdom",
  رمسيس: "new-kingdom",
  ramesses: "new-kingdom",
  "توت عنخ آمون": "new-kingdom",
  tutankhamun: "new-kingdom",

  // Third Intermediate
  "الانتقال الثالث": "third-intermediate",
  "عصر الانتقال الثالث": "third-intermediate",
  "third intermediate": "third-intermediate",
  "third-intermediate": "third-intermediate",

  // Late Period
  "العصر المتأخر": "late-period",
  "عصر متأخر": "late-period",
  "late period": "late-period",
  "late-period": "late-period",

  // Greco-Roman
  "اليوناني الروماني": "greco-roman",
  "العصر اليوناني": "greco-roman",
  "العصر الروماني": "greco-roman",
  البطالمة: "greco-roman",
  "greco-roman": "greco-roman",
  ptolemaic: "greco-roman",
  roman: "greco-roman",
  greek: "greco-roman",

  // Islamic
  "العصر الإسلامي": "islamic",
  "إسلامي": "islamic",
  الفاطميون: "islamic",
  الأيوبيون: "islamic",
  المماليك: "islamic",
  islamic: "islamic",
  fatimid: "islamic",
  ayyubid: "islamic",
}

export const ARTIFACT_KEYWORDS: Record<string, ArtifactMaterial> = {
  // Wood
  خشب: "wood",
  خشبي: "wood",
  خشبية: "wood",
  مشربية: "wood",
  تابوت: "wood",
  wood: "wood",
  wooden: "wood",

  // Metal
  معدن: "metal",
  معدني: "metal",
  ذهب: "metal",
  ذهبي: "metal",
  فضة: "metal",
  برونز: "metal",
  نحاس: "metal",
  metal: "metal",
  gold: "metal",
  silver: "metal",
  bronze: "metal",

  // Stone
  حجر: "stone",
  حجري: "stone",
  جرانيت: "stone",
  رخام: "stone",
  stone: "stone",
  granite: "stone",
  marble: "stone",
  limestone: "stone",

  // Pottery
  فخار: "pottery",
  فخاري: "pottery",
  خزف: "pottery",
  طين: "pottery",
  pottery: "pottery",
  ceramic: "pottery",
  clay: "pottery",

  // Papyrus
  بردي: "papyrus",
  بردية: "papyrus",
  مخطوطة: "papyrus",
  papyrus: "papyrus",
  manuscript: "papyrus",
  scroll: "papyrus",

  // Jewelry
  مجوهرات: "jewelry",
  مجوهر: "jewelry",
  قلادة: "jewelry",
  خاتم: "jewelry",
  سوار: "jewelry",
  jewelry: "jewelry",
  jewellery: "jewelry",
  necklace: "jewelry",
  ring: "jewelry",

  // Statues
  تمثال: "statues",
  تماثيل: "statues",
  نحت: "statues",
  منحوتة: "statues",
  statue: "statues",
  statues: "statues",
  sculpture: "statues",

  // Furniture
  أثاث: "furniture",
  كرسي: "furniture",
  سرير: "furniture",
  صندوق: "furniture",
  furniture: "furniture",
  chair: "furniture",
  bed: "furniture",

  // Textile
  نسيج: "textile",
  قماش: "textile",
  كتان: "textile",
  حرير: "textile",
  textile: "textile",
  fabric: "textile",
  linen: "textile",

  // Glass
  زجاج: "glass",
  زجاجي: "glass",
  زجاجية: "glass",
  glass: "glass",
  crystal: "glass",
}

export const DYNASTY_KEYWORDS: string[] = [
  "أسرة",
  "الأسرة",
  "dynasty",
  "الأولى",
  "الثانية",
  "الثالثة",
  "الرابعة",
  "الخامسة",
  "السادسة",
  "السابعة",
  "الثامنة",
  "التاسعة",
  "العاشرة",
  "الحادية عشرة",
  "الثانية عشرة",
  "الثالثة عشرة",
  "الرابعة عشرة",
  "الخامسة عشرة",
  "السادسة عشرة",
  "السابعة عشرة",
  "الثامنة عشرة",
  "التاسعة عشرة",
  "العشرون",
  "الحادية والعشرون",
  "الثانية والعشرون",
  "الثلاثون",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
  "eleventh",
  "twelfth",
  "eighteenth",
  "nineteenth",
  "twentieth",
  "thirtieth",
]

// Arabic stop words
const ARABIC_STOP_WORDS = new Set([
  "في",
  "من",
  "إلى",
  "على",
  "عن",
  "مع",
  "هذا",
  "هذه",
  "ذلك",
  "تلك",
  "هو",
  "هي",
  "هم",
  "هن",
  "أنا",
  "أنت",
  "نحن",
  "كان",
  "كانت",
  "يكون",
  "تكون",
  "قد",
  "لقد",
  "لم",
  "لن",
  "لا",
  "ما",
  "ماذا",
  "كيف",
  "أين",
  "متى",
  "لماذا",
  "و",
  "أو",
  "ثم",
  "بل",
  "لكن",
  "إن",
  "أن",
  "التي",
  "الذي",
  "الذين",
  "اللواتي",
  "كل",
  "بعض",
  "أي",
  "أيضاً",
  "أيضا",
  "جداً",
  "جدا",
  "فقط",
  "حتى",
  "بعد",
  "قبل",
  "خلال",
  "حول",
  "بين",
  "تحت",
  "فوق",
  "أمام",
  "خلف",
  "عند",
  "منذ",
  "عبر",
  "ضد",
  "رغم",
  "بسبب",
  "لأن",
  "حيث",
  "عندما",
  "بينما",
  "إذا",
  "لو",
  "كما",
  "مثل",
  "غير",
  "سوى",
  "إلا",
  "حتى",
  "بل",
  "أم",
  "أما",
  "إما",
  "ليس",
  "ليست",
  "ال",
  "ب",
  "ل",
  "ك",
  "س",
  "ف",
])

// English stop words
const ENGLISH_STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "shall",
  "can",
  "this",
  "that",
  "these",
  "those",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "what",
  "which",
  "who",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "not",
  "only",
  "same",
  "so",
  "than",
  "too",
  "very",
  "just",
  "about",
  "tell",
  "me",
  "show",
  "find",
  "search",
  "look",
])

// ─── Helper Functions ─────────────────────────────────────────

/**
 * Sanitizes text to remove HTML tags and script content to prevent XSS.
 */
export function sanitizeText(text: string): string {
  // Remove script tags and their content
  let sanitized = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
  // Remove all HTML tags
  sanitized = sanitized.replace(/<[^>]+>/g, "")
  // Remove HTML entities
  sanitized = sanitized.replace(/&[a-zA-Z0-9#]+;/g, " ")
  return sanitized
}

/**
 * Detects the language of the text.
 */
export function detectLanguage(text: string): "ar" | "en" | "mixed" {
  const arabicPattern = /[\u0600-\u06FF]/
  const englishPattern = /[a-zA-Z]/

  const hasArabic = arabicPattern.test(text)
  const hasEnglish = englishPattern.test(text)

  if (hasArabic && hasEnglish) return "mixed"
  if (hasArabic) return "ar"
  return "en"
}

/**
 * Tokenizes text into individual words.
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,،.،؟?!،;:]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1)
}

/**
 * Removes stop words from a list of tokens.
 */
export function removeStopWords(tokens: string[], language: "ar" | "en" | "mixed"): string[] {
  return tokens.filter((token) => {
    if (language === "ar") return !ARABIC_STOP_WORDS.has(token)
    if (language === "en") return !ENGLISH_STOP_WORDS.has(token)
    // mixed: remove from both sets
    return !ARABIC_STOP_WORDS.has(token) && !ENGLISH_STOP_WORDS.has(token)
  })
}

/**
 * Checks if any keyword from the map is contained in the text.
 */
function containsAny(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => text.includes(kw.toLowerCase()))
}

/**
 * Extracts dynasty number from text (e.g. "الأسرة الرابعة" → 4).
 */
function extractDynastyNumber(text: string): number | undefined {
  const arabicNumerals: Record<string, number> = {
    الأولى: 1,
    الثانية: 2,
    الثالثة: 3,
    الرابعة: 4,
    الخامسة: 5,
    السادسة: 6,
    السابعة: 7,
    الثامنة: 8,
    التاسعة: 9,
    العاشرة: 10,
    "الحادية عشرة": 11,
    "الثانية عشرة": 12,
    "الثالثة عشرة": 13,
    "الرابعة عشرة": 14,
    "الخامسة عشرة": 15,
    "السادسة عشرة": 16,
    "السابعة عشرة": 17,
    "الثامنة عشرة": 18,
    "التاسعة عشرة": 19,
    العشرون: 20,
    "الحادية والعشرون": 21,
    "الثانية والعشرون": 22,
    الثلاثون: 30,
  }

  for (const [name, num] of Object.entries(arabicNumerals)) {
    if (text.includes(name)) return num
  }

  // Try to extract English ordinals
  const englishMatch = text.match(
    /\b(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|eighteenth|nineteenth|twentieth|thirtieth)\b/i
  )
  if (englishMatch) {
    const ordinals: Record<string, number> = {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
      sixth: 6,
      seventh: 7,
      eighth: 8,
      ninth: 9,
      tenth: 10,
      eleventh: 11,
      twelfth: 12,
      eighteenth: 18,
      nineteenth: 19,
      twentieth: 20,
      thirtieth: 30,
    }
    return ordinals[englishMatch[1].toLowerCase()]
  }

  // Try numeric
  const numMatch = text.match(/\b(\d+)\b/)
  if (numMatch) return parseInt(numMatch[1], 10)

  return undefined
}

// ─── Main parseQuery Function ─────────────────────────────────

/**
 * Parses a raw text query into a structured ParsedQuery object.
 *
 * @param rawText - The raw user input text
 * @returns A ParsedQuery object with type, keywords, filters, and language
 */
export function parseQuery(rawText: string): ParsedQuery {
  // Step 0: Sanitize input
  const sanitized = sanitizeText(rawText)

  // Handle empty/whitespace-only input
  if (!sanitized.trim()) {
    return {
      originalText: rawText,
      type: "general",
      keywords: [],
      filters: {},
      language: "ar",
    }
  }

  // Step 1: Normalize text
  const normalized = sanitized.toLowerCase().trim()
  const language = detectLanguage(normalized)

  // Step 2: Extract keywords
  const tokens = tokenize(normalized)
  const keywords = removeStopWords(tokens, language)

  // Step 3: Detect query type
  let type: ParsedQuery["type"] = "general"
  let detectedEra = false
  let detectedArtifact = false
  let detectedDynasty = false

  // Check for era keywords (multi-word first)
  const eraKeywordList = Object.keys(ERA_KEYWORDS).sort((a, b) => b.length - a.length)
  if (containsAny(normalized, eraKeywordList)) {
    type = "era"
    detectedEra = true
  }

  // Check for artifact keywords
  const artifactKeywordList = Object.keys(ARTIFACT_KEYWORDS).sort((a, b) => b.length - a.length)
  if (containsAny(normalized, artifactKeywordList)) {
    if (detectedEra) {
      type = "mixed"
    } else {
      type = "artifact"
    }
    detectedArtifact = true
  }

  // Check for dynasty keywords
  if (containsAny(normalized, DYNASTY_KEYWORDS)) {
    detectedDynasty = true
    if (!detectedEra && !detectedArtifact) {
      type = "dynasty"
    }
  }

  // Step 4: Extract filters
  const filters: ParsedQuery["filters"] = {}

  // Find era ID
  for (const [keyword, eraId] of Object.entries(ERA_KEYWORDS)) {
    if (normalized.includes(keyword.toLowerCase())) {
      filters.eraId = eraId
      break
    }
  }

  // Find material
  for (const [keyword, material] of Object.entries(ARTIFACT_KEYWORDS)) {
    if (normalized.includes(keyword.toLowerCase())) {
      filters.material = material
      break
    }
  }

  // Find dynasty number
  if (detectedDynasty) {
    const dynastyNum = extractDynastyNumber(normalized)
    if (dynastyNum !== undefined) {
      filters.dynastyNumber = dynastyNum
    }
  }

  return {
    originalText: rawText,
    type,
    keywords,
    filters,
    language,
  }
}
