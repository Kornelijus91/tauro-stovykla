"use client"

import { useState, useEffect } from 'react'
import { Plus, Spinner, DisketeIcon } from '@/components/Svgs'
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { database } from "@/app/firebase"
import useStore from "@/app/state"
import { useSearchParams, useRouter } from 'next/navigation'
import { revalidatePage } from '@/lib/serverActions'

const TextInput = ({ formValues, handleFormValueChange, name, label, type, missing }) => {

    const type_ = type || 'text'

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <label htmlFor={name}>{label}</label>
                <label htmlFor={name} className={`${missing ? 'text-[#d62828]/100 visible' : 'text-[#d62828]/0 invisible'} transition-all duration-500 ease-in-out`}>trūksta.</label>
            </div>
            <input 
                type={type_}
                id={name} 
                name={name} 
                className="border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md"
                value={formValues[name]}
                onChange={(e) => handleFormValueChange(name, e.target.value)}
            />
        </div>
    )
}

const Prideti = () => {

    const searchParams = useSearchParams()
    const router = useRouter()

    const namelioNumeris = searchParams.get('numeris')

    const { setToast, admin, nameliai } = useStore((state) => state)

    const [formValues, setFormValues] = useState({
        numeris: 0,
        kambariai: []
    })

    const [sumbitting, setSubmitting] = useState(false)

    const handleFormValueChange = (key, value) => {
        setFormValues({
            ...formValues,
            [key]: value
        })
    }

    const handleRoomAddition = () => {
        setFormValues({
            ...formValues,
            kambariai: [...formValues.kambariai, {
                kambarioNumeris: 0,
                vietos: 0,
                uzimtumas: []
            }]
        })
    }

    const handleRoomNumberValueChange = (index, value) => {
        let items = [...formValues.kambariai]
        let item = {...formValues.kambariai[index]}
        item.kambarioNumeris = value
        items[index] = item
        setFormValues({
            ...formValues,
            kambariai: items
        })
    }

    const handleRoomSpaceValueChange = (index, value) => {
        let items = [...formValues.kambariai]
        let item = {...formValues.kambariai[index]}
        item.vietos = value
        items[index] = item
        setFormValues({
            ...formValues,
            kambariai: items
        })
    }

    const deleteRoom = (e, index) => {
        e.preventDefault()
        let items = [...formValues.kambariai]
        items.splice(index, 1)
        setFormValues({
            ...formValues,
            kambariai: items
        })
    }

    const handleSubmit = async () => {
        // e.preventDefault()
        if (!admin) {
            setToast('warning', 'Neturite administratoriaus teisių.')
            return
        }
        if (formValues.kambariai.length <= 0) {
            setToast('warning', 'Pridėk bent vieną kambarį.')
            return
        }
        let rooms = []
        for (const room of formValues.kambariai) {
            rooms.push(parseInt(room.kambarioNumeris))
        }
        const isNotUnique = (new Set(rooms)).size !== rooms.length
        if (isNotUnique) {
            setToast('warning', 'Kambarių numeriai nėra unikalųs.')
            return
        }
        setSubmitting(true)
        if (nameliai !== null && namelioNumeris !== null) {
            try {
                let data = {...nameliai}
                const index = data.sarasas.findIndex(x => x.numeris === namelioNumeris)
                if (index >= 0) {
                    data.sarasas[index] = formValues
                    data.lastUpdated = Date.now()
                    const docRef = doc(database, 'nameliai/visi')
                    await updateDoc(docRef, data)
                    setSubmitting(false)
                    setFormValues({
                        numeris: 0,
                        kambariai: []
                    })
                    setToast('success', 'Namelis atnaujintas!')
                } else {
                    setToast('warning', 'Klaida! Nepavyko atnaujinti namelio.')
                    setSubmitting(false)
                    return
                }
            } catch(err) {
                console.log(err)
                setToast('warning', 'Klaida! Nepavyko atnaujinti namelio.')
                setSubmitting(false)
                return
            }
        } else {
            try {
                const docRef = doc(database, 'nameliai/visi')
                await updateDoc(docRef, {
                    sarasas: arrayUnion(formValues),
                    lastUpdated: Date.now()
                })
                setSubmitting(false)
                setFormValues({
                    numeris: 0,
                    kambariai: []
                })
                setToast('success', 'Namelis pridėtas!')
            } catch(err) {
                console.log(err)
                setToast('warning', 'Klaida! Nepavyko pridėti namelio.')
                setSubmitting(false)
                return
            }
        }
        revalidatePage(`/uzimtumas`)
        router.push('/personalas')
        return
    }



    useEffect(() => {
        if (nameliai !== null && namelioNumeris !== null) {
            const index = nameliai.sarasas.findIndex(x => x.numeris === namelioNumeris)
            setFormValues(nameliai.sarasas[index])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     console.log(formValues)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [formValues])

    return (
        <section className='text-fontColor-dark'>
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
                        Pridėti namelį
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
                        onClick={(e) => handleSubmit(e)}
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
            <form className='py-4 flex flex-col gap-4 text-fontColor-dark lg:w-fit' method="post">
                <TextInput formValues={formValues} handleFormValueChange={handleFormValueChange} name='numeris' label='Namelio numeris'/> 
                {formValues.kambariai.map((_ , index) => 
                    <div key={index} className='flex gap-4'>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <label htmlFor={`room-${index}`}>Kambario numeris</label>
                                {/* <button onClick={(e) => deleteRoom(e, index)}><Plus className='h-6 w-6 rotate-45 hover:text-fontColor-light transition ease-in-out duration-200'/></button> */}
                            </div>
                            <input 
                                type='text'
                                id={`room-${index}`} 
                                name={`room-${index}`} 
                                className="border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md w-full"
                                value={formValues.kambariai[index].kambarioNumeris}
                                onChange={(e) => handleRoomNumberValueChange(index, e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <label htmlFor={`room-space-${index}`}>Vietų skaičius</label>
                                <button onClick={(e) => deleteRoom(e, index)}><Plus className='h-6 w-6 rotate-45 hover:text-fontColor-light transition ease-in-out duration-200'/></button>
                            </div>
                            <input 
                                type='number'
                                id={`room-space-${index}`} 
                                name={`room-space-${index}`} 
                                className="border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md w-full"
                                value={formValues.kambariai[index].vietos}
                                onChange={(e) => handleRoomSpaceValueChange(index, e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </form>
            <div className='flex justify-between max-w-full lg:max-w-sm'>
                <button 
                    onClick={handleRoomAddition}
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
                    Pridėti kambarį 
                    <Plus className='h-6 w-6'/>
                </button>
            </div>
        </section>
    )
}

export default Prideti