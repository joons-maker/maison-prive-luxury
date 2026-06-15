import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const services = [
  {
    num: "01", symbol: "◈",
    title: "Luxury Bag Sourcing", subtitle: "가방 소싱",
    tag: "PARIS · MILAN DIRECT",
    desc: "에르메스 버킨·켈리, 샤넬 클래식 플랩, 루이비통 한정 라인. 대기 없이 파리·밀라노 현지 부티크에서 직접 확인합니다.",
  },
  {
    num: "02", symbol: "◇",
    title: "Fine Watches & Jewelry", subtitle: "시계 & 주얼리",
    tag: "SWISS · ITALIAN HOUSES",
    desc: "파텍 필립, 오데마 피게, 리차드 밀, 불가리, 카르티에, 반클리프 아펠. 희소 시계·주얼리를 유럽 현지에서 소싱합니다.",
  },
  {
    num: "03", symbol: "◉",
    title: "Couture & Ready-to-Wear", subtitle: "패션 & 쿠튀르",
    tag: "SEASONAL COLLECTION",
    desc: "시즌 컬렉션, 부티크 전용 피스, 국내 미발매 컬러웨이를 현지 파트너가 먼저 확인해 드립니다.",
  },
  {
    num: "04", symbol: "✦",
    title: "Rare Limited Pieces", subtitle: "희소 한정 아이템",
    tag: "WORLDWIDE ALLOCATION",
    desc: "전 세계 극소 수량 아이템. 국내에서 구할 수 없는 제품을 현지 네트워크로 조용히 찾아드립니다.",
  },
  {
    num: "05", symbol: "◎",
    title: "Paris Personal Shopping", subtitle: "현지 동행 쇼핑",
    tag: "ON-SITE CONCIERGE",
    desc: "유럽 방문 시 현지 파트너가 부티크 예약부터 쇼핑 동행, 세금 환급 처리까지 함께합니다.",
  },
  {
    num: "06", symbol: "◐",
    title: "Private Client Concierge", subtitle: "전담 VIP 컨시어지",
    tag: "INVITATION ONLY",
    desc: "정기 VIP 고객 전담 서비스. 신제품 즉시 알림, 우선 소싱, 연간 의뢰 패키지를 제공합니다.",
  },
];

const trustItems = [
  {
    symbol: "◈",
    en: "Paris & Milan Private Network",
    ko: "파리와 밀라노 현지 네트워크를 통한 프라이빗 명품 소싱",
  },
  {
    symbol: "◇",
    en: "Discreet · Confidential",
    ko: "고객의 요청은 외부에 공개되지 않으며, 전담 컨시어지가 개별 상담합니다",
  },
  {
    symbol: "✦",
    en: "Rare Boutique Pieces",
    ko: "국내에서 구하기 어려운 희소 제품을 조용하고 품격 있게 확인합니다",
  },
];

const steps = [
  { num: "01", title: "Request",  desc: "비공개 폼으로 원하는 제품을 접수합니다." },
  { num: "02", title: "Verify",   desc: "현지 파트너가 재고를 직접 확인합니다." },
  { num: "03", title: "Quote",    desc: "모든 비용 포함 투명한 견적을 발송합니다." },
  { num: "04", title: "Source",   desc: "공식 부티크에서 직접 구매를 진행합니다." },
  { num: "05", title: "Deliver",  desc: "보험 처리된 국제 특송으로 전달됩니다." },
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "10rem 2rem 8rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* Top gold accent bar */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px",
          background:"linear-gradient(to right,transparent 0%,rgba(201,169,110,0.5) 20%,rgba(232,201,138,0.8) 50%,rgba(201,169,110,0.5) 80%,transparent 100%)" }} />

        {/* Central glow */}
        <div style={{ position:"absolute", inset:0,
          background:"radial-gradient(ellipse 90% 70% at 50% 45%, rgba(201,169,110,0.07) 0%, transparent 65%)",
          pointerEvents:"none" }} />
        {/* Vignette edges */}
        <div style={{ position:"absolute", inset:0,
          background:"radial-gradient(ellipse 150% 120% at 50% 50%, transparent 35%, rgba(10,10,10,0.75) 100%)",
          pointerEvents:"none" }} />
        {/* Fine grid texture */}
        <div style={{ position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(201,169,110,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.022) 1px,transparent 1px)",
          backgroundSize:"90px 90px", pointerEvents:"none" }} />
        {/* Large "MP" watermark */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          fontSize:"clamp(10rem,22vw,24rem)", fontFamily:"Georgia,serif",
          color:"rgba(201,169,110,0.028)", fontWeight:700, letterSpacing:"0.04em",
          pointerEvents:"none", whiteSpace:"nowrap", userSelect:"none", lineHeight:1 }}>
          MP
        </div>
        {/* Left vertical accent */}
        <div style={{ position:"absolute", left:"clamp(1.5rem,7vw,7rem)", top:"12%", bottom:"12%",
          width:"1px", background:"linear-gradient(to bottom,transparent,rgba(201,169,110,0.2),transparent)",
          pointerEvents:"none" }} />
        {/* Right vertical accent */}
        <div style={{ position:"absolute", right:"clamp(1.5rem,7vw,7rem)", top:"12%", bottom:"12%",
          width:"1px", background:"linear-gradient(to bottom,transparent,rgba(201,169,110,0.2),transparent)",
          pointerEvents:"none" }} />

        {/* Hero content */}
        <div style={{ position:"relative", maxWidth:"900px" }}>
          <div style={{ fontSize:"0.57rem", letterSpacing:"0.52em", color:"#c9a96e",
            marginBottom:"2rem", animation:"fadeInUp 0.8s ease-out 0.2s both" }}>
            PARIS · MILAN · PRIVATE SOURCING
          </div>
          {/* Gold rule */}
          <div style={{ width:"48px", height:"1px",
            background:"linear-gradient(to right,transparent,#c9a96e,transparent)",
            margin:"0 auto 2.5rem", animation:"fadeIn 0.8s ease-out 0.35s both" }} />

          <h1 style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(2.5rem,6.5vw,5.2rem)", fontWeight:400, lineHeight:1.15,
            color:"#f5f0e8", marginBottom:"2rem",
            animation:"fadeInUp 0.9s ease-out 0.4s both", letterSpacing:"-0.015em" }}>
            Private Luxury Sourcing<br />
            <span className="shimmer-gold">from Paris & Milan</span>
          </h1>

          <p style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(1rem,2.5vw,1.15rem)", color:"#888880",
            lineHeight:2, marginBottom:"1rem",
            animation:"fadeInUp 0.8s ease-out 0.55s both" }}>
            유럽 현지 네트워크로 연결하는 초럭셔리 명품 컨시어지
          </p>
          <p style={{ fontSize:"clamp(0.78rem,1.8vw,0.87rem)", color:"#3a3a35",
            lineHeight:2, maxWidth:"600px", margin:"0 auto 4rem",
            animation:"fadeInUp 0.8s ease-out 0.65s both" }}>
            희소 명품, 한정판, 국내 품절 제품을 파리와 밀라노 현지 네트워크를 통해<br />
            조용하고 품격 있게 확인합니다.
          </p>

          <div style={{ display:"flex", gap:"1rem", justifyContent:"center",
            flexWrap:"wrap", animation:"fadeInUp 0.8s ease-out 0.8s both" }}>
            <Link href="/request" style={{ textDecoration:"none",
              background:"#c9a96e", color:"#0a0a0a",
              padding:"1.1rem 3rem", fontSize:"0.72rem",
              letterSpacing:"0.24em", fontWeight:600 }}>
              VIP 상담 신청
            </Link>
            <Link href="/services" style={{ textDecoration:"none",
              border:"1px solid rgba(201,169,110,0.3)", color:"#c9a96e",
              padding:"1.1rem 2.5rem", fontSize:"0.72rem", letterSpacing:"0.2em" }}>
              서비스 보기
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem",
          animation:"fadeIn 1s ease-out 1.5s both" }}>
          <div style={{ width:"1px", height:"54px",
            background:"linear-gradient(to bottom,transparent,rgba(201,169,110,0.7))" }} />
          <span style={{ fontSize:"0.53rem", letterSpacing:"0.38em", color:"#2d2d28" }}>SCROLL</span>
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────────────── */}
      <section style={{ borderTop:"1px solid rgba(201,169,110,0.1)", borderBottom:"1px solid rgba(201,169,110,0.1)", background:"#0d0d0b" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto",
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))" }}>
          {trustItems.map(t => (
            <div key={t.en} className="lux-trust-item">
              <div style={{ fontSize:"0.85rem", color:"#c9a96e", marginBottom:"0.9rem" }}>{t.symbol}</div>
              <div style={{ fontSize:"0.6rem", letterSpacing:"0.24em", color:"#c9a96e", marginBottom:"0.7rem" }}>
                {t.en.toUpperCase()}
              </div>
              <p style={{ fontSize:"0.81rem", color:"#444440", lineHeight:1.9 }}>{t.ko}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand Statement ─────────────────────────────────────── */}
      <section style={{ maxWidth:"860px", margin:"6rem auto", padding:"0 2rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.57rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"2rem" }}>
          WHO WE ARE
        </div>
        <h2 style={{ fontFamily:"Georgia,serif",
          fontSize:"clamp(1.7rem,4vw,2.9rem)", fontWeight:400,
          color:"#f5f0e8", lineHeight:1.45, marginBottom:"3.5rem" }}>
          아무나 이용하는 서비스가 아닙니다.<br />
          <span style={{ color:"rgba(245,240,232,0.5)" }}>조용히, 프라이빗하게.</span>
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
          gap:"2.5rem", textAlign:"left", marginBottom:"5rem" }}>
          {[
            { label:"European Family Network",       text:"파리와 밀라노에 오랜 시간 구축된 현지 파트너 네트워크로 연결합니다." },
            { label:"Invitation-Only Luxury Concierge", text:"소수의 VIP 고객만을 위한 프라이빗 컨시어지 서비스입니다." },
            { label:"Rare Boutique Pieces",          text:"온라인에도, 국내에도 없는 희소 제품을 현지에서 직접 확인합니다." },
          ].map(i => (
            <div key={i.label} style={{ borderLeft:"1px solid rgba(201,169,110,0.2)", paddingLeft:"1.5rem" }}>
              <div style={{ fontSize:"0.59rem", letterSpacing:"0.18em", color:"rgba(201,169,110,0.9)", marginBottom:"0.7rem" }}>
                {i.label.toUpperCase()}
              </div>
              <p style={{ fontSize:"0.84rem", color:"#6a6a62", lineHeight:1.95 }}>{i.text}</p>
            </div>
          ))}
        </div>
        {/* Descending line ornament */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
          <div style={{ width:"1px", height:"50px", background:"linear-gradient(to bottom,rgba(201,169,110,0.45),transparent)" }} />
          <div style={{ width:"5px", height:"5px", border:"1px solid rgba(201,169,110,0.35)", transform:"rotate(45deg)" }} />
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────── */}
      <section style={{ maxWidth:"1280px", margin:"0 auto 7rem", padding:"0 2rem" }}>
        <div style={{ textAlign:"center", marginBottom:"5rem" }}>
          <div style={{ fontSize:"0.57rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>
            OUR SERVICES
          </div>
          <h2 style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:400, color:"#f5f0e8", marginBottom:"1rem" }}>
            Curated for the Few
          </h2>
          <p style={{ fontSize:"0.83rem", color:"#3d3d38", lineHeight:1.9 }}>
            파리와 밀라노에서 소수의 VIP 고객만을 위해 운영합니다.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(330px,1fr))",
          gap:"1px", background:"rgba(201,169,110,0.05)" }}>
          {services.map(s => (
            <div key={s.num} className="lux-service-card">
              {/* Faded number watermark */}
              <div style={{ position:"absolute", top:"1.5rem", right:"2rem",
                fontFamily:"Georgia,serif", fontSize:"4rem",
                color:"rgba(201,169,110,0.04)", fontWeight:700,
                lineHeight:1, userSelect:"none", pointerEvents:"none" }}>
                {s.num}
              </div>
              <div style={{ fontSize:"1.05rem", color:"#c9a96e", opacity:0.75, marginBottom:"1.5rem" }}>
                {s.symbol}
              </div>
              <div style={{ fontSize:"0.56rem", letterSpacing:"0.22em",
                color:"rgba(201,169,110,0.45)", marginBottom:"0.8rem" }}>
                {s.tag}
              </div>
              <h3 style={{ fontFamily:"Georgia,serif", fontSize:"1.08rem",
                color:"#f5f0e8", fontWeight:400, marginBottom:"0.3rem" }}>
                {s.title}
              </h3>
              <div style={{ fontSize:"0.7rem", color:"#555550", marginBottom:"1.3rem" }}>
                {s.subtitle}
              </div>
              <p style={{ fontSize:"0.8rem", color:"#454540", lineHeight:2 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center", marginTop:"3.5rem" }}>
          <Link href="/services" style={{ textDecoration:"none",
            fontSize:"0.68rem", letterSpacing:"0.24em", color:"#c9a96e",
            borderBottom:"1px solid rgba(201,169,110,0.3)", paddingBottom:"2px" }}>
            VIEW ALL SERVICES →
          </Link>
        </div>
      </section>

      {/* ── Process strip ───────────────────────────────────────── */}
      <section style={{ background:"#0d0d0b",
        borderTop:"1px solid rgba(201,169,110,0.07)",
        borderBottom:"1px solid rgba(201,169,110,0.07)",
        padding:"6rem 2rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"5.5rem" }}>
            <div style={{ fontSize:"0.57rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>
              HOW IT WORKS
            </div>
            <h2 style={{ fontFamily:"Georgia,serif",
              fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:400, color:"#f5f0e8" }}>
              A Seamless Experience
            </h2>
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center" }}>
            {steps.map((step, i) => (
              <div key={step.num} style={{ flex:"1 1 160px", maxWidth:"220px",
                padding:"2rem 1.5rem", textAlign:"center", position:"relative" }}>
                {i < steps.length - 1 && (
                  <div style={{ position:"absolute", top:"2.75rem", right:"-10px",
                    color:"rgba(201,169,110,0.18)", fontSize:"0.85rem", zIndex:1 }}>→</div>
                )}
                <div style={{ width:"52px", height:"52px",
                  border:"1px solid rgba(201,169,110,0.22)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  margin:"0 auto 1.3rem",
                  fontFamily:"Georgia,serif", fontSize:"0.82rem",
                  color:"#c9a96e", letterSpacing:"0.06em" }}>
                  {step.num}
                </div>
                <div style={{ fontSize:"0.63rem", letterSpacing:"0.22em",
                  color:"#c9a96e", marginBottom:"0.8rem" }}>
                  {step.title.toUpperCase()}
                </div>
                <p style={{ fontSize:"0.74rem", color:"#3a3a35", lineHeight:1.85 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign:"center", marginTop:"4.5rem" }}>
            <Link href="/process" style={{ textDecoration:"none",
              fontSize:"0.67rem", letterSpacing:"0.24em",
              color:"#484840", borderBottom:"1px solid rgba(201,169,110,0.15)", paddingBottom:"2px" }}>
              FULL PROCESS DETAILS →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section style={{ maxWidth:"820px", margin:"7rem auto", padding:"0 2rem", textAlign:"center" }}>
        {/* Top ornament */}
        <div style={{ display:"flex", gap:"6px", justifyContent:"center", alignItems:"center", marginBottom:"4.5rem" }}>
          <div style={{ flex:1, maxWidth:"100px", height:"1px",
            background:"linear-gradient(to right,transparent,rgba(201,169,110,0.4))" }} />
          <div style={{ width:"7px", height:"7px",
            border:"1px solid rgba(201,169,110,0.5)", transform:"rotate(45deg)", flexShrink:0 }} />
          <div style={{ flex:1, maxWidth:"100px", height:"1px",
            background:"linear-gradient(to left,transparent,rgba(201,169,110,0.4))" }} />
        </div>

        <div style={{ position:"relative", border:"1px solid rgba(201,169,110,0.14)", padding:"6rem 4rem" }}>
          {/* Corner brackets */}
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              position:"absolute", width:"22px", height:"22px",
              borderColor:"rgba(201,169,110,0.5)", borderStyle:"solid",
              borderWidth: i===0?"2px 0 0 2px":i===1?"2px 2px 0 0":i===2?"0 0 2px 2px":"0 2px 2px 0",
              top: i<2?"-1px":"auto", bottom: i>=2?"-1px":"auto",
              left: i%2===0?"-1px":"auto", right: i%2===1?"-1px":"auto",
            }} />
          ))}

          <div style={{ fontSize:"0.57rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"2rem" }}>
            PRIVATE INQUIRY
          </div>
          <h2 style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(1.6rem,3.5vw,2.5rem)", color:"#f5f0e8",
            fontWeight:400, marginBottom:"1.5rem", lineHeight:1.45 }}>
            원하시는 제품이 있으신가요?
          </h2>
          <p style={{ fontSize:"0.86rem", color:"#484840", lineHeight:2, marginBottom:"0.6rem" }}>
            어디에서도 구하기 어려운 제품이라도 조용히 문의해 주세요.
          </p>
          <p style={{ fontSize:"0.8rem", color:"#303028", lineHeight:1.9, marginBottom:"4rem" }}>
            파리와 밀라노에서 직접 확인합니다.
          </p>
          <Link href="/request" style={{ textDecoration:"none",
            display:"inline-block", background:"#c9a96e", color:"#0a0a0a",
            padding:"1.15rem 4rem", fontSize:"0.72rem",
            letterSpacing:"0.26em", fontWeight:600 }}>
            VIP REQUEST →
          </Link>
        </div>

        {/* Bottom ornament */}
        <div style={{ display:"flex", gap:"8px", justifyContent:"center", alignItems:"center", marginTop:"4.5rem" }}>
          <div style={{ width:"28px", height:"1px",
            background:"linear-gradient(to right,transparent,rgba(201,169,110,0.25))" }} />
          <span style={{ fontSize:"0.53rem", letterSpacing:"0.32em", color:"#282823" }}>MAISON PRIVÉ</span>
          <div style={{ width:"28px", height:"1px",
            background:"linear-gradient(to left,transparent,rgba(201,169,110,0.25))" }} />
        </div>
      </section>

      <Footer />
    </>
  );
}
