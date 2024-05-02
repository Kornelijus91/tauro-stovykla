'use client'

import { useState, useEffect } from 'react'
import { Plus, Spinner, MenuDots } from "@/components/Svgs"
import { collection, query, getDocs, orderBy, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"
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
import { deleteFile } from '@/lib/utils'
import DelAlbumConfirm from '@/components/DelAlbumConfirm'
import { StarIcon } from '@/components/Svgs'
import Tooltip from '@/components/Tooltip'

const Menu = ({ item, setDeletingAlbumConfirm, deleting }) => {
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
                {deleting === item.id ?
                    <Spinner className='h-6 w-6 animate-spin-reverse'/>
                :
                    <MenuDots className='h-6 w-6'/>
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-bgColor-light mr-4 drop-shadow-md border border-bgColor-dark rounded-lg'>
                <DropdownMenuItem className='p-0 m-0'>
                    <Link 
                        href={`/personalas/galerija/naujasAlbumas?id=${item.id}`}
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
                <DropdownMenuItem className='p-0 m-0'>
                    <button 
                        onClick={() => {
                            setDeletingAlbumConfirm({
                                item: item,
                                open: true
                            })
                        }}
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
                        Ištrinti
                    </button>
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
    const [featuredImgs, setFeaturedImgs] = useState([])
    const [featuring, setFeaturing] = useState(false)
    const [deletingAlbumConfirm, setDeletingAlbumConfirm] = useState({
        item: null,
        open: false
    })

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

    const getHomepageFeatures = async () => {
        try {
            const docSnap = await getDoc(doc(database, "pageData", "homepage"))
            if (docSnap.exists()) {
                const data = docSnap.data()
                setFeaturedImgs(data.featuredPhotos)
            } else {
                console.error("No such document!")
                setToast(
                    'warning',
                    'Klaida! Nepavyko gauti duomenų.'      
                )
            }
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko gauti duomenų.'      
            )
        }
    }

    const handleDeleteAlbum = async (id) => {
        const albumIndex = albums.findIndex(x => x.id === id)
        const albumToDelete = albums[albumIndex]

        if (albumToDelete) {
            setDeleting(albumToDelete.id)
    
            try {
                for (const imgToDelete of albumToDelete.images) { await deleteFile(imgToDelete) }
                await deleteDoc(doc(database, "galerija", albumToDelete.id))
                setDeletingAlbumConfirm({
                    item: null,
                    open: false
                })
                getAllAlbums()
                setToast(
                    'success',
                    'Albumas ištrintas.'      
                )
            } catch (err) {
                console.error(err)
                setToast(
                    'warning',
                    'Klaida! Nepavyko ištrinti albumo.'      
                )
            } finally {
                setDeleting('')
            }

        } else {
            console.error('Nerastas albumas.')
            setToast(
                'warning',
                'Klaida! Nepavyko ištrinti albumo.'      
            )
        }
    }

    const handleHomePageFeature = async (url) => {

        const imageIndex = featuredImgs.indexOf(url)
        const action = imageIndex > -1

        try {
            setFeaturing(true)
            await updateDoc(doc(database, "pageData", "homepage"), {
                featuredPhotos: action ? arrayRemove(url) : arrayUnion(url) // false = add to array <> true = remove from array
            })
            let featuredImgsArrayCopy = [...featuredImgs]
            if (action) {
                featuredImgsArrayCopy.splice(imageIndex, 1)
            } else {
                featuredImgsArrayCopy.push(url)
            }
            setFeaturedImgs(featuredImgsArrayCopy)
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko pridėti nuotraukos prie pagrindinio puslapio.'      
            )
        } finally {
            setFeaturing(false)
        }
    }

    useEffect(() => {
        getAllAlbums()
        getHomepageFeatures()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <DelAlbumConfirm 
                deletingAlbumConfirm={deletingAlbumConfirm} 
                setDeletingAlbumConfirm={setDeletingAlbumConfirm} 
                delFunction={handleDeleteAlbum}
            />
            <div className='flex flex-col'>
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
                    {uploading !== '' ? 
                    <p>{uploading}</p>
                    : albums.length > 0 ? albums.map((item, index) => 
                        <div key={index}>
                            <div className='flex justify-between items-center py-1'>
                                <h3 
                                    className='text-xl font-semibold'
                                >
                                    {item.title}
                                </h3>
                                <Menu item={item} setDeletingAlbumConfirm={setDeletingAlbumConfirm} deleting={deleting}/>
                            </div>
                            <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                                <div className="flex w-max space-x-1 pb-4">
                                    {item.images.map((image, index) => (
                                        <figure key={index} className="shrink-0">
                                            <div className="relative overflow-hidden rounded-lg h-full">
                                                <Image
                                                    src={image}
                                                    alt={`Photo by ${image}`}
                                                    className="h-40 w-fit object-cover"
                                                    width={300}
                                                    height={200}
                                                    priority
                                                />
                                                <Tooltip text='Pridėti prie pagrindinio puslapio'>
                                                    <button 
                                                        className='
                                                            bg-bgColor-input 
                                                            rounded 
                                                            absolute 
                                                            top-1 
                                                            right-1 
                                                            p-1
                                                            hover:bg-bgColor-light
                                                            active:bg-bgColor-dark
                                                            disabled:opacity-20
                                                            transition
                                                            ease-in-out
                                                            duration-150
                                                        '
                                                        onClick={() => handleHomePageFeature(image)}
                                                        disabled={featuring}
                                                    >
                                                        <StarIcon 
                                                            className='h-6 w-6'
                                                            style={{
                                                                fill: featuredImgs.indexOf(image) > -1 ? '#ffb703' : 'none'
                                                            }}
                                                        />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </figure>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" forceMount/>
                            </ScrollArea>
                        </div>
                    )
                    :
                        <p>Albumų nėra</p>
                    }
                </div>
            </div>
        </>
    )
}

export default Galerija