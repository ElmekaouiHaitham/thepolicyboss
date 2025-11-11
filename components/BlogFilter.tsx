'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categories = ['Life Planning', 'Insurance Tips', 'Financial Wellness'];

// Helper function to convert category name to URL slug
function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

// Helper function to convert URL slug back to category name
function slugToCategory(slug: string): string {
  return categories.find(cat => categoryToSlug(cat) === slug) || '';
}

export default function BlogFilter() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const selectedCategory = categoryParam ? slugToCategory(categoryParam) : '';

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
          const categorySlug = categoryToSlug(category);
          const isActive = selectedCategory === category;
          return (
            <li key={category}>
              <Link
                href={`/blog?category=${categorySlug}`}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {category}
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

