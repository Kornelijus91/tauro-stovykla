"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Trash, Edit } from "@/components/Svgs"
import { doc, updateDoc, arrayRemove } from "firebase/firestore"
import { database } from "@/app/firebase"
import useStore from "@/app/state"
import Tooltip from "@/components/Tooltip"
import Patvirtinimas from "@/components/Patvirtinimas"
import { useRouter } from 'next/navigation'

const Nameliai = () => {

    const router = useRouter()

    const { nameliai, setToast } = useStore((state) => state)
    const [ patvirtinimasState, setPatvirtinimasState ] = useState({
        open: false,
        loading: false,
        deleteRef: null
    })

    const handleNamelisDelete = async () => {
        setPatvirtinimasState({
            ...patvirtinimasState,
            loading: true,
        })
        try {
            const docRef = doc(database, 'nameliai/visi')
            await updateDoc(docRef, {
                sarasas: arrayRemove(patvirtinimasState.deleteRef),
                lastUpdated: Date.now()
            })
            setPatvirtinimasState({
                open: false,
                loading: false,
                deleteRef: null
            })
            setToast('success', 'Namelis ištrintas!')
        } catch(err) {
            console.log(err)
            setToast('warning', 'Klaida! Nepavyko ištrinti namelio.')
            setPatvirtinimasState({
                ...patvirtinimasState,
                loading: false,
            })
        }
    }

    const operPatvirtinimas = (e, namelis) => {
        e.stopPropagation()
        setPatvirtinimasState({
            ...patvirtinimasState,
            open: true,
            deleteRef: namelis
        })
    }

    return (
        <div className="px-2 xl:px-0 pb-4 xl:pb-0">
            <Patvirtinimas 
                patvirtinimasState={patvirtinimasState} 
                setPatvirtinimasState={setPatvirtinimasState}
                text='Ar tikrai norite ištrinti namelį?'
                funcToExecute={handleNamelisDelete}
                actionText='Ištrinti'
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 pb-4 text-fontColor-dark">
                {nameliai ?
                    <>
                    {nameliai.sarasas.map((namelis, index) => 
                        <div 
                            key={index} 
                            className="outline outline-2 outline-fontColor-dark rounded-md p-2 flex flex-col items-center cursor-pointer"
                            onClick={() => router.push(`/personalas/valdymas/nameliai/${namelis.numeris}`)}
                        >
                            <p>Namelis</p>
                            <p className="text-5xl font-bold py-4">{namelis.numeris}</p>
                            <div className="h-0.5 w-full bg-fontColor-dark rounded-full"/>
                            <div className="flex justify-evenly pt-2 w-full">
                                <Tooltip text='Redaguoti'>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            router.push(`/personalas/valdymas/nameliai/prideti?numeris=${namelis.numeris}`)
                                        }} 
                                    >
                                        <Edit className='h-6 w-6 hover:text-fontColor-light transition ease-in-out duration-200'/>
                                    </button>
                                </Tooltip>
                                <Tooltip text='Ištrinti'>
                                    <button onClick={(e) => operPatvirtinimas(e, namelis)}>
                                        <Trash className='h-6 w-6 hover:text-fontColor-light transition ease-in-out duration-200'/>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    )}
                    </>
                    :
                    <div>
                        <h1>Nėra duomenų.</h1>
                    </div>
                }
                
            </div>
            <Link 
                href="/personalas/valdymas/nameliai/prideti" 
                className='
                    flex
                    gap-4
                    bg-orangeBg-top
                    hover:bg-orangeBg-hover
                    active:bg-orangeBg-bottom
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
                Pridėti namelį 
                <Plus className='h-6 w-6'/>
            </Link>
        </div>
    )
}

export default Nameliai