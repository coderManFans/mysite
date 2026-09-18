export const blogCategories = [
  {
    slug: 'distributed-microservices',
    label: '分布式微服务',
    description: '分布式系统、微服务架构、服务治理和工程实践。'
  },
  {
    slug: 'ddd-domain-modeling',
    label: 'DDD 领域建模实践',
    description: '领域驱动设计、业务建模、边界划分和落地方法。'
  },
  {
    slug: 'vibe-coding-projects',
    label: 'VibeCoding 项目',
    description: '使用 AI Agent、RAG、Skills 等能力构建产品和个人项目的实践记录。'
  }
] as const;

export type BlogCategorySlug = (typeof blogCategories)[number]['slug'];

export const defaultBlogCategory = 'vibe-coding-projects' satisfies BlogCategorySlug;

export const blogCategorySlugs = blogCategories.map((category) => category.slug) as [
  BlogCategorySlug,
  ...BlogCategorySlug[]
];

export function getBlogCategory(slug?: string) {
  return blogCategories.find((category) => category.slug === slug);
}

export function getBlogCategoryLabel(slug?: string) {
  return getBlogCategory(slug)?.label ?? '未分类';
}
