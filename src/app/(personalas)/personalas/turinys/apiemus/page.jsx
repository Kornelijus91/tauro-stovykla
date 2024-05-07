'use client'

import { useState, useEffect } from "react"
import { Spinner, DisketeIcon } from '@/components/Svgs'
import { doc, updateDoc, getDoc } from "firebase/firestore"
import useStore from "@/app/state"
import { database } from "@/app/firebase"
import Tiptap from '@/components/TextEditor'

const ApieMusContent = () => {

    const { setToast } = useStore((state) => state)
    const [articleContent, setArticleContent] = useState('')
    const [loading, setLoading] = useState(false)

    const saveData = async () => {
        try {
            setLoading(true)
            await updateDoc(doc(database, "pageData", "about"), {
                pageContent: articleContent,
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
        }
    }

    const getPageData = async () => {
        try {
            setLoading(true)
            const docSnap = await getDoc(doc(database, "pageData", "about"))
            if (docSnap.exists()) {
                const data = docSnap.data()
                setArticleContent(data.pageContent)
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
        getPageData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="px-2 xl:px-0 flex flex-col grow">
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
                        Apie mus
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
                <Tiptap setArticleContent={setArticleContent} articleContent={articleContent}/>
            </div>
        </div>
    )
}

export default ApieMusContent