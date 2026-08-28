'use client'

import React from 'react'
import '@/styles/globals.css'

export const metadata = {
  title: 'GWS Website 2.0 - Global Wealth Solutions',
  description: 'Modern, AI-powered solutions for wealth management and financial growth',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          {/* Navigation will go here */}
          <main className="flex-1">
            {children}
          </main>
          {/* Footer will go here */}
        </div>
      </body>
    </html>
  )
}
