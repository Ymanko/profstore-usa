'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import {
  Navbar,
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button
} from 'react-bootstrap'

import LogoSquare from '@/components/logo-square'
import Search, { SearchSkeleton } from './search'
import CartModal from '@/components/cart/modal'
import MobileMenu from './mobile-menu'
import CatalogButton from '@/components/catalog-button'
import type { Collection } from '@/lib/shopify/types'

const { SITE_NAME } = process.env

export default function MainNavbar() {
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    fetch('/api/collections')
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.error('❌ Collections fetch error:', err))
  }, [])

  const buildTree = (
    items: Collection[]
  ): Array<Collection & { children: Collection[] }> => {
    const map = new Map<string, Collection & { children: Collection[] }>()
    items.forEach(item => map.set(item.id, { ...item, children: [] }))
    items.forEach(item => {
      const node = map.get(item.id)!
      if (item.parentId && map.has(item.parentId)) {
        map.get(item.parentId)!.children.push(node)
      }
    })
    return Array.from(map.values()).filter(node => node.parentId === null)
  }

  const tree = buildTree(collections)

  return (
    <Navbar expand="md" bg="white" className="py-3 border-bottom shadow-sm z-50">
      <Container fluid>
        <Row className="align-items-center w-100">
          {/* 🔰 Логотип */}
          <Col xs={12} md={2} className="text-center text-md-start mb-3 mb-md-0">
            <Link href="/" passHref legacyBehavior>
              <Navbar.Brand className="d-flex align-items-center gap-2">
                <LogoSquare />
                <span className="text-uppercase fw-bold d-none d-lg-block">{SITE_NAME}</span>
              </Navbar.Brand>
            </Link>
          </Col>

          {/* 🧭 Навигация: Каталог, Поиск, Корзина */}
          <Col xs={12} md={10}>
            <Row className="align-items-center gy-3">
              {/* 📂 Каталог */}
              <Col xs={12} md={3}>
                <CatalogButton />
              </Col>

              {/* 🔍 Поиск */}
              <Col xs={12} md={6}>
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </Col>

              {/* 🛒 Корзина */}
              <Col xs={12} md={3} className="text-end">
                <CartModal />
              </Col>
            </Row>

            {/* 🧼 Удалено: NavDropdown — больше не используется */}
          </Col>
        </Row>

        {/* 📱 Мобильное меню */}
        <Row className="d-md-none mt-3">
          <Suspense fallback={null}>
            <MobileMenu menu={tree} />
          </Suspense>
        </Row>
      </Container>
    </Navbar>
  )
}
