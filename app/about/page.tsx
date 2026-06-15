import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <section style={{ paddingTop:"12rem", paddingBottom:"4rem", padding:"12rem 2rem 4rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.6rem", letterSpacing:"0.4em", color:"#c9a96e", marginBottom:"1.5rem" }}>ABOUT MAISON PRIVÉ</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:400, color:"#f5f0e8", marginBottom:"2rem" }}>
          A Family Network.<br /><span style={{ color:"#c9a96e" }}>A Private Bridge.</span>
        </h1>
        <p style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color:"#555550", lineHeight:2, maxWidth:"640px", margin:"0 auto" }}>
          MAISON PRIVÉ는 한국과 파리를 잇는 가족 네트워크에서 시작된 프라이빗 럭셔리 소싱 서비스입니다.
        </p>
      </section>

      <section style={{ maxWidth:"1100px", margin:"0 auto 8rem", padding:"0 2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"5rem", alignItems:"start" }}>
          <div>
            <div style={{ width:"1px", height:"70px", background:"linear-gradient(to bottom,#c9a96e,transparent)", marginBottom:"2rem" }} />
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.7rem", fontWeight:400, color:"#f5f0e8", marginBottom:"1.5rem", lineHeight:1.4 }}>파리에서 시작된<br />진심 어린 연결</h2>
            <p style={{ fontSize:"0.86rem", color:"#555550", lineHeight:2, marginBottom:"1.5rem" }}>
              서울과 파리를 넘나드는 가족 간의 신뢰에서 이 서비스는 시작되었습니다. 현지 부티크와 오랫동안 관계를 쌓아온 유럽 파트너들이 국내에서는 절대 구할 수 없는 제품들을 직접 확인하고 연결합니다.
            </p>
            <p style={{ fontSize:"0.86rem", color:"#555550", lineHeight:2 }}>
              이것은 단순한 대리 구매가 아닙니다. 고객의 취향과 기준에 맞게, 조용하고 신중하게, 가장 특별한 제품을 찾아드리는 컨시어지 경험입니다.
            </p>
          </div>
          <div style={{ border:"1px solid rgba(201,169,110,0.13)", padding:"3rem", background:"#111111" }}>
            <div style={{ fontSize:"0.6rem", letterSpacing:"0.28em", color:"#c9a96e", marginBottom:"2rem" }}>OUR NETWORK</div>
            {[
              { city:"PARIS", desc:"생토노레, 몽테뉴 애비뉴 현지 파트너 네트워크", role:"European Family Network" },
              { city:"MILAN", desc:"몬테나폴레오네 거리 주요 부티크 연결", role:"Private Sourcing Partner" },
              { city:"SEOUL", desc:"한국 고객 전담 컨시어지 창구", role:"Korea Operations" },
            ].map(n=>(
              <div key={n.city} style={{ borderBottom:"1px solid rgba(201,169,110,0.07)", paddingBottom:"1.5rem", marginBottom:"1.5rem" }}>
                <div style={{ fontSize:"0.68rem", letterSpacing:"0.28em", color:"#c9a96e", marginBottom:"0.5rem" }}>{n.city}</div>
                <div style={{ fontSize:"0.82rem", color:"#f5f0e8", marginBottom:"0.3rem" }}>{n.desc}</div>
                <div style={{ fontSize:"0.7rem", color:"#444440" }}>{n.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:"#111111", borderTop:"1px solid rgba(201,169,110,0.07)", borderBottom:"1px solid rgba(201,169,110,0.07)", padding:"8rem 2rem" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:"0.6rem", letterSpacing:"0.4em", color:"#c9a96e", marginBottom:"1.5rem" }}>OUR VALUES</div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:400, color:"#f5f0e8", marginBottom:"5rem" }}>Discretion. Integrity. Excellence.</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"3rem" }}>
            {[
              { icon:"◈", title:"Discretion", desc:"고객의 모든 정보와 구매 내역은 철저히 비밀이 보장됩니다." },
              { icon:"◇", title:"Integrity",  desc:"투명한 가격 안내. 숨겨진 수수료 없이 모든 내역을 명확하게 안내합니다." },
              { icon:"◉", title:"Excellence", desc:"단 한 건의 의뢰도 소홀히 하지 않습니다. 최고의 제품을 최고의 방식으로." },
            ].map(v=>(
              <div key={v.title} style={{ padding:"2rem" }}>
                <div style={{ fontSize:"1.8rem", color:"#c9a96e", opacity:0.55, marginBottom:"1.5rem" }}>{v.icon}</div>
                <h3 style={{ fontFamily:"Georgia,serif", fontSize:"1.15rem", color:"#f5f0e8", fontWeight:400, marginBottom:"1rem" }}>{v.title}</h3>
                <p style={{ fontSize:"0.8rem", color:"#555550", lineHeight:1.9 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
