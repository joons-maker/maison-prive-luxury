import { NextResponse } from "next/server";

// 임시 진단 엔드포인트 — LUXURY_ADMIN_PASSWORD 환경변수 설정 여부만 확인
// (값은 절대 노출하지 않음)
// TODO: 진단 완료 후 이 파일 삭제할 것
export async function GET() {
  const configured = !!process.env.LUXURY_ADMIN_PASSWORD;
  const length     = process.env.LUXURY_ADMIN_PASSWORD?.length ?? 0;
  return NextResponse.json({ configured, length });
}
