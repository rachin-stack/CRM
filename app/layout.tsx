import "./globals.css";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-6xl pb-20">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
