import type { BlogPost } from '@/data/blogPosts';
import type { BlogSummary } from '@/types/blog';
import { getBaseUrl } from './getBaseUrl';

export async function fetchBlogSummaries(): Promise<BlogSummary[]> {
  const response = await fetch(`${await getBaseUrl()}/api/blog-posts`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load blog posts.');
  }

  const json = (await response.json()) as { data: BlogSummary[] };
  return json.data;
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const response = await fetch(`${await getBaseUrl()}/api/blog-posts/${slug}`, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load blog post with slug "${slug}".`);
  }

  const json = (await response.json()) as { data: BlogPost };
  return json.data;
}

