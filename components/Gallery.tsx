"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface PetalDef {
  w: number;
  h: number;
  path: string;
  fill: string;
  op: number;
}

interface PetalData {
  id: number;
  left: number;
  size: number;
  dur: number;
  delay: number;
  defIdx: number;
}

interface PhotoFrameProps {
  src: string;
  alt: string;
  caption: string;
  label?: string;
  aspectClass: string;
  animDelay: number;
  inView: boolean;
}

// ── Petal definitions ─────────────────────────────────────────────────────────
const PETAL_DEFS: PetalDef[] = [
  { w: 18, h: 22, path: "M9 1 C14 4,17 11,9 21 C1 11,4 4,9 1Z",   fill: "#c9a227", op: 0.72 },
  { w: 12, h: 26, path: "M6 0 Q12 8 6 26 Q0 8 6 0Z",              fill: "#e8c030", op: 0.58 },
  { w: 16, h: 16, path: "M8 0 L16 8 L8 16 L0 8Z",                 fill: "#d4a820", op: 0.50 },
  { w: 12, h: 12, path: "M6 0L7.5 4.5 12 4.5 8.5 7 9.8 12 6 9.2 2.2 12 3.5 7 0 4.5 4.5 4.5Z", fill: "#c9a227", op: 0.65 },
  { w: 10, h: 24, path: "M5 0 C9 6 9 18 5 24 C1 18 1 6 5 0Z",     fill: "#b8860b", op: 0.55 },
];

function FloatingPetals() {
  const [petals, setPetals] = useState<PetalData[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const spawn = () => {
      const id = counter.current++;
      setPetals(prev => [
        ...prev.slice(-28),
        {
          id,
          left: Math.random() * 100,
          size: 0.6 + Math.random() * 0.85,
          dur: 9 + Math.random() * 10,
          delay: Math.random() * 2,
          defIdx: id % PETAL_DEFS.length,
        },
      ]);
    };
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 14; i++) timers.push(setTimeout(spawn, i * 350));
    const interval = setInterval(spawn, 950);
    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, []);

  return (
    <>
      {petals.map(p => {
        const d = PETAL_DEFS[p.defIdx];
        return (
          <div
            key={p.id}
            style={{
              position: "absolute", top: "-32px", left: `${p.left}%`,
              transform: `scale(${p.size})`, pointerEvents: "none", opacity: 0,
              animation: `galleryPetal ${p.dur}s ${p.delay}s linear forwards`,
            }}
          >
            <svg width={d.w} height={d.h} viewBox={`0 0 ${d.w} ${d.h}`} fill="none">
              <path d={d.path} fill={d.fill} opacity={d.op} />
            </svg>
          </div>
        );
      })}
    </>
  );
}

function useInView(ref: React.RefObject<Element | null>, options?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, options);
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return inView;
}

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "0 auto" }}>
      <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #c9a227)" }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 0L8.5 5.5H14L9.5 8.5L11 14L7 11L3 14L4.5 8.5L0 5.5H5.5L7 0Z" fill="#c9a227" opacity="0.75"/>
      </svg>
      <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #c9a227, transparent)" }} />
    </div>
  );
}

// ── Reusable Photo Frame ──────────────────────────────────────────────────────
function PhotoFrame({ src, alt, caption, label, aspectClass, animDelay, inView }: PhotoFrameProps) {
  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.85s ${animDelay}s cubic-bezier(0.22,1,0.36,1), transform 0.85s ${animDelay}s cubic-bezier(0.22,1,0.36,1)`,
    }}>
      <div style={{ position: "relative", padding: 10 }}>
        <div style={{
          position: "absolute", inset: 0,
          border: "1px solid rgba(201,162,39,0.15)",
          borderRadius: 2, pointerEvents: "none",
        }} />

        <div className="photo-card" style={{
          position: "relative", borderRadius: 2,
          border: "1px solid rgba(201,162,39,0.28)", overflow: "hidden",
          boxShadow: "0 8px 48px rgba(201,162,39,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
          background: "rgba(255,252,230,0.4)",
        }}>
          {/* Gold top bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg, transparent, #c9a227 35%, #f0d060 55%, #c9a227 75%, transparent)",
            zIndex: 4,
          }} />

          {/* Corner brackets */}
          {([
            { top: 10, left: 10, sx: 1, sy: 1 },
            { top: 10, right: 10, sx: -1, sy: 1 },
            { bottom: 10, left: 10, sx: 1, sy: -1 },
            { bottom: 10, right: 10, sx: -1, sy: -1 },
          ] as Array<{ top?: number; bottom?: number; left?: number; right?: number; sx: number; sy: number }>)
            .map(({ sx, sy, ...pos }, i) => (
            <div key={i} style={{ position: "absolute", ...pos, zIndex: 5, opacity: 0.65, transform: `scale(${sx},${sy})` }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 18 L3 3 L18 3" stroke="#c9a227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="3" cy="3" r="1.5" fill="#c9a227" opacity="0.7"/>
              </svg>
            </div>
          ))}

          {/* Image */}
          <div className={aspectClass} style={{ position: "relative", width: "100%", overflow: "hidden" }}>
            <img
              src={src}
              alt={alt}
              className="frame-img"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(201,162,39,0.03) 0%, transparent 30%, transparent 60%, rgba(26,18,8,0.3) 100%)",
              zIndex: 2, pointerEvents: "none",
            }} />
          </div>

          {/* Caption strip */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "40px 18px 14px",
            background: "linear-gradient(0deg, rgba(26,18,8,0.48) 0%, transparent 100%)",
            zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{
              fontFamily: "'Raleway', sans-serif", fontSize: "0.52rem",
              letterSpacing: "0.26em", textTransform: "uppercase",
              color: "rgba(255,248,220,0.78)",
            }}>{caption}</span>
            <div style={{ display: "flex", gap: 4 }}>
              {[3, 5, 3].map((s, i) => (
                <div key={i} style={{ width: s, height: s, borderRadius: "50%", background: "rgba(201,162,39,0.75)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {label && (
        <p style={{
          textAlign: "center", fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontSize: "0.95rem", color: "#9a7d3a",
          letterSpacing: "0.08em", marginTop: 14,
          opacity: inView ? 1 : 0,
          transition: `opacity 0.7s ${animDelay + 0.3}s ease`,
        }}>{label}</p>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Gallery() {
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { threshold: 0.2 });
  const galleryInView = useInView(galleryRef, { threshold: 0.08 });

  return (
    <section
      id="gallery"
      style={{
        position: "relative", zIndex: 10,
        padding: "8px 0 96px",
        background: "linear-gradient(180deg, #fffdf5 0%, #fdf8e8 50%, #fffdf5 100%)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }

        @keyframes galleryPetal {
          0%   { opacity:0; transform:translateY(0) rotate(0deg) scale(0.8); }
          9%   { opacity:0.88; }
          80%  { opacity:0.65; }
          100% { opacity:0; transform:translateY(112vh) rotate(520deg) scale(1.1); }
        }

        .photo-card { transition: box-shadow 0.4s ease, transform 0.4s ease; cursor: default; }
        .photo-card:hover {
          box-shadow: 0 16px 64px rgba(201,162,39,0.22), inset 0 1px 0 rgba(255,255,255,0.9) !important;
          transform: translateY(-5px);
        }
        .frame-img { transition: transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
        .photo-card:hover .frame-img { transform: scale(1.07) !important; }

        .aspect-3-4 { aspect-ratio: 3 / 4; }
        .aspect-4-5 { aspect-ratio: 4 / 5; }

        .gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: 1fr; gap: 36px; }
          .aspect-3-4, .aspect-4-5 { aspect-ratio: 4 / 5; }
        }

        .gold-line { background: linear-gradient(90deg, transparent, #c9a227, transparent); height: 1px; }
      `}</style>

      <FloatingPetals />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "min(800px, 140vw)", height: 500,
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(201,162,39,0.06) 0%, transparent 70%)",
      }} />

      {/* Page corner ornaments */}
      {([
        { top: 16, left: 16, tx: 1, ty: 1 },
        { top: 16, right: 16, tx: -1, ty: 1 },
        { bottom: 16, left: 16, tx: 1, ty: -1 },
        { bottom: 16, right: 16, tx: -1, ty: -1 },
      ] as Array<{ top?: number; bottom?: number; left?: number; right?: number; tx: number; ty: number }>)
        .map(({ tx, ty, ...pos }, i) => (
        <div key={i} style={{ position: "absolute", ...pos, opacity: 0.12, pointerEvents: "none", transform: `scale(${tx},${ty})` }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4 26 L4 4 L26 4" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ))}

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center", marginBottom: 56,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 22 }}>
            <div style={{ height: 1, width: 52, background: "linear-gradient(90deg, transparent, #c9a227)" }} />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 17 9 12 14C7 9 12 2 12 2Z" fill="#c9a227" opacity="0.7"/>
              <path d="M12 14C12 14 17 19 12 24C7 19 12 14 12 14Z" fill="#c9a227" opacity="0.7"/>
              <path d="M2 12C2 12 7 7 12 14C7 17 2 12 2 12Z" fill="#c9a227" opacity="0.5"/>
              <path d="M12 14C12 14 17 7 22 12C17 17 12 14 12 14Z" fill="#c9a227" opacity="0.5"/>
            </svg>
            <div style={{ height: 1, width: 52, background: "linear-gradient(90deg, #c9a227, transparent)" }} />
          </div>

          <p style={{
            fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem",
            letterSpacing: "0.36em", color: "#b8922a",
            textTransform: "uppercase", marginBottom: 14,
          }}>A Glimpse of Love</p>

          <h2 style={{
            fontFamily: "'Cinzel', serif", color: "#1a1208",
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)", fontWeight: 400,
            letterSpacing: "0.07em", lineHeight: 1.2, marginBottom: 10,
          }}>Meghana &amp; Srivats</h2>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            color: "#9a7d3a", fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            letterSpacing: "0.06em", marginBottom: 26,
            opacity: headerInView ? 1 : 0,
            transition: "opacity 0.7s 0.4s ease",
          }}>Moments woven into forever</p>

          <div style={{
            transformOrigin: "center",
            transform: headerInView ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.8s 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}>
            <GoldDivider />
          </div>
        </div>

        {/* Two-photo grid */}
        <div ref={galleryRef} className="gallery-grid">

          <PhotoFrame
            src="/images/ms1.jpg"
            alt="Wedding memory 1"
            caption="02 · July · 2026"
            label="The Beginning"
            aspectClass="aspect-3-4"
            animDelay={0}
            inView={galleryInView}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <PhotoFrame
              src="/images/ms2.jpg"
              alt="Wedding memory 2"
              caption="Kazhakottam · Kerala"
              label="Forever Starts Here"
              aspectClass="aspect-4-5"
              animDelay={0.18}
              inView={galleryInView}
            />

            {/* Quote card */}
            <div style={{
              opacity: galleryInView ? 1 : 0,
              transform: galleryInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s 0.38s ease, transform 0.8s 0.38s ease",
              position: "relative", padding: "26px 24px 22px",
              border: "1px solid rgba(201,162,39,0.2)", borderRadius: 2,
              background: "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,251,220,0.78))",
              boxShadow: "0 4px 24px rgba(201,162,39,0.08)", textAlign: "center",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, #c9a227 40%, #e8c030 60%, transparent)",
              }} />
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "#3d3020",
                lineHeight: 1.75, letterSpacing: "0.03em", marginBottom: 14,
              }}>
                "Two souls, one heartbeat —<br/>
                <span style={{ color: "#b8922a" }}>bound by love, blessed forever.</span>"
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{ height: 1, width: 28, background: "linear-gradient(90deg, transparent, #c9a227)" }} />
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <circle cx="4" cy="4" r="2" fill="#c9a227" opacity="0.6"/>
                </svg>
                <div style={{ height: 1, width: 28, background: "linear-gradient(90deg, #c9a227, transparent)" }} />
              </div>
              <div style={{ position: "absolute", bottom: 10, right: 14, display: "flex", gap: 4, opacity: 0.18 }}>
                {[3, 5, 3].map((s, i) => (
                  <div key={i} style={{ width: s, height: s, borderRadius: "50%", background: "#c9a227" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 60,
          opacity: galleryInView ? 1 : 0,
          transition: "opacity 0.7s 0.6s ease",
        }}>
          <GoldDivider />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: "0.88rem", color: "rgba(184,146,42,0.55)",
            letterSpacing: "0.14em", marginTop: 18,
          }}>With Joy &amp; Love · 02 July 2026</p>
        </div>

      </div>
    </section>
  );
}