import type { CollectionEntry } from 'astro:content';
import { getBlogPostSlug } from './blogI18n';

type Post = CollectionEntry<'blog'>;

export interface SeriesNavigation {
  previous: Post | null;
  next: Post | null;
}

function bySeriesOrder(a: Post, b: Post) {
  const dateDiff = a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
  if (dateDiff !== 0) return dateDiff;
  return getBlogPostSlug(a.id).localeCompare(getBlogPostSlug(b.id));
}

export function getSeriesNavigation(current: Post, allPosts: Post[]): SeriesNavigation {
  const series = allPosts
    .filter(
      (post) =>
        post.data.lang === current.data.lang &&
        post.data.category === current.data.category &&
        !post.data.draft
    )
    .sort(bySeriesOrder);

  const index = series.findIndex((post) => post.id === current.id);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? series[index - 1] : null,
    next: index < series.length - 1 ? series[index + 1] : null
  };
}
