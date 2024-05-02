'use client'

import { useState, useEffect, memo } from 'react'
import { Plus, Trash, Spinner, DisketeIcon } from "@/components/Svgs"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc, doc, updateDoc, getDoc, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore"
import { database } from '@/app/firebase'
import useStore from "@/app/state"
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { navigate } from '@/lib/serverActions'
import { useSearchParams } from 'next/navigation'
import { deleteFile } from '@/lib/utils'

const UploadingDialog = ({ uploading }) => {

    return (
        <Dialog.Root open={uploading !== ''} >
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 backdrop-blur fixed inset-0 animate-overlayShow z-40"/>
                <Dialog.Content className="flex flex-col justify-center items-center px-4 py-2 rounded-lg text-fontColor-dark bg-bgColor-light fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 focus:outline-none animate-contentShow z-50">
                    <p className='pb-4 pt-2 text-xl'>
                        {uploading}
                    </p>
                    <Spinner className='h-12 w-12 animate-spin-reverse' />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

const Nuotraukos = memo(function Nuotraukos({ imgUrls, deleteImage, deleting }) {
    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-semibold'>Nuotraukos</h3>
            {imgUrls.length > 0 ?
                <div className='grid grid-cols-6 gap-1'>
                    {imgUrls.map((item, index) => 
                        <div 
                            key={index}
                            className='relative '
                        >
                            <Image
                                src={(typeof item === 'string' || item instanceof String) ? item : URL.createObjectURL(item)}
                                width={480}
                                height={270}
                                alt={`paveikslelis-${index}`}
                                className='rounded-lg h-40 w-full object-cover'
                                priority
                            />
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
                                onClick={() => deleteImage(index)}
                                disabled={deleting === item || deleting === index}
                            >
                                {deleting === item || deleting === index ? <Spinner className='h-6 w-6 animate-spin-reverse'/> : <Trash className='h-6 w-6'/>}
                            </button>
                        </div>
                    )}
                </div>
                :
                <p>Nuotraukų nėra.</p>
            }
        </div>
    )
}, arePropsEqual)

function arePropsEqual(oldProps, newProps) {
    return ( 
        oldProps.imgUrls.length === newProps.imgUrls.length 
        &&
        oldProps.imgUrls.every((oldPoint, index) => {
            return oldPoint === newProps.imgUrls[index]
        })
        && 
        oldProps.deleting === newProps.deleting
    )
}

const NaujasAlbumas = () => {

    const storage = getStorage()

    const searchParams = useSearchParams()
    const albumoID = searchParams.get('id')

    const { setToast } = useStore((state) => state)

    const [uploading, setUploading] = useState('')
    const [deleting, setDeleting] = useState(null)
    const [albumTitle, setAlbumTitle] = useState('')
    const [imgUrls, setImgUrls] = useState([])

    const gautiAlbuma = async () => {
        try {
            const docRef = doc(database, "galerija", albumoID)
            const docSnap = await getDoc(docRef)
            const albumData = docSnap.data()
            setAlbumTitle(albumData.title)
            setImgUrls(albumData.images)
        } catch (err) {
            console.error(err)
            setToast('warning', 'Klaida! Nepavyko gauti duomenų.')
        }
    }

    const uploadFile = (file) => {
        return new Promise(function (resolve, reject) {
            const storageRef = ref(storage, 'galerija/' + encodeURIComponent(file.name))
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setUploading(`Įkeliamas įkeliamas naujas paveikslėlis - ${file.name}. ${Math.round(progress)}%`)
                }, 
                (error) => {
                    setUploading('')
                    switch (error.code) {
                        case 'storage/unauthorized':
                            console.error('UNAUTHORIZED')
                            setToast(
                                'warning',
                                'Klaida! Pabandykite vėliau.'      
                            )
                            reject()
                            break
                        case 'storage/canceled':
                            console.error('UPLOAD CACNELED!')
                            setToast(
                                'warning',
                                'Klaida! Pabandykite vėliau.'      
                            )
                            reject()
                            break
                        case 'storage/unknown':
                            console.error(error)
                            console.error('ERROR - ', error.code, 'https://firebase.google.com/docs/storage/web/handle-errors')
                            setToast(
                                'warning',
                                'Klaida! Pabandykite vėliau.'      
                            )
                            reject()
                            break
                        }
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
                
            )
        })
    }

    const handleFileChange = async (e) => {
        if (e.target.files) {
            let tempFileArray = []
            for (const [_, value] of Object.entries(e.target.files)) {
                tempFileArray.push(value)
            }
            setImgUrls([...imgUrls, ...tempFileArray])
        }
    }

    const handleSave = async () => {
        if (albumTitle.replace(/\s/g, "") === '') {
            setToast(
                'warning',
                'Klaida! Įrašykite albumo pavadinimą.'      
            )
            return
        }

        if (imgUrls.length <= 0) {
            setToast(
                'warning',
                'Klaida! Įkelkite bent vieną nuotrauką.'      
            )
            return
        }

        setUploading('Įkeliamas įkeliamas naujas paveikslėlis')

        let uploadedURLS = []
        if (albumoID) {
            try {
                for (const image of imgUrls) {
                    if (typeof image !== 'string') {
                        const uploaded = await uploadFile(image)
                        uploadedURLS.push(uploaded)
                    }
                }
                await updateDoc(doc(database, `galerija/${albumoID}`), {
                    title: albumTitle,
                    images: arrayUnion(...uploadedURLS),
                    created: serverTimestamp()
                })
            } catch (err) {
                console.error(err)
                setToast(
                    'warning',
                    'Klaida! Nepavyko išsaugoti albumo.'      
                )
            }
            setToast(
                'success',
                'Albumas atnaujintas!'      
            )
        } else {
            for (const image of imgUrls) {
                const uploaded = await uploadFile(image)
                uploadedURLS.push(uploaded)
            }
            try {
                setUploading('Išsaugomas albumas...')
                await addDoc(collection(database, 'galerija'), {
                    title: albumTitle,
                    images: uploadedURLS,
                    created: serverTimestamp()
                })
            } catch (err) {
                console.error(err)
                setToast(
                    'warning',
                    'Klaida! Nepavyko išsaugoti albumo.'      
                )
            }
            setToast(
                'success',
                'Albumas išsaugotas!'      
            )
        }
        setUploading('')
        navigate('/personalas/galerija')
    }

    const deleteImage = async (index) => {
        let tempImgArray = [...imgUrls]
        if (albumoID && typeof tempImgArray[index] === 'string') {
            setDeleting(tempImgArray[index])
            const deleteResult = await deleteFile(tempImgArray[index])
            if (deleteResult === 'success') {
                await updateDoc(doc(database, `galerija/${albumoID}`), {
                    images: arrayRemove(tempImgArray[index]),
                })
                gautiAlbuma()
            }
        } else {
            setDeleting(index)
            tempImgArray.splice(index, 1)
            setImgUrls(tempImgArray)
        }
        setDeleting(null)
    }

    useEffect(() => {
        if (albumoID) gautiAlbuma()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex flex-col'>
            <UploadingDialog uploading={uploading} />
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
                            Albumas
                        </h2>
                        <div className='flex gap-2'>
                            <div className='flex items-center gap-4'>
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
                                    <p>Įkelti nuotrauką</p>
                                    <Plus className='h-6 w-6'/>
                                </label>
                                <input type="file" id="myFile" name="filename" className='hidden' accept="image/*" multiple onChange={handleFileChange} disabled={uploading !== ''}/>
                            </div>
                            <button 
                                onClick={handleSave}
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
                                {uploading !== '' ? 
                                    <Spinner className='h-6 w-6 animate-spin-reverse'/>
                                :
                                    <DisketeIcon className='h-6 w-6'/>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-8 justify-center items-start '>
                <div className='flex flex-col gap-2 justify-center items-start w-full'>
                    <label 
                        htmlFor="albumTitle"
                        className='text-xl font-semibold'
                        aria-disabled={uploading !== ''}
                    >
                        Albumo Pavadinimas
                    </label>
                    <input 
                        id="albumTitle" 
                        name="albumTitle" 
                        type='text'
                        disabled={uploading !== ''}
                        style={{ resize: 'none' }}
                        value={albumTitle}
                        onChange={(e) => setAlbumTitle(e.target.value)}
                        className='
                            focus:outline-none 
                            border-solid 
                            border-2 
                            border-fontColor-dark 
                            rounded-lg 
                            py-2 
                            px-4 
                            bg-bgColor-input 
                            w-full
                        '
                    />
                </div>
                <Nuotraukos imgUrls={imgUrls} deleteImage={deleteImage} deleting={deleting}/>
            </div>
        </div>
    )
}

export default NaujasAlbumas