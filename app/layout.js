import { Inter } from 'next/font/google'
import './globals.css'
import './style.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'
import ReduxProvider from '@/provider/redux/ReduxProvider'
import MainLayout from '@/layout/MainLayout'
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (

    <ReduxProvider>
      <MainLayout>
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="min-h-[50vh] w-full">
        <NextTopLoader  color="#7947fe" />
        {children}
        </div>
        <Footer/>
        </body>
    </html>
    </MainLayout>
    </ReduxProvider>
  )
}
