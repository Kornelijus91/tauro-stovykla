import { Suspense } from "react"
import Galerija from "./Galerija"

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

const GalerijaOutter = async ({images}) => {
    return (
        <Suspense fallback={<GalerijaSkeleton />}>
            <Galerija images={images}/>
        </Suspense>
    )
}

export default GalerijaOutter