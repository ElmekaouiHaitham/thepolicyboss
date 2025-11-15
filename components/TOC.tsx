'use client';

interface TOCItem {
  text: string;
  id: string;
  level: number;
}

interface TOCProps {
  items: TOCItem[];
}

export default function TOC({ items }: TOCProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8 rounded-2xl bg-linear-to-br from-[#faf7ff] to-[#f3ecff] border border-[#e4d4ff] p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 font-heading flex items-center gap-2">
        <svg className="w-5 h-5 text-[#261538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Table of Contents
      </h2>
      <nav aria-label="Article table of contents">
        <ol className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
          {items.map((item, index) => {
            // Style based on heading level (only h2 and h3 now)
            const isMainHeading = item.level === 2;
            const isSubHeading = item.level === 3;
            const marginClass = item.level === 2 ? 'ml-0' : 'ml-6';
            
            return (
              <li key={item.id} className={marginClass}>
                <a
                  href={`#${item.id}`}
                  className={`flex items-start gap-3 group rounded-lg px-3 py-2 transition-all ${
                    isMainHeading
                      ? 'text-[#261538] font-semibold hover:bg-[#e4d4ff] hover:text-[#3b205d]'
                      : 'text-[#3b205d] font-medium hover:bg-[#e4d4ff]/50 hover:text-[#261538]'
                  }`}
                >
                  <span className={`min-w-5 font-semibold mt-0.5 ${
                    isMainHeading ? 'text-[#261538]' : 'text-[#6f4ba1]'
                  }`}>
                    {index + 1}.
                  </span>
                  <span className="flex-1">{item.text}</span>
                  <svg className="w-4 h-4 text-[#9a7cc9] mt-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

