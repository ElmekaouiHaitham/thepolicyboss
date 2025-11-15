import { NextRequest, NextResponse } from 'next/server';
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
  content: string; // markdown content
}

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

// Path to blogs directory
const getBlogsDir = () => {
  return path.join(process.cwd(), 'data', 'blogs');
};

// Ensure blogs directory exists
async function ensureBlogsDir(): Promise<void> {
  const dir = getBlogsDir();
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Read all blogs from markdown files
async function readBlogs(): Promise<BlogPost[]> {
  try {
    await ensureBlogsDir();
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

// Write a blog to markdown file
async function writeBlog(blog: BlogPost): Promise<void> {
  try {
    await ensureBlogsDir();
    const dir = getBlogsDir();
    const filePath = path.join(dir, `${blog.slug}.md`);
    
    // Create frontmatter
    const frontmatter = {
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      date: blog.date,
      image: blog.image,
    };
    
    // Write markdown file with frontmatter
    const fileContent = matter.stringify(blog.content, frontmatter);
    await fs.writeFile(filePath, fileContent, 'utf-8');
  } catch (error) {
    console.error('Error writing blog:', error);
    throw error;
  }
}

// Delete a blog markdown file
async function deleteBlog(slug: string): Promise<void> {
  try {
    const dir = getBlogsDir();
    const filePath = path.join(dir, `${slug}.md`);
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}

// POST: Create or update a blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, excerpt, category, image, content, slug: providedSlug } = body;
    
    if (!title || !excerpt || !category || !content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Missing required fields: title, excerpt, category, image, content' },
        { status: 400 }
      );
    }

    if (!content.trim()) {
      return NextResponse.json(
        { error: 'Content cannot be empty' },
        { status: 400 }
      );
    }

    // Use provided slug or generate from title
    const slug = providedSlug || generateSlug(title);
    
    // Get current date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Read existing blogs to check if slug exists
    const blogs = await readBlogs();
    const existingBlog = blogs.find((blog) => blog.slug === slug);

    const newBlog: BlogPost = {
      slug,
      title,
      excerpt,
      category,
      date: existingBlog ? existingBlog.date : date, // Keep original date if updating
      image,
      content: content.trim(),
    };

    // Write blog to markdown file
    await writeBlog(newBlog);

    return NextResponse.json(
      {
        success: true,
        message: existingBlog ? 'Blog updated successfully' : 'Blog created successfully',
        blog: newBlog,
      },
      { status: existingBlog ? 200 : 201 }
    );
  } catch (error) {
    console.error('Error creating/updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create/update blog post' },
      { status: 500 }
    );
  }
}

// GET: Retrieve all blogs or a specific blog
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    const blogs = await readBlogs();

    if (slug) {
      // Get specific blog with full content for editing
      const blog = blogs.find((b) => b.slug === slug);
      if (!blog) {
        return NextResponse.json(
          { error: `Blog with slug "${slug}" not found` },
          { status: 404 }
        );
      }
      return NextResponse.json({ data: blog });
    }

    // Get all blogs (return without content for listing)
    const blogList = blogs.map(({ content, ...rest }) => rest);
    return NextResponse.json({ data: blogList });
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve blogs' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    const blogs = await readBlogs();
    const blogExists = blogs.some((blog) => blog.slug === slug);

    if (!blogExists) {
      return NextResponse.json(
        { error: `Blog with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    await deleteBlog(slug);

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
