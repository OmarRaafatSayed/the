# خطة التنفيذ: Archaeology Chatbot

## نظرة عامة

تنفيذ شات بوت أثري تفاعلي يظهر كـ floating button ثابت في أسفل يمين الشاشة على جميع صفحات الموقع. يعمل بالكامل client-side باستخدام TypeScript مع Next.js App Router، ويبحث في بيانات mock منظمة عن العصور المصرية والآثار.

---

## Tasks

- [x] 1. إعداد الأنواع والبنية الأساسية
  - إنشاء `src/lib/chatbot/types.ts` بجميع الأنواع: `EraId`, `ArtifactMaterial`, `EraRecord`, `ArtifactRecord`, `ParsedQuery`, `SearchResponse`, `ChatMessageData`, `SearchResult`, `SearchCategory`, `FilterState`
  - إنشاء مجلدات: `src/components/chatbot/`, `src/lib/chatbot/`, `src/lib/mock-data/`, `src/hooks/`
  - _Requirements: 3.1, 3.2, 12.1, 12.2_

- [ ] 2. بناء قاعدة البيانات المحلية (MockDatabase)
  - [ ] 2.1 إنشاء `src/lib/mock-data/eras.ts`
    - كتابة بيانات `EraRecord` لجميع العصور الـ 11: `predynastic`, `early-dynastic`, `old-kingdom`, `first-intermediate`, `middle-kingdom`, `second-intermediate`, `new-kingdom`, `third-intermediate`, `late-period`, `greco-roman`, `islamic`
    - كل سجل يحتوي على: `id`, `nameAr`, `nameEn`, `startYear`, `endYear`, `dynasties[]`, `description`, `characteristics`, `keyArtifacts`, `relatedPageLink`
    - _Requirements: 12.1_

  - [x] 2.2 إنشاء `src/lib/mock-data/artifacts.ts`
    - كتابة بيانات `ArtifactRecord` تغطي جميع المواد الـ 10: `wood`, `metal`, `stone`, `pottery`, `papyrus`, `jewelry`, `statues`, `furniture`, `textile`, `glass`
    - كل سجل يحتوي على: `id`, `nameAr`, `nameEn`, `material`, `era`, `museum`, `description`, `imageUrl`, `relatedPageLink`
    - _Requirements: 12.2_

  - [ ] 2.3 إنشاء `src/lib/mock-data/index.ts`
    - دمج `eras` و `artifacts` في unified search index
    - تصدير دالة `loadMockDatabase()` للتحميل الكسول (lazy loading)
    - _Requirements: 10.1, 12.5_

  - [ ]* 2.4 كتابة unit tests لـ MockDatabase
    - التحقق من وجود جميع EraId values في البيانات
    - التحقق من وجود جميع ArtifactMaterial values في البيانات
    - _Requirements: 12.1, 12.2_

- [ ] 3. تنفيذ QueryParser
  - [ ] 3.1 إنشاء `src/lib/chatbot/queryParser.ts`
    - تعريف خرائط الكلمات المفتاحية: `ERA_KEYWORDS`, `ARTIFACT_KEYWORDS`, `DYNASTY_KEYWORDS`, `ERA_ID_MAP`, `MATERIAL_MAP`
    - تنفيذ `parseQuery(rawText: string): ParsedQuery` وفق الخوارزمية في التصميم
    - تنفيذ `detectLanguage()`, `tokenize()`, `removeStopWords()`
    - تنفيذ sanitization لإزالة HTML tags وscript content قبل المعالجة
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 9.3, 9.4, 12.4_

  - [ ]* 3.2 كتابة property test لـ QueryParser — P6
    - **Property P6: Empty Query Handling** — لأي نص فارغ أو whitespace فقط: `parseQuery(text).keywords.length === 0`
    - **Validates: Requirements 3.8, 9.1**

  - [ ]* 3.3 كتابة property test لـ QueryParser — originalText preservation
    - لأي نص عشوائي غير فارغ: `parseQuery(text).originalText === text`
    - **Validates: Requirements 3.1**

  - [ ]* 3.4 كتابة unit tests لـ QueryParser
    - اختبار تصنيف الاستعلامات: era, artifact, dynasty, mixed, general
    - اختبار اللغة العربية والإنجليزية والمختلطة
    - اختبار sanitization مع HTML وscript tags
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 9.4_

- [ ] 4. Checkpoint — التحقق من صحة البيانات والتحليل
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. تنفيذ SearchEngine
  - [ ] 5.1 إنشاء `src/lib/chatbot/searchEngine.ts`
    - تنفيذ `calculateRelevanceScore(result, query): number` وفق الأوزان المحددة في التصميم
    - تنفيذ `searchEras(query)`, `searchArtifacts(query)`, `searchDynasties(query)`, `fullTextSearch(keywords)`
    - تنفيذ `search(query: ParsedQuery): SearchResponse` مع routing حسب نوع الاستعلام
    - تنفيذ deduplication وsorting وlimiting النتائج إلى 10
    - تنفيذ `generateSuggestions(query, results): string[]`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 10.3_

  - [ ]* 5.2 كتابة property test لـ SearchEngine — P2
    - **Property P2: Relevance Bound** — لأي استعلام ونتيجة: `0.0 ≤ result.score ≤ 1.0`
    - **Validates: Requirements 5.1**

  - [ ]* 5.3 كتابة property test لـ SearchEngine — P3
    - **Property P3: Result Limit** — لأي استعلام: `search(query).results.length <= 10`
    - **Validates: Requirements 4.3**

  - [ ]* 5.4 كتابة property test لـ SearchEngine — P4
    - **Property P4: No Duplicates** — لأي استعلام: لا يوجد `results[i].id === results[j].id` حيث `i ≠ j`
    - **Validates: Requirements 4.4**

  - [ ]* 5.5 كتابة property test لـ SearchEngine — P5
    - **Property P5: Sort Order** — لأي استعلام: `∀ i < j: results[i].score >= results[j].score`
    - **Validates: Requirements 4.5**

  - [ ]* 5.6 كتابة property test لـ SearchEngine — P1
    - **Property P1: Completeness** — لأي استعلام يحتوي على `filters.eraId` غير null: يجب أن تحتوي النتائج على عصر بنفس الـ id
    - **Validates: Requirements 4.1**

  - [ ]* 5.7 كتابة unit tests لـ SearchEngine
    - اختبار البحث بـ eraId محدد
    - اختبار البحث بـ material محدد
    - اختبار full-text search
    - اختبار حالة عدم وجود نتائج
    - _Requirements: 4.1, 4.2, 4.6, 4.7_

- [ ] 6. تنفيذ ResultFormatter
  - [ ] 6.1 إنشاء `src/lib/chatbot/resultFormatter.ts`
    - تنفيذ `formatResults(response: SearchResponse): ChatMessageData`
    - معالجة حالة النتائج الفارغة: `type: "text"` مع اقتراحات بديلة
    - معالجة حالة وجود نتائج: `type: "results"` مع مصفوفة النتائج
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 6.2 كتابة unit tests لـ ResultFormatter
    - اختبار حالة النتائج الفارغة
    - اختبار حالة وجود نتائج
    - التحقق من أن `role === "assistant"` دائماً
    - _Requirements: 6.1, 6.2, 6.3_

- [ ] 7. Checkpoint — التحقق من صحة منطق البحث
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. تنفيذ Zod Validation لـ MockDatabase
  - إضافة Zod schemas لـ `EraRecord` و `ArtifactRecord` في `src/lib/chatbot/types.ts` أو ملف منفصل `src/lib/chatbot/schemas.ts`
  - تنفيذ validation عند تحميل MockDatabase ورفض السجلات المشوهة
  - _Requirements: 12.3_

- [ ] 9. تنفيذ `useChatbot` Hook
  - إنشاء `src/hooks/useChatbot.ts`
  - إدارة state: `isOpen`, `messages`, `inputValue`, `isLoading`, `activeFilter`, `queryCache`
  - تنفيذ lazy loading للـ MockDatabase عند أول فتح للـ Panel
  - تنفيذ debounce 300ms على الـ input
  - تنفيذ cache لآخر 5 استعلامات فريدة
  - تنفيذ `handleSubmit`, `handleChipSelect`, `handleClose`, `handleOpen`
  - _Requirements: 2.3, 2.5, 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 10.1, 10.2, 10.4_

- [ ] 10. بناء مكونات واجهة المستخدم
  - [ ] 10.1 إنشاء `src/components/chatbot/SearchResultCard.tsx`
    - عرض `EraResult`: الاسم بالعربية، الفترة الزمنية، عدد الأسرات، رابط الصفحة
    - عرض `ArtifactResult`: الاسم بالعربية، نوع المادة، العصر، اسم المتحف، رابط الصفحة
    - تطبيق الألوان الذهبية `#C9A84C` والخلفية الداكنة
    - _Requirements: 6.4, 6.5, 11.1, 11.2, 11.3_

  - [ ] 10.2 إنشاء `src/components/chatbot/ChatMessage.tsx`
    - عرض رسالة المستخدم (`role: "user"`) ورسالة النظام (`role: "assistant"`)
    - عرض `SearchResultCard` عند `type: "results"`
    - عرض نص عادي عند `type: "text"` أو `type: "welcome"` أو `type: "error"`
    - _Requirements: 6.3, 6.4, 6.5, 8.2, 8.3_

  - [ ] 10.3 إنشاء `src/components/chatbot/CategoryChips.tsx`
    - عرض جميع الـ 14 فئة المحددة في التصميم
    - تمييز بصري للـ chip النشط
    - معالجة toggle: إلغاء تفعيل الـ chip عند الضغط عليه مرة ثانية
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 10.4 إنشاء `src/components/chatbot/ChatInput.tsx`
    - حقل إدخال نصي مع placeholder hint
    - زرار إرسال معطل عند input فارغ
    - معالجة Enter key للإرسال
    - _Requirements: 3.8, 9.1_

  - [ ] 10.5 إنشاء `src/components/chatbot/ChatbotPanel.tsx`
    - عرض قائمة الرسائل مع auto-scroll لآخر رسالة
    - دمج `CategoryChips` و `ChatInput` و `ChatMessage`
    - تطبيق `position: fixed` مع `z-index` عالٍ
    - تطبيق CSS transition animation عند الفتح والإغلاق
    - معالجة Escape key لإغلاق الـ Panel
    - _Requirements: 2.1, 2.3, 2.4, 2.6, 6.6, 11.2, 11.3, 11.4, 11.5_

  - [ ] 10.6 إنشاء `src/components/chatbot/ChatbotTrigger.tsx`
    - زرار دائري ثابت في أسفل يمين الشاشة (`position: fixed`, `bottom-6`, `right-6`)
    - أيقونة الشات بوت مع لون ذهبي `#C9A84C`
    - `z-index` عالٍ يظهر فوق جميع محتوى الصفحة
    - Animation عند الفتح/الإغلاق
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 11.1_

  - [ ] 10.7 إنشاء `src/components/chatbot/index.ts`
    - تصدير جميع مكونات الشات بوت
    - _Requirements: 12.5_

- [ ] 11. Checkpoint — التحقق من صحة مكونات الواجهة
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. تكامل الشات بوت في Layout الرئيسي
  - [ ] 12.1 تعديل `src/app/layout.tsx`
    - استيراد `ChatbotTrigger` و `ChatbotPanel`
    - إضافة `useChatbot` hook لإدارة الـ state
    - تضمين `ChatbotTrigger` و `ChatbotPanel` داخل الـ layout ليظهرا على جميع الصفحات
    - التأكد من أن الـ floating button يظهر على الـ Home page وجميع الصفحات الأخرى
    - _Requirements: 1.1, 1.2, 1.5, 2.1, 2.2_

  - [ ] 12.2 إنشاء `src/components/chatbot/ChatbotRoot.tsx` (Client Component)
    - تغليف `useChatbot` hook مع `ChatbotTrigger` و `ChatbotPanel` في Client Component واحد
    - يُستخدم في `layout.tsx` لتجنب تحويل الـ layout إلى Client Component
    - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [ ] 13. Checkpoint النهائي — التحقق الشامل
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- المهام المُعلَّمة بـ `*` اختيارية ويمكن تخطيها للحصول على MVP أسرع
- كل مهمة تُشير إلى متطلبات محددة لضمان التتبع الكامل
- الـ Checkpoints تضمن التحقق التدريجي من صحة التنفيذ
- Property tests تتحقق من الخصائص الكونية المُعرَّفة في التصميم (P1–P6)
- Unit tests تتحقق من أمثلة وحالات حافة محددة
- **ملاحظة مهمة**: الشات بوت يُضاف كـ floating button في `layout.tsx` وليس في Navbar فقط — يظهر على جميع الصفحات بما فيها الـ Home page
- جميع الاعتماديات المطلوبة (next, react, lucide-react, @radix-ui, tailwindcss, zod) موجودة بالفعل في المشروع

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.2"] },
    { "id": 2, "tasks": ["2.3", "3.1"] },
    { "id": 3, "tasks": ["2.4", "3.2", "3.3", "3.4"] },
    { "id": 4, "tasks": ["5.1", "8"] },
    { "id": 5, "tasks": ["5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "6.1"] },
    { "id": 6, "tasks": ["6.2", "9"] },
    { "id": 7, "tasks": ["10.1", "10.2", "10.3", "10.4"] },
    { "id": 8, "tasks": ["10.5", "10.6"] },
    { "id": 9, "tasks": ["10.7"] },
    { "id": 10, "tasks": ["12.2"] },
    { "id": 11, "tasks": ["12.1"] }
  ]
}
```
