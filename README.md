# Agentic Portfolio

A responsive personal portfolio built with Next.js, React, and TypeScript. Its visual direction follows the supplied reference: a full-screen portfolio introduction, animated multicolor collaborator cursors, oversized orange lettering, and a dark, editorial portfolio layout.

Every visit begins with agents assembling the portfolio before handing off to the finished page. Visitors can skip with the button or Escape, and people who prefer reduced motion get a shorter version. Returning with browser back/forward navigation replays the introduction.

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
- `frontend/app/components/AgenticIntro.tsx` runs the repeatable collaborator-cursor introduction.

The project names, descriptions, availability, and contact address in the page are starter content. Replace them with verified portfolio details before publishing.
