/**
 * Marks Markdown images for native lazy loading so long articles with many
 * screenshots do not block the initial page load. The first image stays eager
 * because it is likely to be near the top of the article.
 */
export default {
  name: 'lazy-markdown-images',
  before(_root, ctx) {
    ctx.data.lazyImageIndex = 0;
  },
  element: {
    filter: ['img'],
    visit(node, ctx) {
      const index = (ctx.data.lazyImageIndex ?? 0) + 1;
      ctx.data.lazyImageIndex = index;

      return {
        ...node,
        properties: {
          ...node.properties,
          loading: index === 1 ? 'eager' : 'lazy',
          decoding: 'async'
        }
      };
    }
  }
};
