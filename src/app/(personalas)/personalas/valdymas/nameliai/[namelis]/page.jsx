'use client'

import { useState } from 'react'
import useStore from "@/app/state"
import KambarioKalendorius from '@/components/KambarioKalendorius'
import DatePicker from 'react-date-picker'
import { Spinner, Trash } from '@/components/Svgs'
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid'
import { database } from '@/app/firebase'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import DelReserveationConfirm from '@/components/DelReserveationConfirm'

const Page = ({ params }) => {

    const { nameliai, setToast } = useStore((state) => state)
    const [adding, setAdding] = useState(false)
    const [selected, setSelected] = useState(0)
    const [checked, setChecked] = useState([])
    const [addRezervation, setAddRezervation] = useState({
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        pavadinimas: '',
        id: ''
    })
    const [delRezervation, setDelRezervation] = useState({
        open: false,
        roomNum: null,
        resID: null,
        resName: null,
        loading: {
            all: false,
            curr: false
        }
    })

    const handleCheckboxClick = (index) => {
        if (checked.includes(index)) {
            let arrayCopy = [...checked]
            const i = arrayCopy.indexOf(index)
            if (i !== -1) {
                arrayCopy.splice(i, 1)
            }
            setChecked(arrayCopy)
        } else {
            setChecked((state) => [...state, index])
        }
    }

    const handleReservationAdd = async () => {
        if (!addRezervation.startDate) {
            setToast('warning', 'Trūksta "Nuo" datos.')
            return
        }
        if (!addRezervation.endDate) {
            setToast('warning', 'Trūksta "Iki" datos.')
            return
        }
        if (addRezervation.pavadinimas === '' || !addRezervation.pavadinimas) {
            setToast('warning', 'Trūksta pavadinimo.')
            return
        }

        try {
            setAdding(true)
            let data = {...nameliai}
            const rezID = uuidv4()
            for (const kambarys of checked) {
                for (const rez of data.sarasas[params.namelis].kambariai[kambarys].uzimtumas) {
                    if ((new Date(rez.startDate.seconds * 1000).getTime() <= addRezervation.startDate.getTime() &&
                    new Date(rez.endDate.seconds * 1000).getTime() >= addRezervation.startDate.getTime()) ||
                    (new Date(rez.startDate.seconds * 1000).getTime() <= addRezervation.endDate.getTime() &&
                    new Date(rez.endDate.seconds * 1000).getTime() >= addRezervation.endDate.getTime()) ||
                    (new Date(rez.startDate.seconds * 1000).getTime() >= addRezervation.startDate.getTime() &&
                    new Date(rez.endDate.seconds * 1000).getTime() <= addRezervation.endDate.getTime()) 
                    ) {
                        setToast('warning', 'Rezervacijų datos kertasi.')
                        setAdding(false)
                        return
                    }
                }
                // istrinti senas rezervacijas
                for (let i = 0; i < data.sarasas[params.namelis].kambariai[kambarys].uzimtumas.length; i++) {
                    if (new Date(new Date(data.sarasas[params.namelis].kambariai[kambarys].uzimtumas[i].endDate.seconds * 1000))
                        .getTime() <= new Date().getTime() - 3 * 4 * 7 * 24 * 60 * 60 * 1000) {
                        data.sarasas[params.namelis].kambariai[kambarys].uzimtumas.splice(i, 1)
                    } 
                }
                data.sarasas[params.namelis].kambariai[kambarys].uzimtumas.push({
                    startDate: addRezervation.startDate,
                    endDate: addRezervation.endDate,
                    pavadinimas: addRezervation.pavadinimas,
                    id: rezID
                })

            }
            const docRef = doc(database, 'nameliai/visi')
            await updateDoc(docRef, data)
            // console.log(data.sarasas[params.namelis])
            setChecked([])
            setAddRezervation({
                startDate: new Date(),
                endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
                pavadinimas: '',
                id: ''
            })
            setToast('success', 'Rezervacija pridėta.')
            setAdding(false)
        } catch(err) {
            console.log(err)
            setToast('warning', 'Pabandykite vėliau.')
            setAdding(false)
        }

    }

    const openDelReservationConfirmation = (pavadinimas, id) => {
        setDelRezervation({
            open: true,
            roomNum: nameliai.sarasas[params.namelis].kambariai[selected].kambarioNumeris,
            resID: id,
            resName: pavadinimas,
            loading: {
                all: false,
                curr: false
            }
        })
    }

    const handleDeleteReservation = async (choice) => {
        console.log(choice)
        let data = {...nameliai}
        if (choice === 'currentRoom') {
            const deletionIndex = data.sarasas[params.namelis].kambariai[selected].uzimtumas.findIndex((obj) => obj.id === delRezervation.resID)
            if (deletionIndex >= 0) {
                data.sarasas[params.namelis].kambariai[selected].uzimtumas.splice(deletionIndex, 1)
            } else {
                setToast('warning', 'Nepavyko ištrinti rezervacijos.')
                return
            }
            setDelRezervation({
                ...delRezervation,
                loading: {
                    all: false,
                    curr: true
                }
            })
        } else {
            for (let i = 0; i < data.sarasas[params.namelis].kambariai.length; i++) {
                for (let j = 0; j < data.sarasas[params.namelis].kambariai[i].uzimtumas.length; j++) {
                    if (data.sarasas[params.namelis].kambariai[i].uzimtumas[j].id === delRezervation.resID) {
                        data.sarasas[params.namelis].kambariai[i].uzimtumas.splice(j, 1)
                    }
                }
            }
            setDelRezervation({
                ...delRezervation,
                loading: {
                    all: true,
                    curr: false
                }
            })
        }
        
        try {
            const docRef = doc(database, 'nameliai/visi')
            await updateDoc(docRef, data)
            setDelRezervation({
                open: false,
                roomNum: null,
                resID: null,
                resName: null,
                loading: {
                    all: false,
                    curr: false
                }
            })
            setToast('success', 'Rezervacija ištrinta.')
            // console.log(data.sarasas[params.namelis].kambariai[selected].kambarioNumeris)
            // console.log(data.sarasas[params.namelis].kambariai[selected].uzimtumas)
        } catch(err) {
            setDelRezervation({
                open: false,
                roomNum: null,
                resID: null,
                resName: null,
                loading: {
                    all: false,
                    curr: false
                }
            })
            setToast('warning', 'Nepavyko ištrinti rezervacijos.')
        }
    }
    
    return (
        <section className='text-fontColor-dark'>
            <DelReserveationConfirm delRezervation={delRezervation} setDelRezervation={setDelRezervation} delFunction={handleDeleteReservation}/>
            <h1 className='text-xl font-bold'>Namelis {nameliai !== null && nameliai.sarasas[params.namelis].numeris}</h1>
            <div className='grid grid-cols-4 py-4 gap-4'>
                <div className='flex w-full h-full gap-4'>
                    <div className='flex flex-col gap-2 w-full h-full'>
                        {nameliai !== null && nameliai.sarasas[params.namelis].kambariai.map((room, index) => 
                            <div 
                                key={index} 
                                onClick={() => setSelected(index)}
                                className={`
                                    w-full 
                                    outline 
                                    outline-1 
                                    ${selected === index && 'outline-2 font-bold bg-[#edd8ab]'}
                                    hover:outline-2 
                                    hover:font-bold
                                    outline-fontColor-dark 
                                    rounded-md 
                                    flex 
                                    items-center 
                                    justify-start 
                                    gap-2
                                    px-2
                                    cursor-pointer
                                `}
                            >
                                <input 
                                    className='cursor-pointer'
                                    type="checkbox" 
                                    checked={checked.includes(index)}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={() => handleCheckboxClick(index)}
                                />
                                <p>Kambarys - {room.kambarioNumeris}</p>
                            </div>
                        )}
                        <span className='w-full h-0.5 bg-fontColor-dark mt-1'/>
                        <div className='flex flex-col gap-2'>
                            {nameliai !== null && nameliai.sarasas[params.namelis].kambariai[selected].uzimtumas.length > 0 ? 
                                nameliai.sarasas[params.namelis].kambariai[selected].uzimtumas.map((rezervacija, index) =>
                                    <div key={index} className='flex justify-between w-full bg-orangeBg-top rounded-md drop-shadow px-2 py-1'>
                                        <p>{rezervacija.pavadinimas}</p>
                                        <button 
                                            onClick={() => openDelReservationConfirmation(rezervacija.pavadinimas, rezervacija.id)}
                                            className='hover:text-fontColor-light transition ease-in-out duration-200'>
                                            <Trash className='h-6 w-6'/>
                                        </button>
                                    </div>
                                )
                            :
                                <p>Rezervacijų nėra</p>
                            }
                        </div>
                        <span className='w-full h-0.5 bg-fontColor-dark'/>
                        <div className={`w-full flex flex-col gap-2 ${checked.length > 0 ? 'opacity-100' : 'opacity-50'} transition ease-in-out duration-200`}>
                            <p className='font-bold text-lg'>Pridėti rezervaciją.</p>
                            <div className='grid grid-cols-5 items-center'>
                                <p>Nuo: </p>
                                <DatePicker 
                                    disabled={checked.length <= 0 || adding}
                                    calendarClassName='text-fontColor-dark rounded-md'
                                    className='
                                        col-span-4
                                        text-fontColor-dark 
                                        rounded-md 
                                        w-full 
                                        outline
                                        outline-1 
                                        border-none
                                        bg-white
                                        [&>div]:border-none
                                    '
                                    value={addRezervation.startDate} 
                                    onChange={(date) => setAddRezervation({...addRezervation, startDate: date})} 
                                    locale="lt-LT"
                                />
                            </div>
                            <div className='grid grid-cols-5 items-center'>
                                <p>Iki: </p>
                                <DatePicker 
                                    disabled={checked.length <= 0  || adding}
                                    calendarClassName='text-fontColor-dark rounded-md'
                                    className='
                                        col-span-4
                                        text-fontColor-dark 
                                        rounded-md 
                                        w-full 
                                        outline
                                        outline-1 
                                        border-none
                                        bg-white
                                        [&>div]:border-none
                                    '
                                    value={addRezervation.endDate} 
                                    onChange={(date) => setAddRezervation({...addRezervation, endDate: date})} 
                                    locale="lt-LT"
                                />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <p>Pavadinimas: </p>
                                <input
                                    type='text'
                                    disabled={checked.length <= 0  || adding}
                                    value={addRezervation.pavadinimas}
                                    className='w-full outline outline-1 rounded-md px-2 disabled:bg-slate-100'
                                    onChange={(e) => setAddRezervation({...addRezervation, pavadinimas: e.target.value})}
                                />
                            </div>
                            <button
                                onClick={handleReservationAdd}
                                disabled={checked.length <= 0 || adding}
                                className='
                                    flex
                                    justify-center
                                    items-center
                                    gap-4
                                    bg-orangeBg-top
                                    hover:bg-orangeBg-hover
                                    active:bg-orangeBg-bottom
                                    disabled:bg-orangeBg-top
                                    disabled:cursor-not-allowed
                                    w-full
                                    px-4
                                    py-2
                                    rounded-md
                                    drop-shadow-md
                                    transition-all 
                                    ease-in-out 
                                    duration-200
                                '
                            >
                                {adding ?
                                    <Spinner className='h-6 w-6 animate-spin-reverse'/>
                                    :
                                    <p>Pridėti</p>
                                }
                            </button>
                        </div>
                    </div>
                    <div className='w-0.5 h-full bg-fontColor-dark rounded-md'/>
                </div>
                <div className='col-span-3'>
                    <KambarioKalendorius namelioNr={params.namelis} selectedRoom={selected}/>
                </div>
            </div>
        </section>
    )
}

export default Page