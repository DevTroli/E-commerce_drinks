import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'

import './globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/Header';
import { AppCartProvider } from '@/components/shop/cart-provider';
import { Toaster } from '@/components/ui/toaster';

const Oxyge = Oxygen({
  subsets: ['latin'],
  weight: [ '300','400', '700'],
})

export const metadata: Metadata = {
  title: 'Ecommerce Stripe',
  description: 'Ecommerce made with Stripe in Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={cn(Oxyge.className, 'min-h-screen', 'flex', 'flex-col')}>
        <AppCartProvider>       
          <Header />
          <main className="flex-grow">
            {children}
          <Toaster />
          </main>
        </AppCartProvider>
      </body>
    </html>
  )
}
