"use client"

import { useState } from 'react'
import { Plus, Spinner } from '@/components/Svgs'
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { database } from "@/app/firebase"
import useStore from "@/app/state"

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

    const { setToast, admin } = useStore((state) => state)

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

    const deleteRoom = (e, index) => {
        e.preventDefault()
        let items = [...formValues.kambariai]
        items.splice(index, 1)
        setFormValues({
            ...formValues,
            kambariai: items
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
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
        }
    }

    return (
        <div className='pb-8 text-fontColor-dark'>
            <h2 className='font-bold text-xl md:text-2xl'>Pridėti namelį</h2>
            <form className='py-4 flex flex-col gap-4 text-fontColor-dark max-w-sm' method="post">
                <TextInput formValues={formValues} handleFormValueChange={handleFormValueChange} name='numeris' label='Namelio numeris' /> 
                {formValues.kambariai.map((_ , index) => 
                    <div className='flex flex-col' key={index}>
                        <div className='flex justify-between'>
                            <label htmlFor={`room-${index}`}>Kambario numeris</label>
                            <button onClick={(e) => deleteRoom(e, index)}><Plus className='h-6 w-6 rotate-45 hover:text-fontColor-light transition ease-in-out duration-200'/></button>
                        </div>
                        <input 
                            type='text'
                            id={`room-${index}`} 
                            name={`room-${index}`} 
                            className="border-solid border border-fontColor-dark rounded-md px-2 py-1 bg-bgColor-input focus:outline-none drop-shadow-md"
                            value={formValues.kambariai[index].kambarioNumeris}
                            onChange={(e) => handleRoomNumberValueChange(index, e.target.value)}
                        />
                    </div>
                )}
            </form>
            <div className='flex justify-between max-w-sm'>
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
                <button 
                    className="
                        flex
                        justify-center
                        gap-4
                        text-bgColor-light
                        bg-fontColor-button
                        hover:bg-fontColor-light
                        active:bg-fontColor-dark
                        disabled:opacity-50
                        w-28
                        px-4
                        py-2
                        rounded-md
                        drop-shadow-md
                        transition-all 
                        ease-in-out 
                        duration-200
                    " 
                    type="submit" 
                    onClick={(e) => handleSubmit(e)}
                    id="formSubmitButton"
                    disabled={sumbitting}
                >
                    {sumbitting ?
                        <Spinner className='h-6 w-6 animate-spin-reverse text-bgColor-light'/>
                    :
                        <p>Išsaugoti</p>
                    }
                     
                </button>
            </div>
        </div>
    )
}

export default Prideti