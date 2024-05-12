'use client'

import { useState, useEffect } from 'react'
import { Next } from './Svgs'

const Kalendorius = ({ nameliai }) => {

    const metai = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis']
    const savaite = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis']

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [calendarDays, setCalendarDays] = useState([])

    const getDayOfWeek = (date) => {return date.getDay()}

    const isCurrentMonth = (date) => {
        return date.getMonth() === selectedDate.getMonth()
    }

    const getDaysInMonth = () => {
        const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
        const firstDayIndex = getDayOfWeek(firstDayOfMonth)
        const daysToDisplay = 7 * 6 // columns * rows
        let date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
        date.setDate(date.getDate() - firstDayIndex + (firstDayIndex === 0 ? -6 : 1))
        let days = []
        for (let i = 0; i < daysToDisplay; i++) {
            days.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }
        setCalendarDays(days) 
    }

    const handleDateChange = (action) => {
        if (action === 'next') {
            if (selectedDate.getMonth() === 11) {
                setSelectedDate((date) => new Date(date.getFullYear() + 1, 0, 1)) 
            } else {
                setSelectedDate((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))
            }
        } else {
            if (selectedDate.getMonth() === 0) {
                setSelectedDate((date) => new Date(date.getFullYear() - 1, 11, 1)) 
            } else {
                setSelectedDate((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))
            }
        }
    }

    const returnAmountOfRooms = () => {
        let sum = 0
        for (const namelis of nameliai.sarasas) {
            for (const kambarys of namelis.kambariai) {
                sum++
            }
        }
        return sum
    }

    const returnVacantRooms = (date) => {
        let vacantRooms =  returnAmountOfRooms()
        let laisvosVietos = 0

        for (const namelis of nameliai.sarasas) {
            for (const kambarys of namelis.kambariai) {

                laisvosVietos += parseInt(kambarys.vietos)

                for (const rezervacija of kambarys.uzimtumas) {
                    const dateFromCalendar = date.setHours(0, 0, 0, 0)
                    const resStart = new Date(rezervacija.startDate.seconds * 1000).setHours(0, 0, 0, 0)
                    const resEnd = new Date(rezervacija.endDate.seconds * 1000).setHours(0, 0, 0, 0)
                    if (dateFromCalendar >= resStart && dateFromCalendar <= resEnd) {
                        vacantRooms--
                        laisvosVietos -= parseInt(kambarys.vietos)
                    }
                }
            }
        }
        return [vacantRooms, laisvosVietos]
    }

    useEffect(() => {
        getDaysInMonth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate])

    return (
        <div className='text-fontColor-dark px-2 xl:px-0'>
            <div className='flex w-full justify-between items-center'>
                <h1 className='font-TitleFont font-bold text-4xl text-center text-fontColor-dark'>Užimtumas</h1>
                <div className='flex h-full justify-between items-center gap-6 w-56'>
                    <span onClick={() => handleDateChange('prev')} className='hover:text-fontColor-light cursor-pointer transition ease-in-out duration-200'>
                        <Next className='h-4 w-4 rotate-180'/>
                    </span>
                    <p>{selectedDate.getFullYear()} - {metai[selectedDate.getMonth()]}</p>
                    <span onClick={() => handleDateChange('next')} className='hover:text-fontColor-light cursor-pointer transition ease-in-out duration-200'>
                        <Next className='h-4 w-4'/>
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-7 outline-fontColor-dark text-fontColor-dark rounded-md gap-2 py-1 mb-2 bg-[#edd8ab] px-2 xl:px-0'>
                {savaite.map((day, index) => 
                    <div key={index} className='flex justify-center'>
                        <p className='w-full truncate text-center'>{day}</p>
                    </div>
                )}
            </div>
            <div className='grid grid-cols-7 outline-fontColor-dark text-fontColor-dark rounded-md gap-2'>
                {calendarDays.map((date, index) => 
                    <CalendarCell key={index} date={date} returnVacantRooms={returnVacantRooms} isCurrentMonth={isCurrentMonth}/>
                )}
            </div>
        </div>
    )
}

const CalendarCell = ({ date, returnVacantRooms, isCurrentMonth }) => {

    const [vacantRooms, laisvosVietos] = returnVacantRooms(date)

    return (
        <div 
            className={`
                flex 
                flex-col
                justify-start
                items-center
                
                outline 
                outline-1 
                outline-fontColor-dark
                rounded-md
                ${isCurrentMonth(date) ? 'opacity-100' : 'opacity-40'}
            `}
        >
            <div className='w-full flex justify-center py-1 bg-[#edd8ab]'>
                <p>{date.getDate()}</p>
            </div>
            <div className='w-full flex flex-col items-center justify-center py-1 gap-0.5 px-2 xl:px-0  overflow-hidden'>
                <div className='flex flex-col justify-center items-center gap-1.5'>
                    <p className='text-xs md:text-sm w-full truncate text-center text-wrap'>Laisvų kambarių:</p>
                    <p className='text-3xl'>{vacantRooms}</p>
                </div>
                <p className='text-xs text-center'>Laisvų vietų: {laisvosVietos}</p>
            </div>
        </div>
    )

}

export default Kalendorius