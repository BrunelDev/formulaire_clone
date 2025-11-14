import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Vos plans de permis de construire pas chers à partir de 350€",
  description: "Obtenez votre plan de permis en ligne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${figtree.variable} antialiased bg-[#f7f7f8] font-figtree`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
