import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"
import { DividerInverted, Divider } from "@/components/Svgs"
import Galerija from "@/components/Galerija"
import { notFound } from "next/navigation"

const Page = async ({ params }) => {
    let albumRef 
    let albumReq 
    let albumData 
    try {
        albumRef = doc(database, `galerija/${params.album}`)
        albumReq = await getDoc(albumRef)
        albumData = albumReq.data()
        if (!albumData) return notFound()
    } catch (err) {
        console.error(err)
        return notFound()
    }

    return (
        <main className='flex flex-col items-center grow w-full'>
            <DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
            <article className='flex flex-col grow w-full xl:w-[80rem] pb-6 gap-6 px-4 xl:px-0'>
                <h1 className='font-TitleFont font-bold text-4xl text-fontColor-dark'>{albumData.title}</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {albumData.images.length > 0 ?
                        <Galerija images={albumData.images}/>
                    :
                        <p>Nuotraukų nėra...</p>
                    }
                </div>
            </article>
            <Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
        </main>
    )
}

export default Page