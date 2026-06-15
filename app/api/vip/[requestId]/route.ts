import { NextRequest, NextResponse } from "next/server";
import {
  getVipData, updateWishlistItemStatus, updateSourcingEvidence,
  type WishlistStatus, type EvidenceKey, type EvidenceStatus,
} from "@/lib/vip-features";

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-password") === process.env.LUXURY_ADMIN_PASSWORD;
}

export async function GET(req: NextRequest, { params }: { params: { requestId: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getVipData(params.requestId));
  } catch {
    return NextResponse.json({ error: "VIP 데이터 조회 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { requestId: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    if (body.wishlist_item_id && body.wishlist_status)
      await updateWishlistItemStatus(body.wishlist_item_id, body.wishlist_status as WishlistStatus);
    if (body.evidence)
      await updateSourcingEvidence(
        params.requestId,
        body.evidence as Partial<Record<EvidenceKey, EvidenceStatus>>
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
  }
}
