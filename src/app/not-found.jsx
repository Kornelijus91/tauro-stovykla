import React from 'react'
import Link from 'next/link'

const Page = () => {
    return (
        <main className='flex flex-col items-center grow w-full h-screen text-fontColor-dark justify-center gap-8'>
            <Link href="/" className='font-TitleFont font-bold text-4xl md:text-5xl'>Tauro Stovykla</Link>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-2xl'>Puslapis nerastas.</p>
                <Link href="/" className='text-lg underline'>Pagrindinis puslapis</Link>
            </div>
        </main>
    )
}

export default Page