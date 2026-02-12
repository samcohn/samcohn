import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const arizonaVariable = localFont({
  src: './fonts/ArizonaVariable.woff2',
  variable: '--font-arizona',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sam Cohn',
  description: 'Personal portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${arizonaVariable.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
