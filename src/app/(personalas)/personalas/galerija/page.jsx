'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash, Spinner, MenuDots } from "@/components/Svgs"
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

const Menu = ({ id }) => {


    return (
        <DropdownMenu >
            <DropdownMenuTrigger 
                className='    
                    p-2     
                    rounded-lg
                    hover:bg-bgColor-dark
                    transition-all 
                    ease-in-out 
                    duration-200
                '
            >
                <MenuDots className='h-6 w-6'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-bgColor-light mr-4 drop-shadow-md border border-bgColor-dark rounded-lg'>
                <DropdownMenuItem 
                    className='

                        p-0
                        m-0
                '>
                    <Link 
                        href={`/personalas/galerija/naujasAlbumas?id=${id}`}
                        className='
                            w-full 
                            h-full 
                            flex 
                            grow
                            hover:bg-bgColor-dark
                            transition-all 
                            ease-in-out 
                            duration-200
                            p-2
                            rounded-lg
                        '
                    >
                        Redaguoti
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem  
                    className='
                        hover:bg-bgColor-dark
                        transition-all 
                        ease-in-out 
                        duration-200
                '>
                    Ištrinti
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const Galerija = () => {

    const { setToast } = useStore((state) => state)

    const [uploading, setUploading] = useState('')
    const [deleting, setDeleting] = useState('')
    const [albums, setAlbums] = useState([])

    // const storage = getStorage()

    const getAllAlbums = async () => {
        setUploading('Gaunami albumai...')
        try {
            const q = query(collection(database, "galerija"), orderBy("created", "desc"))
            const querySnapshot = await getDocs(q)
            let tempAlbumArray = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                tempAlbumArray.push({
                    id: doc.id,
                    title: data.title,
                    images: data.images,
                    created: data.created
                })
            })
            setAlbums(tempAlbumArray)
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko gauti albumų.'      
            )
        }
        setUploading('')
    }

    // const getAllFiles = async () => {
    //     setUploading('Gaunamos nuotraukos.')
    //     const listRef = ref(storage, 'galerija/')
    //     try {
    //         let arrayCopy = []
    //         const result = await listAll(listRef)
    //         for (const itemRef of result.items) {
    //             const url = await getDownloadURL(itemRef)
    //             const contains = arrayCopy.some((item) => item.url === url)
    //             if (!contains) arrayCopy.push({
    //                 url: url,
    //                 ref: itemRef
    //             })
    //         }
    //         setImgUrls(arrayCopy)
    //     } catch (err) {
    //         console.error(err)
    //         setToast(
    //             'warning',
    //             'Klaida! Nepavyko gauti galerijos nuotraukų.'      
    //         )
    //     }
    //     setUploading('')
    // }

    // const uploadFile = (file) => {
    //     return new Promise(function (resolve, reject) {
    //         const storageRef = ref(storage, 'galerija/' + encodeURIComponent(file.name))
    //         const uploadTask = uploadBytesResumable(storageRef, file)
    //         uploadTask.on('state_changed',
    //             (snapshot) => {
    //                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //                 setUploading(`Įkeliamas failas - ${file.name}. ${Math.round(progress)}%`)
    //             }, 
    //             (error) => {
    //                 switch (error.code) {
    //                 case 'storage/unauthorized':
    //                     console.error('UNAUTHORIZED')
    //                     setToast(
    //                         'warning',
    //                         'Klaida! Pabandykite vėliau.'      
    //                     )
    //                     reject()
    //                     break
    //                 case 'storage/canceled':
    //                     console.error('UPLOAD CACNELED!')
    //                     setToast(
    //                         'warning',
    //                         'Klaida! Pabandykite vėliau.'      
    //                     )
    //                     reject()
    //                     break
    //                 case 'storage/unknown':
    //                     console.error(error)
    //                     console.error('ERROR - ', error.code, 'https://firebase.google.com/docs/storage/web/handle-errors')
    //                     setToast(
    //                         'warning',
    //                         'Klaida! Pabandykite vėliau.'      
    //                     )
    //                     reject()
    //                     break
    //                 }
    //             }, 
    //             () => {
    //                 resolve()
    //             }
    //         )
    //     })
    // }

    // const handleFileChange = async (e) => {
    //     if (e.target.files) {
    //         setUploading('Įkeliamas failas.')
    //         for (const [_, value] of Object.entries(e.target.files)) {
    //             await uploadFile(value)
    //         }
    //         setToast(
    //             'success',
    //             'Nuotraukos įkeltos!'      
    //         )
    //         getAllFiles()
    //         setUploading('')
    //     }
    // }

    // const deleteFile = (ref, url) => {
    //     setDeleting(url)
    //     deleteObject(ref).then(() => {
    //         getAllFiles()
    //         setToast(
    //             'success',
    //             'Nuotrauka ištrinta!'      
    //         )
    //     }).then(() => {
    //         setDeleting('')
    //     }).catch((error) => {
    //         console.error(error)
    //         setToast(
    //             'warning',
    //             'Klaida! Nepavyko ištrinti nuotraukos.'      
    //         )
    //     })
    // }

    useEffect(() => {
        getAllAlbums()
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
                            Galerija
                        </h2>
                        <Link 
                            href="/personalas/galerija/naujasAlbumas" 
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
                            Pridėti albumą
                            <Plus className='h-6 w-6'/>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full gap-y-8'>
                {albums.map((item, index) => 
                    <div key={index}>
                        <div className='flex justify-between items-center py-1'>
                            <h3 
                                className='text-xl font-semibold'
                            >
                                {item.title}
                            </h3>
                            <Menu id={item.id}/>
                        </div>
                        <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                            <div className="flex w-max space-x-1 pb-4">
                                {item.images.map((image, index) => (
                                    <figure key={index} className="shrink-0">
                                        <div className="overflow-hidden rounded-lg h-full">
                                            <Image
                                                src={image}
                                                alt={`Photo by ${image}`}
                                                className="h-40 w-fit object-cover"
                                                width={300}
                                                height={200}
                                                priority
                                            />
                                        </div>
                                    </figure>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" forceMount/>
                        </ScrollArea>
                    </div>
                )}
            </div>

            {/* <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 pb-4'>
                {imgUrls.map((item, index) => 
                    <div 
                        key={item.url}
                        className='relative '
                    >
                        <Image
                            src={item.url}
                            width={480}
                            height={270}
                            alt={`paveikslelis-${index}`}
                            className='rounded-lg h-40 w-full object-cover'
                        />
                        <button 
                            className='bg-bgColor-light rounded absolute top-1 right-1 p-1'
                            onClick={() => deleteFile(item.ref, item.url)}
                        >
                            
                            {deleting === item.url ? <Spinner className='h-6 w-6 animate-spin-reverse'/> : <Trash className='h-6 w-6'/>}
                        </button>
                    </div>
                )}
            </div> */}
            
            {/* <div className='flex items-center gap-4'>
                <label 
                    htmlFor="myFile"
                    className='
                        flex
                        gap-4
                        bg-btnGreen-main
                        hover:bg-btnGreen-hover
                        active:bg-btnGreen-active
                        text-bgColor-input
                        cursor-pointer
                        w-max
                        px-4
                        py-2
                        rounded-md
                        drop-shadow-md
                        transition-all 
                        ease-in-out 
                        duration-200
                    '
                    aria-disabled={uploading !== ''}
                >
                    Pridėti nuotrauką 
                    <Plus className='h-6 w-6'/>
                </label>
                <input type="file" id="myFile" name="filename" className='hidden' accept="image/*" multiple onChange={handleFileChange} disabled={uploading !== ''}/>
                <p>{uploading}</p>
            </div> */}
        </div>
    )
}

export default Galerija