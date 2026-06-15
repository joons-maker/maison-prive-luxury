// 임시 이용약관 — 법무 검토 전 초안. 배포 전 실제 사업자 정보 및 법무 검토 필요.
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = { title: "이용약관 | MAISON PRIVÉ" };

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom:"3rem" }}>
    <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.05rem", fontWeight:400,
      color:"#c9a96e", marginBottom:"1rem", letterSpacing:"0.05em" }}>{title}</h2>
    <div style={{ fontSize:"0.84rem", color:"#555550", lineHeight:2.1 }}>{children}</div>
  </div>
);

export default function TermsPage() {
  return (
    <>
      <Nav />
      <section style={{ padding:"8rem 2rem 3rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.57rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>TERMS</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1.8rem,4vw,2.8rem)",
          fontWeight:400, color:"#f5f0e8", marginBottom:"1rem" }}>이용약관</h1>
        <p style={{ fontSize:"0.78rem", color:"#333330" }}>
          시행일: 2024년 1월 1일 &nbsp;·&nbsp; 본 약관은 법무 검토 전 초안입니다.
        </p>
      </section>

      <section style={{ maxWidth:"720px", margin:"2rem auto 8rem", padding:"0 2rem" }}>
        <Section title="제1조 (목적)">
          <p>본 약관은 MAISON PRIVÉ(이하 &quot;서비스&quot;)가 제공하는 프라이빗 럭셔리 소싱 컨시어지 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.</p>
        </Section>

        <Section title="제2조 (서비스의 성격)">
          <p>MAISON PRIVÉ는 다음과 같은 서비스를 제공합니다.</p>
          <ul style={{ marginTop:"0.8rem", paddingLeft:"1.2rem" }}>
            <li>유럽(프랑스·이탈리아) 현지 공식 부티크에서의 제품 확인 및 구매 연결</li>
            <li>국제 배송 및 통관 지원</li>
            <li>프라이빗 고객 컨시어지 서비스</li>
          </ul>
          <p style={{ marginTop:"0.8rem" }}>
            본 서비스는 특정 브랜드의 공식 대리점 또는 공식 파트너가 아닙니다.
            모든 구매는 해당 브랜드 공식 부티크를 통해 이루어집니다.
          </p>
        </Section>

        <Section title="제3조 (서비스 이용)">
          <ul style={{ paddingLeft:"1.2rem" }}>
            <li>서비스 이용은 VIP 문의 접수 후 담당자 확인을 통해 진행됩니다.</li>
            <li>현지 재고 상황에 따라 서비스 제공이 불가할 수 있으며, 이 경우 비용이 발생하지 않습니다.</li>
            <li>최종 견적 확인 후 결제가 진행되며, 실물 미확인 선결제는 진행하지 않습니다.</li>
          </ul>
        </Section>

        <Section title="제4조 (취소 및 환불)">
          <ul style={{ paddingLeft:"1.2rem" }}>
            <li>현지 구매 진행 전: 취소 가능, 비용 미발생</li>
            <li>현지 구매 완료 후: 제품 특성상 취소·환불이 어렵습니다.</li>
            <li>단, 배송 중 파손 등 서비스 과실의 경우 별도 협의합니다.</li>
          </ul>
        </Section>

        <Section title="제5조 (면책사항)">
          <ul style={{ paddingLeft:"1.2rem" }}>
            <li>관세, 부가세, 개별소비세 등 수입 관련 비용은 고객 부담입니다.</li>
            <li>브랜드 정책 변경으로 인한 구매 제한은 서비스 제공자의 책임이 아닙니다.</li>
            <li>천재지변, 현지 부티크 휴업 등 불가항력적 사유로 인한 지연은 책임지지 않습니다.</li>
          </ul>
        </Section>

        <Section title="제6조 (준거법)">
          <p>본 약관은 대한민국 법률에 따라 해석되며, 분쟁 발생 시 관할 법원은 서울중앙지방법원으로 합니다.</p>
        </Section>

        <Section title="제7조 (약관 변경)">
          <p>서비스는 필요에 따라 약관을 변경할 수 있으며, 변경 시 서비스 화면을 통해 사전 공지합니다.</p>
        </Section>

        <div style={{ padding:"1.5rem", border:"1px solid rgba(201,169,110,0.08)",
          background:"#0d0d0b", fontSize:"0.73rem", color:"#333330", lineHeight:2 }}>
          본 이용약관은 법무 검토 전 초안으로, 실제 서비스 운영 전 전문가 검토 후 확정됩니다.
          사업자 정보(상호, 대표자, 사업자등록번호, 주소)는 배포 전 별도 확정 예정입니다.
        </div>
      </section>
      <Footer />
    </>
  );
}
