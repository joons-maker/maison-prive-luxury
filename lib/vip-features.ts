import { getSupabaseClient } from "./supabase";

/* ── Types ─────────────────────────────────────────────────── */

export type WishlistStatus =
  | "checking" | "available" | "rare"
  | "unavailable" | "waiting_list" | "offer_prepared";

export type EvidenceStatus = "pending" | "in_progress" | "completed";

export type VipGrade = "Private" | "Invited" | "Black" | "Founder";

export interface ClientPreferences {
  id:                  string;
  request_id:          string;
  preferred_brands:    string;
  preferred_colors:    string;
  preferred_size:      string;
  budget_range_detail: string;
  preferred_region:    string;
  purchase_purpose:    string;
  contact_preference:  string;
  vip_grade:           VipGrade;
}

export interface WishlistItem {
  id:           string;
  request_id:   string;
  brand:        string;
  product_name: string;
  color_size:   string;
  priority:     number;
  memo:         string;
  status:       WishlistStatus;
  sort_order:   number;
}

export interface SourcingEvidence {
  id:                   string;
  request_id:           string;
  purchase_route:       EvidenceStatus;
  availability_check:   EvidenceStatus;
  cost_estimate:        EvidenceStatus;
  receipt_availability: EvidenceStatus;
  inspection_photos:    EvidenceStatus;
  customs_delivery:     EvidenceStatus;
}

export interface VipData {
  preferences: ClientPreferences | null;
  wishlist:    WishlistItem[];
  evidence:    SourcingEvidence | null;
}

/* ── Supabase helpers ───────────────────────────────────────── */

export async function upsertClientPreferences(
  requestId: string,
  prefs: Partial<Omit<ClientPreferences, "id" | "request_id">>
): Promise<void> {
  const { error } = await getSupabaseClient(true)
    .from("luxury_client_preferences")
    .upsert({ request_id: requestId, ...prefs }, { onConflict: "request_id" });
  if (error) throw new Error(`선호도 저장 실패: ${error.message}`);
}

export async function createWishlistItems(
  requestId: string,
  items: Array<{ brand: string; product_name: string; color_size?: string; memo?: string }>
): Promise<void> {
  const rows = items.map((item, i) => ({
    request_id:   requestId,
    brand:        item.brand,
    product_name: item.product_name,
    color_size:   item.color_size ?? "",
    priority:     i + 1,
    memo:         item.memo ?? "",
    status:       "checking" as WishlistStatus,
    sort_order:   i,
  }));
  const { error } = await getSupabaseClient(true)
    .from("luxury_wishlist_items")
    .insert(rows);
  if (error) throw new Error(`위시리스트 저장 실패: ${error.message}`);
}

export async function ensureSourcingEvidence(requestId: string): Promise<void> {
  const { error } = await getSupabaseClient(true)
    .from("luxury_sourcing_evidence")
    .upsert({ request_id: requestId }, { onConflict: "request_id" });
  if (error) throw new Error(`소싱 증빙 초기화 실패: ${error.message}`);
}

export async function getVipData(requestId: string): Promise<VipData> {
  const sb = getSupabaseClient(true);
  const [prefRes, wishRes, evRes] = await Promise.all([
    sb.from("luxury_client_preferences").select("*").eq("request_id", requestId).maybeSingle(),
    sb.from("luxury_wishlist_items").select("*").eq("request_id", requestId).order("sort_order"),
    sb.from("luxury_sourcing_evidence").select("*").eq("request_id", requestId).maybeSingle(),
  ]);
  return {
    preferences: prefRes.data  as ClientPreferences | null,
    wishlist:    (wishRes.data ?? []) as WishlistItem[],
    evidence:    evRes.data    as SourcingEvidence | null,
  };
}

export async function updateWishlistItemStatus(itemId: string, status: WishlistStatus): Promise<void> {
  const { error } = await getSupabaseClient(true)
    .from("luxury_wishlist_items")
    .update({ status })
    .eq("id", itemId);
  if (error) throw new Error(`위시리스트 상태 변경 실패: ${error.message}`);
}

export async function updateSourcingEvidence(
  requestId: string,
  fields: Partial<Omit<SourcingEvidence, "id" | "request_id">>
): Promise<void> {
  const { error } = await getSupabaseClient(true)
    .from("luxury_sourcing_evidence")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("request_id", requestId);
  if (error) throw new Error(`소싱 증빙 업데이트 실패: ${error.message}`);
}

/* ── Display metadata ───────────────────────────────────────── */

export const WISHLIST_STATUS_META: Record<WishlistStatus, { label: string; color: string; bg: string; border: string }> = {
  checking:       { label: "확인 중",     color: "#555550", bg: "rgba(80,80,75,0.08)",    border: "rgba(80,80,75,0.2)" },
  available:      { label: "구매 가능",   color: "#c9a96e", bg: "rgba(201,169,110,0.08)", border: "rgba(201,169,110,0.35)" },
  rare:           { label: "희귀 · Rare", color: "#d4af7a", bg: "rgba(212,175,122,0.1)",  border: "rgba(212,175,122,0.4)" },
  unavailable:    { label: "구매 불가",   color: "#f87171", bg: "rgba(239,68,68,0.06)",   border: "rgba(239,68,68,0.3)" },
  waiting_list:   { label: "대기 중",     color: "#888880", bg: "rgba(80,80,75,0.06)",    border: "rgba(80,80,75,0.2)" },
  offer_prepared: { label: "오퍼 준비됨", color: "#88cc88", bg: "rgba(100,200,100,0.07)", border: "rgba(100,200,100,0.3)" },
};

export const EVIDENCE_KEYS = [
  "purchase_route",
  "availability_check",
  "cost_estimate",
  "receipt_availability",
  "inspection_photos",
  "customs_delivery",
] as const;

export type EvidenceKey = typeof EVIDENCE_KEYS[number];

export const EVIDENCE_LABELS: Record<EvidenceKey, string> = {
  purchase_route:       "Purchase Route Check",
  availability_check:   "European Availability Check",
  cost_estimate:        "Cost Estimate Prepared",
  receipt_availability: "Receipt Availability",
  inspection_photos:    "Inspection Photos",
  customs_delivery:     "Customs & Delivery Notice",
};

export const VIP_GRADE_META: Record<VipGrade, { color: string; bg: string; border: string }> = {
  Private: { color: "#888880", bg: "rgba(80,80,75,0.06)",    border: "rgba(80,80,75,0.2)" },
  Invited: { color: "#c9a96e", bg: "rgba(201,169,110,0.07)", border: "rgba(201,169,110,0.3)" },
  Black:   { color: "#f5f0e8", bg: "rgba(245,240,232,0.06)", border: "rgba(245,240,232,0.25)" },
  Founder: { color: "#e8c98a", bg: "rgba(232,201,138,0.1)",  border: "rgba(232,201,138,0.5)" },
};

export const EVIDENCE_CYCLE: EvidenceStatus[] = ["pending", "in_progress", "completed"];

export function nextEvidenceStatus(current: EvidenceStatus): EvidenceStatus {
  const idx = EVIDENCE_CYCLE.indexOf(current);
  return EVIDENCE_CYCLE[(idx + 1) % EVIDENCE_CYCLE.length];
}
