import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"
import { DividerInverted, Divider } from "@/components/Svgs"
import Image from "next/image"
import { Suspense } from "react"
import Galerija from "@/components/Galerija"

const GalerijaSkeleton = () => {
    return (
        <div className='w-full xl:w-[80rem] flex flex-col gap-8 items-center pt-12 pb-16 px-6 xl:px-0'>
            <h1 className='font-TitleFont font-bold text-5xl text-fontColor-dark drop-shadow-title'>Galerija</h1>	
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
                <div className='rounded-lg h-40 w-60 bg-black animate-pulse opacity-40'/>
            </div>
        </div>
    )
}

const Page = async ({ params }) => {
    let albumRef 
    let albumReq 
    let albumData 
    try {
        albumRef = doc(database, `galerija/${params.album}`)
        albumReq = await getDoc(albumRef)
        albumData = albumReq.data()
    } catch (err) {
        console.error(err)
    }

    return (
        <main className='flex flex-col items-center grow w-full'>
            <DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
            <article className='flex flex-col grow w-full xl:w-[80rem] pb-6 gap-6'>
                <h1 className='font-TitleFont font-bold text-4xl text-fontColor-dark'>{albumData.title}</h1>
                <div className="grid grid-cols-4 gap-2">
                    {albumData.images.length > 0 ?
                        <Suspense fallback={<GalerijaSkeleton />}>
                            <Galerija images={albumData.images}/>
                        </Suspense>
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