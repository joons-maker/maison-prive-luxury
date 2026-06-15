import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const services = [
  { num:"01", icon:"◈", title:"Luxury Bag Sourcing", desc:"에르메스 버킨 & 켈리, 샤넬 클래식 플랩 등 국내 웨이팅 없이 파리·밀라노 현지에서 직접 확인합니다. 원하시는 사이즈, 컬러, 하드웨어 옵션까지 세밀하게 맞춰 소싱합니다.", tags:["파리 생토노레 직접 방문 확인","밀라노 몬테나폴레오네 연결","영수증 및 정품 보증서 포함","컬러·사이즈 맞춤 소싱"] },
  { num:"02", icon:"◇", title:"Fine Jewelry & Watches", desc:"불가리, 카르티에, 반클리프 아펠 희소 주얼리와 파텍 필립, 오데마 피게, 리차드 밀 한정 시계를 유럽 현지에서 소싱합니다.", tags:["스위스·이탈리아 주얼리 하우스 연결","보증서 및 박스 풀 세트","맞춤 인그레이빙 안내","투자 가치 아이템 자문"] },
  { num:"03", icon:"◉", title:"Fashion & Couture", desc:"시즌 컬렉션, 부티크 전용 피스, 쇼룸 한정 아이템. 국내 미발매 컬러웨이나 사이즈도 현지에서 먼저 확인해 드립니다.", tags:["현지 소싱","쇼룸 한정·런웨이 피스","부티크 VIP 예약 동행","시즌 전 프리뷰 의뢰"] },
  { num:"04", icon:"✦", title:"Rare & Limited Items", desc:"전 세계 발매 수량 극소, 부티크 only, 일부 국가 한정 출시 제품. 구하기 어렵다고 포기하지 마세요.", tags:["한정 수량 즉시 확인","온라인 미발매 오프라인 전용","아티스트 콜라보 한정판","빈티지 희소 아이템"] },
  { num:"05", icon:"◎", title:"Personal Shopping in Europe", desc:"파리 또는 밀라노 방문 시 현지 파트너가 부티크 예약부터 쇼핑 동행, 세금 환급 처리까지 함께합니다.", tags:["부티크 VIP 사전 예약","전문 파트너 동행 쇼핑","Tax Refund 지원","현지 물류·포장 서비스"] },
  { num:"06", icon:"◐", title:"Private Client Concierge", desc:"정기 이용 VIP 고객을 위한 전담 컨시어지. 신제품 출시 즉시 알림, 우선 확인 서비스, 연간 의뢰 패키지를 제공합니다.", tags:["전담 담당자 1:1 배정","신제품 출시 즉시 알림","우선 소싱 및 빠른 응대","연간 이용권 패키지"] },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <section style={{ padding:"12rem 2rem 4rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.6rem", letterSpacing:"0.4em", color:"#c9a96e", marginBottom:"1.5rem" }}>OUR SERVICES</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:400, color:"#f5f0e8", marginBottom:"1.5rem" }}>What We Source for You</h1>
        <p style={{ fontSize:"0.88rem", color:"#555550", lineHeight:1.9, maxWidth:"540px", margin:"0 auto" }}>아무나 이용하는 서비스가 아닙니다.<br />조용히, 프라이빗하게, 원하시는 것을 찾아드립니다.</p>
      </section>

      <section style={{ maxWidth:"1100px", margin:"4rem auto 8rem", padding:"0 2rem" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:"rgba(201,169,110,0.07)" }}>
          {services.map(s=>(
            <div key={s.num} className="lux-service-row">
              <div className="lux-service-row-num" style={{ fontFamily:"Georgia,serif", fontSize:"2.2rem", color:"rgba(201,169,110,0.18)", lineHeight:1 }}>{s.num}</div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"0.9rem" }}>
                  <span style={{ color:"#c9a96e", fontSize:"1rem" }}>{s.icon}</span>
                  <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.15rem", fontWeight:400, color:"#f5f0e8" }}>{s.title}</h2>
                </div>
                <p style={{ fontSize:"0.83rem", color:"#666660", lineHeight:1.9, marginBottom:"1.3rem" }}>{s.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                  {s.tags.map(t=>(
                    <span key={t} style={{ fontSize:"0.67rem", color:"#666660", border:"1px solid rgba(201,169,110,0.13)", padding:"0.25rem 0.7rem" }}>{t}</span>
                  ))}
                </div>
              </div>
              <Link href="/request" className="lux-service-row-inquire" style={{ textDecoration:"none", fontSize:"0.62rem", letterSpacing:"0.18em", color:"#c9a96e", border:"1px solid rgba(201,169,110,0.25)", padding:"0.55rem 1.1rem", whiteSpace:"nowrap", alignSelf:"center" }}>
                INQUIRE →
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
