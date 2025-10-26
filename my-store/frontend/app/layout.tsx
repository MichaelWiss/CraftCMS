import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/ui/Header'

export const metadata: Metadata = {
  title: 'My Store - E-commerce with Craft CMS',
  description: 'A modern e-commerce store powered by Craft CMS and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
