import "@fontsource/anton/latin-400.css";
import "@fontsource/caveat-brush/latin-400.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource-variable/inter/wght.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata, Viewport } from "next";
import AgenticIntro from "./components/AgenticIntro";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stefan Popa — Independent Developer",
  description:
    "A portfolio of thoughtful digital products, expressive interfaces, and useful software.",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  viewportFit: "cover",
};

/**
 * Runs before first paint: hides the page's build targets so the visitor never sees the finished
 * site flash before the live-build intro starts. If the intro engine has not started after six
 * seconds (for example JavaScript failed to load) the page is revealed anyway.
 */
const preIntro = `document.documentElement.setAttribute("data-intro","on");setTimeout(function(){if(!window.__introReady){document.documentElement.removeAttribute("data-intro");document.documentElement.setAttribute("data-intro-failed","")}},6000);`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preIntro }} />
        <noscript>
          <style>{`html[data-intro] [data-build]{opacity:1!important;clip-path:none!important;transform:none!important;filter:none!important}.intro-layer{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <AgenticIntro>{children}</AgenticIntro>
      </body>
    </html>
  );
}
