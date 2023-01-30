# Omori Version Français

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## VS Code Setup

Extentions:

1. Astro (astro-build.astro-vscode)
1. ESLint (dbaeumer.vscode-eslint)
1. Prettier (esbenp.prettier-vscode)
1. Svelte for VS Code (svelte.svelte-vscode)

Enable eslint and prettier for astro `.vscode/settings.json`:

```JSON
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "astro", // Enable .astro
    "typescript", // Enable .ts
    "typescriptreact", // Enable .tsx
    "svelte"
  ],
  "prettier.documentSelectors": ["**/*.astro"],
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[svelte]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}

```

## WebP Settings used

PNG:

```PS
Get-ChildItem -Recurse -File -filter *.png | ForEach-Object {& cwebp $_.FullName -m 6 -q 100 -mt -o "$($_.FullName.Substring(0, $_.FullName.length-3))webp" }
```

PNG BG:

```PS
Get-ChildItem -Recurse -File -filter *_bg.png | ForEach-Object {& cwebp $_.FullName -m 6 -alpha_q 0 -q 50 -mt -o "$($_.FullName.Substring(0, $_.FullName.length-3))webp" }
```

GIF:

```PS
Get-ChildItem -Recurse -File -filter *.gif | ForEach-Object {& gif2webp $_.FullName -loop_compatibility -mt -lossy -m 6 -o "$($_.FullName.Substring(0, $_.FullName.length-3))webp" }
```

JPG:

```PS
Get-ChildItem -Recurse -File -filter *.jpg | ForEach-Object {& cwebp $_.FullName -m 6 -preset picture -mt -o "$($_.FullName.Substring(0, $_.FullName.length-3))webp" }
```
