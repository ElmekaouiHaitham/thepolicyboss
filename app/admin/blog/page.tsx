'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import MarkdownEditor from '@/components/MarkdownEditor';

interface BlogFormData {
  title: string;
  excerpt: string;
  category: string;
  image: string;
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string; // markdown content
}

interface ParsedHeading {
  text: string;
  level: number;
  id: string;
}

// Parse markdown content and extract headings
function parseMarkdownHeadings(markdown: string): ParsedHeading[] {
  const headings: ParsedHeading[] = [];
  const lines = markdown.split('\n');
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    
    // Match markdown headers: # Header, ## Header, ### Header, etc.
    const h1Match = trimmed.match(/^#\s+(.+)$/);
    const h2Match = trimmed.match(/^##\s+(.+)$/);
    const h3Match = trimmed.match(/^###\s+(.+)$/);
    const h4Match = trimmed.match(/^####\s+(.+)$/);
    
    if (h1Match) {
      const text = h1Match[1];
      headings.push({ text, level: 1, id: slugify(text) });
    } else if (h2Match) {
      const text = h2Match[1];
      headings.push({ text, level: 2, id: slugify(text) });
    } else if (h3Match) {
      const text = h3Match[1];
      headings.push({ text, level: 3, id: slugify(text) });
    } else if (h4Match) {
      const text = h4Match[1];
      headings.push({ text, level: 4, id: slugify(text) });
    }
  });
  
  return headings;
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

export default function AdminBlogPage() {
  // Protection code state
  const [protectionCode, setProtectionCode] = useState('');
  const [isProtected, setIsProtected] = useState(true);
  const protectionCodeEnv = process.env.NEXT_PUBLIC_ADMIN_PROTECTION_CODE;

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    category: '',
    image: '',
  });

  // Markdown content
  const [markdownContent, setMarkdownContent] = useState('');

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep ref to the modal close button for focus management
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  // Check protection code
  useEffect(() => {
    if (protectionCode && protectionCode === protectionCodeEnv) {
      setIsProtected(false);
    } else {
      setIsProtected(true);
    }
  }, [protectionCode, protectionCodeEnv]);

  // When submitMessage opens, set focus to the close button
  useEffect(() => {
    if (submitMessage && modalCloseButtonRef.current) {
      modalCloseButtonRef.current.focus();
    }
  }, [submitMessage]);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && submitMessage) {
        setSubmitMessage(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [submitMessage]);

  // Fetch existing blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/blog');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setSubmitMessage({ type: 'error', text: 'Failed to load blogs' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        setSubmitMessage({ type: 'error', text: error.error || 'Failed to upload image' });
        return;
      }

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        image: data.url,
      }));
      setSubmitMessage({ type: 'success', text: 'Image uploaded successfully' });
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Error uploading image' });
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // When editing an existing blog, load markdown content
  const handleEditBlog = async (blog: BlogPost) => {
    setEditingSlug(blog.slug);
    
    // Fetch full blog content with markdown
    try {
      const response = await fetch(`/api/admin/blog?slug=${blog.slug}`);
      if (response.ok) {
        const data = await response.json();
        const fullBlog = data.data;
        setMarkdownContent(fullBlog.content || '');
        setFormData({
          title: fullBlog.title,
          excerpt: fullBlog.excerpt,
          category: fullBlog.category,
          image: fullBlog.image,
        });
      } else {
        // Fallback to blog data from list
        setMarkdownContent('');
        setFormData({
          title: blog.title,
          excerpt: blog.excerpt,
          category: blog.category,
          image: blog.image,
        });
      }
    } catch (error) {
      console.error('Error fetching blog content:', error);
      // Fallback to blog data from list
      setMarkdownContent('');
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,
        image: blog.image,
      });
    }
    
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setEditingSlug(null);
    setFormData({
      title: '',
      excerpt: '',
      category: '',
      image: '',
    });
    setMarkdownContent('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Validation
      if (!formData.title.trim()) {
        setSubmitMessage({ type: 'error', text: 'Title is required' });
        setIsSubmitting(false);
        return;
      }

      if (!markdownContent.trim()) {
        setSubmitMessage({ type: 'error', text: 'Content cannot be empty' });
        setIsSubmitting(false);
        return;
      }

      if (!formData.image) {
        setSubmitMessage({ type: 'error', text: 'Please upload an image' });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          category: formData.category,
          image: formData.image,
          content: markdownContent,
          slug: editingSlug || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to create blog' });
      } else {
        setSubmitMessage({ type: 'success', text: result.message || 'Saved successfully' });
        handleCancel();
        await fetchBlogs();
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An error occurred while saving the blog' });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/admin/blog?slug=${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setSubmitMessage({ type: 'error', text: 'Failed to delete blog' });
      } else {
        setSubmitMessage({ type: 'success', text: 'Blog deleted successfully' });
        await fetchBlogs();
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An error occurred while deleting the blog' });
      console.error('Error:', error);
    }
  };

  // Build headings for table of contents from markdown
  const headings = parseMarkdownHeadings(markdownContent);

  if (isProtected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="rounded-xl bg-white p-8 shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Protected Admin Area</h2>
          <p className="mb-4 text-gray-600">Enter the protection code to access blog management.</p>
          <input
            type="password"
            value={protectionCode}
            onChange={e => setProtectionCode(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 mb-4 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20"
            placeholder="Protection code"
          />
          <button
            onClick={() => setIsProtected(protectionCode !== protectionCodeEnv)}
            className="w-full rounded-lg bg-[#261538] px-6 py-3 text-lg font-semibold text-white hover:bg-[#3b205d] transition-all"
          >
            Enter
          </button>
          {protectionCode && protectionCode !== protectionCodeEnv && (
            <p className="mt-4 text-red-600 text-sm">Incorrect code. Please try again.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Submit message modal */}
      {submitMessage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={submitMessage.type === 'success' ? 'Success message' : 'Error message'}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setSubmitMessage(null)} />
          <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg z-10">
            <div className="flex items-start gap-4">
              <div>
                {submitMessage.type === 'success' ? (
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M4 10l3 3 9-9" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 9v4" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 17h.01" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${submitMessage.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {submitMessage.type === 'success' ? 'Success' : 'Error'}
                </h3>
                <p className="mt-1 text-sm text-gray-700 break-words">{submitMessage.text}</p>
              </div>

              <div className="ml-4">
                <button
                  ref={modalCloseButtonRef}
                  onClick={() => setSubmitMessage(null)}
                  className="ml-auto inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 font-heading">Admin - Blog Management</h1>
          <p className="mt-2 text-gray-600">Create and manage blog posts with Markdown</p>
        </div>


        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-heading">
                  {editingSlug ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                {editingSlug && (
                  <button
                    onClick={handleCancel}
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    Create New
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20"
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    required
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20"
                    placeholder="Brief summary of the blog post"
                  />
                </div>

                {/* Category and Image */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#261538] focus:outline-none focus:ring-2 focus:ring-[#261538]/20"
                    >
                      <option value="">Select a category</option>
                      <option value="Life Planning">Life Planning</option>
                      <option value="Insurance Tips">Insurance Tips</option>
                      <option value="Financial Wellness">Financial Wellness</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-sm font-medium"
                      >
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </button>
                      {formData.image && (
                        <span className="text-sm text-gray-600 py-2 flex-1 truncate">
                          ✓ {formData.image.split('/').pop()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div className="rounded-lg overflow-hidden border border-gray-200 h-48 relative">
                    <Image
                      src={formData.image}
                      alt="Featured image preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Markdown Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content (Markdown) *
                  </label>
                  <div className="text-xs text-gray-500 mb-2">
                    Use Markdown syntax. Headers (# ## ###) will appear in the table of contents.
                  </div>
                  <MarkdownEditor
                    value={markdownContent}
                    onChange={setMarkdownContent}
                    placeholder="Write your blog content in Markdown format..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg bg-[#261538] px-6 py-3 text-lg font-semibold text-white hover:bg-[#3b205d] focus:outline-none focus:ring-2 focus:ring-[#3b205d] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? 'Publishing...' : editingSlug ? 'Update Blog' : 'Publish Blog Post'}
                  </button>
                  {editingSlug && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 font-heading">Table of Contents</h3>
                <nav className="space-y-2 text-sm max-h-64 overflow-y-auto">
                  {headings.map((heading, idx) => (
                    <div
                      key={idx}
                      className={`${
                        heading.level === 1 ? 'font-bold text-lg' : 
                        heading.level === 2 ? 'font-semibold' : 
                        heading.level === 3 ? 'text-gray-700 ml-4' : 
                        'text-gray-600 ml-8'
                      }`}
                    >
                      {heading.text}
                    </div>
                  ))}
                </nav>
              </div>
            )}

            {/* Blog List */}
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-heading">
                Posts ({blogs.length})
              </h3>

              {isLoading ? (
                <p className="text-gray-500 text-center py-4 text-sm">Loading...</p>
              ) : blogs.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm">No blog posts yet</p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {blogs.map((blog) => (
                    <div key={blog.slug} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 group">
                      <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#261538]">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{blog.date}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="flex-1 text-xs bg-blue-100 text-blue-700 py-1 rounded hover:bg-blue-200 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.slug)}
                          className="flex-1 text-xs bg-red-100 text-red-700 py-1 rounded hover:bg-red-200 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
