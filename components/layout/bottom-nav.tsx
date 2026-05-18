"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  ["Dashboard", "/dashboard"],
  ["Leads", "/leads"],
  ["Properties", "/properties"],
  ["Follow-ups", "/followups"],
  ["More", "/more/settings"]
] as const;

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white p-2 md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-5 gap-2 text-xs">
        {tabs.map(([name, href]) => (
          <Link key={href} className={`rounded p-2 text-center ${path.startsWith(href) ? "bg-slate-900 text-white" : "bg-slate-100"}`} href={href}>{name}</Link>
        ))}
      </div>
    </nav>
  );
}
