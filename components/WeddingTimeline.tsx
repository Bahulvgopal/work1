"use client";

import { useEffect, useRef, useState } from "react";

const timeline = [
  { title: "First Meet",  date: "14 February 2023",  description: "The beginning of a beautiful story.", number: "01" },
  { title: "Engagement",  date: "12 August 2025",     description: "Two hearts promised forever.",        number: "02" },
  { title: "Wedding Day", date: "20 December 2026",   description: "The day we become one.",              number: "03" },
  { title: "Reception",   date: "20 December 2026",   description: "Celebrating love with family and friends.", number: "04" },
];

const PETAL_SVGS = [
  `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='22' viewBox='0 0 18 22'><path d='M9 1 C14 4,16 10,9 21 C2 10,4 4,9 1Z' fill='#c9a227' opacity='0.72'/></svg>`,
  `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='24' viewBox='0 0 12 24'><ellipse cx='6' cy='12' rx='5' ry='11' fill='#e8c030' opacity='0.6' transform='rotate(10,6,12)'/></svg>`,
  `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'><polygon points='7,0 14,7 7,14 0,7' fill='#d4a820' opacity='0.55'/></svg>`,
  `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><polygon points='6,0 7.5,4.5 12,4.5 8.5,7 9.8,12 6,9.2 2.2,12 3.5,7 0,4.5 4.5,4.5' fill='#c9a227' opacity='0.65'/></svg>`,
  `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='20' viewBox='0 0 16 20'><path d='M8 0 Q15 8 8 20 Q1 8 8 0Z' fill='#b8860b' opacity='0.55'/></svg>`,
];

type Petal = { id: number; left: number; size: number; dur: number; delay: number; shape: string };

function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const spawn = () => {
      const id = counterRef.current++;
      setPetals(prev => [
        ...prev.slice(-30),
        {
          id,
          left:  Math.random() * 100,
          size:  0.6 + Math.random() * 0.9,
          dur:   7 + Math.random() * 10,
          delay: Math.random() * 3,
          shape: PETAL_SVGS[Math.floor(Math.random() * PETAL_SVGS.length)],
        },
      ]);
    };

    const init: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 18; i++) init.push(setTimeout(spawn, i * 300));
    const interval = setInterval(spawn, 900);
    return () => { init.forEach(clearTimeout); clearInterval(interval); };
  }, []);

  return (
    <>
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-30px",
            transform: `scale(${p.size})`,
            pointerEvents: "none",
            opacity: 0,
            animation: `petalFall ${p.dur}s ${p.delay}s linear forwards`,
          }}
          dangerouslySetInnerHTML={{ __html: p.shape }}
        />
      ))}
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

function TimelineCard({ item, index, isLeft }: { item: typeof timeline[0]; index: number; isLeft: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.15, rootMargin: "-40px" });

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: "44px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.65s ${index * 0.12}s ease, transform 0.65s ${index * 0.12}s ease`,
      }}
    >
      {/* Card */}
      <div
        className="tl-card"
        style={{
          width: "calc(50% - 44px)",
          marginLeft: isLeft ? 0 : "auto",
          marginRight: isLeft ? "auto" : 0,
          position: "relative",
          padding: "24px 22px 20px",
        }}
      >
        <span className="ghost-num">{item.number}</span>
        <p className="card-date">{item.date}</p>
        <h3 className="card-title">{item.title}</h3>
        <div className="card-divider" />
        <p className="card-desc">{item.description}</p>
        <div className={`arm ${isLeft ? "arm-left" : "arm-right"}`} />
      </div>

      {/* Center node */}
      <div className="tl-node" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0)",
        transition: `opacity 0.5s ${index * 0.12 + 0.25}s, transform 0.5s ${index * 0.12 + 0.25}s`,
      }}>
        <div className="node-ring" />
        <div className="node-core" />
        <div className="node-pulse" style={{ animationDelay: `${index * 0.4}s` }} />
      </div>
    </div>
  );
}

export default function WeddingTimeline() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { threshold: 0.2 });

  return (
    <section
      id="timeline"
      style={{
        position: "relative",
        padding: "4px 16px",
        background: "linear-gradient(160deg, #fffef7 0%, #fdf8e8 50%, #fff9f0 100%)",
        overflow: "hidden",
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');

        @keyframes petalFall {
          0%   { opacity:0; transform:translateY(-30px) rotate(0deg) scale(0.8); }
          10%  { opacity:0.85; }
          80%  { opacity:0.6; }
          100% { opacity:0; transform:translateY(110vh) rotate(540deg) scale(1.1); }
        }

        .tl-card {
          background: linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(255,252,228,0.9) 100%);
          border: 1px solid rgba(201,162,39,0.22);
          border-radius: 6px;
          box-shadow: 0 6px 30px rgba(201,162,39,0.09), inset 0 1px 0 #fff;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          overflow: hidden;
        }
        .tl-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 42px rgba(201,162,39,0.16), inset 0 1px 0 #fff;
        }
        .tl-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a227 35%, #e8c030 65%, transparent);
          border-radius: 6px 6px 0 0;
        }
        .tl-card::after {
          content: '✦';
          position: absolute;
          bottom: 8px; right: 12px;
          color: rgba(201,162,39,0.18);
          font-size: 1rem;
          line-height: 1;
        }

        .ghost-num {
          position: absolute; top: 8px; right: 14px;
          font-family: 'Cinzel', serif;
          font-size: 3.2rem; font-weight: 600; line-height: 1;
          background: linear-gradient(135deg, rgba(201,162,39,0.15), rgba(201,162,39,0.04));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; user-select: none;
        }
        .card-date {
          font-family: 'Raleway', sans-serif;
          font-size: 0.58rem; letter-spacing: 0.26em;
          text-transform: uppercase; color: #c9a227; margin-bottom: 5px;
        }
        .card-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.95rem, 2.2vw, 1.2rem); font-weight: 600;
          color: #1a1208; letter-spacing: 0.05em; margin-bottom: 10px;
        }
        .card-divider {
          width: 32px; height: 1px; margin-bottom: 10px;
          background: linear-gradient(90deg, #c9a227, rgba(201,162,39,0.25));
        }
        .card-desc {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 0.97rem; color: #5a4a2a; line-height: 1.7;
        }

        .arm {
          position: absolute; top: 50%; width: 28px; height: 1px;
          background: linear-gradient(90deg, rgba(201,162,39,0.15), rgba(201,162,39,0.5));
          transform: translateY(-50%);
        }
        .arm-left  { right: -28px; }
        .arm-right { left: -28px; }

        .tl-node {
          position: absolute; left: 50%; top: 50%;
          width: 44px; height: 44px;
          z-index: 10;
        }
        .node-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(201,162,39,0.35);
          background: rgba(255,253,242,0.92);
        }
        .node-core {
          position: absolute; inset: 8px; border-radius: 50%;
          background: linear-gradient(135deg, #c9a227 0%, #e8c030 50%, #b8860b 100%);
          box-shadow: 0 0 10px rgba(201,162,39,0.4);
        }
        .node-pulse {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 1px solid rgba(201,162,39,0.25);
          animation: pulse 2.8s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100%{transform:scale(1);opacity:0.5;}
          50%{transform:scale(1.4);opacity:0;}
        }

        .ornament-line {
          width: 50px; height: 1px;
          background: linear-gradient(90deg, transparent, #c9a227, transparent);
        }

        @media (max-width: 640px) {
          .tl-card { width: 100% !important; margin-left: 0 !important; margin-right: 0 !important; }
          .tl-spine, .tl-node, .arm { display: none !important; }
        }
      `}</style>

      <FloatingPetals />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 500, height: 600, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(201,162,39,0.05) 0%, transparent 70%)",
      }} />

      {/* Header */}
      <div ref={headerRef} style={{
        textAlign: "center", marginBottom: 56,
        opacity: headerInView ? 1 : 0, transform: headerInView ? "translateY(0)" : "translateY(22px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14,  marginTop: -10, }}>
          <div className="ornament-line" />
          <span style={{ color: "#c9a227", fontSize: 13 }}>✦</span>
          <span style={{ color: "#c9a227", fontSize: 9, opacity: 0.4 }}>✦</span>
          <span style={{ color: "#c9a227", fontSize: 13 }}>✦</span>
          <div className="ornament-line" />
        </div> */}
        <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: "0.6rem", letterSpacing: "0.32em", color: "#b8922a", textTransform: "uppercase", marginBottom: 10 }}>
          Our Journey
        </p>
        <h2 style={{ fontFamily: "'Cinzel',serif", color: "#1a1208", fontSize: "clamp(1.7rem,5vw,2.8rem)", fontWeight: 400, letterSpacing: "0.07em", lineHeight: 1.15 }}>
          Wedding Timeline
        </h2>
        <div style={{
          height: 1, width: 100, margin: "18px auto 0",
          background: "linear-gradient(90deg, transparent, #c9a227, transparent)",
          transform: headerInView ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.7s 0.3s ease",
          transformOrigin: "center",
        }} />
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
        <div className="tl-spine" style={{
          position: "absolute", left: "50%", top: 0, bottom: 0, width: 1,
          transform: "translateX(-50%)", zIndex: 1,
          background: "linear-gradient(180deg, transparent 0%, #c9a22766 8%, #c9a22766 92%, transparent 100%)",
        }} />
        {timeline.map((item, i) => (
          <TimelineCard key={i} item={item} index={i} isLeft={i % 2 === 0} />
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 52 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#c9a227,transparent)" }} />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2,16 8,12 12C8 8,12 2,12 2Z" fill="#c9a227" opacity="0.55"/>
            <path d="M12 12C12 12,16 16,12 22C8 16,12 12,12 12Z" fill="#c9a227" opacity="0.55"/>
            <path d="M2 12C2 12,8 8,12 12C8 16,2 12,2 12Z" fill="#c9a227" opacity="0.38"/>
            <path d="M12 12C12 12,18 8,22 12C18 16,12 12,12 12Z" fill="#c9a227" opacity="0.38"/>
          </svg>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#c9a227,transparent)" }} />
        </div>
      </div>
    </section>
  );
}