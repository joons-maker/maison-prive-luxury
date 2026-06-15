import { NextRequest, NextResponse } from "next/server";
import {
  getLuxuryRequestById, updateLuxuryRequestStatus,
  updateLuxuryRequestAdminFields, type RequestStatus,
} from "@/lib/luxury-requests";

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-password") === process.env.LUXURY_ADMIN_PASSWORD;
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
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
  }
}
