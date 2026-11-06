# Agentic Portfolio

A responsive personal portfolio built with Next.js, React, and TypeScript. Its visual direction takes cues from the supplied video—dark backgrounds, warm orange accents, oversized type, and an editorial one-page rhythm—while using original copy and CSS artwork.

## Run locally

```powershell
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create a production build, run `npm run build` from `frontend`, then `npm start`.

## Customize the portfolio

- `frontend/app/page.tsx` contains the portfolio sections, profile details, project content, and navigation.
- `frontend/app/globals.css` contains the responsive layout, colors, typography, and original CSS illustrations.
- `frontend/app/layout.tsx` contains the page metadata and viewport settings.
- `frontend/app/manifest.ts` contains the installable app name and colors.
- `frontend/app/components/AgenticIntro.tsx` orchestrates the animated portfolio-building intro on every visit.

The project names, descriptions, and contact address in the page are starter content. Replace them with verified portfolio details before publishing.

On every visit, a crew of animated cursor agents assembles a preview of the portfolio before handing off to the finished page. Visitors can skip it with the button or Escape, and browsers set to reduce motion see a shorter version. Returning to the page via browser back/forward navigation replays the animation. The intro uses original CSS illustrations and animation; it does not depend on external assets or animation services.
