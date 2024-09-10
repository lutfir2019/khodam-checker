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
        {/* Google Tag Manager */}
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5SZS6JW4');</script>
        {/* End Google Tag Manager */}
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      </head>
      <body className={roboto.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5SZS6JW4"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Analytics />
        <LoadingPage />
        <NotificationPage />
      </body>
    </html>
  );
}
