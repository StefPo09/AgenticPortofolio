"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export default function SiteNav({ initial }: Readonly<{ initial: string }>) {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const update = () => {
      // The active link is the last section whose top has passed 40% of the viewport.
      const line = window.innerHeight * 0.4;
      let current = "top";
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className="site-nav-wrap" data-build="hero" data-kind="nav" data-fixed data-agent="index" data-at="1.5">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="site-nav-mark" href="#top" aria-label={`${initial}, back to top`}>{initial}</a>
        {links.map(({ id, label }) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
