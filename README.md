# Jason Qiu Portfolio

Apple-inspired personal portfolio website for a visual designer focused on brand visual design, e-commerce design, product rendering, AI visual direction and smart hardware visuals.

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Framer Motion
- Lucide React

## Project Structure

```text
app/
components/
sections/
data/
public/works/
styles/
docs/
```

## Replace Works

Edit `data/works.js`.

Each work contains:

```js
{
  title,
  category,
  year,
  description,
  coverImage,
  images,
  tags,
  slug
}
```

Put real work images into `public/works`, then update `coverImage` and `images`.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The project uses `output: "export"` in `next.config.js`, so the static site is generated in `out/`.

## Netlify Deploy

Recommended Netlify settings:

- Build command: `npm run build`
- Publish directory: `out`
- Node version: `20`

Optional `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "20"
```

## Figma

Use `docs/figma-spec.md` as the Figma build guide. The implemented components match the spec names and layout logic, so the site can be recreated as Figma frames with Auto Layout.
