"use client";

import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const contacts = [
  {
    title: "Bride Side",
    name: "Meghana Family",
    phone: "+91 *********2",
  },
  {
    title: "Groom Side",
    name: "Srivats Family",
    phone: "+91 *********1",
  },
];

/* ── Floating petal canvas ────────────────────────────────────── */
function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Petal shape helper
    const drawPetal = (
      cx: number,
      cy: number,
      size: number,
      rotation: number,
      opacity: number,
      hue: number // 38–48 for gold, or 0 for pinkish-white
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      const gradient = ctx.createRadialGradient(0, -size * 0.3, 0, 0, 0, size);
      if (hue > 10) {
        gradient.addColorStop(0, `hsla(${hue}, 90%, 85%, 1)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 80%, 65%, 0.9)`);
        gradient.addColorStop(1, `hsla(${hue}, 70%, 50%, 0)`);
      } else {
        gradient.addColorStop(0, `hsla(40, 100%, 99%, 1)`);
        gradient.addColorStop(0.5, `hsla(40, 80%, 92%, 0.7)`);
        gradient.addColorStop(1, `hsla(40, 60%, 80%, 0)`);
      }
      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.6, -size * 0.7, size * 0.6, size * 0.3, 0, size * 0.5);
      ctx.bezierCurveTo(-size * 0.6, size * 0.3, -size * 0.6, -size * 0.7, 0, -size);
      ctx.fill();
      ctx.restore();
    };

    type Petal = {
      x: number; y: number; size: number; speed: number;
      drift: number; rotation: number; rotSpeed: number;
      opacity: number; hue: number; wobble: number; wobbleSpeed: number;
    };

    const petals: Petal[] = Array.from({ length: 38 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * -(canvas.height || 600),
      size: 8 + Math.random() * 16,
      speed: 0.4 + Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
      opacity: 0.25 + Math.random() * 0.55,
      hue: Math.random() > 0.35 ? 38 + Math.random() * 10 : 0,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.008 + Math.random() * 0.012,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const h = canvas.height || 600;
      const w = canvas.width || 800;

      petals.forEach((p) => {
        p.y += p.speed;
        p.wobble += p.wobbleSpeed;
        p.x += p.drift + Math.sin(p.wobble) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.y > h + 30) {
          p.y = -20;
          p.x = Math.random() * w;
        }
        if (p.x < -20) p.x = w + 10;
        if (p.x > w + 20) p.x = -10;

        drawPetal(p.x, p.y, p.size, p.rotation, p.opacity, p.hue);
      });

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* ── Decorative SVG rose bloom ──────────────────────────────────── */
function RoseBloom({ size = 80, opacity = 0.18 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ opacity }}
      aria-hidden="true"
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx={50 + Math.cos((angle * Math.PI) / 180) * 22}
          cy={50 + Math.sin((angle * Math.PI) / 180) * 22}
          rx={16}
          ry={10}
          transform={`rotate(${angle} ${50 + Math.cos((angle * Math.PI) / 180) * 22} ${50 + Math.sin((angle * Math.PI) / 180) * 22})`}
          fill={`hsl(${42 + i}, 85%, ${60 + i * 2}%)`}
        />
      ))}
      <circle cx={50} cy={50} r={12} fill="hsl(44, 95%, 72%)" />
      <circle cx={50} cy={50} r={6} fill="hsl(48, 100%, 85%)" />
    </svg>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #fffdf5 0%, #fff8e1 40%, #fffbf0 70%, #fdf6e3 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "5rem 1.5rem 7rem",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

        .cs-gold-label {
          font-family: 'Cinzel', serif;
          font-size: 0.68rem;
          letter-spacing: 0.35em;
          color: #b8860b;
          text-transform: uppercase;
        }

        .cs-title-main {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 6vw, 5rem);
          font-weight: 300;
          line-height: 1.05;
          color: #1a1208;
          letter-spacing: 0.02em;
        }

        .cs-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
          margin: 1rem 0 0;
        }
        .cs-divider-line {
          height: 1px;
          width: 56px;
          background: linear-gradient(90deg, transparent, #c9a227, transparent);
        }
        .cs-divider-diamond {
          width: 6px; height: 6px;
          background: #c9a227;
          transform: rotate(45deg);
        }

        .cs-card {
          position: relative;
          background: linear-gradient(145deg, rgba(255,255,255,0.88) 0%, rgba(255,248,210,0.72) 100%);
          border: 1px solid rgba(201,162,39,0.3);
          border-radius: 2px;
          padding: 3rem 2.5rem;
          text-align: center;
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 0 1px rgba(201,162,39,0.08),
            0 8px 40px rgba(184,134,11,0.10),
            0 2px 8px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.9);
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .cs-card:hover {
          transform: translateY(-6px);
          box-shadow:
            0 0 0 1px rgba(201,162,39,0.18),
            0 20px 60px rgba(184,134,11,0.18),
            0 4px 16px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.95);
        }

        .cs-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 0%, rgba(201,162,39,0.09) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Corner ornaments */
        .cs-corner {
          position: absolute;
          width: 32px; height: 32px;
          pointer-events: none;
        }
        .cs-corner svg { width: 100%; height: 100%; }
        .cs-corner-tl { top: 8px; left: 8px; }
        .cs-corner-tr { top: 8px; right: 8px; transform: scaleX(-1); }
        .cs-corner-bl { bottom: 8px; left: 8px; transform: scaleY(-1); }
        .cs-corner-br { bottom: 8px; right: 8px; transform: scale(-1); }

        .cs-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: #1a1208;
          letter-spacing: 0.03em;
          margin: 0.35rem 0 0.25rem;
        }

        .cs-phone {
          font-family: 'Cinzel', serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: #8a7040;
          margin-bottom: 2rem;
        }

        .cs-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.8rem;
          background: linear-gradient(135deg, #d4a017 0%, #c9a227 40%, #b8860b 100%);
          color: #fff8e1;
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          border: none;
          border-radius: 1px;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(184,134,11,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.28s ease;
          position: relative;
          overflow: hidden;
        }
        .cs-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cs-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(184,134,11,0.45); }
        .cs-btn-primary:hover::after { opacity: 1; }

        .cs-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.8rem;
          background: transparent;
          color: #b8860b;
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          border: 1px solid rgba(184,134,11,0.45);
          border-radius: 1px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.28s ease;
          position: relative;
        }
        .cs-btn-outline:hover {
          background: rgba(201,162,39,0.09);
          border-color: rgba(184,134,11,0.8);
          transform: translateY(-2px);
        }

        .cs-section-bloom {
          pointer-events: none;
          position: absolute;
        }
      `}</style>

      {/* Petal canvas */}
      <PetalCanvas />

      {/* Decorative blooms */}
      <div className="cs-section-bloom" style={{ top: "3%", left: "3%", zIndex: 1 }}>
        <RoseBloom size={110} opacity={0.13} />
      </div>
      <div className="cs-section-bloom" style={{ top: "5%", right: "4%", zIndex: 1 }}>
        <RoseBloom size={90} opacity={0.11} />
      </div>
      <div className="cs-section-bloom" style={{ bottom: "6%", left: "6%", zIndex: 1 }}>
        <RoseBloom size={70} opacity={0.10} />
      </div>
      <div className="cs-section-bloom" style={{ bottom: "8%", right: "5%", zIndex: 1 }}>
        <RoseBloom size={95} opacity={0.12} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 960, margin: "0 auto", width: "100%" }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="cs-gold-label" style={{ marginBottom: "1rem" }}>✦ Contact Us ✦</p>
          <h2 className="cs-title-main">
            Get In <em style={{ fontStyle: "italic", color: "#b8860b" }}>Touch</em>
          </h2>
          <div className="cs-divider">
            <span className="cs-divider-line" />
            <span className="cs-divider-diamond" />
            <span className="cs-divider-line" />
          </div>
          <p style={{
            marginTop: "1.25rem",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1.05rem",
            color: "#8a7040",
            letterSpacing: "0.04em"
          }}>
            We would be honoured to hear from you
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {contacts.map((person, index) => (
            <motion.div
              key={person.phone}
              className="cs-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.22, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Corner ornaments */}
              {["tl", "tr", "bl", "br"].map((pos) => (
                <div key={pos} className={`cs-corner cs-corner-${pos}`}>
                  <svg viewBox="0 0 32 32" fill="none">
                    <path d="M2 2 L14 2" stroke="#c9a227" strokeWidth="1" opacity="0.6"/>
                    <path d="M2 2 L2 14" stroke="#c9a227" strokeWidth="1" opacity="0.6"/>
                    <circle cx="2" cy="2" r="1.5" fill="#c9a227" opacity="0.7"/>
                  </svg>
                </div>
              ))}

              {/* Small bloom inside card */}
              <div style={{ position: "absolute", top: 12, right: 38, opacity: 0.15, pointerEvents: "none" }}>
                <RoseBloom size={48} opacity={1} />
              </div>

              {/* Label */}
              <p className="cs-gold-label" style={{ marginBottom: "0.5rem" }}>
                — {person.title} —
              </p>

              {/* Name */}
              <h3 className="cs-name">{person.name}</h3>

              {/* Thin golden rule */}
              <div style={{
                height: 1,
                background: "linear-gradient(90deg, transparent, #c9a227 30%, #c9a227 70%, transparent)",
                margin: "0.9rem auto",
                width: "60%",
                opacity: 0.5
              }} />

              {/* Phone */}
              <p className="cs-phone">{person.phone}</p>

              {/* Buttons */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.85rem", flexWrap: "wrap" }}>
                <a href={`tel:${person.phone}`} className="cs-btn-primary">
                  <Phone size={15} />
                  Call
                </a>
                <a
                  href={`https://wa.me/${person.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-btn-outline"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
              </div>
             
            </motion.div>
          ))}
        </div>

        {/* Footer ornament */}
        <motion.div
          style={{ textAlign: "center", marginTop: "3rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="cs-divider">
            <span className="cs-divider-line" style={{ width: 80 }} />
            <span style={{ color: "#c9a227", fontSize: "1.1rem" }}>✦</span>
            <span className="cs-divider-diamond" />
            <span style={{ color: "#c9a227", fontSize: "1.1rem" }}>✦</span>
            <span className="cs-divider-line" style={{ width: 80 }} />
          </div>
           <p style={{
            marginTop: "1.25rem",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1.05rem",
            color: "#8a7040",
            letterSpacing: "0.04em"
          }}>
            Best Compliments: Friends & Relatives
          </p>
        </motion.div>
      </div>
    </section>
  );
}