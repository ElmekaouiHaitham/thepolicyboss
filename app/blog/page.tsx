import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import BlogFilter from '@/components/BlogFilter';
import StructuredData from '@/components/StructuredData';
import type { BlogCategory, BlogSummary } from '@/types/blog';
import { fetchBlogSummaries } from '@/lib/blogApi';

export const metadata: Metadata = {
  title: "Life Insurance Blog - Tips, Guides & Expert Advice",
  description: "Learn about life insurance, financial planning, and protecting what matters most. Expert tips, guides, and advice to help you make informed insurance decisions.",
  keywords: ["life insurance blog", "insurance tips", "life insurance guide", "financial planning", "insurance advice", "life insurance education"],
  openGraph: {
    title: "Life Insurance Blog - Tips, Guides & Expert Advice | The Policy Boss",
    description: "Learn about life insurance, financial planning, and protecting what matters most.",
    url: "https://thepolicyboss.com/blog",
  },
  alternates: {
    canonical: "https://thepolicyboss.com/blog",
  },
};

// Force dynamic rendering to handle searchParams
export const dynamic = 'force-dynamic';

function buildCategories(posts: BlogSummary[]): BlogCategory[] {
  const categoryMap = new Map<string, BlogCategory>();

  posts.forEach((post) => {
    const existing = categoryMap.get(post.category);
    if (existing) {
      existing.count = (existing.count ?? 0) + 1;
      return;
    }

    categoryMap.set(post.category, {
      name: post.category,
      slug: post.categorySlug,
      count: 1,
    });
  });

  return Array.from(categoryMap.values());
}

function slugToCategory(slug: string, categories: BlogCategory[]): string {
  return categories.find((category) => category.slug === slug)?.name ?? '';
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // Await searchParams (Next.js 15+)
  const params = await searchParams;

  const posts = await fetchBlogSummaries();
  const categories = buildCategories(posts);
  
  // Get the selected category from URL params
  const selectedCategorySlug = params?.category || '';
  const selectedCategory = selectedCategorySlug ? slugToCategory(selectedCategorySlug, categories) : '';

  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  // Breadcrumb schema for blog listing
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://thepolicyboss.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://thepolicyboss.com/blog"
      }
    ]
  };

  // CollectionPage schema for blog listing
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Life Insurance Blog",
    "description": "Learn about life insurance, financial planning, and protecting what matters most",
    "url": "https://thepolicyboss.com/blog"
  };

  return (
    <>
      <StructuredData data={[breadcrumbSchema, collectionSchema]} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl font-heading">
            Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Learn about life insurance, financial planning, and protecting what matters most
          </p>
          {selectedCategory && (
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Filtered by: {selectedCategory}
                <Link
                  href="/blog"
                  className="hover:text-blue-900"
                  aria-label="Clear filter"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Blog List */}
          <div className="lg:col-span-3">
            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl bg-white border border-gray-200 p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">No posts found in this category.</p>
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all posts →
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <div className="relative h-64">
                    <Image
                      src={post.image}
                      alt={`Featured image for ${post.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span 
                        className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full"
                        itemProp="articleSection"
                      >
                        {post.category}
                      </span>
                      <time 
                        className="text-sm text-gray-500"
                        dateTime={new Date(post.date).toISOString()}
                        itemProp="datePublished"
                      >
                        {post.date}
                      </time>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-heading">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                        itemProp="url"
                      >
                        <span itemProp="headline">{post.title}</span>
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4" itemProp="description">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center gap-2"
                    >
                      Read More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <Suspense fallback={
                <div className="rounded-2xl bg-white border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-gray-400">Loading...</div>
                  </div>
                </div>
              }>
                <BlogFilter categories={categories} />
              </Suspense>

              {/* CTA */}
              <div className="rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 p-6 text-white">
                <h3 className="text-lg font-semibold mb-3 font-heading">
                  Get Your Free Quote
                </h3>
                <p className="text-sm mb-4 text-blue-100">
                  Ready to protect what matters most? Get a personalized quote in under 60 seconds.
                </p>
                <Link
                  href="/#quote-form"
                  className="block text-center rounded-lg bg-white px-4 py-2 text-blue-600 font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

