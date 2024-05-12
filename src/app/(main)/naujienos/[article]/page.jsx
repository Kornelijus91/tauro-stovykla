import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"
import { DividerInverted, Divider } from "@/components/Svgs"
import Image from "next/image"
import ArticleRender from "@/components/ArticleRender"
import { notFound } from "next/navigation"

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

    return (
        <main className='flex flex-col items-center grow w-full'>
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