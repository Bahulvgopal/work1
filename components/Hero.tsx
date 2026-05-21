"use client";

import { useEffect, useRef, useState } from "react";

const PETAL_DEFS = [
  { w: 18, h: 22, path: "M9 1 C14 4,17 11,9 21 C1 11,4 4,9 1Z",   fill: "#c9a227", op: 0.75 },
  { w: 12, h: 26, path: "M6 0 Q12 8 6 26 Q0 8 6 0Z",              fill: "#e8c030", op: 0.60 },
  { w: 16, h: 16, path: "M8 0 L16 8 L8 16 L0 8Z",                 fill: "#d4a820", op: 0.52 },
  { w: 14, h: 14, path: "M7 0L8.5 5 13 5 9.5 7.8 11 13 7 9.8 3 13 4.5 7.8 1 5 5.5 5Z", fill: "#c9a227", op: 0.65 },
  { w: 10, h: 24, path: "M5 0 C9 6 9 18 5 24 C1 18 1 6 5 0Z",     fill: "#b8860b", op: 0.58 },
  { w: 20, h: 14, path: "M0 7 C5 0 15 0 20 7 C15 14 5 14 0 7Z",   fill: "#c9a227", op: 0.48 },
];

type Petal = { id: number; left: number; size: number; dur: number; delay: number; def: typeof PETAL_DEFS[0] };

function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const spawn = () => {
      const id = counterRef.current++;
      setPetals(prev => [
        ...prev.slice(-35),
        { id, left: Math.random() * 100, size: 0.65 + Math.random() * 0.85, dur: 8 + Math.random() * 10, delay: Math.random() * 2, def: PETAL_DEFS[id % PETAL_DEFS.length] },
      ]);
    };
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 20; i++) timers.push(setTimeout(spawn, i * 280));
    const interval = setInterval(spawn, 850);
    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, []);

  return (
    <>
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute", top: "-32px", left: `${p.left}%`,
            transform: `scale(${p.size})`, pointerEvents: "none",
            opacity: 0, animation: `petalDrift ${p.dur}s ${p.delay}s linear infinite`,
          }}
        >
          <svg width={p.def.w} height={p.def.h} viewBox={`0 0 ${p.def.w} ${p.def.h}`} fill="none">
            <path d={p.def.path} fill={p.def.fill} opacity={p.def.op} />
          </svg>
        </div>
      ))}
    </>
  );
}

const CornerSVG = () => (
  <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <path d="M6 6 L32 6 M6 6 L6 32" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 6 C22 22, 42 14, 52 52" stroke="#c9a227" strokeWidth="0.7" strokeDasharray="3 4" opacity="0.5" fill="none" />
    <circle cx="6" cy="6" r="2.5" fill="#c9a227" opacity="0.75" />
    <circle cx="32" cy="6" r="1.2" fill="#c9a227" opacity="0.42" />
    <circle cx="6" cy="32" r="1.2" fill="#c9a227" opacity="0.42" />
  </svg>
);

const StarIcon = ({ size = 16, opacity = 0.85 }: { size?: number; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 1 L11.6 7.8 L18 10 L11.6 12.2 L10 19 L8.4 12.2 L2 10 L8.4 7.8 Z" fill="#c9a227" opacity={opacity} />
  </svg>
);

export default function Hero() {
  return (
    <section
      style={{
        position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", padding: "70px 16px",
        background: "linear-gradient(160deg, #fffef7 0%, #fdf8e8 45%, #fff9f0 75%, #fffef7 100%)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');

        @keyframes petalDrift {
          0%   { opacity:0; transform:translateY(-40px) rotate(0deg) translateX(0px); }
          8%   { opacity:0.9; }
          50%  { transform:translateY(50vh) rotate(280deg) translateX(30px); }
          85%  { opacity:0.7; }
          100% { opacity:0; transform:translateY(115vh) rotate(540deg) translateX(-20px); }
        }
        @keyframes shimmerStar {
          0%,100%{opacity:0.45;} 50%{opacity:0.95;}
        }
        @keyframes fadeSlideUp {
          from{opacity:0;transform:translateY(32px);} to{opacity:1;transform:translateY(0);}
        }
        @keyframes scaleIn {
          from{transform:scaleX(0);} to{transform:scaleX(1);}
        }
        @keyframes rotateFloat {
          0%,100%{transform:rotate(-6deg) translateY(0px);} 50%{transform:rotate(6deg) translateY(-8px);}
        }
        @keyframes pulseGlow {
          0%,100%{box-shadow:0 8px 60px rgba(201,162,39,0.10),0 2px 12px rgba(201,162,39,0.08),inset 0 1px 0 rgba(255,255,255,0.9);}
          50%{box-shadow:0 8px 60px rgba(201,162,39,0.10),0 2px 12px rgba(201,162,39,0.08),inset 0 1px 0 rgba(255,255,255,0.9), 0 0 36px 8px rgba(201,162,39,0.18);}
        }

        .hero-glass {
          position:relative; max-width:680px; width:100%; text-align:center;
          padding:52px 56px 48px;
          background:rgba(255,253,242,0.78);
          backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
          border:1px solid rgba(201,162,39,0.24); border-radius:4px;
          animation:fadeSlideUp 1s ease both, pulseGlow 5s 1.5s ease-in-out infinite;
          z-index:5;
          
        }
        .hero-glass::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,#c9a227 30%,#f0d060 50%,#c9a227 70%,transparent);
          border-radius:4px 4px 0 0;
        }
        .hero-glass::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(201,162,39,0.35),transparent);
        }
        .hero-eyebrow {
          font-family:'Raleway',sans-serif; font-size:0.62rem; letter-spacing:0.3em;
          color:#b8922a; text-transform:uppercase; margin-bottom:18px;
          animation:fadeSlideUp 0.9s 0.2s ease both;
        }
        .hero-names {
          font-family:'Cinzel',serif; font-size:clamp(2.6rem,8vw,4.8rem);
          font-weight:400; color:#1a1208; line-height:1.05; letter-spacing:0.04em;
          animation:fadeSlideUp 1s 0.35s ease both;
        }
        .hero-amp {
          background:linear-gradient(135deg,#c9a227 0%,#f0d060 40%,#c9a227 65%,#9a7010 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          font-size:1.1em; display:inline-block; animation:rotateFloat 5s ease-in-out infinite;
        }
        .hero-divider {
          height:1px; width:140px; margin:24px auto;
          background:linear-gradient(90deg,transparent,#c9a227,transparent);
          animation:scaleIn 0.9s 0.7s ease both; transform-origin:center;
        }
        .hero-tagline {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(1rem,2.2vw,1.15rem); color:#5a4a2a; line-height:1.85;
          animation:fadeSlideUp 0.9s 0.9s ease both;
        }
        .hero-date {
          display:inline-block; margin-top:22px; padding:9px 28px;
          background:transparent; border:1px solid rgba(201,162,39,0.45); border-radius:2px;
          font-family:'Raleway',sans-serif; font-size:0.72rem; letter-spacing:0.22em;
          color:#b8922a; text-transform:uppercase; animation:fadeSlideUp 0.9s 1.05s ease both;
        }
        .hero-cta {
          display:inline-block; margin-top:22px; padding:15px 46px; cursor:pointer;
          font-family:'Cinzel',serif; font-size:0.76rem; letter-spacing:0.22em;
          color:#fff; border:none; border-radius:2px;
          background:linear-gradient(135deg,#c9a227 0%,#e8c547 50%,#b8860b 100%);
          box-shadow:0 4px 22px rgba(201,162,39,0.38);
          transition:transform 0.25s ease,box-shadow 0.25s ease;
          animation:fadeSlideUp 0.9s 1.2s ease both; position:relative; overflow:hidden;
        }
        .hero-cta::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.22) 0%,transparent 55%);
        }
        .hero-cta:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(201,162,39,0.52);}
        .hero-cta:active{transform:translateY(0);}

        .sparkle-star { position:absolute; animation:shimmerStar ease-in-out infinite; pointer-events:none; }

        @media(max-width:560px){
          .hero-glass{padding:36px 20px 32px;}
          .hero-corner{width:44px!important;height:44px!important;}
        }
      `}</style>

      <FloatingPetals />

      {/* Ambient glows */}
      <div style={{ position:"absolute", left:"-60px", top:"15%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,162,39,0.13) 0%,transparent 70%)", filter:"blur(36px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:"-60px", bottom:"10%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,162,39,0.10) 0%,transparent 70%)", filter:"blur(36px)", pointerEvents:"none" }} />

      {/* Sparkle stars */}
      {[{top:"12%",left:"8%",s:10,d:2.1},{top:"22%",right:"10%",s:8,d:2.8},{top:"72%",left:"5%",s:7,d:1.9},{top:"60%",right:"7%",s:10,d:3.2}].map((sp, i) => (
        <div key={i} className="sparkle-star " style={{ top:sp.top, left:(sp as any).left, right:(sp as any).right, animationDuration:`${sp.d}s`, animationDelay:`${i*0.4}s` }}>
          <StarIcon size={sp.s} opacity={0.7} />
        </div>
      ))}

      {/* Corner ornaments */}
      {[
        { style: { top:18, left:18 } },
        { style: { top:18, right:18 }, flip: "scaleX(-1)" },
        { style: { bottom:18, left:18 }, flip: "scaleY(-1)" },
        { style: { bottom:18, right:18 }, flip: "scale(-1,-1)" },
      ].map((c, i) => (
        <div key={i} className="hero-corner" style={{ position:"absolute", width:68, height:68, opacity:0.35, transform:c.flip, ...(c.style as React.CSSProperties) }}>
          <CornerSVG />
        </div>
      ))}

      {/* Glass card */}
      <div className="hero-glass -pt-[3rem]">

        {/* Top ornament */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:20, animation:"fadeSlideUp 0.9s 0.1s ease both" }}>
          <div style={{ height:1, width:54, background:"linear-gradient(90deg,transparent,#c9a227)" }} />
          <StarIcon size={16} /><StarIcon size={9} opacity={0.45} /><StarIcon size={16} />
          <div style={{ height:1, width:54, background:"linear-gradient(90deg,#c9a227,transparent)" }} />
        </div>

        <p className="hero-eyebrow">Together With Their Families</p>

        <h1 className="hero-names">
          Meghana <span className="hero-amp">&amp;</span> Srivats
        </h1>

        <div className="hero-divider" />

        <div style={{ display:"flex", justifyContent:"center", gap:7, marginTop:-10, marginBottom:14 }}>
          {[false, true, false].map((big, i) => (
            <div key={i} style={{ width: big?6:4, height: big?6:4, borderRadius:"50%", background:"#c9a227", opacity: big?0.9:0.42, alignSelf:"center" }} />
          ))}
        </div>

        <p className="hero-tagline">
          Request the honour of your presence as we celebrate<br />
          the beginning of our forever together.
        </p>

        <div><div className="hero-date">02 · July · 2026</div></div>
        {/* <div><button className="hero-cta">Save The Date</button></div> */}

        {/* Bottom ornament */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginTop:30, animation:"fadeSlideUp 0.9s 1.35s ease both" }}>
          <div style={{ height:1, width:44, background:"linear-gradient(90deg,transparent,rgba(201,162,39,0.55))" }} />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2,16 8,12 12C8 8,12 2,12 2Z" fill="#c9a227" opacity="0.55"/>
            <path d="M12 12C12 12,16 16,12 22C8 16,12 12,12 12Z" fill="#c9a227" opacity="0.55"/>
            <path d="M2 12C2 12,8 8,12 12C8 16,2 12,2 12Z" fill="#c9a227" opacity="0.38"/>
            <path d="M12 12C12 12,18 8,22 12C18 16,12 12,12 12Z" fill="#c9a227" opacity="0.38"/>
          </svg>
          <div style={{ height:1, width:44, background:"linear-gradient(90deg,rgba(201,162,39,0.55),transparent)" }} />
        </div>
      </div>
    </section>
  );
}