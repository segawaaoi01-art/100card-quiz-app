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
  description: "日本の伝統美と親しみやすいデザインを融合させた、百人一首の暗記支援アプリです。",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/ic_launcher-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/ic_launcher-72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/ic_launcher-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/ic_launcher-144.png", sizes: "144x144", type: "image/png" },
      { url: "/icons/ic_launcher-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/ic_launcher-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/ic_launcher-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
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
