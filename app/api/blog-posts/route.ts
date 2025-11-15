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

const getBlogsDir = () => {
  return path.join(process.cwd(), 'data', 'blogs');
};

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

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
    
    // Sort by date, newest first
    blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return blogs;
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');

    let posts = await readBlogs();

    if (categorySlug) {
      posts = posts.filter((post) => categoryToSlug(post.category) === categorySlug);
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
  } catch (error) {
    console.error('Error retrieving blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve blog posts' },
      { status: 500 }
    );
  }
}

