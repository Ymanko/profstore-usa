'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Collection } from '@/lib/shopify/types'
import CollectionGrid from '@/components/collection/CollectionGrid'

export default function CollectionPage({ params }: { params: { handle: string } }) {
  const [parent, setParent] = useState<Collection | null>(null)
  const [children, setChildren] = useState<Collection[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/collections/${params.handle}`)
      if (!res.ok) return

      const data: { parent: Collection; children: Collection[] } = await res.json()
      setParent(data.parent)
      setChildren(data.children)
    }

    fetchData()
  }, [params.handle])

  if (!parent) return <p className="text-muted py-5 text-center">Загрузка категории...</p>

  return (
    <section className="container py-4">
      {/* 🍞 Хлебные крошки */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Главная</Link></li>
          <li className="breadcrumb-item"><Link href="/catalog">Каталог</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{parent.title}</li>
        </ol>
      </nav>

      {/* 🏷️ Заголовок */}git add .
git commit -m "Refactor: moved CollectionPage from app to components"

      <h1 className="fs-3 fw-bold mb-3">{parent.title}</h1>

      {/* 📝 Описание категории */}
      {parent.description && (
        <p className="text-muted mb-4">{parent.description}</p>
      )}

      {/* 🧩 Список подкатегорий */}
      {children.length > 0 ? (
        <CollectionGrid children={children} />
      ) : (
        <p className="text-muted">Нет подкатегорий</p>
      )}
    </section>
  )
}
