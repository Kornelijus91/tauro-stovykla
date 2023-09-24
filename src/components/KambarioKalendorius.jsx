import { useState, useEffect } from 'react'
import { Next } from './Svgs'

const KambarioKalendorius = () => {

    const metai = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis']
    const savaite = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis']

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [calendarDays, setCalendarDays] = useState([])

    const getDayOfWeek = (date) => {
        let dayIndex = date.getDay()
        return dayIndex
    }

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
        <>
            <div className='flex justify-between gap-6 pb-4 w-56'>
                <button onClick={() => handleDateChange('prev')} className='hover:text-fontColor-light transition ease-in-out duration-200'>
                    <Next className='h-4 w-4 rotate-180'/>
                </button>
                <p>{selectedDate.getFullYear()} - {metai[selectedDate.getMonth()]}</p>
                <button onClick={() => handleDateChange('next')} className='hover:text-fontColor-light transition ease-in-out duration-200'>
                    <Next className='h-4 w-4'/>
                </button>
            </div>
            <div className='grid grid-cols-7 outline-fontColor-dark text-fontColor-dark rounded-md gap-2 py-1 mb-2 bg-[#edd8ab]'>
                {savaite.map((day, index) => 
                    <div key={index} className='flex justify-center'>
                        <p>{day}</p>
                    </div>
                )}
            </div>
            <div className='grid grid-cols-7 outline-fontColor-dark text-fontColor-dark rounded-md gap-2'>
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
                            ${isCurrentMonth(date) ? 'opacity-100' : 'opacity-60'}
                        `}
                    >
                        <p>{date.getDate()}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default KambarioKalendorius