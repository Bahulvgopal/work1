"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/music/audio1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => { audioRef.current?.pause(); };
  }, []);

  const toggle = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(p => !p);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <style>{`
        @keyframes musicPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%       { transform: scale(1.55); opacity: 0; }
        }
        @keyframes musicPulse2 {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50%       { transform: scale(1.9); opacity: 0; }
        }
        @keyframes bar1 { 0%,100%{height:6px}  40%{height:16px} 70%{height:10px} }
        @keyframes bar2 { 0%,100%{height:12px} 30%{height:5px}  60%{height:18px} }
        @keyframes bar3 { 0%,100%{height:8px}  50%{height:20px} 80%{height:6px}  }
        @keyframes bar4 { 0%,100%{height:14px} 35%{height:7px}  65%{height:16px} }
        @keyframes bar5 { 0%,100%{height:5px}  45%{height:14px} 75%{height:9px}  }
        .music-bar { width: 3px; border-radius: 2px; background: #c9a227; transform-origin: bottom; }
        .music-bar-1 { animation: bar1 0.9s ease-in-out infinite; }
        .music-bar-2 { animation: bar2 0.75s ease-in-out infinite 0.1s; }
        .music-bar-3 { animation: bar3 1.0s ease-in-out infinite 0.05s; }
        .music-bar-4 { animation: bar4 0.8s ease-in-out infinite 0.15s; }
        .music-bar-5 { animation: bar5 0.95s ease-in-out infinite 0.2s; }
      `}</style>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>

        {/* Pulse rings — only when playing */}
        {isPlaying && (
          <>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1px solid rgba(201,162,39,0.5)",
              animation: "musicPulse 2s ease-out infinite",
            }} />
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1px solid rgba(201,162,39,0.3)",
              animation: "musicPulse2 2s ease-out infinite 0.4s",
            }} />
          </>
        )}

        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          style={{
            position: "relative",
            width: 56, height: 56,
            borderRadius: "50%",
            border: "1px solid rgba(201,162,39,0.35)",
            background: "rgba(255,253,242,0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: isPlaying
              ? "0 4px 24px rgba(201,162,39,0.3), inset 0 1px 0 rgba(255,255,255,0.9)"
              : "0 2px 12px rgba(201,162,39,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
            transition: "box-shadow 0.3s ease",
            outline: "none",
          }}
        >
          {/* Gold top shimmer */}
          <div style={{
            position: "absolute", top: 0, left: "20%", right: "20%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.6), transparent)",
            borderRadius: "50%",
          }} />

          {isPlaying ? (
            /* Animated sound bars */
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 20 }}>
              <div className="music-bar music-bar-1" style={{ height: 6 }} />
              <div className="music-bar music-bar-2" style={{ height: 12 }} />
              <div className="music-bar music-bar-3" style={{ height: 8 }} />
              <div className="music-bar music-bar-4" style={{ height: 14 }} />
              <div className="music-bar music-bar-5" style={{ height: 5 }} />
            </div>
          ) : (
            /* Play triangle */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 4.5 L19.5 12 L6 19.5 Z"
                fill="#c9a227"
                opacity="0.9"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}