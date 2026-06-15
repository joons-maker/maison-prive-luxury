import { NextRequest, NextResponse } from "next/server";
import {
  getLuxuryRequestById, updateLuxuryRequestStatus,
  updateLuxuryRequestAdminFields, updatePaymentFields,
  type RequestStatus, type PaymentStatus,
} from "@/lib/luxury-requests";

function checkAuth(req: NextRequest) {
  // TODO: 실제 고객정보 수집 전에는 반드시 관리자 비밀번호 보호를 다시 활성화할 것.
  // 재활성화 방법: 아래 bypass 조건 삭제 후 환경변수 비교만 남긴다.
  const pw = req.headers.get("x-admin-password");
  if (pw === "__bypass__") return true;
  return pw === process.env.LUXURY_ADMIN_PASSWORD;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const r = await getLuxuryRequestById(params.id);
  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(r);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    if (body.status) await updateLuxuryRequestStatus(params.id, body.status as RequestStatus);
    if (body.admin_memo !== undefined || body.estimated_price !== undefined)
      await updateLuxuryRequestAdminFields(params.id, {
        admin_memo: body.admin_memo, estimated_price: body.estimated_price,
      });
    if (
      body.payment_status !== undefined ||
      body.estimate_amount !== undefined ||
      body.sourcing_fee    !== undefined ||
      body.shipping_fee    !== undefined ||
      body.tax_estimate    !== undefined ||
      body.total_payment_amount !== undefined ||
      body.payment_due_date !== undefined ||
      body.payment_note   !== undefined
    ) {
      await updatePaymentFields(params.id, {
        estimate_amount:      body.estimate_amount      ?? null,
        sourcing_fee:         body.sourcing_fee         ?? null,
        shipping_fee:         body.shipping_fee         ?? null,
        tax_estimate:         body.tax_estimate         ?? null,
        total_payment_amount: body.total_payment_amount ?? null,
        payment_status:       body.payment_status as PaymentStatus | undefined,
        payment_due_date:     body.payment_due_date     ?? null,
        payment_note:         body.payment_note         ?? null,
      });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
  }
}
