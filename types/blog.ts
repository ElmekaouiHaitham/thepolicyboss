export interface BlogSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  image: string;
}

export interface BlogCategory {
  name: string;
  slug?: string;
  count?: number;
}


