"use client";
import { useEffect, useState } from "react";

const GOLD = "rgba(201,169,110,0.7)";

/* Single corner bracket — two thin lines */
function CornerMark({
  top, bottom, left, right, delay,
}: {
  top?: string; bottom?: string; left?: string; right?: string; delay: number;
}) {
  const isRight  = right  !== undefined;
  const isBottom = bottom !== undefined;
  const size = 44;

  const outer: React.CSSProperties = {
    position: "absolute",
    width: size, height: size,
    top, bottom, left, right,
    pointerEvents: "none",
  };
  const h: React.CSSProperties = {
    position: "absolute",
    [isRight  ? "right"  : "left" ]: 0,
    [isBottom ? "bottom" : "top"  ]: 0,
    width: "100%", height: "1px",
    background: GOLD,
    transformOrigin: isRight ? "right center" : "left center",
    animation: `cornerH 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
  };
  const v: React.CSSProperties = {
    position: "absolute",
    [isRight  ? "right"  : "left" ]: 0,
    [isBottom ? "bottom" : "top"  ]: 0,
    width: "1px", height: "100%",
    background: GOLD,
    transformOrigin: isBottom ? "center bottom" : "center top",
    animation: `cornerV 0.6s cubic-bezier(0.22,1,0.36,1) ${delay + 0.12}s both`,
  };

  return (
    <div style={outer}>
      <div style={h} />
      <div style={v} />
    </div>
  );
}

export default function HeroScene() {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    /* Tiny delay so the browser has painted the black before fading */
    const t1 = setTimeout(() => setFading(true), 60);
    /* Remove DOM node after fade so it doesn't block clicks */
    const t2 = setTimeout(() => setRemoved(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* ── Cinematic curtain ─────────────────────── */}
      {!removed && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 990,
          background: "#060606",
          opacity: fading ? 0 : 1,
          transition: "opacity 1.8s cubic-bezier(0.4,0,0.15,1)",
          pointerEvents: "none",
        }} />
      )}

      {/* ── Ambient gold orb (breathes slowly) ───── */}
      <div className="lux-hero-orb" />

      {/* ── Corner brackets ───────────────────────── */}
      <CornerMark
        top="clamp(1.8rem,4vh,4.5rem)"
        left="clamp(1.5rem,5vw,5.5rem)"
        delay={2.0}
      />
      <CornerMark
        top="clamp(1.8rem,4vh,4.5rem)"
        right="clamp(1.5rem,5vw,5.5rem)"
        delay={2.1}
      />
      <CornerMark
        bottom="clamp(1.8rem,4vh,4.5rem)"
        left="clamp(1.5rem,5vw,5.5rem)"
        delay={2.2}
      />
      <CornerMark
        bottom="clamp(1.8rem,4vh,4.5rem)"
        right="clamp(1.5rem,5vw,5.5rem)"
        delay={2.3}
      />
    </>
  );
}
