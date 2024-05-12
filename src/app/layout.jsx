import './globals.css'
import { Poppins } from 'next/font/google'
import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"

const poppins = Poppins({ 
	weight: ['200', '400'],
	subsets: ['latin'],
	display: 'swap', 
})

const title = 'Tauro Stovykla'

export async function generateMetadata() {

	const nameliaiRef = doc(database, 'pageData/homepage')
    const nameliaiReq = await getDoc(nameliaiRef)
    const mainPageData = nameliaiReq.data()
	let images = []
	for (const img of mainPageData.featuredPhotos) {
		images.push({
			url: img,
			width: 800,
			height: 600,
		})
	}

	return {
		title: title,
		description: mainPageData.siteDesc,
		metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL),
		alternates: {
			canonical: '/',
		},
		openGraph: {
			title: title,
			description: mainPageData.siteDesc,
			url: '/',
			siteName: title,
			images: images,
			locale: 'lt_LT',
			type: 'website',
		},
		robots: {
			index: mainPageData.googleIndex,
		},
	}
}

export default async function RootLayout({ children }) {

	const nameliaiRef = doc(database, 'pageData/homepage')
    const nameliaiReq = await getDoc(nameliaiRef)
    const mainPageData = nameliaiReq.data()

	let images = []
	for (const img of mainPageData.featuredPhotos) {
		images.push(new URL(img))
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SummerCamp',
		name: title,
		image: [
			new URL(mainPageData.mainImgUrl),
			...images
		],
		description: mainPageData.siteDesc,
		url: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL),
	}

	return (
		<html lang="lt">
			<body className={`${poppins.className} bg-bgColor-light min-h-screen flex flex-col`}>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				{children}
			</body>
		</html>
  	)
}
