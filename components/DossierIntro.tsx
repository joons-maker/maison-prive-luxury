"use client";
import { useEffect, useState } from "react";

/* ── Palette ───────────────────────────────────────────────── */
const G   = "#c9a96e";
const G80 = "rgba(201,169,110,0.80)";
const G60 = "rgba(201,169,110,0.60)";
const G35 = "rgba(201,169,110,0.35)";
const G18 = "rgba(201,169,110,0.18)";

/* ── Types ─────────────────────────────────────────────────── */
type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/* ── Sub-components ────────────────────────────────────────── */

/** City node: diamond + label */
function City({ label, filled, show, delay }: {
  label: string; filled: boolean; show: boolean; delay: number;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: "0.45rem", flexShrink: 0,
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(8px)",
      transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
    }}>
      <div style={{
        width: "8px", height: "8px",
        border: `1px solid ${G80}`,
        background: filled ? G35 : "transparent",
        transform: "rotate(45deg)",
      }} />
      <div style={{ fontSize: "clamp(0.46rem,1.6vw,0.52rem)", letterSpacing: "0.22em", color: G }}>
        {label}
      </div>
    </div>
  );
}

/** A route line that draws itself left-to-right */
function RouteLine({ show, delay }: { show: boolean; delay: number }) {
  return (
    <div style={{
      flex: 1,
      height: "1px",
      background: G60,
      transformOrigin: "left center",
      transform: show ? "scaleX(1)" : "scaleX(0)",
      transition: `transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      alignSelf: "center",
      marginBottom: "1.1rem", /* optical alignment with diamond center */
    }} />
  );
}

/* ── Main component ────────────────────────────────────────── */
export default function DossierIntro() {
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    const schedule: [Phase, number][] = [
      [1,  150],   /* Label "PRIVATE SOURCING DOSSIER" */
      [2,  650],   /* Frame draws itself */
      [3, 1900],   /* Doc header + route traces */
      [4, 3100],   /* Stamp drops */
      [5, 4000],   /* Overlay fades out */
      [6, 5800],   /* Remove from DOM */
    ];
    const timers = schedule.map(([p, t]) => setTimeout(() => setPhase(p), t));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase >= 6) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 980,
      background: "#060606",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(1.2rem,5vw,3rem)",
      /* Fade out to reveal hero */
      opacity: phase >= 5 ? 0 : 1,
      transition: phase >= 5 ? "opacity 1.7s cubic-bezier(0.4,0,0.15,1)" : "none",
      pointerEvents: "none",
    }}>
      <div style={{ width: "100%", maxWidth: "560px" }}>

        {/* ── ① Label ──────────────────────────────────── */}
        <div style={{
          textAlign: "center",
          marginBottom: "clamp(1.2rem,3vh,1.8rem)",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.7s ease 0s, transform 0.7s ease 0s",
        }}>
          <div style={{
            fontSize: "clamp(0.42rem,1.5vw,0.48rem)",
            letterSpacing: "0.5em",
            color: G60,
          }}>
            PRIVATE SOURCING DOSSIER
          </div>
        </div>

        {/* ── ② Document frame ─────────────────────────── */}
        <div style={{
          position: "relative",
          padding: "clamp(1.5rem,4vw,2.2rem) clamp(1.2rem,4vw,2.5rem) clamp(1.4rem,3.5vw,2rem)",
        }}>
          {/* Frame border — draws: top → right → bottom → left */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: G80, transformOrigin: "left center",
            transform: phase >= 2 ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1) 0.00s",
          }} />
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "1px",
            background: G80, transformOrigin: "center top",
            transform: phase >= 2 ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1) 0.55s",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
            background: G80, transformOrigin: "right center",
            transform: phase >= 2 ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1) 0.93s",
          }} />
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "1px",
            background: G80, transformOrigin: "center bottom",
            transform: phase >= 2 ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1) 1.48s",
          }} />

          {/* ── ③ Doc header ─────────────────────────────── */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            marginBottom: "clamp(0.9rem,2vh,1.3rem)",
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.55s ease 0s",
          }}>
            <div>
              <div style={{ fontSize: "0.37rem", letterSpacing: "0.22em", color: G35, marginBottom: "0.2rem" }}>
                REF
              </div>
              <div style={{ fontSize: "clamp(0.44rem,1.5vw,0.5rem)", letterSpacing: "0.1em", color: G60, fontFamily: "monospace" }}>
                MP-2024-PRIV
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.37rem", letterSpacing: "0.22em", color: G35, marginBottom: "0.2rem" }}>
                CLASSIFICATION
              </div>
              <div style={{ fontSize: "clamp(0.44rem,1.5vw,0.5rem)", letterSpacing: "0.1em", color: G60 }}>
                PRIVATE
              </div>
            </div>
          </div>

          {/* Divider 1 */}
          <div style={{
            height: "1px", background: G18,
            marginBottom: "clamp(1.2rem,3vh,1.8rem)",
            transformOrigin: "left center",
            transform: phase >= 3 ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.5s ease 0.1s",
          }} />

          {/* ── ④ Route: PARIS → MILAN → SEOUL ─────────── */}
          <div style={{
            display: "flex", alignItems: "center",
            marginBottom: "clamp(1.2rem,3vh,1.8rem)",
          }}>
            <City label="PARIS" filled   show={phase >= 3} delay={0.15} />
            <RouteLine                   show={phase >= 3} delay={0.50} />
            <City label="MILAN" filled={false} show={phase >= 3} delay={1.00} />
            <RouteLine                   show={phase >= 3} delay={1.30} />
            <City label="SEOUL" filled   show={phase >= 3} delay={1.80} />
          </div>

          {/* Divider 2 */}
          <div style={{
            height: "1px", background: G18,
            marginBottom: "clamp(1rem,2.5vh,1.5rem)",
            transformOrigin: "right center",
            transform: phase >= 3 ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.5s ease 2.2s",
          }} />

          {/* ── ⑤ Stamp ─────────────────────────────────── */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{
              border: `2px solid ${G80}`,
              padding: "0.55rem clamp(0.8rem,2vw,1.3rem)",
              textAlign: "center",
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? "rotate(-5deg) scale(1)" : "rotate(-5deg) scale(0.06)",
              transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1) 0s, opacity 0.12s ease 0s",
              transformOrigin: "center center",
            }}>
              <div style={{ fontSize: "clamp(0.38rem,1.2vw,0.42rem)", letterSpacing: "0.42em", color: G, lineHeight: 1.9 }}>
                INVITATION
              </div>
              <div style={{ height: "1px", background: G35, margin: "0.25rem 0" }} />
              <div style={{ fontSize: "clamp(0.38rem,1.2vw,0.42rem)", letterSpacing: "0.42em", color: G, lineHeight: 1.9 }}>
                ONLY
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────── */}
        <div style={{
          textAlign: "center",
          marginTop: "clamp(1rem,2.5vh,1.5rem)",
          opacity: phase >= 3 ? 1 : 0,
          transition: "opacity 0.6s ease 2.3s",
        }}>
          <div style={{ fontSize: "clamp(0.36rem,1.2vw,0.4rem)", letterSpacing: "0.38em", color: G35 }}>
            MAISON PRIVÉ · PARIS & MILAN
          </div>
        </div>
      </div>
    </div>
  );
}
