'use client'

import { useState, memo, useEffect } from 'react'
import { Plus, Trash, Spinner, DisketeIcon } from "@/components/Svgs"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc, doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { database } from '@/app/firebase'
import useStore from "@/app/state"
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Tiptap from '@/components/TextEditor'
import * as Dialog from '@radix-ui/react-dialog'
import { navigate } from '@/lib/serverActions'
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

const Addpic = memo(function Addpic({ image, oldImgUrl, setoldImgUrl, setImage, uploading }) {

    const handleFileChange = async (e) => {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    }

    return (
        <div className='flex h-full w-full justify-center items-center'>
            {image || (oldImgUrl.url !== '' && !oldImgUrl.deleted) ? 
                <div className='relative'>
                    <button
                        className='
                            absolute 
                            top-0 
                            right-0 
                            m-1 
                            rounded-lg 
                            text-fontColor-dark 
                            bg-bgColor-input
                            hover:bg-bgColor-light 
                            active:bg-bgColor-dark 
                            transition-all 
                            ease-in-out 
                            duration-150
                        '
                        onClick={() => {
                            setImage(null)
                            setoldImgUrl({
                                ...oldImgUrl,
                                deleted: true
                            })
                        }}
                    >
                        <Trash className='h-6 w-6'/>
                    </button>
                    <Image 
                        src={image ? URL.createObjectURL(image) : oldImgUrl.url}
                        width={480}
                        height={270}
                        alt="Naujienos paveikslėlis"
                        className='max-h-40 h-full w-full object-contain rounded-lg'
                        priority
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
    )

})

const NaujaNaujiena = () => {

    const searchParams = useSearchParams()
    const naujienosID = searchParams.get('id')

    const storage = getStorage()
    const { setToast } = useStore((state) => state)

    const [uploading, setUploading] = useState('')
    const [image, setImage] = useState(null)
    const [oldImgUrl, setoldImgUrl] = useState({
        url: '',
        deleted: false
    })
    const [articleTitle, setArticleTitle] = useState('')
    const [articleContent, setArticleContent] = useState('')

    const handleArticleTitleChange = (e) => {
        setArticleTitle(e.target.value)
    }

    const uploadFile = (file) => {
        return new Promise(function (resolve, reject) {
            const storageRef = ref(storage, 'naujienos/' + encodeURIComponent(file.name))
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setUploading(`Įkeliamas įkeliamas naujas paveikslėlis - ${file.name}. ${Math.round(progress)}%`)
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
        if (image === null && oldImgUrl === '') {
            setToast('warning', 'Klaida! Įkelkite paveikslėlį.')
            return
        }

        if (articleTitle === '' || articleTitle === null || articleTitle === undefined) {
            setToast('warning', 'Klaida! Įršykite antraštę.')
            return
        }
        try {
            let imageUploaded = null

            if (oldImgUrl.url !== '' && oldImgUrl.url && image) {
                setUploading(`Šalinamas senas paveikslėlis...`)
                const result = await deleteFile(oldImgUrl.url)
                if (result === 'error') {
                    console.error('OLF PIC NOT DELETED!!!')
                    setToast('warning', 'Klaida! Nepavyko ištrinti seno paveikslėlio.')
                    return
                } 
            }

            if (image) {
                setUploading(`Įkeliamas įkeliamas naujas paveikslėlis...`)
                imageUploaded = await uploadFile(image)
            } else {
                imageUploaded = oldImgUrl.url
            }
            setUploading('Išsaugoma naujiena...')
            if (naujienosID) {
                await updateDoc(doc(database, `naujienos/${naujienosID}`), {
                    title: articleTitle,
                    content: articleContent,
                    imageURL: imageUploaded,
                    created: serverTimestamp()
                })
            } else {
                await addDoc(collection(database, 'naujienos'), {
                    title: articleTitle,
                    content: articleContent,
                    imageURL: imageUploaded,
                    created: serverTimestamp()
                })
            }
            setUploading('')
            navigate('/personalas/naujienos')
        } catch (err) {
            console.error(err)
            setToast('warning', 'Klaida! Pabandykite vėliau.')
        }
    }

    const gautiNaujiena = async () => {
        try {
            const docRef = doc(database, "naujienos", naujienosID)
            const docSnap = await getDoc(docRef)
            const articleData = docSnap.data()
            setoldImgUrl({
                url: articleData.imageURL,
                deleted: false
            })
            setArticleTitle(articleData.title)
            setArticleContent(articleData.content)
        } catch (err) {
            console.error(err)
            setToast('warning', 'Klaida! Nepavyko gauti duomenų.')
        }
    }

    useEffect(() => {
        if (naujienosID) gautiNaujiena()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                            value={articleTitle}
                            onChange={handleArticleTitleChange}
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
                    <Addpic image={image} oldImgUrl={oldImgUrl} setoldImgUrl={setoldImgUrl} setImage={setImage} uploading={uploading} />
                </div>
                <Tiptap setArticleContent={setArticleContent} articleContent={articleContent}/>
                <UploadingDialog uploading={uploading} />
            </div>
        </div>
    )
}

export default NaujaNaujiena