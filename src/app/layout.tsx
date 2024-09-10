import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import LoadingPage from "@/components/global/modal/loadingPage";
import NotificationPage from "@/components/global/modal/notif";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: "Khodam Checker",
  description: "Cek Khodam anda dan miliki teman pendamping",
  keywords: ["mystic", "horor", "khodam", "cek khodam", "check", "check khodam", "cek kodam", "vercel", "nextjs", "react", "jin", "pendamping", "makhluk", "makhluk halus", "jin pendamping"],
};

interface Root {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Root>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      </head>
      <body className={roboto.className}>
        {children}
        <Analytics />
        <LoadingPage />
        <NotificationPage />
      </body>
    </html>
  );
}
