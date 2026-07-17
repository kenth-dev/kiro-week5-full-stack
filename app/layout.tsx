import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "UBRA Digital Passport",
  description:
    "Explore Filipino crafts, learn their stories, complete cultural challenges, and collect stamps in your own digital passport.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAuthed = Boolean(data?.claims?.sub);

  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Navbar isAuthed={isAuthed} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
