'use client'

import { useState, useEffect, memo } from "react"
import { Spinner, DisketeIcon, Plus, Trash } from '@/components/Svgs'
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import useStore from "@/app/state"
import { database } from "@/app/firebase"
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { deleteFile } from "@/lib/utils"

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

const Addpic = memo(function Addpic({ data, setData, loading, oldImage, setOldImage, setImgsToDelete, imgKey }) {

    const handleFileChange = async (e) => {
        if (e.target.files) {
            setData((oldData) => ({
                ...oldData,
                [imgKey]: e.target.files[0],
            }))
        }
    }

    const deleteImage = () => {
        setData((oldData) => ({
            ...oldData,
            [imgKey]: null,
        }))
        if (oldImage[imgKey] !== '') {
            setImgsToDelete((oldData) => ([...oldData, oldImage[imgKey]]))
        }
        setOldImage((oldData) => ({
            ...oldData,
            [imgKey]: ''
        }))
    }

    return (
        <div className='flex h-fit w-full justify-center items-center' key={imgKey}>
            {data[imgKey] || oldImage[imgKey] !== '' ? 
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
                        onClick={deleteImage}
                    >
                        <Trash className='h-6 w-6'/>
                    </button>
                    <Image 
                        src={data[imgKey] ? URL.createObjectURL(data[imgKey]) : oldImage[imgKey]}
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
                        htmlFor={`file_upload_${imgKey}`}
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
                        aria-disabled={loading}
                    >
                        Pridėti paveikslėlį 
                        <Plus className='h-12 w-12'/>
                    </label>
                    <input type="file" id={`file_upload_${imgKey}`} name="filename" className='hidden' accept="image/*" onChange={handleFileChange} disabled={loading}/>
                </>
            }
        </div>
    )
}, arePropsEqual)

function arePropsEqual(oldProps, newProps) {
    return ( 
        oldProps.imgKey === newProps.imgKey
        &&
        oldProps.data.mainImage === newProps.data.mainImage
        &&
        oldProps.data.aboutImage === newProps.data.aboutImage
        &&
        oldProps.data.paslaugosImage === newProps.data.paslaugosImage
        &&
        oldProps.oldImage.aboutImage === newProps.oldImage.aboutImage
        &&
        oldProps.oldImage.mainImage === newProps.oldImage.mainImage
        &&
        oldProps.oldImage.paslaugosImage === newProps.oldImage.paslaugosImage
    )
}

const MainPageContent = () => {

    const storage = getStorage()

    const { setToast } = useStore((state) => state)
    const [uploading, setUploading] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        sloganPrimary: '',
        sloganSecondary: '',
        apiemus: '',
        paslaugos: '',
        mainImage: null,
        aboutImage: null,
        paslaugosImage: null,
    })
    const [imgsToDelete, setImgsToDelete] = useState([])
    const [oldImage, setOldImage] = useState({
        mainImage: '',
        aboutImage: '',
        paslaugosImage: '',
    })

    const handleValueChange = (key, value) => {
        setData({
            ...data,
            [key]: value
        })
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

    const saveData = async () => {

        if ((!data.mainImage || data.mainImage === null) && oldImage.mainImage === '') {
            setToast(
                'warning',
                'Klaida! Įkelkite pagrindinį paveikslėlį'      
            )
            return
        }

        try {
            setLoading(true)
            let mainImage = null
            let aboutImage = null
            let paslaugosImage = null

            setUploading('Ištrinamos senos nuotraukos ...')

            if (imgsToDelete.length > 0){
                for (const item of imgsToDelete) {
                    await deleteFile(item)
                }
            }

            if (data.mainImage) {
                mainImage = await uploadFile(data.mainImage)
            } else {
                mainImage = oldImage.mainImage
            }
            if (data.aboutImage) {
                aboutImage = await uploadFile(data.aboutImage)
            } else {
                aboutImage = oldImage.aboutImage
            }
            if (data.paslaugosImage) {
                paslaugosImage = await uploadFile(data.paslaugosImage)
            } else {
                paslaugosImage = oldImage.paslaugosImage
            }
            
            await updateDoc(doc(database, "pageData", "homepage"), {
                mainImgUrl: mainImage ? mainImage : '',
                aboutImgUrl: aboutImage ? aboutImage : '',
                paslaugosImgUrl: paslaugosImage ? paslaugosImage : '',
                sloganPrimary: data.sloganPrimary,
                sloganSecondary: data.sloganSecondary,
                apiemusAprasymas: data.apiemus,
                paslaugosAprasymas: data.paslaugos,
            })

            setToast(
                'success',
                'Pakeitimai išsaugoti.'      
            )
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko išsaugoti duomenų.'      
            )
        } finally {
            setLoading(false)
            setUploading('')
        }
    }

    const getMainPageData = async () => {
        try {
            setLoading(true)
            const docSnap = await getDoc(doc(database, "pageData", "homepage"))
            if (docSnap.exists()) {
                const data = docSnap.data()
                setData((oldData) => ({
                    ...oldData,
                    sloganPrimary: data.sloganPrimary,
                    sloganSecondary: data.sloganSecondary,
                    apiemus: data.apiemusAprasymas,
                    paslaugos: data.paslaugosAprasymas,
                }))
                setOldImage({
                    mainImage: data.mainImgUrl,
                    aboutImage: data.aboutImgUrl,
                    paslaugosImage: data.paslaugosImgUrl,
                })
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
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMainPageData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <UploadingDialog uploading={uploading} />
            <div className="flex flex-col grow">
                <div className='   
                        flex 
                        flex-col                     
                        after:my-2 
                        after:w-full 
                        after:h-px 
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
                            Pagrindinis puslapis
                        </h2>
                        <button 
                        className="
                                flex
                                gap-4
                                bg-btnGreen-main
                                hover:bg-btnGreen-hover
                                active:bg-btnGreen-active
                                text-bgColor-input
                                w-fit
                                px-4
                                py-2
                                rounded-md
                                drop-shadow-md
                                transition-all 
                                ease-in-out 
                                duration-200
                            " 
                            // type="submit" 
                            onClick={saveData}
                            id="formSubmitButton"
                            disabled={loading}
                        >
                            <p>Išsaugoti</p>
                            {loading ?
                                <Spinner className='h-6 w-6 animate-spin-reverse text-bgColor-light'/>
                            :
                                <DisketeIcon className='h-6 w-6'/>  
                            }
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full h-full pt-2">
                    <h2>Titulinis</h2>
                    <div 
                        id='hero_section'
                        className='flex flex-col lg:flex-row w-full pb-8 gap-8'
                    >
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col lg:flex-row'>
                                <label htmlFor={'virsutinis'} className="w-32">Šūkis viršutinis</label>
                                <input 
                                    type='text'
                                    id={'virsutinis'} 
                                    name={'virsutinis'} 
                                    className="lg:min-w-96 border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md col-span-5"
                                    disabled={loading}
                                    value={data.sloganPrimary}
                                    onChange={(e) => handleValueChange('sloganPrimary', e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col lg:flex-row'>
                                <label htmlFor={'apatinis'} className="w-32">Šūkis apatinis</label>
                                <input 
                                    type='text'
                                    id={'apatinis'} 
                                    name={'apatinis'} 
                                    className="lg:min-w-96 border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md col-span-5"
                                    disabled={loading}
                                    value={data.sloganSecondary}
                                    onChange={(e) => handleValueChange('sloganSecondary', e.target.value)}
                                />
                            </div>
                        </div>
                        <Addpic 
                            data={data}
                            setData={setData}
                            loading={loading}
                            oldImage={oldImage}
                            setOldImage={setOldImage}
                            setImgsToDelete={setImgsToDelete}
                            imgKey='mainImage'
                        />
                    </div>
                    <h2 className="py-4">Trumpi aprašymai</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8">
                        <div className="flex flex-col gap-4 justify-start h-full">
                            <h3>Apie mus</h3>
                            <Addpic 
                                data={data}
                                setData={setData}
                                loading={loading}
                                oldImage={oldImage}
                                setOldImage={setOldImage}
                                setImgsToDelete={setImgsToDelete}
                                imgKey='aboutImage'
                            />
                            <textarea 
                                id="apie_mus" 
                                name="apie_mus" 
                                disabled={loading}
                                style={{ resize: 'none' }}
                                value={data.apiemus}
                                onChange={(e) => handleValueChange('apiemus', e.target.value)}
                                className='
                                    focus:outline-none 
                                    border-solid 
                                    border
                                    border-fontColor-dark 
                                    rounded-lg 
                                    bg-bgColor-input 
                                    flex
                                    flex-col
                                    grow
                                    p-4
                                    min-h-80
                                    lg:min-h-fit
                                '
                            />
                        </div>
                        <div className="flex flex-col gap-4 justify-start h-full">
                            <h3>Paslaugos</h3>
                            <Addpic 
                                data={data}
                                setData={setData}
                                loading={loading}
                                oldImage={oldImage}
                                setOldImage={setOldImage}
                                setImgsToDelete={setImgsToDelete}
                                imgKey='paslaugosImage'
                            />
                            <textarea 
                                id="paslaugos_textarea" 
                                name="paslaugos_textarea" 
                                disabled={loading}
                                style={{ resize: 'none' }}
                                value={data.paslaugos}
                                onChange={(e) => handleValueChange('paslaugos', e.target.value)}
                                className='
                                    focus:outline-none 
                                    border-solid 
                                    border
                                    border-fontColor-dark 
                                    rounded-lg 
                                    bg-bgColor-input 
                                    flex
                                    flex-col
                                    grow
                                    p-4
                                    min-h-80
                                    lg:min-h-fit
                                '
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPageContent