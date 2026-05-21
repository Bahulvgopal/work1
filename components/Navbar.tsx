"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Countdown", href: "#countdown" },
  { name: "Events",    href: "#events"    },
  { name: "Timeline",  href: "#timeline"  },
  { name: "Gallery",   href: "#gallery"   },
  { name: "Venue",     href: "#venue"     },
  { name: "Contact",   href: "#contact"   },
];

function NavPetal({ size = 10, rotate = 0 }: { size?: number; rotate?: number }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 10 17" aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)`, display: "inline-block" }}>
      <defs>
        <radialGradient id="npg" cx="40%" cy="30%">
          <stop offset="0%"   stopColor="#ffe9a0" />
          <stop offset="60%"  stopColor="#c9a227" />
          <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="5" cy="8.5" rx="4.2" ry="8" fill="url(#npg)" opacity="0.55" />
    </svg>
  );
}

function CornerOrn({ flip }: { flip?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 22 22"
      style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.5, flexShrink: 0 }}
      aria-hidden="true">
      <path d="M2 2 L10 2" stroke="#c9a227" strokeWidth="1.2" />
      <path d="M2 2 L2 10" stroke="#c9a227" strokeWidth="1.2" />
      <circle cx="2" cy="2" r="1.4" fill="#c9a227" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');

        .nb-wrap { font-family: 'Cinzel', serif; }

        .nb-bar {
          background: linear-gradient(135deg,
            rgba(255,255,255,0.85) 0%,
            rgba(255,248,210,0.80) 50%,
            rgba(255,255,255,0.85) 100%
          );
          backdrop-filter: blur(18px) saturate(1.4);
          -webkit-backdrop-filter: blur(18px) saturate(1.4);
          border: 1px solid rgba(201,162,39,0.30);
          border-radius: 9999px;
          box-shadow:
            0 2px 24px rgba(184,134,11,0.12),
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(201,162,39,0.10);
          transition: box-shadow 0.4s ease;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          /* Responsive padding */
          padding: 0.6rem 1rem;
        }
        @media (min-width: 768px) {
          .nb-bar { padding: 0.7rem 1.6rem; }
        }
        .nb-bar.scrolled {
          box-shadow:
            0 6px 36px rgba(184,134,11,0.20),
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(201,162,39,0.12);
        }

        .nb-shimmer {
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,220,100,0.65), transparent);
          border-radius: 1px;
          pointer-events: none;
        }

        /* Monogram */
        .nb-mono {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          color: #1a1208;
          letter-spacing: 0.06em;
          line-height: 1;
          user-select: none;
          font-size: 1.35rem;
        }
        @media (min-width: 768px) { .nb-mono { font-size: 1.55rem; } }
        .nb-mono-amp {
          font-style: italic;
          color: #b8860b;
          margin: 0 0.04em;
          font-size: 1.15em;
        }

        /* Desktop nav links */
        .nb-nav {
          display: none;
          align-items: center;
          gap: 1.4rem;
        }
        @media (min-width: 768px) {
          .nb-nav { display: flex; gap: 1.6rem; }
        }
        @media (min-width: 1024px) {
          .nb-nav { gap: 2rem; }
        }

        .nb-link {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #5c4a1e;
          text-decoration: none;
          padding: 0.3rem 0.05rem;
          position: relative;
          white-space: nowrap;
          transition: color 0.25s ease;
        }
        @media (min-width: 1024px) {
          .nb-link { font-size: 0.63rem; letter-spacing: 0.22em; }
        }
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a227, transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s ease;
        }
        .nb-link:hover, .nb-link.nb-active { color: #b8860b; }
        .nb-link:hover::after, .nb-link.nb-active::after { transform: scaleX(1); }

        /* Hamburger — only on mobile */
        .nb-ham {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          background: none;
          border: 1px solid rgba(201,162,39,0.42);
          border-radius: 50%;
          cursor: pointer;
          color: #b8860b;
          transition: background 0.25s, border-color 0.25s;
          flex-shrink: 0;
        }
        .nb-ham:hover {
          background: rgba(201,162,39,0.1);
          border-color: rgba(184,134,11,0.7);
        }
        @media (min-width: 768px) { .nb-ham { display: none; } }

        /* Mobile drawer */
        .nb-drawer {
          margin-top: 0.6rem;
          background: linear-gradient(160deg,
            rgba(255,255,255,0.95) 0%,
            rgba(255,248,210,0.90) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201,162,39,0.28);
          border-radius: 22px;
          padding: 1.4rem 1.6rem;
          box-shadow:
            0 12px 48px rgba(184,134,11,0.16),
            inset 0 1px 0 rgba(255,255,255,0.9);
          position: relative;
          overflow: hidden;
        }

        .nb-mob-link {
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #5c4a1e;
          text-decoration: none;
          padding: 0.7rem 0;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          border-bottom: 1px solid rgba(201,162,39,0.15);
          transition: color 0.2s ease, padding-left 0.22s ease;
          /* min touch target */
          min-height: 44px;
        }
        .nb-mob-link:last-child { border-bottom: none; }
        .nb-mob-link:hover, .nb-mob-link:active { color: #b8860b; padding-left: 0.45rem; }

        .nb-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #c9a227;
          opacity: 0.45;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .nb-mob-link:hover .nb-dot,
        .nb-mob-link:active .nb-dot { opacity: 1; transform: scale(1.6); }
      `}</style>

      <header className="fixed top-0 left-0 z-40 w-full nb-wrap">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0.85rem 0.9rem" }}>

          {/* ── Pill bar ── */}
          <div className={`nb-bar${scrolled ? " scrolled" : ""}`}>
            <div className="nb-shimmer" />

            {/* Monogram */}
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 3 }}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <CornerOrn />
              <span className="nb-mono">
                M<span className="nb-mono-amp">&amp;</span>S
              </span>
              <CornerOrn flip />
            </motion.div>

            {/* Desktop nav */}
            <nav className="nb-nav" aria-label="Main navigation">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`nb-link${active === link.href ? " nb-active" : ""}`}
                  onClick={() => setActive(link.href)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.45 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Hamburger */}
            <motion.button
              className="nb-ham"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{    rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex" }}
                  >
                    <X size={15} />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate:   0, opacity: 1 }}
                    exit={{    rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex" }}
                  >
                    <Menu size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ── Mobile drawer ── */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="nb-drawer"
                role="dialog"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -10, scaleY: 0.94 }}
                animate={{ opacity: 1, y: 0,   scaleY: 1    }}
                exit={{    opacity: 0, y: -6,   scaleY: 0.96 }}
                transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: "top" }}
              >
                {/* Petal accent */}
                <div style={{
                  position: "absolute", top: 12, right: 16,
                  display: "flex", gap: 3, opacity: 0.16, pointerEvents: "none"
                }}>
                  {[0, 28, -18].map((r, i) => <NavPetal key={i} size={8} rotate={r} />)}
                </div>

                {/* Drawer title */}
                <div style={{
                  textAlign: "center",
                  paddingBottom: "0.85rem",
                  marginBottom: "0.5rem",
                  borderBottom: "1px solid rgba(201,162,39,0.18)"
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.82rem",
                    color: "#b8860b",
                    letterSpacing: "0.14em"
                  }}>✦ Navigate ✦</span>
                </div>

                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="nb-mob-link"
                    onClick={() => { setOpen(false); setActive(link.href); }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0   }}
                    transition={{ delay: i * 0.05, duration: 0.28 }}
                  >
                    <span className="nb-dot" />
                    {link.name}
                  </motion.a>
                ))}

                {/* Footer petals */}
                <div style={{
                  display: "flex", justifyContent: "center", gap: "0.45rem",
                  marginTop: "0.9rem", paddingTop: "0.7rem",
                  borderTop: "1px solid rgba(201,162,39,0.13)"
                }}>
                  {[14, 0, -14, 0, 14].map((r, i) => (
                    <NavPetal key={i} size={6} rotate={r} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </>
  );
}