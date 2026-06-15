import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAISON PRIVÉ — Private Luxury Sourcing from Paris & Milan",
  description:
    "프랑스와 이탈리아 현지 네트워크를 통해 희소 명품, 한정판, 국내 품절 제품을 프라이빗하게 소싱합니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
