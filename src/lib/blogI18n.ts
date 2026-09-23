export const defaultBlogLang = 'zh' as const;
export const blogLanguages = ['zh', 'en'] as const;
export type BlogLanguage = (typeof blogLanguages)[number];

export function getHtmlLang(lang: BlogLanguage) {
  return lang === 'zh' ? 'zh-CN' : 'en';
}

export function getDateLocale(lang: BlogLanguage) {
  return lang === 'zh' ? 'zh-CN' : 'en-US';
}

export function getBlogIndexPath(lang: BlogLanguage = defaultBlogLang) {
  return lang === defaultBlogLang ? '/blog/' : `/${lang}/blog/`;
}

export function getHomePath(lang: BlogLanguage = defaultBlogLang) {
  return lang === defaultBlogLang ? '/' : `/${lang}/`;
}

const postFileExtensionPattern = /\.(md|mdx)$/;
const postIndexPattern = /\/index\.(md|mdx)$/;

export function getBlogPostSlug(id: string) {
  return id
    .replace(/^(zh|en)\//, '')
    .replace(postIndexPattern, '')
    .replace(postFileExtensionPattern, '');
}

export function getBlogPostPath(id: string, lang: BlogLanguage = defaultBlogLang) {
  const slug = getBlogPostSlug(id);
  return lang === defaultBlogLang ? `/blog/${slug}/` : `/${lang}/blog/${slug}/`;
}
