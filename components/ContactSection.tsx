"use client";

import { motion } from "framer-motion";

// ─── Reusable SVG Rose (white or gold) ───────────────────────────────────────
function SvgRose({
  size = 48,
  white = false,
}: {
  size?: number;
  white?: boolean;
}) {
  const id = white ? "rw" : "rg";
  const f1 = white ? "#ffffff" : "#fdf3c8";
  const f2 = white ? "#f0ece2" : "#c9a227";
  const f3 = white ? "#e2ddd4" : "#8B6914";
  const sk = white
    ? "rgba(201,162,39,0.25)"
    : "rgba(201,162,39,0.55)";
  const cx = size / 2,
    cy = size / 2,
    r = size * 0.42;
  const outer = [0, 40, 80, 120, 160, 200, 240, 280, 320];
  const mid = [20, 65, 110, 155, 200, 245, 290, 335];
  const inner = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`${id}_glow`}>
          <stop offset="0%" stopColor={white ? "rgba(255,255,255,0.18)" : "rgba(245,230,160,0.18)"} />
          <stop offset="100%" stopColor="rgba(245,230,160,0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r * 1.18} fill={`url(#${id}_glow)`} />
      <ellipse cx={cx} cy={cy + 2} rx={r * 0.88} ry={r * 0.26} fill="rgba(139,105,20,0.08)" />
      {outer.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const px = cx + r * 0.8 * Math.cos(rad);
        const py = cy + r * 0.8 * Math.sin(rad) * 0.62;
        return (
          <ellipse
            key={`o${i}`}
            cx={px} cy={py}
            rx={r * 0.46} ry={r * 0.29}
            fill={f1}
            stroke={sk} strokeWidth="0.5"
            transform={`rotate(${a + 90} ${px} ${py})`}
            opacity={0.93}
          />
        );
      })}
      {mid.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const px = cx + r * 0.44 * Math.cos(rad);
        const py = cy + r * 0.44 * Math.sin(rad) * 0.65;
        return (
          <ellipse
            key={`m${i}`}
            cx={px} cy={py}
            rx={r * 0.32} ry={r * 0.2}
            fill={f2}
            stroke={sk} strokeWidth="0.4"
            transform={`rotate(${a + 90} ${px} ${py})`}
            opacity={0.9}
          />
        );
      })}
      {inner.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const px = cx + r * 0.19 * Math.cos(rad);
        const py = cy + r * 0.19 * Math.sin(rad) * 0.7;
        return (
          <ellipse
            key={`i${i}`}
            cx={px} cy={py}
            rx={r * 0.18} ry={r * 0.11}
            fill={i % 2 === 0 ? f2 : f3}
            transform={`rotate(${a + 90} ${px} ${py})`}
            opacity={0.88}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.11} fill={f3} />
    </svg>
  );
}

// ─── SVG Orchid ───────────────────────────────────────────────────────────────
function SvgOrchid({ size = 38, white = true }: { size?: number; white?: boolean }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const fill = white ? "#ffffff" : "#fdf3c8";
  const accent = white ? "#f0ece0" : "#d4a830";
  const petals = [
    { a: -58, rx: r * 0.52, ry: r * 0.28 },
    { a: -122, rx: r * 0.52, ry: r * 0.28 },
    { a: 0, rx: r * 0.54, ry: r * 0.26 },
    { a: 180, rx: r * 0.54, ry: r * 0.26 },
    { a: 90, rx: r * 0.38, ry: r * 0.22 },
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {petals.map((p, i) => {
        const rad = (p.a * Math.PI) / 180;
        const px = cx + r * 0.54 * Math.cos(rad);
        const py = cy + r * 0.54 * Math.sin(rad) * 0.72;
        return (
          <ellipse key={i}
            cx={px} cy={py} rx={p.rx} ry={p.ry}
            fill={fill}
            stroke="rgba(201,162,39,0.28)" strokeWidth="0.5"
            transform={`rotate(${p.a} ${px} ${py})`}
            opacity={0.92}
          />
        );
      })}
      <ellipse cx={cx} cy={cy} rx={r * 0.17} ry={r * 0.21} fill={accent} />
      <circle cx={cx} cy={cy - r * 0.06} r={r * 0.07} fill="#c9a227" />
    </svg>
  );
}

// ─── SVG Daisy ────────────────────────────────────────────────────────────────
function SvgDaisy({ size = 28 }: { size?: number }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const px = cx + r * 0.7 * Math.cos(rad);
        const py = cy + r * 0.7 * Math.sin(rad) * 0.76;
        return (
          <ellipse key={i}
            cx={px} cy={py} rx={r * 0.38} ry={r * 0.21}
            fill="#ffffff"
            stroke="rgba(201,162,39,0.2)" strokeWidth="0.35"
            transform={`rotate(${a} ${px} ${py})`}
            opacity={0.9}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.24} fill="#d4a830" />
      <circle cx={cx} cy={cy} r={r * 0.1} fill="#8B6914" />
    </svg>
  );
}

// ─── SVG Filigree Leaf ────────────────────────────────────────────────────────
function SvgLeaf({ size = 32, angle = 0 }: { size?: number; angle?: number }) {
  const s = size;
  return (
    <svg
      width={s * 1.8} height={s * 0.8}
      viewBox={`0 0 ${s * 1.8} ${s * 0.8}`}
      fill="none"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <path
        d={`M0 ${s * 0.4} Q${s * 0.9} ${s * 0.02} ${s * 1.8} ${s * 0.4} Q${s * 0.9} ${s * 0.78} 0 ${s * 0.4}Z`}
        fill="rgba(201,162,39,0.13)"
        stroke="#c9a227" strokeWidth="0.85" opacity="0.7"
      />
      <line x1={0} y1={s * 0.4} x2={s * 1.8} y2={s * 0.4} stroke="#c9a227" strokeWidth="0.55" opacity="0.6" />
      {[0.3, 0.6, 0.9, 1.2, 1.5].map((t, j) => (
        <g key={j}>
          <line x1={s * t} y1={s * 0.4} x2={s * t - s * 0.1} y2={s * 0.15} stroke="#c9a227" strokeWidth="0.38" opacity="0.5" />
          <line x1={s * t} y1={s * 0.4} x2={s * t - s * 0.1} y2={s * 0.65} stroke="#c9a227" strokeWidth="0.38" opacity="0.5" />
        </g>
      ))}
      <circle cx={s * 1.8} cy={s * 0.4} r={s * 0.045} fill="#c9a227" opacity="0.6" />
    </svg>
  );
}

// ─── Card corner SVG bouquet (mini) ──────────────────────────────────────────
function CardCornerFloral({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width={72} height={72}
      viewBox="0 0 72 72"
      fill="none"
      style={{
        position: "absolute",
        ...(flip ? { bottom: 0, right: 0, transform: "scale(-1,-1)" } : { top: 0, left: 0 }),
        pointerEvents: "none",
        opacity: 0.85,
      }}
    >
      <defs>
        <linearGradient id={`ccsg_${flip}`} x1="0" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#8B6914" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      {/* stems */}
      <path d="M0 72 Q14 52 24 36" stroke={`url(#ccsg_${flip})`} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M0 72 Q22 60 36 50" stroke={`url(#ccsg_${flip})`} strokeWidth="1.0" fill="none" strokeLinecap="round" />
      <path d="M0 72 Q8 62 14 54" stroke={`url(#ccsg_${flip})`} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {/* leaves */}
      {[{cx:14,cy:54,a:-55,rx:8,ry:3.5},{cx:22,cy:44,a:-68,rx:7,ry:3}].map((l,i)=>(
        <ellipse key={i} cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
          fill="rgba(201,162,39,0.18)" stroke="#c9a227" strokeWidth="0.6"
          transform={`rotate(${l.a} ${l.cx} ${l.cy})`} opacity={0.65} />
      ))}
      {/* mini rose */}
      {[0,60,120,180,240,300].map((a,i)=>{
        const rad=a*Math.PI/180, px=24+8*Math.cos(rad), py=35+8*Math.sin(rad)*0.65;
        return <ellipse key={i} cx={px} cy={py} rx={4.5} ry={2.8}
          fill="#ffffff" stroke="rgba(201,162,39,0.28)" strokeWidth="0.4"
          transform={`rotate(${a+90} ${px} ${py})`} opacity={0.9}/>;
      })}
      {[20,80,140,200,260,320].map((a,i)=>{
        const rad=a*Math.PI/180, px=24+4.5*Math.cos(rad), py=35+4.5*Math.sin(rad)*0.7;
        return <ellipse key={i} cx={px} cy={py} rx={2.8} ry={1.8}
          fill="#c9a227" transform={`rotate(${a+90} ${px} ${py})`} opacity={0.85}/>;
      })}
      <circle cx={24} cy={35} r={2} fill="#8B6914" />
      {/* mini orchid */}
      {[{a:-55,rx:4.2,ry:2.2},{a:-125,rx:4.2,ry:2.2},{a:0,rx:4.4,ry:2},{a:180,rx:4.4,ry:2},{a:90,rx:3,ry:1.8}].map((p,i)=>{
        const rad=p.a*Math.PI/180, px=36+6*Math.cos(rad), py=50+6*Math.sin(rad)*0.72;
        return <ellipse key={i} cx={px} cy={py} rx={p.rx} ry={p.ry}
          fill="#ffffff" stroke="rgba(201,162,39,0.22)" strokeWidth="0.35"
          transform={`rotate(${p.a} ${px} ${py})`} opacity={0.88}/>;
      })}
      <ellipse cx={36} cy={50} rx={1.6} ry={1.9} fill="#d4a830" />
      {/* gold berry */}
      <circle cx={18} cy={46} r={2.2} fill="#c9a227" opacity={0.58} />
      <circle cx={28} cy={28} r={1.6} fill="#e8c97a" opacity={0.5} />
    </svg>
  );
}

// ─── Section divider with SVG flowers ────────────────────────────────────────
function FloralDivider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:0, width:"100%", maxWidth:680, margin:"0 auto 2.8rem" }}>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,#c9a227 50%)" , opacity:0.45 }} />
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"0 14px" }}>
        <SvgDaisy size={20} />
        <motion.div animate={{ rotate:[0,360] }} transition={{ duration:14, repeat:Infinity, ease:"linear" }}>
          <SvgRose size={32} white />
        </motion.div>
        <SvgDaisy size={20} />
      </div>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#c9a227 50%,transparent)", opacity:0.45 }} />
    </div>
  );
}

// ─── Monogram between cards ───────────────────────────────────────────────────
function MonogramDivider({ monogram }: { monogram: string }) {
  return (
    <motion.div
      style={{
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"1.8rem 0 1.6rem", position:"relative", width:"100%",
      }}
      initial={{ opacity:0, scale:0.92 }}
      whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true }}
      transition={{ duration:0.8, delay:0.2 }}
    >
      {/* side leaves */}
      <div style={{ position:"absolute", left:"5%", top:"50%", transform:"translateY(-50%)" }}>
        <SvgLeaf size={22} angle={-15} />
      </div>
      <div style={{ position:"absolute", right:"5%", top:"50%", transform:"translateY(-50%) scaleX(-1)" }}>
        <SvgLeaf size={22} angle={-15} />
      </div>

      {/* thin gold lines */}
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10, width:"100%", maxWidth:380 }}>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,rgba(201,162,39,0.4))" }} />
        <SvgDaisy size={16} />
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(201,162,39,0.4),transparent)" }} />
      </div>

      {/* monogram + flowers row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
        <SvgOrchid size={36} white />
        <motion.span
          style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontStyle:"italic", fontWeight:300,
            fontSize:"clamp(3.2rem,9vw,5.2rem)",
            color:"rgba(201,162,39,0.22)",
            letterSpacing:"0.04em", lineHeight:1,
            userSelect:"none",
          }}
          animate={{ opacity:[0.18,0.28,0.18] }}
          transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
        >
          {monogram}
        </motion.span>
        <SvgOrchid size={36} white />
      </div>

      {/* bottom row */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:10 }}>
        <SvgDaisy size={14} />
        <motion.div animate={{ rotate:[0,-360] }} transition={{ duration:16, repeat:Infinity, ease:"linear" }}>
          <SvgRose size={28} />
        </motion.div>
        <SvgDaisy size={14} />
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:14, marginTop:10, width:"100%", maxWidth:380 }}>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,rgba(201,162,39,0.4))" }} />
        <SvgDaisy size={16} />
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(201,162,39,0.4),transparent)" }} />
      </div>
    </motion.div>
  );
}

// ─── Background scattered SVG flowers ────────────────────────────────────────
function BgFlower({ x, y, size, type, opacity }: {
  x: string; y: string; size: number; type: "rose"|"orchid"|"daisy"; opacity: number;
}) {
  return (
    <div style={{
      position:"absolute", left:x, top:y,
      opacity, pointerEvents:"none", zIndex:0,
      transform:"rotate(-15deg)",
    }}>
      {type==="rose" && <SvgRose size={size} white />}
      {type==="orchid" && <SvgOrchid size={size} white />}
      {type==="daisy" && <SvgDaisy size={size} />}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const families = [
  {
    side: "BRIDE'S FAMILY",
    person1: "Mrs. Sindhu Suresh",
    person2: "& Mr. G. Suresh",
    location: "Asset Orchestra, Kazhakoottam\nThiruvananthapuram",
    white: true,
  },
  {
    side: "GROOM'S FAMILY",
    person1: "Mrs. Sudha Das",
    person2: "& Mr. B. Kannadas",
    location: "T Nagar, Chennai",
    white: false,
  },
];

const monogram = "M & S";

// ─── Main component ───────────────────────────────────────────────────────────
export default function OurFamiliesSection() {
  return (
    <section
      id="families"
      style={{
        background: "linear-gradient(160deg, #fdfaf4 0%, #f8f0e3 50%, #fdfaf4 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(3rem,7vw,5rem) clamp(1rem,4vw,1.5rem) clamp(3.5rem,8vw,5.5rem)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@400;500&display=swap');
      `}</style>

      {/* ── Scattered BG flowers ── */}
      <BgFlower x="3%"  y="8%"  size={48} type="rose"   opacity={0.08} />
      <BgFlower x="88%" y="5%"  size={40} type="orchid" opacity={0.07} />
      <BgFlower x="92%" y="42%" size={36} type="rose"   opacity={0.07} />
      <BgFlower x="2%"  y="55%" size={44} type="orchid" opacity={0.07} />
      <BgFlower x="5%"  y="85%" size={36} type="daisy"  opacity={0.09} />
      <BgFlower x="90%" y="82%" size={42} type="rose"   opacity={0.08} />

      {/* ── Title ── */}
      <motion.h2
        style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontStyle:"italic", fontWeight:300,
          fontSize:"clamp(2.2rem,6vw,3.4rem)",
          color:"#3a2e1e",
          letterSpacing:"0.02em",
          margin:"0 0 0.6rem",
          textAlign:"center",
          position:"relative", zIndex:1,
        }}
        initial={{ opacity:0, y:-20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.8 }}
      >
        Our Families
      </motion.h2>

      {/* title underline flourish */}
      <motion.div
        style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          gap:10, marginBottom:"2.6rem", width:"100%", maxWidth:320,
        }}
        initial={{ opacity:0, scaleX:0 }}
        whileInView={{ opacity:1, scaleX:1 }}
        viewport={{ once:true }}
        transition={{ duration:0.9, delay:0.15 }}
      >
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,#c9a227)", opacity:0.5 }} />
        <SvgRose size={28} />
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#c9a227,transparent)", opacity:0.5 }} />
      </motion.div>

      {/* ── Top full divider ── */}
      <FloralDivider />

      {/* ── Cards ── */}
      {families.map((fam, i) => (
        <motion.div
          key={fam.side}
          style={{ width:"100%", maxWidth:680, position:"relative", zIndex:1 }}
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.75, delay:i*0.18 }}
        >
          {/* ── Family Card ── */}
          <div
            style={{
              background:"rgba(255,255,255,0.82)",
              backdropFilter:"blur(12px)",
              WebkitBackdropFilter:"blur(12px)",
              border:"1px solid rgba(201,162,39,0.28)",
              borderRadius:4,
              width:"100%",
              padding:"clamp(2rem,5vw,2.8rem) clamp(1.5rem,5vw,2.5rem)",
              textAlign:"center",
              position:"relative",
              overflow:"hidden",
              boxShadow:"0 4px 32px rgba(201,162,39,0.07), 0 1px 8px rgba(201,162,39,0.06)",
            }}
          >
            {/* Card corner florals */}
            <CardCornerFloral flip={false} />
            <CardCornerFloral flip={true} />

            {/* top gold accent line */}
            <div style={{
              position:"absolute", top:0, left:"15%", right:"15%",
              height:2,
              background:"linear-gradient(90deg,transparent,rgba(201,162,39,0.55),transparent)",
              borderRadius:2,
            }} />

            {/* Hero flower cluster */}
            <motion.div
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:"1.4rem" }}
              initial={{ scale:0, opacity:0 }}
              whileInView={{ scale:1, opacity:1 }}
              viewport={{ once:true }}
              transition={{ duration:0.7, delay:0.2 + i*0.15, type:"spring", stiffness:140 }}
            >
              <SvgOrchid size={32} white />
              <SvgRose size={fam.white ? 52 : 48} white={fam.white} />
              <SvgOrchid size={32} white />
            </motion.div>

            {/* Side label */}
            <motion.span
              style={{
                fontFamily:"'Cinzel',serif",
                fontSize:"clamp(0.6rem,1.8vw,0.68rem)",
                letterSpacing:"0.38em",
                color:"#c9a227",
                marginBottom:"1.3rem",
                display:"block",
              }}
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true }}
              transition={{ delay:0.35 + i*0.15, duration:0.6 }}
            >
              {fam.side}
            </motion.span>

            {/* Thin gold rule */}
            <div style={{
              width:60, height:1, margin:"0 auto 1.2rem",
              background:"linear-gradient(90deg,transparent,#c9a227,transparent)",
              opacity:0.5,
            }} />

            <motion.p
              style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(1.35rem,4vw,1.9rem)",
                fontWeight:500,
                color:"#2a2018",
                margin:"0 0 0.3rem",
                letterSpacing:"0.01em",
              }}
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:0.4 + i*0.15, duration:0.6 }}
            >
              {fam.person1}
            </motion.p>

            <motion.p
              style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(1.25rem,3.5vw,1.78rem)",
                fontWeight:400,
                color:"#2a2018",
                margin:"0 0 1.1rem",
                letterSpacing:"0.01em",
              }}
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:0.48 + i*0.15, duration:0.6 }}
            >
              {fam.person2}
            </motion.p>

            {/* location divider */}
            <div style={{ display:"flex", alignItems:"center", gap:8, margin:"0 auto 0.9rem", width:"fit-content" }}>
              <div style={{ width:28, height:1, background:"linear-gradient(90deg,transparent,rgba(201,162,39,0.45))" }} />
              <SvgDaisy size={14} />
              <div style={{ width:28, height:1, background:"linear-gradient(90deg,rgba(201,162,39,0.45),transparent)" }} />
            </div>

            <motion.p
              style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontStyle:"italic",
                fontSize:"clamp(0.88rem,2.5vw,1rem)",
                color:"#8a7a5a",
                lineHeight:1.65,
                whiteSpace:"pre-line",
                margin:0,
              }}
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true }}
              transition={{ delay:0.55 + i*0.15, duration:0.6 }}
            >
              {fam.location}
            </motion.p>

            {/* bottom gold accent line */}
            <div style={{
              position:"absolute", bottom:0, left:"15%", right:"15%",
              height:2,
              background:"linear-gradient(90deg,transparent,rgba(201,162,39,0.55),transparent)",
              borderRadius:2,
            }} />
          </div>

          {/* ── Monogram between cards ── */}
          {i === 0 && <MonogramDivider monogram={monogram} />}
        </motion.div>
      ))}

      {/* ── Bottom floral divider ── */}
      <motion.div
        style={{ width:"100%", maxWidth:680, marginTop:"2.5rem", position:"relative", zIndex:1 }}
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        transition={{ duration:0.8, delay:0.2 }}
      >
        <FloralDivider />
      </motion.div>
    </section>
  );
}