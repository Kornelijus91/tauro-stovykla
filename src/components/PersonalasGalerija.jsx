import { useState, useEffect } from 'react'
import { Plus, Trash, Spinner } from "@/components/Svgs"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage"
import useStore from "@/app/state"
import Image from 'next/image'

const PersonalasGalerija = () => {

    const { setToast } = useStore((state) => state)

    const [uploading, setUploading] = useState('')
    const [deleting, setDeleting] = useState('')
    const [imgUrls, setImgUrls] = useState([])

    const storage = getStorage()

    const getAllFiles = async () => {
        setUploading('Gaunamos nuotraukos.')
        const listRef = ref(storage, 'galerija/')
        try {
            let arrayCopy = []
            const result = await listAll(listRef)
            for (const itemRef of result.items) {
                const url = await getDownloadURL(itemRef)
                const contains = arrayCopy.some((item) => item.url === url)
                if (!contains) arrayCopy.push({
                    url: url,
                    ref: itemRef
                })
            }
            setImgUrls(arrayCopy)
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko gauti galerijos nuotraukų.'      
            )
        }
        setUploading('')
    }

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

    const handleFileChange = async (e) => {
        if (e.target.files) {
            setUploading('Įkeliamas failas.')
            for (const [_, value] of Object.entries(e.target.files)) {
                await uploadFile(value)
            }
            setToast(
                'success',
                'Nuotraukos įkeltos!'      
            )
            getAllFiles()
            setUploading('')
        }
    }

    const deleteFile = (ref, url) => {
        setDeleting(url)
        deleteObject(ref).then(() => {
            getAllFiles()
            setToast(
                'success',
                'Nuotrauka ištrinta!'      
            )
        }).then(() => {
            setDeleting('')
        }).catch((error) => {
            console.error(error)
            setToast(
                'warning',
                'Klaida! Nepavyko ištrinti nuotraukos.'      
            )
        })
    }

    useEffect(() => {
        getAllFiles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h2 className='font-TitleFont font-bold text-4xl md:text-4xl mt-8 mb-2 after:mt-1 after:w-full after:h-0.5 flex flex-col justify-between after:bg-fontColor-dark after:rounded-full'>Galerija</h2>
            <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 pb-4'>
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
            </div>
            
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
            </div>
        </div>
    )
}

export default PersonalasGalerija