/**
 * Planning + motion maths for the live-build intro.
 *
 * Elements in the real page opt in with data attributes:
 *   data-build="<section>"   which section window the element is built in
 *   data-kind="text|block|art|nav"   how it is revealed
 *   data-agent="<agent id>"  the agent that builds it (others arrive as helpers)
 *   data-at="<seconds>"      optional fixed start time (used to match the reference pacing)
 *   data-fixed               the element is position: fixed (rect is in viewport space)
 *
 * The timeline (seconds) follows the reference footage:
 *   0.0-0.9  loader, agents appear         7.6-20.4 selected work + project cards
 *   0.9-2.4  blueprint wireframes          20.6-23.2 stack marquee
 *   1.5-7.4  hero is built                 23.4-28.2 track record
 *                                          28.4-36.0 about      36.2-39.4 contact
 */

export type Kind = "text" | "block" | "art" | "nav";

export const SECTION_WINDOWS: Record<string, [number, number]> = {
  hero: [0.9, 7.4],
  work: [7.6, 20.4],
  stack: [20.6, 23.2],
  track: [23.4, 28.2],
  about: [28.4, 36.0],
  contact: [36.2, 39.4],
};

export const SECTION_LABELS: Record<string, string> = {
  hero: "Building the hero",
  work: "Composing selected work",
  stack: "Setting the stack",
  track: "Logging the track record",
  about: "Writing the about section",
  contact: "Wiring up contact",
};

/** Time at which every element has been built (seconds). */
export const BUILD_END = 40;
/** Seconds spent flying the agents out and returning to the top. */
export const FINISH_DURATION = 1.7;
export const REDUCED_DURATION = 1.2;

export type Agent = {
  id: string;
  name: string;
  color: string;
  /** Starting position as a fraction of the viewport. */
  home: [number, number];
  /** Time the cursor appears (seconds). */
  appear: number;
};

export const AGENTS: Agent[] = [
  { id: "typeset", name: "Typeset", color: "#4ade80", home: [0.22, 0.3], appear: 0.55 },
  { id: "copy", name: "Copy", color: "#38bdf8", home: [0.8, 0.14], appear: 0.62 },
  { id: "motion", name: "Motion", color: "#f472b6", home: [0.5, 0.3], appear: 0.7 },
  { id: "palette", name: "Palette", color: "#facc15", home: [0.07, 0.07], appear: 0.5 },
  { id: "deploy", name: "Deploy", color: "#fb923c", home: [0.42, 0.78], appear: 0.78 },
  { id: "review", name: "Review", color: "#fb7185", home: [0.64, 0.7], appear: 0.85 },
  { id: "render", name: "Render", color: "#a78bfa", home: [0.3, 0.56], appear: 0.9 },
  { id: "lint", name: "Lint", color: "#e5e7eb", home: [0.93, 0.6], appear: 0.95 },
  { id: "index", name: "Index", color: "#22d3ee", home: [0.12, 0.6], appear: 0.66 },
  { id: "qa", name: "QA", color: "#818cf8", home: [0.94, 0.38], appear: 0.74 },
];

const DEFAULT_AGENT_BY_KIND: Record<Kind, string[]> = {
  text: ["typeset", "copy"],
  block: ["render", "palette"],
  art: ["motion", "render"],
  nav: ["index"],
};

export type Rect = { x: number; y: number; w: number; h: number };

export type Step = {
  el: HTMLElement;
  section: string;
  kind: Kind;
  fixed: boolean;
  /** Document-space rect (viewport-space when `fixed`). */
  rect: Rect;
  agent: number;
  helpers: number[];
  wire: number;
  start: number;
  end: number;
  /** Last value written to the element's --p custom property. */
  shown: number;
};

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function durationFor(kind: Kind, chars: number) {
  switch (kind) {
    case "text":
      return 0.7 + Math.min(1.1, chars * 0.008);
    case "art":
      return 1.35;
    case "nav":
      return 0.85;
    default:
      return 1.15;
  }
}

function weightFor(kind: Kind, chars: number) {
  if (kind === "text") return 0.8 + Math.min(1.2, chars / 90);
  if (kind === "art") return 1.8;
  return 1.5;
}

export function planSteps(elements: HTMLElement[]): Step[] {
  const scrollY = window.scrollY;
  const bySection = new Map<string, HTMLElement[]>();
  for (const el of elements) {
    const section = el.dataset.build ?? "hero";
    bySection.set(section, [...(bySection.get(section) ?? []), el]);
  }

  const steps: Step[] = [];
  let order = 0;

  for (const [section, items] of bySection) {
    const [a, b] = SECTION_WINDOWS[section] ?? [1, 39];
    const hasFixedTimes = items.every((el) => el.dataset.at !== undefined);
    const weights = items.map((el) => weightFor((el.dataset.kind as Kind) ?? "text", el.textContent?.length ?? 0));
    const total = weights.reduce((sum, w) => sum + w, 0);
    let cumulative = 0;

    items.forEach((el, index) => {
      const kind = ((el.dataset.kind as Kind) ?? "text") as Kind;
      const chars = el.textContent?.length ?? 0;
      const dur = durationFor(kind, chars);
      const fixed = el.hasAttribute("data-fixed");
      const rect = el.getBoundingClientRect();

      const start = hasFixedTimes
        ? Number(el.dataset.at)
        : a + (cumulative / total) * Math.max(0.5, b - a - 1.1);
      cumulative += weights[index];

      // The hero is first drawn as a blueprint: every region is outlined together
      // before it is filled in. Later sections outline just before they are built.
      const wire = section === "hero" ? 1.0 + index * 0.06 : start - 0.5;

      const preferred = el.dataset.agent ?? DEFAULT_AGENT_BY_KIND[kind][order % DEFAULT_AGENT_BY_KIND[kind].length];
      let agent = AGENTS.findIndex((candidate) => candidate.id === preferred);
      if (agent < 0) agent = order % AGENTS.length;
      const h1 = (agent + 2 + (order % 3)) % AGENTS.length;
      let h2 = (agent + 5 + (order % 2)) % AGENTS.length;
      if (h2 === h1) h2 = (h2 + 1) % AGENTS.length;

      steps.push({
        el,
        section,
        kind,
        fixed,
        rect: {
          x: rect.left,
          y: fixed ? rect.top : rect.top + scrollY,
          w: rect.width,
          h: rect.height,
        },
        agent,
        helpers: [h1, h2],
        wire,
        start,
        end: start + dur,
        shown: -1,
      });
      order += 1;
    });
  }

  return steps.sort((x, y) => x.start - y.start);
}

/* ------------------------------------------------------------------ cursors */

export type Anchor = { x: number; y: number; fixed: boolean };

export type CursorKey = {
  step: Step;
  /** primary builders follow the reveal edge; helpers hover beside the element */
  primary: boolean;
  slot: number;
  arrive: number;
  leave: number;
};

export function buildCursorKeys(steps: Step[]): CursorKey[][] {
  const lists: CursorKey[][] = AGENTS.map(() => []);

  for (const step of steps) {
    lists[step.agent].push({
      step,
      primary: true,
      slot: 0,
      arrive: step.start - 0.4,
      leave: step.end + 0.15,
    });
    step.helpers.forEach((agent, slot) => {
      lists[agent].push({
        step,
        primary: false,
        slot,
        arrive: step.start + 0.05 + slot * 0.22,
        leave: step.start + (step.end - step.start) * (0.65 + slot * 0.1),
      });
    });
  }

  // Resolve overlaps: a cursor can only be in one place at a time and needs travel time.
  return lists.map((keys) => {
    keys.sort((x, y) => x.arrive - y.arrive);
    const kept: CursorKey[] = [];
    for (const key of keys) {
      const previous = kept[kept.length - 1];
      if (!previous) {
        kept.push(key);
        continue;
      }
      if (key.arrive >= previous.leave + 0.3) {
        kept.push(key);
      } else if (key.primary && previous.leave - key.arrive < 1.4) {
        previous.leave = Math.max(previous.arrive + 0.2, key.arrive - 0.3);
        kept.push(key);
      }
      // otherwise drop this (helper) key: the cursor is still busy.
    }
    return kept;
  });
}

function anchorFor(key: CursorKey, time: number, seed: number): Anchor {
  const { rect, fixed } = key.step;
  if (key.primary) {
    const progress = clamp((time - key.step.start) / (key.step.end - key.step.start));
    const follow = key.step.kind === "text" ? progress : 0.12 + progress * 0.5;
    return {
      x: rect.x + Math.min(rect.w, rect.w * follow) + 4,
      y: rect.y + Math.min(rect.h * 0.55, 46),
      fixed,
    };
  }
  // Helpers hover just below the element's right side, or just above its middle.
  const below = key.slot % 2 === 0;
  return {
    x: rect.x + rect.w * (below ? 0.82 : 0.46) + Math.sin(seed) * 6,
    y: below ? rect.y + Math.min(rect.h, 260) + 14 : rect.y - 14,
    fixed,
  };
}

const toView = (anchor: Anchor, scrollY: number) => ({
  x: anchor.x,
  y: anchor.fixed ? anchor.y : anchor.y - scrollY,
});

export type Placement = { x: number; y: number; visible: boolean };

/**
 * Where an agent cursor is at `time`, in viewport pixels.
 * Cursors hover at their home position, travel along curved paths between elements,
 * pause (with a tiny wobble) while building, and finally fly out at `exitAt`.
 */
export function cursorPlacement(
  agentIndex: number,
  keys: CursorKey[],
  time: number,
  scrollY: number,
  viewport: { w: number; h: number },
  exitAt: number,
): Placement {
  const agent = AGENTS[agentIndex];
  const seed = agentIndex * 1.7;
  const wobble = (t: number) => ({
    x: Math.sin(t * 1.9 + seed) * 3,
    y: Math.cos(t * 2.3 + seed) * 3,
  });
  const home = { x: agent.home[0] * viewport.w, y: agent.home[1] * viewport.h };

  if (time < agent.appear) return { x: home.x, y: home.y, visible: false };

  // Exit: glide off the nearest horizontal edge.
  if (time >= exitAt) {
    const progress = easeInOutCubic(clamp((time - exitAt) / 1.0));
    const last = lastKnown(agentIndex, keys, exitAt, scrollY, home, seed);
    const targetX = last.x < viewport.w / 2 ? -80 : viewport.w + 80;
    return {
      x: last.x + (targetX - last.x) * progress,
      y: last.y - 40 * progress,
      visible: progress < 1,
    };
  }

  // Which segment are we in?
  let previous: { anchor: Anchor; until: number } = {
    anchor: { x: home.x, y: home.y, fixed: true },
    until: agent.appear + 0.25,
  };

  for (const key of keys) {
    if (time < key.arrive) {
      return travel(previous, { anchor: anchorFor(key, key.arrive, seed), at: key.arrive }, time, scrollY, seed, wobble);
    }
    if (time <= key.leave) {
      const view = toView(anchorFor(key, time, seed), scrollY);
      const w = wobble(time);
      return { x: view.x + w.x, y: view.y + w.y, visible: true };
    }
    previous = { anchor: anchorFor(key, key.leave, seed), until: key.leave };
  }

  const view = toView(previous.anchor, scrollY);
  const w = wobble(time);
  return { x: view.x + w.x, y: view.y + w.y, visible: true };
}

function lastKnown(
  agentIndex: number,
  keys: CursorKey[],
  time: number,
  scrollY: number,
  home: { x: number; y: number },
  seed: number,
) {
  let anchor: Anchor = { x: home.x, y: home.y, fixed: true };
  for (const key of keys) {
    if (key.arrive <= time) anchor = anchorFor(key, Math.min(time, key.leave), seed);
  }
  void agentIndex;
  return toView(anchor, scrollY);
}

function travel(
  from: { anchor: Anchor; until: number },
  to: { anchor: Anchor; at: number },
  time: number,
  scrollY: number,
  seed: number,
  wobble: (t: number) => { x: number; y: number },
): Placement {
  const departure = Math.max(from.until, to.at - 1.0);
  const start = toView(from.anchor, scrollY);
  if (time <= departure) {
    const w = wobble(time);
    return { x: start.x + w.x, y: start.y + w.y, visible: true };
  }
  const end = toView(to.anchor, scrollY);
  const progress = easeInOutCubic(clamp((time - departure) / Math.max(0.05, to.at - departure)));
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.hypot(dx, dy);
  const bend = Math.min(180, distance * 0.22) * (Math.sin(seed * 12.9) > 0 ? 1 : -1);
  const cx = (start.x + end.x) / 2 - (dy / (distance || 1)) * bend;
  const cy = (start.y + end.y) / 2 + (dx / (distance || 1)) * bend;
  const inv = 1 - progress;
  return {
    x: inv * inv * start.x + 2 * inv * progress * cx + progress * progress * end.x,
    y: inv * inv * start.y + 2 * inv * progress * cy + progress * progress * end.y,
    visible: true,
  };
}

/* ------------------------------------------------------------------ camera */

/**
 * The page auto-scrolls to follow the build. Returns the document Y the camera
 * should be looking at for `time`: just enough scroll to keep the active element
 * above the lower third of the viewport (so the hero stays put until it is nearly complete,
 * as in the reference footage).
 */
export function cameraTarget(steps: Step[], time: number, viewportH: number, maxScroll: number) {
  let focus = 0;
  for (const step of steps) {
    if (step.fixed) continue;
    if (step.start > time + 0.2) break;
    focus = step.rect.y;
  }
  return clamp(focus - viewportH * 0.62, 0, maxScroll);
}
