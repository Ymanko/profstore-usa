'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = inputRef.current?.value;

    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        ref={inputRef}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        autoFocus
        className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}

// 🔄 Skeleton-компонент для fallback
export function SearchSkeleton() {
  return (
    <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-neutral-800" />
  );
}