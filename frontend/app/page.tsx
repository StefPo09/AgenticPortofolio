import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    name: "ParkShare",
    type: "Mobility platform · Next.js",
    description:
      "A thoughtful way to find, share, and manage parking. Bringing the whole experience together—from discovery to a better spot.",
    tags: ["PRODUCT", "WEB APP", "NEXT.JS"],
    color: "coral",
  },
  {
    number: "02",
    name: "Agentic Portfolio",
    type: "Interactive experience · React",
    description:
      "A portfolio that introduces itself by building itself. A collaborative, cursor-led experience made just for the web.",
    tags: ["CREATIVE CODE", "MOTION", "REACT"],
    color: "blue",
  },
  {
    number: "03",
    name: "Fieldnotes",
    type: "Product concept · Digital journal",
    description:
      "A deliberately simple space to collect small observations, useful links, and the ideas that connect them.",
    tags: ["CONCEPT", "INTERFACE", "PROTOTYPE"],
    color: "yellow",
  },
];

const capabilities = [
  {
    number: "01",
    name: "Product & experience",
    tags: ["Product thinking", "UX research", "Prototyping", "Interaction design"],
  },
  {
    number: "02",
    name: "Interface & visual",
    tags: ["Visual systems", "Responsive design", "Accessibility", "Motion"],
  },
  {
    number: "03",
    name: "Engineering & delivery",
    tags: ["React", "Next.js", "TypeScript", "APIs", "Shipping"],
  },
];

export default function HomePage() {
  return (
    <main className="portfolio portfolio--reference">
      <header className="site-header reference-header">
        <a className="wordmark reference-wordmark" href="#top" aria-label="Stefan Popa, back to top">
          SP<span>.</span>
        </a>
        <nav className="site-nav reference-nav" aria-label="Main navigation">
          <a href="#work"><i>01</i> WORK</a>
          <a href="#about"><i>02</i> ABOUT</a>
          <a href="#contact"><i>03</i> CONTACT</a>
        </nav>
        <a className="reference-availability" href="mailto:hello@yourname.dev">
          <span /> AVAILABLE FOR SELECT PROJECTS
        </a>
      </header>

      <section className="reference-hero" id="top" aria-labelledby="hero-title">
        <p className="hero-oversized" aria-hidden="true">PORTFOLIO</p>
        <div className="hero-portrait" role="img" aria-label="Abstract portrait illustration">
          <span className="portrait-halo" />
          <span className="portrait-hair" />
          <span className="portrait-face" />
          <span className="portrait-neck" />
          <span className="portrait-jacket" />
          <span className="portrait-shirt" />
          <span className="portrait-seam" />
          <span className="portrait-caption">INDEPENDENT BY NATURE.<br />DETAIL-ORIENTED BY DESIGN.</span>
        </div>
        <div className="hero-content">
          <p className="hero-greeting">HELLO, I&apos;M <span>STEFAN</span></p>
          <h1 id="hero-title" tabIndex={-1}>STEFAN<br /><span>POPA.</span></h1>
          <p className="hero-role">SOFTWARE DEVELOPER <span>&</span> DIGITAL BUILDER</p>
          <p className="hero-intro">
            I design and build digital experiences that feel simple, work hard, and make people
            want to stay a little longer.
          </p>
          <a className="hero-cta" href="#work">
            EXPLORE MY WORK <ArrowDownRight aria-hidden="true" size={15} />
          </a>
          <p className="hero-location"><span /> BASED IN ROMANIA <i>·</i> WORKING EVERYWHERE</p>
        </div>
        <span className="hero-side-note">INDEPENDENT DEVELOPER <i>↗</i></span>
        <a className="hero-scroll" href="#work" aria-label="Scroll to selected work">
          <span>SCROLL TO EXPLORE</span><ArrowDownRight aria-hidden="true" size={15} />
        </a>
        <div className="hero-coordinate">45° 56&apos; 49.2&quot; N &nbsp; 24° 58&apos; 14.4&quot; E</div>
      </section>

      <div className="reference-ticker" aria-label="Independent thinking, intentional making">
        <div className="reference-ticker-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index}>INDEPENDENT THINKING <b>✳</b> INTENTIONAL MAKING <b>✳</b> BUILT TO BE USEFUL <b>✳</b></span>
          ))}
        </div>
      </div>

      <section className="reference-work section-wrap" id="work" aria-labelledby="work-title">
        <div className="reference-section-head">
          <div>
            <p className="reference-kicker"><span>01</span> SELECTED WORK</p>
            <h2 id="work-title">WORK THAT<br /><span>SHIPS.</span></h2>
          </div>
          <p className="reference-section-intro">
            A few things I&apos;ve been busy making. Different problems, same belief: the details
            are the experience.
          </p>
        </div>

        <div className="reference-project-list">
          {projects.map((project) => (
            <article className={`reference-project reference-project--${project.color}`} key={project.number}>
              <span className="reference-project-number">{project.number}<i> / 03</i></span>
              <div className="reference-project-main">
                <p className="reference-project-type">{project.type}</p>
                <h3>{project.name}<ArrowUpRight aria-hidden="true" size={19} /></h3>
                <p className="reference-project-description">{project.description}</p>
                <ul className="reference-project-tags" aria-label={`${project.name} categories`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <div className="reference-project-art" aria-hidden="true">
                <span className="project-art-glow" />
                <span className="project-art-grid" />
                <span className="project-art-label">{project.number}<i> — FEATURED PROJECT</i></span>
                <span className="project-art-title">
                  {project.name === "ParkShare" ? <>PARK<span> / </span>SHARE</> : project.name === "Agentic Portfolio" ? <>IDEAS<br /><span>INTO</span><br />REALITY.</> : <>NOTICE<br /><span>THE</span><br />DETAILS.</>}
                </span>
                <span className="project-art-stamp">THOUGHTFULLY<br />MADE<br /><b>↗</b></span>
              </div>
            </article>
          ))}
        </div>
        <div className="reference-work-footer">
          <span><i /> A FEW THINGS MADE WITH INTENTION.</span>
          <a href="https://github.com/StefPo09" target="_blank" rel="noreferrer">
            ALL PROJECTS ON GITHUB <ArrowUpRight aria-hidden="true" size={13} />
          </a>
        </div>
      </section>

      <section className="reference-statement" aria-labelledby="statement-title">
        <div className="section-wrap">
          <p className="reference-kicker"><span>02</span> A LITTLE ABOUT HOW I WORK</p>
          <div className="reference-statement-grid">
            <h2 id="statement-title">BUILD IT.<br /><span>MEAN IT.</span></h2>
            <div className="reference-statement-copy">
              <p>
                Good software should be more than working code. It should make a difficult thing
                feel easy, an ordinary moment feel considered, and an ambitious idea feel
                possible.
              </p>
              <p>
                I bring product thinking, a feel for design, and the engineering to get it
                shipped—without losing sight of the people on the other side of the screen.
              </p>
              <a className="reference-inline-link" href="https://github.com/StefPo09" target="_blank" rel="noreferrer">
                FIND ME ON GITHUB <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </div>
          </div>
          <div className="reference-stats">
            <div><strong>03</strong><span>WAYS TO MAKE IT BETTER</span></div>
            <div><strong>01</strong><span>TEAM OF ONE. ALWAYS COLLABORATIVE.</span></div>
            <div><strong>∞</strong><span>THINGS LEFT TO BUILD</span></div>
          </div>
        </div>
      </section>

      <section className="reference-capabilities section-wrap" id="about" aria-labelledby="capabilities-title">
        <div className="reference-section-head">
          <div>
            <p className="reference-kicker"><span>03</span> GOOD WORK, FULL CIRCLE</p>
            <h2 id="capabilities-title">NOT JUST CODE<br /><span>THAT SHIPS.</span></h2>
          </div>
          <p className="reference-section-intro">
            From the first awkward question to the final, tiny detail: the whole process matters.
          </p>
        </div>
        <div className="reference-capability-list">
          {capabilities.map((capability) => (
            <article className="reference-capability" key={capability.number}>
              <span className="reference-capability-number">{capability.number}</span>
              <h3>{capability.name}</h3>
              <ul>{capability.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <ArrowUpRight aria-hidden="true" size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="reference-contact" id="contact" aria-labelledby="contact-title">
        <div className="section-wrap reference-contact-inner">
          <p className="reference-kicker"><span>04</span> ONE THING LEFT</p>
          <div className="reference-contact-grid">
            <h2 id="contact-title">LET&apos;S WORK<br /><span>TOGETHER.</span></h2>
            <div className="reference-contact-copy">
              <p>
                Have a good idea, a not-quite-solved problem, or something you just wish worked
                better? I&apos;d like to hear about it.
              </p>
              <a className="hero-cta" href="mailto:hello@yourname.dev">
                START A CONVERSATION <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </div>
          </div>
          <div className="reference-contact-footer">
            <span><i /> OPEN TO MEANINGFUL PROJECTS</span>
            <span>BASED IN ROMANIA · WORKING WORLDWIDE</span>
            <a href="#top">BACK TO THE TOP ↑</a>
          </div>
        </div>
      </section>

      <footer className="site-footer section-wrap reference-footer">
        <a className="wordmark reference-wordmark" href="#top" aria-label="Stefan Popa, back to top">SP<span>.</span></a>
        <p>INDEPENDENT BY NATURE. DETAIL-ORIENTED BY DESIGN.</p>
        <span>© {new Date().getFullYear()} STEFAN POPA</span>
      </footer>
    </main>
  );
}
