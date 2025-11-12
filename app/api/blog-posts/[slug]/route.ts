import { NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/data/blogPosts';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return NextResponse.json(
      { error: `Blog post with slug "${slug}" not found.` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: post });
}

