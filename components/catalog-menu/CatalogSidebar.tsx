'use client'

import Link from 'next/link'
import type { Collection } from '@/lib/shopify/types'

type Props = {
  roots: Collection[]
  active: Collection | null
  onSelect: (col: Collection) => void
}

export default function CatalogSidebar({ roots, active, onSelect }: Props) {
  return (
    <aside className="bg-white border rounded-lg shadow p-2 w-[240px]">
      <ul className="space-y-1">
        {roots.map((col) => (
          <li key={col.id}>
            <button
              type="button"
              onClick={() => onSelect(col)}
              className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm font-medium rounded hover:bg-yellow-100 transition ${
                active?.id === col.id ? 'bg-yellow-200 text-blue-900 font-semibold' : 'text-gray-800'
              }`}
            >
              <span>{col.title}</span>
              {active?.id === col.id && <span>✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
