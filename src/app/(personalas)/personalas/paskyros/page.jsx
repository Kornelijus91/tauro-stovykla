'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash, Spinner, MenuDots, DisketeIcon } from "@/components/Svgs"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { database } from '@/app/firebase'
import useStore from "@/app/state"
import Image from 'next/image'
import Link from 'next/link'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const Paskyros = () => {

    const { setToast } = useStore((state) => state)

    const [downloading, setDownloading] = useState(false)
    const [deleting, setDeleting] = useState('')
    const [albums, setAlbums] = useState([])

    // const storage = getStorage()

    const getAllUsers = async () => {
        setDownloading(true)
        try {
            const q = query(collection(database, "users/"))
            const querySnapshot = await getDocs(q)
            let tempUserArray = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                tempUserArray.push(data)
            })
            // setAlbums(tempAlbumArray)
            console.log('USERS -> ', tempUserArray)
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko gauti albumų.'      
            )
        }
        setDownloading(false)
    }

    useEffect(() => {
        getAllUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="px-2 xl:px-0 pb-4 flex flex-col h-full">
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
                            Paskyros
                        </h2>
                        <button 
                            // onClick={saveArticle}
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
                            Išsaugoti
                            <DisketeIcon className='h-6 w-6'/>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Paskyros