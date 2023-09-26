import { useState, useEffect } from 'react'
import { Next } from './Svgs'
import useStore from "@/app/state"

const Marker = ({ date, namelioNr, selectedRoom, resHovered }) => {

    const { nameliai } = useStore((state) => state)

    const isReserved = () => {
        let result = ['none', '', '']
        if (nameliai) {
            for (const reservation of nameliai.sarasas[namelioNr].kambariai[selectedRoom].uzimtumas) {
                const dateFromCalendar = date.setHours(0, 0, 0, 0)
                const resStart = new Date(reservation.startDate.seconds * 1000).setHours(0, 0, 0, 0)
                const resEnd = new Date(reservation.endDate.seconds * 1000).setHours(0, 0, 0, 0)
                if (dateFromCalendar >= resStart && dateFromCalendar <= resEnd) {
                    if (dateFromCalendar === resStart) {
                        result = ['first_res_day', reservation.pavadinimas, reservation.id]
                    } else if (date.getDay() === 1 && dateFromCalendar === resEnd) {
                        result[0] = 'last_res_day_monday'
                        result[2] = reservation.id
                    } else if (date.getDay() === 1 && dateFromCalendar === resStart) {
                        result = ['first_res_day_monday', reservation.pavadinimas, reservation.id]
                    } else if (date.getDay() === 1 && dateFromCalendar !== resStart) {
                        result[0] = 'res_day_monday'
                        result[2] = reservation.id
                    } else if (dateFromCalendar === resEnd) {
                        result[0] = 'last_res_day'
                        result[2] = reservation.id
                    } else if (date.getDay() === 0) {
                        result[0] = 'res_day_sunday'
                        result[2] = reservation.id
                    } else {
                        result[0] = 'res_day'
                        result[2] = reservation.id
                    }
                }
            }
        }
        return result
    }

    const data = isReserved()

    return (
        <>
            {
                {
                'none': null,
                'first_res_day': 
                    <div className={`h-8 ${data[2] === resHovered ? 'bg-orangeBg-bottom text-bgColor-light' : 'bg-orangeBg-top text-fontColor-dark'} flex items-center justify-start pl-2 w-[100%] translate-x-1.5 rounded-l-md z-40 transition ease-in-out duration-200`}>
                        {data[1]}
                    </div>,
                'first_res_day_monday': 
                    <div className={`h-8 ${data[2] === resHovered ? 'bg-orangeBg-bottom text-bgColor-light' : 'bg-orangeBg-top text-fontColor-dark'} flex items-center justify-start pl-2 w-[100%] translate-x-1.5 rounded-l-md z-40 transition ease-in-out duration-200`}>
                        {data[1]}
                    </div>,
                'last_res_day_monday': <div className={`h-8 w-[90%] -translate-x-1.5 ${data[2] === resHovered ? 'bg-orangeBg-bottom' : 'bg-orangeBg-top'} rounded-r-md transition ease-in-out duration-200`}/>,
                'last_res_day': <div className={`h-8 w-[100%] -translate-x-1.5 ${data[2] === resHovered ? 'bg-orangeBg-bottom' : 'bg-orangeBg-top'} rounded-r-md transition ease-in-out duration-200`}/>,
                'res_day': <div className={`h-8 w-[130%] sm:w-[110%] ${data[2] === resHovered ? 'bg-orangeBg-bottom' : 'bg-orangeBg-top'} z-20 transition ease-in-out duration-200`}/>,
                'res_day_monday': <div className={`h-8 w-[130%] sm:w-[110%] ${data[2] === resHovered ? 'bg-orangeBg-bottom' : 'bg-orangeBg-top'} translate-x-1.5 transition ease-in-out duration-200`}/>,
                'res_day_sunday': <div className={`h-8 w-[130%] sm:w-[110%] -translate-x-1.5 ${data[2] === resHovered ? 'bg-orangeBg-bottom' : 'bg-orangeBg-top'} z-20 transition ease-in-out duration-200`}/>,
                }[data[0]]
            }
        </>
    )
}

const KambarioKalendorius = ({ namelioNr, selectedRoom, resHovered }) => {

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

    useEffect(() => {
        getDaysInMonth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate])

    return (
        <div className='px-2 xl:px-0'>
            <div className='flex w-full justify-center xl:justify-start'>
                <div className='flex justify-between gap-6 pb-4 px-0.5 w-56'>
                    <button onClick={() => handleDateChange('prev')} className='hover:text-fontColor-light transition ease-in-out duration-200'>
                        <Next className='h-4 w-4 rotate-180'/>
                    </button>
                    <p>{selectedDate.getFullYear()} - {metai[selectedDate.getMonth()]}</p>
                    <button onClick={() => handleDateChange('next')} className='hover:text-fontColor-light transition ease-in-out duration-200'>
                        <Next className='h-4 w-4'/>
                    </button>
                </div>
            </div>
            <div className='px-2 xl:px-0.5 grid grid-cols-7 rounded-md gap-2 py-1 mb-2 bg-[#edd8ab]'>
                {savaite.map((day, index) => 
                    <div key={index} className='flex justify-center w-full'>
                        <p className='w-full truncate text-center'>{day}</p>
                    </div>
                )}
            </div>
            <div className='grid grid-cols-7 rounded-md gap-2 p-0.5 overflow-hidden'>
                {calendarDays.map((date, index) => 
                    <div 
                        id={date}
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
                        `} 
                    >
                        <p className='mb-2'>{date.getDate()}</p>
                        <Marker date={date} namelioNr={namelioNr} selectedRoom={selectedRoom} resHovered={resHovered} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default KambarioKalendorius