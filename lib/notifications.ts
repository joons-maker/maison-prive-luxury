import type { LuxuryRequest } from "./luxury-requests";

/**
 * 새 VIP 문의 접수 시 알림 발송.
 * 현재는 console.log만 출력.
 * 추후 카카오 알림톡, SMS, 이메일 API를 이 파일에서만 연결하면 됩니다.
 */
export async function notifyNewLuxuryRequest(request: LuxuryRequest): Promise<void> {
  console.log("[MAISON PRIVÉ] 새 VIP 문의:", {
    id: request.id, name: request.name,
    brand: request.brand, budget: request.budget,
    createdAt: request.created_at,
  });

  // TODO: 카카오 알림톡
  // await sendKakaoAlimtalk({ to: process.env.ADMIN_PHONE!, ... });

  // TODO: 이메일 (Resend)
  // await resend.emails.send({ to: process.env.ADMIN_EMAIL!, ... });

  // TODO: SMS (Aligo)
  // await sendAligo({ receiver: process.env.ADMIN_PHONE!, ... });
}
