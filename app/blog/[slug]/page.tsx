import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

const blogPosts: Record<string, {
  title: string;
  category: string;
  date: string;
  content: string[];
}> = {
  '5-things-to-know-before-buying-life-insurance': {
    title: '5 Things to Know Before Buying Life Insurance',
    category: 'Life Planning',
    date: 'March 15, 2024',
    content: [
      'Buying life insurance is one of the most important financial decisions you can make. It provides peace of mind and financial security for your loved ones. However, navigating the world of life insurance can be overwhelming. Here are five essential things you should know before making a purchase.',
      '1. Understand Your Coverage Needs',
      'Before shopping for life insurance, take time to assess your financial situation. Consider your debts, mortgage, children\'s education costs, and your family\'s living expenses. A general rule of thumb is to have coverage that\'s 10-15 times your annual income, but your specific needs may vary.',
      '2. Know the Difference Between Term and Whole Life',
      'Term life insurance provides coverage for a specific period (usually 10, 20, or 30 years) and is generally more affordable. Whole life insurance provides permanent coverage and includes a cash value component that grows over time. Term life is often the better choice for most families, while whole life may be suitable for those with specific estate planning needs.',
      '3. Compare Quotes from Multiple Providers',
      'Life insurance premiums can vary significantly between providers for the same coverage. Don\'t settle for the first quote you receive. Shop around and compare rates from multiple insurance companies. Online comparison tools can help you quickly see different options.',
      '4. Be Honest on Your Application',
      'It\'s crucial to be completely honest when filling out your life insurance application. Any misrepresentation of your health, lifestyle, or medical history can result in denied claims or policy cancellation. The insurance company will verify your information through medical exams and records.',
      '5. Review Your Policy Regularly',
      'Your life insurance needs change over time. Major life events like marriage, having children, buying a home, or changing jobs may require adjusting your coverage. Review your policy annually or whenever you experience significant life changes to ensure it still meets your needs.',
      'Getting the right life insurance doesn\'t have to be complicated. By understanding these key points and working with a trusted advisor, you can find coverage that protects your family without breaking the bank.'
    ],
  },
  'how-much-coverage-do-you-really-need': {
    title: 'How Much Coverage Do You Really Need?',
    category: 'Insurance Tips',
    date: 'March 10, 2024',
    content: [
      'Determining the right amount of life insurance coverage is one of the most critical decisions you\'ll make. Too little coverage leaves your family vulnerable, while too much can strain your budget unnecessarily. Here\'s how to calculate the coverage you really need.',
      'The DIME Method',
      'One popular approach is the DIME method, which stands for Debt, Income, Mortgage, and Education. Add up your total debts, multiply your annual income by the number of years your family would need support, include your mortgage balance, and factor in future education costs for your children.',
      'The 10x Rule',
      'A simpler approach is the 10x rule: multiply your annual income by 10. For example, if you earn $50,000 per year, you\'d aim for $500,000 in coverage. This is a quick estimate, but it may not account for your specific circumstances.',
      'Consider Your Family\'s Needs',
      'Think about your family\'s unique situation. Do you have young children who will need support for many years? Are there special needs to consider? What about your spouse\'s earning potential? These factors all influence how much coverage you need.',
      'Factor in Existing Assets',
      'Don\'t forget to subtract any existing assets, savings, or other insurance policies from your total coverage needs. If you already have significant savings or investments, you may need less life insurance coverage.',
      'Review and Adjust',
      'Remember that your coverage needs will change over time. As you pay down debts, build savings, and your children grow older, you may need less coverage. Review your policy regularly and adjust as needed.',
      'The right amount of coverage is unique to your situation. Consider working with a licensed insurance professional who can help you calculate your specific needs based on your financial goals and family circumstances.'
    ],
  },
  'term-vs-whole-life-insurance': {
    title: 'The Difference Between Term and Whole Life Insurance',
    category: 'Insurance Tips',
    date: 'March 5, 2024',
    content: [
      'When shopping for life insurance, you\'ll encounter two main types: term life and whole life insurance. Understanding the differences between these options is crucial to making the right choice for your needs and budget.',
      'Term Life Insurance',
      'Term life insurance provides coverage for a specific period, typically 10, 20, or 30 years. If you die during the term, your beneficiaries receive the death benefit. If you outlive the term, the policy expires with no payout.',
      'Advantages of term life include lower premiums, simplicity, and flexibility. It\'s ideal for covering specific financial obligations like a mortgage or children\'s education. Most families find term life insurance provides the best value.',
      'Whole Life Insurance',
      'Whole life insurance provides permanent coverage that lasts your entire lifetime, as long as you pay the premiums. In addition to the death benefit, whole life policies include a cash value component that grows over time on a tax-deferred basis.',
      'The cash value can be borrowed against or withdrawn, though this reduces the death benefit. Whole life premiums are significantly higher than term life, but the policy builds equity over time.',
      'Which Should You Choose?',
      'For most people, term life insurance is the better choice. It provides substantial coverage at an affordable price, which is exactly what most families need. Term life allows you to protect your family during your peak earning years when financial obligations are highest.',
      'Whole life insurance may make sense if you have permanent coverage needs, want to build cash value, or have specific estate planning goals. However, it\'s important to understand that whole life is more expensive and the cash value growth is typically modest.',
      'The Bottom Line',
      'The best choice depends on your financial situation, goals, and budget. For most families, term life insurance provides the protection they need at a price they can afford. If you\'re unsure, speak with a licensed insurance professional who can help you evaluate your options.'
    ],
  },
  'life-insurance-for-young-adults': {
    title: 'Why Young Adults Should Consider Life Insurance',
    category: 'Life Planning',
    date: 'February 28, 2024',
    content: [
      'Many young adults think life insurance is something they don\'t need to worry about until later in life. However, getting coverage while you\'re young can provide significant advantages and peace of mind.',
      'Lower Premiums',
      'One of the biggest advantages of buying life insurance when you\'re young is lower premiums. Insurance companies base premiums largely on age and health. The younger and healthier you are, the less you\'ll pay. Locking in a low rate now can save you thousands over the life of the policy.',
      'Protecting Your Future',
      'Even if you don\'t have dependents yet, you may have student loans, credit card debt, or other financial obligations. Life insurance can ensure these debts don\'t burden your family if something happens to you. Additionally, you may have co-signed loans with parents or others who would be responsible for repayment.',
      'Health Benefits',
      'Your health is typically at its best when you\'re young. As you age, health conditions can develop that make insurance more expensive or even unattainable. Getting coverage while you\'re healthy ensures you have protection regardless of future health changes.',
      'Planning Ahead',
      'If you plan to have a family someday, getting life insurance now means you\'ll already have coverage in place when you need it most. You won\'t have to worry about qualifying for insurance when you\'re starting a family and may have less time to shop around.',
      'Building Financial Habits',
      'Starting a life insurance policy early helps build good financial habits. It demonstrates responsibility and forward thinking, and the small monthly premium is often more manageable when you\'re just starting your career.',
      'Getting started with life insurance doesn\'t have to be complicated or expensive. Even a small term life policy can provide valuable protection and peace of mind. Consider speaking with an insurance professional to explore your options.'
    ],
  },
  'understanding-life-insurance-premiums': {
    title: 'Understanding Life Insurance Premiums',
    category: 'Financial Wellness',
    date: 'February 20, 2024',
    content: [
      'Life insurance premiums can seem mysterious, but understanding how they\'re calculated can help you make better decisions and potentially save money. Here\'s what you need to know about how insurance companies determine your premium.',
      'Age and Health',
      'Your age is one of the most significant factors in determining your premium. The younger you are, the lower your premium will be. Your health status also plays a crucial role. Insurance companies evaluate your medical history, current health conditions, and lifestyle factors like smoking or high-risk activities.',
      'Coverage Amount and Type',
      'The amount of coverage you choose directly impacts your premium. More coverage means higher premiums. Additionally, the type of policy (term vs. whole life) affects cost. Term life insurance is typically much more affordable than whole life insurance for the same coverage amount.',
      'Policy Term Length',
      'For term life insurance, longer terms (like 30 years) cost more than shorter terms (like 10 years) because the insurance company is taking on risk for a longer period. However, longer terms provide more stability as your premium is locked in for the entire term.',
      'Gender and Lifestyle',
      'Statistically, women tend to live longer than men, so they typically pay lower premiums. Your lifestyle choices, including smoking, alcohol consumption, and participation in high-risk activities, can significantly increase your premiums.',
      'Family Medical History',
      'Your family\'s medical history can also influence your premium. If you have a family history of certain conditions, insurance companies may view you as higher risk and adjust your premium accordingly.',
      'Ways to Lower Your Premium',
      'There are several ways to potentially lower your life insurance premium: maintain a healthy lifestyle, quit smoking, choose term life over whole life, select an appropriate coverage amount, and compare quotes from multiple providers.',
      'Understanding how premiums are calculated empowers you to make informed decisions. Remember, the cheapest policy isn\'t always the best—focus on finding the right balance of coverage and cost for your specific needs.'
    ],
  },
  'beneficiary-designation-guide': {
    title: 'A Guide to Beneficiary Designation',
    category: 'Life Planning',
    date: 'February 15, 2024',
    content: [
      'Naming beneficiaries is one of the most important steps when setting up your life insurance policy. Your beneficiaries are the people or entities who will receive the death benefit when you pass away. Here\'s what you need to know to ensure your loved ones are properly protected.',
      'Primary vs. Contingent Beneficiaries',
      'A primary beneficiary is the first person or entity who will receive the death benefit. You can name multiple primary beneficiaries and specify what percentage each should receive. Contingent beneficiaries receive the benefit only if all primary beneficiaries are deceased or unable to receive the funds.',
      'Naming Specific Beneficiaries',
      'Be as specific as possible when naming beneficiaries. Include full legal names, dates of birth, and Social Security numbers when possible. This helps prevent confusion and delays in processing the claim. Avoid vague designations like "my children" without specifying names.',
      'Special Considerations',
      'If you want to leave money to minor children, consider setting up a trust or naming a guardian. Minors cannot directly receive life insurance proceeds, so the funds would be held in a court-supervised account until they reach adulthood. A trust provides more control and flexibility.',
      'Updating Your Beneficiaries',
      'Life changes require beneficiary updates. Marriage, divorce, birth of children, or the death of a beneficiary all warrant reviewing and updating your policy. Review your beneficiaries annually or whenever you experience major life events.',
      'Tax Implications',
      'Generally, life insurance death benefits are not taxable income for beneficiaries. However, if the policy is part of a large estate, there may be estate tax considerations. Consult with a tax professional if you have concerns about estate taxes.',
      'Keeping It Current',
      'One of the most common mistakes is forgetting to update beneficiaries after major life changes. An outdated beneficiary designation can cause the death benefit to go to an ex-spouse or someone you no longer want to benefit. Make it a habit to review your beneficiaries regularly.',
      'Proper beneficiary designation ensures your life insurance proceeds go to the right people at the right time. Take the time to carefully consider and document your choices, and don\'t forget to review them periodically.'
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {};
  }

  const url = `https://thepolicyboss.com/blog/${slug}`;
  const excerpt = post.content.find(p => p.length > 100 && !/^\d+\./.test(p)) || post.content[0];

  return {
    title: post.title,
    description: excerpt.substring(0, 160),
    keywords: [post.category.toLowerCase(), "life insurance", "insurance tips", "financial planning"],
    openGraph: {
      title: post.title,
      description: excerpt.substring(0, 160),
      url: url,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["The Policy Boss"],
      tags: [post.category],
    },
    twitter: {
      card: "summary_large_image",
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
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const url = `https://thepolicyboss.com/blog/${slug}`;
  const excerpt = post.content.find(p => p.length > 100 && !/^\d+\./.test(p)) || post.content[0];
  
  // Parse content into structured sections
  const { sections, toc } = parseContent(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": excerpt.substring(0, 160),
    "image": `https://thepolicyboss.com/blog/${slug}/og-image.jpg`,
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
            className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 mb-4"
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
            <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full" itemProp="articleSection">
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
        <div className="mb-8 h-96 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200" role="img" aria-label={`Featured image for ${post.title}`}></div>

        {/* Table of Contents */}
        {toc.length > 0 && (
          <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 font-heading flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg px-3 py-2 transition-all flex items-start gap-3 group"
                    >
                      <span className="text-blue-500 font-semibold mt-0.5 min-w-[24px] group-hover:text-blue-600">{index + 1}.</span>
                      <span className="flex-1">{item.text}</span>
                      <svg className="w-4 h-4 text-blue-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-600"
                        aria-label={`Link to ${section.text}`}
                        aria-hidden="true"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </a>
                    </HeadingTag>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>
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
          <div className="mt-12 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-l-4 border-blue-600">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
              Ready to Get Your Personalized Quote?
            </h3>
            <p className="text-gray-700 mb-4">
              Get your personalized life insurance quote in under 60 seconds. It only takes a minute.
            </p>
            <Link
              href="/#quote-form"
              className="inline-block rounded-lg bg-[#1e3a8a] px-6 py-3 text-white font-semibold hover:bg-[#2563eb] transition-colors"
            >
              Get a Quote Now
            </Link>
          </div>

          {/* Social Share */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Share this article:</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
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

