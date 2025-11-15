/**
 * Markdown utilities for parsing frontmatter and content
 * Supports simple YAML frontmatter format for blog metadata
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
 * Accepts frontmatter delimited by `---` on its own line.
 *
 * Example:
 * ---
 * title: Blog Title
 * excerpt: Short excerpt
 * category: Category Name
 * date: November 15, 2024
 * image: /path/to/image.png
 * --- 
 *
 * # Content...
 */
export function parseBlogMarkdown(content: string): ParsedBlog {
  // Normalize and trim
  const trimmed = content.trim();

  // Ensure it starts with '---' frontmatter delimiter on its own line
  if (!trimmed.startsWith('---\n') && !trimmed.startsWith('---\r\n')) {
    throw new Error('Blog content must start with frontmatter delimited by --- on its own line');
  }

  // Find the closing frontmatter delimiter (--- on its own line)
  // Start searching after the initial `---\n`
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = trimmed.match(fmRegex);
  if (!match) {
    throw new Error('Invalid frontmatter: missing closing delimiter (---)');
  }

  const frontmatterString = match[1].trim();
  const bodyContent = trimmed.slice(match[0].length).trim();

  // Parse YAML-like frontmatter into a record
  const raw = parseYamlFrontmatter(frontmatterString);

  // Validate required fields
  const required: (keyof BlogMetadata)[] = ['title', 'excerpt', 'category', 'date', 'image'];
  for (const field of required) {
    if (!raw[field]) {
      throw new Error(`Missing required field in frontmatter: ${field}`);
    }
  }

  // Build typed metadata object explicitly (safe conversion)
  const metadata: BlogMetadata = {
    title: raw.title,
    excerpt: raw.excerpt,
    category: raw.category,
    date: raw.date,
    image: raw.image,
    slug: raw.slug ?? generateBlogSlug(raw.title),
  };

  return { metadata, content: bodyContent };
}

/**
 * Simple YAML-like frontmatter parser
 * - Only supports simple `key: value` pairs (strings)
 * - Does not support nested structures, lists, or complex YAML
 */
function parseYamlFrontmatter(yaml: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  // split by line breaks supporting CRLF and LF
  const lines = yaml.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // skip comments
    if (trimmed.startsWith('#')) continue;

    // find first colon
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.substring(0, colonIndex).trim();
    let value = trimmed.substring(colonIndex + 1).trim();

    // Remove surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Unescape common escapes for convenience (e.g. \" inside quotes)
    value = value.replace(/\\"/g, '"').replace(/\\'/g, "'");

    metadata[key] = value;
  }

  return metadata;
}

/**
 * Generate frontmatter string from metadata
 */
export function generateFrontmatter(metadata: BlogMetadata): string {
  const lines: string[] = [];
  lines.push('---');
  lines.push(`title: "${escapeForFrontmatter(metadata.title)}"`);
  lines.push(`excerpt: "${escapeForFrontmatter(metadata.excerpt)}"`);
  lines.push(`category: "${escapeForFrontmatter(metadata.category)}"`);
  lines.push(`date: "${escapeForFrontmatter(metadata.date)}"`);
  lines.push(`image: "${escapeForFrontmatter(metadata.image)}"`);

  if (metadata.slug) {
    lines.push(`slug: "${escapeForFrontmatter(metadata.slug)}"`);
  }

  lines.push('---');
  return lines.join('\n');
}

function escapeForFrontmatter(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
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
 * Skips H1 headings (top-level)
 */
export function extractHeadings(markdown: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const lines = markdown.split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    if (level === 1) continue; // skip H1

    let text = match[2].trim();
    text = cleanHeadingText(text);
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Clean heading text by removing markdown formatting
 */
function cleanHeadingText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italic
    .replace(/__(.+?)__/g, '$1') // bold alternative
    .replace(/_(.+?)_/g, '$1') // italic alternative
    .replace(/\[(.+?)\]\((?:.+?)\)/g, '$1') // links: [text](href)
    .replace(/`(.+?)`/g, '$1') // inline code
    .replace(/!\[(.*?)\]\((?:.*?)\)/g, '$1') // images: keep alt text
    .trim();
}

/**
 * Convert text to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')                // normalize accents
    .replace(/[\u0300-\u036f]/g, '')  // remove diacritics
    .replace(/[^\w\s-]/g, '')         // remove non-word chars
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Generate slug from title
 */
export function generateBlogSlug(title: string): string {
  return slugify(title);
}

/**
 * Add IDs to headings in markdown for anchor links
 * Adds `{#slug}` after headings H2..H6
 */
export function addHeadingIds(markdown: string): string {
  return markdown.replace(/^(#{2,6})\s+(.+)$/gm, (match, hashes, text) => {
    const cleanText = cleanHeadingText(text);
    const id = slugify(cleanText);
    // If the heading already contains an explicit {#id}, don't add another
    if (/\{#[-\w]+\}\s*$/.test(text)) return match;
    return `${hashes} ${text} {#${id}}`;
  });
}
