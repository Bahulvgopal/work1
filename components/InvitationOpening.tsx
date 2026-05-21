"use client";

import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
};

// ─── Precision helper — fixes SSR/client hydration mismatch ──────────────────
// Floating point trig produces slightly different last digits on V8 (Node) vs
// the browser's JS engine.  Rounding to 4 dp is imperceptible visually but
// guarantees identical strings on both sides.
const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

// ─── Particle config ──────────────────────────────────────────────────────────
const PARTICLES = [
  { type: "feather", delay: 0,   dur: 12, left: "7%",  size: 20 },
  { type: "petal",   delay: 1.8, dur: 10, left: "22%", size: 16 },
  { type: "petal",   delay: 3.2, dur: 11, left: "42%", size: 15 },
  { type: "feather", delay: 1.2, dur: 13, left: "63%", size: 21 },
  { type: "petal",   delay: 2.6, dur: 9,  left: "80%", size: 16 },
  { type: "feather", delay: 0.6, dur: 11, left: "92%", size: 18 },
] as const;

// ─── Static SVG components ────────────────────────────────────────────────────
const GoldenFeather = memo(function GoldenFeather({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2.6} viewBox="0 0 26 68" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="fgA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#f9eebc" />
          <stop offset="45%"  stopColor="#d4a830" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      <line x1="13" y1="66" x2="13" y2="3" stroke="url(#fgA)" strokeWidth="1.1" strokeLinecap="round" />
      {[9,15,21,28,36,44,52,59].map((y, i) => (
        <g key={i} opacity={r4(0.5 + i * 0.05)}>
          <path d={`M13 ${y} Q${r4(5 - i * 0.4)} ${y - 4} ${r4(1 + i * 0.2)} ${y - 9}`}
            stroke="url(#fgA)" strokeWidth="0.85" strokeLinecap="round" fill="none" />
          <path d={`M13 ${y} Q${r4(21 + i * 0.4)} ${y - 4} ${r4(25 - i * 0.2)} ${y - 9}`}
            stroke="url(#fgA)" strokeWidth="0.85" strokeLinecap="round" fill="none" />
        </g>
      ))}
      <circle cx="13" cy="3" r="1.6" fill="#f9eebc" opacity="0.9" />
    </svg>
  );
});

const GoldenPetal = memo(function GoldenPetal({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 18 31" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pgA" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%"   stopColor="#f9eebc" stopOpacity="0.95" />
          <stop offset="55%"  stopColor="#c9a227" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#8B6914" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path d="M9 1 C15 7,17 17,9 30 C1 17,3 7,9 1Z" fill="url(#pgA)" opacity="0.78" />
      <line x1="9" y1="4" x2="9" y2="27" stroke="#f9eebc" strokeWidth="0.5" opacity="0.45" />
    </svg>
  );
});

// ─── CSS-only floating particle (GPU composited, zero Framer) ─────────────────
const FloatingParticle = memo(function FloatingParticle({
  type, delay, dur, left, size, uid,
}: {
  type: "feather" | "petal"; delay: number; dur: number; left: string; size: number; uid: string;
}) {
  const name = `fp_${uid}`;
  return (
    <>
      <style>{`
        @keyframes ${name} {
          0%   { transform: translateY(-70px) rotate(0deg);   opacity: 0; }
          8%   { opacity: 0.75; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(112vh) rotate(${type === "feather" ? "18deg" : "360deg"}); opacity: 0; }
        }
        .${name} {
          position: absolute;
          top: 0;
          left: ${left};
          pointer-events: none;
          will-change: transform, opacity;
          animation: ${name} ${dur}s ${delay}s linear infinite;
        }
      `}</style>
      <div className={name}>
        {type === "feather" ? <GoldenFeather size={size} /> : <GoldenPetal size={size} />}
      </div>
    </>
  );
});

// ─── Corner floral — pure CSS animations ─────────────────────────────────────
const CornerFloral = memo(function CornerFloral({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const isLeft = corner === "tl" || corner === "bl";
  const isTop  = corner === "tl" || corner === "tr";
  const uid    = `cf_${corner}`;

  return (
    <>
      <style>{`
        @keyframes stemIn_${uid} {
          from { stroke-dashoffset: 400; opacity: 0; }
          to   { stroke-dashoffset: 0;   opacity: 1; }
        }
        @keyframes bloomIn_${uid} {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .stem_${uid} {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: stemIn_${uid} 1.4s ease-out forwards;
        }
        .bloom_${uid} {
          transform-box: fill-box;
          transform-origin: center;
          animation: bloomIn_${uid} 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
          opacity: 0;
        }
      `}</style>
      <div style={{
        position: "absolute",
        width: "clamp(130px, 26vw, 210px)",
        height: "clamp(130px, 26vw, 210px)",
        pointerEvents: "none",
        zIndex: 2,
        ...(isLeft ? { left: 0 } : { right: 0 }),
        ...(isTop  ? { top: 0  } : { bottom: 0 }),
        transform: `scaleX(${isLeft ? 1 : -1}) scaleY(${isTop ? 1 : -1})`,
      }}>
        <svg viewBox="0 0 210 210" width="100%" height="100%" fill="none" overflow="visible">
          <defs>
            <linearGradient id={`sg_${uid}`} x1="0" y1="1" x2="0.5" y2="0">
              <stop offset="0%"   stopColor="#8B6914" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#c9a227" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Stems */}
          {[
            { d: "M0 210 Q25 165 46 128 Q64 96 80 70",    delay: "0.05s", w: 1.5 },
            { d: "M0 210 Q44 180 72 152 Q100 124 128 100", delay: "0.18s", w: 1.3 },
            { d: "M0 210 Q60 195 94 175 Q130 155 158 134", delay: "0.30s", w: 1.1 },
            { d: "M0 210 Q16 188 30 168 Q46 147 56 128",  delay: "0.14s", w: 1.0 },
          ].map(({ d, delay, w }, i) => (
            <path key={i} d={d} stroke={`url(#sg_${uid})`} strokeWidth={w}
              strokeLinecap="round" className={`stem_${uid}`}
              style={{ animationDelay: delay }} />
          ))}

          {/* Leaves */}
          {[
            { x:20,  y:182, a:-46, s:14 },
            { x:42,  y:153, a:-60, s:12 },
            { x:62,  y:124, a:-70, s:11 },
            { x:86,  y:138, a:20,  s:10 },
            { x:108, y:118, a:-35, s:10 },
            { x:138, y:108, a:14,  s:11 },
            { x:162, y:140, a:30,  s:10 },
            { x:182, y:168, a:22,  s:11 },
          ].map(({ x, y, a, s }, i) => (
            <g key={i} transform={`rotate(${a} ${x} ${y})`}
              className={`bloom_${uid}`}
              style={{ animationDelay: `${r4(0.48 + i * 0.065)}s` }}>
              <path
                d={`M${x} ${y} Q${r4(x+s*.85)} ${r4(y-s*.36)} ${r4(x+s*1.6)} ${y} Q${r4(x+s*.85)} ${r4(y+s*.36)} ${x} ${y}Z`}
                fill="rgba(201,162,39,0.12)" stroke="#c9a227" strokeWidth="0.75" opacity="0.7"
              />
              <line x1={x} y1={y} x2={r4(x+s*1.6)} y2={y} stroke="#c9a227" strokeWidth="0.45" opacity="0.55" />
            </g>
          ))}

          {/* Roses */}
          <SimpleRose cx={74} cy={66} r={22} white uid={uid} baseDelay={0.82} />
          <SimpleRose cx={130} cy={96} r={16} white={false} uid={uid} baseDelay={1.02} />
          <SimpleRose cx={24} cy={168} r={10} white uid={uid} baseDelay={1.26} />

          {/* Daisies */}
          {[[58,100,8],[106,80,7],[148,118,7],[178,148,6]].map(([cx,cy,rv],i) => (
            <SimpleDaisy key={i} cx={cx} cy={cy} r={rv} uid={uid} baseDelay={r4(1.1 + i * 0.1)} />
          ))}

          {/* Gold berries */}
          {[[92,56],[68,44],[108,62],[162,88],[136,70]].map(([bx,by], i) => (
            <circle key={i} cx={bx} cy={by} r={2.5} fill="#c9a227" opacity={0.6}
              className={`bloom_${uid}`}
              style={{ animationDelay: `${r4(1.48 + i * 0.06)}s` }} />
          ))}
        </svg>
      </div>
    </>
  );
});

function SimpleRose({ cx, cy, r, white, uid, baseDelay }: {
  cx:number; cy:number; r:number; white:boolean; uid:string; baseDelay:number;
}) {
  const f1 = white ? "#ffffff" : "#fdf3c8";
  const f2 = white ? "#f0ece0" : "#c9a227";
  const f3 = white ? "#e2ddd2" : "#8B6914";
  const sk = white ? "rgba(201,162,39,0.2)" : "rgba(201,162,39,0.5)";
  const cls = `bloom_${uid}`;
  const outer  = [0,45,90,135,180,225,270,315];
  const middle = [22,67,112,157,202,247,292,337];
  return (
    <g>
      {outer.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        // r4() ensures SSR and browser produce identical attribute strings
        const px = r4(cx + r * 0.78 * Math.cos(rad));
        const py = r4(cy + r * 0.78 * Math.sin(rad) * 0.62);
        return <ellipse key={`o${i}`} cx={px} cy={py} rx={r4(r*.44)} ry={r4(r*.27)}
          fill={f1} stroke={sk} strokeWidth="0.35"
          transform={`rotate(${a+90} ${px} ${py})`} opacity={0.9}
          className={cls} style={{ animationDelay: `${r4(baseDelay + i*.022)}s` }} />;
      })}
      {middle.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const px = r4(cx + r * 0.42 * Math.cos(rad));
        const py = r4(cy + r * 0.42 * Math.sin(rad) * 0.65);
        return <ellipse key={`m${i}`} cx={px} cy={py} rx={r4(r*.3)} ry={r4(r*.18)}
          fill={f2} stroke={sk} strokeWidth="0.3"
          transform={`rotate(${a+90} ${px} ${py})`} opacity={0.88}
          className={cls} style={{ animationDelay: `${r4(baseDelay + 0.22 + i*.022)}s` }} />;
      })}
      <circle cx={cx} cy={cy} r={r4(r*.16)} fill={f3}
        className={cls} style={{ animationDelay: `${r4(baseDelay + 0.48)}s` }} />
    </g>
  );
}

function SimpleDaisy({ cx, cy, r, uid, baseDelay }: {
  cx:number; cy:number; r:number; uid:string; baseDelay:number;
}) {
  const cls = `bloom_${uid}`;
  return (
    <g>
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const px = r4(cx + r*.68*Math.cos(rad));
        const py = r4(cy + r*.68*Math.sin(rad)*.76);
        return <ellipse key={i} cx={px} cy={py} rx={r4(r*.36)} ry={r4(r*.19)}
          fill="#ffffff" stroke="rgba(201,162,39,0.16)" strokeWidth="0.25"
          transform={`rotate(${a} ${px} ${py})`} opacity={0.87}
          className={cls} style={{ animationDelay: `${r4(baseDelay + i*.018)}s` }} />;
      })}
      <circle cx={cx} cy={cy} r={r4(r*.22)} fill="#d4a830"
        className={cls} style={{ animationDelay: `${r4(baseDelay+0.2)}s` }} />
    </g>
  );
}

// ─── Floral border ────────────────────────────────────────────────────────────
const FloralBorder = memo(function FloralBorder({ flip = false }: { flip?: boolean }) {
  return (
    <div style={{ width:"100%", overflow:"hidden", pointerEvents:"none",
      transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 400 44" width="100%">
        <defs>
          <linearGradient id="bdG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#c9a227" stopOpacity="0" />
            <stop offset="30%"  stopColor="#c9a227" stopOpacity="0.52" />
            <stop offset="70%"  stopColor="#e8c97a" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="22" x2="400" y2="22" stroke="url(#bdG)" strokeWidth="0.8" />
        <g opacity="0.72">
          <circle cx="200" cy="22" r="5"   fill="none" stroke="#c9a227" strokeWidth="0.9" />
          <circle cx="200" cy="22" r="2"   fill="#c9a227" />
          <circle cx="188" cy="22" r="2.4" fill="none" stroke="#c9a227" strokeWidth="0.6" />
          <circle cx="212" cy="22" r="2.4" fill="none" stroke="#c9a227" strokeWidth="0.6" />
          {[0,45,90,135,180,225,270,315].map((a, i) => (
            <line key={i}
              x1={r4(200 + 5*Math.cos(a*Math.PI/180))} y1={r4(22 + 5*Math.sin(a*Math.PI/180))}
              x2={r4(200 + 9*Math.cos(a*Math.PI/180))} y2={r4(22 + 9*Math.sin(a*Math.PI/180))}
              stroke="#c9a227" strokeWidth="0.55" />
          ))}
        </g>
        {[55,72,86].map((x, i) => (
          <g key={i} opacity="0.48">
            <circle cx={x} cy={r4(22 - 3 + i)} r={r4(2.4 - i * 0.35)}
              fill="none" stroke="#c9a227" strokeWidth="0.55" />
            <circle cx={x} cy={r4(22 - 3 + i)} r={0.8} fill="#c9a227" opacity="0.6" />
          </g>
        ))}
        <g opacity="0.48" transform="translate(400,0) scale(-1,1)">
          {[55,72,86].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={r4(22 - 3 + i)} r={r4(2.4 - i * 0.35)}
                fill="none" stroke="#c9a227" strokeWidth="0.55" />
              <circle cx={x} cy={r4(22 - 3 + i)} r={0.8} fill="#c9a227" opacity="0.6" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
});

// ─── Gold divider (CSS spin only) ────────────────────────────────────────────
function GoldDivider() {
  return (
    <>
      <style>{`
        @keyframes spinStar { to { transform: rotate(360deg); } }
        .spin-star { animation: spinStar 10s linear infinite; display:inline-block; }
      `}</style>
      <div style={{ display:"flex", alignItems:"center", gap:12,
        width:"100%", maxWidth:240, margin:"14px auto" }}>
        <div style={{ flex:1, height:1,
          background:"linear-gradient(90deg,transparent,#c9a227,transparent)", opacity:0.6 }} />
        <span className="spin-star" style={{ color:"#c9a227", fontSize:13 }}>✦</span>
        <div style={{ flex:1, height:1,
          background:"linear-gradient(90deg,transparent,#c9a227,transparent)", opacity:0.6 }} />
      </div>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function InvitationOpening({ isOpen, onOpen }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  // Render nothing on the server — avoids all trig-based hydration mismatches
  // from child components like SvgRose/SvgOrchid in other sections.
  // The invitation overlay is client-only UX anyway.
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="invitation"
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "space-between",
            overflow: "hidden", background: "#FFFDF7",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Ambient glows — static divs, no motion needed */}
          <div style={{
            position:"absolute", top:-100, left:"50%",
            transform:"translateX(-50%)",
            width:360, height:360, borderRadius:"50%", pointerEvents:"none",
            background:"radial-gradient(circle,rgba(201,162,39,0.11) 0%,transparent 70%)",
          }} />
          <div style={{
            position:"absolute", bottom:-80, right:-40,
            width:280, height:280, borderRadius:"50%", pointerEvents:"none",
            background:"radial-gradient(circle,rgba(201,162,39,0.07) 0%,transparent 70%)",
          }} />

          {/* Corner florals */}
          <CornerFloral corner="tl" />
          <CornerFloral corner="tr" />
          <CornerFloral corner="bl" />
          <CornerFloral corner="br" />

          {/* Floating particles — CSS-only, GPU-composited */}
          <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
            {PARTICLES.map((p, i) => (
              <FloatingParticle key={i} {...p} uid={`p${i}`} />
            ))}
          </div>

          {/* Top border */}
          <div style={{ width:"100%",
            paddingTop:"clamp(48px,8vw,72px)",
            paddingLeft:6, paddingRight:6 }}>
            <FloralBorder />
          </div>

          {/* Main content — 3 Framer variants max */}
          <motion.div
            style={{
              position:"relative", zIndex:10,
              display:"flex", flexDirection:"column",
              alignItems:"center", textAlign:"center",
              padding:"0 24px", flex:1,
              justifyContent:"center",
              maxWidth:440, width:"100%", margin:"0 auto",
            }}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:0.2, ease:"easeOut" }}
          >
            {/* Label */}
            <p style={{
              marginBottom:12, textTransform:"uppercase",
              letterSpacing:"clamp(5px,2vw,8px)",
              fontSize:"clamp(10px,2.2vw,12px)", fontWeight:500,
              color:"#c9a227", fontFamily:"'Cinzel',serif",
            }}>
              Wedding Invitation
            </p>

            {/* Initials */}
            <div style={{
              display:"flex", alignItems:"center",
              justifyContent:"center",
              gap:"clamp(10px,3.5vw,22px)", marginBottom:4,
            }}>
              <span style={{
                fontSize:"clamp(64px,16vw,108px)", lineHeight:1,
                color:"#1a1008",
                fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
              }}>M</span>
              <span style={{
                fontSize:"clamp(40px,10vw,68px)",
                background:"linear-gradient(135deg,#8B6914 0%,#c9a227 38%,#f9eebc 58%,#c9a227 78%,#8B6914 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text",
                fontFamily:"'Cormorant Garamond',serif",
                fontStyle:"italic", lineHeight:1, display:"block",
              }}>&amp;</span>
              <span style={{
                fontSize:"clamp(64px,16vw,108px)", lineHeight:1,
                color:"#1a1008",
                fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
              }}>S</span>
            </div>

            {/* Names */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:2 }}>
              {["MEGHANA","✦","SRIVATS"].map((t, i) => (
                <span key={i} style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize: t === "✦" ? "9px" : "clamp(9px,2.1vw,12px)",
                  letterSpacing:"3px",
                  color: t === "✦" ? "#c9a227" : "#5C4033",
                }}>{t}</span>
              ))}
            </div>

            <GoldDivider />

            {/* Tagline */}
            <div style={{ marginBottom:12 }}>
              {["Together with their families","invite you to celebrate love"].map((l, i) => (
                <p key={i} style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:"clamp(13px,3vw,16px)", fontStyle:"italic",
                  color:"#5C4033", letterSpacing:"0.5px", marginTop: i ? 4 : 0,
                }}>{l}</p>
              ))}
            </div>

            {/* Date badge */}
            <div style={{ marginBottom:24 }}>
              <div style={{
                border:"1px solid rgba(201,162,39,0.4)", borderRadius:2,
                padding:"8px 22px", display:"inline-block",
                background:"rgba(201,162,39,0.04)",
              }}>
                <p style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize:"clamp(9px,2.1vw,11px)",
                  letterSpacing:"4px", color:"#c9a227", margin:0,
                }}>02 · JULY · 2026</p>
              </div>
            </div>

            {/* CTA button */}
            <motion.button
              onClick={onOpen}
              style={{
                position:"relative", padding:"14px 40px",
                background:"transparent", border:"1px solid #c9a227",
                borderRadius:2, fontFamily:"'Cinzel',serif",
                fontSize:"clamp(10px,2.1vw,11px)", letterSpacing:"4px",
                color:"#8B6914", cursor:"pointer",
                textTransform:"uppercase", overflow:"hidden", minWidth:200,
              }}
              whileHover={{
                color:"#FFFDF7",
                backgroundColor:"#c9a227",
                transition:{ duration:0.22 },
              }}
              whileTap={{ scale:0.97 }}
            >
              Open Invitation
            </motion.button>
          </motion.div>

          {/* Bottom border */}
          <div style={{ width:"100%",
            paddingBottom:"clamp(48px,8vw,72px)",
            paddingLeft:6, paddingRight:6 }}>
            <FloralBorder flip />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}