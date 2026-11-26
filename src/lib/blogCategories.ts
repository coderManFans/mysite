export const blogCategories = [
  {
    slug: 'distributed-microservices',
    label: '分布式微服务',
    labelEn: 'Distributed Microservices',
    description: '分布式系统、微服务架构、服务治理和工程实践。',
    descriptionEn: 'Distributed systems, microservice architecture, service governance, and engineering practice.'
  },
  {
    slug: 'ddd-domain-modeling',
    label: 'DDD 领域建模实践',
    labelEn: 'DDD Domain Modeling',
    description: '领域驱动设计、业务建模、边界划分和落地方法。',
    descriptionEn: 'Domain-driven design, business modeling, boundary design, and implementation methods.'
  },
  {
    slug: 'vibe-coding-projects',
    label: 'VibeCoding 项目',
    labelEn: 'Vibe Coding Projects',
    description: '使用 AI Agent、RAG、Skills 等能力构建产品和个人项目的实践记录。',
    descriptionEn: 'Building products and personal projects with AI Agents, RAG, Skills, and related tooling.'
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

export function getBlogCategoryDescription(slug?: string, lang: 'zh' | 'en' = 'zh') {
  const category = getBlogCategory(slug);
  if (!category) return lang === 'en' ? 'Uncategorized posts.' : '未分类文章。';
  return lang === 'en' ? category.descriptionEn : category.description;
}

export function getBlogCategoryLabel(slug?: string, lang: 'zh' | 'en' = 'zh') {
  const category = getBlogCategory(slug);
  if (!category) return lang === 'en' ? 'Uncategorized' : '未分类';
  return lang === 'en' ? category.labelEn : category.label;
}
