'use client'

import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import Link from 'next/link'
import type { Collection } from '@/lib/shopify/types'

export default function CatalogMenu({ collections }: { collections: Collection[] }) {
  const [activeParentId, setActiveParentId] = useState<string | null>(null)

  const parentCategories = collections.filter((c) => c.parentId === null)
  const childCategories = collections.filter((c) => c.parentId === activeParentId)

  return (
    <Dropdown onMouseLeave={() => setActiveParentId(null)}>
      <Dropdown.Toggle variant="warning" id="catalog-toggle">
        Каталог
      </Dropdown.Toggle>

      <Dropdown.Menu className="d-flex p-3 gap-4">
        {/* Родительские категории слева */}
        <div className="d-flex flex-column border-end pe-3">
          {parentCategories.map((parent) => (
            <div
              key={parent.id}
              className="dropdown-item fw-semibold"
              onMouseEnter={() => setActiveParentId(parent.id)}
              style={{ cursor: 'pointer' }}
            >
              {parent.title}
            </div>
          ))}
        </div>

        {/* Подкатегории справа */}
        <div className="d-flex flex-column ps-2 min-w-200">
          {childCategories.length > 0 ? (
            childCategories.map((child) => (
              <Link key={child.id} href={child.path} className="dropdown-item">
                {child.title}
              </Link>
            ))
          ) : (
            <div className="text-muted px-3 py-2">Наведи на категорию</div>
          )}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
