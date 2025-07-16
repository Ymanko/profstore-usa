'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Collection } from '@/lib/shopify/types'

type TreeNode = Collection & { children: Collection[] }

export default function CatalogMenu() {
  const [mainMenu, setMainMenu] = useState<TreeNode[]>([])
  const [activeParentId, setActiveParentId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCollections() {
      const res = await fetch('/api/collections')
      const collections: Collection[] = await res.json()

      const map = new Map<string, TreeNode>()

      collections.forEach((item) => {
        map.set(item.id, { ...item, children: [] })
      })

      collections.forEach((item) => {
        if (item.parentId && map.has(item.parentId)) {
          map.get(item.parentId)!.children.push(map.get(item.id)!)
        }
      })

      const roots = Array.from(map.values()).filter((node) => node.parentId === null)
      setMainMenu(roots)

      console.log(
        '🧠 Главные категории:',
        roots.map((node) => ({
          title: node.title,
          children: node.children.map((c) => c.title)
        }))
      )
    }

    fetchCollections().catch((err) => console.error('❌ CatalogMenu fetch error:', err))
  }, [])

  return (
    <div className="bg-white border shadow-lg rounded py-2 min-w-[240px] z-50">
      <ul className="list-none p-0 m-0">
        {mainMenu.map((parent) => (
          <li
            key={parent.id}
            className="relative border-b border-gray-200"
            onMouseEnter={() => setActiveParentId(parent.id)}
            onMouseLeave={() => setActiveParentId(null)}
          >
            <Link
              href={parent.path}
              className="flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-100"
            >
              <span>{parent.title}</span>
              {parent.children.length > 0 && (
                <span className="ml-2 text-gray-500">›</span>
              )}
            </Link>

            {activeParentId === parent.id && parent.children.length > 0 && (
              <div className="absolute top-0 left-full bg-white border border-blue-400 shadow-lg rounded min-w-[220px] z-[9999] p-2">
                <ul className="list-none m-0 p-0">
                  {parent.children.map((child) => (
                    <li key={child.id} className="mb-1">
                      <Link
                        href={child.path}
                        className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:underline"
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
