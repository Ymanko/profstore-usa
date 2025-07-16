'use client'

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import CatalogDropdown from './catalog-menu/CatalogDropdown' // <-- заменили импорт

export default function CatalogButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ position: 'relative', zIndex: 50 }}
    >
      <Button
        className="d-flex align-items-center gap-2 w-100 justify-content-center text-center"
        style={{
          color: '#e9b90c',
          border: '2px solid #e9b90c',
          borderRadius: '8px',
          fontWeight: '500',
          backgroundColor: 'transparent',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#e9b90c"
          viewBox="0 0 24 24"
        >
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
        Catalog
      </Button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            zIndex: 9999,
            minWidth: '250px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '10px',
          }}
        >
          <CatalogDropdown /> {/* <-- рендерим новое всплывающее меню */}
        </div>
      )}
    </div>
  )
}
