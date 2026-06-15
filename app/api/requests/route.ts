import { NextRequest, NextResponse } from "next/server";
import { createLuxuryRequest, getLuxuryRequests } from "@/lib/luxury-requests";
import { notifyNewLuxuryRequest } from "@/lib/luxury-notifications";

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-password") === process.env.LUXURY_ADMIN_PASSWORD;
}

const MAX = { name:80, phone:30, kakao_id:60, email:120, brand:100, product_name:200, message:2000, invitation_code:50 };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // honeypot — 봇이 채우면 조용히 거부
    if (body._hp) return NextResponse.json({ success: true }, { status: 200 });

    // 필수값 검증
    if (!body.name?.trim())         return NextResponse.json({ error: "이름은 필수입니다." }, { status: 400 });
    if (!body.phone?.trim())        return NextResponse.json({ error: "연락처는 필수입니다." }, { status: 400 });
    if (!body.brand?.trim())        return NextResponse.json({ error: "희망 브랜드는 필수입니다." }, { status: 400 });
    if (!body.product_name?.trim()) return NextResponse.json({ error: "희망 제품명은 필수입니다." }, { status: 400 });

    // 길이 제한
    for (const [field, limit] of Object.entries(MAX)) {
      if (body[field] && String(body[field]).length > limit)
        return NextResponse.json({ error: `${field} 항목이 너무 깁니다. (최대 ${limit}자)` }, { status: 400 });
    }

    const request = await createLuxuryRequest({
      name:                body.name.trim(),
      phone:               body.phone.trim(),
      kakao_id:            body.kakao_id?.trim()       ?? "",
      email:               body.email?.trim()          ?? "",
      brand:               body.brand.trim(),
      product_name:        body.product_name.trim(),
      product_image_urls:  Array.isArray(body.product_image_urls) ? body.product_image_urls.slice(0, 5) : [],
      budget:              body.budget               ?? "",
      preferred_country:   body.preferred_country    ?? "any",
      delivery_preference: body.delivery_preference  ?? "consult",
      message:             body.message?.trim()       ?? "",
      invitation_code:     body.invitation_code?.trim() || undefined,
    });

    notifyNewLuxuryRequest(request).catch(e =>
      console.error("[MAISON PRIVÉ] 알림 발송 오류:", e)
    );

    return NextResponse.json({ success: true, id: request.id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/requests]", err);
    return NextResponse.json({ error: "문의 접수 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const params = new URL(req.url).searchParams;
    const status = params.get("status") as Parameters<typeof getLuxuryRequests>[0];
    const search = params.get("search") ?? undefined;
    return NextResponse.json(await getLuxuryRequests(status ?? undefined, search));
  } catch (err) {
    console.error("[GET /api/requests]", err);
    return NextResponse.json({ error: "목록 조회 실패" }, { status: 500 });
  }
}
