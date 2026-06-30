import "@/styles/globals.css";
import { LiveContentProvider } from "@/components/LiveContentProvider";
import { siteContent } from "@/data/siteContent";

export const metadata = {
  title: "Lin Chen - Product Design Engineer",
  description:
    "Apple inspired interactive resume site for a product design engineer.",
  keywords: [
    "Product Design Engineer",
    "Frontend Engineer",
    "Interactive Resume",
    "Framer Motion",
    "Portfolio"
  ],
  openGraph: {
    title: "Lin Chen - Product Design Engineer",
    description:
      "A product grade interactive resume experience with Apple inspired motion.",
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
