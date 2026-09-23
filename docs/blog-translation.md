# Blog Translation Workflow

Use the project-local translator to generate English Markdown drafts from Chinese blog posts.

## Translate All Missing Posts

```bash
npm run translate:blog
```

By default this reads Chinese posts from:

```txt
src/content/blog/zh/
```

and writes English drafts to:

```txt
src/content/blog/en/
```

Existing English files are skipped unless `--force` is passed.

## Translate One Post

```bash
npm run translate:blog -- --slug kvplat-platform-intro
```

The slug is the filename without `.md`.

## Force Regenerate

```bash
npm run translate:blog -- --slug kvplat-platform-intro --force
```

## Dry Run

```bash
npm run translate:blog -- --slug kvplat-platform-intro --dryRun
```

## Provider Options

The script supports:

- `ollama` - default when no `OPENAI_API_KEY` is available.
- `openai` - OpenAI-compatible chat completions API.

Ollama example:

```bash
npm run translate:blog -- \
  --provider ollama \
  --model qwen2.5:7b-instruct-q4_K_M
```

OpenAI-compatible example:

```bash
OPENAI_API_KEY="..." npm run translate:blog -- \
  --provider openai \
  --model gpt-4o-mini
```

With a custom compatible endpoint:

```bash
OPENAI_API_KEY="..." OPENAI_BASE_URL="https://api.example.com/v1" npm run translate:blog -- \
  --provider openai \
  --model your-model-name
```

## Manual Review Checklist

AI translation should be treated as a draft. Before publishing, review:

- Product names and proper nouns.
- Technical terms such as RAG, AI Agent, Vibe Coding, low-code, DDD.
- Headings that mix Chinese numbering with English text.
- Image alt text.
- Markdown tables and code blocks.
- External links and local image paths.

Then run:

```bash
npm run build
```
