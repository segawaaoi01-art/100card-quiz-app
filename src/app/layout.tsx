import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-maru-gothic",
});

export const metadata: Metadata = {
  title: "百人一首暗記ゲーム | 聞いて覚える",
  description: "日本の伝統美と親しみやすいザインを融合させた、百人一首の暗記支援アプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${zenMaruGothic.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
