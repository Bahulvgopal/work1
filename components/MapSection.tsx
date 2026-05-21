"use client";

import { MapPin, Navigation, Clock, Car } from "lucide-react";
import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section
      id="venue"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "8px 24px",
        background: "linear-gradient(180deg, #fffdf5 0%, #fdf8e8 50%, #fffdf5 100%)",
        overflow: "hidden",
        fontFamily: "'Cinzel', 'Georgia', serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');

        .gold-line {
          background: linear-gradient(90deg, transparent, #c9a227, transparent);
          height: 1px;
        }

        .venue-card {
          background: linear-gradient(160deg, rgba(255,255,255,0.97) 0%, rgba(255,252,230,0.88) 100%);
          border: 1px solid rgba(201,162,39,0.20);
          border-radius: 4px;
          overflow: hidden;
          box-shadow:
            0 4px 40px rgba(201,162,39,0.10),
            inset 0 1px 0 rgba(255,255,255,1);
          position: relative;
        }

        .venue-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c9a227 40%, #e8c030 60%, transparent);
          z-index: 5;
        }

        .detail-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(201,162,39,0.18);
          border-radius: 2px;
          flex: 1;
          min-width: 160px;
        }

        .chip-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.05));
          border: 1px solid rgba(201,162,39,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .elegant-button {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          color: #fff;
          background: linear-gradient(135deg, #c9a227 0%, #e8c547 50%, #b8860b 100%);
          border: none;
          padding: 13px 36px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(201,162,39,0.30);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }

        .elegant-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 55%);
        }

        .elegant-button:hover {
          box-shadow: 0 6px 28px rgba(201,162,39,0.45);
          transform: translateY(-2px);
        }

        .map-frame-wrap {
          position: relative;
          border-top: 1px solid rgba(201,162,39,0.15);
        }

        /* gold corner overlays on map */
        .map-corner {
          position: absolute;
          width: 28px;
          height: 28px;
          z-index: 4;
          pointer-events: none;
          opacity: 0.7;
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "600px", height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(201,162,39,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "18px" }}>
            <div className="gold-line" style={{ width: "50px" }} />
            <span style={{ color: "#c9a227", opacity: 0.6, fontSize: "14px" }}>✦</span>
            <span style={{ color: "#c9a227", opacity: 0.3, fontSize: "10px" }}>✦</span>
            <span style={{ color: "#c9a227", opacity: 0.6, fontSize: "14px" }}>✦</span>
            <div className="gold-line" style={{ width: "50px" }} />
          </div> */}
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.32em",
            color: "#b8922a",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>
            Wedding Venue
          </p>
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            color: "#1a1208",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            letterSpacing: "0.06em",
            lineHeight: 1.2,
          }}>
            Join Us At
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              height: "1px", width: "120px", margin: "20px auto 0",
              background: "linear-gradient(90deg, transparent, #c9a227, transparent)",
            }}
          />
        </motion.div>

        {/* Venue Card */}
        <motion.div
          className="venue-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Details Panel */}
          <div style={{ padding: "44px 40px 36px", textAlign: "center" }}>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "60px", height: "60px", borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.05))",
                border: "1px solid rgba(201,162,39,0.28)",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <MapPin size={26} color="#c9a227" />
              {/* pulse */}
              <motion.div
                style={{
                  position: "absolute", inset: "-5px", borderRadius: "50%",
                  border: "1px solid rgba(201,162,39,0.22)",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Venue Name */}
            <h3 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
              fontWeight: 600,
              color: "#1a1208",
              letterSpacing: "0.05em",
              marginBottom: "8px",
              lineHeight: 1.25,
            }}>
              AL Saj International Convention Center
            </h3>

            {/* Micro divider */}
            <div style={{
              width: "40px", height: "1px",
              background: "linear-gradient(90deg, #c9a227, rgba(201,162,39,0.3))",
              margin: "14px auto",
            }} />

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "#5a4a2a",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: "28px",
              letterSpacing: "0.03em",
            }}>
              Al-Saj International Convention Center, Kazhakootam, TVM<br />
              We would love to celebrate our special day with you.
            </p>

            {/* Info chips */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "32px",
            }}>
              <div className="detail-chip">
                <div className="chip-icon"><MapPin size={14} color="#c9a227" /></div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c9a227", marginBottom: "2px" }}>Address</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.92rem", color: "#3d3020" }}>Kazhakootam, Thiruvananthapuram, Kerala</p>
                </div>
              </div>

              <div className="detail-chip">
                <div className="chip-icon"><Clock size={14} color="#c9a227" /></div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c9a227", marginBottom: "2px" }}>Ceremony</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.92rem", color: "#3d3020" }}>09:00 AM onwards</p>
                </div>
              </div>

              <div className="detail-chip">
                <div className="chip-icon"><Car size={14} color="#c9a227" /></div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c9a227", marginBottom: "2px" }}>Parking</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.92rem", color: "#3d3020" }}>Available on site</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://www.google.com/maps/dir//Al-Saj+International+Convention+Center,+HVF9%2BWMR,+NH47,+Panvel+-+Kochi+-+Kanyakumari+Hwy,+opposite+AL+Saj+Hotel,+Kazhakuttam,+Vadakkumbhagam,+Kazhakkoottam,+Kerala+695582/@8.557874,76.9527831,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b05bfa8f5acc5af:0xffc1d0fea67ea195!2m2!1d76.8698969!2d8.5753299?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="elegant-button"
            >
              <Navigation size={15} />
              Open in Maps
            </a>
          </div>

          {/* Map */}
          <div className="map-frame-wrap">
            {/* Corner brackets over map */}
            <div className="map-corner" style={{ top: 10, left: 10 }}>
              <svg viewBox="0 0 28 28" fill="none"><path d="M2 16 L2 2 L16 2" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div className="map-corner" style={{ top: 10, right: 10, transform: "scaleX(-1)" }}>
              <svg viewBox="0 0 28 28" fill="none"><path d="M2 16 L2 2 L16 2" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div className="map-corner" style={{ bottom: 10, left: 10, transform: "scaleY(-1)" }}>
              <svg viewBox="0 0 28 28" fill="none"><path d="M2 16 L2 2 L16 2" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div className="map-corner" style={{ bottom: 10, right: 10, transform: "scale(-1,-1)" }}>
              <svg viewBox="0 0 28 28" fill="none"><path d="M2 16 L2 2 L16 2" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>

            <iframe
              style={{ width: "100%", height: "400px", border: "none", display: "block" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=AL%20Saj%20International%20Convention%20Center%20Kazhakootam%20Thiruvananthapuram%20Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed"            />

            {/* Gradient fade overlay at top of map */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "24px",
              background: "linear-gradient(180deg, rgba(255,253,242,0.5) 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 3,
            }} />
          </div>
        </motion.div>

        {/* Footer ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "48px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
            <div className="gold-line" style={{ width: "60px" }} />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2,16 8,12 12C8 8,12 2,12 2Z" fill="#c9a227" opacity="0.5"/>
              <path d="M12 12C12 12,16 16,12 22C8 16,12 12,12 12Z" fill="#c9a227" opacity="0.5"/>
              <path d="M2 12C2 12,8 8,12 12C8 16,2 12,2 12Z" fill="#c9a227" opacity="0.35"/>
              <path d="M12 12C12 12,18 8,22 12C18 16,12 12,12 12Z" fill="#c9a227" opacity="0.35"/>
            </svg>
            <div className="gold-line" style={{ width: "60px" }} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}