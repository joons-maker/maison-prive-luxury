import { getSupabaseClient } from "./supabase";

export type RequestStatus =
  | "new" | "checking" | "quoted" | "paid"
  | "sourcing" | "shipped" | "completed" | "cancelled";

export type Priority = "High" | "Medium" | "Standard";

export interface LuxuryRequest {
  id: string;
  name: string;
  phone: string;
  kakao_id: string;
  email: string;
  brand: string;
  product_name: string;
  product_image_urls: string[];
  budget: string;
  preferred_country: "france" | "italy" | "any";
  delivery_preference: "domestic" | "overseas" | "consult";
  message: string;
  invitation_code?: string | null;
  status: RequestStatus;
  admin_memo: string;
  estimated_price: string;
  created_at: string;
  updated_at: string;
}

export type CreateLuxuryRequestInput = Pick<LuxuryRequest,
  "name" | "phone" | "kakao_id" | "email" | "brand" | "product_name"
  | "product_image_urls" | "budget" | "preferred_country" | "delivery_preference" | "message"
> & { invitation_code?: string };

export function getRequestPriority(r: Pick<LuxuryRequest, "invitation_code" | "budget">): Priority {
  if (r.invitation_code?.trim()) return "High";
  if (r.budget === "3,000만원 이상" || r.budget === "가격 상관없음") return "High";
  if (r.budget === "1,000만~3,000만원") return "Medium";
  return "Standard";
}

export async function createLuxuryRequest(input: CreateLuxuryRequestInput): Promise<LuxuryRequest> {
  const { data, error } = await getSupabaseClient(true)
    .from("luxury_requests").insert(input).select().single();
  if (error) throw new Error(`문의 저장 실패: ${error.message}`);
  return data as LuxuryRequest;
}

export async function getLuxuryRequests(status?: RequestStatus, search?: string): Promise<LuxuryRequest[]> {
  let query = getSupabaseClient(true)
    .from("luxury_requests").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  if (search) {
    const q = `%${search}%`;
    query = query.or(`name.ilike.${q},phone.ilike.${q},kakao_id.ilike.${q},brand.ilike.${q},product_name.ilike.${q}`);
  }
  const { data, error } = await query;
  if (error) throw new Error(`목록 조회 실패: ${error.message}`);
  return (data ?? []) as LuxuryRequest[];
}

export async function getLuxuryRequestById(id: string): Promise<LuxuryRequest | null> {
  const { data, error } = await getSupabaseClient(true)
    .from("luxury_requests").select("*").eq("id", id).single();
  if (error) return null;
  return data as LuxuryRequest;
}

export async function updateLuxuryRequestStatus(id: string, status: RequestStatus): Promise<void> {
  const { error } = await getSupabaseClient(true)
    .from("luxury_requests").update({ status }).eq("id", id);
  if (error) throw new Error(`상태 변경 실패: ${error.message}`);
}

export async function updateLuxuryRequestAdminFields(
  id: string, fields: { admin_memo?: string; estimated_price?: string }
): Promise<void> {
  const { error } = await getSupabaseClient(true)
    .from("luxury_requests").update(fields).eq("id", id);
  if (error) throw new Error(`관리자 정보 저장 실패: ${error.message}`);
}

export const STATUS_LABELS: Record<RequestStatus, string> = {
  new: "신규 접수", checking: "제품 확인 중", quoted: "견적 발송",
  paid: "결제 완료", sourcing: "소싱 진행 중", shipped: "배송 중",
  completed: "완료", cancelled: "취소",
};

export const STATUS_COLORS: Record<RequestStatus, string> = {
  new:       "text-blue-400 bg-blue-400/10",
  checking:  "text-yellow-400 bg-yellow-400/10",
  quoted:    "text-purple-400 bg-purple-400/10",
  paid:      "text-green-400 bg-green-400/10",
  sourcing:  "text-orange-400 bg-orange-400/10",
  shipped:   "text-cyan-400 bg-cyan-400/10",
  completed: "text-yellow-600 bg-yellow-600/10",
  cancelled: "text-red-400 bg-red-400/10",
};

export const TRACK_STATUS_LABELS: Record<RequestStatus, { en: string; ko: string }> = {
  new:       { en: "Request Received",      ko: "접수 완료" },
  checking:  { en: "European Check",        ko: "현지 부티크 확인 중" },
  quoted:    { en: "Private Quotation",     ko: "프라이빗 견적 발송" },
  paid:      { en: "Payment Confirmed",     ko: "결제 확인" },
  sourcing:  { en: "Boutique Sourcing",     ko: "현지 소싱 진행 중" },
  shipped:   { en: "International Delivery",ko: "국제 배송 중" },
  completed: { en: "Completed",             ko: "소싱 완료" },
  cancelled: { en: "Cancelled",             ko: "취소됨" },
};

export const STATUS_ORDER: RequestStatus[] = [
  "new", "checking", "quoted", "paid", "sourcing", "shipped", "completed",
];
