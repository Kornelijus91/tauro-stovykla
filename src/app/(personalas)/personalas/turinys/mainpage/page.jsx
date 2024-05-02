'use client'

import { useState, useEffect, memo } from "react"
import { Spinner, DisketeIcon, Plus, Trash } from '@/components/Svgs'
import { doc, updateDoc, getDoc } from "firebase/firestore"
import useStore from "@/app/state"
import { database } from "@/app/firebase"
import Image from 'next/image'

const Addpic = memo(function Addpic({ data, setData, loading, oldImage, setOldImage, imgKey }) {

    const handleFileChange = async (e) => {
        if (e.target.files) {
            setData({
                ...data,
                [imgKey]: e.target.files[0],
            })
        }
    }

    const deleteImage = () => {
        setData({
            ...data,
            [imgKey]: null,
        })
        setOldImage({
            ...oldImage,
            [imgKey]: {
                url: '',
                deleted: true
            }
        })
    }

    return (
        <div className='flex h-fit w-full justify-center items-center' key={imgKey}>
            {data[imgKey] || (oldImage[imgKey].url !== '' && !oldImage[imgKey].deleted) ? 
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
                        src={data[imgKey] ? URL.createObjectURL(data[imgKey]) : oldImage[imgKey].url}
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
        oldProps.oldImage.aboutImage.url === newProps.oldImage.aboutImage.url
        &&
        oldProps.oldImage.mainImage.url === newProps.oldImage.mainImage.url
        &&
        oldProps.oldImage.paslaugosImage.url === newProps.oldImage.paslaugosImage.url
    )
}

const MainPageContent = () => {

    const { setToast } = useStore((state) => state)

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
    const [oldImage, setOldImage] = useState({
        mainImage: {
            url: '',
            deleted: false
        },
        aboutImage: {
            url: '',
            deleted: false
        },
        paslaugosImage: {
            url: '',
            deleted: false
        },
    })

    const handleValueChange = (key, value) => {
        setData({
            ...data,
            [key]: value
        })
    }

    const saveData = async () => {
        try {
            setLoading(true)
            await updateDoc(doc(database, "pageData", "homepage"), {
                telNr: settings.telNr,
                email: settings.email,
                address: settings.address,
                mapLink: settings.mapLink
            })
            setToast(
                'success',
                'Nustatymai išsaugoti.'      
            )
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko išsaugoti nustatymų.'      
            )
        } finally {
            setLoading(false)
        }
    }

    const getNustatymai = async () => {
        // try {
        //     setLoading(true)
        //     const docSnap = await getDoc(doc(database, "pageData", "homepage"))
        //     if (docSnap.exists()) {
        //         const data = docSnap.data()
        //         setSettings({
        //             telNr: data.telNr,
        //             email: data.email,
        //             address: data.address,
        //             mapLink: data.mapLink
        //         })
        //     } else {
        //         console.error("No such document!")
        //         setToast(
        //             'warning',
        //             'Klaida! Nepavyko gauti nustatymų.'      
        //         )
        //     }
        // } catch (err) {
        //     console.error(err)
        //     setToast(
        //         'warning',
        //         'Klaida! Nepavyko gauti nustatymų.'      
        //     )
        // } finally {
        //     setLoading(false)
        // }
    }

    useEffect(() => {
        // getNustatymai()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="px-2 xl:px-0 flex flex-col grow">
            <div className='                    
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
                    className='flex w-full pb-8'
                >
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='grid grid-cols-6 justify-start items-center gap-2'>
                            <div className='flex justify-between'>
                                <label htmlFor={'tel-nr'}>Šūkis viršutinis</label>
                            </div>
                            <input 
                                type='text'
                                id={'tel-nr'} 
                                name={'tel-nr'} 
                                className="min-w-96 border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md col-span-5"
                                disabled={loading}
                                value={data.sloganPrimary}
                                onChange={(e) => handleValueChange('sloganPrimary', e.target.value)}
                            />
                            <div className='flex justify-between'>
                                <label htmlFor={'tel-nr'}>Šūkis apatinis</label>
                            </div>
                            <input 
                                type='text'
                                id={'tel-nr'} 
                                name={'tel-nr'} 
                                className="min-w-96 border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md col-span-5"
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
                        imgKey='mainImage'
                    />
                </div>
                <h2 className="py-4">Trumpi aprašymai</h2>
                <div className="grid grid-cols-2 h-full gap-8">
                    <div className="flex flex-col gap-4 justify-start h-full">
                        <h3>Apie mus</h3>
                        <Addpic 
                            data={data}
                            setData={setData}
                            loading={loading}
                            oldImage={oldImage}
                            setOldImage={setOldImage}
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
                            '
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPageContent