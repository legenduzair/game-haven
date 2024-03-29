import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'],
   variable: '--font-poppins',
  })

export const metadata: Metadata = {
  title: 'Game Haven',
  description: 'Game Haven is a platform for video game event management.',
  icons : {
    icon: '/assets/images/game-logo.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
