import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const steps = [
  { num:"01", title:"Private Request",   sub:"비공개 문의 접수",     desc:"원하시는 브랜드, 제품명, 예산, 배송 방식을 VIP 문의 폼으로 전송합니다. 선호 브랜드·색상·위시리스트 등 VIP 프로필도 함께 등록할 수 있습니다. 모든 정보는 담당 컨시어지만 확인합니다.", detail:"문의 즉시 접수 확인 메시지 발송 (카카오톡 또는 이메일)", duration:"즉시" },
  { num:"02", title:"European Check",    sub:"현지 재고 확인",        desc:"파리 또는 밀라노 현지 파트너가 해당 부티크에 직접 방문하거나 연락하여 재고 가용 여부를 확인합니다.", detail:"현지 부티크 직접 방문 또는 전화 확인 / 사진 자료 수집", duration:"1–3 영업일" },
  { num:"03", title:"Private Brief",     sub:"견적서 발송",           desc:"현지 정가, 소싱 서비스 비용, 국제 배송비, 예상 관세 및 부가세를 포함한 Private Brief를 발송합니다. 문의 접수만으로 구매가 확정되지 않으며, 본 단계의 견적은 참고용입니다.", detail:"카카오톡 또는 이메일로 상세 견적서 전달", duration:"견적 검토 후 회신" },
  { num:"04", title:"Client Approval",   sub:"고객 승인",             desc:"고객께서 Private Brief를 검토하신 후 소싱 진행 여부를 결정합니다. 승인 전까지는 어떠한 비용도 발생하지 않으며, 가격 변동 시 사전 안내드립니다.", detail:"승인 또는 보류 의사를 컨시어지에게 회신", duration:"고객 회신 시점" },
  { num:"05", title:"Payment Request",   sub:"결제 요청서 발행",      desc:"승인 후 총 결제 금액(현지가·소싱수수료·배송비·관세 포함)과 결제 기한을 담은 결제 요청서가 발행됩니다. 현재는 무통장 입금(계좌이체) 방식으로 안내드리며, 카드결제 PG는 추후 도입됩니다.", detail:"/track 페이지에서 결제 요청 내역 및 계좌 안내 확인 가능", duration:"승인 즉시" },
  { num:"06", title:"Boutique Purchase", sub:"현지 부티크 구매",      desc:"입금 확인 즉시 파리·밀라노 현지 파트너가 공식 부티크에서 직접 구매를 진행합니다. 구매 영수증과 정품 보증서를 함께 준비합니다.", detail:"정품 보증서, 영수증, 구매 사진(검수 자료) 제공", duration:"1–5 영업일" },
  { num:"07", title:"Private Delivery",  sub:"안전한 배송",           desc:"보험 처리된 국제 특송으로 한국까지 안전하게 전달합니다. 통관 절차 및 세금 관련 안내도 함께 제공합니다.", detail:"FedEx / DHL 국제 특송 / 실시간 배송 추적 / 통관 서류 지원", duration:"3–7 영업일 (통관 포함)" },
];

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <section style={{ padding:"8rem 2rem 3rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.6rem", letterSpacing:"0.4em", color:"#c9a96e", marginBottom:"1.5rem" }}>HOW IT WORKS</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:400, color:"#f5f0e8", marginBottom:"1.5rem" }}>The MAISON PRIVÉ Process</h1>
        <p style={{ fontSize:"0.88rem", color:"#555550", lineHeight:1.9, maxWidth:"560px", margin:"0 auto" }}>처음부터 끝까지 투명하고 안전하게.<br />단 하나의 제품을 위해 파리·밀라노와 서울이 움직입니다.</p>
      </section>

      <section style={{ maxWidth:"880px", margin:"0 auto", padding:"0 2rem" }}>
        <div style={{ background:"#0d0d0b", border:"1px solid rgba(201,169,110,0.1)",
          padding:"1.6rem 2rem", marginBottom:"3rem", display:"flex", gap:"1rem", alignItems:"flex-start" }}>
          <span style={{ color:"rgba(201,169,110,0.5)", fontSize:"0.8rem", flexShrink:0, marginTop:"1px" }}>◈</span>
          <p style={{ fontSize:"0.76rem", color:"#555550", lineHeight:1.9 }}>
            본 문의는 소싱 진행 의사 확인을 위한 것이며, 접수만으로 구매가 확정되지 않습니다.
            고객 승인 이후 결제 요청서가 발행되며, 현재는 무통장 입금(계좌이체) 방식으로 안내드립니다.
            진행 현황은 <Link href="/track" style={{ color:"#c9a96e", textDecoration:"none" }}>/track</Link> 페이지에서 언제든 확인하실 수 있습니다.
          </p>
        </div>

        {steps.map((step,i)=>(
          <div key={step.num} style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:"2rem", paddingBottom:"3rem", marginBottom:"3rem", borderBottom:i<steps.length-1?"1px solid rgba(201,169,110,0.07)":"none", alignItems:"start" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{ width:"52px", height:"52px", border:"1px solid rgba(201,169,110,0.28)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Georgia,serif", fontSize:"0.85rem", color:"#c9a96e", letterSpacing:"0.05em", flexShrink:0 }}>{step.num}</div>
              {i<steps.length-1 && <div style={{ width:"1px", flex:1, minHeight:"36px", background:"linear-gradient(to bottom,rgba(201,169,110,0.25),transparent)", marginTop:"1rem" }} />}
            </div>
            <div style={{ paddingTop:"0.7rem" }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:"1rem", marginBottom:"0.5rem", flexWrap:"wrap" }}>
                <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.35rem", fontWeight:400, color:"#f5f0e8" }}>{step.title}</h2>
                <span style={{ fontSize:"0.7rem", letterSpacing:"0.1em", color:"#666660" }}>{step.sub}</span>
              </div>
              <p style={{ fontSize:"0.86rem", color:"#555550", lineHeight:1.9, marginBottom:"1.2rem" }}>{step.desc}</p>
              <div style={{ background:"#161616", border:"1px solid rgba(201,169,110,0.07)", padding:"0.9rem 1.2rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
                <span style={{ fontSize:"0.73rem", color:"#444440" }}>{step.detail}</span>
                <span style={{ fontSize:"0.62rem", letterSpacing:"0.12em", color:"#c9a96e", whiteSpace:"nowrap", borderLeft:"1px solid rgba(201,169,110,0.18)", paddingLeft:"1rem" }}>{step.duration}</span>
              </div>
            </div>
          </div>
        ))}

        <div style={{ textAlign:"center", marginTop:"4rem" }}>
          <p style={{ fontSize:"0.86rem", color:"#555550", marginBottom:"2rem" }}>지금 바로 첫 번째 단계를 시작해보세요.</p>
          <Link href="/request" style={{ textDecoration:"none", display:"inline-block", background:"#c9a96e", color:"#0a0a0a", padding:"1rem 3rem", fontSize:"0.74rem", letterSpacing:"0.2em", fontWeight:500 }}>VIP REQUEST →</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
