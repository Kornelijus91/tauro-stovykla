"use client"

import { Menu, Plus } from './Svgs'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

function useClickOutside(ref, setOpen) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref, setOpen])
}

const MobileMenu = () => {

    const drawerRef = useRef(null)

    const [open, setOpen] = useState(false)

    useClickOutside(drawerRef, setOpen)

    return (
        <>  
            <span className='flex md:hidden' onClick={() => setOpen((state) => !state)}>
                <Menu className='w-10 h-10'/>
            </span>
            <div 
                ref={drawerRef}
                id="default-sidebar" 
                className={`flex flex-col gap-6 h-full ${open ? 'w-52 pl-8 pr-4' : 'w-0 pl-0 pr-0'} text-bgColor-light fixed z-10 top-0 left-0 bg-fontColor-dark pt-4 transition-all duration-300 ease-in-out overflow-x-hidden drop-shadow-md md:hidden`}
            >
                <div className='w-full flex justify-end'>
                    <span onClick={() => setOpen(false)}>
                        <Plus className='h-8 w-8 rotate-45 hover:text-fontColor-light transition ease-in-out duration-200'/>
                    </span>
                </div>
                <Link 
                    href="/" 
                    onClick={() => setOpen(false)}
                    className='
                        font-TitleFont 
                        font-bold 
                        text-3xl 
                        hover:text-bgColor-dark
                        transition-all 
                        ease-in-out 
                        duration-500
                        after:-translate-y-1
                        after:transition-all 
                        after:ease-in-out 
                        after:duration-500
                        after:block
                        after:w-0
                        hover:after:w-full
                        after:h-0.5
                        after:rounded-full
                        after:bg-bgColor-dark
                    '
                >
                    Pagrindinis
                </Link>
                <Link 
                    href="/kontaktai" 
                    onClick={() => setOpen(false)}
                    className='
                        font-TitleFont 
                        font-bold 
                        text-3xl 
                        hover:text-bgColor-dark
                        transition-all 
                        ease-in-out 
                        duration-500
                        after:-translate-y-1
                        after:transition-all 
                        after:ease-in-out 
                        after:duration-500
                        after:block
                        after:w-0
                        hover:after:w-full
                        after:h-0.5
                        after:rounded-full
                        after:bg-bgColor-dark
                    '
                >
                    Kontaktai
                </Link>
                <Link 
                    href="/uzimtumas" 
                    onClick={() => setOpen(false)}
                    className='
                        font-TitleFont 
                        font-bold 
                        text-3xl 
                        hover:text-bgColor-dark
                        transition-all 
                        ease-in-out 
                        duration-500
                        after:-translate-y-1
                        after:transition-all 
                        after:ease-in-out 
                        after:duration-500
                        after:block
                        after:w-0
                        hover:after:w-full
                        after:h-0.5
                        after:rounded-full
                        after:bg-bgColor-dark
                    '
                >
                    Užimtumas
                </Link>
            </div>
        </>
    )
}

export default MobileMenu