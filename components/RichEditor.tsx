'use client';

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

interface RichEditorProps {
  value?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: number;
}

export default function RichEditor({
  value = '',
  onChange,
  placeholder = 'Write your blog content in Markdown...',
  className = '',
  minHeight = 400,
}: RichEditorProps) {
  const [displayMode, setDisplayMode] = useState<'edit' | 'preview' | 'split'>('edit');
  const [content, setContent] = useState(value);

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    onChange?.(text);
  };

  const handlePreviewChange = (val: string) => {
    setContent(val);
    onChange?.(val);
  };

  const renderedMarkdown = marked(content, {
    breaks: true,
    gfm: true,
  });

  return (
    <div className={`markdown-editor-container ${className}`}>
      {/* Mode toggle buttons */}
      <div className="mb-3 flex gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setDisplayMode('edit')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            displayMode === 'edit'
              ? 'bg-[#261538] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          onClick={() => setDisplayMode('preview')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            displayMode === 'preview'
              ? 'bg-[#261538] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          👁️ Preview
        </button>
        <button
          type="button"
          onClick={() => setDisplayMode('split')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            displayMode === 'split'
              ? 'bg-[#261538] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ⚖️ Split
        </button>
      </div>

      {/* Editor */}
      {displayMode === 'edit' && (
        <textarea
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          style={{ minHeight: `${minHeight}px` }}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm outline-none focus:border-[#261538] focus:ring-2 focus:ring-[#261538]/20 resize-none"
        />
      )}

      {/* Preview */}
      {displayMode === 'preview' && (
        <div
          style={{ minHeight: `${minHeight}px` }}
          className="w-full rounded-lg border border-gray-300 bg-white p-6 overflow-auto prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: renderedMarkdown as string }}
        />
      )}

      {/* Split view */}
      {displayMode === 'split' && (
        <div className="flex gap-3 rounded-lg border border-gray-300 overflow-hidden">
          <textarea
            value={content}
            onChange={handleChange}
            placeholder={placeholder}
            style={{ minHeight: `${minHeight}px` }}
            className="w-1/2 px-4 py-3 font-mono text-sm outline-none border-none resize-none focus:ring-0"
          />
          <div
            style={{ minHeight: `${minHeight}px` }}
            className="w-1/2 bg-white p-6 overflow-auto prose prose-sm max-w-none border-l border-gray-200"
            dangerouslySetInnerHTML={{ __html: renderedMarkdown as string }}
          />
        </div>
      )}

      {/* Markdown syntax help */}
      <details className="mt-4 text-sm text-gray-600">
        <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
          📖 Markdown Syntax Guide
        </summary>
        <div className="mt-3 space-y-2 bg-gray-50 p-4 rounded border border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-800 mb-2">Headings</p>
              <p><code className="bg-gray-100 px-2 py-1"># Heading 1</code> - Main section</p>
              <p><code className="bg-gray-100 px-2 py-1">## Heading 2</code> - Subsection</p>
              <p><code className="bg-gray-100 px-2 py-1">### Heading 3</code> - Sub-subsection</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">Text Formatting</p>
              <p><code className="bg-gray-100 px-2 py-1">**bold**</code> - Bold text</p>
              <p><code className="bg-gray-100 px-2 py-1">*italic*</code> - Italic text</p>
              <p><code className="bg-gray-100 px-2 py-1">`code`</code> - Inline code</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-800 mb-2">Lists</p>
              <p><code className="bg-gray-100 px-2 py-1">- Item</code> - Bullet list</p>
              <p><code className="bg-gray-100 px-2 py-1">1. Item</code> - Numbered list</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">Other</p>
              <p><code className="bg-gray-100 px-2 py-1">[text](url)</code> - Link</p>
              <p><code className="bg-gray-100 px-2 py-1">&gt; Quote</code> - Blockquote</p>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
