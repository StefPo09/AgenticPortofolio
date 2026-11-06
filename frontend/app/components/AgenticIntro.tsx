"use client";

import { ArrowDownRight, ArrowUpRight, MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 7600;
const EXIT_DURATION = 750;

const agents = [
  { name: "design", color: "#f15a35", startX: "12vw", startY: "42vh", endX: "34vw", endY: "34vh", delay: "0ms" },
  { name: "layout", color: "#55a8ff", startX: "82vw", startY: "20vh", endX: "67vw", endY: "31vh", delay: "250ms" },
  { name: "type", color: "#ab83ff", startX: "21vw", startY: "76vh", endX: "45vw", endY: "41vh", delay: "510ms" },
  { name: "motion", color: "#42d5a1", startX: "88vw", startY: "67vh", endX: "74vw", endY: "51vh", delay: "180ms" },
  { name: "studio", color: "#ffd166", startX: "57vw", startY: "16vh", endX: "55vw", endY: "57vh", delay: "730ms" },
  { name: "build", color: "#63d8df", startX: "8vw", startY: "27vh", endX: "43vw", endY: "53vh", delay: "390ms" },
  { name: "detail", color: "#f185bc", startX: "71vw", startY: "81vh", endX: "61vw", endY: "44vh", delay: "620ms" },
];

const steps = [
  { time: 500, label: "Mapping the canvas" },
  { time: 1900, label: "Building the hero" },
  { time: 3500, label: "Putting ideas in place" },
  { time: 5200, label: "Polishing the details" },
  { time: 7000, label: "Ready when you are" },
];

type AgentStyle = React.CSSProperties & {
  "--agent-color": string;
  "--agent-start-x": string;
  "--agent-start-y": string;
  "--agent-end-x": string;
  "--agent-end-y": string;
  "--agent-delay": string;
};

export default function AgenticIntro({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [stage, setStage] = useState(steps[0].label);
  const [runId, setRunId] = useState(0);
  const skipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];

    const clearTimers = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const startIntro = () => {
      clearTimers();
      if (skipTimer.current) clearTimeout(skipTimer.current);
      setRunId((current) => current + 1);
      setIsPlaying(true);
      setIsLeaving(false);
      setStage(steps[0].label);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reducedMotion ? 1400 : INTRO_DURATION;

      if (reducedMotion) {
        timers.push(setTimeout(() => setStage(steps[steps.length - 1].label), duration * 0.7));
      } else {
        for (const step of steps.slice(1)) {
          timers.push(setTimeout(() => setStage(step.label), step.time));
        }
      }

      timers.push(setTimeout(() => setIsLeaving(true), duration));
      timers.push(setTimeout(() => setIsPlaying(false), duration + EXIT_DURATION));
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) startIntro();
    };

    startIntro();
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      clearTimers();
      if (skipTimer.current) clearTimeout(skipTimer.current);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      document.getElementById("hero-title")?.focus({ preventScroll: true });
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipButton.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPlaying, runId]);

  const skipIntro = () => {
    setIsLeaving(true);
    if (skipTimer.current) clearTimeout(skipTimer.current);
    skipTimer.current = setTimeout(() => setIsPlaying(false), EXIT_DURATION);
  };

  return (
    <>
      <div className="portfolio-stage" data-intro-playing={isPlaying || undefined} inert={isPlaying}>
        {children}
      </div>

      {isPlaying && (
        <div
          aria-label="Portfolio introduction: animated agents are building the page"
          aria-modal="true"
          className={`agent-intro${isLeaving ? " agent-intro--leaving" : ""}`}
          key={runId}
          onKeyDown={(event) => {
            if (event.key === "Escape") skipIntro();
            if (event.key === "Tab") {
              event.preventDefault();
              skipButton.current?.focus();
            }
          }}
          role="dialog"
        >
          <div className="intro-grid" aria-hidden="true" />
          <svg className="intro-routes" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <path className="intro-route intro-route--orange" d="M92 235 C190 235 220 310 325 286 S466 190 535 276" />
            <path className="intro-route intro-route--blue" d="M892 145 C820 175 840 265 745 282 S620 328 572 287" />
            <path className="intro-route intro-route--green" d="M880 436 C810 410 790 335 706 320 S645 301 572 287" />
            <path className="intro-route intro-route--violet" d="M175 500 C261 449 266 385 355 337 S470 276 535 276" />
          </svg>
          <div className="intro-topline">
            <a className="intro-wordmark" href="#top" tabIndex={-1} aria-hidden="true">
              SP<span>.</span>
            </a>
            <p className="intro-session">
              <span className="intro-live-dot" />
              LIVE BUILD <span className="intro-session-divider">/</span> SESSION 001
            </p>
            <span className="intro-agent-count">07 AGENTS ONLINE</span>
          </div>

          <div className="intro-canvas">
            <div className="intro-canvas-heading">
              <span>01 — COMPOSITION / PERSONAL PORTFOLIO</span>
              <span className="intro-canvas-status"><span /> {stage}</span>
            </div>

            <div className="intro-browser">
              <div className="intro-browser-chrome" aria-hidden="true">
                <span /><span /><span />
                <i>stefanpopa.design</i>
                <b>···</b>
              </div>
              <div className="intro-webpage">
                <div className="intro-page-nav" aria-hidden="true">
                  <span className="intro-page-logo">SP<span>.</span></span>
                  <span>WORK　 APPROACH　 CONTACT <b>↗</b></span>
                </div>
                <div className="intro-page-hero">
                  <div className="intro-page-copy">
                    <span className="intro-page-eyebrow"><i /> INDEPENDENT DEVELOPER · ROMANIA</span>
                    <h1>MAKE IT<br /><span>MEAN SOMETHING.</span></h1>
                    <span className="intro-page-description">
                      Thoughtful ideas. Carefully made.<br />Built for the way we live today.
                    </span>
                    <span className="intro-page-cta">EXPLORE THE WORK <ArrowDownRight aria-hidden="true" size={13} /></span>
                  </div>
                  <div className="intro-page-art" aria-hidden="true">
                    <span className="intro-page-sun" />
                    <span className="intro-page-figure" />
                    <span className="intro-page-art-label">CURIOSITY<br />IN, SOMETHING<br />USEFUL OUT.</span>
                    <span className="intro-page-art-outline" />
                  </div>
                </div>
                <div className="intro-page-work">
                  <span>SELECTED WORK</span>
                  <span className="intro-page-work-line" />
                  <b><i>01</i> IDEAS, MADE REAL <ArrowUpRight aria-hidden="true" size={12} /></b>
                  <b><i>02</i> THOUGHTFUL BY DESIGN <ArrowUpRight aria-hidden="true" size={12} /></b>
                </div>
              </div>
            </div>
          </div>

          {agents.map((agent, index) => {
            const style: AgentStyle = {
              "--agent-color": agent.color,
              "--agent-start-x": agent.startX,
              "--agent-start-y": agent.startY,
              "--agent-end-x": agent.endX,
              "--agent-end-y": agent.endY,
              "--agent-delay": agent.delay,
            };

            return (
              <div
                aria-hidden="true"
                className={`intro-cursor${index > 4 ? " intro-cursor--optional" : ""}`}
                key={agent.name}
                style={style}
              >
                <MousePointer2 className="intro-cursor-pointer" fill="var(--agent-color)" size={17} strokeWidth={2} />
                <span className="intro-cursor-tag">{agent.name}<span>·</span></span>
              </div>
            );
          })}

          <div className="intro-bottomline">
            <div className="intro-build-info">
              <span className="intro-build-dot" />
              <span>DESIGN SYSTEM</span>
              <i>·</i>
              <span>INTERFACE</span>
              <i>·</i>
              <span>DETAIL</span>
            </div>
            <div className="intro-progress" aria-hidden="true"><span /></div>
            <button className="intro-skip" onClick={skipIntro} ref={skipButton} type="button">
              SKIP INTRO <ArrowUpRight aria-hidden="true" size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
