'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash, Spinner } from "@/components/Svgs"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage"
import useStore from "@/app/state"
import Image from 'next/image'
import Link from 'next/link'

const Naujienos = () => {

    return (
        <div className="px-2 xl:px-0 pb-4 xl:pb-0 flex flex-col h-full">
            <div className='                    
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
                <div className='flex justify-between items-center'>
                    <h2 className='
                        font-TitleFont 
                        font-bold 
                        text-4xl 
                        md:text-4xl 
                        '
                    >
                        Naujienos
                    </h2>
                    <Link 
                        href="/personalas/naujienos/nauja" 
                        className='
                            flex
                            gap-4
                            bg-btnGreen-main
                            hover:bg-btnGreen-hover
                            active:bg-btnGreen-active
                            text-bgColor-input
                            w-max
                            px-4
                            py-2
                            rounded-md
                            drop-shadow-md
                            transition-all 
                            ease-in-out 
                            duration-200
                        '
                    >
                        Pridėti naujieną
                        <Plus className='h-6 w-6'/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Naujienos