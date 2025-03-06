import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
// Add this to your app/layout.tsx to make the Toaster available globally
import { Toaster } from "@/components/toaster"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

