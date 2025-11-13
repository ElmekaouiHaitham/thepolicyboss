import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { getBlogPostBySlug, getBlogPosts } from '@/data/blogPosts';
import { fetchBlogPost } from '@/lib/blogApi';

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const url = `https://thepolicyboss.com/blog/${slug}`;
  const excerpt =
    post.content.find((paragraph) => paragraph.length > 100 && !/^\d+\./.test(paragraph)) ??
    post.content[0];

  return {
    title: post.title,
    description: excerpt.substring(0, 160),
    keywords: [
      post.category.toLowerCase(),
      'life insurance',
      'insurance tips',
      'financial planning',
    ],
    openGraph: {
      title: post.title,
      description: excerpt.substring(0, 160),
      url,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['The Policy Boss'],
      tags: [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt.substring(0, 160),
    },
    alternates: {
      canonical: url,
    },
  };
}

// Helper function to create URL-friendly slug from text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to identify if a line is a heading
function isHeading(line: string, index: number, allLines: string[]): boolean {
  // Lines starting with numbers (1., 2., etc.)
  if (/^\d+\.\s/.test(line)) {
    return true;
  }
  
  // Short lines that are likely headings (less than 60 chars, not ending with period)
  if (line.length < 60 && !line.endsWith('.') && line.length > 5) {
    // Check if next line is a paragraph (longer text)
    const nextLine = allLines[index + 1];
    if (nextLine && nextLine.length > 100) {
      return true;
    }
  }
  
  return false;
}

// Parse content into structured sections
function parseContent(content: string[]) {
  const sections: Array<{ type: 'intro' | 'heading' | 'paragraph'; text: string; id?: string; level?: number }> = [];
  const toc: Array<{ text: string; id: string; level: number }> = [];
  
  let introAdded = false;
  
  for (let i = 0; i < content.length; i++) {
    const line = content[i];
    
    if (isHeading(line, i, content)) {
      // Remove number prefix if present (e.g., "1. Heading" -> "Heading")
      const headingText = line.replace(/^\d+\.\s*/, '');
      const id = slugify(headingText);
      const level = /^\d+\.\s/.test(line) ? 2 : 2; // Main headings are H2
      
      sections.push({
        type: 'heading',
        text: headingText,
        id,
        level,
      });
      
      toc.push({
        text: headingText,
        id,
        level,
      });
    } else if (!introAdded && line.length > 100) {
      // First long paragraph is the intro
      sections.push({
        type: 'intro',
        text: line,
      });
      introAdded = true;
    } else {
      // Regular paragraph
      sections.push({
        type: 'paragraph',
        text: line,
      });
    }
  }
  
  return { sections, toc };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    notFound();
  }

  const url = `https://thepolicyboss.com/blog/${slug}`;
  const excerpt =
    post.content.find((paragraph) => paragraph.length > 100 && !/^\d+\./.test(paragraph)) ??
    post.content[0];
  
  // Parse content into structured sections
  const { sections, toc } = parseContent(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": excerpt.substring(0, 160),
    "image": post.image,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "The Policy Boss",
      "url": "https://thepolicyboss.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thepolicyboss.com/logo.png"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Policy Boss",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thepolicyboss.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": post.category,
    "keywords": post.category
  };

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": url
      }
    ]
  };

  // Add FAQ schema if applicable (for better SEO)
  const faqSchema = toc.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": toc.slice(0, 5).map((item, index) => ({
      "@type": "Question",
      "name": item.text,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": sections.find(s => s.id === item.id && s.type === 'paragraph')?.text || excerpt.substring(0, 200)
      }
    }))
  } : null;

  const structuredDataArray: any[] = [articleSchema, breadcrumbSchema];
  if (faqSchema) {
    structuredDataArray.push(faqSchema);
  }

  return (
    <>
      <StructuredData data={structuredDataArray} />
      <main className="min-h-screen bg-gray-50 py-12">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" itemScope itemType="https://schema.org/BlogPosting">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-[#3b205d] hover:text-[#261538] inline-flex items-center gap-2 mb-4"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 text-sm font-semibold text-[#3b205d] bg-[#f3ecff] rounded-full" itemProp="articleSection">
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
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl font-heading" itemProp="headline">
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="relative mb-8 h-96 overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={`Featured image for ${post.title}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>

        {/* Table of Contents */}
        {toc.length > 0 && (
          <div className="mb-8 rounded-2xl bg-linear-to-br from-[#faf7ff] to-[#f3ecff] border border-[#e4d4ff] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 font-heading flex items-center gap-2">
              <svg className="w-5 h-5 text-[#261538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Table of Contents
            </h2>
            <nav aria-label="Article table of contents">
              <ol className="space-y-3">
                {toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-[#261538] hover:text-[#3b205d] hover:bg-[#f5efff] rounded-lg px-3 py-2 transition-all flex items-start gap-3 group"
                    >
                      <span className="text-[#6f4ba1] font-semibold mt-0.5 min-w-[24px] group-hover:text-[#3b205d]">{index + 1}.</span>
                      <span className="flex-1">{item.text}</span>
                      <svg className="w-4 h-4 text-[#9a7cc9] mt-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}

        {/* Content */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="prose prose-lg max-w-none" itemProp="articleBody">
            {sections.map((section, index) => {
              if (section.type === 'intro') {
                return (
                  <div key={index} className="mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                      {section.text}
                    </p>
                    <hr className="border-gray-200 my-8" />
                  </div>
                );
              }
              
              if (section.type === 'heading') {
                const HeadingTag = section.level === 2 ? 'h2' : 'h3';
                return (
                  <div key={index} className="mt-12 mb-6">
                    <HeadingTag
                      id={section.id}
                      className="text-2xl font-semibold text-gray-900 mb-4 font-heading scroll-mt-20 flex items-center gap-3 group"
                    >
                      <span>{section.text}</span>
                      <a
                        href={`#${section.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#6f4ba1] hover:text-[#3b205d]"
                        aria-label={`Link to ${section.text}`}
                        aria-hidden="true"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </a>
                    </HeadingTag>
                    <div className="h-1 w-20 bg-linear-to-r from-[#3b205d] to-[#7c57b3] rounded-full"></div>
                  </div>
                );
              }
              
              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base">
                  {section.text}
                </p>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-12 rounded-lg bg-linear-to-r from-[#faf7ff] to-[#f3ecff] p-6 border-l-4 border-[#261538]">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
              Ready to Get Your Personalized Quote?
            </h3>
            <p className="text-gray-700 mb-4">
              Get your personalized life insurance quote in under 60 seconds. It only takes a minute.
            </p>
            <Link
              href="/#quote-form"
              className="inline-block rounded-lg bg-[#261538] px-6 py-3 text-white font-semibold hover:bg-[#3b205d] transition-colors"
            >
              Get a Quote Now
            </Link>
          </div>

          {/* Social Share */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Share this article:</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#261538] text-white hover:bg-[#3b205d] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
    </>
  );
}

