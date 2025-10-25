import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "SergHub - Wedding Planning Made Easy in Ethiopia",
  description:
    "Connect with verified local wedding vendors in Ethiopia. Find makeup artists, caterers, photographers, decorators, venues, and entertainment for your perfect wedding.",
  keywords: [
    "wedding planning",
    "Ethiopia",
    "vendors",
    "makeup artists",
    "catering",
    "photography",
    "wedding decorators",
    "venues",
    "entertainment",
  ],
  authors: [{ name: "SergHub" }],
  creator: "SergHub",
  publisher: "SergHub",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://serghub.vercel.app",
  siteName: "SergHub",
  title: "SergHub - Wedding Planning Made Easy in Ethiopia",
    description:
      "Connect with verified local wedding vendors in Ethiopia. Find everything you need for your perfect wedding.",
    images: [
      {
        url: "https://serghub.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
  alt: "SergHub - Wedding Planning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  title: "SergHub - Wedding Planning Made Easy",
    description: "Connect with verified local wedding vendors in Ethiopia",
  creator: "@serghub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://serghub.vercel.app",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a5a5" />
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable} font-body antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
