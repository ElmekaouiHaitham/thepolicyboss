/**
 * Markdown utilities for parsing frontmatter and content
 * Supports YAML frontmatter format for blog metadata
 */

export interface BlogMetadata {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug?: string;
}

export interface ParsedBlog {
  metadata: BlogMetadata;
  content: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Parse markdown content with YAML frontmatter
 * Format:
 * ---
 * title: Blog Title
 * excerpt: Short excerpt
 * category: Category Name
 * date: November 15, 2024
 * image: /path/to/image.png
 * ---
 * 
 * # Content starts here
 */
export function parseBlogMarkdown(content: string): ParsedBlog {
  // Remove leading/trailing whitespace
  content = content.trim();

  // Check if content starts with frontmatter
  if (!content.startsWith('---')) {
    throw new Error('Blog content must start with frontmatter (---)');
  }

  // Find the closing frontmatter delimiter
  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd === -1) {
    throw new Error('Invalid frontmatter: missing closing delimiter (---)');
  }

  // Extract frontmatter and content
  const frontmatterString = content.substring(3, frontmatterEnd).trim();
  const bodyContent = content.substring(frontmatterEnd + 3).trim();

  // Parse YAML-like frontmatter
  const metadata = parseYamlFrontmatter(frontmatterString);

  // Validate required fields
  const required = ['title', 'excerpt', 'category', 'date', 'image'];
  for (const field of required) {
    if (!metadata[field as keyof BlogMetadata]) {
      throw new Error(`Missing required field in frontmatter: ${field}`);
    }
  }

  return {
    metadata: metadata as BlogMetadata,
    content: bodyContent,
  };
}

/**
 * Simple YAML-like frontmatter parser
 */
function parseYamlFrontmatter(yaml: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  const lines = yaml.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.substring(0, colonIndex).trim();
    let value = trimmed.substring(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    metadata[key] = value;
  }

  return metadata;
}

/**
 * Generate frontmatter string from metadata
 */
export function generateFrontmatter(metadata: BlogMetadata): string {
  return `---
title: "${metadata.title}"
excerpt: "${metadata.excerpt.replace(/"/g, '\\"')}"
category: "${metadata.category}"
date: "${metadata.date}"
image: "${metadata.image}"
---`;
}

/**
 * Combine metadata and content into full markdown
 */
export function buildBlogMarkdown(metadata: BlogMetadata, content: string): string {
  return `${generateFrontmatter(metadata)}\n\n${content}`;
}

/**
 * Extract headings from markdown content
 * Returns array of headings with IDs for table of contents
 * Skips H1 headings (top-level) and removes bold/italic formatting from heading text
 */
export function extractHeadings(markdown: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      let text = match[2].trim();
      
      // Skip if it's a top-level heading (h1)
      if (level === 1) continue;

      // Remove markdown formatting from heading text (bold, italic, links, etc.)
      text = cleanHeadingText(text);

      const id = slugify(text);
      headings.push({ id, text, level });
    }
  }

  return headings;
}

/**
 * Clean heading text by removing markdown formatting
 */
function cleanHeadingText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/__(.+?)__/g, '$1') // Remove bold (alternative)
    .replace(/_(.+?)_/g, '$1') // Remove italic (alternative)
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links, keep text
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .trim();
}

/**
 * Convert text to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Generate slug from title
 */
export function generateBlogSlug(title: string): string {
  return slugify(title);
}

/**
 * Add IDs to headings in markdown for anchor links
 */
export function addHeadingIds(markdown: string): string {
  return markdown.replace(/^(#{2,6})\s+(.+)$/gm, (match, hashes, text) => {
    const cleanText = cleanHeadingText(text);
    const id = slugify(cleanText);
    return `${hashes} ${text} {#${id}}`;
  });
}
