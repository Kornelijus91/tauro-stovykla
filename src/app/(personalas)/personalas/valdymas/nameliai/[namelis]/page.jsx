'use client'

import { useState } from 'react'
import useStore from "@/app/state"
import KambarioKalendorius from '@/components/KambarioKalendorius'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

const Page = ({ params }) => {

    const { nameliai } = useStore((state) => state)
    const [selected, setSelected] = useState(0)
    const [checked, setChecked] = useState([])
    const [addRezervation, setAddRezervation] = useState({
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        pavadinimas: ''
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
    
    return (
        <section className='text-fontColor-dark'>
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
                        <div>
                            {nameliai !== null && nameliai.sarasas[params.namelis].kambariai[selected].uzimtumas.length > 0 ? 
                                nameliai.sarasas[params.namelis].kambariai[selected].uzimtumas.map((rezervacija, index) =>
                                    <div key={index}>
                                        <p>kakkakakkak</p>
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
                                    disabled={checked.length <= 0}
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
                                    disabled={checked.length <= 0}
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
                                    disabled={checked.length <= 0}
                                    value={addRezervation.pavadinimas}
                                    className='w-full bg-none outline outline-1 rounded-md px-2'
                                    onChange={(e) => setAddRezervation({...addRezervation, pavadinimas: e.target.value})}
                                />
                            </div>
                            <button
                                disabled={checked.length <= 0}
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
                                Pridėti
                            </button>
                        </div>
                    </div>
                    <div className='w-0.5 h-full bg-fontColor-dark rounded-md'/>
                </div>
                <div className='col-span-3'>
                    <KambarioKalendorius />
                </div>
            </div>
        </section>
    )
}

export default Page