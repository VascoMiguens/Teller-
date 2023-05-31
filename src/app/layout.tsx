import './globals.css'
import { Inter } from 'next/font/google'
import "./styles/main.scss"
import Navbar from './components/navbar'
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Teller',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}</body>
    </html>
  )
}
