"use client";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "정품인지 어떻게 확인할 수 있나요?",
    a: "모든 제품은 파리 또는 밀라노의 공식 브랜드 부티크에서 직접 구매합니다. 구매 시 발행되는 공식 영수증(영문)과 브랜드 정품 보증서를 함께 제공하며, 구매 현장 사진을 찍어 공유해 드립니다. 부티크 측 직원이 발급하는 공식 서류이므로 정품 진위를 직접 확인하실 수 있습니다.",
  },
  {
    q: "구매 증빙(영수증)을 받을 수 있나요?",
    a: "네, 반드시 제공해 드립니다. 현지 공식 부티크에서 발행한 영문 영수증, 브랜드 정품 보증서, 쇼핑백·박스 등 풀 세트를 그대로 전달합니다. 구매 시 사진으로 기록하여 투명하게 공유해 드립니다.",
  },
  {
    q: "관세·부가세는 어떻게 처리되나요?",
    a: "제품의 종류, 가격, 통관 조건에 따라 관세와 부가세가 달라질 수 있습니다. 견적 단계에서 예상 세금을 포함한 최종 비용을 투명하게 안내해 드리므로, 추후 예기치 않은 추가 비용은 발생하지 않습니다. 통관 서류 지원도 함께 제공합니다.",
  },
  {
    q: "희소 제품이나 구하기 어려운 아이템도 가능한가요?",
    a: "가능합니다. 에르메스 버킨·켈리처럼 국내에서 구하기 어려운 제품, 전 세계 극소 수량 한정판, 일부 국가 한정 발매 아이템, 부티크 only 제품 등이 주요 의뢰 품목입니다. 현지 파트너가 직접 부티크를 방문하여 가용 여부를 확인합니다. 재고가 없을 경우 솔직하게 안내드리며, 이 경우 비용은 발생하지 않습니다.",
  },
  {
    q: "고객 정보는 어떻게 보호되나요?",
    a: "고객의 이름, 연락처, 구매 내역 등 모든 정보는 철저히 비공개로 관리됩니다. 어떠한 경우에도 제3자에게 공개되지 않으며, 담당 컨시어지 외에는 접근이 불가합니다. 서비스 완료 후에는 개인정보를 파기합니다.",
  },
  {
    q: "공식 브랜드와 제휴된 서비스인가요?",
    a: "MAISON PRIVÉ는 특정 브랜드의 공식 대리점 또는 공식 파트너가 아닙니다. 고객의 요청에 따라 유럽 현지에서 제품 확인 및 구매 연결을 지원하는 프라이빗 소싱 컨시어지 서비스입니다. 모든 구매는 공식 부티크에서 이루어지며, 브랜드 측 공식 서류(영수증·보증서)가 그대로 제공됩니다.",
  },
  {
    q: "소싱 비용(수수료)은 어떻게 책정되나요?",
    a: "소싱 비용은 제품의 종류, 희소성, 현지 방문 횟수, 소싱 난이도에 따라 달라집니다. 견적 단계에서 현지 정가, 소싱 서비스 비용, 국제 배송비, 예상 세금을 모두 포함한 최종 금액을 투명하게 안내해 드립니다. 숨겨진 수수료는 없습니다.",
  },
  {
    q: "환불이나 취소는 어떻게 되나요?",
    a: "현지 공식 부티크에서 구매가 완료된 이후에는 제품 특성상 교환·환불이 어렵습니다. 다만 현지 확인 결과 재고 없음 또는 의뢰하신 조건과 맞지 않는 경우, 진행 전에 반드시 고객 확인을 받습니다. 결제는 현지 구매 확인 후 진행되므로 실물 미확인 결제는 발생하지 않습니다.",
  },
  {
    q: "배송은 얼마나 걸리나요?",
    a: "현지 구매 완료 후 FedEx 또는 DHL 국제 특송을 이용합니다. 통관 절차 포함 일반적으로 5–10 영업일이 소요됩니다. 실시간 배송 추적 번호를 제공하며, 통관 관련 서류 지원도 함께 드립니다.",
  },
  {
    q: "VIP 멤버십은 어떻게 신청하나요?",
    a: "MAISON PRIVÉ 멤버십은 별도 신청이 아닌 이용 실적에 따라 자동으로 산정됩니다. ÉLITE 등급은 연 3회 이상 이용 시 자동 적용되며, MAISON 등급은 초대 또는 기존 고객 추천으로만 가입됩니다. 등급별 혜택은 멤버십 페이지에서 확인하실 수 있습니다.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen(!open)}
        style={{ width:"100%", background:"none", border:"none", cursor:"pointer",
          padding:"2rem 0", display:"flex", justifyContent:"space-between",
          alignItems:"flex-start", gap:"2rem", textAlign:"left" }}>
        <span style={{ fontFamily:"Georgia,serif", fontSize:"0.97rem",
          color: open ? "#c9a96e" : "#f5f0e8", lineHeight:1.65,
          transition:"color 0.3s" }}>
          {q}
        </span>
        <span style={{ color:"#c9a96e", fontSize:"1.1rem", flexShrink:0,
          transition:"transform 0.35s", transform: open ? "rotate(45deg)" : "none",
          marginTop:"2px" }}>
          +
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom:"2rem", paddingRight:"2rem" }}>
          <p style={{ fontSize:"0.84rem", color:"#555550", lineHeight:2 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <Nav />
      <section style={{ padding:"8rem 2rem 3rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0,
          background:"radial-gradient(ellipse 80% 55% at 50% 40%, rgba(201,169,110,0.05) 0%, transparent 65%)",
          pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:"0.57rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>FAQ</div>
          <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(2rem,5vw,3.5rem)",
            fontWeight:400, color:"#f5f0e8", marginBottom:"1.5rem" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize:"0.87rem", color:"#555550", lineHeight:1.9,
            maxWidth:"480px", margin:"0 auto" }}>
            VIP 고객분들이 가장 많이 물어보시는 질문들을 정리했습니다.
          </p>
        </div>
      </section>

      <section style={{ maxWidth:"800px", margin:"4rem auto 8rem", padding:"0 2rem" }}>
        {faqs.map(f => <Item key={f.q} q={f.q} a={f.a} />)}

        <div style={{ marginTop:"5rem", padding:"2.5rem", border:"1px solid rgba(201,169,110,0.08)", background:"#0d0d0b" }}>
          <div style={{ fontSize:"0.57rem", letterSpacing:"0.3em", color:"#c9a96e", marginBottom:"1.2rem" }}>
            LEGAL NOTICE
          </div>
          <p style={{ fontSize:"0.73rem", color:"#333330", lineHeight:2.1 }}>
            본 서비스는 공식 브랜드 판매점 또는 공식 대리점을 사칭하지 않습니다.
            고객 요청에 따라 유럽 현지에서 제품 확인 및 구매 연결을 지원하는 프라이빗 소싱 컨시어지 서비스입니다.
            관세, 부가세, 개별소비세 등 수입 관련 비용은 제품과 통관 조건에 따라 달라질 수 있으며,
            최종 진행 전 별도 안내됩니다.
          </p>
        </div>

        <div style={{ textAlign:"center", marginTop:"5rem" }}>
          <p style={{ fontSize:"0.84rem", color:"#3a3a35", marginBottom:"2rem" }}>
            더 궁금한 점이 있으신가요?
          </p>
          <Link href="/request" style={{ textDecoration:"none",
            display:"inline-block", border:"1px solid rgba(201,169,110,0.25)",
            color:"#c9a96e", padding:"0.9rem 2.8rem",
            fontSize:"0.7rem", letterSpacing:"0.22em" }}>
            1:1 비공개 문의하기 →
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
