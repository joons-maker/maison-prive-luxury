import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const tiers = [
  { tier:"PRIVÉ",  sub:"First Experience",  desc:"첫 의뢰 고객. 프라이빗 소싱 경험을 시작하는 단계입니다.", highlight:false, note:"문의 접수 후 담당자 연락", cta:"START INQUIRY →",
    features:["단건 소싱 의뢰","현지 재고 확인 및 견적 제공","보안 결제 채널 안내","정품 보증서 포함","국내 배송 서비스"] },
  { tier:"ÉLITE",  sub:"Preferred Client",   desc:"연 3회 이상 이용 고객. 우선 응대와 전담 채널이 제공됩니다.", highlight:true,  note:"이용 실적 기준 자동 승급", cta:"START INQUIRY →",
    features:["우선 소싱 접수 처리","전담 KakaoTalk 채널","신제품 출시 사전 알림","복수 제품 동시 의뢰","세금 환급 처리 지원","연 2회 유럽 현지 동행 할인"] },
  { tier:"MAISON", sub:"Private Member",     desc:"최상위 VIP. 전담 컨시어지가 배정되어 모든 니즈를 프라이빗하게 처리합니다.", highlight:false, note:"초대 또는 추천으로만 가입", cta:"INVITATION ONLY",
    features:["전담 컨시어지 1:1 배정","한정판 우선 예약 알림","파리·밀라노 현지 쇼핑 동행","연간 소싱 플랜 수립","인테리어·선물 큐레이션","비공개 네트워크 이벤트 초대","24시간 우선 응대"] },
];

export default function MembershipPage() {
  return (
    <>
      <Nav />
      <section style={{ padding:"12rem 2rem 4rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.6rem", letterSpacing:"0.4em", color:"#c9a96e", marginBottom:"1.5rem" }}>VIP MEMBERSHIP</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:400, color:"#f5f0e8", marginBottom:"1.5rem" }}>For Those Who Expect More</h1>
        <p style={{ fontSize:"0.88rem", color:"#555550", lineHeight:1.9, maxWidth:"560px", margin:"0 auto" }}>멤버십은 신청하는 것이 아니라 경험을 통해 얻어지는 것입니다.</p>
      </section>

      <section style={{ maxWidth:"1200px", margin:"4rem auto 8rem", padding:"0 2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1px", background:"rgba(201,169,110,0.07)" }}>
          {tiers.map(t=>(
            <div key={t.tier} style={{ background:t.highlight?"#130f00":"#111111", padding:"3.5rem 2.5rem", position:"relative", border:t.highlight?"1px solid rgba(201,169,110,0.3)":"none" }}>
              {t.highlight && <div style={{ position:"absolute", top:"-1px", left:"50%", transform:"translateX(-50%)", background:"#c9a96e", color:"#0a0a0a", fontSize:"0.56rem", letterSpacing:"0.22em", padding:"0.28rem 1rem", fontWeight:600 }}>MOST POPULAR</div>}
              <div style={{ fontFamily:"Georgia,serif", fontSize:"1.7rem", letterSpacing:"0.12em", color:"#c9a96e", marginBottom:"0.25rem" }}>{t.tier}</div>
              <div style={{ fontSize:"0.62rem", letterSpacing:"0.18em", color:"#444440", marginBottom:"1.5rem" }}>{t.sub.toUpperCase()}</div>
              <div style={{ height:"1px", background:"linear-gradient(to right,rgba(201,169,110,0.28),transparent)", marginBottom:"1.5rem" }} />
              <p style={{ fontSize:"0.8rem", color:"#555550", lineHeight:1.8, marginBottom:"2rem" }}>{t.desc}</p>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 2.5rem", display:"flex", flexDirection:"column", gap:"0.72rem" }}>
                {t.features.map(f=>(
                  <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.7rem" }}>
                    <span style={{ color:"#c9a96e", fontSize:"0.65rem", marginTop:"0.15rem" }}>✦</span>
                    <span style={{ fontSize:"0.8rem", color:"#777770" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <div style={{ fontSize:"0.67rem", color:"#333330", borderTop:"1px solid rgba(201,169,110,0.07)", paddingTop:"1.5rem", marginBottom:"2rem", fontStyle:"italic" }}>{t.note}</div>
              <Link href="/request" style={{ textDecoration:"none", display:"block", textAlign:"center", padding:"0.85rem", fontSize:"0.67rem", letterSpacing:"0.18em", background:t.highlight?"#c9a96e":"transparent", color:t.highlight?"#0a0a0a":"#c9a96e", border:t.highlight?"none":"1px solid rgba(201,169,110,0.25)" }}>
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:"3.5rem", padding:"2rem", border:"1px solid rgba(201,169,110,0.08)" }}>
          <p style={{ fontSize:"0.8rem", color:"#444440", lineHeight:2 }}>멤버십 등급은 별도의 비용 없이 이용 실적에 따라 자동 산정됩니다.<br />모든 이용 내역은 철저히 비공개로 관리됩니다.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
