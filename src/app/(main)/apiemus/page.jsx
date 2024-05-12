import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"
import { DividerInverted, Divider } from "@/components/Svgs"
import ArticleRender from "@/components/ArticleRender"


const Apiemus = async () => {
    const aboutRef = doc(database, 'pageData/about')
    const aboutReq = await getDoc(aboutRef)
    const aboutData = aboutReq.data()

    return (
        <main className='flex flex-col items-center grow w-full'>
            <DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
            <article className='relative flex flex-col grow w-full xl:w-[80rem] pb-6 px-4 xl:px-0'>
                <ArticleRender json={JSON.parse(aboutData.pageContent)}/>
            </article>
            <Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
        </main>
    )
}

export default Apiemus