"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const steps = [
  { num: "01", title: "Request",  desc: "비공개 폼으로 원하는 제품을 접수합니다." },
  { num: "02", title: "Verify",   desc: "현지 파트너가 재고를 직접 확인합니다." },
  { num: "03", title: "Quote",    desc: "모든 비용 포함 투명한 견적을 발송합니다." },
  { num: "04", title: "Source",   desc: "공식 부티크에서 직접 구매를 진행합니다." },
  { num: "05", title: "Deliver",  desc: "보험 처리된 국제 특송으로 전달됩니다." },
];

export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          steps.forEach((_, i) => {
            setTimeout(() => setActive(i), i * 380);
          });
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center" }}>
        {steps.map((step, i) => {
          const lit = i <= active;
          return (
            <div key={step.num} style={{
              flex:"1 1 160px", maxWidth:"220px",
              padding:"2rem 1.5rem", textAlign:"center", position:"relative",
              opacity: lit ? 1 : 0.05,
              transform: lit ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.75s ease, transform 0.75s ease",
            }}>
              {i < steps.length - 1 && (
                <div style={{
                  position:"absolute", top:"2.75rem", right:"-10px",
                  fontSize:"0.85rem", zIndex:1,
                  color: lit ? "rgba(201,169,110,0.6)" : "rgba(201,169,110,0.06)",
                  transition: "color 0.6s ease 0.3s",
                }}>→</div>
              )}
              <div style={{
                width:"52px", height:"52px",
                border: lit ? "1px solid rgba(201,169,110,0.7)" : "1px solid rgba(201,169,110,0.1)",
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 1.3rem",
                fontFamily:"Georgia,serif", fontSize:"0.82rem",
                color: lit ? "#e8c98a" : "#1a1a16",
                letterSpacing:"0.06em",
                background: lit ? "rgba(201,169,110,0.08)" : "transparent",
                boxShadow: lit ? "0 0 18px rgba(201,169,110,0.15), inset 0 0 10px rgba(201,169,110,0.05)" : "none",
                transition: "border-color 0.6s ease, color 0.6s ease, background 0.6s ease, box-shadow 0.6s ease",
              }}>
                {step.num}
              </div>
              <div style={{
                fontSize:"0.62rem", letterSpacing:"0.22em",
                color: lit ? "#c9a96e" : "#1a1a14",
                marginBottom:"0.8rem",
                transition: "color 0.6s ease",
              }}>
                {step.title.toUpperCase()}
              </div>
              <p style={{
                fontSize:"0.73rem",
                color: lit ? "#4a4a44" : "#111110",
                lineHeight:1.85,
                transition: "color 0.6s ease",
              }}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign:"center", marginTop:"4.5rem" }}>
        <Link href="/process" style={{
          textDecoration:"none",
          fontSize:"0.66rem", letterSpacing:"0.24em",
          color:"#484840",
          borderBottom:"1px solid rgba(201,169,110,0.15)", paddingBottom:"2px",
        }}>
          FULL PROCESS DETAILS →
        </Link>
      </div>
    </div>
  );
}
