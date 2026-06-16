"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";

const inp: React.CSSProperties = {
  width:"100%", background:"#0e0e0c",
  border:"1px solid rgba(201,169,110,0.18)", color:"#f5f0e8",
  padding:"0.95rem 1.1rem", fontSize:"0.87rem",
  outline:"none", boxSizing:"border-box",
  transition:"border-color 0.3s, background 0.3s",
};
const lbl: React.CSSProperties = {
  display:"block", fontSize:"0.59rem",
  letterSpacing:"0.22em", color:"#888880", marginBottom:"0.55rem",
};
const sel: React.CSSProperties = {
  ...inp, appearance:"none", cursor:"pointer",
};

type State = "idle"|"uploading"|"submitting"|"success"|"error";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label style={lbl}>{label}</label>{children}</div>;
}

function SecHead({ num, title, sub, tag }: { num: string; title: string; sub: string; tag?: "REQUIRED"|"OPTIONAL" }) {
  return (
    <div style={{ marginBottom:"2.5rem" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"0.5rem", flexWrap:"wrap" }}>
        <span style={{ fontFamily:"Georgia,serif", fontSize:"1.8rem",
          color:"rgba(201,169,110,0.15)", lineHeight:1 }}>{num}</span>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", flexWrap:"wrap" }}>
            <div style={{ fontSize:"0.6rem", letterSpacing:"0.28em", color:"#c9a96e" }}>{title}</div>
            {tag && (
              <span style={{ fontSize:"0.5rem", letterSpacing:"0.14em",
                padding:"0.1rem 0.45rem",
                color: tag==="REQUIRED" ? "#c9a96e" : "#555550",
                border:`1px solid ${tag==="REQUIRED" ? "rgba(201,169,110,0.35)" : "rgba(80,80,75,0.3)"}`,
              }}>{tag}</span>
            )}
          </div>
          <div style={{ fontSize:"0.75rem", color:"#444440", marginTop:"2px" }}>{sub}</div>
        </div>
      </div>
      <div style={{ height:"1px", background:"linear-gradient(to right,rgba(201,169,110,0.15),transparent)" }} />
    </div>
  );
}

/* ── 접을 수 있는 선택 입력 섹션 (VIP 부담 완화) ── */
function Collapsible({ num, title, sub, badge, children }: {
  num: string; title: string; sub: string; badge: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lux-form-section">
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{ width:"100%", background:"none", border:"none", cursor:"pointer",
          textAlign:"left", padding:0, display:"flex", justifyContent:"space-between",
          alignItems:"center", gap:"1rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1rem", flex:1, minWidth:0 }}>
          <span style={{ fontFamily:"Georgia,serif", fontSize:"1.8rem",
            color:"rgba(201,169,110,0.15)", lineHeight:1, flexShrink:0 }}>{num}</span>
          <div style={{ minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", flexWrap:"wrap" }}>
              <div style={{ fontSize:"0.6rem", letterSpacing:"0.28em", color:"#c9a96e" }}>{title}</div>
              <span style={{ fontSize:"0.5rem", letterSpacing:"0.14em", padding:"0.1rem 0.45rem",
                color:"#555550", border:"1px solid rgba(80,80,75,0.3)" }}>{badge}</span>
            </div>
            <div style={{ fontSize:"0.75rem", color:"#444440", marginTop:"2px" }}>{sub}</div>
          </div>
        </div>
        <span style={{ color:"#c9a96e", fontSize:"1rem", flexShrink:0,
          transform: open ? "rotate(45deg)" : "none", transition:"transform 0.3s" }}>+</span>
      </button>
      <div style={{ height:"1px", background:"linear-gradient(to right,rgba(201,169,110,0.15),transparent)", margin:"1.2rem 0" }} />
      {open ? (
        <div style={{ animation:"fadeInCard 0.35s ease" }}>{children}</div>
      ) : (
        <p style={{ fontSize:"0.7rem", color:"#333330", lineHeight:1.85 }}>
          작성하지 않아도 문의가 가능합니다. 더 정확한 소싱을 원하시면 펼쳐서 입력해주세요.
        </p>
      )}
    </div>
  );
}

/* ── 소싱 프리뷰 분석 (룰 기반) ── */
const RARE_KEYWORDS = ["limited","rare","한정","품절","special","exotic","악어","crocodile","birkin","kelly","hermès","hermes","quota"];

function analyzeSourcing(brand: string, product: string, budget: string, country: string) {
  const text = (brand + " " + product).toLowerCase();
  const isRare = RARE_KEYWORDS.some(k => text.includes(k));
  const isHighBudget = budget === "3,000만원 이상" || budget === "가격 상관없음";

  const difficulty   = isRare ? "High" : "Standard";
  const availability = isRare ? "Limited — 현지 확인 필요" : "Verifiable";
  const region       = country === "france" ? "Paris · Rue du Faubourg" : country === "italy" ? "Milan · Via Montenapoleone" : "Paris / Milan (최적 국가 선택)";
  const priority     = (isRare || isHighBudget) ? "Private High" : "Standard";

  return { difficulty, availability, region, priority };
}

/* ── 소싱 프리뷰 카드 ── */
function SourcingPreview({ brand, product, budget, country }: {
  brand: string; product: string; budget: string; country: string;
}) {
  if (!brand.trim() || !product.trim()) return null;
  const a = analyzeSourcing(brand, product, budget, country);

  const rows: [string, string, string][] = [
    ["Estimated Sourcing Difficulty", a.difficulty, a.difficulty === "High" ? "#c9a96e" : "#888880"],
    ["Boutique Availability",         a.availability, "#888880"],
    ["Recommended Region",            a.region, "#888880"],
    ["Concierge Priority",            a.priority, a.priority === "Private High" ? "#c9a96e" : "#888880"],
  ];

  return (
    <div style={{ margin:"2rem 0", padding:"1.8rem 2rem",
      border:"1px solid rgba(201,169,110,0.18)", background:"#0a0a08",
      animation:"fadeInCard 0.4s ease" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.4rem" }}>
        <div style={{ width:"4px", height:"4px", background:"#c9a96e", transform:"rotate(45deg)", flexShrink:0 }} />
        <div>
          <div style={{ fontSize:"0.56rem", letterSpacing:"0.32em", color:"#c9a96e" }}>
            PRIVATE SOURCING PREVIEW
          </div>
          <div style={{ fontSize:"0.63rem", color:"#2a2a25", marginTop:"2px" }}>
            사전 검토 결과 · 예상 분석 (실제 재고 보장 아님)
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gap:"0.85rem" }}>
        {rows.map(([label, value, color]) => (
          <div key={label} style={{ display:"flex", justifyContent:"space-between",
            alignItems:"flex-start", gap:"1rem",
            paddingBottom:"0.7rem", borderBottom:"1px solid rgba(201,169,110,0.06)" }}>
            <div style={{ fontSize:"0.63rem", color:"#333330", letterSpacing:"0.08em", flexShrink:0 }}>{label}</div>
            <div style={{ fontSize:"0.72rem", color, textAlign:"right", fontFamily:"Georgia,serif" }}>{value}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize:"0.6rem", color:"#1e1e1a", marginTop:"1.2rem", lineHeight:1.8 }}>
        * 본 분석은 사전 참고용 예상 결과이며, 실제 현지 재고 및 구매 가능 여부는 담당 컨시어지 확인 후 안내드립니다.
      </p>
    </div>
  );
}

export default function RequestPage() {
  const [state, setState] = useState<State>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [imageUrl, setImageUrl] = useState<string|null>(null);
  const [uploading, setUploading] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── VIP Preference state ── */
  const [prefs, setPrefs] = useState({
    preferred_brands:    "",
    preferred_colors:    "",
    preferred_size:      "",
    budget_range_detail: "",
    preferred_region:    "any",
    purchase_purpose:    "Personal Collection",
    contact_preference:  "KakaoTalk",
    vip_grade:           "Private",
  });

  /* ── Wishlist state (3 slots) ── */
  const [wishlist, setWishlist] = useState([
    { brand:"", product_name:"", color_size:"", memo:"" },
    { brand:"", product_name:"", color_size:"", memo:"" },
    { brand:"", product_name:"", color_size:"", memo:"" },
  ]);

  const setWishlistItem = (idx: number, field: string, value: string) =>
    setWishlist(p => p.map((w, i) => i === idx ? { ...w, [field]: value } : w));

  const [form, setForm] = useState({
    name:"", phone:"", kakao_id:"", email:"",
    brand:"", product_name:"", budget:"",
    preferred_country:"any" as "france"|"italy"|"any",
    delivery_preference:"consult" as "domestic"|"overseas"|"consult",
    message:"",
    invitation_code:"",
    _hp:"",
  });

  const set = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    setUploading(true); setImageUrl(null);
    try {
      const fd = new FormData(); fd.append("file", f);
      const res = await fetch("/api/upload", { method:"POST", body:fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setImageUrl(j.url);
    } catch { alert("이미지 업로드에 실패했습니다. 다시 시도해주세요."); }
    finally { setUploading(false); }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) { alert("개인정보 수집 및 이용에 동의해 주세요."); return; }
    if (uploading) { alert("이미지 업로드가 완료될 때까지 기다려주세요."); return; }
    setState("submitting"); setErrMsg("");
    try {
      const filteredWishlist = wishlist.filter(w => w.brand.trim() && w.product_name.trim());
      const res = await fetch("/api/requests", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          ...form,
          product_image_urls: imageUrl ? [imageUrl] : [],
          invitation_code: form.invitation_code.trim() || undefined,
          preferences: Object.values(prefs).some(v => v && v !== "any" && v !== "Personal Collection" && v !== "KakaoTalk" && v !== "Private")
            ? prefs : undefined,
          wishlist_items: filteredWishlist.length > 0 ? filteredWishlist : undefined,
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setSubmittedId(j.id ?? "");
      setState("success");
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.");
      setState("error");
    }
  }

  /* ── Success screen ─────────────────────────────────────── */
  if (state === "success") return (
    <>
      <Nav />
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center",
        justifyContent:"center", padding:"8rem 2rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0,
          background:"radial-gradient(ellipse 70% 60% at 50% 45%, rgba(201,169,110,0.05) 0%, transparent 70%)",
          pointerEvents:"none" }} />
        <div style={{ position:"relative", maxWidth:"580px" }}>
          <div style={{ display:"flex", gap:"6px", justifyContent:"center", alignItems:"center", marginBottom:"3.5rem" }}>
            <div style={{ flex:1, maxWidth:"80px", height:"1px",
              background:"linear-gradient(to right,transparent,rgba(201,169,110,0.45))" }} />
            <div style={{ width:"8px", height:"8px",
              border:"1px solid rgba(201,169,110,0.55)", transform:"rotate(45deg)", flexShrink:0 }} />
            <div style={{ flex:1, maxWidth:"80px", height:"1px",
              background:"linear-gradient(to left,transparent,rgba(201,169,110,0.45))" }} />
          </div>

          <div style={{ fontSize:"0.57rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"2rem" }}>
            REQUEST RECEIVED
          </div>
          <h2 style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(1.9rem,4.5vw,2.9rem)", fontWeight:400,
            color:"#f5f0e8", marginBottom:"2rem", lineHeight:1.4 }}>
            문의가 접수되었습니다
          </h2>
          <div style={{ width:"1px", height:"55px",
            background:"linear-gradient(to bottom,rgba(201,169,110,0.5),transparent)",
            margin:"0 auto 2.5rem" }} />
          <p style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(0.95rem,2vw,1.05rem)", color:"#888880",
            lineHeight:2.1, marginBottom:"1.5rem" }}>
            담당 컨시어지가 파리·밀라노 현지를 확인한 후<br />개별 연락드립니다.
          </p>
          <p style={{ fontSize:"0.82rem", color:"#3d3d38", lineHeight:1.9, marginBottom:"2rem" }}>
            카카오톡 또는 이메일로 연락드리며,<br />현지 확인에 1–3 영업일이 소요될 수 있습니다.
          </p>

          {/* Request ID 표시 */}
          {submittedId && (
            <div style={{ border:"1px solid rgba(201,169,110,0.12)",
              padding:"1.5rem 2rem", marginBottom:"1.5rem", background:"#0d0d0b", textAlign:"left" }}>
              <div style={{ fontSize:"0.55rem", letterSpacing:"0.25em", color:"#333330", marginBottom:"0.5rem" }}>
                REQUEST ID (소싱 현황 조회용)
              </div>
              <div style={{ fontFamily:"monospace", fontSize:"0.82rem", color:"#c9a96e",
                wordBreak:"break-all", marginBottom:"0.6rem" }}>
                {submittedId}
              </div>
              <p style={{ fontSize:"0.62rem", color:"#2a2a25", lineHeight:1.8 }}>
                이 번호와 연락처 뒷자리 4자리로<br />
                <a href="/track" style={{ color:"#c9a96e", textDecoration:"none" }}>/track</a>에서 소싱 현황을 조회하실 수 있습니다.
              </p>
            </div>
          )}

          <div style={{ border:"1px solid rgba(201,169,110,0.1)",
            padding:"1.8rem 2.5rem", marginBottom:"3.5rem", background:"#0d0d0b" }}>
            <div style={{ fontSize:"0.58rem", letterSpacing:"0.28em",
              color:"#333330", marginBottom:"0.6rem" }}>EXPECTED RESPONSE TIME</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"1.05rem", color:"#c9a96e" }}>
              1 — 3 Business Days
            </div>
          </div>

          <div style={{ fontSize:"0.6rem", letterSpacing:"0.3em", color:"#242420" }}>
            MAISON PRIVÉ · PARIS & MILAN
          </div>
        </div>
      </section>
      <Footer />
    </>
  );

  /* ── Request form ───────────────────────────────────────── */
  return (
    <>
      <Nav />

      <section style={{ padding:"8rem 2rem 3rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0,
          background:"radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,169,110,0.05) 0%, transparent 65%)",
          pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:"0.57rem", letterSpacing:"0.48em", color:"#c9a96e", marginBottom:"1.5rem" }}>
            PRIVATE CONSULTATION
          </div>
          <h1 style={{ fontFamily:"Georgia,serif",
            fontSize:"clamp(2rem,4.5vw,3.2rem)", fontWeight:400, color:"#f5f0e8", marginBottom:"1.5rem" }}>
            Begin a Private Request
          </h1>
          <p style={{ fontSize:"0.87rem", color:"#555550", lineHeight:1.95,
            maxWidth:"480px", margin:"0 auto 1rem" }}>
            가벼운 상담이라도 괜찮습니다. 원하시는 제품을 편하게 알려주세요.<br />
            모든 정보는 철저히 비공개로 관리됩니다.
          </p>
          <div style={{ display:"flex", gap:"6px", justifyContent:"center", alignItems:"center", marginTop:"3rem" }}>
            <div style={{ flex:1, maxWidth:"60px", height:"1px",
              background:"linear-gradient(to right,transparent,rgba(201,169,110,0.35))" }} />
            <div style={{ width:"5px", height:"5px",
              border:"1px solid rgba(201,169,110,0.4)", transform:"rotate(45deg)", flexShrink:0 }} />
            <div style={{ flex:1, maxWidth:"60px", height:"1px",
              background:"linear-gradient(to left,transparent,rgba(201,169,110,0.35))" }} />
          </div>
        </div>
      </section>

      {/* ── Before You Request ─────────────────────────── */}
      <FadeUp style={{ maxWidth:"760px", margin:"0 auto 3rem", padding:"0 2rem" }}>
        <div style={{ border:"1px solid rgba(201,169,110,0.1)", background:"#0d0d0b",
          padding:"2.5rem 3rem", position:"relative" }}>
          {/* corner marks */}
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              position:"absolute", width:"14px", height:"14px",
              borderColor:"rgba(201,169,110,0.3)", borderStyle:"solid",
              borderWidth: i===0?"1px 0 0 1px":i===1?"1px 1px 0 0":i===2?"0 0 1px 1px":"0 1px 1px 0",
              top: i<2?"-1px":"auto", bottom: i>=2?"-1px":"auto",
              left: i%2===0?"-1px":"auto", right: i%2===1?"-1px":"auto",
            }} />
          ))}
          <div style={{ fontSize:"0.56rem", letterSpacing:"0.36em", color:"#c9a96e", marginBottom:"1.6rem" }}>
            BEFORE YOU REQUEST
          </div>
          <p style={{ fontSize:"0.8rem", color:"#666660", lineHeight:1.95, marginBottom:"1.8rem" }}>
            이 문의는 구매를 확정하는 것이 아니라, 상담을 시작하는 것입니다.
            현지 재고를 확인한 후 Private Brief를 보내드리며, 고객님이 승인하고
            결제를 확인한 다음에만 구매가 진행됩니다.
          </p>
          <div style={{ height:"1px", background:"rgba(201,169,110,0.07)", margin:"0 0 1.8rem" }} />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1.6rem" }}>
            {[
              { symbol:"◈", title:"Fully Private",   desc:"담당 컨시어지만 열람합니다" },
              { symbol:"◇", title:"Direct Boutique",  desc:"현지 공식 부티크 직접 구매" },
              { symbol:"✦", title:"No Upfront Fee",   desc:"승인 전 비용 없음" },
            ].map(p => (
              <div key={p.title} style={{ display:"flex", gap:"0.7rem" }}>
                <span style={{ color:"rgba(201,169,110,0.45)", fontSize:"0.72rem", flexShrink:0, marginTop:"1px" }}>{p.symbol}</span>
                <div>
                  <div style={{ fontSize:"0.58rem", letterSpacing:"0.14em", color:"#c9a96e", marginBottom:"0.3rem" }}>
                    {p.title.toUpperCase()}
                  </div>
                  <p style={{ fontSize:"0.7rem", color:"#3a3a35", lineHeight:1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={80} style={{ maxWidth:"760px", margin:"0 auto 10rem", padding:"0 2rem" }}>
        {state === "error" && (
          <div style={{ marginBottom:"1.5rem", padding:"1rem 1.5rem",
            background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.2)",
            color:"#f87171", fontSize:"0.84rem" }}>
            {errMsg}
          </div>
        )}

        {/* ── VIP Request Card 헤더 ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"1.2rem 1.8rem", border:"1px solid rgba(201,169,110,0.18)",
          borderBottom:"none", background:"#0d0d0b" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.7rem" }}>
            <div style={{ width:"5px", height:"5px", background:"#c9a96e", transform:"rotate(45deg)" }} />
            <span style={{ fontSize:"0.56rem", letterSpacing:"0.3em", color:"#c9a96e" }}>
              PRIVATE REQUEST CARD
            </span>
          </div>
          <span style={{ fontSize:"0.6rem", color:"#333330" }}>* 필수 항목</span>
        </div>

        <form onSubmit={onSubmit} style={{ border:"1px solid rgba(201,169,110,0.18)", padding:"2.2rem" }}>
          {/* honeypot */}
          <div style={{ position:"absolute", left:"-9999px", top:"-9999px", opacity:0, pointerEvents:"none" }} aria-hidden="true">
            <input name="_hp" value={form._hp} onChange={set} tabIndex={-1} autoComplete="off" />
          </div>

          {/* 00 · VIP 초대코드 */}
          <div className="lux-form-section" style={{ marginBottom:"3rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.4rem",
              padding:"1.3rem 1.6rem", border:"1px solid rgba(201,169,110,0.15)", background:"#0a0a08" }}>
              <div style={{ flexShrink:0 }}>
                <div style={{ width:"28px", height:"28px", border:"1px solid rgba(201,169,110,0.3)",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:"0.75rem", color:"#c9a96e" }}>✦</span>
                </div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"0.59rem", letterSpacing:"0.25em", color:"#c9a96e", marginBottom:"0.3rem" }}>
                  VIP INVITATION CODE · 선택 사항
                </div>
                <div style={{ fontSize:"0.7rem", color:"#333330" }}>
                  초대코드가 있으신 경우 입력해주세요. 없어도 문의 가능합니다.
                </div>
              </div>
            </div>
            <input
              className="lux-input"
              style={{ ...inp, letterSpacing:"0.12em", textTransform:"uppercase" }}
              name="invitation_code"
              value={form.invitation_code}
              onChange={set}
              placeholder="예: MAISON-VIP · PARIS-PRIVATE"
              maxLength={50}
            />
          </div>

          {/* 01 · Contact */}
          <div className="lux-form-section">
            <SecHead num="01" title="CONTACT INFORMATION" sub="연락처 정보" tag="REQUIRED" />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:"1.2rem" }}>
              <Field label="성함 *">
                <input className="lux-input" style={inp} name="name" value={form.name} onChange={set} required placeholder="홍길동" />
              </Field>
              <Field label="연락처 *">
                <input className="lux-input" style={inp} name="phone" value={form.phone} onChange={set} required placeholder="010-0000-0000" />
              </Field>
              <Field label="카카오톡 ID">
                <input className="lux-input" style={inp} name="kakao_id" value={form.kakao_id} onChange={set} placeholder="kakao_id" />
              </Field>
              <Field label="이메일 주소 *">
                <input className="lux-input" style={inp} type="email" name="email" value={form.email} onChange={set} required placeholder="your@email.com" />
              </Field>
            </div>
          </div>

          {/* 02 · Product */}
          <div className="lux-form-section">
            <SecHead num="02" title="PRODUCT DETAILS" sub="희망 제품 정보" tag="REQUIRED" />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:"1.2rem", marginBottom:"1.2rem" }}>
              <Field label="희망 브랜드 *">
                <input className="lux-input" style={inp} name="brand" value={form.brand} onChange={set} required placeholder="예: Hermès" />
              </Field>
              <Field label="희망 제품명 *">
                <input className="lux-input" style={inp} name="product_name" value={form.product_name} onChange={set} required placeholder="예: Birkin 30 Noir Togo" />
              </Field>
            </div>

            {/* Image upload */}
            <div style={{ marginBottom:"1.2rem" }}>
              <label style={lbl}>제품 참고 이미지 (선택)</label>
              <div
                onClick={() => !uploading && fileRef.current?.click()}
                style={{
                  border:`1px dashed ${imageUrl ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.15)"}`,
                  background: imageUrl ? "rgba(201,169,110,0.03)" : "#0a0a0a",
                  padding:"2.5rem 1.5rem", textAlign:"center", cursor:"pointer",
                  transition:"border-color 0.3s, background 0.3s", position:"relative",
                }}>
                <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={onFile} />
                {uploading ? (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.8rem" }}>
                    <div style={{ width:"20px", height:"20px", border:"1px solid rgba(201,169,110,0.4)",
                      borderTopColor:"#c9a96e", borderRadius:"50%", animation:"spinSlow 0.8s linear infinite" }} />
                    <span style={{ fontSize:"0.73rem", color:"#c9a96e" }}>업로드 중...</span>
                  </div>
                ) : imageUrl ? (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt="uploaded" style={{ maxHeight:"120px", maxWidth:"100%", objectFit:"contain" }} />
                    <span style={{ fontSize:"0.68rem", color:"#c9a96e", letterSpacing:"0.12em" }}>
                      ✦ 업로드 완료 · 클릭하여 변경
                    </span>
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.8rem" }}>
                    <div style={{ fontSize:"1.4rem", color:"rgba(201,169,110,0.25)" }}>◈</div>
                    <span style={{ fontSize:"0.73rem", color:"#3a3a35" }}>클릭하여 이미지 업로드</span>
                    <span style={{ fontSize:"0.63rem", color:"#252520", letterSpacing:"0.1em" }}>
                      JPG · PNG · WEBP · 최대 10MB
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Budget select */}
            <Field label="예상 예산 *">
              <div style={{ position:"relative" }}>
                <select className="lux-input" style={sel} name="budget" value={form.budget} onChange={set} required>
                  <option value="">예산 범위를 선택해주세요</option>
                  <option value="500만원 이하">500만원 이하</option>
                  <option value="500만~1,000만원">500만 ~ 1,000만원</option>
                  <option value="1,000만~3,000만원">1,000만 ~ 3,000만원</option>
                  <option value="3,000만원 이상">3,000만원 이상</option>
                  <option value="가격 상관없음">가격 상관없음 (최상급 우선)</option>
                </select>
                <span style={{ position:"absolute", right:"1rem", top:"50%",
                  transform:"translateY(-50%)", color:"#c9a96e", pointerEvents:"none" }}>▾</span>
              </div>
            </Field>
          </div>

          {/* 03 · Preferences */}
          <div className="lux-form-section">
            <SecHead num="03" title="PREFERENCES" sub="소싱 선호 사항" tag="OPTIONAL" />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:"1.2rem" }}>
              <Field label="희망 소싱 국가">
                <div style={{ position:"relative" }}>
                  <select className="lux-input" style={sel} name="preferred_country" value={form.preferred_country} onChange={set}>
                    <option value="france">프랑스 (파리)</option>
                    <option value="italy">이탈리아 (밀라노)</option>
                    <option value="any">상관없음 · 최적 국가 선택</option>
                  </select>
                  <span style={{ position:"absolute", right:"1rem", top:"50%",
                    transform:"translateY(-50%)", color:"#c9a96e", pointerEvents:"none" }}>▾</span>
                </div>
              </Field>
              <Field label="수령 방식">
                <div style={{ position:"relative" }}>
                  <select className="lux-input" style={sel} name="delivery_preference" value={form.delivery_preference} onChange={set}>
                    <option value="domestic">국내 수령 (국제 특송)</option>
                    <option value="overseas">해외 현지 직접 수령</option>
                    <option value="consult">상담 후 결정</option>
                  </select>
                  <span style={{ position:"absolute", right:"1rem", top:"50%",
                    transform:"translateY(-50%)", color:"#c9a96e", pointerEvents:"none" }}>▾</span>
                </div>
              </Field>
            </div>
          </div>

          {/* Sourcing Preview 카드 — 브랜드+제품명 입력 시 자동 표시 */}
          <SourcingPreview
            brand={form.brand}
            product={form.product_name}
            budget={form.budget}
            country={form.preferred_country}
          />

          {/* 04 · Message */}
          <div className="lux-form-section">
            <SecHead num="04" title="REQUEST MESSAGE" sub="추가 요청 사항" tag="OPTIONAL" />
            <Field label="요청 내용">
              <textarea className="lux-input"
                style={{ ...inp, resize:"vertical", minHeight:"140px" }}
                name="message" value={form.message} onChange={set}
                placeholder="원하시는 컬러, 사이즈, 하드웨어 옵션, 특이 사항 등을 자유롭게 적어주세요." />
            </Field>
          </div>

          {/* ── 05 · VIP PREFERENCE PROFILE (접힘) ─────────── */}
          <Collapsible num="05" title="VIP PREFERENCE PROFILE" sub="선호 정보를 더 입력하시면 소싱이 더 정확해집니다" badge="OPTIONAL">
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:"1.2rem", marginBottom:"1.2rem" }}>
              <Field label="선호 브랜드 (복수 입력 가능)">
                <input className="lux-input" style={inp} value={prefs.preferred_brands}
                  onChange={e => setPrefs(p => ({ ...p, preferred_brands: e.target.value }))}
                  placeholder="예: Hermès, Chanel, Dior" />
              </Field>
              <Field label="선호 색상">
                <input className="lux-input" style={inp} value={prefs.preferred_colors}
                  onChange={e => setPrefs(p => ({ ...p, preferred_colors: e.target.value }))}
                  placeholder="예: Noir, Blanc, Étoupe" />
              </Field>
              <Field label="선호 사이즈">
                <input className="lux-input" style={inp} value={prefs.preferred_size}
                  onChange={e => setPrefs(p => ({ ...p, preferred_size: e.target.value }))}
                  placeholder="예: 25, 30, M" />
              </Field>
              <Field label="상세 예산 (선택)">
                <input className="lux-input" style={inp} value={prefs.budget_range_detail}
                  onChange={e => setPrefs(p => ({ ...p, budget_range_detail: e.target.value }))}
                  placeholder="예: €3,000–€5,000" />
              </Field>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:"1.2rem" }}>
              <Field label="선호 소싱 지역">
                <div style={{ position:"relative" }}>
                  <select className="lux-input" style={sel} value={prefs.preferred_region}
                    onChange={e => setPrefs(p => ({ ...p, preferred_region: e.target.value }))}>
                    <option value="any">Any European Network</option>
                    <option value="Paris">Paris</option>
                    <option value="Milan">Milan</option>
                    <option value="Rome">Rome</option>
                  </select>
                  <span style={{ position:"absolute", right:"1rem", top:"50%", transform:"translateY(-50%)", color:"#c9a96e", pointerEvents:"none" }}>▾</span>
                </div>
              </Field>
              <Field label="구매 목적">
                <div style={{ position:"relative" }}>
                  <select className="lux-input" style={sel} value={prefs.purchase_purpose}
                    onChange={e => setPrefs(p => ({ ...p, purchase_purpose: e.target.value }))}>
                    <option value="Personal Collection">Personal Collection</option>
                    <option value="Gift">Gift</option>
                    <option value="Investment Piece">Investment Piece</option>
                    <option value="Special Occasion">Special Occasion</option>
                  </select>
                  <span style={{ position:"absolute", right:"1rem", top:"50%", transform:"translateY(-50%)", color:"#c9a96e", pointerEvents:"none" }}>▾</span>
                </div>
              </Field>
              <Field label="연락 선호 방식">
                <div style={{ position:"relative" }}>
                  <select className="lux-input" style={sel} value={prefs.contact_preference}
                    onChange={e => setPrefs(p => ({ ...p, contact_preference: e.target.value }))}>
                    <option value="KakaoTalk">KakaoTalk</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                  <span style={{ position:"absolute", right:"1rem", top:"50%", transform:"translateY(-50%)", color:"#c9a96e", pointerEvents:"none" }}>▾</span>
                </div>
              </Field>
              <Field label="VIP 등급">
                <div style={{ position:"relative" }}>
                  <select className="lux-input" style={sel} value={prefs.vip_grade}
                    onChange={e => setPrefs(p => ({ ...p, vip_grade: e.target.value }))}>
                    <option value="Private">Private</option>
                    <option value="Invited">Invited</option>
                    <option value="Black">Black</option>
                    <option value="Founder">Founder</option>
                  </select>
                  <span style={{ position:"absolute", right:"1rem", top:"50%", transform:"translateY(-50%)", color:"#c9a96e", pointerEvents:"none" }}>▾</span>
                </div>
              </Field>
            </div>
          </Collapsible>

          {/* ── 06 · PRIVATE WISHLIST (접힘) ────────────────── */}
          <Collapsible num="06" title="PRIVATE WISHLIST" sub="관심 제품을 최대 3개까지 미리 등록할 수 있습니다" badge="OPTIONAL">
            <div style={{ display:"grid", gap:"1.2rem" }}>
              {wishlist.map((item, idx) => (
                <div key={idx} style={{
                  padding:"1.4rem 1.6rem",
                  border:"1px solid rgba(201,169,110,0.08)",
                  background:"#0a0a08", position:"relative",
                }}>
                  <div style={{ fontSize:"0.5rem", letterSpacing:"0.3em", color:"rgba(201,169,110,0.4)",
                    marginBottom:"1.1rem" }}>WISHLIST 0{idx + 1}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"0.9rem" }}>
                    <Field label="브랜드">
                      <input className="lux-input" style={inp}
                        value={item.brand}
                        onChange={e => setWishlistItem(idx, "brand", e.target.value)}
                        placeholder="예: Chanel" />
                    </Field>
                    <Field label="제품명">
                      <input className="lux-input" style={inp}
                        value={item.product_name}
                        onChange={e => setWishlistItem(idx, "product_name", e.target.value)}
                        placeholder="예: Classic Flap Medium" />
                    </Field>
                    <Field label="색상 / 사이즈">
                      <input className="lux-input" style={inp}
                        value={item.color_size}
                        onChange={e => setWishlistItem(idx, "color_size", e.target.value)}
                        placeholder="예: Beige · Medium" />
                    </Field>
                    <Field label="메모 (선택)">
                      <input className="lux-input" style={inp}
                        value={item.memo}
                        onChange={e => setWishlistItem(idx, "memo", e.target.value)}
                        placeholder="특이사항" />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </Collapsible>

          {/* ── 제출 전 마지막 안내 ── */}
          <div style={{ marginTop:"2.5rem", padding:"1.4rem 1.6rem",
            background:"rgba(201,169,110,0.03)", border:"1px solid rgba(201,169,110,0.1)" }}>
            <div style={{ fontSize:"0.54rem", letterSpacing:"0.22em", color:"#c9a96e", marginBottom:"0.9rem" }}>
              제출 전 확인해 주세요
            </div>
            <ul style={{ listStyle:"none", display:"grid", gap:"0.5rem" }}>
              {[
                "문의만으로 구매가 확정되지 않습니다.",
                "현지 확인 후 Private Brief(견적)를 보내드립니다.",
                "승인 및 결제 확인 후에만 구매가 진행됩니다.",
              ].map((t, i) => (
                <li key={i} style={{ display:"flex", gap:"0.6rem", alignItems:"flex-start" }}>
                  <span style={{ color:"rgba(201,169,110,0.4)", fontSize:"0.6rem", marginTop:"2px", flexShrink:0 }}>◈</span>
                  <span style={{ fontSize:"0.74rem", color:"#555550", lineHeight:1.7 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy & submit */}
          <div style={{ padding:"2rem 0 2.5rem" }}>
            <label style={{ display:"flex", alignItems:"flex-start", gap:"0.85rem",
              cursor:"pointer", fontSize:"0.77rem", color:"#444440", lineHeight:1.85 }}>
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                style={{ marginTop:"3px", accentColor:"#c9a96e", flexShrink:0 }} />
              <span>
                수집된 개인정보는 문의 처리 목적으로만 사용되며 서비스 완료 후 파기됩니다.&nbsp;
                <Link href="/privacy" style={{ color:"#c9a96e", textDecoration:"none" }}>개인정보처리방침</Link> 및&nbsp;
                <Link href="/terms" style={{ color:"#c9a96e", textDecoration:"none" }}>이용약관</Link>에 동의합니다. *
              </span>
            </label>
          </div>

          <button type="submit" disabled={state==="submitting"}
            style={{ width:"100%",
              background: state==="submitting" ? "#7a6030" : "#c9a96e",
              color:"#0a0a0a", border:"none",
              padding:"1.2rem", fontSize:"0.72rem",
              letterSpacing:"0.28em", fontWeight:700,
              cursor: state==="submitting" ? "not-allowed" : "pointer",
              transition:"background 0.3s" }}>
            {state === "submitting" ? "처리 중..." : "SUBMIT PRIVATE REQUEST"}
          </button>
          <p style={{ textAlign:"center", fontSize:"0.65rem", color:"#2a2a25", marginTop:"0.8rem" }}>
            제출 후에도 승인 전까지는 어떠한 비용도 발생하지 않습니다.
          </p>
        </form>

        <p style={{ textAlign:"center", fontSize:"0.68rem", color:"#222220",
          marginTop:"2.5rem", lineHeight:1.9 }}>
          본 서비스는 공식 브랜드 대리점이 아닌 프라이빗 소싱 컨시어지 서비스입니다.
        </p>
      </FadeUp>

      <style>{`
        @keyframes fadeInCard {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <Footer />
    </>
  );
}
