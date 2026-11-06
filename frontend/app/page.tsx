import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    name: "Agentic Portfolio",
    category: "Product design · Web",
    description:
      "A personal corner of the internet for thoughtful experiments, useful tools, and work in progress.",
    className: "project-art--portfolio",
    mark: "MAKE\nIT MATTER",
  },
  {
    number: "02",
    name: "ParkShare",
    category: "Mobility · Platform",
    description:
      "A simpler way for drivers to find a spot and make better use of the parking around them.",
    className: "project-art--parkshare",
    mark: "PARK\nTOGETHER",
  },
  {
    number: "03",
    name: "Fieldnotes",
    category: "Concept · Digital journal",
    description:
      "An unhurried place to collect small observations, save inspiration, and connect the dots.",
    className: "project-art--fieldnotes",
    mark: "NOTICE\nMORE",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Product thinking",
    description: "Turning the real problem into a clear, useful experience.",
    tags: ["Discovery", "Prototyping", "Interaction"],
  },
  {
    number: "02",
    title: "Interface design",
    description: "Making digital products feel considered, distinct, and easy to use.",
    tags: ["Visual systems", "Responsive UI", "Accessibility"],
  },
  {
    number: "03",
    title: "Frontend craft",
    description: "Bringing ideas to life with fast, maintainable web experiences.",
    tags: ["React", "Next.js", "TypeScript"],
  },
];

export default function HomePage() {
  return (
    <main className="portfolio">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Stefan Popa, back to top">
          SP<span>.</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a className="nav-contact" href="#contact">
            Let&apos;s talk <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </nav>
      </header>

      <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Independent developer · Romania</p>
          <h1 id="hero-title" tabIndex={-1}>
            MAKE IT
            <br />
            <span>MEAN</span>
            <br />
            SOMETHING<span className="period">.</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-intro">
              I turn ambitious ideas into clear, useful digital experiences — from the first
              sketch to the final line of code.
            </p>
            <a className="round-link" href="#work" aria-label="Scroll to selected work">
              <ArrowDownRight aria-hidden="true" size={22} />
            </a>
          </div>
        </div>

        <div className="hero-art" role="img" aria-label="Abstract orange and cream portrait illustration">
          <div className="art-orbit art-orbit--one" />
          <div className="art-orbit art-orbit--two" />
          <div className="art-sun" />
          <div className="art-figure">
            <div className="art-head" />
            <div className="art-neck" />
            <div className="art-body" />
          </div>
          <span className="art-caption">CURIOSITY<br />IN, SOMETHING<br />USEFUL OUT.</span>
          <span className="art-index">FIG. 01 — ALWAYS IN PROGRESS</span>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>THOUGHTFUL</span>
          <span>BY DESIGN</span>
          <span>↘</span>
        </div>
      </section>

      <div className="ticker" aria-label="A little less ordinary, a little more useful">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index}>A LITTLE LESS ORDINARY <b>✳</b> A LITTLE MORE USEFUL <b>✳</b></span>
          ))}
        </div>
      </div>

      <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">GOOD IDEAS.<br /><span>MADE REAL.</span></h2>
          </div>
          <p className="section-note">
            A few directions I like to explore: useful products, playful systems, and details
            that make the whole thing feel right.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className={`project-art ${project.className}`}>
                <span className="project-art-index">{project.number} / 03</span>
                <span className="project-art-mark">{project.mark.split("\n").map((line) => <span key={line}>{line}</span>)}</span>
                <span className="project-art-orbit" aria-hidden="true" />
                <span className="project-art-caption">A SMALL IDEA, WITH ROOM TO GROW.</span>
                <a className="project-open" href="#contact" aria-label={`Ask about ${project.name}`}>
                  <ArrowUpRight aria-hidden="true" size={20} />
                </a>
              </div>
              <div className="project-meta">
                <div>
                  <p className="project-category">{project.category}</p>
                  <h3>{project.name}</h3>
                </div>
                <span className="project-number">{project.number}</span>
              </div>
              <p className="project-description">{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title">
        <div className="section-wrap approach-inner">
          <div className="approach-intro">
            <p className="eyebrow">02 / What I bring</p>
            <h2 id="approach-title">THINK IT<br />THROUGH.<br /><span>MAKE IT<br />MATTER.</span></h2>
            <p>
              Good work happens where curiosity meets craft. I like getting close to the problem,
              keeping the process open, and making every decision earn its place.
            </p>
            <a className="text-link" href="https://github.com/StefPo09" target="_blank" rel="noreferrer">
              More on GitHub <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability" key={capability.number}>
                <span className="capability-number">{capability.number}</span>
                <div className="capability-content">
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <ul aria-label={`${capability.title} specialties`}>
                    {capability.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <ArrowUpRight aria-hidden="true" className="capability-arrow" size={18} />
              </article>
            ))}
            <p className="capability-footnote">SMALL TEAMS, OPEN MINDS, GOOD QUESTIONS.</p>
          </div>
        </div>
      </section>

      <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
        <p className="eyebrow">03 / Your turn</p>
        <div className="contact-layout">
          <h2 id="contact-title">GOT A GOOD<br /><span>ONE?</span></h2>
          <div className="contact-aside">
            <p>
              Have a rough idea, a tricky problem, or a project that needs a thoughtful pair of
              hands? Let&apos;s make a start.
            </p>
            <a className="contact-button" href="mailto:hello@yourname.dev">
              Say hello <ArrowUpRight aria-hidden="true" size={19} />
            </a>
          </div>
        </div>
        <div className="contact-bottom">
          <span>OPEN TO GOOD COLLABORATIONS</span>
          <a href="#top">BACK TO THE TOP ↑</a>
        </div>
      </section>

      <footer className="site-footer section-wrap">
        <a className="wordmark" href="#top" aria-label="Stefan Popa, back to top">
          SP<span>.</span>
        </a>
        <p>Made with curiosity, in Romania.</p>
        <span>© {new Date().getFullYear()} STEFAN POPA</span>
      </footer>
    </main>
  );
}
