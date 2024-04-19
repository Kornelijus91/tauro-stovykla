'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash, Spinner, DisketeIcon } from "@/components/Svgs"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage"
import useStore from "@/app/state"
import Image from 'next/image'
import Tiptap from '@/components/TextEditor'
import Link from 'next/link'

const Naujienos = () => {

    const storage = getStorage()
    const { setToast } = useStore((state) => state)

    const [uploading, setUploading] = useState('')
    const [image, setImage] = useState(null)

    const handleFileChange = async (e) => {
        if (e.target.files) {
            setImage(e.target.files[0])
            // setUploading('Įkeliamas failas.')
            // for (const [_, value] of Object.entries(e.target.files)) {
            //     await uploadFile(value)
            // }
            // setToast(
            //     'success',
            //     'Nuotraukos įkeltos!'      
            // )
            // getAllFiles()
            // setUploading('')
        }
    }

    const uploadFile = (file) => {
        return new Promise(function (resolve, reject) {
            const storageRef = ref(storage, 'naujienos/' + encodeURIComponent(file.name))
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setUploading(`Įkeliamas failas - ${file.name}. ${Math.round(progress)}%`)
                }, 
                (error) => {
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

    const saveArticle = async () => {

        if (image === null) {
            setToast('warning', 'Klaida! Įkelkite paveikslėlį.')
            return
        }

        const imageUploaded = await uploadFile(image)
        console.log('Image upload result - ', imageUploaded)

    }

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
                        Nauja naujiena
                    </h2>
                    <button 
                        onClick={saveArticle}
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
            <div className='flex flex-col grow gap-2'>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                        <label 
                            htmlFor="articleTitle"
                            className='text-xl font-semibold'
                            aria-disabled={uploading !== ''}
                        >
                            Antraštė
                        </label>
                        <textarea 
                            id="articleTitle" 
                            name="articleTitle" 
                            cols="40" 
                            rows="5"
                            disabled={uploading !== ''}
                            style={{ resize: 'none' }}
                            className='
                                focus:outline-none 
                                border-solid 
                                border-2 
                                border-fontColor-dark 
                                rounded-lg 
                                py-2 
                                px-4 
                                bg-bgColor-input 
                            '
                        />
                    </div>
                    <div className='flex h-full w-full justify-center items-center'>
                        {image ? 
                            <div className='relative'>
                                <button
                                    className='absolute top-0 right-0 m-1 rounded-lg text-fontColor-dark hover:bg-bgColor-light active:bg-bgColor-dark transition-all ease-in-out duration-150'
                                    onClick={() => setImage(null)}
                                >
                                    <Trash className='h-6 w-6'/>
                                </button>
                                <Image 
                                    src={URL.createObjectURL(image)}
                                    width={480}
                                    height={270}
                                    alt="Naujienos paveikslėlis"
                                    className='max-h-40 h-full w-full object-contain rounded-lg'
                                />
                            </div>
                        :
                            <>
                                <label 
                                    htmlFor="myFile"
                                    className='
                                        flex
                                        flex-col
                                        justify-center
                                        items-center
                                        bg-btnGreen-main
                                        hover:bg-btnGreen-hover
                                        active:bg-btnGreen-active
                                        text-bgColor-input
                                        cursor-pointer
                                        w-max
                                        h-fit
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
                                    Pridėti paveikslėlį 
                                    <Plus className='h-12 w-12'/>
                                </label>
                                <input type="file" id="myFile" name="filename" className='hidden' accept="image/*" onChange={handleFileChange} disabled={uploading !== ''}/>
                            </>
                        }
                    </div>
                </div>
                <Tiptap />
            </div>
        </div>
    )
}

export default Naujienos