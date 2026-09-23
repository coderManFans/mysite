#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = parseArgs(process.argv.slice(2));

const sourceLang = args.sourceLang || 'zh';
const targetLang = args.targetLang || 'en';
const sourceDir = path.join(root, 'src/content/blog', sourceLang);
const targetDir = path.join(root, 'src/content/blog', targetLang);
const provider = args.provider || (process.env.OPENAI_API_KEY ? 'openai' : 'ollama');
const defaultModel = provider === 'openai'
  ? (process.env.OPENAI_MODEL || 'gpt-4o-mini')
  : (process.env.OLLAMA_MODEL || 'qwen2.5:7b-instruct-q4_K_M');
const model = args.model || defaultModel;
const baseUrl = args.baseUrl || (provider === 'openai'
  ? (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1')
  : 'http://127.0.0.1:11434');

if (!existsSync(sourceDir)) {
  throw new Error(`Source directory does not exist: ${sourceDir}`);
}

await mkdir(targetDir, { recursive: true });

const posts = await collectPosts();
if (posts.length === 0) {
  console.log('No posts to translate.');
  process.exit(0);
}

console.log(`Provider: ${provider}`);
console.log(`Model: ${model}`);
console.log(`Posts: ${posts.length}`);

for (const post of posts) {
  await translatePost(post);
}

async function collectPosts() {
  const entries = await readdir(sourceDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  const selected = args.slug
    ? files.filter((file) => stripExtension(file) === args.slug)
    : files;

  if (args.slug && selected.length === 0) {
    throw new Error(`No source post found for slug: ${args.slug}`);
  }

  return selected.map((file) => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    return { file, slug: stripExtension(file), sourcePath, targetPath };
  }).filter((post) => args.force || !existsSync(post.targetPath));
}

async function translatePost(post) {
  console.log(`\nTranslating ${post.slug}...`);
  const source = await readFile(post.sourcePath, 'utf8');
  const { frontmatter, body } = parseMarkdown(source);
  const translationKey = frontmatter.translationKey || post.slug;

  const title = await translatePlain(frontmatter.title || post.slug, 'title');
  const description = frontmatter.description ? await translatePlain(frontmatter.description, 'description') : '';
  const tags = await translateTags(frontmatter.tags || []);
  const translatedBody = await translateMarkdown(body);

  const nextFrontmatter = {
    ...frontmatter,
    title,
    description,
    tags,
    lang: targetLang,
    translationKey
  };

  const output = `${stringifyFrontmatter(nextFrontmatter)}\n${translatedBody.trim()}\n`;

  if (args.dryRun) {
    console.log(output.slice(0, 1200));
    if (output.length > 1200) console.log('\n... dry run output truncated ...');
    return;
  }

  await writeFile(post.targetPath, output, 'utf8');
  console.log(`Wrote src/content/blog/${targetLang}/${post.file}`);
}

async function translateTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return [];
  const translated = [];
  for (const tag of tags) {
    translated.push(await translatePlain(tag, 'tag'));
  }
  return translated;
}

async function translatePlain(text, kind) {
  const prompt = `Translate this blog ${kind} from Chinese to natural English. Keep product names, proper nouns, programming terms, and acronyms unchanged when appropriate. Return only the translated text, without quotes or explanations.\n\n${text}`;
  return cleanup(await chat(prompt));
}

async function translateMarkdown(markdown) {
  const prompt = `You are translating a technical blog post from Chinese to English.\n\nRules:\n- Return only the translated Markdown.\n- Preserve Markdown structure, heading levels, tables, lists, blockquotes, and blank lines.\n- Preserve all image URLs, link URLs, and file paths exactly.\n- Translate image alt text and normal prose into natural English.\n- Keep fenced code blocks exactly as they are unless they contain Chinese prose comments that clearly need translation.\n- Keep product names, class names, API names, commands, package names, and proper nouns unchanged when appropriate.\n- Do not add summaries, notes, or extra sections.\n\nMarkdown to translate:\n\n${markdown.trim()}`;
  return cleanup(await chat(prompt));
}

async function chat(prompt) {
  if (provider === 'openai') return chatOpenAI(prompt);
  if (provider === 'ollama') return chatOllama(prompt);
  throw new Error(`Unknown provider: ${provider}. Use ollama or openai.`);
}

async function chatOllama(prompt) {
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: 'system', content: 'You are a careful technical translator. Follow the user instructions exactly.' },
        { role: 'user', content: prompt }
      ],
      options: {
        temperature: Number(args.temperature ?? 0.2),
        num_ctx: Number(args.numCtx ?? 32768)
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status} ${response.statusText}\n${await response.text()}`);
  }

  const data = await response.json();
  return data.message?.content || '';
}

async function chatOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required when provider=openai.');

  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: Number(args.temperature ?? 0.2),
      messages: [
        { role: 'system', content: 'You are a careful technical translator. Follow the user instructions exactly.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI-compatible request failed: ${response.status} ${response.statusText}\n${await response.text()}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

function parseMarkdown(value) {
  const match = value.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: value };
  return { frontmatter: parseFrontmatter(match[1]), body: match[2] };
}

function parseFrontmatter(value) {
  const result = {};
  const lines = value.split('\n');
  for (const line of lines) {
    const index = line.indexOf(':');
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const raw = line.slice(index + 1).trim();
    result[key] = parseYamlValue(raw);
  }
  return result;
}

function parseYamlValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^\[.*\]$/.test(value)) {
    try { return JSON.parse(value); } catch { return value; }
  }
  if (/^".*"$/.test(value)) {
    try { return JSON.parse(value); } catch { return value.slice(1, -1); }
  }
  return value;
}

function stringifyFrontmatter(data) {
  const preferredOrder = [
    'title',
    'description',
    'pubDate',
    'updatedDate',
    'tags',
    'category',
    'draft',
    'lang',
    'translationKey'
  ];
  const keys = [
    ...preferredOrder.filter((key) => data[key] !== undefined && data[key] !== ''),
    ...Object.keys(data).filter((key) => !preferredOrder.includes(key))
  ];

  const lines = keys.map((key) => `${key}: ${formatYamlValue(data[key])}`);
  return `---\n${lines.join('\n')}\n---`;
}

function formatYamlValue(value) {
  if (Array.isArray(value)) return `[${value.map((item) => JSON.stringify(item)).join(', ')}]`;
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') return String(value);
  return JSON.stringify(String(value));
}

function cleanup(value) {
  const trimmed = value.trim();
  const wrapped = trimmed.match(/^```(?:markdown|md)\n([\s\S]*)\n```$/i);
  return (wrapped ? wrapped[1] : trimmed).trim();
}

function stripExtension(file) {
  return file.replace(/\.mdx?$/, '');
}

function parseArgs(values) {
  const result = {};
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (!value.startsWith('--')) continue;
    const key = value.slice(2);
    if (['force', 'dryRun'].includes(key)) {
      result[key] = true;
      continue;
    }
    result[key] = values[i + 1];
    i += 1;
  }
  return result;
}
