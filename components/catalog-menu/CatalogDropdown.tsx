'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Collection } from '@/lib/shopify/types'
import { Card, ListGroup } from 'react-bootstrap'

type TreeNode = Collection & { children: Collection[] }

export default function CatalogDropdown() {
  const [menuTree, setMenuTree] = useState<TreeNode[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCollections() {
      try {
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
        setMenuTree(roots)
      } catch (err) {
        console.error('❌ Dropdown fetch error:', err)
      }
    }

    fetchCollections()
  }, [])

  return (
    <Card style={{ width: '240px', position: 'relative', zIndex: 999 }}>
      <ListGroup variant="flush">
        {menuTree.map((parent) => (
          <ListGroup.Item
            key={parent.id}
            onMouseEnter={() => setActiveId(parent.id)}
            onMouseLeave={() => setActiveId(null)}
            style={{ position: 'relative' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <Link href={parent.path} className="text-dark text-decoration-none">
                {parent.title}
              </Link>
              {parent.children.length > 0 && (
                <span className="text-muted">&rsaquo;</span>
              )}
            </div>

            {/* Вложенное меню — подкатегории */}
            {activeId === parent.id && parent.children.length > 0 && (
  <Card
    style={{
      position: 'absolute',
      top: 0,
      left: '100%',
      marginLeft: 8,
      width: 220,
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: 8,
    }}
  >
    <ListGroup variant="flush">
      {parent.children.map((child) => (
        <ListGroup.Item key={child.id} style={{ padding: '8px 12px' }}>
          <Link href={child.path} className="text-dark text-decoration-none">
            {child.title}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Card>
)}

          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  )
}
