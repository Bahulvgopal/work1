"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface PetalStyle {
  left: string;
  drift: number;
  rotation: number;
}

interface PetalProps {
  style: PetalStyle;
  delay: number;
  duration: number;
  size: string;
  opacity: number;
}

interface GoldDividerProps {
  width?: number;
}

interface EventData {
  number: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  hall: string;
  icon: React.ReactNode;
}

interface EventCardProps {
  event: EventData;
  index: number;
}

// ── Floating petal ────────────────────────────────────────────────────────────
function Petal({ style, delay, duration, size, opacity }: PetalProps) {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: "-60px",
        left: style.left,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 0,
      }}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, style.drift, -style.drift * 0.5, style.drift * 0.3],
        rotate: [0, 180, 360],
        opacity: [0, opacity, opacity, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 0.9, 1],
      }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <ellipse cx="20" cy="20" rx="7" ry="18" fill="url(#pg)" transform={`rotate(${style.rotation} 20 20)`} />
        <defs>
          <radialGradient id="pg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff8dc" />
            <stop offset="40%" stopColor="#e8c030" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0.6" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// ── Events data ───────────────────────────────────────────────────────────────
const events = [
  {
    number: "01",
    title: "Wedding Ceremony",
    subtitle: "Muhurtham",
    date: "Thursday, 02 July 2026",
    time: "11:30 AM – 12:00 Noon",
    venue: "Alsaj International Convention Centre",
    hall: "Comet Hall, Kazhakottam",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="20" height="20">
        <path d="M18 4C18 4 26 14 18 22C10 14 18 4 18 4Z" fill="#c9a227" opacity="0.85"/>
        <path d="M4 18C4 18 14 10 18 22C14 26 4 18 4 18Z" fill="#c9a227" opacity="0.55"/>
        <path d="M32 18C32 18 22 10 18 22C22 26 32 18 32 18Z" fill="#c9a227" opacity="0.55"/>
        <circle cx="18" cy="22" r="3" fill="#e8c030" opacity="0.9"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Food & Dinning",
    subtitle: "Post-Wedding",
    date: "02 July 2026",
    time: "10 AM Onwards",
    venue: "Alsaj International Convention Centre",
    hall: "Gravity Hall, Kazhakottam",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="20" height="20">
        <path d="M18 3L21.5 13H32L23.5 19.5L26.5 30L18 23L9.5 30L12.5 19.5L4 13H14.5L18 3Z" fill="#c9a227" opacity="0.85"/>
      </svg>
    ),
  },
  
];

// ── Gold divider ──────────────────────────────────────────────────────────────
function GoldDivider({ width = 80 }: GoldDividerProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 auto" }}>
      <div style={{ width, height: 1, background: "linear-gradient(90deg, transparent, #c9a227)" }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 0L8.5 5.5H14L9.5 8.5L11 14L7 11L3 14L4.5 8.5L0 5.5H5.5L7 0Z" fill="#c9a227" opacity="0.75"/>
      </svg>
      <div style={{ width, height: 1, background: "linear-gradient(90deg, #c9a227, transparent)" }} />
    </div>
  );
}

// ── Event card ────────────────────────────────────────────────────────────────
function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{
        position: "relative",
        background: "linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(255,251,220,0.92) 100%)",
        borderRadius: 2,
        border: "1px solid rgba(201,162,39,0.22)",
        padding: "36px 30px 30px",
        overflow: "hidden",
        boxShadow: "0 6px 40px rgba(201,162,39,0.10), 0 1px 0 rgba(255,255,255,0.9) inset",
        backdropFilter: "blur(8px)",
        cursor: "default",
      }}
    >
      {/* Top gold bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, transparent 0%, #c9a227 30%, #f0d060 55%, #c9a227 75%, transparent 100%)",
      }} />

      {/* Ghost number */}
      <span style={{
        position: "absolute", top: 14, right: 18,
        fontFamily: "'Cinzel', serif",
        fontSize: "5rem", fontWeight: 700, lineHeight: 1,
        letterSpacing: "-0.02em",
        color: "rgba(201,162,39,0.07)",
        userSelect: "none", pointerEvents: "none",
      }}>{event.number}</span>

      {/* Icon badge */}
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(201,162,39,0.14), rgba(201,162,39,0.05))",
        border: "1px solid rgba(201,162,39,0.28)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
      }}>
        {event.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(1rem, 3vw, 1.25rem)", fontWeight: 600,
        color: "#1a1208", letterSpacing: "0.05em",
        marginBottom: 4, lineHeight: 1.3, paddingRight: 40,
      }}>{event.title}</h3>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.85rem", fontStyle: "italic",
        color: "#b8922a", letterSpacing: "0.08em", marginBottom: 20,
      }}>{event.subtitle}</p>

      {/* Gold accent line */}
      <div style={{
        width: 48, height: 1,
        background: "linear-gradient(90deg, #c9a227, rgba(201,162,39,0.2))",
        marginBottom: 22,
      }} />

      {/* Detail rows */}
      {[
        {
          label: "DATE", value: event.date,
          icon: (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          ),
        },
        {
          label: "TIME", value: event.time,
          icon: (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 15.5"/>
            </svg>
          ),
        },
        {
          label: "VENUE", value: event.venue, sub: event.hall,
          icon: (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          ),
        },
      ].map((d, i, arr) => (
        <div key={i} style={{
          display: "flex", gap: 14, alignItems: "flex-start",
          paddingBottom: i < arr.length - 1 ? 14 : 0,
          marginBottom: i < arr.length - 1 ? 14 : 0,
          borderBottom: i < arr.length - 1 ? "1px solid rgba(201,162,39,0.09)" : "none",
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.04))",
            border: "1px solid rgba(201,162,39,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginTop: 2,
          }}>{d.icon}</div>
          <div>
            <p style={{
              fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem",
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: "#c9a227", fontWeight: 600, marginBottom: 2,
            }}>{d.label}</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.98rem",
              color: "#3d3020", letterSpacing: "0.02em", lineHeight: 1.4,
            }}>{d.value}</p>
            {d.sub && (
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem",
                color: "#7a6040", fontStyle: "italic", marginTop: 1,
              }}>{d.sub}</p>
            )}
          </div>
        </div>
      ))}

      {/* Bottom corner dots */}
      <div style={{ position: "absolute", bottom: 14, right: 16, display: "flex", gap: 4, opacity: 0.2 }}>
        {[3, 5, 3].map((s, i) => (
          <div key={i} style={{ width: s, height: s, borderRadius: "50%", background: "#c9a227" }} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function EventSchedule() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Stable petal data — generated once on mount, never on SSR
  const petals = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          drift: (Math.random() - 0.5) * 120,
          rotation: Math.random() * 360,
        },
        delay: Math.random() * 14,
        duration: 8 + Math.random() * 10,
        size: `${12 + Math.random() * 18}px`,
        opacity: 0.35 + Math.random() * 0.45,
      })),
    []
  );

  return (
    <section
      id="events"
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "72px 20px 80px",
        background: "linear-gradient(180deg, #fefcf0 0%, #fdf8e0 40%, #fefdf5 80%, #fffcf0 100%)",
        fontFamily: "'Cinzel', Georgia, serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {/* Floating petals — client only to avoid SSR mismatch */}
      {mounted && petals.map((p) => <Petal key={p.id} {...p} />)}

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "35%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "min(800px, 140vw)", height: "500px",
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(201,162,39,0.06) 0%, transparent 70%)",
      }} />

      {/* Corner ornaments */}
      {[
        { top: 16, left: 16, rotate: 0 },
        { top: 16, right: 16, rotate: 90 },
        { bottom: 16, right: 16, rotate: 180 },
        { bottom: 16, left: 16, rotate: 270 },
      ].map(({ rotate, ...pos }, i) => (
        <div key={i} style={{ position: "absolute", ...pos, opacity: 0.15, pointerEvents: "none" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
            <path d="M2 2 L2 12 M2 2 L12 2" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2 2 L8 8" stroke="#c9a227" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
          </svg>
        </div>
      ))}

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 22 }}
          >
            <div style={{ height: 1, width: 55, background: "linear-gradient(90deg, transparent, #c9a227 80%)" }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 17 9 12 14C7 9 12 2 12 2Z" fill="#c9a227" opacity="0.7"/>
              <path d="M12 14C12 14 17 19 12 24C7 19 12 14 12 14Z" fill="#c9a227" opacity="0.7"/>
              <path d="M2 12C2 12 7 7 12 14C7 17 2 12 2 12Z" fill="#c9a227" opacity="0.5"/>
              <path d="M12 14C12 14 17 7 22 12C17 17 12 14 12 14Z" fill="#c9a227" opacity="0.5"/>
            </svg>
            <div style={{ height: 1, width: 55, background: "linear-gradient(90deg, #c9a227 20%, transparent)" }} />
          </motion.div>

          <p style={{
            fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem",
            letterSpacing: "0.38em", color: "#b8922a",
            textTransform: "uppercase", marginBottom: 14,
          }}>The Grand Celebration</p>

          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2rem, 7vw, 3.6rem)", fontWeight: 400,
            color: "#1a1208", letterSpacing: "0.08em",
            lineHeight: 1.15, margin: "0 0 8px",
          }}>Event Schedule</h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)", fontStyle: "italic",
            color: "#8a6d30", letterSpacing: "0.06em", marginBottom: 24,
          }}>02 July 2026 · Kazhakottam</p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <GoldDivider width={70} />
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 24,
        }}>
          {events.map((event, i) => (
            <EventCard key={i} event={event} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: 56 }}
        >
          <GoldDivider width={60} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem",
            fontStyle: "italic", color: "rgba(184,146,42,0.6)",
            letterSpacing: "0.12em", marginTop: 20,
          }}>With Joy &amp; Love</p>
        </motion.div>

      </div>
    </section>
  );
}
