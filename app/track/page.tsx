"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TRACK_STATUS_LABELS, STATUS_ORDER, type RequestStatus } from "@/lib/luxury-requests";

const inp: React.CSSProperties = {
  width: "100%", background: "#0e0e0c",
  border: "1px solid rgba(201,169,110,0.22)", color: "#f5f0e8",
  padding: "0.9rem 1.1rem", fontSize: "0.88rem",
  outline: "none", boxSizing: "border-box",
};

interface TrackResult {
  id: string;
  brand: string;
  product_name: string;
  status: RequestStatus;
  created_at: string;
  payment_status?:       string;
  total_payment_amount?: number | null;
  payment_due_date?:     string | null;
  payment_note?:         string | null;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

export default function TrackPage() {
  const [requestId,  setRequestId]  = useState("");
  const [phoneLast4, setPhoneLast4] = useState("");
  const [loading,    setLoading]    = useState(false);
  const [result,     setResult]     = useState<TrackResult | null>(null);
  const [err,        setErr]        = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!requestId.trim() || phoneLast4.length !== 4) return;
    setLoading(true); setErr(""); setResult(null);
    try {
      const res = await fetch(
        `/api/track?requestId=${encodeURIComponent(requestId.trim())}&phoneLast4=${encodeURIComponent(phoneLast4)}`
      );
      const j = await res.json();
      if (!res.ok) { setErr(j.error ?? "요청 정보를 확인할 수 없습니다."); return; }
      setResult(j);
    } catch {
      setErr("조회 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  const isCancelled = result?.status === "cancelled";
  const currentIdx  = result ? STATUS_ORDER.indexOf(result.status) : -1;

  return (
    <>
      <Nav />

      {/* Header */}
      <section style={{ padding: "8rem 2rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(201,169,110,0.05) 0%, transparent 65%)",
          pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "0.57rem", letterSpacing: "0.48em", color: "#c9a96e", marginBottom: "1.5rem" }}>
            PRIVATE STATUS
          </div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.9rem,4.5vw,3rem)",
            fontWeight: 400, color: "#f5f0e8", marginBottom: "1.2rem" }}>
            Sourcing Status
          </h1>
          <p style={{ fontSize: "0.84rem", color: "#555550", lineHeight: 1.95,
            maxWidth: "420px", margin: "0 auto" }}>
            접수 번호와 연락처 뒷자리로<br />소싱 진행 현황을 확인하세요.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: "620px", margin: "0 auto 8rem", padding: "0 2rem" }}>

        {/* 조회 폼 */}
        <form onSubmit={onSubmit} style={{ marginBottom: "3rem" }}>
          <div style={{ display: "grid", gap: "1rem", marginBottom: "1.2rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.58rem", letterSpacing: "0.2em",
                color: "#888880", marginBottom: "0.55rem" }}>
                REQUEST ID
              </label>
              <input
                style={inp}
                value={requestId}
                onChange={e => setRequestId(e.target.value)}
                placeholder="문의 접수 시 발급된 ID (예: 9ce8e997-40f0-...)"
                required
              />
              <p style={{ fontSize: "0.62rem", color: "#2d2d28", marginTop: "0.4rem" }}>
                문의 완료 화면 또는 이메일에서 확인하세요.
              </p>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.58rem", letterSpacing: "0.2em",
                color: "#888880", marginBottom: "0.55rem" }}>
                PHONE LAST 4 DIGITS · 연락처 뒷자리 4자리
              </label>
              <input
                style={{ ...inp, maxWidth: "160px" }}
                value={phoneLast4}
                onChange={e => setPhoneLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="0000"
                required
                maxLength={4}
                inputMode="numeric"
              />
            </div>
          </div>

          {err && (
            <div style={{ padding: "0.9rem 1.2rem", marginBottom: "1rem",
              background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)",
              color: "#f87171", fontSize: "0.82rem" }}>
              {err}
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{ width: "100%", background: loading ? "#7a6030" : "#c9a96e",
              color: "#0a0a0a", border: "none", padding: "1.1rem",
              fontSize: "0.7rem", letterSpacing: "0.28em", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer", transition: "background 0.3s" }}>
            {loading ? "조회 중..." : "STATUS INQUIRY"}
          </button>
        </form>

        {/* 결과 */}
        {result && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            {/* 제품 요약 */}
            <div style={{ padding: "1.8rem 2rem", marginBottom: "2.5rem",
              background: "#0d0d0b", border: "1px solid rgba(201,169,110,0.12)" }}>
              <div style={{ fontSize: "0.55rem", letterSpacing: "0.32em", color: "#c9a96e", marginBottom: "0.8rem" }}>
                REQUEST OVERVIEW
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: "1.15rem",
                color: "#f5f0e8", marginBottom: "0.4rem" }}>
                {result.brand}
              </div>
              <div style={{ fontSize: "0.83rem", color: "#888880", marginBottom: "1rem" }}>
                {result.product_name}
              </div>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "0.54rem", letterSpacing: "0.15em", color: "#333330", marginBottom: "0.2rem" }}>
                    RECEIVED
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#666660" }}>{fmt(result.created_at)}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.54rem", letterSpacing: "0.15em", color: "#333330", marginBottom: "0.2rem" }}>
                    REQUEST #
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#666660", fontFamily: "monospace" }}>
                    {result.id.slice(0, 8).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* 취소된 경우 */}
            {isCancelled ? (
              <div style={{ padding: "2rem", textAlign: "center",
                border: "1px solid rgba(239,68,68,0.18)", background: "rgba(239,68,68,0.03)" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#f87171", marginBottom: "0.6rem" }}>
                  CANCELLED
                </div>
                <p style={{ fontSize: "0.84rem", color: "#666660" }}>
                  해당 요청은 취소되었습니다. 자세한 사항은 담당 컨시어지에게 문의해 주세요.
                </p>
              </div>
            ) : (
              /* 타임라인 */
              <div>
                <div style={{ fontSize: "0.55rem", letterSpacing: "0.32em", color: "#c9a96e", marginBottom: "1.8rem" }}>
                  SOURCING TIMELINE
                </div>
                <div style={{ position: "relative", paddingLeft: "2rem" }}>
                  {/* 세로 라인 */}
                  <div style={{ position: "absolute", left: "7px", top: "6px",
                    bottom: "6px", width: "1px",
                    background: "linear-gradient(to bottom, rgba(201,169,110,0.3), rgba(201,169,110,0.05))" }} />

                  {STATUS_ORDER.map((s, i) => {
                    const isPast    = i < currentIdx;
                    const isCurrent = i === currentIdx;
                    const isFuture  = i > currentIdx;
                    const label     = TRACK_STATUS_LABELS[s];
                    return (
                      <div key={s} style={{ position: "relative", marginBottom: i < STATUS_ORDER.length - 1 ? "2rem" : 0 }}>
                        {/* 도트 */}
                        <div style={{
                          position: "absolute", left: "-2rem",
                          width: isCurrent ? "14px" : "10px",
                          height: isCurrent ? "14px" : "10px",
                          borderRadius: "50%",
                          top: isCurrent ? "-1px" : "1px",
                          background: isCurrent
                            ? "#c9a96e"
                            : isPast
                              ? "rgba(201,169,110,0.35)"
                              : "transparent",
                          border: isCurrent
                            ? "2px solid #c9a96e"
                            : isPast
                              ? "1px solid rgba(201,169,110,0.4)"
                              : "1px solid rgba(201,169,110,0.12)",
                          boxShadow: isCurrent ? "0 0 12px rgba(201,169,110,0.5)" : "none",
                        }} />

                        <div style={{ paddingLeft: "0.5rem" }}>
                          <div style={{
                            fontSize: isCurrent ? "0.8rem" : "0.72rem",
                            color: isCurrent ? "#f5f0e8" : isPast ? "#888880" : "#2a2a25",
                            fontFamily: isCurrent ? "Georgia,serif" : "inherit",
                            letterSpacing: "0.05em",
                            marginBottom: "0.18rem",
                            transition: "color 0.3s",
                          }}>
                            {label.en}
                          </div>
                          <div style={{
                            fontSize: "0.63rem",
                            color: isCurrent ? "#c9a96e" : isFuture ? "#1e1e1a" : "#3d3d38",
                            letterSpacing: "0.08em",
                          }}>
                            {label.ko}
                          </div>
                          {isCurrent && (
                            <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div style={{ width: "6px", height: "6px", borderRadius: "50%",
                                background: "#c9a96e", animation: "pulse 1.8s ease-in-out infinite" }} />
                              <span style={{ fontSize: "0.6rem", color: "#c9a96e", letterSpacing: "0.15em" }}>
                                CURRENT STATUS
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── 결제 요청 패널 ───────────────────────────────── */}
            {result.payment_status && ["requested","paid"].includes(result.payment_status) && (
              <div style={{ marginTop: "3rem", border: "1px solid rgba(201,169,110,0.25)",
                background: "#0b0b09", animation: "fadeIn 0.5s ease" }}>
                {/* 헤더 */}
                <div style={{ padding: "1.4rem 2rem",
                  borderBottom: "1px solid rgba(201,169,110,0.1)",
                  background: "linear-gradient(135deg, rgba(201,169,110,0.05) 0%, transparent 60%)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem" }}>
                    <div style={{ width: "6px", height: "6px",
                      background: result.payment_status === "paid" ? "rgba(100,200,100,0.8)" : "#c9a96e",
                      borderRadius: "50%",
                      animation: result.payment_status === "requested" ? "pulse 1.8s ease-in-out infinite" : "none" }} />
                    <div style={{ fontSize: "0.55rem", letterSpacing: "0.35em",
                      color: result.payment_status === "paid" ? "#88cc88" : "#c9a96e" }}>
                      {result.payment_status === "paid" ? "PAYMENT CONFIRMED" : "PRIVATE PAYMENT REQUEST"}
                    </div>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#666660", lineHeight: 1.8, paddingLeft: "1rem" }}>
                    {result.payment_status === "paid"
                      ? "결제가 확인되었습니다. 현지 소싱을 진행합니다."
                      : "담당 컨시어지가 Private Payment Request를 발행하였습니다."}
                  </p>
                </div>

                {/* 결제 금액 & 기한 */}
                <div style={{ padding: "1.6rem 2rem", borderBottom: "1px solid rgba(201,169,110,0.07)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    {result.total_payment_amount != null && (
                      <div>
                        <div style={{ fontSize: "0.52rem", letterSpacing: "0.22em", color: "#333330", marginBottom: "0.5rem" }}>
                          TOTAL AMOUNT
                        </div>
                        <div style={{ fontFamily: "Georgia,serif", fontSize: "1.35rem", color: "#c9a96e", letterSpacing: "0.03em" }}>
                          ₩{result.total_payment_amount.toLocaleString("ko-KR")}
                        </div>
                        <div style={{ fontSize: "0.58rem", color: "#2a2a25", marginTop: "0.25rem" }}>
                          현지가 · 소싱수수료 · 배송 · 관세 포함
                        </div>
                      </div>
                    )}
                    {result.payment_due_date && (
                      <div>
                        <div style={{ fontSize: "0.52rem", letterSpacing: "0.22em", color: "#333330", marginBottom: "0.5rem" }}>
                          PAYMENT DUE
                        </div>
                        <div style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: "#f5f0e8" }}>
                          {new Date(result.payment_due_date).toLocaleDateString("ko-KR", {
                            year: "numeric", month: "long", day: "numeric"
                          })}
                        </div>
                        <div style={{ fontSize: "0.58rem", color: "#2a2a25", marginTop: "0.25rem" }}>
                          결제 기한
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 입금 안내 */}
                {result.payment_note && (
                  <div style={{ padding: "1.4rem 2rem", borderBottom: "1px solid rgba(201,169,110,0.07)" }}>
                    <div style={{ fontSize: "0.52rem", letterSpacing: "0.22em", color: "#333330", marginBottom: "0.8rem" }}>
                      PAYMENT INSTRUCTIONS
                    </div>
                    <pre style={{ fontSize: "0.78rem", color: "#555550", lineHeight: 1.9,
                      fontFamily: "inherit", whiteSpace: "pre-wrap", margin: 0 }}>
                      {result.payment_note}
                    </pre>
                  </div>
                )}

                {/* 안내 문구 */}
                <div style={{ padding: "1.2rem 2rem" }}>
                  <p style={{ fontSize: "0.7rem", color: "#2e2e29", lineHeight: 1.9 }}>
                    {result.payment_status === "paid"
                      ? "결제 확인 후 담당 컨시어지가 현지 부티크 소싱을 시작합니다. 진행 상황은 개별 연락드립니다."
                      : "입금 완료 후 담당 컨시어지에게 카카오톡 또는 이메일로 확인 연락 주시면 즉시 소싱을 진행합니다."}
                  </p>
                </div>
              </div>
            )}

            {/* 하단 안내 */}
            <div style={{ marginTop: "3rem", padding: "1.4rem 1.8rem",
              border: "1px solid rgba(201,169,110,0.08)", background: "#0a0a09" }}>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "#333330", marginBottom: "0.5rem" }}>
                CONCIERGE NOTE
              </div>
              <p style={{ fontSize: "0.78rem", color: "#444440", lineHeight: 1.9 }}>
                진행 상황이 변경되면 담당 컨시어지가 개별 연락드립니다.<br />
                문의 사항은 카카오톡 또는 이메일로 연락 주세요.
              </p>
            </div>
          </div>
        )}
      </section>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>

      <Footer />
    </>
  );
}
