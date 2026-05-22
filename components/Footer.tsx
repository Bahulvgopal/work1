"use client";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        padding: "28px 24px",
        background: "linear-gradient(180deg, #fdf8e8 0%, #faf4dc 100%)",
        borderTop: "1px solid rgba(201,162,39,0.15)",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Thin gold top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, #c9a227 40%, #e8c030 60%, transparent)",
      }} />

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.82rem",
        color: "rgba(90,70,30,0.65)",
        letterSpacing: "0.1em",
        margin: 0,
      }}>
        © {new Date().getFullYear()} Crafted with love by{" "}
        <a
          href="https://amora-weds.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#b8922a",
            textDecoration: "none",
            letterSpacing: "0.12em",
            fontWeight: 600,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#c9a227")}
          onMouseLeave={e => (e.currentTarget.style.color = "#b8922a")}
        >
          AmoraWeds
        </a>
      </p>
    </footer>
  );
}
