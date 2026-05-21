"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Countdown() {
  const weddingDate = new Date("2026-07-02T09:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      if (difference <= 0) return;
      setTimeLeft({
        days:    Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="countdown"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        padding: "1px 16px",
        background: "linear-gradient(180deg, #fffdf5 0%, #fdf8e8 50%, #fffdf5 100%)",
        fontFamily: "'Cinzel', 'Georgia', serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');

        /* ── Card ── */
        .cd-card {
          background: rgba(255,253,242,0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201,162,39,0.20);
          border-radius: 4px;
          box-shadow:
            0 4px 40px rgba(201,162,39,0.10),
            0 1px 8px rgba(201,162,39,0.07),
            inset 0 1px 0 rgba(255,255,255,0.95);
          /* responsive padding */
          padding: 36px 20px;
        }
        @media (min-width: 480px) { .cd-card { padding: 44px 32px; } }
        @media (min-width: 768px) { .cd-card { padding: 52px 48px; } }

        /* ── Time block ── */
        .time-block {
          position: relative;
          background: linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,252,230,0.85) 100%);
          border: 1px solid rgba(201,162,39,0.22);
          border-radius: 4px;
          text-align: center;
          /* responsive padding */
          padding: 18px 10px 14px;
          box-shadow:
            0 2px 20px rgba(201,162,39,0.08),
            inset 0 1px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(201,162,39,0.08);
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        @media (min-width: 480px) { .time-block { padding: 22px 12px 18px; } }
        @media (min-width: 768px) { .time-block { padding: 28px 16px 22px; } }

        .time-block:hover {
          box-shadow: 0 6px 28px rgba(201,162,39,0.18), inset 0 1px 0 rgba(255,255,255,1);
          transform: translateY(-2px);
        }
        .time-block::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a227, transparent);
          opacity: 0.7;
        }
        .time-block::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Number ── */
        .time-value {
          font-family: 'Cinzel', serif;
          font-weight: 600;
          line-height: 1;
          background: linear-gradient(150deg, #b8921a 0%, #e8c030 35%, #c9a227 55%, #9a7010 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.04em;
          /* responsive font */
          font-size: clamp(1.8rem, 7vw, 3.6rem);
        }

        /* ── Label ── */
        .time-label {
          font-family: 'Raleway', sans-serif;
          font-weight: 500;
          letter-spacing: 0.25em;
          color: #9a7d3a;
          text-transform: uppercase;
          margin-top: 8px;
          /* responsive font */
          font-size: clamp(0.48rem, 1.8vw, 0.6rem);
        }

        /* ── Separator dots ── */
        .separator-dot {
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          justify-content: center;
          padding-bottom: 12px;
          /* responsive horizontal spacing */
          padding-left: 4px;
          padding-right: 4px;
        }
        @media (min-width: 480px) {
          .separator-dot { padding-left: 6px; padding-right: 6px; gap: 7px; }
        }
        @media (min-width: 768px) {
          .separator-dot { padding-left: 8px; padding-right: 8px; gap: 8px; }
        }
        .separator-dot span {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a227, #e8c030);
          box-shadow: 0 0 6px rgba(201,162,39,0.5);
          animation: pulse-dot 1.5s ease-in-out infinite;
          display: block;
        }
        @media (min-width: 480px) {
          .separator-dot span { width: 5px; height: 5px; }
        }
        .separator-dot span:last-child { animation-delay: 0.3s; }

        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50%       { opacity: 1;   transform: scale(1.1);  }
        }

        /* ── Countdown grid ──
           Mobile:  2×2 (no separators between rows)
           ≥480px:  full row with separators
        */
        .cd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (min-width: 480px) {
          .cd-grid {
            grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
            gap: 0;
          }
        }

        /* Hide separators on tiny screens (they're inside the grid) */
        .cd-sep { display: none; }
        @media (min-width: 480px) { .cd-sep { display: flex; } }

        /* ── Section typography ── */
        .section-label {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(0.58rem, 2vw, 0.65rem);
          letter-spacing: 0.30em;
          color: #b8922a;
          text-transform: uppercase;
        }
        .section-title {
          font-family: 'Cinzel', serif;
          color: #1a1208;
          font-size: clamp(1.5rem, 5vw, 2.8rem);
          font-weight: 400;
          letter-spacing: 0.06em;
          line-height: 1.2;
        }
        .gold-line {
          background: linear-gradient(90deg, transparent, #c9a227, transparent);
          height: 1px;
          flex-shrink: 0;
        }
        .floral-small { font-size: 16px; opacity: 0.35; color: #c9a227; line-height: 1; }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(600px, 100vw)", height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(201,162,39,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div className="cd-card">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "36px" }}
          >
            {/* Top ornament */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "18px" }}>
              <div className="gold-line" style={{ width: "40px" }} />
              <span className="floral-small">✦</span>
              <span className="floral-small" style={{ fontSize: "11px", opacity: 0.2 }}>✦</span>
              <span className="floral-small">✦</span>
              <div className="gold-line" style={{ width: "40px" }} />
            </div>

            <p className="section-label" style={{ marginBottom: "10px" }}>Countdown To Forever</p>
            <h2 className="section-title">Our Wedding Day</h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                color: "#9a7d3a",
                fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                marginTop: "8px",
                letterSpacing: "0.08em",
              }}
            >
              02 July 2026
            </motion.p>
          </motion.div>

          {/* ── Countdown grid ── */}
          <div className="cd-grid">
           {(["days", "hours", "minutes", "seconds"] as const).map((unit, i) => (
  <div
    key={unit}
    style={{
      display: "contents",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.2 + i * 0.1,
      }}
    >
      <TimeBlock
        value={timeLeft[unit]}
        label={unit}
      />
    </motion.div>

    {i < 3 && (
      <motion.div
        className="separator-dot cd-sep"
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? { opacity: 1 }
            : {}
        }
        transition={{
          delay: 0.5 + i * 0.1,
        }}
      >
        <span />
        <span />
      </motion.div>
    )}
  </div>
))}
          </div>

          {/* ── Footer ornament ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            style={{ textAlign: "center", marginTop: "36px" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <div className="gold-line" style={{ width: "60px" }} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2 C12 2,16 8,12 12 C8 8,12 2,12 2Z"  fill="#c9a227" opacity="0.5" />
                <path d="M12 12 C12 12,16 16,12 22 C8 16,12 12,12 12Z" fill="#c9a227" opacity="0.5" />
                <path d="M2 12 C2 12,8 8,12 12 C8 16,2 12,2 12Z"  fill="#c9a227" opacity="0.35" />
                <path d="M12 12 C12 12,18 8,22 12 C18 16,12 12,12 12Z" fill="#c9a227" opacity="0.35" />
              </svg>
              <div className="gold-line" style={{ width: "60px" }} />
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "#b8922a",
              fontSize: "clamp(0.78rem, 2.5vw, 0.9rem)",
              marginTop: "14px",
              opacity: 0.7,
              letterSpacing: "0.05em",
            }}>
              Every second brings us closer
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  const prevValue = useRef(value);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 300);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="time-block">
      <div
        className="time-value"
        style={{ transition: "opacity 0.15s ease", opacity: flash ? 0.55 : 1 }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <p className="time-label">{label}</p>
    </div>
  );
}