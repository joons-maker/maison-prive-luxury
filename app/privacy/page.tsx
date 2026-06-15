// 임시 개인정보처리방침 — 법무 검토 전 초안. 배포 전 실제 사업자 정보 및 법무 검토 필요.
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = { title: "개인정보처리방침 | MAISON PRIVÉ" };

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom:"3rem" }}>
    <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.05rem", fontWeight:400,
      color:"#c9a96e", marginBottom:"1rem", letterSpacing:"0.05em" }}>{title}</h2>
    <div style={{ fontSize:"0.84rem", color:"#555550", lineHeight:2.1 }}>{children}</div>
  </div>
);

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <section style={{ padding:"8rem 2rem 3rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.57rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>PRIVACY</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1.8rem,4vw,2.8rem)",
          fontWeight:400, color:"#f5f0e8", marginBottom:"1rem" }}>개인정보처리방침</h1>
        <p style={{ fontSize:"0.78rem", color:"#333330" }}>
          시행일: 2024년 1월 1일 &nbsp;·&nbsp; 본 방침은 법무 검토 전 초안입니다.
        </p>
      </section>

      <section style={{ maxWidth:"720px", margin:"2rem auto 8rem", padding:"0 2rem" }}>
        <Section title="1. 수집하는 개인정보 항목">
          <p>MAISON PRIVÉ는 VIP 문의 접수 및 서비스 제공을 위해 아래 항목을 수집합니다.</p>
          <ul style={{ marginTop:"0.8rem", paddingLeft:"1.2rem" }}>
            <li>필수 항목: 성함, 연락처(전화번호), 이메일 주소</li>
            <li>선택 항목: 카카오톡 ID, 희망 브랜드, 희망 제품명, 예상 예산, 제품 참고 이미지, 요청 내용</li>
          </ul>
        </Section>

        <Section title="2. 개인정보 수집 및 이용 목적">
          <ul style={{ paddingLeft:"1.2rem" }}>
            <li>VIP 문의 접수 및 상담 응대</li>
            <li>유럽 현지 제품 소싱 서비스 제공</li>
            <li>견적 안내 및 결과 전달</li>
            <li>서비스 완료 후 사후 안내</li>
          </ul>
          <p style={{ marginTop:"0.8rem" }}>수집된 정보는 위 목적 이외의 용도로 사용하지 않습니다.</p>
        </Section>

        <Section title="3. 개인정보 보유 및 이용 기간">
          <p>서비스 완료 후 지체 없이 파기합니다. 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관할 수 있습니다.</p>
        </Section>

        <Section title="4. 개인정보의 제3자 제공">
          <p>고객의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 서비스 제공을 위해 유럽 현지 파트너와 최소한의 정보를 공유할 수 있으며, 이 경우 사전에 안내드립니다.</p>
        </Section>

        <Section title="5. 개인정보 처리 위탁">
          <ul style={{ paddingLeft:"1.2rem" }}>
            <li>Supabase Inc. — 데이터베이스 및 파일 저장 (미국 소재, GDPR 준수)</li>
            <li>Resend Inc. — 이메일 알림 발송 (서비스 운영 목적)</li>
          </ul>
        </Section>

        <Section title="6. 정보주체의 권리">
          <p>고객은 언제든지 아래 권리를 행사할 수 있습니다.</p>
          <ul style={{ marginTop:"0.8rem", paddingLeft:"1.2rem" }}>
            <li>개인정보 열람 요청</li>
            <li>개인정보 정정·삭제 요청</li>
            <li>개인정보 처리 정지 요청</li>
          </ul>
          <p style={{ marginTop:"0.8rem" }}>문의: contact@maisonprive.kr</p>
        </Section>

        <Section title="7. 개인정보 보호책임자">
          <p>이메일: contact@maisonprive.kr<br />
          (실제 사업자 정보는 배포 전 확정 예정)</p>
        </Section>

        <div style={{ padding:"1.5rem", border:"1px solid rgba(201,169,110,0.08)",
          background:"#0d0d0b", fontSize:"0.73rem", color:"#333330", lineHeight:2 }}>
          본 개인정보처리방침은 법무 검토 전 초안으로, 실제 서비스 운영 전 전문가 검토 후 확정됩니다.
        </div>
      </section>
      <Footer />
    </>
  );
}
