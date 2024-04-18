'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash, Spinner } from "@/components/Svgs"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage"
import useStore from "@/app/state"
import Image from 'next/image'
import Link from 'next/link'

const Naujienos = () => {

    const storage = getStorage()

    const uploadFile = (file) => {
        return new Promise(function (resolve, reject) {
            const storageRef = ref(storage, 'galerija/' + encodeURIComponent(file.name))
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
                    resolve()
                }
            )
        })
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