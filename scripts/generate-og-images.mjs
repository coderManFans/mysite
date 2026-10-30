import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const contentRoot = path.join(root, 'src/content/blog');
const outputRoot = path.join(root, 'public/images/og');
const WIDTH = 1200;
const HEIGHT = 630;

const categoryLabels = {
  'ddd-domain-modeling': { zh: 'DDD 领域建模实践', en: 'DDD Domain Modeling' },
  'distributed-microservices': { zh: '分布式与微服务', en: 'Distributed Systems' },
  'vibe-coding-projects': { zh: 'Vibe Coding 项目', en: 'Vibe Coding Projects' }
};

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawValue] = m;
    const value = rawValue.trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value.slice(1, -1);
      }
    } else if (value.startsWith('[')) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value;
      }
    } else {
      data[key] = value;
    }
  }
  return data;
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const isWide = /[\u3400-\u9fff\uf900-\ufaff]/.test(text);
  if (isWide) {
    const chars = [...String(text)];
    const lines = [];
    for (let i = 0; i < chars.length; i += maxChars) {
      lines.push(chars.slice(i, i + maxChars).join(''));
    }
    return lines;
  }
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

function fitTitle(title, lang) {
  const isWide = lang === 'zh';
  const maxLines = 3;
  for (let size = isWide ? 62 : 56; size >= 34; size -= 2) {
    const maxChars = Math.floor((WIDTH - 160) / (isWide ? size : size * 0.52));
    const lines = wrapText(title, maxChars);
    if (lines.length <= maxLines) return { size, lines };
  }
  const maxChars = Math.floor((WIDTH - 160) / (isWide ? 34 : 34 * 0.52));
  return { size: 34, lines: wrapText(title, maxChars).slice(0, maxLines) };
}

function buildSvg({ title, category, lang }) {
  const isZh = lang === 'zh';
  const categoryLabel = categoryLabels[category]?.[lang] ?? categoryLabels['ddd-domain-modeling'][lang];
  const { size, lines } = fitTitle(title, lang);
  const lineHeight = Math.round(size * 1.32);
  const blockHeight = lines.length * lineHeight;
  const startY = 330 - Math.round(blockHeight / 2) + size;

  const titleTspans = lines
    .map((line, index) => `<tspan x="80" y="${startY + index * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1117"/>
      <stop offset="55%" stop-color="#161b22"/>
      <stop offset="100%" stop-color="#1f2a37"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#58a6ff"/>
      <stop offset="100%" stop-color="#3fb950"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <circle cx="1060" cy="90" r="150" fill="#58a6ff" opacity="0.07"/>
  <circle cx="1120" cy="560" r="190" fill="#3fb950" opacity="0.06"/>
  <rect x="80" y="96" width="${isZh ? 210 : 250}" height="44" rx="22" fill="#1f6feb" opacity="0.18" stroke="#58a6ff" stroke-opacity="0.45"/>
  <text x="${isZh ? 185 : 205}" y="125" fill="#79c0ff" font-family="'PingFang SC','Hiragino Sans GB','Noto Sans CJK SC',sans-serif" font-size="21" font-weight="600" text-anchor="middle">${escapeXml(categoryLabel)}</text>
  <text fill="#f0f6fc" font-family="'PingFang SC','Hiragino Sans GB','Noto Sans CJK SC',sans-serif" font-size="${size}" font-weight="700">${titleTspans}</text>
  <rect x="80" y="480" width="110" height="6" rx="3" fill="url(#bar)"/>
  <text x="80" y="548" fill="#c9d1d9" font-family="'PingFang SC','Hiragino Sans GB','Noto Sans CJK SC',sans-serif" font-size="30" font-weight="700">CODERMAN</text>
  <text x="80" y="584" fill="#8b949e" font-family="'PingFang SC','Hiragino Sans GB','Noto Sans CJK SC',sans-serif" font-size="21">coderman.me</text>
</svg>`;
}

function collectPosts() {
  const posts = [];
  for (const lang of ['zh', 'en']) {
    const dir = path.join(contentRoot, lang);
    if (!existsSync(dir)) continue;
    for (const entry of readFileEntries(dir)) {
      if (!entry.endsWith('.md')) continue;
      const slug = entry.replace(/\.md$/, '');
      const source = readFileSync(path.join(dir, entry), 'utf8');
      const data = parseFrontmatter(source);
      if (data.draft === 'true') continue;
      posts.push({
        lang: data.lang || lang,
        slug,
        title: data.title || slug,
        category: data.category || 'vibe-coding-projects'
      });
    }
  }
  return posts;
}

function readFileEntries(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((item) => item.isFile())
    .map((item) => item.name);
}

async function main() {
  mkdirSync(outputRoot, { recursive: true });
  const posts = collectPosts();
  let generated = 0;
  for (const post of posts) {
    const svg = buildSvg(post);
    const target = path.join(outputRoot, `${post.lang}-${post.slug}.png`);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(target);
    generated += 1;
    console.log(`Generated ${path.relative(root, target)}`);
  }
  console.log(`\nTotal OG images: ${generated}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
