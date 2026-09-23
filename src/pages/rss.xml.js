import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { defaultBlogLang, getBlogPostPath } from '../lib/blogI18n';

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft && post.data.lang === defaultBlogLang)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'CODERMAN Blog',
    description: 'CODERMAN 的技术博客和开发笔记。',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getBlogPostPath(post.id, post.data.lang)
    }))
  });
}
