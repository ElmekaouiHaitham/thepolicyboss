import { NextResponse } from 'next/server';
import {
  categoryToSlug,
  getBlogPosts,
  slugToCategory,
} from '@/data/blogPosts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get('category');

  let posts = getBlogPosts();

  if (categorySlug) {
    const category = slugToCategory(categorySlug);
    posts = category
      ? posts.filter((post) => post.category === category)
      : [];
  }

  return NextResponse.json({
    data: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      categorySlug: categoryToSlug(post.category),
      date: post.date,
      image: post.image,
    })),
  });
}

