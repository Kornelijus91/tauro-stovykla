'use client'

import { useState, useEffect } from "react"
import { Spinner, DisketeIcon } from '@/components/Svgs'
import { doc, updateDoc, getDoc } from "firebase/firestore"
import useStore from "@/app/state"
import { database } from "@/app/firebase"
import { revalidatePage } from '@/lib/serverActions'
import { Switch } from "@/components/ui/switch"

const Nustatymai = () => {

    const { setToast } = useStore((state) => state)

    const [sumbitting, setSubmitting] = useState(false)
    const [downloadingData, setDownloadingData] = useState(false)
    const [settings, setSettings] = useState({
        telNr: '',
        email: '',
        address: '',
        mapLink: '',
        googleIndex: false,
        siteDesc: '',
    })

    const handleValueChange = (key, value) => {
        setSettings({
            ...settings,
            [key]: value
        })
    }

    const handleSwitch = (switched) => {
        setSettings((oldstate) => ({
            ...oldstate,
            googleIndex: switched
        }))
    }

    const saveData = async () => {
        try {
            setSubmitting(true)
            const [mapEmbedUrl] = settings.mapLink.match(/\bhttps?:\/\/\S+/gi)
            await updateDoc(doc(database, "pageData", "homepage"), {
                telNr: settings.telNr,
                email: settings.email,
                address: settings.address,
                mapLink: mapEmbedUrl.replace('"', ''),
                googleIndex: settings.googleIndex,
                siteDesc: settings.siteDesc,
            })
            setToast(
                'success',
                'Nustatymai išsaugoti.'      
            )
            revalidatePage(`/`)
            revalidatePage(`/kontaktai`)
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko išsaugoti nustatymų.'      
            )
        } finally {
            setSubmitting(false)
        }
    }

    const getNustatymai = async () => {
        try {
            setDownloadingData(true)
            const docSnap = await getDoc(doc(database, "pageData", "homepage"))
            if (docSnap.exists()) {
                const data = docSnap.data()
                setSettings({
                    telNr: data.telNr,
                    email: data.email,
                    address: data.address,
                    mapLink: data.mapLink,
                    googleIndex: data.googleIndex,
                    siteDesc: data.siteDesc,
                })
            } else {
                console.error("No such document!")
                setToast(
                    'warning',
                    'Klaida! Nepavyko gauti nustatymų.'      
                )
            }
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko gauti nustatymų.'      
            )
        } finally {
            setDownloadingData(false)
        }
    }

    useEffect(() => {
        getNustatymai()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="pb-4 xl:pb-0">
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
                        Nustatymai
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
                        disabled={sumbitting}
                    >
                        <p>Išsaugoti</p>
                        {sumbitting ?
                            <Spinner className='h-6 w-6 animate-spin-reverse text-bgColor-light'/>
                        :
                            <DisketeIcon className='h-6 w-6'/>  
                        }
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-fit">
                <div className='flex justify-start items-center gap-4 w-full'>
                    <div className='flex justify-between w-full'>
                        <label htmlFor={'tel-nr'}>Telefono numeris</label>
                    </div>
                    <input 
                        type='text'
                        id={'tel-nr'} 
                        name={'tel-nr'} 
                        className="lg:min-w-96 border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md"
                        disabled={downloadingData}
                        value={settings.telNr}
                        onChange={(e) => handleValueChange('telNr', e.target.value)}
                    />
                </div>
                <div className='flex justify-start items-center gap-4 w-full'>
                    <div className='flex justify-between w-full'>
                        <label htmlFor={'tel-nr'}>Elektroninis paštas</label>
                    </div>
                    <input 
                        type='text'
                        id={'tel-nr'} 
                        name={'tel-nr'} 
                        className="lg:min-w-96 border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md"
                        disabled={downloadingData}
                        value={settings.email}
                        onChange={(e) => handleValueChange('email', e.target.value)}
                    />
                </div>
                <div className='flex justify-start items-center gap-4 w-full'>
                    <div className='flex justify-between w-full'>
                        <label htmlFor={'tel-nr'}>Adresas</label>
                    </div>
                    <input 
                        type='text'
                        id={'tel-nr'} 
                        name={'tel-nr'} 
                        className="lg:min-w-96 border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md"
                        disabled={downloadingData}
                        value={settings.address}
                        onChange={(e) => handleValueChange('address', e.target.value)}
                    />
                </div>
                <div className='flex justify-start items-center gap-4 w-full mb-1'>
                    <div className='flex justify-between w-full'>
                        <label htmlFor={'tel-nr'}>Žemėlapio nuoroda</label>
                    </div>
                    <input 
                        type='text'
                        id={'tel-nr'} 
                        name={'tel-nr'} 
                        className="lg:min-w-96 border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md"
                        disabled={downloadingData}
                        value={settings.mapLink}
                        onChange={(e) => handleValueChange('mapLink', e.target.value)}
                    />
                </div>
                <div className='flex justify-start items-center gap-4 w-full mb-2'>
                    <div className='flex justify-between'>
                        <label htmlFor={'googleIndexSwitch'}>Google indexavimas</label>
                    </div>
                    <Switch 
                        id="googleIndexSwitch" 
                        onCheckedChange={handleSwitch}
                        disabled={downloadingData}
                    />
                    <p>{settings.googleIndex ? 'ON' : 'OFF'}</p>
                </div>
                <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <div className='flex justify-between w-full'>
                        <label htmlFor={'googledesc'}>Svetainės aprašymas (SEO)</label>
                        <p style={{ color: settings.siteDesc.length > 155 ? '#e63946' : '#264653'}}>{`${settings.siteDesc.length}/155`}</p>
                    </div>
                    <textarea 
                        id="googledesc" 
                        name="googledesc" 
                        disabled={downloadingData}
                        style={{ resize: 'none' }}
                        value={settings.siteDesc}
                        onChange={(e) => handleValueChange('siteDesc', e.target.value)}
                        className='
                            focus:outline-none 
                            border-solid 
                            border
                            border-fontColor-dark 
                            rounded-lg 
                            bg-bgColor-input 
                            flex
                            flex-col
                            w-full
                            grow
                            p-4
                            min-h-80
                            lg:min-h-40
                        '
                    />
                </div>
                {downloadingData &&
                    <p>Gaunami nustatymai ...</p>
                }
            </div>
        </div>
    )
}

export default Nustatymai