# وثيقة المتطلبات: Archaeology Chatbot

## Introduction

شات بوت تفاعلي مدمج في موقع Next.js الخاص بكلية الآثار، يظهر كـ **floating button ثابت في أسفل اليمين** على جميع صفحات الموقع. يتيح للمستخدم الاستفسار عن العصور المصرية القديمة وأنواع الآثار المختلفة عبر واجهة بحث تفاعلية. يعمل الشات بوت بالكامل على جانب العميل (client-side) باستخدام بيانات mock منظمة في المرحلة الأولى، مع إمكانية التطوير لاحقاً لإضافة نموذج لغوي حقيقي.

---

## Glossary

- **Chatbot**: نظام الشات بوت الأثري — المكوّن الرئيسي للميزة
- **FloatingButton**: زرار الشات بوت الثابت في أسفل يمين الشاشة على جميع الصفحات
- **ChatbotPanel**: لوحة الشات بوت الرئيسية — overlay يظهر فوق المحتوى عند الضغط على FloatingButton
- **QueryParser**: وحدة تحليل الاستعلام النصي وتصنيفه
- **SearchEngine**: محرك البحث في قاعدة البيانات المحلية
- **ResultFormatter**: وحدة تنسيق نتائج البحث كرسائل شات
- **MockDatabase**: قاعدة البيانات المحلية التي تحتوي على بيانات العصور والآثار
- **CategoryChips**: أزرار التصفية السريعة للعصور وأنواع الآثار
- **SearchResultCard**: بطاقة عرض نتيجة بحث واحدة (عصر أو أثر)
- **ParsedQuery**: كائن الاستعلام المُحلَّل الناتج عن QueryParser
- **SearchResponse**: كائن استجابة البحث الناتج عن SearchEngine
- **ChatMessageData**: كائن بيانات رسالة الشات
- **EraRecord**: سجل عصر مصري في MockDatabase
- **ArtifactRecord**: سجل أثر في MockDatabase
- **RelevanceScore**: درجة صلة النتيجة بالاستعلام (قيمة بين 0.0 و 1.0)

---

## Requirements

### Requirement 1

**User Story:** As a site visitor, I want to find the chatbot button on every page, so that I can ask about artifacts at any time without navigating away.

#### Acceptance Criteria

1. THE Chatbot SHALL render the FloatingButton as a fixed element positioned at the bottom-right corner of the viewport on all pages of the site
2. THE FloatingButton SHALL remain visible and accessible regardless of the current page route or scroll position
3. WHEN the FloatingButton is rendered, THE Chatbot SHALL display it with the site's gold accent color `#C9A84C` consistent with the visual identity
4. THE FloatingButton SHALL have a `z-index` value high enough to appear above all other page content
5. WHEN the user is on the Home page, THE Chatbot SHALL display the FloatingButton as a standalone floating element independent of the Navbar

---

### Requirement 2

**User Story:** As a user, I want to open and close the chatbot panel easily, so that I can ask about artifacts without the panel blocking my browsing.

#### Acceptance Criteria

1. WHEN the user clicks the FloatingButton, THE Chatbot SHALL open the ChatbotPanel as an overlay above the page content
2. WHEN the ChatbotPanel is open and the user clicks the FloatingButton again, THE Chatbot SHALL close the ChatbotPanel
3. WHEN the ChatbotPanel opens for the first time, THE Chatbot SHALL display a welcome message introducing the chatbot's capabilities
4. WHEN the ChatbotPanel opens, THE Chatbot SHALL display the CategoryChips for quick filtering
5. WHEN the ChatbotPanel is closed, THE Chatbot SHALL preserve the conversation history for the current session
6. IF the user presses the Escape key while the ChatbotPanel is open, THEN THE Chatbot SHALL close the ChatbotPanel

---

### Requirement 3

**User Story:** As a user, I want the chatbot to understand my queries in Arabic and English, so that I can search in the language that suits me.

#### Acceptance Criteria

1. WHEN the user submits a query, THE QueryParser SHALL return a ParsedQuery where `originalText` equals the submitted text exactly
2. WHEN the QueryParser processes any text, THE QueryParser SHALL classify the query type as exactly one of: `"era"`, `"artifact"`, `"dynasty"`, `"mixed"`, or `"general"`
3. WHEN the QueryParser processes a text containing era keywords, THE QueryParser SHALL set the query type to `"era"` and populate `filters.eraId`
4. WHEN the QueryParser processes a text containing artifact keywords, THE QueryParser SHALL set the query type to `"artifact"` and populate `filters.material`
5. WHEN the QueryParser processes a text containing both era and artifact keywords, THE QueryParser SHALL set the query type to `"mixed"`
6. WHEN the QueryParser processes any text, THE QueryParser SHALL detect the language as exactly one of: `"ar"`, `"en"`, or `"mixed"`
7. WHEN the QueryParser processes a text, THE QueryParser SHALL remove stop words from the keywords array
8. IF the submitted query text is empty or contains only whitespace, THEN THE Chatbot SHALL prevent submission and keep the send button disabled

---

### Requirement 4

**User Story:** As a user, I want the chatbot to find accurate and relevant information about my query, so that I can learn about Egyptian eras and artifacts reliably.

#### Acceptance Criteria

1. WHEN the SearchEngine receives a ParsedQuery with a non-null `filters.eraId`, THE SearchEngine SHALL include at least one result matching that `eraId` in the SearchResponse
2. WHEN the SearchEngine receives a ParsedQuery with a non-null `filters.material`, THE SearchEngine SHALL return only ArtifactResult items where `material` matches `filters.material`
3. WHEN the SearchEngine processes any ParsedQuery, THE SearchEngine SHALL return a SearchResponse where `results.length` is less than or equal to 10
4. WHEN the SearchEngine processes any ParsedQuery, THE SearchEngine SHALL return a SearchResponse where no two results share the same `id`
5. WHEN the SearchEngine returns results, THE SearchEngine SHALL sort them in descending order by RelevanceScore such that for all adjacent results `results[i].score >= results[i+1].score`
6. WHEN the query type is `"general"` or no results are found from typed searches, THE SearchEngine SHALL perform a full-text search across all fields in MockDatabase
7. WHEN the SearchEngine processes any ParsedQuery, THE SearchEngine SHALL populate `suggestions` in the SearchResponse with alternative search terms

---

### Requirement 5

**User Story:** As a user, I want the most relevant results to appear first, so that I can find the information I'm looking for quickly.

#### Acceptance Criteria

1. WHEN the SearchEngine calculates a RelevanceScore for any result, THE SearchEngine SHALL produce a score value in the range `[0.0, 1.0]` inclusive
2. WHEN a result's `nameAr` contains the exact query text, THE SearchEngine SHALL assign that result a RelevanceScore bonus of `0.5`
3. WHEN a result's `nameAr` contains a query keyword, THE SearchEngine SHALL assign that result a RelevanceScore bonus of `0.2` per matching keyword
4. WHEN a result's `description` contains a query keyword, THE SearchEngine SHALL assign that result a RelevanceScore bonus of `0.1` per matching keyword
5. WHEN `filters.eraId` is set and a result's `era` matches it, THE SearchEngine SHALL assign that result a RelevanceScore bonus of `0.3`
6. WHEN `filters.material` is set and a result's `material` matches it, THE SearchEngine SHALL assign that result a RelevanceScore bonus of `0.3`

---

### Requirement 6

**User Story:** As a user, I want search results to be displayed clearly and organized inside the chat interface, so that I can read the information easily.

#### Acceptance Criteria

1. WHEN the ResultFormatter receives a SearchResponse, THE ResultFormatter SHALL return a ChatMessageData where `role` equals `"assistant"`
2. WHEN the SearchResponse contains zero results, THE ResultFormatter SHALL return a ChatMessageData where `type` equals `"text"` and `content` includes the original query text and alternative suggestions
3. WHEN the SearchResponse contains one or more results, THE ResultFormatter SHALL return a ChatMessageData where `type` equals `"results"` and the `results` array is populated
4. WHEN displaying an EraResult, THE SearchResultCard SHALL show the era name in Arabic, time period, dynasties count, and a link to the related page if available
5. WHEN displaying an ArtifactResult, THE SearchResultCard SHALL show the artifact name in Arabic, material type, era, museum name, and a link to the related page if available
6. WHEN new results are displayed, THE ChatbotPanel SHALL automatically scroll to the latest message

---

### Requirement 7

**User Story:** As a user, I want to browse artifacts and eras with a single click without typing, so that I can explore content quickly.

#### Acceptance Criteria

1. WHEN the ChatbotPanel opens, THE CategoryChips SHALL display all 14 predefined categories covering eras and artifact materials
2. WHEN the user selects a CategoryChip of type `"era"`, THE Chatbot SHALL execute a search with `filters.eraId` set to the chip's value and return only results from that era
3. WHEN the user selects a CategoryChip of type `"artifact"`, THE Chatbot SHALL execute a search with `filters.material` set to the chip's value and return only results of that material
4. WHEN a CategoryChip is active, THE CategoryChips SHALL visually distinguish the active chip from inactive ones
5. WHEN the user selects an already-active CategoryChip, THE Chatbot SHALL deactivate the filter and return to unfiltered results

---

### Requirement 8

**User Story:** As a user, I want to see my conversation history with the chatbot during the current session, so that I can review information I searched for earlier.

#### Acceptance Criteria

1. THE ChatbotPanel SHALL maintain a chronological list of all messages exchanged during the current session
2. WHEN a user message is submitted, THE Chatbot SHALL append a ChatMessageData with `role: "user"` to the messages list before executing the search
3. WHEN search results are ready, THE Chatbot SHALL append a ChatMessageData with `role: "assistant"` to the messages list
4. WHEN the ChatbotPanel is closed and reopened, THE Chatbot SHALL restore the full conversation history from the current session
5. THE ChatbotPanel SHALL cache the results of the last 5 unique queries and return cached results for repeated queries without re-executing the search

---

### Requirement 9

**User Story:** As a user, I want the chatbot to handle unexpected queries gracefully, so that I don't encounter technical errors that disrupt my experience.

#### Acceptance Criteria

1. IF the submitted query text is empty, THEN THE Chatbot SHALL keep the send button in a disabled state and display a placeholder hint in the input field
2. IF the SearchEngine returns zero results, THEN THE Chatbot SHALL display a message containing the original query text and at least one alternative suggestion from `response.suggestions`
3. IF the QueryParser encounters text that matches no known keywords, THEN THE QueryParser SHALL set the query type to `"general"` and proceed with full-text search without throwing an error
4. WHEN the QueryParser processes any input text, THE QueryParser SHALL sanitize the text to remove HTML tags and script content before processing to prevent XSS

---

### Requirement 10

**User Story:** As a user, I want the chatbot to respond quickly to my queries, so that I don't wait long for results.

#### Acceptance Criteria

1. WHEN the ChatbotPanel opens for the first time, THE Chatbot SHALL load the MockDatabase data lazily and store it in memory for the remainder of the session
2. WHEN the user types in the input field, THE Chatbot SHALL apply a debounce of 300 milliseconds before triggering any search operation
3. WHEN the SearchEngine executes a search, THE SearchEngine SHALL complete the operation entirely client-side without making any network requests to external APIs
4. WHEN the user submits a query identical to one of the last 5 queries, THE Chatbot SHALL return the cached SearchResponse without re-executing the search

---

### Requirement 11

**User Story:** As a user, I want the chatbot to look consistent with the site's design, so that my experience is visually coherent and comfortable.

#### Acceptance Criteria

1. THE FloatingButton SHALL use the gold accent color `#C9A84C` as its primary color
2. THE ChatbotPanel SHALL use a dark background consistent with the site's dark theme
3. THE ChatbotPanel SHALL use monospace font consistent with the site's typography
4. WHEN the ChatbotPanel opens or closes, THE Chatbot SHALL apply a CSS transition animation for smooth appearance and disappearance
5. THE ChatbotPanel SHALL use `position: fixed` with a high `z-index` to prevent layout shifts on any page

---

### Requirement 12

**User Story:** As a developer, I want the chatbot data to be well-structured and consistent, so that the code is maintainable and extensible.

#### Acceptance Criteria

1. THE MockDatabase SHALL contain EraRecord entries for all defined EraId values: `predynastic`, `early-dynastic`, `old-kingdom`, `first-intermediate`, `middle-kingdom`, `second-intermediate`, `new-kingdom`, `third-intermediate`, `late-period`, `greco-roman`, `islamic`
2. THE MockDatabase SHALL contain ArtifactRecord entries covering all defined ArtifactMaterial values: `wood`, `metal`, `stone`, `pottery`, `papyrus`, `jewelry`, `statues`, `furniture`, `textile`, `glass`
3. WHEN the MockDatabase is loaded, THE Chatbot SHALL validate all EraRecord and ArtifactRecord entries against their Zod schemas and reject malformed entries
4. THE QueryParser SHALL use the defined keyword maps (ERA_KEYWORDS, ARTIFACT_KEYWORDS, DYNASTY_KEYWORDS) to classify queries consistently
5. THE SearchEngine SHALL use the unified search index from `lib/mock-data/index.ts` as the single source of truth for all search operations
