import { Suspense } from "react"
import { ref, getDownloadURL, listAll, getStorage } from "firebase/storage"
import { firebaseApp } from "@/app/firebase"
import Galerija from "./Galerija"

const images = async () => {
    const app = firebaseApp
    const storage = getStorage()
    const listRef = ref(storage, 'galerija/')
    try {
        let arrayCopy = []
        const result = await listAll(listRef)
        for (const itemRef of result.items) {
            const url = await getDownloadURL(itemRef)
            const contains = arrayCopy.some((item) => item.url === url)
            if (!contains) arrayCopy.push(url)
        }
        return arrayCopy
    } catch (err) {
        return []
    }
}

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

const GalerijaOutter = async () => {
    const data = await JSON.parse(JSON.stringify(await images()))
    return (
        <Suspense fallback={<GalerijaSkeleton />}>
            <Galerija images={data}/>
        </Suspense>
    )
}

export default GalerijaOutter