import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const requestId  = searchParams.get("requestId")?.trim();
  const phoneLast4 = searchParams.get("phoneLast4")?.trim();

  if (!requestId || !phoneLast4 || phoneLast4.length !== 4) {
    return NextResponse.json({ error: "요청 정보를 확인할 수 없습니다." }, { status: 400 });
  }

  const { data, error } = await getSupabaseClient(true)
    .from("luxury_requests")
    .select("id, brand, product_name, status, created_at, phone, payment_status, total_payment_amount, payment_due_date, payment_note")
    .eq("id", requestId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "요청 정보를 확인할 수 없습니다." }, { status: 404 });
  }

  // 연락처 뒷자리 4자리 검증 — 전체 전화번호 노출 없이 인증
  const digits = (data.phone as string).replace(/\D/g, "");
  if (!digits.endsWith(phoneLast4)) {
    return NextResponse.json({ error: "요청 정보를 확인할 수 없습니다." }, { status: 404 });
  }

  const paymentVisible = ["requested", "paid"].includes(data.payment_status ?? "");

  return NextResponse.json({
    id:           data.id,
    brand:        data.brand,
    product_name: data.product_name,
    status:       data.status,
    created_at:   data.created_at,
    ...(paymentVisible ? {
      payment_status:       data.payment_status,
      total_payment_amount: data.total_payment_amount,
      payment_due_date:     data.payment_due_date,
      payment_note:         data.payment_note,
    } : {}),
  });
}
