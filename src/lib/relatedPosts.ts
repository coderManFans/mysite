import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

const CATEGORY_WEIGHT = 3;
const TAG_WEIGHT = 2;
const MAX_RESULTS = 3;

export interface RelatedPost {
  post: Post;
  sharedTags: string[];
  sameCategory: boolean;
  score: number;
}

function normalizeTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tagsOverlap(a: string, b: string) {
  if (a === b) return true;
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
  if (shorter.length < 4) return false;
  return longer.startsWith(`${shorter} `) || longer.endsWith(` ${shorter}`);
}

function toTagMap(post: Post) {
  const map = new Map<string, string>();
  for (const tag of post.data.tags ?? []) {
    const key = normalizeTag(tag);
    if (!map.has(key)) map.set(key, tag);
  }
  return map;
}

export function getRelatedPosts(current: Post, allPosts: Post[], limit = MAX_RESULTS): RelatedPost[] {
  const currentTags = toTagMap(current);
  const currentKeys = [...currentTags.keys()];
  const currentCategory = current.data.category;

  return allPosts
    .filter((post) => post.id !== current.id && post.data.lang === current.data.lang)
    .map((post) => {
      const sharedTags = [...toTagMap(post)]
        .filter(([key]) => currentKeys.some((currentKey) => tagsOverlap(key, currentKey)))
        .map(([, original]) => original);
      const sameCategory = post.data.category === currentCategory;
      const score = (sameCategory ? CATEGORY_WEIGHT : 0) + sharedTags.length * TAG_WEIGHT;
      return { post, sharedTags, sameCategory, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
    })
    .slice(0, limit);
}
