import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const steps = [
  { num:"01", title:"Request",  sub:"비공개 문의 접수",  desc:"원하시는 브랜드, 제품명, 예산, 배송 방식을 VIP 문의 폼으로 전송합니다. 모든 정보는 담당자만 확인합니다.", detail:"문의 즉시 접수 확인 메시지 발송 (카카오톡 또는 이메일)", duration:"즉시" },
  { num:"02", title:"Confirm",  sub:"현지 재고 확인",    desc:"파리 또는 밀라노 현지 파트너가 해당 부티크에 직접 방문하거나 연락하여 재고 가용 여부를 확인합니다.", detail:"현지 부티크 직접 방문 또는 전화 확인 / 사진 자료 수집", duration:"1–3 영업일" },
  { num:"03", title:"Quote",    sub:"견적 제공",          desc:"현지 정가, 소싱 서비스 비용, 국제 배송비, 예상 관세 및 부가세를 포함한 최종 견적을 발송합니다.", detail:"카카오톡 또는 이메일로 상세 견적서 전달", duration:"견적 검토 후 회신" },
  { num:"04", title:"Payment",  sub:"결제 진행",          desc:"견적 수락 후 안전한 결제 채널을 통해 진행합니다. 결제 확인 후 현지 파트너에게 구매를 지시합니다.", detail:"보안 결제 채널 / 에스크로 방식 (상담 후 결정)", duration:"당일" },
  { num:"05", title:"Source",   sub:"현지 구매 진행",    desc:"파리·밀라노 현지 파트너가 공식 부티크에서 직접 구매합니다. 구매 영수증과 정품 보증서를 함께 준비합니다.", detail:"정품 보증서, 영수증, 구매 사진 제공", duration:"1–5 영업일" },
  { num:"06", title:"Deliver",  sub:"안전한 배송",        desc:"보험 처리된 국제 특송으로 한국까지 배송합니다. 통관 절차 및 세금 관련 안내도 함께 제공합니다.", detail:"FedEx / DHL 국제 특송 / 실시간 배송 추적 / 통관 서류 지원", duration:"3–7 영업일 (통관 포함)" },
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

      <section style={{ maxWidth:"880px", margin:"4rem auto 8rem", padding:"0 2rem" }}>
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
