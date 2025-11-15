'use client';

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

interface MarkdownEditorProps {
  value?: string;
  onChange?: (markdown: string) => void;
  placeholder?: string;
  className?: string;
}

export default function MarkdownEditor({ 
  value = '', 
  onChange, 
  placeholder = 'Write in Markdown format...', 
  className = '' 
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(value);
  const [preview, setPreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setMarkdown(value);
  }, [value]);

  useEffect(() => {
    // Configure marked options
    const markedOptions = {
      breaks: true,
      gfm: true,
    };
    
    const html = marked(markdown, markedOptions) as string;
    setPreview(html);
  }, [markdown]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
    onChange?.(newMarkdown);
  };

  return (
    <div className={`markdown-editor ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className={`px-3 py-1 text-sm rounded ${
              !showPreview
                ? 'bg-[#261538] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className={`px-3 py-1 text-sm rounded ${
              showPreview
                ? 'bg-[#261538] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Preview
          </button>
        </div>
        <div className="text-xs text-gray-500">
          Markdown supported
        </div>
      </div>

      {!showPreview ? (
        <textarea
          value={markdown}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full min-h-[400px] rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#261538] focus:ring-2 focus:ring-[#261538]/20 font-mono text-sm resize-none"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      ) : (
        <div
          className="w-full min-h-[400px] rounded-md border border-gray-300 px-4 py-3 bg-white prose prose-lg max-w-none overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      )}
    </div>
  );
}

