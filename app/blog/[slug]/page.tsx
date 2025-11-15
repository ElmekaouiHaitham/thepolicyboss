import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { fetchBlogPost } from '@/lib/blogApi';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import TOC from '@/components/TOC';


marked.use(markedKatex({
  throwOnError: false // Good practice: doesn't crash the build on a bad formula
}));

// Helper function to strip HTML tags from text and decode entities
function stripHtml(html: string): string {
  // Strip HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  // Decode common HTML entities
  const entityMap: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'",
  };
  // Replace entities
  for (const [entity, char] of Object.entries(entityMap)) {
    text = text.replace(new RegExp(entity, 'g'), char);
  }
  // Remove any remaining entities
  text = text.replace(/&#\d+;/g, '');
  text = text.replace(/&[a-z]+;/gi, '');
  return text.trim();
}

// Helper function to create URL-friendly slug from text
function slugify(text: string | unknown): string {
  // Ensure we have a string
  let plainText: string;
  if (typeof text === 'string') {
    plainText = stripHtml(text);
  } else if (text == null) {
    plainText = '';
  } else {
    plainText = String(text);
  }
  
  return plainText
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Parse markdown content and extract only key headings for TOC (h2 and h3 only)
function parseMarkdownHeadings(markdown: string): Array<{ text: string; id: string; level: number }> {
  const headings: Array<{ text: string; id: string; level: number }> = [];
  const lines = markdown.split('\n');
  
  // Helper to extract clean text from markdown-formatted heading
  const extractCleanText = (text: string): string => {
    // Remove bold formatting
    let cleaned = text.replace(/\*\*(.+?)\*\*/g, '$1');
    // Remove italic formatting
    cleaned = cleaned.replace(/\*(.+?)\*/g, '$1');
    cleaned = cleaned.replace(/__(.+?)__/g, '$1');
    cleaned = cleaned.replace(/_(.+?)_/g, '$1');
    // Remove links, keeping just the text
    cleaned = cleaned.replace(/\[(.+?)\]\(.+?\)/g, '$1');
    // Remove inline code
    cleaned = cleaned.replace(/`(.+?)`/g, '$1');
    // Remove emojis and special characters that might be in headings
    cleaned = cleaned.replace(/[🔹🔸🟦🟧🟩📌🔢#️⃣🧩❤️⚙️🧮🔖]/g, '').trim();
    return cleaned.trim();
  };
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    
    // Only match h2 (##) and h3 (###) - these are the key structural elements
    const h2Match = trimmed.match(/^##\s+(.+)$/);
    const h3Match = trimmed.match(/^###\s+(.+)$/);
    
    if (h2Match) {
      const text = extractCleanText(h2Match[1]);
      if (text) {
        headings.push({ text, level: 2, id: slugify(text) });
      }
    } else if (h3Match) {
      const text = extractCleanText(h3Match[1]);
      if (text) {
        headings.push({ text, level: 3, id: slugify(text) });
      }
    }
  });
  
  return headings;
}

// Render markdown with heading IDs and SEO-friendly styling
function renderMarkdown(markdown: string): string {
  // Configure marked options
  const markedOptions = {
    breaks: true,
    gfm: true,
  };

  // First, render the markdown to HTML
  // marked v17 returns a string (synchronous)
  const html = marked(markdown, markedOptions) as string;
  
  // Post-process: Add IDs, SEO attributes, and custom styling to all headings
  // Match headings: <h1>...</h1>, <h2>...</h2>, etc. (with or without existing attributes)
  // Using [\s\S] instead of . with 's' flag for better compatibility
  const processedHtml = html.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h[1-6]>/gi, (match: string, level: string, attrs: string, content: string) => {
    // Extract text from HTML content (strip tags)
    const plainText = stripHtml(content);
    const id = slugify(plainText);
    const levelNum = parseInt(level);

    // Skip if ID already exists
    if (attrs && attrs.includes('id=')) {
      const existingIdMatch = attrs.match(/id="([^"]+)"/);
      const existingId = existingIdMatch ? existingIdMatch[1] : id;
      
      switch (levelNum) {
        case 2: // H2 - Main section heading (large, bold, with underline)
          return `<div class="mt-10 mb-6"><h${level} id="${existingId}" class="text-3xl font-bold text-gray-900 mb-3 font-heading scroll-mt-20 flex items-center gap-3 group">${content}<a href="#${existingId}" class="opacity-0 group-hover:opacity-100 transition-opacity text-[#6f4ba1] hover:text-[#3b205d]" aria-label="Link to ${plainText}" aria-hidden="true"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></a></h${level}><div class="h-1 w-24 bg-linear-to-r from-[#261538] via-[#3b205d] to-[#6f4ba1] rounded-full"></div></div>`;
        case 3: // H3 - Subsection heading (medium, semibold, colored)
          return `<div class="mt-8 mb-4"><h${level} id="${existingId}" class="text-2xl font-semibold text-[#3b205d] mb-2 font-heading scroll-mt-20 flex items-center gap-3 group">${content}<a href="#${existingId}" class="opacity-0 group-hover:opacity-100 transition-opacity text-[#9a7cc9] hover:text-[#261538]" aria-label="Link to ${plainText}" aria-hidden="true"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></a></h${level}><div class="h-0.5 w-16 bg-linear-to-r from-[#3b205d] to-[#9a7cc9] rounded-full"></div></div>`;
        case 4: // H4 - Small subsection (smaller, with left accent)
          return `<div class="mt-6 mb-3"><h${level} id="${existingId}" class="text-xl font-semibold text-gray-800 mb-2 font-heading scroll-mt-20 flex items-start gap-3 group">${content}<a href="#${existingId}" class="opacity-0 group-hover:opacity-100 transition-opacity text-[#9a7cc9] hover:text-[#261538] mt-0.5" aria-label="Link to ${plainText}" aria-hidden="true"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></a></h${level}></div>`;
        default: // H5, H6
          return `<h${level} id="${existingId}" class="scroll-mt-20">${content}</h${level}>`;
      }
    }
    
    // Apply styling based on heading level
    switch (levelNum) {
      case 2: // H2 - Main section heading (large, bold, with underline)
        return `<div class="mt-10 mb-6"><h${level} id="${id}" class="text-3xl font-bold text-gray-900 mb-3 font-heading scroll-mt-20 flex items-center gap-3 group">${content}<a href="#${id}" class="opacity-0 group-hover:opacity-100 transition-opacity text-[#6f4ba1] hover:text-[#3b205d]" aria-label="Link to ${plainText}" aria-hidden="true"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></a></h${level}><div class="h-1 w-24 bg-linear-to-r from-[#261538] via-[#3b205d] to-[#6f4ba1] rounded-full"></div></div>`;
      case 3: // H3 - Subsection heading (medium, semibold, colored)
        return `<div class="mt-8 mb-4"><h${level} id="${id}" class="text-2xl font-semibold text-[#3b205d] mb-2 font-heading scroll-mt-20 flex items-center gap-3 group">${content}<a href="#${id}" class="opacity-0 group-hover:opacity-100 transition-opacity text-[#9a7cc9] hover:text-[#261538]" aria-label="Link to ${plainText}" aria-hidden="true"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></a></h${level}><div class="h-0.5 w-16 bg-linear-to-r from-[#3b205d] to-[#9a7cc9] rounded-full"></div></div>`;
      case 4: // H4 - Small subsection (smaller, with left accent)
        return `<div class="mt-6 mb-3"><h${level} id="${id}" class="text-xl font-semibold text-gray-800 mb-2 font-heading scroll-mt-20 flex items-start gap-3 group">${content}<a href="#${id}" class="opacity-0 group-hover:opacity-100 transition-opacity text-[#9a7cc9] hover:text-[#261538] mt-0.5" aria-label="Link to ${plainText}" aria-hidden="true"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></a></h${level}></div>`;
      default: // H5, H6
        return `<h${level} id="${id}" class="scroll-mt-20">${content}</h${level}>`;
    }
  });

  return processedHtml;
}

export async function generateStaticParams() {
  // This will be handled dynamically now
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    return {};
  }

  const url = `https://thepolicyboss.com/blog/${slug}`;
  // Extract excerpt from markdown (first paragraph)
  const firstParagraph = post.content.split('\n\n').find(p => p.trim().length > 50) || post.excerpt;
  const excerpt = firstParagraph.substring(0, 160);

  return {
    title: post.title,
    description: excerpt,
    keywords: [
      post.category.toLowerCase(),
      'life insurance',
      'insurance tips',
      'financial planning',
    ],
    openGraph: {
      title: post.title,
      description: excerpt,
      url,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['The Policy Boss'],
      tags: [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    notFound();
  }

  const url = `https://thepolicyboss.com/blog/${slug}`;
  // Extract excerpt from markdown (first paragraph)
  const firstParagraph = post.content.split('\n\n').find(p => p.trim().length > 50) || post.excerpt;
  const excerpt = firstParagraph.substring(0, 160);
  
  // Parse markdown and generate TOC
  const toc = parseMarkdownHeadings(post.content);
  const htmlContent = renderMarkdown(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": excerpt,
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
    "mainEntity": toc.slice(0, 5).map((item) => ({
      "@type": "Question",
      "name": item.text,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": excerpt.substring(0, 200)
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
        {toc.length > 0 && <TOC items={toc} />}

        {/* Content */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div 
            className="markdown-content"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{
              lineHeight: '1.75',
            }}
          />

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
