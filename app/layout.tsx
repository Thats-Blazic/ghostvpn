import React from "react"
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Ghost VPN — Browse Invisible.',
  description: 'Military-grade encryption, a strict no-logs policy, and a one-click browser extension. Hide your IP, unblock the internet, and disappear online with Ghost VPN.',
  keywords: ['VPN', 'Ghost VPN', 'browser extension', 'online privacy', 'encrypted VPN', 'no-logs VPN', 'hide IP address'],
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
        {children}
      </body>
    </html>
  )
}
