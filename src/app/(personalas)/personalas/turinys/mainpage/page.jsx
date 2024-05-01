'use client'

import { useState, useEffect, memo } from "react"
import { Spinner, DisketeIcon, Plus, Trash } from '@/components/Svgs'
import { doc, updateDoc, getDoc } from "firebase/firestore"
import useStore from "@/app/state"
import { database } from "@/app/firebase"
import Image from 'next/image'

const Addpic = memo(function Addpic({ data, setData, loading, oldImage, setOldImage }) {

    const handleFileChange = async (e) => {
        if (e.target.files) {
            setData({
                ...data,
                mainImage: e.target.files[0],
            })
        }
    }

    const deleteImage = () => {
        setData({
            ...data,
            mainImage: null,
        })
        setOldImage({
            url: '',
            deleted: true
        })
    }

    return (
        <div className='flex h-full w-full justify-center items-center'>
            {data.mainImage || (oldImage.url !== '' && !oldImage.deleted) ? 
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
                        src={data.mainImage ? URL.createObjectURL(data.mainImage) : oldImage.url}
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
                        aria-disabled={loading}
                    >
                        Pridėti paveikslėlį 
                        <Plus className='h-12 w-12'/>
                    </label>
                    <input type="file" id="myFile" name="filename" className='hidden' accept="image/*" onChange={handleFileChange} disabled={loading}/>
                </>
            }
        </div>
    )
})

const MainPageContent = () => {

    const { setToast } = useStore((state) => state)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        sloganPrimary: '',
        sloganSecondary: '',
        mainImage: null,
    })
    const [oldImage, setOldImage] = useState({
        url: '',
        deleted: false
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
        <div className="px-2 xl:px-0 pb-4 xl:pb-0">
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
            <div className="flex flex-col gap-2 w-full">
                <div 
                    id='hero_section'
                    className='flex w-full'
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
                    />
                </div>
            </div>
        </div>
    )
}

export default MainPageContent