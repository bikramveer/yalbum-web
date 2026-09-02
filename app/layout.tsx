import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { DemoModalProvider } from "@/components/DemoModalProvider";
import ToastProvider from "@/components/ToastProvider";

// Display face — wordmark, headings, numbered circles. (Guide §1.3)
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

// Body / UI face — everything else.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Y A L B U M",
  description: "A private photo album for our special moments together",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body>
        <AuthProvider>
          <DemoModalProvider>
            {children}
            <ToastProvider />
          </DemoModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}