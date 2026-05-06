import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScreenFree — Give them back the childhood screens are quietly taking",
  description: "Weekly screen-free activity packs for parents of toddlers (ages 2–4). Research-informed play that pulls little hands away from screens — and back to wonder, imagination, and you.",
};

// next-intl renders <html> inside [locale]/layout. This top-level layout exists
// only to satisfy Next.js App Router; it must NOT render <html> itself.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
