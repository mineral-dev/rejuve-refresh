import Image from 'next/image'
import { Inter } from 'next/font/google'
import Logo from '@/components/Logo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='bg-primary-200 w-screen h-screen grid place-items-center text-5xl'>
      <Logo />
    </main>
  )
}
