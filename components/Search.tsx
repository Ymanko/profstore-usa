'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type ProductResult = {
  title: string;
  handle: string;
  featuredImage?: { url: string };
};

export default function Search() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      const res = await fetch(`/api/search/products?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.products || []);
    };

    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowDropdown(false);
      setQuery(''); // очищення стану
      if (inputRef.current) inputRef.current.value = ''; // очищення інпуту
    }
  };

  const handleSelect = (handle: string) => {
    router.push(`/product/${handle}`);
    setShowDropdown(false);
    setQuery('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="position-relative w-100" style={{ maxWidth: '100%' }}>
  <form onSubmit={handleSubmit} className="input-group">
  <span className="input-group-text bg-white border-end-0 rounded-start">
    <i className="bi bi-search" />
  </span>
  <input
    ref={inputRef}
    type="text"
    name="q"
    placeholder="Search for products, brands, or categories..."
    autoComplete="off"
    value={query}
    onChange={(e) => {
      setQuery(e.target.value);
      setShowDropdown(true);
    }}
    className="form-control border-start-0"
    style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
  />
 <button
  type="submit"
  className="btn px-4"
  style={{ backgroundColor: '#e9b90c', color: 'white', border: 'none' }}
>
  Find
</button>
</form>

  {showDropdown && results.length > 0 && (
    <ul
    className="dropdown-menu show w-100 mt-1 shadow-sm"
    style={{
      maxHeight: '300px',
      overflowY: 'auto',
      zIndex: 9999,
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      padding: '0.5rem',
      borderRadius: '0.5rem'
    }}
  >
    {results.map((product) => (
      <li
        key={product.handle}
        onClick={() => handleSelect(product.handle)}
        className="dropdown-item d-flex align-items-center gap-2 py-2"
        style={{ cursor: 'pointer' }}
      >
        {product.featuredImage?.url && (
          <img
            src={product.featuredImage.url}
            alt={product.title}
            style={{ height: '40px', width: '40px', objectFit: 'contain' }}
          />
        )}
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{product.title}</span>
      </li>
    ))}
  </ul>
  )}
</div>
  );
}