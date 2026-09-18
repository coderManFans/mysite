#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = parseArgs(process.argv.slice(2));

if (!args.file) {
  exitWithUsage('Missing required --file argument.');
}

const sourceFile = path.resolve(args.file);
const title = args.title || path.basename(sourceFile, path.extname(sourceFile));
const slug = args.slug || slugify(title);
const description = args.description || `介绍 ${title} 的技术实践和项目设计。`;
const pubDate = args.date || new Date().toISOString().slice(0, 10);
const tags = parseTags(args.tags);

if (!existsSync(sourceFile)) {
  throw new Error(`Source Markdown file does not exist: ${sourceFile}`);
}

if (!slug) {
  throw new Error('Could not generate a valid slug. Pass --slug explicitly.');
}

const targetMarkdown = path.join(root, 'src/content/blog', `${slug}.md`);
const imageDir = path.join(root, 'public/images/blog', slug);
const imagePublicBase = `/images/blog/${slug}`;

if (existsSync(targetMarkdown) && !args.force) {
  throw new Error(`Target post already exists: ${targetMarkdown}. Pass --force to overwrite.`);
}

await mkdir(path.dirname(targetMarkdown), { recursive: true });
await mkdir(imageDir, { recursive: true });

let markdown = await readFile(sourceFile, 'utf8');
markdown = stripFrontmatter(markdown);
markdown = stripHtmlComments(markdown);
markdown = convertObsidianImages(markdown);

const imageUrls = collectRemoteImageUrls(markdown);
for (const [index, imageUrl] of imageUrls.entries()) {
  const ext = extensionFromUrl(imageUrl) || '.png';
  const imageName = `image-${index + 1}${ext}`;
  const imagePath = path.join(imageDir, imageName);
  await downloadFile(imageUrl, imagePath);
  markdown = markdown.split(imageUrl).join(`${imagePublicBase}/${imageName}`);
}

markdown = addDefaultImageAlt(markdown, title);
markdown = normalizeBlankLines(markdown);

const frontmatter = buildFrontmatter({ title, description, pubDate, tags });
await writeFile(targetMarkdown, `${frontmatter}\n${markdown.trim()}\n`, 'utf8');

console.log(`Imported post: src/content/blog/${slug}.md`);
console.log(`Image directory: public/images/blog/${slug}/`);
console.log(`Downloaded images: ${imageUrls.length}`);
console.log(`URL path: /blog/${slug}/`);

function parseArgs(values) {
  const result = {};
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (!value.startsWith('--')) continue;
    const key = value.slice(2);
    if (key === 'force') {
      result.force = true;
      continue;
    }
    result[key] = values[i + 1];
    i += 1;
  }
  return result;
}

function parseTags(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function slugify(value) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\.(md|mdx)$/i, '')
    .replace(/平台介绍/g, 'platform-intro')
    .replace(/技术/g, 'tech')
    .replace(/博客/g, 'blog')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (/^[a-z0-9-]+$/.test(normalized)) return normalized;

  const ascii = normalized
    .replace(/[\u4e00-\u9fa5]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (ascii) return ascii;

  return createHash('sha1').update(value).digest('hex').slice(0, 10);
}

function stripFrontmatter(value) {
  return value.replace(/^---\n[\s\S]*?\n---\n?/, '');
}

function stripHtmlComments(value) {
  return value.replace(/<!--([\s\S]*?)-->\n?/g, '');
}

function convertObsidianImages(value) {
  return value.replace(/!\[\[([^\]]+)\]\]/g, (_match, name) => `![](${name.trim()})`);
}

function collectRemoteImageUrls(value) {
  const urls = new Set();
  const markdownImagePattern = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;
  const htmlImagePattern = /<img[^>]+src=["'](https?:\/\/[^"']+)["'][^>]*>/g;

  for (const match of value.matchAll(markdownImagePattern)) {
    urls.add(match[1]);
  }

  for (const match of value.matchAll(htmlImagePattern)) {
    urls.add(match[1]);
  }

  return [...urls];
}

function extensionFromUrl(value) {
  const pathname = new URL(value).pathname;
  const ext = path.extname(pathname).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'].includes(ext)) return ext;
  return '';
}

async function downloadFile(url, target) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'coderman-site-blog-importer/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const data = Buffer.from(await response.arrayBuffer());
  await writeFile(target, data);
}

function addDefaultImageAlt(value, titleValue) {
  let index = 1;
  return value.replace(/!\[\]\(([^)]+)\)/g, (_match, url) => {
    const alt = `${titleValue} 图 ${index}`;
    index += 1;
    return `![${alt}](${url})`;
  });
}

function normalizeBlankLines(value) {
  return value.replace(/\n{4,}/g, '\n\n\n');
}

function buildFrontmatter({ title: titleValue, description: descriptionValue, pubDate: dateValue, tags: tagValues }) {
  const tagsValue = `[${tagValues.map((tag) => JSON.stringify(tag)).join(', ')}]`;
  return `---\ntitle: ${JSON.stringify(titleValue)}\ndescription: ${JSON.stringify(descriptionValue)}\npubDate: ${dateValue}\ntags: ${tagsValue}\ndraft: false\n---`;
}

function exitWithUsage(message) {
  console.error(message);
  console.error(`\nUsage:\n  npm run import:yuque -- --file /path/to/post.md --title "文章标题" --slug article-slug --tags "标签1,标签2"\n`);
  process.exit(1);
}
