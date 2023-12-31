import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokédex_Next',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { name: 'Home', link: '/' },
    { name: 'Pokédex', link: '/pokedex' },
    { name: 'New arrivals', link: '/new-arrivals' },
    { name: 'On sales', link: '/on-sales' },
  ]

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen w-full justify-center">
          <div className="flex w-full max-w-[1440px] flex-col">
            <nav>
              <div className="flex w-full flex-row items-center px-10 py-8">
                <Link href="/" className="mr-6">
                  <Image
                    src="https://img.logoipsum.com/280.svg"
                    width={78}
                    height={30}
                    alt="logoipsum-280"
                  />
                </Link>
                <div className="flex flex-wrap">
                  {links.map((data, idx) => (
                    <Link key={idx} href={data.link}>
                      <p key={idx} className="m-0 mr-4 text-sm font-semibold">
                        {data.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
            <main className="w-full px-10">{children}</main>
            <footer className="flex w-full items-center border-t border-gray-400 px-8">
              <span className="inline-flex w-full items-center py-3 text-xs">
                <div className="mr-auto">Copyright © Chaos Ecommerce. All rights reserved.</div>
                <Link href="/admin">
                  <p className="font-medium">Admins</p>
                </Link>
              </span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
