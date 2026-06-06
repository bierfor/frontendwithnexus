export const HERO_QUERY = `
  query Hero($slug: String!) {
    hero(slug: $slug) {
      slug
      kicker
      headline
      subheadline
      body
      bodySecondary
      imageUrl
      footerCtaLabel
      footerCtaHref
    }
  }
`;

export const ARTICLES_HOME_QUERY = `
  query ArticlesHome {
    articles(publishedOnly: true, limit: 9) {
      id
      title
      slug
      excerpt
      readTimeMinutes
      viewCount
      publishedAt
      coverImage
      coverImageAlt
      author { name }
      tags { name slug }
    }
  }
`;

export const ARTICLES_QUERY = `
  query Articles($limit: Int, $offset: Int) {
    articles(publishedOnly: true, limit: $limit, offset: $offset) {
      id title slug excerpt readTimeMinutes viewCount publishedAt coverImage coverImageAlt
      author { name } tags { name slug }
    }
  }
`;

export const ARTICLE_COUNT_QUERY = `
  query ArticleCount {
    articleCount(publishedOnly: true)
  }
`;

export const ARTICLE_BY_SLUG_QUERY = `
  query ArticleBySlug($slug: String!) {
    article(slug: $slug) {
      id title slug excerpt content readTimeMinutes viewCount publishedAt updatedAt coverImage coverImageAlt
      author { name bio }
      tags { name slug }
    }
  }
`;

export const FLASH_NEWS_QUERY = `
  query FlashNews {
    flashNews(publishedOnly: true, limit: 8) {
      id title slug summary sourceLabel sourceUrl hack publishedAt
    }
  }
`;

export const FLASH_NEWS_REVISTA_QUERY = `
  query FlashNewsRevista($limit: Int, $offset: Int) {
    flashNews(publishedOnly: true, limit: $limit, offset: $offset) {
      id title slug summary sourceLabel sourceUrl hack publishedAt
    }
  }
`;

export const ARTICLE_RECOMMENDATIONS_QUERY = `
  query ArticleRecommendations($readerKey: String, $currentSlug: String!, $declaredTagSlugs: [String!], $limit: Int) {
    articleRecommendations(readerKey: $readerKey, currentSlug: $currentSlug, declaredTagSlugs: $declaredTagSlugs, limit: $limit) {
      id title slug excerpt readTimeMinutes viewCount publishedAt coverImage coverImageAlt
      author { name } tags { name slug }
    }
  }
`;

export const RECORD_READER_ENGAGEMENT_MUTATION = `
  mutation RecordReaderEngagement($readerKey: String!, $articleSlug: String!) {
    recordReaderEngagement(readerKey: $readerKey, articleSlug: $articleSlug)
  }
`;

export const RECORD_VIEW_MUTATION = `
  mutation RecordView($slug: String!) {
    recordArticleView(slug: $slug)
  }
`;
