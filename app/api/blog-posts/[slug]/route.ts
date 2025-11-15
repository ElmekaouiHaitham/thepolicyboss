import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string;
}

interface RouteParams {
  params: Promise<{ slug: string }>;
}

const getBlogsDir = () => {
  return path.join(process.cwd(), 'data', 'blogs');
};

async function readBlogs(): Promise<BlogPost[]> {
  try {
    const dir = getBlogsDir();
    const files = await fs.readdir(dir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    const blogs: BlogPost[] = [];
    
    for (const file of mdFiles) {
      try {
        const filePath = path.join(dir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        blogs.push({
          slug: data.slug || path.basename(file, '.md'),
          title: data.title || '',
          excerpt: data.excerpt || '',
          category: data.category || '',
          date: data.date || new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          image: data.image || '',
          content: content.trim(),
        });
      } catch (error) {
        console.error(`Error reading blog file ${file}:`, error);
      }
    }
    
    return blogs;
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

export async function GET(_: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const blogs = await readBlogs();
    const post = blogs.find((b) => b.slug === slug);

    if (!post) {
      return NextResponse.json(
        { error: `Blog post with slug "${slug}" not found.` },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: post });
  } catch (error) {
    console.error('Error retrieving blog post:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve blog post' },
      { status: 500 }
    );
  }
}

