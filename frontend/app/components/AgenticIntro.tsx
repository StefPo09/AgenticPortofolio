"use client";

import { ArrowUpRight, Bot, MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AGENTS,
  BUILD_END,
  FINISH_DURATION,
  REDUCED_DURATION,
  SECTION_LABELS,
  SECTION_WINDOWS,
  buildCursorKeys,
  cameraTarget,
  clamp,
  cursorPlacement,
  easeOutCubic,
  planSteps,
  type Step,
} from "./liveBuild";

const LEAVE_MS = 450;
const MAX_BOXES = 10;
const VERBS: Record<string, string> = { text: "typing", block: "composing", art: "painting", nav: "linking" };

/**
 * Builds the real page in front of the visitor.
 *
 * The page (`children`) is rendered normally, but while the intro runs every element marked with
 * `data-build` is hidden by CSS and revealed by this engine, in order, while agent cursors travel
 * to it, outline it with a wireframe, and the camera scrolls to follow. When the build finishes
 * (or is skipped) the hidden state is removed and the finished, interactive site remains.
 */
export default function AgenticIntro({ children }: Readonly<{ children: React.ReactNode }>) {
  const [playing, setPlaying] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [runId, setRunId] = useState(0);

  const layerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finishRef = useRef<(immediate: boolean) => void>(() => {});
  const previousFocus = useRef<Element | null>(null);

  // Replay when the browser restores this page from the back/forward cache.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      setLeaving(false);
      setPlaying(true);
      setRunId((id) => id + 1);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // When the intro has been removed (and `inert` lifted by this render), hand focus back to the
  // page: the element that had it before, otherwise the main heading. Then honour a URL hash.
  const wasPlaying = useRef(true);
  useEffect(() => {
    if (playing) {
      wasPlaying.current = true;
      return;
    }
    if (!wasPlaying.current) return;
    wasPlaying.current = false;
    const before = previousFocus.current;
    const target = before instanceof HTMLElement && before.isConnected ? before : document.getElementById("hero-title");
    target?.focus({ preventScroll: true });
    const hash = window.location.hash.slice(1);
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
  }, [playing]);

  // The intro engine: one run per `runId`.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const root = document.documentElement;
    const body = document.body;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saved = { root: root.style.overflow, body: body.style.overflow };
    previousFocus.current = document.activeElement && document.activeElement !== body ? document.activeElement : null;

    let raf = 0;
    let cancelled = false;
    let finished = false;
    let leaveTimer: ReturnType<typeof setTimeout> | undefined;

    Reflect.set(window, "__introReady", true);
    root.setAttribute("data-intro", "on");
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    skipRef.current?.focus({ preventScroll: true });

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));
    let steps: Step[] = [];

    const clearBuildState = () => {
      for (const el of elements) el.style.removeProperty("--p");
      root.removeAttribute("data-intro");
    };

    const finish = (immediate: boolean) => {
      if (finished) return;
      finished = true;
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      clearBuildState();
      root.style.overflow = saved.root;
      body.style.overflow = saved.body;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setLeaving(true);
      leaveTimer = setTimeout(() => setPlaying(false), immediate ? 200 : LEAVE_MS);
    };
    finishRef.current = finish;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish(true);
      } else if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const start = async () => {
      try {
        if (!reduced) await Promise.race([document.fonts?.ready, new Promise((resolve) => setTimeout(resolve, 1500))]);
      } catch {
        /* fonts API unavailable: measure anyway */
      }
      if (cancelled) return;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      steps = planSteps(elements);

      if (reduced) {
        const order = Object.keys(SECTION_WINDOWS);
        for (const step of steps) {
          const index = Math.max(0, order.indexOf(step.section));
          step.start = 0.1 + index * 0.2;
          step.end = step.start + 0.45;
        }
      }

      const keys = reduced ? [] : buildCursorKeys(steps);
      const exitAt = BUILD_END + 0.2;
      const total = reduced ? REDUCED_DURATION : BUILD_END + FINISH_DURATION;
      const boxFor = new Map<Step, number>();
      const last: { x: number; y: number }[] = AGENTS.map(() => ({ x: 0, y: 0 }));
      let scroll = 0;
      let t = 0;
      let previous = performance.now();
      let lastLabel = "";
      let lastPct = -1;

      const setText = (el: HTMLElement | null, text: string) => {
        if (el && el.textContent !== text) el.textContent = text;
      };

      const tick = (now: number) => {
        if (cancelled) return;
        // Clamp the time step so a backgrounded tab pauses the build instead of skipping it.
        const dt = Math.min(0.25, (now - previous) / 1000);
        previous = now;
        t += dt;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // --- camera ---------------------------------------------------------
        if (!reduced) {
          const maxScroll = Math.max(0, root.scrollHeight - vh);
          const target = t >= BUILD_END ? 0 : cameraTarget(steps, t, vh, maxScroll);
          scroll += (target - scroll) * (1 - Math.exp(-dt * (t >= BUILD_END ? 2.4 : 2.6)));
          window.scrollTo({ top: scroll, left: 0, behavior: "instant" });
        }
        const scrollY = reduced ? 0 : scroll;

        // --- reveal the real elements ----------------------------------------
        let currentSection = "";
        for (const step of steps) {
          if (step.start <= t) currentSection = step.section;
          if (step.shown === 1) continue;
          if (t < step.start && step.shown === 0) continue;
          const raw = clamp((t - step.start) / (step.end - step.start));
          const eased = step.kind === "text" ? raw : easeOutCubic(raw);
          if (step.shown < 0 || Math.abs(eased - step.shown) > 0.003 || eased === 1) {
            step.el.style.setProperty("--p", eased.toFixed(3));
            step.shown = eased;
          }
        }

        if (!reduced) {
          // --- blueprint tint + loader -----------------------------------------
          const tint = easeOutCubic(clamp((t - 0.9) / 0.4)) * (1 - clamp((t - 2.2) / 0.8));
          layer.style.setProperty("--tint", tint.toFixed(3));
          if (loaderRef.current) loaderRef.current.dataset.on = t < 0.9 ? "true" : "false";

          // --- wireframes ------------------------------------------------------
          const active: Step[] = [];
          for (const step of steps) {
            if (t >= step.wire && t <= step.end + 0.35) active.push(step);
          }
          const visible = new Set(active.slice(-MAX_BOXES));
          for (const [step, index] of boxFor) {
            if (!visible.has(step)) {
              boxFor.delete(step);
              const stale = boxRefs.current[index];
              if (stale) stale.style.opacity = "0";
            }
          }
          const taken = new Set(boxFor.values());
          for (const step of visible) {
            let index = boxFor.get(step);
            if (index === undefined) {
              index = Array.from({ length: MAX_BOXES }, (_, i) => i).find((i) => !taken.has(i));
              if (index === undefined) continue;
              boxFor.set(step, index);
              taken.add(index);
            }
            const box = boxRefs.current[index];
            if (!box) continue;
            const y = step.fixed ? step.rect.y : step.rect.y - scrollY;
            const onScreen = y + step.rect.h > 0 && y < vh;
            const fadeIn = clamp((t - step.wire) / 0.2);
            const fadeOut = 1 - clamp((t - step.end) / 0.35);
            box.style.opacity = onScreen ? String(fadeIn * fadeOut) : "0";
            box.style.transform = `translate(${step.rect.x}px, ${y}px)`;
            box.style.width = `${step.rect.w}px`;
            box.style.height = `${step.rect.h}px`;
            const verb = t < step.start ? "sizing" : t < step.end ? VERBS[step.kind] : "done";
            setText(box.querySelector<HTMLElement>("[data-tag]"), `${AGENTS[step.agent].name} · ${verb}`);
            setText(box.querySelector<HTMLElement>("[data-dim]"), `${Math.round(step.rect.w)} × ${Math.round(step.rect.h)}`);
          }

          // --- cursors ---------------------------------------------------------
          AGENTS.forEach((_, index) => {
            const el = cursorRefs.current[index];
            if (!el) return;
            const place = cursorPlacement(index, keys[index], t, scrollY, { w: vw, h: vh }, exitAt);
            const speed = Math.hypot(place.x - last[index].x, place.y - last[index].y) / Math.max(dt, 0.001);
            last[index] = { x: place.x, y: place.y };
            el.dataset.on = place.visible ? "true" : "false";
            el.style.transform = `translate3d(${place.x}px, ${place.y}px, 0)`;
            el.style.setProperty("--blur", `${Math.min(2.2, speed / 900).toFixed(2)}px`);
          });
        }

        // --- HUD -------------------------------------------------------------
        const progress = clamp(t / (reduced ? REDUCED_DURATION : BUILD_END));
        const pct = Math.round(progress * 100);
        if (pct !== lastPct) {
          lastPct = pct;
          setText(pctRef.current, `${pct}%`);
          if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(3)})`;
        }
        const label =
          t >= (reduced ? REDUCED_DURATION - 0.3 : BUILD_END) ? "Build complete" : (SECTION_LABELS[currentSection] ?? "Mapping the canvas");
        if (label !== lastLabel) {
          lastLabel = label;
          setText(stageRef.current, label);
          setText(statusRef.current, label);
        }

        if (t >= total) {
          finish(false);
          return;
        }
        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame((now) => {
        previous = now;
        tick(now);
      });
    };
    void start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (leaveTimer) clearTimeout(leaveTimer);
      document.removeEventListener("keydown", onKeyDown);
      if (!finished) {
        clearBuildState();
        root.style.overflow = saved.root;
        body.style.overflow = saved.body;
      }
    };
  }, [runId]);

  return (
    <>
      <div className="portfolio-stage" inert={playing}>
        {children}
      </div>

      {playing && (
        <div
          aria-label="Portfolio introduction. Agents are building the page. Press Escape to skip."
          aria-modal="true"
          className={`intro-layer${leaving ? " is-leaving" : ""}`}
          key={runId}
          ref={layerRef}
          role="dialog"
        >
          <div className="intro-blocker" onMouseDown={(event) => event.preventDefault()} />
          <div className="intro-tint" aria-hidden="true" />

          <div className="intro-loader" data-on="true" ref={loaderRef} aria-hidden="true">
            <span className="intro-loader-ring">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} style={{ ["--i" as string]: i, background: AGENTS[i % AGENTS.length].color }} />
              ))}
            </span>
            <span className="intro-loader-mark">S</span>
          </div>

          {Array.from({ length: MAX_BOXES }, (_, i) => (
            <div
              aria-hidden="true"
              className="intro-box"
              key={i}
              ref={(el) => {
                boxRefs.current[i] = el;
              }}
            >
              <span className="intro-box-tag" data-tag />
              <span className="intro-box-dim" data-dim />
              <b /><b /><b /><b />
            </div>
          ))}

          {AGENTS.map((agent, i) => (
            <div
              aria-hidden="true"
              className="intro-cursor"
              data-on="false"
              key={agent.id}
              ref={(el) => {
                cursorRefs.current[i] = el;
              }}
              style={{ ["--agent" as string]: agent.color }}
            >
              <MousePointer2 className="intro-cursor-arrow" fill={agent.color} size={18} strokeWidth={1.5} />
              <span className="intro-cursor-tag">
                <Bot aria-hidden="true" size={11} /> {agent.name}
              </span>
            </div>
          ))}

          <div className="intro-hud">
            <div className="intro-hud-pill">
              <span className="intro-hud-live">
                <i /> AGENTS LIVE
              </span>
              <span className="intro-hud-count">{AGENTS.length} ONLINE</span>
              <span className="intro-hud-stage" ref={stageRef}>Mapping the canvas</span>
              <span className="intro-hud-pct" ref={pctRef}>0%</span>
              <button className="intro-skip" onClick={() => finishRef.current(true)} ref={skipRef} type="button">
                SKIP INTRO <ArrowUpRight aria-hidden="true" size={13} />
              </button>
              <span className="intro-hud-bar" aria-hidden="true">
                <i ref={barRef} />
              </span>
            </div>
          </div>

          <p className="sr-only" aria-live="polite" ref={statusRef} role="status" />
        </div>
      )}
    </>
  );
}
