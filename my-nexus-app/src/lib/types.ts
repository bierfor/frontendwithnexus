export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  coverImageAlt?: string | null;
  readTimeMinutes?: number | null;
  viewCount: number;
  publishedAt?: string | null;
  author?: { name: string } | null;
  tags: Tag[];
}

export interface ArticleDetail extends ArticleSummary {
  content: string;
  updatedAt: string;
  author?: Author | null;
}

export interface FlashNewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  sourceLabel?: string | null;
  sourceUrl?: string | null;
  hack?: string | null;
  publishedAt?: string | null;
}

export interface HeroBlock {
  slug: string;
  kicker?: string | null;
  headline: string;
  subheadline?: string | null;
  body: string;
  bodySecondary?: string | null;
  imageUrl?: string | null;
  footerCtaLabel?: string | null;
  footerCtaHref?: string | null;
}
