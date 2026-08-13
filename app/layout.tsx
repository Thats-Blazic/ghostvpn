import React from "react"
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: '--font-jetbrains-mono',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ghostvpn.sh'
const TITLE = 'Ghost VPN — Browse Invisible.'
const DESCRIPTION = 'Military-grade encryption, a strict no-logs policy, and a one-click browser extension. Hide your IP, unblock the internet, and disappear online with Ghost VPN.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['VPN', 'Ghost VPN', 'browser extension', 'online privacy', 'encrypted VPN', 'no-logs VPN', 'hide IP address'],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Ghost VPN',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#030209',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
