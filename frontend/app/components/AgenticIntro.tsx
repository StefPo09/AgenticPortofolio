"use client";

import { ArrowDownRight, ArrowUpRight, MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 8600;
const EXIT_DURATION = 700;

const agents = [
  { name: "design", color: "#f15a35", startX: "12vw", startY: "42vh", endX: "31vw", endY: "37vh", delay: "0ms" },
  { name: "layout", color: "#55a8ff", startX: "82vw", startY: "20vh", endX: "69vw", endY: "31vh", delay: "250ms" },
  { name: "type", color: "#ab83ff", startX: "21vw", startY: "76vh", endX: "48vw", endY: "43vh", delay: "510ms" },
  { name: "motion", color: "#42d5a1", startX: "88vw", startY: "67vh", endX: "76vw", endY: "53vh", delay: "180ms" },
  { name: "studio", color: "#ffd166", startX: "57vw", startY: "16vh", endX: "59vw", endY: "58vh", delay: "730ms" },
  { name: "build", color: "#63d8df", startX: "8vw", startY: "27vh", endX: "39vw", endY: "56vh", delay: "390ms" },
  { name: "detail", color: "#f185bc", startX: "71vw", startY: "81vh", endX: "62vw", endY: "45vh", delay: "620ms" },
];

const stages = [
  { time: 500, label: "Mapping the canvas" },
  { time: 2100, label: "Building the hero" },
  { time: 3900, label: "Setting the type" },
  { time: 5700, label: "Adding the details" },
  { time: 7900, label: "Ready when you are" },
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
  const [stage, setStage] = useState(stages[0].label);
  const [runId, setRunId] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const skipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    const startIntro = () => {
      clearTimers();
      if (skipTimer.current) clearTimeout(skipTimer.current);
      setRunId((current) => current + 1);
      setIsPlaying(true);
      setIsLeaving(false);
      setStage(stages[0].label);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reducedMotion ? 1500 : INTRO_DURATION;

      if (reducedMotion) {
        timers.current.push(setTimeout(() => setStage(stages[stages.length - 1].label), 700));
      } else {
        for (const step of stages.slice(1)) {
          timers.current.push(setTimeout(() => setStage(step.label), step.time));
        }
      }

      timers.current.push(setTimeout(() => setIsLeaving(true), duration));
      timers.current.push(setTimeout(() => setIsPlaying(false), duration + EXIT_DURATION));
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
      <div className="portfolio-stage" inert={isPlaying}>
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

          <header className="intro-topline">
            <a className="intro-wordmark" href="#top" tabIndex={-1} aria-hidden="true">SP<span>.</span></a>
            <nav className="intro-nav" aria-hidden="true">
              <span>WORK</span><span>ABOUT</span><span>CONTACT <i>↗</i></span>
            </nav>
            <p className="intro-session"><span /> BUILDING LIVE</p>
          </header>

          <div className="intro-canvas">
            <p className="intro-oversized" aria-hidden="true">PORTFOLIO</p>
            <div className="intro-portrait" aria-hidden="true">
              <span className="intro-portrait-halo" />
              <span className="intro-portrait-hair" />
              <span className="intro-portrait-face" />
              <span className="intro-portrait-neck" />
              <span className="intro-portrait-jacket" />
              <span className="intro-portrait-shirt" />
              <span className="intro-portrait-seam" />
              <span className="intro-portrait-note">INDEPENDENT BY NATURE.<br />DETAIL-ORIENTED BY DESIGN.</span>
            </div>
            <div className="intro-profile">
              <p className="intro-greeting">HELLO, I&apos;M <span>STEFAN</span></p>
              <h1>STEFAN<br /><span>POPA.</span></h1>
              <p className="intro-role">SOFTWARE DEVELOPER <i>&</i><br />DIGITAL BUILDER</p>
              <p className="intro-description">
                Thoughtful ideas. Carefully made.<br />Built for the way we live today.
              </p>
              <span className="intro-cta">LET&apos;S BUILD SOMETHING <ArrowUpRight aria-hidden="true" size={13} /></span>
            </div>
            <span className="intro-edge-note">INDEPENDENT DEVELOPER <i>↗</i></span>
            <div className="intro-work-preview">
              <span className="intro-preview-label">SELECTED WORK <i>↓</i></span>
              <b><i>01</i> PARKSHARE <ArrowUpRight aria-hidden="true" size={11} /></b>
              <b><i>02</i> AGENTIC PORTFOLIO <ArrowUpRight aria-hidden="true" size={11} /></b>
              <b className="intro-preview-optional"><i>03</i> FIELDNOTES <ArrowUpRight aria-hidden="true" size={11} /></b>
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

          <div className="intro-build-panel" aria-live="polite">
            <div className="intro-build-caption">
              <span>PORTFOLIO / DESIGN SESSION 001</span>
              <span><i /> {stage}</span>
            </div>
            <div className="intro-build-progress" aria-hidden="true"><span /></div>
            <div className="intro-build-footer">
              <div className="intro-agents-label"><i /> 07 COLLABORATORS ONLINE</div>
              <div className="intro-agent-swatches" aria-hidden="true">
                {agents.map((agent) => <i key={agent.name} style={{ backgroundColor: agent.color }} />)}
              </div>
              <button className="intro-skip" onClick={skipIntro} ref={skipButton} type="button">
                SKIP INTRO <ArrowUpRight aria-hidden="true" size={12} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
