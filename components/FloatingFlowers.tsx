"use client";

import { motion } from "framer-motion";

// Each petal has its own shape variant for variety
type PetalShape = "rose" | "oval" | "teardrop" | "leaf";

interface FloralItem {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  shape: PetalShape;
  opacity: number;
  drift: number; // horizontal drift amount
}

const florals: FloralItem[] = [
  { id: 1,  left: "4%",  size: 28, duration: 20, delay: 0,    shape: "rose",     opacity: 0.55, drift: 25 },
  { id: 2,  left: "11%", size: 18, duration: 26, delay: 3.5,  shape: "oval",     opacity: 0.40, drift: -18 },
  { id: 3,  left: "19%", size: 34, duration: 22, delay: 7,    shape: "teardrop", opacity: 0.50, drift: 30 },
  { id: 4,  left: "27%", size: 16, duration: 18, delay: 1.5,  shape: "leaf",     opacity: 0.35, drift: -22 },
  { id: 5,  left: "35%", size: 26, duration: 28, delay: 5,    shape: "rose",     opacity: 0.45, drift: 20 },
  { id: 6,  left: "44%", size: 38, duration: 24, delay: 0.8,  shape: "oval",     opacity: 0.55, drift: -28 },
  { id: 7,  left: "52%", size: 20, duration: 19, delay: 4,    shape: "teardrop", opacity: 0.40, drift: 16 },
  { id: 8,  left: "60%", size: 30, duration: 30, delay: 2,    shape: "leaf",     opacity: 0.50, drift: -20 },
  { id: 9,  left: "68%", size: 22, duration: 23, delay: 6,    shape: "rose",     opacity: 0.38, drift: 24 },
  { id: 10, left: "76%", size: 36, duration: 21, delay: 1,    shape: "oval",     opacity: 0.52, drift: -30 },
  { id: 11, left: "84%", size: 18, duration: 27, delay: 3,    shape: "teardrop", opacity: 0.42, drift: 18 },
  { id: 12, left: "91%", size: 28, duration: 25, delay: 5.5,  shape: "leaf",     opacity: 0.48, drift: -16 },
  // Second wave — offset delays so the screen never empties
  { id: 13, left: "7%",  size: 22, duration: 22, delay: 11,   shape: "oval",     opacity: 0.38, drift: 20 },
  { id: 14, left: "23%", size: 32, duration: 24, delay: 13,   shape: "rose",     opacity: 0.50, drift: -24 },
  { id: 15, left: "48%", size: 24, duration: 20, delay: 10,   shape: "leaf",     opacity: 0.42, drift: 22 },
  { id: 16, left: "73%", size: 20, duration: 26, delay: 14,   shape: "teardrop", opacity: 0.44, drift: -18 },
  { id: 17, left: "88%", size: 30, duration: 23, delay: 9,    shape: "rose",     opacity: 0.50, drift: 26 },
];

// SVG path data for each shape variant
function PetalSVG({ shape, size, id }: { shape: PetalShape; size: number; id: number }) {
  const gId = `pg-${id}`;
  const hId = `ph-${id}`;

  const gradients = (
    <defs>
      <radialGradient id={gId} cx="45%" cy="30%" r="65%" fx="45%" fy="25%">
        <stop offset="0%"  stopColor="#fff8dc" stopOpacity="1" />
        <stop offset="35%" stopColor="#e8c030" stopOpacity="0.95" />
        <stop offset="70%" stopColor="#c9a227" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#8B6610" stopOpacity="0.75" />
      </radialGradient>
      {/* highlight sheen */}
      <radialGradient id={hId} cx="35%" cy="20%" r="45%">
        <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  if (shape === "rose") {
    // 5-petal stylised rose
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {gradients}
        <g transform="translate(24,24)">
          {[0,72,144,216,288].map((angle, i) => (
            <ellipse
              key={i}
              cx="0" cy="-10"
              rx="5.5" ry="10"
              fill={`url(#${gId})`}
              transform={`rotate(${angle})`}
            />
          ))}
        </g>
        <circle cx="24" cy="24" r="4" fill={`url(#${gId})`} />
        <circle cx="24" cy="24" r="4" fill={`url(#${hId})`} />
      </svg>
    );
  }

  if (shape === "oval") {
    // Simple elongated petal, slightly tilted
    return (
      <svg width={size} height={size} viewBox="0 0 40 48" fill="none">
        {gradients}
        <ellipse cx="20" cy="24" rx="10" ry="21" fill={`url(#${gId})`} />
        <ellipse cx="20" cy="24" rx="10" ry="21" fill={`url(#${hId})`} />
      </svg>
    );
  }

  if (shape === "teardrop") {
    // Teardrop / pointed petal
    return (
      <svg width={size} height={size} viewBox="0 0 36 50" fill="none">
        {gradients}
        <path
          d="M18 2 C28 12, 34 24, 18 48 C2 24, 8 12, 18 2Z"
          fill={`url(#${gId})`}
        />
        <path
          d="M18 2 C28 12, 34 24, 18 48 C2 24, 8 12, 18 2Z"
          fill={`url(#${hId})`}
        />
      </svg>
    );
  }

  // leaf — asymmetric, like a magnolia petal
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 34 52" fill="none">
      {gradients}
      <path
        d="M17 2 C30 10, 32 28, 22 50 C14 50, 2 30, 17 2Z"
        fill={`url(#${gId})`}
      />
      <path
        d="M17 2 C30 10, 32 28, 22 50 C14 50, 2 30, 17 2Z"
        fill={`url(#${hId})`}
      />
      {/* centre vein */}
      <path
        d="M17 8 Q19 28 21 46"
        stroke="rgba(201,162,39,0.30)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

export default function FloatingFlowers() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {florals.map((f) => (
        <motion.div
          key={f.id}
          style={{
            position: "absolute",
            left: f.left,
            top: 0,
            opacity: f.opacity,
            willChange: "transform",
          }}
          initial={{ y: "-80px", rotate: 0, x: 0 }}
          animate={{
            y: "110vh",
            rotate: [0, 120, 240, 360],
            x: [0, f.drift, -f.drift * 0.6, f.drift * 0.4, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.33, 0.66, 1],
          }}
        >
          <PetalSVG shape={f.shape} size={f.size} id={f.id} />
        </motion.div>
      ))}
    </div>
  );
}