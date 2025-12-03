import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "N S GIFT & DECOR - Handmade Keychains and Earrings",
  description: "Discover beautiful keychains and earrings handmade with love",
  keywords: ["shop", "keychains", "earrings", "handmade", "jewelry", "gifts", "decor"],
  authors: [{ name: "N S GIFT & DECOR" }],
  openGraph: {
    title: "N S GIFT & DECOR - Handmade Keychains and Earrings",
    description: "Discover beautiful keychains and earrings handmade with love",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AdminAuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
