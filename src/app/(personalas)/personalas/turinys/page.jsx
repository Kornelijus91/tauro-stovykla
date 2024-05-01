'use client'

import Link from "next/link"

const Galerija = () => {

    return (
        <div className="px-2 xl:px-0 pb-4 xl:pb-0">
           <h2 className='
                font-TitleFont 
                font-bold 
                text-4xl 
                md:text-4xl 
                mb-2 
                after:my-2 
                after:w-full 
                after:h-px 
                flex 
                flex-col 
                justify-between 
                after:bg-fontColor-dark 
                after:rounded-full
                '
            >
                Turinys
            </h2>
            <div className="flex flex-col gap-2 w-fit">
                <Link 
                    href="/personalas/turinys/mainpage" 
                    className='
                        flex
                        gap-4
                        justify-center
                        items-center
                        bg-btnGreen-main
                        hover:bg-btnGreen-hover
                        active:bg-btnGreen-active
                        text-bgColor-input
                        w-full
                        px-4
                        py-2
                        rounded-md
                        drop-shadow-md
                        transition-all 
                        ease-in-out 
                        duration-200
                    '
                >
                    Pagrindinis puslapis
                </Link>
                <Link 
                    href="/personalas/turinys/mainpage" 
                    className='
                        flex
                        gap-4
                        justify-center
                        items-center
                        bg-btnGreen-main
                        hover:bg-btnGreen-hover
                        active:bg-btnGreen-active
                        text-bgColor-input
                        w-full
                        px-4
                        py-2
                        rounded-md
                        drop-shadow-md
                        transition-all 
                        ease-in-out 
                        duration-200
                    '
                >
                    Apie mus
                </Link>
                <Link 
                    href="/personalas/turinys/mainpage" 
                    className='
                        flex
                        gap-4
                        justify-center
                        items-center
                        bg-btnGreen-main
                        hover:bg-btnGreen-hover
                        active:bg-btnGreen-active
                        text-bgColor-input
                        w-full
                        px-4
                        py-2
                        rounded-md
                        drop-shadow-md
                        transition-all 
                        ease-in-out 
                        duration-200
                    '
                >
                    Apie mus
                </Link>
                <Link 
                    href="/personalas/turinys/mainpage" 
                    className='
                        flex
                        gap-4
                        justify-center
                        items-center
                        bg-btnGreen-main
                        hover:bg-btnGreen-hover
                        active:bg-btnGreen-active
                        text-bgColor-input
                        w-full
                        px-4
                        py-2
                        rounded-md
                        drop-shadow-md
                        transition-all 
                        ease-in-out 
                        duration-200
                    '
                >
                    Apie mus
                </Link>
            </div>
        </div>
    )
}

export default Galerija