import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,110,0.12)", padding: "5rem 2rem 3rem", marginTop: "8rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "3rem", marginBottom: "3.5rem" }}>
          <div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: "1.3rem", letterSpacing: "0.2em", color: "#c9a96e", marginBottom: "0.4rem" }}>MAISON PRIVÉ</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#444440", marginBottom: "1.5rem" }}>PARIS · MILAN</div>
            <p style={{ fontSize: "0.78rem", color: "#555550", lineHeight: 1.9 }}>유럽 현지 네트워크를 통해<br />초고자산가 고객을 위한<br />프라이빗 럭셔리 소싱 서비스</p>
          </div>
          <div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "#c9a96e", marginBottom: "1.5rem" }}>NAVIGATION</div>
            {["/about", "/services", "/membership", "/process", "/faq", "/request", "/track"].map(href => (
              <div key={href} style={{ marginBottom: "0.75rem" }}>
                <Link href={href} style={{ textDecoration: "none", fontSize: "0.75rem", color: "#555550" }}>
                  {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "#c9a96e", marginBottom: "1.5rem" }}>CONTACT</div>
            <p style={{ fontSize: "0.78rem", color: "#555550", lineHeight: 2 }}>
              KakaoTalk: @maisonprive<br />
              Email: contact@maisonprive.kr<br />
              응대: 평일 10:00 – 18:00
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap",
          padding: "1.5rem 0", borderTop: "1px solid rgba(201,169,110,0.08)" }}>
          {[
            ["◈", "Fully Private", "고객 정보 비공개 관리"],
            ["◇", "Direct Boutique", "현지 공식 부티크 직접 구매"],
            ["✦", "No Upfront Fee", "승인 전 비용 발생 없음"],
          ].map(([sym, t, d]) => (
            <div key={t} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", flex: "1 1 180px" }}>
              <span style={{ color: "rgba(201,169,110,0.45)", fontSize: "0.7rem", marginTop: "2px" }}>{sym}</span>
              <div>
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "#888880" }}>{t}</div>
                <div style={{ fontSize: "0.68rem", color: "#3a3a35", marginTop: "1px" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(201,169,110,0.08)", paddingTop: "2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.7rem", color: "#383830", lineHeight: 2 }}>
            본 서비스는 공식 브랜드 판매점 또는 공식 대리점을 사칭하지 않습니다. 고객 요청에 따라 유럽 현지에서 제품 확인 및 구매 연결을 지원하는 프라이빗 소싱 컨시어지 서비스입니다. 관세, 부가세, 개별소비세 등 수입 관련 비용은 제품과 통관 조건에 따라 달라질 수 있으며, 최종 진행 전 별도 안내됩니다. 결제는 고객 승인 이후 발행되는 결제 요청서에 따라 무통장 입금 방식으로 진행되며, 카드결제(PG)는 추후 도입됩니다.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <p style={{ fontSize: "0.68rem", color: "#2a2a25" }}>© 2024 MAISON PRIVÉ. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy" style={{ fontSize: "0.65rem", color: "#2a2a25", textDecoration: "none" }}>개인정보처리방침</Link>
            <Link href="/terms"   style={{ fontSize: "0.65rem", color: "#2a2a25", textDecoration: "none" }}>이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
