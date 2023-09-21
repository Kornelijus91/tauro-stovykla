"use client"

import Footer from '@/components/Footer'
import Toast from '@/components/Toast'

export default function RootLayout({ children }) {
	return (
		<>
			<main className='w-full flex flex-col justify-center items-center text-fontColor-dark'>
				{children}
			</main>
			<Toast />
			<Footer />
		</>
  	)
}
