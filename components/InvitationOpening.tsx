"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
};

// ─── SVG Golden Feather ───────────────────────────────────────────────────────
function GoldenFeather({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size * 2.6} viewBox="0 0 26 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fgMain" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9eebc" />
          <stop offset="45%" stopColor="#d4a830" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      <line x1="13" y1="66" x2="13" y2="3" stroke="url(#fgMain)" strokeWidth="1.1" strokeLinecap="round" />
      {[9,15,21,28,36,44,52,59].map((y,i) => (
        <g key={i}>
          <path d={`M13 ${y} Q${5-i*0.4} ${y-4} ${1+i*0.2} ${y-9}`} stroke="url(#fgMain)" strokeWidth="0.85" strokeLinecap="round" fill="none" opacity={0.5+i*0.05}/>
          <path d={`M13 ${y} Q${21+i*0.4} ${y-4} ${25-i*0.2} ${y-9}`} stroke="url(#fgMain)" strokeWidth="0.85" strokeLinecap="round" fill="none" opacity={0.5+i*0.05}/>
        </g>
      ))}
      <circle cx="13" cy="3" r="1.6" fill="#f9eebc" opacity="0.9"/>
    </svg>
  );
}

// ─── SVG Gold Petal (teardrop) ────────────────────────────────────────────────
function GoldenPetal({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size*1.7} viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pgMain" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#f9eebc" stopOpacity="0.95"/>
          <stop offset="55%" stopColor="#c9a227" stopOpacity="0.88"/>
          <stop offset="100%" stopColor="#8B6914" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
      <path d="M9 1 C15 7,17 17,9 30 C1 17,3 7,9 1Z" fill="url(#pgMain)" opacity="0.78"/>
      <line x1="9" y1="4" x2="9" y2="27" stroke="#f9eebc" strokeWidth="0.5" opacity="0.45"/>
      <path d="M9 10 Q13 16 9 24" stroke="#f9eebc" strokeWidth="0.4" fill="none" opacity="0.3"/>
      <path d="M9 10 Q5 16 9 24" stroke="#f9eebc" strokeWidth="0.4" fill="none" opacity="0.3"/>
    </svg>
  );
}

// ─── Floating particle ────────────────────────────────────────────────────────
function FloatingParticle({ type, delay, duration, left, size }: {
  type: "feather" | "petal"; delay: number; duration: number; left: string; size: number;
}) {
  return (
    <motion.div
      style={{ position:"absolute", top:-70, left, pointerEvents:"none" }}
      animate={{
        y:["0px","112vh"],
        opacity:[0, 0.9, 0.75, 0],
        rotate: type==="feather" ? [-12,8,-6,14] : [0,110,230,360],
        x:[0,16,-10,20,-6],
      }}
      transition={{ delay, duration, repeat:Infinity, ease:"linear", times:[0,0.12,0.88,1] }}
    >
      {type==="feather" ? <GoldenFeather size={size}/> : <GoldenPetal size={size}/>}
    </motion.div>
  );
}

// ─── 3D-style Rose (like reference) ──────────────────────────────────────────
function Rose({ cx, cy, r, delay, white=false }: { cx:number; cy:number; r:number; delay:number; white?:boolean }) {
  const fill1 = white ? "#ffffff" : "#f5e6a0";
  const fill2 = white ? "#f0f0f0" : "#c9a227";
  const fill3 = white ? "#e0e0e0" : "#8B6914";
  const stroke = white ? "rgba(201,162,39,0.3)" : "rgba(201,162,39,0.6)";

  // Spiral rose petals - outer ring
  const outerPetals = [0,40,80,120,160,200,240,280,320];
  // Middle ring
  const midPetals   = [20,65,110,155,200,245,290,335];
  // Inner ring
  const innerPetals = [0,60,120,180,240,300];

  return (
    <g>
      {/* shadow/depth base */}
      <motion.ellipse cx={cx} cy={cy+2} rx={r*0.9} ry={r*0.3}
        fill="rgba(139,105,20,0.12)"
        initial={{scale:0}} animate={{scale:1}}
        transition={{delay, duration:0.4}}
        style={{transformOrigin:`${cx}px ${cy+2}px`}}
      />
      {/* outer petals */}
      {outerPetals.map((angle,i) => {
        const rad = angle*Math.PI/180;
        const px = cx + r*0.78*Math.cos(rad);
        const py = cy + r*0.78*Math.sin(rad)*0.6;
        return (
          <motion.ellipse key={`or${i}`}
            cx={px} cy={py} rx={r*0.46} ry={r*0.32}
            fill={fill1}
            stroke={stroke} strokeWidth="0.4"
            transform={`rotate(${angle+90} ${px} ${py})`}
            opacity={0.92}
            initial={{scale:0,opacity:0}} animate={{scale:1,opacity:0.92}}
            transition={{delay:delay+i*0.03, duration:0.55, ease:"backOut"}}
            style={{transformOrigin:`${px}px ${py}px`}}
          />
        );
      })}
      {/* mid petals */}
      {midPetals.map((angle,i) => {
        const rad = angle*Math.PI/180;
        const px = cx + r*0.44*Math.cos(rad);
        const py = cy + r*0.44*Math.sin(rad)*0.65;
        return (
          <motion.ellipse key={`mr${i}`}
            cx={px} cy={py} rx={r*0.34} ry={r*0.22}
            fill={fill2}
            stroke={stroke} strokeWidth="0.35"
            transform={`rotate(${angle+90} ${px} ${py})`}
            opacity={0.9}
            initial={{scale:0,opacity:0}} animate={{scale:1,opacity:0.9}}
            transition={{delay:delay+0.28+i*0.03, duration:0.5, ease:"backOut"}}
            style={{transformOrigin:`${px}px ${py}px`}}
          />
        );
      })}
      {/* inner petals */}
      {innerPetals.map((angle,i) => {
        const rad = angle*Math.PI/180;
        const px = cx + r*0.2*Math.cos(rad);
        const py = cy + r*0.2*Math.sin(rad)*0.7;
        return (
          <motion.ellipse key={`ir${i}`}
            cx={px} cy={py} rx={r*0.2} ry={r*0.13}
            fill={i%2===0?fill2:fill3}
            transform={`rotate(${angle+90} ${px} ${py})`}
            opacity={0.88}
            initial={{scale:0,opacity:0}} animate={{scale:1,opacity:0.88}}
            transition={{delay:delay+0.5+i*0.025, duration:0.4, ease:"backOut"}}
            style={{transformOrigin:`${px}px ${py}px`}}
          />
        );
      })}
      {/* center spiral */}
      <motion.circle cx={cx} cy={cy} r={r*0.13} fill={fill3}
        initial={{scale:0}} animate={{scale:1}}
        transition={{delay:delay+0.7, duration:0.35, ease:"backOut"}}
        style={{transformOrigin:`${cx}px ${cy}px`}}
      />
    </g>
  );
}

// ─── Orchid flower (like reference) ──────────────────────────────────────────
function Orchid({ cx, cy, r, delay, white=false }: { cx:number; cy:number; r:number; delay:number; white?:boolean }) {
  const fillMain = white ? "#ffffff" : "#f5e6a0";
  const fillAccent = white ? "#f0ece0" : "#d4a830";
  // 5 petals: 2 large top, 2 side, 1 bottom lip
  const petalDefs = [
    { angle:-60, rx:r*0.5, ry:r*0.28 },
    { angle:-120, rx:r*0.5, ry:r*0.28 },
    { angle:0,   rx:r*0.52, ry:r*0.26 },
    { angle:180, rx:r*0.52, ry:r*0.26 },
    { angle:90,  rx:r*0.38, ry:r*0.22 },
  ];
  return (
    <g>
      {petalDefs.map((p,i) => {
        const rad = p.angle*Math.PI/180;
        const px = cx + r*0.55*Math.cos(rad);
        const py = cy + r*0.55*Math.sin(rad)*0.7;
        return (
          <motion.ellipse key={i}
            cx={px} cy={py} rx={p.rx} ry={p.ry}
            fill={fillMain}
            stroke="rgba(201,162,39,0.25)" strokeWidth="0.4"
            transform={`rotate(${p.angle} ${px} ${py})`}
            opacity={0.9}
            initial={{scale:0,opacity:0}} animate={{scale:1,opacity:0.9}}
            transition={{delay:delay+i*0.06, duration:0.6, ease:"backOut"}}
            style={{transformOrigin:`${px}px ${py}px`}}
          />
        );
      })}
      {/* center column */}
      <motion.ellipse cx={cx} cy={cy} rx={r*0.18} ry={r*0.22}
        fill={fillAccent}
        initial={{scale:0}} animate={{scale:1}}
        transition={{delay:delay+0.4, duration:0.4, ease:"backOut"}}
        style={{transformOrigin:`${cx}px ${cy}px`}}
      />
      <motion.circle cx={cx} cy={cy-r*0.06} r={r*0.07} fill="#c9a227"
        initial={{scale:0}} animate={{scale:1}}
        transition={{delay:delay+0.52, duration:0.3}}
        style={{transformOrigin:`${cx}px ${cy-r*0.06}px`}}
      />
    </g>
  );
}

// ─── Small daisy / filler blossom ────────────────────────────────────────────
function SmallBlossom({ cx, cy, r, delay }: { cx:number; cy:number; r:number; delay:number }) {
  return (
    <g>
      {[0,45,90,135,180,225,270,315].map((a,i) => {
        const rad = a*Math.PI/180;
        const px = cx + r*0.7*Math.cos(rad);
        const py = cy + r*0.7*Math.sin(rad)*0.75;
        return (
          <motion.ellipse key={i}
            cx={px} cy={py} rx={r*0.4} ry={r*0.22}
            fill="#ffffff"
            stroke="rgba(201,162,39,0.2)" strokeWidth="0.3"
            transform={`rotate(${a} ${px} ${py})`}
            opacity={0.88}
            initial={{scale:0,opacity:0}} animate={{scale:1,opacity:0.88}}
            transition={{delay:delay+i*0.025, duration:0.45, ease:"backOut"}}
            style={{transformOrigin:`${px}px ${py}px`}}
          />
        );
      })}
      <motion.circle cx={cx} cy={cy} r={r*0.22} fill="#d4a830"
        initial={{scale:0}} animate={{scale:1}}
        transition={{delay:delay+0.3, duration:0.3, ease:"backOut"}}
        style={{transformOrigin:`${cx}px ${cy}px`}}
      />
    </g>
  );
}

// ─── Gold filigree leaf ───────────────────────────────────────────────────────
function FiligreeLeaf({ x, y, angle, size, delay }: {
  x:number; y:number; angle:number; size:number; delay:number;
}) {
  const s = size;
  return (
    <motion.g transform={`rotate(${angle} ${x} ${y})`}
      initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
      transition={{delay, duration:0.7, ease:"backOut"}}
      style={{transformOrigin:`${x}px ${y}px`}}
    >
      {/* main leaf shape */}
      <path
        d={`M${x} ${y} Q${x+s*0.8} ${y-s*0.4} ${x+s*1.6} ${y} Q${x+s*0.8} ${y+s*0.4} ${x} ${y}Z`}
        fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.75"
      />
      <path
        d={`M${x} ${y} Q${x+s*0.8} ${y-s*0.35} ${x+s*1.6} ${y}`}
        fill="rgba(201,162,39,0.18)" stroke="none"
      />
      {/* midrib */}
      <line x1={x} y1={y} x2={x+s*1.6} y2={y} stroke="#c9a227" strokeWidth="0.6" opacity="0.65"/>
      {/* veins */}
      {[0.3,0.55,0.8,1.05,1.3].map((t,i) => (
        <g key={i}>
          <line x1={x+s*t} y1={y} x2={x+s*t-s*0.12} y2={y-s*0.28} stroke="#c9a227" strokeWidth="0.4" opacity="0.5"/>
          <line x1={x+s*t} y1={y} x2={x+s*t-s*0.12} y2={y+s*0.28} stroke="#c9a227" strokeWidth="0.4" opacity="0.5"/>
        </g>
      ))}
      {/* tip curl */}
      <circle cx={x+s*1.6} cy={y} r={s*0.08} fill="#c9a227" opacity="0.6"/>
    </motion.g>
  );
}

// ─── Gold filigree curl / scroll ──────────────────────────────────────────────
function FiligreeCurl({ x, y, angle, size, delay }: {
  x:number; y:number; angle:number; size:number; delay:number;
}) {
  const s = size;
  return (
    <motion.g transform={`rotate(${angle} ${x} ${y})`}
      initial={{pathLength:0,opacity:0}} animate={{opacity:0.7}}
      transition={{delay, duration:0.9}}
      style={{transformOrigin:`${x}px ${y}px`}}
    >
      <motion.path
        d={`M${x} ${y} C${x+s*0.5} ${y-s} ${x+s*1.2} ${y-s*0.8} ${x+s*1.4} ${y-s*0.2} C${x+s*1.5} ${y+s*0.3} ${x+s*1.1} ${y+s*0.5} ${x+s*0.8} ${y+s*0.3}`}
        fill="none" stroke="#c9a227" strokeWidth="0.9" strokeLinecap="round"
        initial={{pathLength:0}} animate={{pathLength:1}}
        transition={{delay, duration:1.1, ease:"easeOut"}}
      />
      <circle cx={x+s*0.8} cy={y+s*0.3} r={s*0.07} fill="#c9a227" opacity="0.8"/>
      <circle cx={x} cy={y} r={s*0.07} fill="#c9a227" opacity="0.6"/>
    </motion.g>
  );
}

// ─── Corner Flower Arrangement ────────────────────────────────────────────────
function CornerFloral({ corner }: { corner: "tl"|"tr"|"bl"|"br" }) {
  const isLeft = corner==="tl"||corner==="bl";
  const isTop  = corner==="tl"||corner==="tr";

  return (
    <motion.div
      style={{
        position:"absolute",
        width:"clamp(160px,32vw,260px)",
        height:"clamp(160px,32vw,260px)",
        pointerEvents:"none", zIndex:3,
        ...(isLeft?{left:0}:{right:0}),
        ...(isTop?{top:0}:{bottom:0}),
        transform:`scaleX(${isLeft?1:-1}) scaleY(${isTop?1:-1})`,
      }}
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:1.2}}
    >
      <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id={`sg_${corner}`} x1="0" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#8B6914" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0.55"/>
          </linearGradient>
        </defs>

        {/* ── Stems ── */}
        {[
          "M0 260 Q30 200 55 155 Q75 115 95 85",
          "M0 260 Q50 210 85 175 Q115 145 148 118",
          "M0 260 Q70 225 110 200 Q148 178 182 155",
          "M0 260 Q20 220 38 195 Q55 172 68 148",
          "M0 260 Q95 245 135 230 Q175 215 208 192",
          "M0 260 Q15 240 25 220 Q38 198 50 178",
        ].map((d,i)=>(
          <motion.path key={i} d={d}
            stroke={`url(#sg_${corner})`} strokeWidth={1.4-i*0.1}
            fill="none" strokeLinecap="round"
            initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:1}}
            transition={{delay:0.05+i*0.12, duration:1.2, ease:"easeOut"}}
          />
        ))}

        {/* ── Gold filigree leaves ── */}
        <FiligreeLeaf x={28}  y={212} angle={-50}  size={18} delay={0.5}/>
        <FiligreeLeaf x={52}  y={178} angle={-65}  size={16} delay={0.65}/>
        <FiligreeLeaf x={72}  y={145} angle={-75}  size={15} delay={0.55}/>
        <FiligreeLeaf x={100} y={162} angle={20}   size={14} delay={0.7}/>
        <FiligreeLeaf x={120} y={140} angle={-40}  size={13} delay={0.8}/>
        <FiligreeLeaf x={155} y={130} angle={10}   size={14} delay={0.72}/>
        <FiligreeLeaf x={178} y={165} angle={30}   size={13} delay={0.9}/>
        <FiligreeLeaf x={200} y={200} angle={18}   size={14} delay={0.85}/>
        <FiligreeLeaf x={42}  y={195} angle={-30}  size={12} delay={0.6}/>

        {/* ── Filigree curls / scrollwork ── */}
        <FiligreeCurl x={60}  y={135} angle={-55} size={18} delay={0.9}/>
        <FiligreeCurl x={105} y={118} angle={-25} size={15} delay={1.1}/>
        <FiligreeCurl x={148} y={145} angle={15}  size={14} delay={1.0}/>
        <FiligreeCurl x={185} y={178} angle={30}  size={13} delay={1.2}/>

        {/* ── Large white Rose (hero) ── */}
        <Rose cx={88} cy={80} r={28} delay={0.8} white/>

        {/* ── Gold Rose ── */}
        <Rose cx={155} cy={112} r={20} delay={1.0}/>

        {/* ── Orchids ── */}
        <Orchid cx={52}  cy={152} r={18} delay={1.1} white/>
        <Orchid cx={186} cy={150} r={16} delay={1.25} white/>

        {/* ── Small white rose bud ── */}
        <Rose cx={30} cy={195} r={13} delay={1.3} white/>
        <Rose cx={210} cy={185} r={11} delay={1.35}/>

        {/* ── Tiny daisy blossoms (fillers) ── */}
        <SmallBlossom cx={70}  cy={115} r={10} delay={1.2}/>
        <SmallBlossom cx={128} cy={95}  r={9}  delay={1.3}/>
        <SmallBlossom cx={172} cy={132} r={9}  delay={1.35}/>
        <SmallBlossom cx={42}  cy={175} r={8}  delay={1.4}/>
        <SmallBlossom cx={205} cy={162} r={8}  delay={1.45}/>

        {/* ── Gold berry clusters ── */}
        {[[108,72],[80,52],[65,92],[175,100],[130,80]].map(([bx,by],i)=>(
          <motion.circle key={i} cx={bx} cy={by} r={3}
            fill="#c9a227" opacity={0.65}
            initial={{scale:0}} animate={{scale:1}}
            transition={{delay:1.5+i*0.08, duration:0.4, ease:"backOut"}}
            style={{transformOrigin:`${bx}px ${by}px`}}
          />
        ))}
        {[[95,58],[115,68],[138,88]].map(([bx,by],i)=>(
          <motion.circle key={i} cx={bx} cy={by} r={2}
            fill="#e8c97a" opacity={0.55}
            initial={{scale:0}} animate={{scale:1}}
            transition={{delay:1.6+i*0.07, duration:0.35}}
            style={{transformOrigin:`${bx}px ${by}px`}}
          />
        ))}

        {/* ── Subtle glow behind hero rose ── */}
        <motion.circle cx={88} cy={80} r={34}
          fill="rgba(245,230,160,0.1)"
          initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
          transition={{delay:0.7, duration:1}}
          style={{transformOrigin:"88px 80px"}}
        />
      </svg>
    </motion.div>
  );
}

// ─── Floral border ────────────────────────────────────────────────────────────
function FloralBorder({ flip=false }:{ flip?:boolean }) {
  return (
    <motion.div
      style={{width:"100%",overflow:"hidden",pointerEvents:"none",
        transform:flip?"scaleY(-1)":undefined}}
      initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4,duration:1.5}}
    >
      <svg viewBox="0 0 400 46" xmlns="http://www.w3.org/2000/svg" style={{width:"100%"}}>
        <defs>
          <linearGradient id="bdG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9a227" stopOpacity="0"/>
            <stop offset="28%" stopColor="#c9a227" stopOpacity="0.55"/>
            <stop offset="72%" stopColor="#e8c97a" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <line x1="0" y1="23" x2="400" y2="23" stroke="url(#bdG)" strokeWidth="0.8"/>
        <g opacity="0.75">
          <circle cx="200" cy="23" r="5" fill="none" stroke="#c9a227" strokeWidth="0.9"/>
          <circle cx="200" cy="23" r="2" fill="#c9a227"/>
          {[0,45,90,135,180,225,270,315].map((a,i)=>(
            <line key={i}
              x1={200+5*Math.cos(a*Math.PI/180)} y1={23+5*Math.sin(a*Math.PI/180)}
              x2={200+9*Math.cos(a*Math.PI/180)} y2={23+9*Math.sin(a*Math.PI/180)}
              stroke="#c9a227" strokeWidth="0.6"/>
          ))}
          <circle cx="187" cy="23" r="2.5" fill="none" stroke="#c9a227" strokeWidth="0.6"/>
          <circle cx="213" cy="23" r="2.5" fill="none" stroke="#c9a227" strokeWidth="0.6"/>
        </g>
        {[55,75,90].map((x,i)=>(
          <g key={i} opacity="0.5">
            <circle cx={x} cy={23-4+i} r={2.5-i*0.4} fill="none" stroke="#c9a227" strokeWidth="0.6"/>
            <circle cx={x} cy={23-4+i} r={0.9} fill="#c9a227" opacity="0.6"/>
          </g>
        ))}
        <g opacity="0.5" transform="translate(400,0) scale(-1,1)">
          {[55,75,90].map((x,i)=>(
            <g key={i}>
              <circle cx={x} cy={23-4+i} r={2.5-i*0.4} fill="none" stroke="#c9a227" strokeWidth="0.6"/>
              <circle cx={x} cy={23-4+i} r={0.9} fill="#c9a227" opacity="0.6"/>
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

// ─── Gold shimmer divider ─────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,width:"100%",maxWidth:260,margin:"16px auto"}}>
      <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#c9a227,transparent)",opacity:0.6}}/>
      <motion.span style={{color:"#c9a227",fontSize:15}}
        animate={{rotate:[0,360]}} transition={{duration:9,repeat:Infinity,ease:"linear"}}>✦</motion.span>
      <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#c9a227,transparent)",opacity:0.6}}/>
    </div>
  );
}

// ─── Particle config ──────────────────────────────────────────────────────────
const PARTICLES = [
  {type:"feather" as const, delay:0,   duration:11, left:"5%",  size:22},
  {type:"petal"   as const, delay:1.3, duration:9,  left:"14%", size:17},
  {type:"feather" as const, delay:2.7, duration:13, left:"26%", size:19},
  {type:"petal"   as const, delay:0.5, duration:10, left:"40%", size:18},
  {type:"petal"   as const, delay:3.4, duration:8,  left:"56%", size:16},
  {type:"feather" as const, delay:1.7, duration:12, left:"67%", size:23},
  {type:"petal"   as const, delay:4.1, duration:11, left:"77%", size:17},
  {type:"feather" as const, delay:0.8, duration:10, left:"87%", size:20},
  {type:"petal"   as const, delay:2.1, duration:9,  left:"94%", size:15},
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function InvitationOpening({ isOpen, onOpen }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ setMounted(true); },[]);
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          style={{
            position:"fixed",inset:0,zIndex:50,
            display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"space-between",
            overflow:"hidden",background:"#FFFDF7",
          }}
          initial={{opacity:1}}
          exit={{opacity:0,scale:0.98}}
          transition={{duration:1.2,ease:"easeInOut"}}
        >
          {/* Ambient glows */}
          <div style={{position:"absolute",top:-110,left:"50%",transform:"translateX(-50%)",
            width:400,height:400,borderRadius:"50%",pointerEvents:"none",
            background:"radial-gradient(circle,rgba(201,162,39,0.12) 0%,transparent 70%)"}}/>
          <div style={{position:"absolute",bottom:-100,right:-50,
            width:320,height:320,borderRadius:"50%",pointerEvents:"none",
            background:"radial-gradient(circle,rgba(201,162,39,0.08) 0%,transparent 70%)"}}/>

          {/* Floating feathers & gold petals */}
          <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
            {PARTICLES.map((p,i)=><FloatingParticle key={i} {...p}/>)}
          </div>

          {/* Corner floral arrangements — all 4 corners */}
          <CornerFloral corner="tl"/>
          <CornerFloral corner="tr"/>
          <CornerFloral corner="bl"/>
          <CornerFloral corner="br"/>

          {/* Top border */}
          <div style={{width:"100%",paddingTop:"clamp(52px,9vw,78px)",paddingLeft:6,paddingRight:6}}>
            <FloralBorder/>
          </div>

          {/* Main content */}
          <motion.div
            style={{
              position:"relative",zIndex:10,
              display:"flex",flexDirection:"column",alignItems:"center",
              textAlign:"center",padding:"0 24px",
              flex:1,justifyContent:"center",
              maxWidth:440,width:"100%",margin:"0 auto",
            }}
            initial={{opacity:0,y:28}}
            animate={{opacity:1,y:0}}
            transition={{duration:1.2,ease:"easeOut"}}
          >
            <motion.p
              style={{marginBottom:14,textTransform:"uppercase",
                letterSpacing:"clamp(5px,2vw,8px)",
                fontSize:"clamp(10px,2.2vw,12px)",fontWeight:500,
                color:"#c9a227",fontFamily:"'Cinzel',serif"}}
              initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
              transition={{delay:0.4,duration:0.8}}
            >Wedding Invitation</motion.p>

            {/* Initials */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",
              gap:"clamp(10px,3.5vw,22px)",marginBottom:5}}>
              <motion.span
                style={{fontSize:"clamp(66px,17vw,112px)",lineHeight:1,
                  color:"#1a1008",fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}
                initial={{opacity:0,x:-48}} animate={{opacity:1,x:0}}
                transition={{delay:0.7,duration:1,ease:"easeOut"}}>M</motion.span>

              <motion.span
                style={{fontSize:"clamp(42px,11vw,72px)",
                  background:"linear-gradient(135deg,#8B6914 0%,#c9a227 38%,#f9eebc 58%,#c9a227 78%,#8B6914 100%)",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                  backgroundClip:"text",fontFamily:"'Great Vibes',cursive",
                  lineHeight:1,display:"block"}}
                initial={{opacity:0,scale:0.4}} animate={{opacity:1,scale:1}}
                transition={{delay:0.9,duration:0.8,type:"spring",stiffness:180}}>&</motion.span>

              <motion.span
                style={{fontSize:"clamp(66px,17vw,112px)",lineHeight:1,
                  color:"#1a1008",fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}
                initial={{opacity:0,x:48}} animate={{opacity:1,x:0}}
                transition={{delay:0.7,duration:1,ease:"easeOut"}}>S</motion.span>
            </div>

            {/* Names */}
            <motion.div style={{display:"flex",alignItems:"center",gap:10,marginBottom:2}}
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1,duration:0.8}}>
              {["MEGHANA","✦","SRIVATS"].map((t,i)=>(
                <span key={i} style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize: t==="✦" ? "9px" : "clamp(9px,2.1vw,12px)",
                  letterSpacing:"3px",
                  color: t==="✦" ? "#c9a227" : "#5C4033",
                }}>{t}</span>
              ))}
            </motion.div>

            <GoldDivider/>

            <motion.div style={{marginBottom:13}}
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:0.8}}>
              {["Together with their families","invite you to celebrate love"].map((l,i)=>(
                <p key={i} style={{fontFamily:"'Cormorant Garamond',serif",
                  fontSize:"clamp(13px,3.1vw,16px)",fontStyle:"italic",
                  color:"#5C4033",letterSpacing:"0.5px",marginTop:i?4:0}}>{l}</p>
              ))}
            </motion.div>

            {/* Date badge */}
            <motion.div style={{marginBottom:26}}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
              transition={{delay:1.5,duration:0.8}}>
              <div style={{border:"1px solid rgba(201,162,39,0.4)",borderRadius:2,
                padding:"8px 22px",display:"inline-block",background:"rgba(201,162,39,0.04)"}}>
                <p style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(9px,2.1vw,11px)",
                  letterSpacing:"4px",color:"#c9a227",margin:0}}>02 · JULY · 2026</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button onClick={onOpen}
              style={{position:"relative",padding:"14px 40px",background:"transparent",
                border:"1px solid #c9a227",borderRadius:2,fontFamily:"'Cinzel',serif",
                fontSize:"clamp(10px,2.1vw,11px)",letterSpacing:"4px",color:"#8B6914",
                cursor:"pointer",textTransform:"uppercase",overflow:"hidden",minWidth:200}}
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{delay:1.7,duration:0.8}}
              whileHover={{scale:1.04,color:"#FFFDF7",backgroundColor:"#c9a227",transition:{duration:0.3}}}
              whileTap={{scale:0.97}}>
              <motion.span
                style={{position:"absolute",inset:0,pointerEvents:"none",
                  background:"linear-gradient(120deg,transparent 0%,rgba(255,255,255,0.38) 50%,transparent 100%)"}}
                animate={{x:["-100%","220%"]}}
                transition={{delay:2.5,duration:1.4,repeat:Infinity,repeatDelay:3,ease:"easeInOut"}}/>
              Open Invitation
            </motion.button>

            {/* <motion.p style={{marginTop:18,fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(11px,2.1vw,13px)",color:"rgba(92,64,51,0.42)",
              letterSpacing:"2px",fontStyle:"italic"}}
              initial={{opacity:0}}
              animate={{opacity:[0,0.52,0.26,0.52]}}
              transition={{delay:2.3,duration:3,repeat:Infinity}}>
              ↓ scroll to explore ↓
            </motion.p> */}
          </motion.div>

          {/* Bottom border */}
          <div style={{width:"100%",paddingBottom:"clamp(52px,9vw,78px)",paddingLeft:6,paddingRight:6}}>
            <FloralBorder flip/>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}