import "@/styles/globals.css";
import { LiveContentProvider } from "@/components/LiveContentProvider";
import { siteContent } from "@/data/siteContent";

export const metadata = {
  title: "Lin Chen - 产品设计工程师",
  description:
    "Apple 风格的个人简历交互网站，展示产品设计、前端工程与动效能力。",
  keywords: [
    "产品设计工程师",
    "前端工程师",
    "交互简历",
    "Framer Motion",
    "个人作品集"
  ],
  openGraph: {
    title: "Lin Chen - 产品设计工程师",
    description:
      "一个具备 Apple 产品页质感的个人简历交互体验。",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <LiveContentProvider initialContent={siteContent}>{children}</LiveContentProvider>
      </body>
    </html>
  );
}
