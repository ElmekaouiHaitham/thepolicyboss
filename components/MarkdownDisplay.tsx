'use client';

import React from 'react';
import { marked } from 'marked';
import { extractHeadings, type HeadingItem } from '@/lib/markdownUtils';

interface MarkdownDisplayProps {
  content: string;
  className?: string;
}

interface MarkdownRendererProps {
  content: string;
  onHeadingsExtracted?: (headings: HeadingItem[]) => void;
}

export function MarkdownRenderer({
  content,
  onHeadingsExtracted,
}: MarkdownRendererProps) {
  // Extract headings for TOC
  React.useEffect(() => {
    const headings = extractHeadings(content);
    onHeadingsExtracted?.(headings);
  }, [content, onHeadingsExtracted]);

  const renderedMarkdown = marked(content, {
    breaks: true,
    gfm: true,
  });

  return (
    <article 
      className="prose prose-lg max-w-none
        prose-headings:font-heading prose-headings:text-gray-900
        prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-[#261538] prose-h2:pb-2
        prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-[#3b205d]
        prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2 prose-h4:text-gray-800
        prose-p:text-gray-700 prose-p:leading-7
        prose-strong:font-bold prose-strong:text-[#261538]
        prose-em:italic prose-em:text-gray-700
        prose-a:text-[#3b205d] prose-a:underline hover:prose-a:text-[#261538]
        prose-ul:text-gray-700 prose-ul:list-disc prose-ul:ml-6
        prose-ol:text-gray-700 prose-ol:list-decimal prose-ol:ml-6
        prose-li:mb-2
        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-red-600 prose-code:font-mono
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-auto
        prose-blockquote:border-l-4 prose-blockquote:border-[#261538] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
        prose-hr:border-gray-300
        prose-img:rounded-lg prose-img:shadow-lg"
      dangerouslySetInnerHTML={{ __html: renderedMarkdown as string }}
    />
  );
}

export function useMarkdownHeadings(content: string): HeadingItem[] {
  const [headings, setHeadings] = React.useState<HeadingItem[]>([]);

  React.useEffect(() => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);
  }, [content]);

  return headings;
}
