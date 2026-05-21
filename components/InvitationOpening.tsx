"use client";

import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
};

// ─── Golden Feather (static SVG, no motion inside) ───────────────────────────
const GoldenFeather = memo(function GoldenFeather({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2.6} viewBox="0 0 26 68" fill="none">
      <defs>
        <linearGradient id="fgA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9eebc" />
          <stop offset="45%" stopColor="#d4a830" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      <line x1="13" y1="66" x2="13" y2="3" stroke="url(#fgA)" strokeWidth="1.1" strokeLinecap="round" />
      {[9,15,21,28,36,44,52,59].map((y, i) => (
        <g key={i} opacity={0.5 + i * 0.05}>
          <path d={`M13 ${y} Q${5-i*0.4} ${y-4} ${1+i*0.2} ${y-9}`} stroke="url(#fgA)" strokeWidth="0.85" strokeLinecap="round" fill="none" />
          <path d={`M13 ${y} Q${21+i*0.4} ${y-4} ${25-i*0.2} ${y-9}`} stroke="url(#fgA)" strokeWidth="0.85" strokeLinecap="round" fill="none" />
        </g>
      ))}
      <circle cx="13" cy="3" r="1.6" fill="#f9eebc" opacity="0.9" />
    </svg>
  );
});

// ─── Golden Petal (static SVG) ────────────────────────────────────────────────
const GoldenPetal = memo(function GoldenPetal({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 18 31" fill="none">
      <defs>
        <linearGradient id="pgA" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#f9eebc" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#c9a227" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#8B6914" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path d="M9 1 C15 7,17 17,9 30 C1 17,3 7,9 1Z" fill="url(#pgA)" opacity="0.78" />
      <line x1="9" y1="4" x2="9" y2="27" stroke="#f9eebc" strokeWidth="0.5" opacity="0.45" />
      <path d="M9 10 Q13 16 9 24" stroke="#f9eebc" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M9 10 Q5 16 9 24" stroke="#f9eebc" strokeWidth="0.4" fill="none" opacity="0.3" />
    </svg>
  );
});

// ─── Floating Particle — only 1 motion.div per particle ──────────────────────
const FloatingParticle = memo(function FloatingParticle({
  type, delay, duration, left, size,
}: {
  type: "feather" | "petal"; delay: number; duration: number; left: string; size: number;
}) {
  return (
    <motion.div
      style={{ position: "absolute", top: -70, left, pointerEvents: "none" }}
      animate={{
        y: ["0px", "112vh"],
        opacity: [0, 0.85, 0.72, 0],
        rotate: type === "feather" ? [-12, 8, -6, 14] : [0, 120, 240, 360],
        x: [0, 14, -9, 18, -5],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.12, 0.88, 1],
      }}
    >
      {type === "feather" ? <GoldenFeather size={size} /> : <GoldenPetal size={size} />}
    </motion.div>
  );
});

// ─── Corner floral — pure CSS-animated SVG, zero framer-motion inside ─────────
// All bloom animations via CSS keyframes = GPU-composited, no JS animation loop
const CornerFloral = memo(function CornerFloral({
  corner,
}: {
  corner: "tl" | "tr" | "bl" | "br";
}) {
  const isLeft = corner === "tl" || corner === "bl";
  const isTop  = corner === "tl" || corner === "tr";
  const uid = corner; // unique prefix for gradient IDs

  return (
    <>
      <style>{`
        @keyframes bloomIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes stemGrow_${uid} {
          from { stroke-dashoffset: 400; opacity: 0; }
          to   { stroke-dashoffset: 0;   opacity: 1; }
        }
        .cf-stem-${uid} {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: stemGrow_${uid} 1.3s ease-out forwards;
        }
        .cf-bloom-${uid} {
          transform-box: fill-box;
          transform-origin: center;
          animation: bloomIn 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards;
          opacity: 0;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          width: "clamp(150px, 30vw, 240px)",
          height: "clamp(150px, 30vw, 240px)",
          pointerEvents: "none",
          zIndex: 2,
          ...(isLeft ? { left: 0 } : { right: 0 }),
          ...(isTop  ? { top: 0  } : { bottom: 0 }),
          transform: `scaleX(${isLeft ? 1 : -1}) scaleY(${isTop ? 1 : -1})`,
        }}
      >
        <svg viewBox="0 0 240 240" width="100%" height="100%" fill="none" overflow="visible">
          <defs>
            <linearGradient id={`sg_${uid}`} x1="0" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#8B6914" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c9a227" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Stems — CSS dash animation, no framer */}
          {[
            { d: "M0 240 Q28 185 52 145 Q72 110 90 82",  delay: "0.05s", w: 1.6 },
            { d: "M0 240 Q48 200 80 168 Q112 140 142 114", delay: "0.17s", w: 1.4 },
            { d: "M0 240 Q65 218 102 196 Q140 172 170 150", delay: "0.28s", w: 1.2 },
            { d: "M0 240 Q18 215 34 192 Q52 168 64 145",  delay: "0.14s", w: 1.1 },
            { d: "M0 240 Q88 232 128 218 Q166 202 196 182", delay: "0.38s", w: 1.0 },
          ].map(({ d, delay, w }, i) => (
            <path
              key={i}
              d={d}
              stroke={`url(#sg_${uid})`}
              strokeWidth={w}
              strokeLinecap="round"
              className={`cf-stem-${uid}`}
              style={{ animationDelay: delay }}
            />
          ))}

          {/* Filigree leaves — CSS bloom */}
          {[
            { x:22,  y:208, a:-48, s:16 },
            { x:46,  y:175, a:-62, s:14 },
            { x:68,  y:143, a:-72, s:13 },
            { x:95,  y:158, a:22,  s:12 },
            { x:118, y:136, a:-38, s:11 },
            { x:152, y:126, a:12,  s:12 },
            { x:174, y:158, a:32,  s:11 },
            { x:196, y:194, a:20,  s:12 },
            { x:38,  y:192, a:-28, s:10 },
          ].map(({ x, y, a, s }, i) => (
            <g
              key={i}
              transform={`rotate(${a} ${x} ${y})`}
              className={`cf-bloom-${uid}`}
              style={{ animationDelay: `${0.45 + i * 0.07}s` }}
            >
              <path
                d={`M${x} ${y} Q${x+s*0.85} ${y-s*0.38} ${x+s*1.65} ${y} Q${x+s*0.85} ${y+s*0.38} ${x} ${y}Z`}
                fill="rgba(201,162,39,0.14)"
                stroke="#c9a227"
                strokeWidth="0.8"
                opacity="0.72"
              />
              <line x1={x} y1={y} x2={x+s*1.65} y2={y} stroke="#c9a227" strokeWidth="0.5" opacity="0.6" />
              {[0.35, 0.7, 1.05, 1.4].map((t, j) => (
                <g key={j}>
                  <line x1={x+s*t} y1={y} x2={x+s*t-s*0.1} y2={y-s*0.24} stroke="#c9a227" strokeWidth="0.35" opacity="0.45" />
                  <line x1={x+s*t} y1={y} x2={x+s*t-s*0.1} y2={y+s*0.24} stroke="#c9a227" strokeWidth="0.35" opacity="0.45" />
                </g>
              ))}
              <circle cx={x+s*1.65} cy={y} r={s*0.07} fill="#c9a227" opacity="0.55" />
            </g>
          ))}

          {/* Filigree curls */}
          {[
            { x:58,  y:130, a:-52, s:16 },
            { x:102, y:112, a:-22, s:14 },
            { x:146, y:142, a:16,  s:13 },
            { x:182, y:172, a:28,  s:12 },
          ].map(({ x, y, a, s }, i) => (
            <g
              key={i}
              transform={`rotate(${a} ${x} ${y})`}
              className={`cf-bloom-${uid}`}
              style={{ animationDelay: `${0.88 + i * 0.14}s`, opacity: 0.68 }}
            >
              <path
                d={`M${x} ${y} C${x+s*0.5} ${y-s} ${x+s*1.2} ${y-s*0.8} ${x+s*1.4} ${y-s*0.18} C${x+s*1.5} ${y+s*0.28} ${x+s*1.1} ${y+s*0.5} ${x+s*0.8} ${y+s*0.3}`}
                fill="none"
                stroke="#c9a227"
                strokeWidth="0.85"
                strokeLinecap="round"
              />
              <circle cx={x+s*0.8} cy={y+s*0.3} r={s*0.07} fill="#c9a227" opacity="0.75" />
            </g>
          ))}

          {/* Glow halos — simple circles, no animation */}
          <circle cx={84} cy={76} r={32} fill="rgba(245,230,160,0.09)" />
          <circle cx={148} cy={108} r={24} fill="rgba(245,230,160,0.07)" />

          {/* White Rose hero — CSS bloom, petals as static paths */}
          <StaticRose cx={84} cy={76} r={26} white uid={uid} baseDelay={0.78} />

          {/* Gold Rose */}
          <StaticRose cx={148} cy={108} r={19} white={false} uid={uid} baseDelay={1.0} />

          {/* Small white rose bud */}
          <StaticRose cx={28} cy={192} r={12} white uid={uid} baseDelay={1.28} />
          <StaticRose cx={200} cy={180} r={10} white={false} uid={uid} baseDelay={1.36} />

          {/* Orchids */}
          <StaticOrchid cx={50} cy={148} r={17} uid={uid} baseDelay={1.08} />
          <StaticOrchid cx={182} cy={146} r={15} uid={uid} baseDelay={1.22} />

          {/* Daisy fillers */}
          <StaticDaisy cx={66}  cy={112} r={9}  uid={uid} baseDelay={1.18} />
          <StaticDaisy cx={124} cy={90}  r={8}  uid={uid} baseDelay={1.28} />
          <StaticDaisy cx={168} cy={130} r={8}  uid={uid} baseDelay={1.33} />
          <StaticDaisy cx={42}  cy={174} r={7}  uid={uid} baseDelay={1.4}  />
          <StaticDaisy cx={200} cy={158} r={7}  uid={uid} baseDelay={1.46} />

          {/* Gold berries */}
          {[[104,68],[78,50],[62,88],[172,96],[126,76]].map(([bx,by],i)=>(
            <circle
              key={i} cx={bx} cy={by} r={2.8}
              fill="#c9a227" opacity={0.62}
              className={`cf-bloom-${uid}`}
              style={{ animationDelay: `${1.52 + i * 0.06}s` }}
            />
          ))}
        </svg>
      </div>
    </>
  );
});

// ─── Static Rose (CSS-animated, not framer) ───────────────────────────────────
function StaticRose({
  cx, cy, r, white, uid, baseDelay,
}: {
  cx: number; cy: number; r: number; white: boolean; uid: string; baseDelay: number;
}) {
  const f1 = white ? "#ffffff" : "#fdf3c8";
  const f2 = white ? "#f0ece0" : "#c9a227";
  const f3 = white ? "#e2ddd2" : "#8B6914";
  const sk = white ? "rgba(201,162,39,0.22)" : "rgba(201,162,39,0.55)";
  const outer  = [0,40,80,120,160,200,240,280,320];
  const middle = [20,65,110,155,200,245,290,335];
  const inner  = [0,60,120,180,240,300];
  const cls = `cf-bloom-${uid}`;
  return (
    <g>
      <ellipse cx={cx} cy={cy+2} rx={r*0.88} ry={r*0.26} fill="rgba(139,105,20,0.08)" />
      {outer.map((a,i) => {
        const rad=(a*Math.PI)/180, px=cx+r*0.8*Math.cos(rad), py=cy+r*0.8*Math.sin(rad)*0.62;
        return (
          <ellipse key={`o${i}`} cx={px} cy={py} rx={r*0.46} ry={r*0.29}
            fill={f1} stroke={sk} strokeWidth="0.4"
            transform={`rotate(${a+90} ${px} ${py})`} opacity={0.92}
            className={cls} style={{ animationDelay: `${baseDelay + i*0.025}s` }}
          />
        );
      })}
      {middle.map((a,i) => {
        const rad=(a*Math.PI)/180, px=cx+r*0.44*Math.cos(rad), py=cy+r*0.44*Math.sin(rad)*0.65;
        return (
          <ellipse key={`m${i}`} cx={px} cy={py} rx={r*0.32} ry={r*0.2}
            fill={f2} stroke={sk} strokeWidth="0.35"
            transform={`rotate(${a+90} ${px} ${py})`} opacity={0.9}
            className={cls} style={{ animationDelay: `${baseDelay + 0.26 + i*0.025}s` }}
          />
        );
      })}
      {inner.map((a,i) => {
        const rad=(a*Math.PI)/180, px=cx+r*0.19*Math.cos(rad), py=cy+r*0.19*Math.sin(rad)*0.7;
        return (
          <ellipse key={`i${i}`} cx={px} cy={py} rx={r*0.18} ry={r*0.11}
            fill={i%2===0 ? f2 : f3}
            transform={`rotate(${a+90} ${px} ${py})`} opacity={0.88}
            className={cls} style={{ animationDelay: `${baseDelay + 0.48 + i*0.02}s` }}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r*0.11} fill={f3}
        className={cls} style={{ animationDelay: `${baseDelay + 0.65}s` }} />
    </g>
  );
}

// ─── Static Orchid ────────────────────────────────────────────────────────────
function StaticOrchid({
  cx, cy, r, uid, baseDelay,
}: {
  cx: number; cy: number; r: number; uid: string; baseDelay: number;
}) {
  const cls = `cf-bloom-${uid}`;
  const petals = [
    { a:-58, rx:r*0.5, ry:r*0.27 }, { a:-122, rx:r*0.5, ry:r*0.27 },
    { a:0,   rx:r*0.52, ry:r*0.25 }, { a:180, rx:r*0.52, ry:r*0.25 },
    { a:90,  rx:r*0.37, ry:r*0.21 },
  ];
  return (
    <g>
      {petals.map((p, i) => {
        const rad=(p.a*Math.PI)/180, px=cx+r*0.54*Math.cos(rad), py=cy+r*0.54*Math.sin(rad)*0.72;
        return (
          <ellipse key={i} cx={px} cy={py} rx={p.rx} ry={p.ry}
            fill="#ffffff" stroke="rgba(201,162,39,0.2)" strokeWidth="0.38"
            transform={`rotate(${p.a} ${px} ${py})`} opacity={0.9}
            className={cls} style={{ animationDelay: `${baseDelay + i*0.05}s` }}
          />
        );
      })}
      <ellipse cx={cx} cy={cy} rx={r*0.17} ry={r*0.21} fill="#d4a830"
        className={cls} style={{ animationDelay: `${baseDelay+0.36}s` }} />
      <circle cx={cx} cy={cy-r*0.06} r={r*0.07} fill="#c9a227"
        className={cls} style={{ animationDelay: `${baseDelay+0.46}s` }} />
    </g>
  );
}

// ─── Static Daisy ─────────────────────────────────────────────────────────────
function StaticDaisy({
  cx, cy, r, uid, baseDelay,
}: {
  cx: number; cy: number; r: number; uid: string; baseDelay: number;
}) {
  const cls = `cf-bloom-${uid}`;
  return (
    <g>
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const rad=(a*Math.PI)/180, px=cx+r*0.7*Math.cos(rad), py=cy+r*0.7*Math.sin(rad)*0.76;
        return (
          <ellipse key={i} cx={px} cy={py} rx={r*0.38} ry={r*0.21}
            fill="#ffffff" stroke="rgba(201,162,39,0.18)" strokeWidth="0.28"
            transform={`rotate(${a} ${px} ${py})`} opacity={0.88}
            className={cls} style={{ animationDelay: `${baseDelay + i*0.02}s` }}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r*0.23} fill="#d4a830"
        className={cls} style={{ animationDelay: `${baseDelay+0.24}s` }} />
    </g>
  );
}

// ─── Floral border (pure SVG, no framer inside) ───────────────────────────────
const FloralBorder = memo(function FloralBorder({ flip = false }: { flip?: boolean }) {
  return (
    <div style={{ width:"100%", overflow:"hidden", pointerEvents:"none", transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 400 46" width="100%">
        <defs>
          <linearGradient id="bdG2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#c9a227" stopOpacity="0" />
            <stop offset="28%"  stopColor="#c9a227" stopOpacity="0.55" />
            <stop offset="72%"  stopColor="#e8c97a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="23" x2="400" y2="23" stroke="url(#bdG2)" strokeWidth="0.8" />
        <g opacity="0.75">
          <circle cx="200" cy="23" r="5" fill="none" stroke="#c9a227" strokeWidth="0.9" />
          <circle cx="200" cy="23" r="2" fill="#c9a227" />
          {[0,45,90,135,180,225,270,315].map((a,i)=>(
            <line key={i}
              x1={200+5*Math.cos(a*Math.PI/180)} y1={23+5*Math.sin(a*Math.PI/180)}
              x2={200+9*Math.cos(a*Math.PI/180)} y2={23+9*Math.sin(a*Math.PI/180)}
              stroke="#c9a227" strokeWidth="0.6" />
          ))}
          <circle cx="187" cy="23" r="2.5" fill="none" stroke="#c9a227" strokeWidth="0.6" />
          <circle cx="213" cy="23" r="2.5" fill="none" stroke="#c9a227" strokeWidth="0.6" />
        </g>
        {[55,75,90].map((x,i)=>(
          <g key={i} opacity="0.5">
            <circle cx={x} cy={23-4+i} r={2.5-i*0.4} fill="none" stroke="#c9a227" strokeWidth="0.6" />
            <circle cx={x} cy={23-4+i} r={0.9} fill="#c9a227" opacity="0.6" />
          </g>
        ))}
        <g opacity="0.5" transform="translate(400,0) scale(-1,1)">
          {[55,75,90].map((x,i)=>(
            <g key={i}>
              <circle cx={x} cy={23-4+i} r={2.5-i*0.4} fill="none" stroke="#c9a227" strokeWidth="0.6" />
              <circle cx={x} cy={23-4+i} r={0.9} fill="#c9a227" opacity="0.6" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
});

// ─── Gold divider ─────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, width:"100%", maxWidth:260, margin:"16px auto" }}>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,#c9a227,transparent)", opacity:0.6 }} />
      <motion.span style={{ color:"#c9a227", fontSize:15 }}
        animate={{ rotate:[0,360] }} transition={{ duration:9, repeat:Infinity, ease:"linear" }}>✦</motion.span>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,#c9a227,transparent)", opacity:0.6 }} />
    </div>
  );
}

// ─── Particle config ──────────────────────────────────────────────────────────
const PARTICLES = [
  { type:"feather" as const, delay:0,   duration:11, left:"5%",  size:22 },
  { type:"petal"   as const, delay:1.3, duration:9,  left:"14%", size:17 },
  { type:"feather" as const, delay:2.7, duration:13, left:"26%", size:19 },
  { type:"petal"   as const, delay:0.5, duration:10, left:"40%", size:18 },
  { type:"petal"   as const, delay:3.4, duration:8,  left:"56%", size:16 },
  { type:"feather" as const, delay:1.7, duration:12, left:"67%", size:23 },
  { type:"petal"   as const, delay:4.1, duration:11, left:"77%", size:17 },
  { type:"feather" as const, delay:0.8, duration:10, left:"87%", size:20 },
  { type:"petal"   as const, delay:2.1, duration:9,  left:"94%", size:15 },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function InvitationOpening({ isOpen, onOpen }: Props) {
  const [mounted, setMounted] = useState(false);
  // Defer render to next frame so page paints first
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          style={{
            position:"fixed", inset:0, zIndex:50,
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"space-between",
            overflow:"hidden", background:"#FFFDF7",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Ambient glows */}
          <div style={{
            position:"absolute", top:-110, left:"50%", transform:"translateX(-50%)",
            width:400, height:400, borderRadius:"50%", pointerEvents:"none",
            background:"radial-gradient(circle,rgba(201,162,39,0.12) 0%,transparent 70%)",
          }} />
          <div style={{
            position:"absolute", bottom:-100, right:-50,
            width:320, height:320, borderRadius:"50%", pointerEvents:"none",
            background:"radial-gradient(circle,rgba(201,162,39,0.08) 0%,transparent 70%)",
          }} />

          {/* Corner florals — rendered after mount, CSS animated */}
          <CornerFloral corner="tl" />
          <CornerFloral corner="tr" />
          <CornerFloral corner="bl" />
          <CornerFloral corner="br" />

          {/* Floating particles */}
          <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
            {PARTICLES.map((p,i) => <FloatingParticle key={i} {...p} />)}
          </div>

          {/* Top border */}
          <div style={{ width:"100%", paddingTop:"clamp(52px,9vw,78px)", paddingLeft:6, paddingRight:6 }}>
            <FloralBorder />
          </div>

          {/* Main content */}
          <motion.div
            style={{
              position:"relative", zIndex:10,
              display:"flex", flexDirection:"column", alignItems:"center",
              textAlign:"center", padding:"0 24px",
              flex:1, justifyContent:"center",
              maxWidth:440, width:"100%", margin:"0 auto",
            }}
            initial={{ opacity:0, y:24 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, delay:0.25, ease:"easeOut" }}
          >
            <motion.p
              style={{
                marginBottom:14, textTransform:"uppercase",
                letterSpacing:"clamp(5px,2vw,8px)",
                fontSize:"clamp(10px,2.2vw,12px)", fontWeight:500,
                color:"#c9a227", fontFamily:"'Cinzel',serif",
              }}
              initial={{ opacity:0, y:-10 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.5, duration:0.7 }}
            >
              Wedding Invitation
            </motion.p>

            {/* Initials */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              gap:"clamp(10px,3.5vw,22px)", marginBottom:5,
            }}>
              {["M","S"].map((letter, idx) => (
                <motion.span
                  key={letter}
                  style={{
                    fontSize:"clamp(66px,17vw,112px)", lineHeight:1,
                    color:"#1a1008", fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
                  }}
                  initial={{ opacity:0, x: idx === 0 ? -48 : 48 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.65, duration:0.9, ease:"easeOut" }}
                >
                  {letter}
                </motion.span>
              )).reduce((acc: React.ReactNode[], el, i, arr) =>
                i < arr.length - 1
                  ? [...acc, el,
                      <motion.span
                        key="amp"
                        style={{
                          fontSize:"clamp(42px,11vw,72px)",
                          background:"linear-gradient(135deg,#8B6914 0%,#c9a227 38%,#f9eebc 58%,#c9a227 78%,#8B6914 100%)",
                          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                          backgroundClip:"text", fontFamily:"'Great Vibes',cursive",
                          lineHeight:1, display:"block",
                        }}
                        initial={{ opacity:0, scale:0.4 }}
                        animate={{ opacity:1, scale:1 }}
                        transition={{ delay:0.85, duration:0.7, type:"spring", stiffness:160 }}
                      >
                        &amp;
                      </motion.span>]
                  : [...acc, el]
              , [])}
            </div>

            {/* Names */}
            <motion.div
              style={{ display:"flex", alignItems:"center", gap:10, marginBottom:2 }}
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:1.0, duration:0.7 }}
            >
              {["MEGHANA","✦","SRIVATS"].map((t,i) => (
                <span key={i} style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize: t==="✦" ? "9px" : "clamp(9px,2.1vw,12px)",
                  letterSpacing:"3px",
                  color: t==="✦" ? "#c9a227" : "#5C4033",
                }}>{t}</span>
              ))}
            </motion.div>

            <GoldDivider />

            <motion.div
              style={{ marginBottom:13 }}
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:1.15, duration:0.7 }}
            >
              {["Together with their families","invite you to celebrate love"].map((l,i) => (
                <p key={i} style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:"clamp(13px,3.1vw,16px)", fontStyle:"italic",
                  color:"#5C4033", letterSpacing:"0.5px", marginTop: i ? 4 : 0,
                }}>{l}</p>
              ))}
            </motion.div>

            {/* Date badge */}
            <motion.div
              style={{ marginBottom:26 }}
              initial={{ opacity:0, y:10 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:1.3, duration:0.7 }}
            >
              <div style={{
                border:"1px solid rgba(201,162,39,0.4)", borderRadius:2,
                padding:"8px 22px", display:"inline-block", background:"rgba(201,162,39,0.04)",
              }}>
                <p style={{
                  fontFamily:"'Cinzel',serif", fontSize:"clamp(9px,2.1vw,11px)",
                  letterSpacing:"4px", color:"#c9a227", margin:0,
                }}>02 · JULY · 2026</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button
              onClick={onOpen}
              style={{
                position:"relative", padding:"14px 40px",
                background:"transparent", border:"1px solid #c9a227",
                borderRadius:2, fontFamily:"'Cinzel',serif",
                fontSize:"clamp(10px,2.1vw,11px)", letterSpacing:"4px",
                color:"#8B6914", cursor:"pointer", textTransform:"uppercase",
                overflow:"hidden", minWidth:200,
              }}
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:1.5, duration:0.7 }}
              whileHover={{ scale:1.04, color:"#FFFDF7", backgroundColor:"#c9a227", transition:{ duration:0.25 } }}
              whileTap={{ scale:0.97 }}
            >
              <motion.span
                style={{
                  position:"absolute", inset:0, pointerEvents:"none",
                  background:"linear-gradient(120deg,transparent 0%,rgba(255,255,255,0.38) 50%,transparent 100%)",
                }}
                animate={{ x:["-100%","220%"] }}
                transition={{ delay:2.2, duration:1.4, repeat:Infinity, repeatDelay:3, ease:"easeInOut" }}
              />
              Open Invitation
            </motion.button>
          </motion.div>

          {/* Bottom border */}
          <div style={{ width:"100%", paddingBottom:"clamp(52px,9vw,78px)", paddingLeft:6, paddingRight:6 }}>
            <FloralBorder flip />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}