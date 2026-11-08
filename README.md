# Agentic Portfolio

A personal portfolio built with Next.js, React and TypeScript. Its introduction is a **live build**: a team of
labelled agent cursors visibly constructs the real page in front of the visitor, section by section, then hands
over to the finished, fully interactive site.

## Run locally

```powershell
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production build run `npm run build`, then `npm start`.

All fonts (Anton, Inter, JetBrains Mono, Caveat Brush) are installed from npm via `@fontsource` and served locally.
The page uses no remote images, video or services, and the portrait is original SVG artwork.

## The live-build intro

The intro follows the pacing of the reference video in `frontend/Design/` (about 40 seconds of building, then a
short hand-off):

| Time | What happens |
| --- | --- |
| 0.0 s | Dark canvas, a ring-of-dots loader, the HUD bar appears |
| 0.5 to 1.0 s | Ten labelled agent cursors (Typeset, Copy, Motion, Palette, Deploy, Review, Render, Lint, Index, QA) appear |
| 1.0 to 2.4 s | Blueprint phase: blue wireframes with live tags and size read-outs outline the hero regions |
| 1.5 to 7.4 s | The hero is built: nav pill, portfolio word, portrait, greeting, name, role, intro, button, meta line |
| 7.6 to 20.4 s | The viewport scrolls to follow; "Work that ships" and the project cards are built piece by piece |
| 20.6 to 28.2 s | Stack marquee, then track record |
| 28.4 to 39.4 s | About, then contact |
| 40 s | "Build complete": agents fly out, the camera returns to the top, the overlay fades |

How it works (`frontend/app/components/`):

- The **real page** is rendered normally. Elements marked with `data-build` (plus `data-kind`, `data-agent`,
  optional `data-at`) are hidden by CSS and revealed by an engine that writes a `--p` progress value on them.
- Cursors travel on curved paths to the element they are building, follow the reveal edge while it "types",
  and helper cursors converge beside them. Each active element gets a wireframe with a tag such as `Typeset · typing`.
- `liveBuild.ts` holds the timeline, agents, cursor paths and camera maths. `AgenticIntro.tsx` runs the loop
  and the accessible UI.

Behaviour:

- Plays on every fresh visit, reload, and when the browser restores the page from the back/forward cache.
- **Skip intro** button and **Escape** reveal the finished site immediately.
- While it plays, the page behind is `inert`, scrolling is locked and clicks are blocked. When it ends or is skipped,
  scrolling, keyboard access and focus (to the previously focused element, otherwise the main heading) are restored.
- `prefers-reduced-motion`: no cursors, scrolling or travelling effects; sections simply fade in over about 1.2 seconds.
- If JavaScript fails, the page is revealed automatically (and always when JS is disabled).

## Replace the placeholders

Everything personal is in `frontend/app/content.ts`. Anything marked `placeholder: true` shows a visible
**PLACEHOLDER** tag on the page so it cannot be mistaken for real work.

Verified from this repository (kept as real): name, GitHub handle (`StefPo09`), Romania, the technology stack from
`package.json`, and the "Agentic Portfolio" project (this repository).

You need to replace:

- **Projects 02, 03 and 04**: names, descriptions, bullets, tags, `live` and `code` links.
- **Track record**: the large figure (`00`), its caption, and the four timeline entries.
- **About**: education, the backend skill, and the four "How I work" steps.
- **Contact**: email (`your.name@example.com`), LinkedIn and Instagram handles.
- **Portrait**: `frontend/app/components/Portrait.tsx` is placeholder artwork. Replace it with your own photo.
- **Counters** next to "Work that ships" are computed from the project list (`PROJECTS LISTED`, `OPEN SOURCE`) and
  update automatically.

## Project layout

- `frontend/app/page.tsx`: page sections and build hooks
- `frontend/app/content.ts`: all content and placeholder flags
- `frontend/app/globals.css`: site styles and intro-layer styles
- `frontend/app/layout.tsx`: fonts, metadata and the pre-paint script that prevents a flash of the finished page
- `frontend/app/components/`: `AgenticIntro.tsx`, `liveBuild.ts`, `SiteNav.tsx`, `Portrait.tsx`
