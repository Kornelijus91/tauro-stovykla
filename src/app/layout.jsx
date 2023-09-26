import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
	weight: ['200', '400'],
	subsets: ['latin'],
	display: 'swap', 
})

const title = 'Tauro Stovykla'
const aprasymas = 'APRASYMAS'

export const metadata = {
	title: title,
	description: aprasymas,
	openGraph: {
		title: title,
		description: aprasymas,
		// url: 'https://nextjs.org',
		siteName: title,
		// images: [
		//   {
		// 	url: 'https://nextjs.org/og.png',
		// 	width: 800,
		// 	height: 600,
		//   },
		//   {
		// 	url: 'https://nextjs.org/og-alt.png',
		// 	width: 1800,
		// 	height: 1600,
		// 	alt: 'My custom alt',
		//   },
		// ],
		locale: 'lt_LT',
		type: 'website',
	},
	robots: {
		index: false,
		// follow: true,
		// nocache: true,
		// googleBot: {
		//   index: true,
		//   follow: false,
		//   noimageindex: true,
		//   'max-video-preview': -1,
		//   'max-image-preview': 'large',
		//   'max-snippet': -1,
		// },
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="lt">
			<body className={`${poppins.className} bg-bgColor-light min-h-screen flex flex-col`}>
				{children}
			</body>
		</html>
  	)
}
