import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"
import { DividerInverted, Divider } from "@/components/Svgs"
import Image from "next/image"
import ArticleRender from "@/components/ArticleRender"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }) {

	const articleRef = doc(database, `naujienos/${params.article}`)
    const articleReq = await getDoc(articleRef)
    const articleData = articleReq.data()

	return {
		title: 'Tauro Stovykla',
		description: articleData.title,
		alternates: {
			canonical: `/naujienos/${params.article}`,
		},
		openGraph: {
			title: 'Tauro Stovykla',
			description: articleData.title,
			url: `/naujienos/${params.article}`,
			siteName: 'Tauro Stovykla',
			images: [{
                url: articleData.imageURL,
                width: 800,
                height: 600,
            }],
			locale: 'lt_LT',
			type: 'article',
		},
	}
}

const Page = async ({ params }) => {
    let articleRef 
    let articleReq 
    let articleData 
    try {
        articleRef = doc(database, `naujienos/${params.article}`)
        articleReq = await getDoc(articleRef)
        articleData = articleReq.data()
        if (!articleData) return notFound()
    } catch (err) {
        console.error(err)
        return notFound()
    }

    const jsonLd = {
		"@context": "https://schema.org",
        "@type": "NewsArticle",
		headline: articleData.title,
		image: [
			new URL(articleData.imageURL),
		],
	}

    return (
        <main className='flex flex-col items-center grow w-full'>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
            <article className='flex flex-col grow w-full xl:w-[80rem] pb-6 gap-6 px-4 xl:px-0'>
                <Image
                    src={articleData.imageURL}
                    width={1920}
                    height={1080}
                    alt="Naujienos paveikslėlis"
                    className='w-auto rounded-lg h-64 object-cover'
                />
               <ArticleRender json={JSON.parse(articleData.content)}/>
            </article>
            <Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
        </main>
    )
}

export default Page