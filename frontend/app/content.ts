/**
 * All personal content for the portfolio lives here.
 *
 * `placeholder: true` marks anything that is NOT verified from this repository.
 * Placeholders render with a visible "PLACEHOLDER" tag so they can never be mistaken
 * for real work. Replace them with your own details and set `placeholder` to false.
 *
 * Verified from the repository: name, GitHub handle, country, the technology stack
 * (frontend/package.json) and the "Agentic Portfolio" project itself.
 */

export const profile = {
  name: "Stefan Popa",
  first: "STEFAN",
  last: "POPA",
  initial: "S",
  role: ["SOFTWARE DEVELOPER", "& DIGITAL BUILDER"],
  intro:
    "I design and build digital experiences that feel simple, work hard, and make people want to stay a little longer.",
  location: "BASED IN ROMANIA",
  availability: "AVAILABLE FOR SELECT PROJECTS",
  github: "https://github.com/StefPo09",
  githubHandle: "StefPo09",
  // PLACEHOLDER: replace with your real address before publishing.
  email: "your.name@example.com",
  emailPlaceholder: true,
};

export type Project = {
  number: string;
  name: string;
  meta: string;
  description: string;
  bullets: string[];
  tags: string[];
  live?: string;
  code?: string;
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "AGENTIC PORTFOLIO",
    meta: "THIS SITE · NEXT.JS + REACT",
    description:
      "A portfolio that introduces itself by building itself: a team of collaborator cursors wireframes, types and reveals the real page.",
    bullets: [
      "Built with Next.js, React and TypeScript",
      "Live-build intro with skip, Escape and reduced-motion support",
      "Self-hosted fonts and original CSS artwork, no remote assets",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    code: "https://github.com/StefPo09/AgenticPortofolio",
    placeholder: false,
  },
  {
    number: "02",
    name: "PROJECT TWO",
    meta: "PLACEHOLDER · ROLE · YEAR",
    description: "Placeholder: describe a real project, the problem it solved and what you shipped.",
    bullets: ["Placeholder: a concrete outcome", "Placeholder: a measurable result"],
    tags: ["Stack", "Stack"],
    placeholder: true,
  },
  {
    number: "03",
    name: "PROJECT THREE",
    meta: "PLACEHOLDER · ROLE · YEAR",
    description: "Placeholder: describe a real project, the problem it solved and what you shipped.",
    bullets: ["Placeholder: a concrete outcome", "Placeholder: a measurable result", "Placeholder: what you learned"],
    tags: ["Stack", "Stack", "Stack"],
    placeholder: true,
  },
  {
    number: "04",
    name: "PROJECT FOUR",
    meta: "PLACEHOLDER · ROLE · YEAR",
    description: "Placeholder: describe a real project, the problem it solved and what you shipped.",
    bullets: ["Placeholder: a concrete outcome"],
    tags: ["Stack", "Stack"],
    placeholder: true,
  },
];

/** Technologies present in frontend/package.json. */
export const stack = ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Playwright", "Capacitor"];

export const trackRecord = {
  // PLACEHOLDER: replace with one real, verifiable achievement.
  figure: "00",
  caption: "Placeholder: replace with one real, verifiable achievement.",
  entries: [
    { title: "Role or milestone", meta: "PLACEHOLDER · ORGANISATION · DATES" },
    { title: "Role or milestone", meta: "PLACEHOLDER · ORGANISATION · DATES" },
    { title: "Role or milestone", meta: "PLACEHOLDER · ORGANISATION · DATES" },
    { title: "Education", meta: "PLACEHOLDER · INSTITUTION · DATES" },
  ],
};

export const about = {
  paragraphs: [
    "Good software should be more than working code. It should make a difficult thing feel easy, an ordinary moment feel considered, and an ambitious idea feel possible.",
    "I bring product thinking, a feel for design, and the engineering to get it shipped, without losing sight of the people on the other side of the screen.",
  ],
  education: { title: "Education & experience", detail: "Placeholder: add your degree, school and dates", placeholder: true },
  skills: [
    { label: "LANGUAGES", value: "TypeScript", placeholder: false },
    { label: "WEB", value: "React, Next.js, Tailwind CSS", placeholder: false },
    { label: "BACKEND", value: "Placeholder: add yours", placeholder: true },
    { label: "TOOLS", value: "Git, Playwright", placeholder: false },
  ],
  how: [
    { title: "Start simple", text: "Placeholder: describe the first step of your process." },
    { title: "Build in the open", text: "Placeholder: describe how you work with others." },
    { title: "Ship, then polish", text: "Placeholder: describe how you refine and release." },
    { title: "Keep practising", text: "Placeholder: describe how you keep learning." },
  ],
  quote: "BUILD IT.\nMEAN IT.",
};

export const contacts = [
  { key: "email", label: "EMAIL", value: profile.email, href: `mailto:${profile.email}`, placeholder: true },
  { key: "github", label: "GITHUB", value: profile.githubHandle, href: profile.github, placeholder: false },
  { key: "linkedin", label: "LINKEDIN", value: "in/your-handle", placeholder: true },
  { key: "instagram", label: "INSTAGRAM", value: "@your-handle", placeholder: true },
] as const;
