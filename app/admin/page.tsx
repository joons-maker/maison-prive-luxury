"use client";
import { useState, useEffect, useCallback } from "react";
import type { LuxuryRequest, RequestStatus } from "@/lib/luxury-requests";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/luxury-requests";

const KEY = "mp_admin_pw";
const ALL: RequestStatus[] = ["new","checking","quoted","paid","sourcing","shipped","completed","cancelled"];
const C_LABEL = { france:"프랑스", italy:"이탈리아", any:"상관없음" } as const;
const D_LABEL = { domestic:"국내 수령", overseas:"해외 직접 수령", consult:"상담 후 결정" } as const;

const fmt = (iso: string) => new Date(iso).toLocaleDateString("ko-KR",{ year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit" });
const api = (path:string, pw:string, opts:RequestInit={}) =>
  fetch(path, { ...opts, headers:{ "Content-Type":"application/json","x-admin-password":pw,...(opts.headers??{}) }});

/* ── 로그인 화면 ── */
function Login({ onLogin }: { onLogin:(pw:string)=>void }) {
  const [pw,setPw]=useState(""); const [err,setErr]=useState(false); const [loading,setLoading]=useState(false);
  async function submit(e:React.FormEvent){ e.preventDefault(); setLoading(true); setErr(false);
    const res = await fetch("/api/requests",{ headers:{"x-admin-password":pw}});
    setLoading(false);
    if(res.ok){ sessionStorage.setItem(KEY,pw); onLogin(pw); } else setErr(true);
  }
  return (
    <div style={{ background:"#0a0a0a", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
      <div style={{ width:"100%", maxWidth:"360px" }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"1.25rem", letterSpacing:"0.2em", color:"#c9a96e" }}>MAISON PRIVÉ</div>
          <div style={{ fontSize:"0.56rem", letterSpacing:"0.35em", color:"#333330", marginTop:"4px" }}>ADMIN ACCESS</div>
        </div>
        <form onSubmit={submit}>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="관리자 비밀번호" required
            style={{ width:"100%", background:"#161616", border:`1px solid ${err?"rgba(239,68,68,0.5)":"rgba(201,169,110,0.2)"}`, color:"#f5f0e8", padding:"0.9rem 1rem", fontSize:"0.9rem", outline:"none", boxSizing:"border-box", marginBottom:"0.75rem" }} />
          {err && <p style={{ color:"#f87171", fontSize:"0.74rem", marginBottom:"0.75rem" }}>비밀번호가 올바르지 않습니다.</p>}
          <button type="submit" disabled={loading} style={{ width:"100%", background:loading?"#8a7040":"#c9a96e", color:"#0a0a0a", border:"none", padding:"0.9rem", fontSize:"0.72rem", letterSpacing:"0.2em", fontWeight:600, cursor:loading?"not-allowed":"pointer" }}>
            {loading?"확인 중...":"접속"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── 대시보드 ── */
function Dashboard({ pw }: { pw:string }) {
  const [requests, setRequests] = useState<LuxuryRequest[]>([]);
  const [loading, setLoading]   = useState(true);
  const [sel, setSel]           = useState<LuxuryRequest|null>(null);
  const [filter, setFilter]     = useState<RequestStatus|"all">("all");
  const [search, setSearch]     = useState("");
  const [note, setNote]         = useState(""); const [quote, setQuote] = useState("");
  const [saveState, setSaveState] = useState<"idle"|"saving"|"saved"|"error">("idle");

  const load = useCallback(async()=>{
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("status", filter);
      if (search.trim())    params.set("search", search.trim());
      const url = `/api/requests${params.toString() ? "?" + params.toString() : ""}`;
      const res = await api(url, pw);
      if(res.ok) setRequests(await res.json());
    } finally { setLoading(false); }
  },[filter, search, pw]);

  useEffect(()=>{ load(); },[load]);

  function select(r:LuxuryRequest){ setSel(r); setNote(r.admin_memo??""); setQuote(r.estimated_price??""); setSaveState("idle"); }

  async function changeStatus(id:string, status:RequestStatus){
    await api(`/api/requests/${id}`, pw,{ method:"PATCH", body:JSON.stringify({status}) });
    setRequests(p=>p.map(r=>r.id===id?{...r,status}:r));
    if(sel?.id===id) setSel(p=>p?{...p,status}:p);
  }

  async function save(){
    if(!sel) return; setSaveState("saving");
    try {
      const res = await api(`/api/requests/${sel.id}`, pw,{ method:"PATCH", body:JSON.stringify({admin_memo:note,estimated_price:quote}) });
      if(!res.ok) throw new Error();
      setSaveState("saved"); setTimeout(()=>setSaveState("idle"),2500);
      setRequests(p=>p.map(r=>r.id===sel.id?{...r,admin_memo:note,estimated_price:quote}:r));
    } catch { setSaveState("error"); }
  }

  const cell: React.CSSProperties = { padding:"1rem", fontSize:"0.78rem", color:"#666660", borderBottom:"1px solid rgba(201,169,110,0.05)", verticalAlign:"middle" };

  return (
    <div style={{ background:"#0a0a0a", minHeight:"100vh", color:"#f5f0e8" }}>
      {/* topbar */}
      <div style={{ borderBottom:"1px solid rgba(201,169,110,0.12)", padding:"1.1rem 2rem", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#111111", position:"sticky", top:0, zIndex:50 }}>
        <div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", letterSpacing:"0.15em", color:"#c9a96e" }}>MAISON PRIVÉ</div>
          <div style={{ fontSize:"0.56rem", letterSpacing:"0.28em", color:"#333330" }}>ADMIN · REQUEST MANAGEMENT</div>
        </div>
        <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
          <span style={{ fontSize:"0.7rem", color:"#444440" }}>총 {requests.length}건 · 신규 {requests.filter(r=>r.status==="new").length}건</span>
          <button onClick={load} style={{ background:"none", border:"1px solid rgba(201,169,110,0.18)", color:"#c9a96e", padding:"0.35rem 0.85rem", fontSize:"0.65rem", cursor:"pointer" }}>새로고침</button>
          <button onClick={()=>{ sessionStorage.removeItem(KEY); window.location.reload(); }} style={{ background:"none", border:"1px solid rgba(201,169,110,0.08)", color:"#444440", padding:"0.35rem 0.85rem", fontSize:"0.62rem", cursor:"pointer" }}>로그아웃</button>
        </div>
      </div>

      <div style={{ display:"flex", height:"calc(100vh - 64px)" }}>
        {/* 목록 */}
        <div style={{ width:sel?"460px":"100%", flexShrink:0, borderRight:"1px solid rgba(201,169,110,0.07)", overflowY:"auto" }}>
          <div style={{ padding:"0.9rem 1.5rem", borderBottom:"1px solid rgba(201,169,110,0.07)" }}>
            <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap", marginBottom:"0.7rem" }}>
              {(["all",...ALL] as const).map(s=>(
                <button key={s} onClick={()=>setFilter(s)} style={{ background:filter===s?"rgba(201,169,110,0.12)":"none", border:"1px solid rgba(201,169,110,0.12)", color:filter===s?"#c9a96e":"#444440", padding:"0.28rem 0.7rem", fontSize:"0.6rem", cursor:"pointer" }}>
                  {s==="all"?"ALL":STATUS_LABELS[s]}
                </button>
              ))}
            </div>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&load()}
              placeholder="이름 · 전화번호 · 카카오ID · 브랜드 · 제품명 검색 (Enter)"
              style={{ width:"100%", background:"#161616", border:"1px solid rgba(201,169,110,0.13)", color:"#f5f0e8", padding:"0.5rem 0.8rem", fontSize:"0.72rem", outline:"none", boxSizing:"border-box" }}
            />
          </div>
          {loading ? <div style={{ padding:"4rem", textAlign:"center", color:"#333330", fontSize:"0.82rem" }}>불러오는 중...</div>
          : requests.length===0 ? <div style={{ padding:"4rem", textAlign:"center", color:"#2a2a25", fontSize:"0.82rem" }}>접수된 문의가 없습니다.</div>
          : (
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#111111" }}>
                  {["접수일","이름","브랜드","제품","예산","상태"].map(h=>(
                    <th key={h} style={{ ...cell, color:"#333330", fontSize:"0.58rem", letterSpacing:"0.1em", textAlign:"left", fontWeight:400, borderBottom:"1px solid rgba(201,169,110,0.1)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.map(r=>(
                  <tr key={r.id} onClick={()=>select(r)} style={{ cursor:"pointer", background:sel?.id===r.id?"rgba(201,169,110,0.04)":"transparent" }}>
                    <td style={{ ...cell, fontSize:"0.7rem", whiteSpace:"nowrap" }}>{fmt(r.created_at)}</td>
                    <td style={{ ...cell, color:"#f5f0e8", fontWeight:500 }}>{r.name}</td>
                    <td style={cell}>{r.brand}</td>
                    <td style={{ ...cell, maxWidth:"150px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.product_name}</td>
                    <td style={{ ...cell, whiteSpace:"nowrap" }}>{r.budget}</td>
                    <td style={cell}><span className={STATUS_COLORS[r.status]} style={{ fontSize:"0.6rem", padding:"0.18rem 0.55rem", display:"inline-block" }}>{STATUS_LABELS[r.status]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 상세 */}
        {sel && (
          <div style={{ flex:1, overflowY:"auto", padding:"2rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"2rem" }}>
              <div>
                <div style={{ fontSize:"0.58rem", letterSpacing:"0.28em", color:"#c9a96e", marginBottom:"0.4rem" }}>REQUEST DETAIL</div>
                <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.3rem", fontWeight:400, color:"#f5f0e8" }}>{sel.name} — {sel.brand}</h2>
                <p style={{ fontSize:"0.7rem", color:"#444440", marginTop:"0.25rem" }}>{fmt(sel.created_at)} · #{sel.id.slice(0,8)}</p>
              </div>
              <button onClick={()=>setSel(null)} style={{ background:"none", border:"none", color:"#444440", fontSize:"1.1rem", cursor:"pointer" }}>✕</button>
            </div>

            {/* 상태 */}
            <div style={{ marginBottom:"2rem", padding:"1.5rem", background:"#111111", border:"1px solid rgba(201,169,110,0.07)" }}>
              <div style={{ fontSize:"0.58rem", letterSpacing:"0.2em", color:"#c9a96e", marginBottom:"1rem" }}>상태 변경</div>
              <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                {ALL.map(s=>(
                  <button key={s} onClick={()=>changeStatus(sel.id,s)} style={{ background:sel.status===s?"#c9a96e":"none", border:`1px solid ${sel.status===s?"#c9a96e":"rgba(201,169,110,0.18)"}`, color:sel.status===s?"#0a0a0a":"#666660", padding:"0.35rem 0.8rem", fontSize:"0.65rem", cursor:"pointer" }}>
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* 정보 */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"0.9rem", marginBottom:"2rem" }}>
              {[["연락처",sel.phone],["카카오톡",sel.kakao_id||"—"],["이메일",sel.email],["브랜드",sel.brand],["제품명",sel.product_name],["예산",sel.budget],["희망국가",C_LABEL[sel.preferred_country]??sel.preferred_country],["배송",D_LABEL[sel.delivery_preference]??sel.delivery_preference]].map(([l,v])=>(
                <div key={l} style={{ padding:"0.9rem", background:"#111111", border:"1px solid rgba(201,169,110,0.05)" }}>
                  <div style={{ fontSize:"0.56rem", letterSpacing:"0.12em", color:"#333330", marginBottom:"0.35rem" }}>{l}</div>
                  <div style={{ fontSize:"0.82rem", color:"#f5f0e8" }}>{v}</div>
                </div>
              ))}
            </div>

            {sel.message && (
              <div style={{ marginBottom:"2rem", padding:"1.5rem", background:"#111111", border:"1px solid rgba(201,169,110,0.07)" }}>
                <div style={{ fontSize:"0.58rem", letterSpacing:"0.18em", color:"#c9a96e", marginBottom:"0.7rem" }}>요청 내용</div>
                <p style={{ fontSize:"0.83rem", color:"#666660", lineHeight:1.9 }}>{sel.message}</p>
              </div>
            )}

            {sel.product_image_urls?.length > 0 && (
              <div style={{ marginBottom:"2rem", padding:"1.5rem", background:"#111111", border:"1px solid rgba(201,169,110,0.07)" }}>
                <div style={{ fontSize:"0.58rem", letterSpacing:"0.18em", color:"#c9a96e", marginBottom:"0.7rem" }}>제품 이미지</div>
                <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                  {sel.product_image_urls.map((u,i)=>(
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={u} alt="" style={{ maxHeight:"160px", maxWidth:"100%", objectFit:"contain", cursor:"pointer" }} onClick={()=>window.open(u,"_blank")} />
                  ))}
                </div>
              </div>
            )}

            {/* 메모 */}
            <div style={{ padding:"1.5rem", background:"#111111", border:"1px solid rgba(201,169,110,0.07)" }}>
              <div style={{ fontSize:"0.58rem", letterSpacing:"0.2em", color:"#c9a96e", marginBottom:"1.2rem" }}>관리자 메모 & 견적</div>
              <div style={{ marginBottom:"1rem" }}>
                <label style={{ display:"block", fontSize:"0.58rem", letterSpacing:"0.1em", color:"#444440", marginBottom:"0.45rem" }}>예상 견적</label>
                <input value={quote} onChange={e=>setQuote(e.target.value)} placeholder="예: 현지가 €7,200 + 소싱비 15% + 관세 예상 80만원" style={{ width:"100%", background:"#161616", border:"1px solid rgba(201,169,110,0.13)", color:"#f5f0e8", padding:"0.75rem 1rem", fontSize:"0.82rem", outline:"none", boxSizing:"border-box" }} />
              </div>
              <div style={{ marginBottom:"1.2rem" }}>
                <label style={{ display:"block", fontSize:"0.58rem", letterSpacing:"0.1em", color:"#444440", marginBottom:"0.45rem" }}>메모</label>
                <textarea value={note} onChange={e=>setNote(e.target.value)} rows={4} placeholder="내부 메모..." style={{ width:"100%", background:"#161616", border:"1px solid rgba(201,169,110,0.13)", color:"#f5f0e8", padding:"0.75rem 1rem", fontSize:"0.82rem", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
              </div>
              <button onClick={save} disabled={saveState==="saving"} style={{ background:saveState==="saved"?"#1a3a1a":saveState==="error"?"#3a1a1a":saveState==="saving"?"#8a7040":"#c9a96e", color:saveState==="saved"?"#88cc88":saveState==="error"?"#f87171":"#0a0a0a", border:"none", padding:"0.72rem 2.2rem", fontSize:"0.68rem", letterSpacing:"0.15em", cursor:saveState==="saving"?"not-allowed":"pointer", fontWeight:500 }}>
                {saveState==="saving"?"저장 중...":saveState==="saved"?"저장됨 ✓":saveState==="error"?"저장 실패 ✕":"저장"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [pw, setPw] = useState<string|null>(null);
  useEffect(()=>{ const s = sessionStorage.getItem(KEY); if(s) setPw(s); },[]);
  if (!pw) return <Login onLogin={setPw} />;
  return <Dashboard pw={pw} />;
}
