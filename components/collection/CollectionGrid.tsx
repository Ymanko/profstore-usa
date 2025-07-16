'use client'

import Link from 'next/link'
import { Row, Col, Card } from 'react-bootstrap'
import type { Collection } from '@/lib/shopify/types'

export default function CollectionGrid({ children }: { children: Collection[] }) {
  if (!children || children.length === 0) return null

  return (
    <Row className="gy-4">
      {children.map((collection) => (
        <Col key={collection.id} xs={12} sm={6} md={4} lg={3}>
          <Card className="h-100 shadow-sm">
            <Link href={collection.path} passHref legacyBehavior>
              <a className="text-decoration-none text-dark">
                <Card.Img
                  variant="top"
                  src={collection.image || '/placeholder.png'} // ✅ исправлено: src как строка
                  alt={collection.title}
                  style={{ objectFit: 'cover', height: '180px' }}
                />
                <Card.Body className="text-center">
                  <Card.Title className="fs-6 fw-bold">{collection.title}</Card.Title>
                </Card.Body>
              </a>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
