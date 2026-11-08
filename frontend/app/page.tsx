import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowUpRight } from "lucide-react";
import Portrait from "./components/Portrait";
import SiteNav from "./components/SiteNav";
import { about, contacts, profile, projects, stack, trackRecord } from "./content";

const icons = { email: faEnvelope, github: faGithub, linkedin: faLinkedin, instagram: faInstagram } as const;

function Placeholder() {
  return <span className="ph">PLACEHOLDER</span>;
}

export default function HomePage() {
  const openSource = projects.filter((project) => project.code).length;

  return (
    <main className="portfolio">
      <SiteNav initial={profile.initial} />

      {/* HERO ------------------------------------------------------------ */}
      <section className="hero" id="top" aria-labelledby="hero-title">
        <p className="hero-word" aria-hidden="true" data-build="hero" data-kind="art" data-agent="motion" data-at="2.1">
          PORTFOLIO
        </p>
        <div className="hero-portrait" data-build="hero" data-kind="art" data-agent="render" data-at="1.8">
          <Portrait />
        </div>
        <div className="hero-copy">
          <p className="hero-hello" data-build="hero" data-kind="text" data-agent="typeset" data-at="2.3">
            Hello, I&apos;m
          </p>
          <h1 id="hero-title" tabIndex={-1} data-build="hero" data-kind="text" data-agent="typeset" data-at="2.6">
            {profile.first}
            <br />
            {profile.last}
            <span className="dot">.</span>
          </h1>
          <p className="hero-role" data-build="hero" data-kind="text" data-agent="palette" data-at="3.6">
            {profile.role[0]}
            <br />
            {profile.role[1]}
          </p>
          <p className="hero-intro" data-build="hero" data-kind="text" data-agent="copy" data-at="4.4">
            {profile.intro}
          </p>
          <a className="btn" href="#work" data-build="hero" data-kind="block" data-agent="deploy" data-at="5.6">
            VIEW WORK <ArrowUpRight aria-hidden="true" size={14} />
          </a>
          <p className="hero-meta" data-build="hero" data-kind="text" data-agent="lint" data-at="6.4">
            {profile.location} <i>·</i> {profile.availability}
          </p>
        </div>
      </section>

      {/* WORK ------------------------------------------------------------ */}
      <section className="work wrap" id="work" aria-labelledby="work-title">
        <div className="section-head">
          <div>
            <p className="eyebrow" data-build="work" data-kind="text" data-agent="typeset">SELECTED WORK</p>
            <h2 id="work-title" className="display" data-build="work" data-kind="text" data-agent="typeset">
              WORK THAT
              <br />
              <span>SHIPS.</span>
            </h2>
          </div>
          <div className="section-aside">
            <p data-build="work" data-kind="text" data-agent="copy">
              Production apps, experiments and side projects. Every project here went from a brief to something
              people can use.
            </p>
            <dl className="counters" data-build="work" data-kind="block" data-agent="palette">
              <div>
                <dt>PROJECTS LISTED</dt>
                <dd>{String(projects.length).padStart(2, "0")}<span>.</span></dd>
              </div>
              <div>
                <dt>OPEN SOURCE</dt>
                <dd>{String(openSource).padStart(2, "0")}<span>.</span></dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="cards">
          {projects.map((project) => (
            <article
              className={`card card--${project.number}`}
              key={project.number}
              data-build="work"
              data-kind="block"
              data-agent="render"
            >
              <header className="card-top">
                <span className="card-num">{project.number}</span>
                <span className="card-meta">{project.meta}</span>
              </header>
              <h3 data-build="work" data-kind="text" data-agent="typeset">
                {project.name}
              </h3>
              <p className="card-desc" data-build="work" data-kind="text" data-agent="copy">
                {project.description}
              </p>
              <ul className="card-list" data-build="work" data-kind="text" data-agent="copy">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <footer className="card-foot" data-build="work" data-kind="block" data-agent="lint">
                <ul className="chips" aria-label={`${project.name} technologies`}>
                  {project.tags.map((tag, index) => (
                    <li key={`${tag}-${index}`}>{tag}</li>
                  ))}
                </ul>
                <div className="card-links">
                  {project.placeholder && <Placeholder />}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      LIVE <ArrowUpRight aria-hidden="true" size={12} />
                    </a>
                  )}
                  {project.code && (
                    <a href={project.code} target="_blank" rel="noreferrer">
                      CODE <ArrowUpRight aria-hidden="true" size={12} />
                    </a>
                  )}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* STACK ----------------------------------------------------------- */}
      <section className="stack" aria-labelledby="stack-title">
        <div className="wrap">
          <p id="stack-title" className="eyebrow" data-build="stack" data-kind="text" data-agent="typeset">
            STACK I SHIP WITH
          </p>
        </div>
        <div className="marquee" data-build="stack" data-kind="art" data-agent="motion">
          <ul className="marquee-track">
            {[0, 1].map((copy) =>
              stack.map((tool) => (
                <li key={`${copy}-${tool}`} aria-hidden={copy === 1 ? "true" : undefined}>
                  {tool}
                  <b aria-hidden="true">●</b>
                </li>
              )),
            )}
          </ul>
        </div>
      </section>

      {/* TRACK RECORD ---------------------------------------------------- */}
      <section className="track wrap" aria-labelledby="track-title">
        <p className="eyebrow" data-build="track" data-kind="text" data-agent="typeset">TRACK RECORD</p>
        <h2 id="track-title" className="display" data-build="track" data-kind="text" data-agent="typeset">
          BUILT FAST.
          <br />
          <span>SHIPPED REAL.</span>
        </h2>
        <div className="track-grid">
          <div className="track-figure" data-build="track" data-kind="art" data-agent="palette">
            <Placeholder />
            <strong>
              {trackRecord.figure}
              <span>.</span>
            </strong>
            <p>{trackRecord.caption}</p>
          </div>
          <ol className="timeline">
            {trackRecord.entries.map((entry, index) => (
              <li key={index} data-build="track" data-kind="text" data-agent="index">
                <strong>{entry.title}</strong>
                <span>{entry.meta}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ABOUT ----------------------------------------------------------- */}
      <section className="about wrap" id="about" aria-labelledby="about-title">
        <p className="eyebrow" data-build="about" data-kind="text" data-agent="typeset">ABOUT</p>
        <h2 id="about-title" className="display" data-build="about" data-kind="text" data-agent="typeset">
          NOT JUST CODE.
          <br />
          <span>CODE THAT SHIPS.</span>
        </h2>
        <div className="about-copy">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} data-build="about" data-kind="text" data-agent="copy">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="about-grid">
          <div className="skills">
            <p className="eyebrow eyebrow--muted" data-build="about" data-kind="text" data-agent="lint">
              EDUCATION &amp; SKILLS
            </p>
            <div data-build="about" data-kind="block" data-agent="index">
              <h3>{about.education.title}</h3>
              <p className="skills-detail">
                {about.education.detail} <Placeholder />
              </p>
            </div>
            <dl data-build="about" data-kind="block" data-agent="qa">
              {about.skills.map((skill) => (
                <div key={skill.label}>
                  <dt>{skill.label}</dt>
                  <dd>
                    {skill.value}
                    {skill.placeholder && <Placeholder />}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="how">
            <p className="eyebrow eyebrow--muted" data-build="about" data-kind="text" data-agent="lint">
              HOW I WORK
            </p>
            <ol>
              {about.how.map((step, index) => (
                <li key={step.title} data-build="about" data-kind="text" data-agent="copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="quote" data-build="about" data-kind="block" data-agent="palette">
            <p>{about.quote}</p>
            <span>— {profile.first.charAt(0) + profile.first.slice(1).toLowerCase()}</span>
          </aside>
        </div>
      </section>

      {/* CONTACT --------------------------------------------------------- */}
      <section className="contact wrap" id="contact" aria-labelledby="contact-title">
        <p className="eyebrow" data-build="contact" data-kind="text" data-agent="typeset">CONTACT</p>
        <div className="contact-grid">
          <div>
            <h2 id="contact-title" className="display" data-build="contact" data-kind="text" data-agent="typeset">
              LET&apos;S WORK
              <br />
              <span>TOGETHER.</span>
            </h2>
            <p className="contact-lead" data-build="contact" data-kind="text" data-agent="copy">
              Have a good idea, a not-quite-solved problem, or something you just wish worked better? I&apos;d like
              to hear about it.
            </p>
            <a className="btn" href={`mailto:${profile.email}`} data-build="contact" data-kind="block" data-agent="deploy">
              EMAIL ME <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          </div>
          <ul className="contact-list" data-build="contact" data-kind="block" data-agent="index">
            {contacts.map((contact) => (
              <li key={contact.key}>
                <FontAwesomeIcon icon={icons[contact.key]} aria-hidden="true" />
                <div>
                  <span>{contact.label}</span>
                  {"href" in contact && contact.href ? (
                    <a href={contact.href} {...(contact.key === "github" ? { target: "_blank", rel: "noreferrer" } : {})}>
                      {contact.value}
                    </a>
                  ) : (
                    <b>{contact.value}</b>
                  )}
                  {contact.placeholder && <Placeholder />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="footer wrap">
        <span>© {new Date().getFullYear()} {profile.name.toUpperCase()}</span>
        <a href="#top">BACK TO THE TOP ↑</a>
      </footer>
    </main>
  );
}
