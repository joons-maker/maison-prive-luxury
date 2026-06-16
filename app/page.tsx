import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import ProcessSteps from "@/components/ProcessSteps";
import DossierIntro from "@/components/DossierIntro";

/* ── Data ─────────────────────────────────────────────────── */
const BRANDS = [
  "HERMÈS","CHANEL","LOUIS VUITTON","BOTTEGA VENETA","DIOR","CELINE",
  "SAINT LAURENT","VALENTINO","GIVENCHY","BALENCIAGA","LOEWE","FENDI",
  "PATEK PHILIPPE","AUDEMARS PIGUET","RICHARD MILLE","ROLEX","CARTIER",
  "VAN CLEEF & ARPELS","BULGARI","CHOPARD","PIAGET","GRAFF",
];

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

const credentials = [
  { num: "Paris",      label: "& Milan",          sub: "유럽 현지 직접 소싱" },
  { num: "Private",    label: "Network",           sub: "현지 부티크 파트너" },
  { num: "Discreet",   label: "& Confidential",   sub: "100% 비공개 운영" },
  { num: "Invitation", label: "Only",              sub: "소수 VIP 고객 전용" },
];


const clientProfile = [
  { label: "European Family Network",          text: "파리와 밀라노에 오랜 시간 구축된 현지 파트너 네트워크로 연결합니다." },
  { label: "Invitation-Only Luxury Concierge", text: "소수의 VIP 고객만을 위한 프라이빗 컨시어지 서비스입니다." },
  { label: "Rare Boutique Pieces",             text: "온라인에도, 국내에도 없는 희소 제품을 현지에서 직접 확인합니다." },
];

const brandsList = [...BRANDS, ...BRANDS]; // duplicate for seamless loop

/* ── Component ────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "10rem 2rem 8rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* ── Dossier intro overlay ─────────── */}
        <DossierIntro />

        {/* ── Static decoration layers ───────── */}
        {/* Top gold rule */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px",
          background:"linear-gradient(to right,transparent 0%,rgba(201,169,110,0.6) 20%,rgba(232,201,138,0.95) 50%,rgba(201,169,110,0.6) 80%,transparent 100%)" }} />
        {/* Vignette */}
        <div style={{ position:"absolute", inset:0,
          background:"radial-gradient(ellipse 150% 120% at 50% 50%, transparent 30%, rgba(6,6,6,0.82) 100%)",
          pointerEvents:"none" }} />
        {/* Grid */}
        <div style={{ position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(201,169,110,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.028) 1px,transparent 1px)",
          backgroundSize:"90px 90px", pointerEvents:"none" }} />
        {/* MP watermark */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          fontSize:"clamp(10rem,22vw,24rem)", fontFamily:"Georgia,serif",
          color:"rgba(201,169,110,0.065)", fontWeight:700, letterSpacing:"0.04em",
          pointerEvents:"none", whiteSpace:"nowrap", userSelect:"none", lineHeight:1,
          animation:"fadeIn 3s ease-out 4.8s both" }}>
          MP
        </div>
        {/* Side vertical rules */}
        <div style={{ position:"absolute", left:"clamp(1.5rem,7vw,7rem)", top:"12%", bottom:"12%",
          width:"1px", background:"linear-gradient(to bottom,transparent,rgba(201,169,110,0.28),transparent)",
          pointerEvents:"none", animation:"fadeIn 1.2s ease-out 4.5s both" }} />
        <div style={{ position:"absolute", right:"clamp(1.5rem,7vw,7rem)", top:"12%", bottom:"12%",
          width:"1px", background:"linear-gradient(to bottom,transparent,rgba(201,169,110,0.28),transparent)",
          pointerEvents:"none", animation:"fadeIn 1.2s ease-out 4.6s both" }} />
        {/* Gold sweep */}
        <div className="lux-hero-sweep" />

        {/* ── Content ────────────────────────── */}
        <div style={{ position:"relative", maxWidth:"960px" }}>
          {/* 텍스트 딜레이: DossierIntro 페이드아웃(4.0s)과 크로스페이드 */}
          <div style={{ fontSize:"0.55rem", letterSpacing:"0.55em", color:"rgba(201,169,110,0.85)",
            marginBottom:"1.8rem", animation:"fadeInUp 1s cubic-bezier(0.22,1,0.36,1) 4.0s both" }}>
            PARIS · MILAN · PRIVATE SOURCING CONCIERGE
          </div>
          <div style={{ width:"48px", height:"1px",
            background:"linear-gradient(to right,transparent,#c9a96e,transparent)",
            margin:"0 auto 2.8rem",
            animation:"lineGrow 0.8s cubic-bezier(0.22,1,0.36,1) 4.3s both" }} />

          <h1 style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(2.4rem,6.2vw,5rem)", fontWeight:400, lineHeight:1.18,
            color:"#f5f0e8", marginBottom:"2.2rem",
            animation:"fadeInUp 1.1s cubic-bezier(0.22,1,0.36,1) 4.55s both", letterSpacing:"-0.01em" }}>
            Private Luxury Sourcing<br />
            <span className="shimmer-gold">from Paris & Milan</span>
          </h1>

          {/* Pull quote */}
          <div style={{ display:"flex", gap:"6px", justifyContent:"center", alignItems:"center",
            marginBottom:"2rem", animation:"fadeIn 0.9s ease-out 5.1s both" }}>
            <div style={{ flex:1, maxWidth:"80px", height:"1px",
              background:"linear-gradient(to right,transparent,rgba(201,169,110,0.4))" }} />
            <span style={{ fontSize:"0.6rem", letterSpacing:"0.28em", color:"#888880", whiteSpace:"nowrap" }}>
              조용히, 프라이빗하게
            </span>
            <div style={{ flex:1, maxWidth:"80px", height:"1px",
              background:"linear-gradient(to left,transparent,rgba(201,169,110,0.4))" }} />
          </div>

          <p style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(1rem,2.4vw,1.12rem)", color:"#7a7a70",
            lineHeight:2, marginBottom:"0.8rem",
            animation:"fadeInUp 1s cubic-bezier(0.22,1,0.36,1) 5.3s both" }}>
            유럽 현지 네트워크로 연결하는 초럭셔리 명품 컨시어지
          </p>
          <p style={{ fontSize:"clamp(0.76rem,1.7vw,0.84rem)", color:"#3a3a34",
            lineHeight:2, maxWidth:"560px", margin:"0 auto 4rem",
            animation:"fadeInUp 1s cubic-bezier(0.22,1,0.36,1) 5.5s both" }}>
            희소 명품, 한정판, 국내 품절 제품을 파리와 밀라노 현지 네트워크를 통해<br />
            조용하고 품격 있게 확인합니다.
          </p>

          <div style={{ display:"flex", gap:"1rem", justifyContent:"center",
            flexWrap:"wrap", animation:"fadeInUp 1s cubic-bezier(0.22,1,0.36,1) 5.8s both" }}>
            <Link href="/request" className="lux-btn-shine" style={{ textDecoration:"none",
              background:"#c9a96e", color:"#0a0a0a",
              padding:"1.15rem 3.2rem", fontSize:"0.71rem",
              letterSpacing:"0.26em", fontWeight:600 }}>
              VIP 상담 신청
            </Link>
            <Link href="/services" style={{ textDecoration:"none",
              border:"1px solid rgba(201,169,110,0.3)", color:"#c9a96e",
              padding:"1.15rem 2.5rem", fontSize:"0.71rem", letterSpacing:"0.2em" }}>
              서비스 보기
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem",
          animation:"fadeIn 1.2s ease-out 6.2s both" }}>
          <div style={{ width:"1px", height:"54px",
            background:"linear-gradient(to bottom,transparent,rgba(201,169,110,0.7))" }} />
          <span style={{ fontSize:"0.51rem", letterSpacing:"0.4em", color:"#282823" }}>SCROLL</span>
        </div>
      </section>

      {/* ── Brands Marquee ──────────────────────────────── */}
      <section style={{
        borderTop:"1px solid rgba(201,169,110,0.1)",
        borderBottom:"1px solid rgba(201,169,110,0.08)",
        background:"#080808",
        overflow:"hidden",
        padding:"1.4rem 0",
      }}>
        <div style={{ position:"relative", overflow:"hidden" }}>
          {/* fade edges */}
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"120px", zIndex:2,
            background:"linear-gradient(to right,#080808,transparent)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"120px", zIndex:2,
            background:"linear-gradient(to left,#080808,transparent)", pointerEvents:"none" }} />
          <div className="lux-marquee-track">
            {brandsList.map((b, i) => (
              <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:"1.5rem",
                whiteSpace:"nowrap", padding:"0 2.2rem" }}>
                <span style={{ fontSize:"0.58rem", letterSpacing:"0.32em",
                  color:"rgba(201,169,110,0.65)", fontWeight:300 }}>
                  {b}
                </span>
                <span style={{ color:"rgba(201,169,110,0.3)", fontSize:"0.5rem" }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────── */}
      <section style={{ borderBottom:"1px solid rgba(201,169,110,0.07)", background:"#0d0d0b" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto",
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))" }}>
          {trustItems.map((t, i) => (
            <FadeUp key={t.en} delay={i * 120}>
              <div className="lux-trust-item">
                <div style={{ fontSize:"0.85rem", color:"#c9a96e", marginBottom:"0.9rem" }}>{t.symbol}</div>
                <div style={{ fontSize:"0.59rem", letterSpacing:"0.24em", color:"#c9a96e", marginBottom:"0.7rem" }}>
                  {t.en.toUpperCase()}
                </div>
                <p style={{ fontSize:"0.8rem", color:"#444440", lineHeight:1.9 }}>{t.ko}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Credential Numbers ──────────────────────────── */}
      <section style={{ background:"#0a0a0a", borderBottom:"1px solid rgba(201,169,110,0.07)" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto",
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
          {credentials.map((c, i) => (
            <FadeUp key={c.num} delay={i * 110}>
              <div className="lux-credential-item">
                <div style={{ fontFamily:"Georgia,serif", fontSize:"1.2rem",
                  color:"#c9a96e", letterSpacing:"0.04em", marginBottom:"0.15rem" }}>
                  {c.num}
                </div>
                <div style={{ fontSize:"0.6rem", letterSpacing:"0.2em", color:"#555550",
                  marginBottom:"0.6rem" }}>
                  {c.label.toUpperCase()}
                </div>
                <div style={{ width:"24px", height:"1px",
                  background:"rgba(201,169,110,0.25)", margin:"0 auto 0.6rem" }} />
                <p style={{ fontSize:"0.65rem", color:"#2e2e28", letterSpacing:"0.06em" }}>{c.sub}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Private Client Welcome ──────────────────────── */}
      <section style={{ background:"#0a0a0a", padding:"7rem 2rem",
        borderBottom:"1px solid rgba(201,169,110,0.07)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0,
          background:"radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
          pointerEvents:"none" }} />
        <FadeUp style={{ maxWidth:"680px", margin:"0 auto", textAlign:"center", position:"relative" }}>
          <div style={{ display:"flex", gap:"6px", justifyContent:"center", alignItems:"center", marginBottom:"2rem" }}>
            <div style={{ flex:1, maxWidth:"70px", height:"1px",
              background:"linear-gradient(to right,transparent,rgba(201,169,110,0.4))" }} />
            <div style={{ width:"6px", height:"6px",
              border:"1px solid rgba(201,169,110,0.5)", transform:"rotate(45deg)", flexShrink:0 }} />
            <div style={{ flex:1, maxWidth:"70px", height:"1px",
              background:"linear-gradient(to left,transparent,rgba(201,169,110,0.4))" }} />
          </div>
          <div style={{ fontSize:"0.54rem", letterSpacing:"0.5em", color:"rgba(201,169,110,0.6)", marginBottom:"1.8rem" }}>
            TO OUR PRIVATE CLIENTS
          </div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1.5rem,3.2vw,2.1rem)",
            fontWeight:400, color:"#f5f0e8", lineHeight:1.6, marginBottom:"2rem" }}>
            이 페이지는 누구나 볼 수 있지만,<br />이곳에서 진행되는 모든 일은 그렇지 않습니다.
          </h2>
          <p style={{ fontSize:"0.85rem", color:"#666660", lineHeight:2.05, maxWidth:"480px", margin:"0 auto" }}>
            MAISON PRIVÉ는 불특정 다수를 대상으로 제품을 판매하지 않습니다.
            문의를 남기신 순간부터, 고객님의 요청은 오직 전담 컨시어지 한 사람만이 확인합니다.
            진행 상황은 비공개 Private Client Room에서만 공유되며, 외부에 노출되지 않습니다.
          </p>
        </FadeUp>
      </section>

      {/* ── Brand Statement ─────────────────────────────── */}
      <FadeUp style={{ maxWidth:"900px", margin:"7rem auto", padding:"0 2rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.56rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"2rem" }}>
          WHO WE ARE
        </div>
        <h2 style={{ fontFamily:"Georgia,serif",
          fontSize:"clamp(1.7rem,4vw,2.85rem)", fontWeight:400,
          color:"#f5f0e8", lineHeight:1.5, marginBottom:"1.5rem" }}>
          아무나 이용하는 서비스가 아닙니다.
        </h2>
        <p style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1rem,2.2vw,1.12rem)",
          color:"rgba(245,240,232,0.35)", lineHeight:1.9, marginBottom:"4rem" }}>
          소수의 VIP 고객만을 위해 조용히, 프라이빗하게 운영합니다.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
          gap:"2.5rem", textAlign:"left", marginBottom:"5rem" }}>
          {clientProfile.map(i => (
            <div key={i.label} className="lux-info-panel">
              <div style={{ fontSize:"0.58rem", letterSpacing:"0.18em",
                color:"rgba(201,169,110,0.85)", marginBottom:"0.7rem" }}>
                {i.label.toUpperCase()}
              </div>
              <p style={{ fontSize:"0.83rem", color:"#6a6a62", lineHeight:1.95 }}>{i.text}</p>
            </div>
          ))}
        </div>

        {/* Who this is for */}
        <div style={{ padding:"2.5rem 3rem", border:"1px solid rgba(201,169,110,0.1)",
          background:"#0d0d0b", textAlign:"left", marginBottom:"5rem" }}>
          <div style={{ fontSize:"0.56rem", letterSpacing:"0.3em", color:"#c9a96e", marginBottom:"1.4rem" }}>
            WHO THIS IS FOR
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1rem" }}>
            {[
              "유럽 현지에서 직접 명품을 소싱하고 싶으신 분",
              "대기 없이 에르메스 버킨·켈리를 원하시는 분",
              "국내에 없는 한정판·희소 제품을 찾으시는 분",
              "신뢰할 수 있는 전담 채널이 필요하신 분",
            ].map(t => (
              <div key={t} style={{ display:"flex", gap:"0.75rem", alignItems:"flex-start" }}>
                <span style={{ color:"rgba(201,169,110,0.5)", fontSize:"0.6rem", flexShrink:0, marginTop:"1px" }}>◆</span>
                <span style={{ fontSize:"0.78rem", color:"#555550", lineHeight:1.85 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
          <div style={{ width:"1px", height:"50px", background:"linear-gradient(to bottom,rgba(201,169,110,0.45),transparent)" }} />
          <div style={{ width:"5px", height:"5px", border:"1px solid rgba(201,169,110,0.35)", transform:"rotate(45deg)" }} />
        </div>
      </FadeUp>

      {/* ── Services ────────────────────────────────────── */}
      <section style={{ maxWidth:"1280px", margin:"0 auto 7rem", padding:"0 2rem" }}>
        <div style={{ textAlign:"center", marginBottom:"5rem" }}>
          <div style={{ fontSize:"0.56rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>
            OUR SERVICES
          </div>
          <h2 style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(1.8rem,4vw,2.9rem)", fontWeight:400, color:"#f5f0e8", marginBottom:"1.2rem" }}>
            Curated for the Few
          </h2>
          <p style={{ fontSize:"0.82rem", color:"#3d3d38", lineHeight:1.9 }}>
            파리와 밀라노에서 소수의 VIP 고객만을 위해 운영합니다.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(330px,1fr))",
          gap:"1px", background:"rgba(201,169,110,0.05)" }}>
          {services.map((s, i) => (
            <FadeUp key={s.num} delay={i * 80}>
              <div className="lux-service-card">
                <div style={{ position:"absolute", top:"1.5rem", right:"2rem",
                  fontFamily:"Georgia,serif", fontSize:"4rem",
                  color:"rgba(201,169,110,0.04)", fontWeight:700,
                  lineHeight:1, userSelect:"none", pointerEvents:"none" }}>
                  {s.num}
                </div>
                <div style={{ fontSize:"1.05rem", color:"#c9a96e", opacity:0.75, marginBottom:"1.5rem" }}>{s.symbol}</div>
                <div style={{ fontSize:"0.55rem", letterSpacing:"0.22em",
                  color:"rgba(201,169,110,0.4)", marginBottom:"0.8rem" }}>
                  {s.tag}
                </div>
                <h3 style={{ fontFamily:"Georgia,serif", fontSize:"1.08rem",
                  color:"#f5f0e8", fontWeight:400, marginBottom:"0.3rem" }}>
                  {s.title}
                </h3>
                <div style={{ fontSize:"0.68rem", color:"#555550", marginBottom:"1.3rem" }}>{s.subtitle}</div>
                <p style={{ fontSize:"0.79rem", color:"#454540", lineHeight:2 }}>{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <div style={{ textAlign:"center", marginTop:"3.5rem" }}>
          <Link href="/services" style={{ textDecoration:"none",
            fontSize:"0.67rem", letterSpacing:"0.24em", color:"#c9a96e",
            borderBottom:"1px solid rgba(201,169,110,0.3)", paddingBottom:"2px" }}>
            VIEW ALL SERVICES →
          </Link>
        </div>
      </section>

      {/* ── What We Do Not Do ────────────────────────────── */}
      <section style={{ background:"#0a0a0a", padding:"7rem 2rem",
        borderTop:"1px solid rgba(201,169,110,0.07)", borderBottom:"1px solid rgba(201,169,110,0.07)" }}>
        <div style={{ maxWidth:"880px", margin:"0 auto" }}>
          <FadeUp style={{ textAlign:"center", marginBottom:"4rem" }}>
            <div style={{ fontSize:"0.56rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>
              WHAT WE DO NOT DO
            </div>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1.6rem,3.5vw,2.3rem)",
              fontWeight:400, color:"#f5f0e8" }}>
              저희는 쇼핑몰이 아닙니다
            </h2>
          </FadeUp>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1px",
            background:"rgba(201,169,110,0.07)" }}>
            {[
              { t:"제품을 재고로 보유하지 않습니다",   d:"모든 제품은 고객 요청 이후 현지 부티크에서 직접 확인 후 구매합니다. 미리 사들여 놓고 파는 구조가 아닙니다." },
              { t:"불특정 다수에게 노출하지 않습니다", d:"공개 카탈로그나 SNS 판매를 운영하지 않습니다. 문의를 남긴 고객에게만 개별적으로 대응합니다." },
              { t:"가격을 흥정하지 않습니다",          d:"현지 정가에 투명한 소싱 비용만을 더합니다. 임의로 가격을 올리거나 협상하는 구조가 아닙니다." },
              { t:"승인 없이 결제를 청구하지 않습니다", d:"고객님이 Private Brief를 확인하고 승인하기 전까지 어떠한 결제도 요청하지 않습니다." },
              { t:"고객 정보를 공유하지 않습니다",      d:"이름, 연락처, 구매 내역은 전담 컨시어지 외 누구에게도 공개되지 않으며 외부와 공유되지 않습니다." },
              { t:"대리점·공식 파트너를 사칭하지 않습니다", d:"특정 브랜드의 공식 대리점이 아닌, 고객을 대신해 현지 구매를 연결하는 프라이빗 소싱 컨시어지입니다." },
            ].map((item, i) => (
              <FadeUp key={item.t} delay={i * 70}>
                <div style={{ background:"#0a0a0a", padding:"2.2rem 2rem", height:"100%" }}>
                  <div style={{ display:"flex", gap:"0.7rem", alignItems:"flex-start", marginBottom:"0.8rem" }}>
                    <span style={{ color:"rgba(201,169,110,0.5)", fontSize:"0.85rem", flexShrink:0 }}>✕</span>
                    <div style={{ fontSize:"0.86rem", color:"#f5f0e8", fontFamily:"Georgia,serif", lineHeight:1.5 }}>
                      {item.t}
                    </div>
                  </div>
                  <p style={{ fontSize:"0.75rem", color:"#555550", lineHeight:1.9, paddingLeft:"1.5rem" }}>
                    {item.d}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── A Note from Maison Privé ─────────────────────── */}
      <section style={{ background:"#0a0a0a", padding:"7rem 2rem",
        borderBottom:"1px solid rgba(201,169,110,0.07)" }}>
        <FadeUp style={{ maxWidth:"640px", margin:"0 auto" }}>
          <div style={{ fontSize:"0.54rem", letterSpacing:"0.42em", color:"#c9a96e",
            textAlign:"center", marginBottom:"2.5rem" }}>
            A NOTE FROM MAISON PRIVÉ
          </div>
          <div style={{ border:"1px solid rgba(201,169,110,0.1)", background:"#0d0d0b",
            padding:"2.8rem 3rem" }}>
            <p style={{ fontSize:"0.86rem", color:"#888880", lineHeight:2.1, marginBottom:"1.6rem",
              fontFamily:"Georgia,serif" }}>
              MAISON PRIVÉ는 공개된 쇼핑몰이 아닙니다.
            </p>
            <p style={{ fontSize:"0.8rem", color:"#555550", lineHeight:2, marginBottom:"1.3rem" }}>
              저희는 고객님의 승인 전에 제품을 미리 구매하지 않습니다. 출처가 불명확하거나
              검증되지 않은 경로의 제품은 진행하지 않으며, 모든 구매는 현지 공식 부티크를
              직접 방문하여 확인한 후에만 이루어집니다.
            </p>
            <p style={{ fontSize:"0.8rem", color:"#555550", lineHeight:2, marginBottom:"1.3rem" }}>
              소싱 비용, 관세, 부가세 등 발생 가능한 모든 비용은 결제 요청 이전 단계에서
              투명하게 안내드립니다. 안내드리지 않은 비용이 결제 이후 추가되는 일은 없습니다.
            </p>
            <p style={{ fontSize:"0.8rem", color:"#555550", lineHeight:2 }}>
              저희는 특정 브랜드의 공식 대리점이나 공식 파트너가 아닙니다. 고객님을 대신해
              유럽 현지에서 제품을 확인하고 구매를 연결해 드리는 프라이빗 소싱 컨시어지입니다.
            </p>
            <div style={{ width:"32px", height:"1px", background:"rgba(201,169,110,0.25)",
              margin:"2rem 0 1.2rem" }} />
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.8rem", color:"#c9a96e",
              letterSpacing:"0.04em" }}>
              MAISON PRIVÉ Concierge
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Process strip ───────────────────────────────── */}
      <section style={{ background:"#0d0d0b",
        borderTop:"1px solid rgba(201,169,110,0.07)",
        borderBottom:"1px solid rgba(201,169,110,0.07)",
        padding:"6rem 2rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"5.5rem" }}>
            <div style={{ fontSize:"0.56rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>
              HOW IT WORKS
            </div>
            <h2 style={{ fontFamily:"Georgia,serif",
              fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:400, color:"#f5f0e8", marginBottom:"1.2rem" }}>
              A Seamless Experience
            </h2>
            <p style={{ fontSize:"0.8rem", color:"#555550", lineHeight:1.9, maxWidth:"480px", margin:"0 auto" }}>
              고객 승인 전까지 비용은 발생하지 않습니다.<br />
              문의 접수부터 결제 요청, 배송까지 모든 단계를 투명하게 안내드립니다.
            </p>
          </div>

          <ProcessSteps />
        </div>
      </section>

      {/* ── VIP Client Room Preview ──────────────────────── */}
      <section style={{ background:"#0a0a0a", padding:"7rem 2rem" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
            gap:"4rem", alignItems:"center" }}>

            {/* 좌측 텍스트 */}
            <FadeUp>
              <div style={{ fontSize:"0.56rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>
                YOUR PRIVATE CLIENT ROOM
              </div>
              <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1.7rem,3.8vw,2.5rem)",
                fontWeight:400, color:"#f5f0e8", lineHeight:1.45, marginBottom:"1.8rem" }}>
                문의 한 건마다,<br />고객님만의 비공개 룸이 생성됩니다
              </h2>
              <p style={{ fontSize:"0.85rem", color:"#666660", lineHeight:2, marginBottom:"2.2rem" }}>
                위시리스트 진행 상태, 현지 소싱 증빙, 결제 요청 내역까지 — 모든 진행 상황을
                Request ID와 연락처 뒷자리 4자리만으로 비공개 룸에서 확인하실 수 있습니다.
                별도 회원가입이나 앱 설치는 필요하지 않습니다.
              </p>
              <Link href="/track" style={{ textDecoration:"none", display:"inline-block",
                border:"1px solid rgba(201,169,110,0.35)", color:"#c9a96e",
                padding:"0.9rem 2.4rem", fontSize:"0.68rem", letterSpacing:"0.2em" }}>
                PRIVATE CLIENT ROOM 살펴보기 →
              </Link>
            </FadeUp>

            {/* 우측 미니 프리뷰 카드 (예시 데이터) */}
            <FadeUp delay={120}>
              <div style={{ background:"#0d0d0b", border:"1px solid rgba(201,169,110,0.15)",
                padding:"1.8rem 2rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                  marginBottom:"1.4rem", paddingBottom:"1.2rem",
                  borderBottom:"1px solid rgba(201,169,110,0.08)" }}>
                  <span style={{ fontSize:"0.5rem", letterSpacing:"0.32em", color:"rgba(201,169,110,0.7)" }}>
                    PRIVATE CLIENT ROOM
                  </span>
                  <span style={{ fontSize:"0.54rem", padding:"0.15rem 0.55rem",
                    border:"1px solid rgba(201,169,110,0.3)", color:"#c9a96e" }}>◆ INVITED</span>
                </div>

                <div style={{ fontSize:"0.52rem", letterSpacing:"0.2em", color:"#333330", marginBottom:"0.3rem" }}>
                  EXAMPLE · 예시 화면
                </div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color:"#f5f0e8", marginBottom:"1.2rem" }}>
                  Hermès — Birkin 30
                </div>

                <div style={{ display:"grid", gap:"0.5rem", marginBottom:"1.2rem" }}>
                  {[
                    ["European Availability Check", "completed"],
                    ["Cost Estimate Prepared",       "completed"],
                    ["Inspection Photos",            "in_progress"],
                  ].map(([label, status]) => (
                    <div key={label} style={{ display:"flex", justifyContent:"space-between",
                      alignItems:"center", fontSize:"0.68rem" }}>
                      <span style={{ color: status==="completed" ? "#888880" : "#c9a96e" }}>{label}</span>
                      <span style={{ color: status==="completed" ? "#88cc88" : "#c9a96e", fontSize:"0.8rem" }}>
                        {status==="completed" ? "●" : "◑"}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ padding:"0.7rem 0.9rem", background:"rgba(201,169,110,0.05)",
                  border:"1px solid rgba(201,169,110,0.1)" }}>
                  <span style={{ fontSize:"0.6rem", color:"#888880" }}>결제 요청 상태 — </span>
                  <span style={{ fontSize:"0.6rem", color:"#c9a96e" }}>승인 대기 중</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Sample Private Brief ─────────────────────────── */}
      <section style={{ background:"#0d0d0b", padding:"7rem 2rem",
        borderTop:"1px solid rgba(201,169,110,0.07)", borderBottom:"1px solid rgba(201,169,110,0.07)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto" }}>
          <FadeUp style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <div style={{ fontSize:"0.56rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>
              SAMPLE PRIVATE BRIEF
            </div>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1.6rem,3.5vw,2.2rem)",
              fontWeight:400, color:"#f5f0e8", marginBottom:"1rem" }}>
              문의 후 받게 될 브리프의 예시입니다
            </h2>
            <p style={{ fontSize:"0.8rem", color:"#555550" }}>
              실제 고객 정보가 아닌 예시 화면입니다.
            </p>
          </FadeUp>

          <FadeUp delay={100}>
            <div style={{ background:"#0a0a08", border:"1px solid rgba(201,169,110,0.18)",
              padding:"2.6rem 2.8rem", position:"relative" }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  position:"absolute", width:"14px", height:"14px",
                  borderColor:"rgba(201,169,110,0.3)", borderStyle:"solid",
                  borderWidth: i===0?"1px 0 0 1px":i===1?"1px 1px 0 0":i===2?"0 0 1px 1px":"0 1px 1px 0",
                  top: i<2?"-1px":"auto", bottom: i>=2?"-1px":"auto",
                  left: i%2===0?"-1px":"auto", right: i%2===1?"-1px":"auto",
                }} />
              ))}

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start",
                marginBottom:"1.8rem", paddingBottom:"1.4rem",
                borderBottom:"1px solid rgba(201,169,110,0.1)" }}>
                <div>
                  <div style={{ fontSize:"0.5rem", letterSpacing:"0.25em", color:"#333330", marginBottom:"0.3rem" }}>REF</div>
                  <div style={{ fontFamily:"monospace", fontSize:"0.72rem", color:"#666660" }}>MP-EXAMPLE-0000</div>
                </div>
                <span style={{ fontSize:"0.54rem", padding:"0.15rem 0.6rem",
                  border:"1px solid rgba(201,169,110,0.35)", color:"#c9a96e", letterSpacing:"0.1em" }}>
                  EXAMPLE
                </span>
              </div>

              <div style={{ display:"grid", gap:"1rem" }}>
                {[
                  ["Requested Item",            "Hermès — Birkin 30, Togo Leather"],
                  ["European Availability",     "파리 부티크 확인 완료 · 재고 보유"],
                  ["Estimated Sourcing Range",  "€9,500 – €10,200 (소싱비·배송비 별도 안내)"],
                  ["Receipt Availability",      "현지 공식 영수증 + 정품 보증서 제공 가능"],
                  ["Customs & Tax Notice",      "관세·부가세는 통관 조건에 따라 별도 산정, 결제 전 고지"],
                  ["Payment Status",            "고객 승인 대기 중 — 결제 요청 미발행"],
                  ["Next Step",                 "승인 시 결제 요청서 발행 → 입금 확인 → 현지 구매 진행"],
                ].map(([label, value]) => (
                  <div key={label} style={{ display:"grid", gridTemplateColumns:"160px 1fr",
                    gap:"1rem", paddingBottom:"0.85rem",
                    borderBottom:"1px solid rgba(201,169,110,0.05)" }}>
                    <div style={{ fontSize:"0.62rem", letterSpacing:"0.06em", color:"#444440" }}>{label}</div>
                    <div style={{ fontSize:"0.76rem", color:"#888880", lineHeight:1.7 }}>{value}</div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize:"0.62rem", color:"#2a2a25", marginTop:"1.6rem", lineHeight:1.8 }}>
                * 실제 브리프는 문의하신 제품과 현지 확인 결과에 따라 구성이 달라질 수 있습니다.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Contact Confidence ───────────────────────────── */}
      <section style={{ background:"#0a0a0a", padding:"6rem 2rem" }}>
        <div style={{ maxWidth:"900px", margin:"0 auto" }}>
          <FadeUp style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <div style={{ fontSize:"0.56rem", letterSpacing:"0.48em", color:"#c9a96e" }}>
              BEFORE YOU REACH OUT
            </div>
          </FadeUp>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"2rem" }}>
            {[
              { symbol:"◈", title:"Private Request Only",  desc:"공개 채팅이나 댓글로 응대하지 않습니다. 모든 상담은 1:1 비공개 문의로만 진행됩니다." },
              { symbol:"◇", title:"24-Hour Response Goal",  desc:"일반적으로 영업일 기준 24시간 이내 회신을 목표로 합니다. 문의량에 따라 다소 지연될 수 있습니다." },
              { symbol:"✦", title:"KakaoTalk & Email Ready", desc:"문의 접수 후 카카오톡 또는 이메일로 담당 컨시어지가 안내드립니다. Private consultation available after request." },
            ].map((c, i) => (
              <FadeUp key={c.title} delay={i * 90}>
                <div style={{ textAlign:"center", padding:"2rem 1.5rem",
                  border:"1px solid rgba(201,169,110,0.08)", background:"#0d0d0b", height:"100%" }}>
                  <div style={{ color:"rgba(201,169,110,0.5)", fontSize:"1.1rem", marginBottom:"1rem" }}>{c.symbol}</div>
                  <div style={{ fontSize:"0.66rem", letterSpacing:"0.14em", color:"#c9a96e", marginBottom:"0.8rem" }}>
                    {c.title.toUpperCase()}
                  </div>
                  <p style={{ fontSize:"0.76rem", color:"#555550", lineHeight:1.9 }}>{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <FadeUp style={{ maxWidth:"820px", margin:"7rem auto", padding:"0 2rem", textAlign:"center" }}>
        <div style={{ display:"flex", gap:"6px", justifyContent:"center", alignItems:"center", marginBottom:"4.5rem" }}>
          <div style={{ flex:1, maxWidth:"100px", height:"1px",
            background:"linear-gradient(to right,transparent,rgba(201,169,110,0.4))" }} />
          <div style={{ width:"7px", height:"7px",
            border:"1px solid rgba(201,169,110,0.5)", transform:"rotate(45deg)", flexShrink:0 }} />
          <div style={{ flex:1, maxWidth:"100px", height:"1px",
            background:"linear-gradient(to left,transparent,rgba(201,169,110,0.4))" }} />
        </div>

        <div style={{ position:"relative", border:"1px solid rgba(201,169,110,0.14)", padding:"6rem 4rem" }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              position:"absolute", width:"22px", height:"22px",
              borderColor:"rgba(201,169,110,0.5)", borderStyle:"solid",
              borderWidth: i===0?"2px 0 0 2px":i===1?"2px 2px 0 0":i===2?"0 0 2px 2px":"0 2px 2px 0",
              top: i<2?"-1px":"auto", bottom: i>=2?"-1px":"auto",
              left: i%2===0?"-1px":"auto", right: i%2===1?"-1px":"auto",
            }} />
          ))}

          <div style={{ fontSize:"0.56rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"2rem" }}>
            PRIVATE INQUIRY
          </div>
          <h2 style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(1.6rem,3.5vw,2.4rem)", color:"#f5f0e8",
            fontWeight:400, marginBottom:"1.5rem", lineHeight:1.5 }}>
            원하시는 제품이 있으신가요?
          </h2>
          <p style={{ fontSize:"0.85rem", color:"#484840", lineHeight:2, marginBottom:"0.5rem" }}>
            어디에서도 구하기 어려운 제품이라도 조용히 문의해 주세요.
          </p>
          <p style={{ fontSize:"0.79rem", color:"#2d2d28", lineHeight:1.9, marginBottom:"1.5rem" }}>
            파리와 밀라노에서 직접 확인합니다.
          </p>

          {/* Mini trust indicators */}
          <div style={{ display:"flex", justifyContent:"center", gap:"2rem",
            flexWrap:"wrap", marginBottom:"3.5rem" }}>
            {["비공개 상담","전담 컨시어지","현지 직접 확인"].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"center", gap:"0.45rem" }}>
                <span style={{ color:"rgba(201,169,110,0.5)", fontSize:"0.5rem" }}>◆</span>
                <span style={{ fontSize:"0.65rem", color:"#3a3a35", letterSpacing:"0.1em" }}>{t}</span>
              </div>
            ))}
          </div>

          <Link href="/request" className="lux-btn-shine" style={{ textDecoration:"none",
            display:"inline-block", background:"#c9a96e", color:"#0a0a0a",
            padding:"1.2rem 4rem", fontSize:"0.71rem",
            letterSpacing:"0.28em", fontWeight:600 }}>
            VIP REQUEST →
          </Link>
        </div>

        <div style={{ display:"flex", gap:"8px", justifyContent:"center", alignItems:"center", marginTop:"4.5rem" }}>
          <div style={{ width:"28px", height:"1px",
            background:"linear-gradient(to right,transparent,rgba(201,169,110,0.25))" }} />
          <span style={{ fontSize:"0.52rem", letterSpacing:"0.32em", color:"#282823" }}>MAISON PRIVÉ</span>
          <div style={{ width:"28px", height:"1px",
            background:"linear-gradient(to left,transparent,rgba(201,169,110,0.25))" }} />
        </div>
      </FadeUp>

      <Footer />
    </>
  );
}
