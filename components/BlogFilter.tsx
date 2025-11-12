'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import type { BlogCategory } from '@/types/blog';

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

export default function BlogFilter({ categories }: { categories: BlogCategory[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';

  const selectedCategory = useMemo(() => {
    if (!categoryParam) {
      return '';
    }

    return (
      categories.find((category) => categoryToSlug(category.name) === categoryParam)
        ?.name ?? ''
    );
  }, [categories, categoryParam]);

  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
        Categories
      </h3>
      <ul className="space-y-2">
        <li>
          <Link
            href="/blog"
            className={`block px-3 py-2 rounded-lg transition-colors ${
              !selectedCategory
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            All Categories
          </Link>
        </li>
        {categories.map((category) => {
          const categorySlug = category.slug ?? categoryToSlug(category.name);
          const isActive = selectedCategory === category.name;
          return (
            <li key={categorySlug}>
              <Link
                href={`/blog?category=${categorySlug}`}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span>{category.name}</span>
                {typeof category.count === 'number' && (
                  <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    {category.count}
                  </span>
                )}
                {isActive && (
                  <span className="ml-2 text-blue-500">✓</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

