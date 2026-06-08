"use client"

import type { SearchCategory, FilterState } from "@/lib/chatbot/types"

interface CategoryChipsProps {
  onSelect: (category: SearchCategory) => void
  activeFilter: FilterState | null
}

const CATEGORIES: Array<{ label: string; category: SearchCategory }> = [
  { label: "الدولة القديمة", category: { type: "era", value: "old-kingdom" } },
  { label: "الدولة الوسطى", category: { type: "era", value: "middle-kingdom" } },
  { label: "الدولة الحديثة", category: { type: "era", value: "new-kingdom" } },
  { label: "الانتقال الأول", category: { type: "era", value: "first-intermediate" } },
  { label: "الانتقال الثاني", category: { type: "era", value: "second-intermediate" } },
  { label: "الانتقال الثالث", category: { type: "era", value: "third-intermediate" } },
  { label: "العصر المتأخر", category: { type: "era", value: "late-period" } },
  { label: "آثار خشبية", category: { type: "artifact", value: "wood" } },
  { label: "آثار معدنية", category: { type: "artifact", value: "metal" } },
  { label: "تماثيل", category: { type: "artifact", value: "statues" } },
  { label: "أثاث", category: { type: "artifact", value: "furniture" } },
  { label: "فخار", category: { type: "artifact", value: "pottery" } },
  { label: "مجوهرات", category: { type: "artifact", value: "jewelry" } },
  { label: "بردي", category: { type: "artifact", value: "papyrus" } },
]

function isActive(category: SearchCategory, activeFilter: FilterState | null): boolean {
  if (!activeFilter) return false
  return (
    activeFilter.category.type === category.type &&
    activeFilter.category.value === category.value
  )
}

export function CategoryChips({ onSelect, activeFilter }: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 px-3 py-2" dir="rtl">
      {CATEGORIES.map(({ label, category }) => {
        const active = isActive(category, activeFilter)
        return (
          <button
            key={`${category.type}-${category.value}`}
            onClick={() => onSelect(category)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
              active
                ? "bg-[#C9A84C] text-black shadow-sm"
                : "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/20"
            }`}
            aria-pressed={active}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
