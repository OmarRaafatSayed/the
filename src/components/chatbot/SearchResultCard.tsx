"use client"

import Link from "next/link"
import type { SearchResult, EraResult, ArtifactResult } from "@/lib/chatbot/types"

interface SearchResultCardProps {
  result: SearchResult
  accentColor?: string
}

const MATERIAL_LABELS: Record<string, string> = {
  wood: "خشب",
  metal: "معدن",
  stone: "حجر",
  pottery: "فخار",
  papyrus: "بردي",
  jewelry: "مجوهرات",
  statues: "تماثيل",
  furniture: "أثاث",
  textile: "منسوجات",
  glass: "زجاج",
}

const ERA_LABELS: Record<string, string> = {
  predynastic: "ما قبل الأسرات",
  "early-dynastic": "الأسرات المبكرة",
  "old-kingdom": "الدولة القديمة",
  "first-intermediate": "الانتقال الأول",
  "middle-kingdom": "الدولة الوسطى",
  "second-intermediate": "الانتقال الثاني",
  "new-kingdom": "الدولة الحديثة",
  "third-intermediate": "الانتقال الثالث",
  "late-period": "العصر المتأخر",
  "greco-roman": "اليوناني الروماني",
  islamic: "الإسلامي",
}

function EraCard({ result }: { result: EraResult }) {
  return (
    <div
      className="rounded-lg border border-[#C9A84C]/30 bg-[#1a1a1a] p-3 text-right"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h4 className="font-semibold text-[#C9A84C] text-sm">{result.nameAr}</h4>
          <p className="text-xs text-gray-400 mt-0.5">{result.period}</p>
        </div>
        <span className="shrink-0 rounded bg-[#C9A84C]/10 px-1.5 py-0.5 text-[10px] text-[#C9A84C]">
          عصر
        </span>
      </div>

      <p className="mt-2 text-xs text-gray-300 line-clamp-2">{result.description}</p>

      {result.dynasties.length > 0 && (
        <p className="mt-1.5 text-xs text-gray-500">
          {result.dynasties.length} أسرة حاكمة
        </p>
      )}

      {result.link && (
        <Link
          href={result.link}
          className="mt-2 inline-block text-xs text-[#C9A84C] hover:underline"
        >
          عرض الصفحة ←
        </Link>
      )}
    </div>
  )
}

function ArtifactCard({ result }: { result: ArtifactResult }) {
  return (
    <div
      className="rounded-lg border border-[#C9A84C]/30 bg-[#1a1a1a] p-3 text-right"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h4 className="font-semibold text-[#C9A84C] text-sm">{result.nameAr}</h4>
          <p className="text-xs text-gray-400 mt-0.5">
            {MATERIAL_LABELS[result.material] || result.material} •{" "}
            {ERA_LABELS[result.era] || result.era}
          </p>
        </div>
        <span className="shrink-0 rounded bg-[#C9A84C]/10 px-1.5 py-0.5 text-[10px] text-[#C9A84C]">
          أثر
        </span>
      </div>

      <p className="mt-2 text-xs text-gray-300 line-clamp-2">{result.description}</p>

      <p className="mt-1.5 text-xs text-gray-500">📍 {result.museum}</p>

      {result.link && (
        <Link
          href={result.link}
          className="mt-2 inline-block text-xs text-[#C9A84C] hover:underline"
        >
          عرض الصفحة ←
        </Link>
      )}
    </div>
  )
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  if (result.kind === "era") {
    return <EraCard result={result} />
  }
  return <ArtifactCard result={result} />
}
