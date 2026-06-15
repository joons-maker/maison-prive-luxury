import type { LuxuryRequest } from "./luxury-requests";

const C_LABEL: Record<string, string> = { france:"프랑스 (파리)", italy:"이탈리아 (밀라노)", any:"상관없음" };
const D_LABEL: Record<string, string> = { domestic:"국내 수령 (국제특송)", overseas:"해외 직접 수령", consult:"상담 후 결정" };

function buildEmailHtml(r: LuxuryRequest, adminUrl: string): string {
  return `
<!DOCTYPE html><html lang="ko"><body style="background:#0a0a0a;color:#f5f0e8;font-family:Arial,sans-serif;padding:2rem;max-width:600px;margin:0 auto">
<div style="border-top:2px solid #c9a96e;padding-top:1.5rem;margin-bottom:2rem">
  <h1 style="font-family:Georgia,serif;color:#c9a96e;font-size:1.2rem;font-weight:400;letter-spacing:0.2em">MAISON PRIVÉ</h1>
  <h2 style="color:#f5f0e8;font-size:1rem;font-weight:400;margin-top:0.5rem">새 VIP 문의가 접수되었습니다</h2>
</div>
<table style="width:100%;border-collapse:collapse">
${row("고객명", r.name)}
${row("연락처", r.phone)}
${row("카카오ID", r.kakao_id || "—")}
${row("이메일", r.email || "—")}
${row("희망 브랜드", r.brand)}
${row("희망 제품명", r.product_name)}
${row("예산", r.budget)}
${row("희망 국가", C_LABEL[r.preferred_country] ?? r.preferred_country)}
${row("배송 방식", D_LABEL[r.delivery_preference] ?? r.delivery_preference)}
${row("이미지 첨부", r.product_image_urls?.length ? `${r.product_image_urls.length}장` : "없음")}
</table>
${r.message ? `<div style="margin-top:1.5rem;padding:1rem;background:#161616;border-left:3px solid #c9a96e"><p style="font-size:0.85rem;color:#aaa;margin:0;line-height:1.8">${r.message.replace(/\n/g,"<br>")}</p></div>` : ""}
<div style="margin-top:2rem;text-align:center">
  <a href="${adminUrl}" style="display:inline-block;background:#c9a96e;color:#0a0a0a;text-decoration:none;padding:0.8rem 2.5rem;font-size:0.8rem;letter-spacing:0.15em;font-weight:600">관리자 화면에서 확인하기 →</a>
</div>
<p style="margin-top:2rem;font-size:0.7rem;color:#333330">접수 시각: ${new Date(r.created_at).toLocaleString("ko-KR")} · ID: ${r.id.slice(0,8)}</p>
</body></html>`;
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:0.5rem 0;font-size:0.75rem;color:#888880;width:120px;border-bottom:1px solid #1a1a1a">${label}</td><td style="padding:0.5rem 0;font-size:0.82rem;color:#f5f0e8;border-bottom:1px solid #1a1a1a">${value}</td></tr>`;
}

export async function notifyNewLuxuryRequest(request: LuxuryRequest): Promise<void> {
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"}/admin`;
  const toEmail  = process.env.ADMIN_NOTIFY_EMAIL;
  const apiKey   = process.env.RESEND_API_KEY;

  // fallback — 항상 서버 로그에 남김
  console.log("[MAISON PRIVÉ] 새 VIP 문의:", {
    id: request.id, name: request.name,
    brand: request.brand, budget: request.budget,
    createdAt: request.created_at,
  });

  if (!apiKey || !toEmail) {
    console.log("[MAISON PRIVÉ] 이메일 알림 스킵 — RESEND_API_KEY 또는 ADMIN_NOTIFY_EMAIL 미설정");
    return;
  }

  const subject = `[MAISON PRIVÉ] 새 VIP 문의 — ${request.name} / ${request.brand}`;
  const html    = buildEmailHtml(request, adminUrl);

  const res = await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from:    "MAISON PRIVÉ <noreply@maisonprive.kr>",
      to:      [toEmail],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(()=>"");
    console.error("[MAISON PRIVÉ] 이메일 발송 실패:", res.status, err);
  } else {
    console.log("[MAISON PRIVÉ] 이메일 발송 성공 →", toEmail);
  }
}
