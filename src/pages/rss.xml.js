import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const getPostPath = (id) =>
  `/blog/${id.replace(/\/index\.(md|mdx)$/, '').replace(/\.(md|mdx)$/, '')}/`;

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'CODERMAN Blog',
    description: 'CODERMAN 的技术博客和开发笔记。',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getPostPath(post.id)
    }))
  });
}
