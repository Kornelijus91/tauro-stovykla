import { useState, useEffect } from 'react'
import { Next } from './Svgs'
import useStore from "@/app/state"

const KambarioKalendorius = ({ namelioNr, selectedRoom }) => {

    const metai = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis']
    const savaite = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis']

    const { nameliai } = useStore((state) => state)

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

    const returnTruncateLength = (date) => {
        return date.getDay() === 0 ? 6 : date.getDay() - 1
    }

    const isReserved = (date) => {
        let styles = ''
        if (nameliai) {
            for (const reservation of nameliai.sarasas[namelioNr].kambariai[selectedRoom].uzimtumas) {
                const dateFromCalendar = date.setHours(0, 0, 0, 0)
                const resStart = new Date(reservation.startDate.seconds * 1000).setHours(0, 0, 0, 0)
                const resEnd = new Date(reservation.endDate.seconds * 1000).setHours(0, 0, 0, 0)
                const maxLength = toString(returnTruncateLength(date) * 7)
                if (dateFromCalendar >= resStart && dateFromCalendar <= resEnd) {
                    styles = 'after:h-8 after:bg-orangeBg-top ' 
                    if (dateFromCalendar === resStart) {
                        if (date.getDay() === 0) {
                            styles += 'after:w-[90%] after:translate-x-1 after:text-fontColor-dark after:flex after:items-center after:pl-2 after:rounded-l-md after:z-40 after:content-["KAKAKKAWWWWWWWWWWWWWWWWWWWW"] after:overflow-hidden '   
                        } else {
                            styles += 'after:w-[100%] after:translate-x-2 after:text-fontColor-dark after:flex after:items-center after:pl-2 after:rounded-l-md after:z-40 after:content-["KAKAKKAWWWWWWWWWWWWWWWWWWWW"] '   
                        }
                    } else if (date.getDay() === 1 && dateFromCalendar === resEnd) {
                        styles += 'after:-translate-x-1 after:rounded-r-md after:w-[90%] after:z-30 after:overflow-hidden '
                    } else if (dateFromCalendar === resEnd) {
                        styles += 'after:-translate-x-2 after:rounded-r-md after:w-[100%] after:z-30 after:overflow-hidden '
                    } else {
                        styles += 'after:z-30 after:w-[110%] '
                    }
                    if (date.getDay() === 1) {
                        styles += 'after:translate-x-2 '
                    }
                    if (date.getDay() === 0) {
                        styles += 'after:-translate-x-2 '
                    }
                }  
            }
        }
        return styles
    }

    useEffect(() => {
        getDaysInMonth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate])

    return (
        <>
            <div className='flex justify-between gap-6 pb-4 px-0.5 w-56'>
                <button onClick={() => handleDateChange('prev')} className='hover:text-fontColor-light transition ease-in-out duration-200'>
                    <Next className='h-4 w-4 rotate-180'/>
                </button>
                <p>{selectedDate.getFullYear()} - {metai[selectedDate.getMonth()]}</p>
                <button onClick={() => handleDateChange('next')} className='hover:text-fontColor-light transition ease-in-out duration-200'>
                    <Next className='h-4 w-4'/>
                </button>
            </div>
            <div className='grid grid-cols-7 rounded-md gap-2 py-1 px-0.5 mb-2 bg-[#edd8ab]'>
                {savaite.map((day, index) => 
                    <div key={index} className='flex justify-center'>
                        <p>{day}</p>
                    </div>
                )}
            </div>
            <div className='grid grid-cols-7 rounded-md gap-2 p-0.5'>
                {calendarDays.map((date, index) => 
                    <div 
                        key={index} 
                        className={`
                            flex 
                            flex-col
                            justify-start
                            items-center
                            h-24
                            py-1 
                            outline 
                            outline-1 
                            outline-fontColor-dark
                            rounded-md
                            ${isCurrentMonth(date) ? 'outline-fontColor-dark/100 text-fontColor-dark/100' : 'outline-fontColor-dark/40 text-fontColor-dark/40'}
                            ${isReserved(date)}
                        `}
                    >
                        <p className='mb-2'>{date.getDate()}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default KambarioKalendorius