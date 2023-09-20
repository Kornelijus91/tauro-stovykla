"use client"

import { Menu, Close } from './Svgs'
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

    const handleKontaktai = () => {
        document.getElementById('kontaktai').scrollIntoView()
        setOpen(false)
    }

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
                        <Close className='w-8 h-8'/>
                    </span>
                </div>
                <Link 
                    href="#kontaktai" 
                    scroll={false}
                    prefetch={false}
                    onClick={() => handleKontaktai()}
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
        // <Popover.Root className='flex justify-end md:hidden' open={open} onOpenChange={setOpen}>
        //     <Popover.Trigger asChild className='block md:hidden'>
        //         <button  aria-label="Open Menu">
        //             <Menu className='w-10 h-10'/>
        //         </button>
        //     </Popover.Trigger>
        //     <Popover.Anchor />
        //     <Popover.Portal>
        //         <Popover.Content className='w-40 p-6 bg-fontColor-light will-change-auto z-50 rounded-lg drop-shadow animate-mobileMenuShow' sideOffset={4}>
        //             <div className='flex flex-col gap-10 text-bgColor-light'>
        //                 <Link 
        //                     href="#kontaktai" 
        //                     scroll={false}
        //                     prefetch={false}
        //                     onClick={(e) => handleKontaktai(e)}
        //                     className='
        //                         font-TitleFont 
        //                         font-bold 
        //                         text-3xl 
        //                         hover:text-bgColor-light
        //                         transition-all 
        //                         ease-in-out 
        //                         duration-500
        //                         after:-translate-y-1
        //                         after:transition-all 
        //                         after:ease-in-out 
        //                         after:duration-500
        //                         after:block
        //                         after:w-0
        //                         hover:after:w-full
        //                         after:h-0.5
        //                         after:rounded-full
        //                         after:bg-bgColor-light
        //                     '
        //                 >
        //                     Kontaktai
        //                 </Link>
        //                 <Link 
        //                     href="/uzimtumas" 
        //                     className='
        //                         font-TitleFont 
        //                         font-bold 
        //                         text-3xl 
        //                         hover:text-bgColor-light
        //                         transition-all 
        //                         ease-in-out 
        //                         duration-500
        //                         after:-translate-y-1
        //                         after:transition-all 
        //                         after:ease-in-out 
        //                         after:duration-500
        //                         after:block
        //                         after:w-0
        //                         hover:after:w-full
        //                         after:h-0.5
        //                         after:rounded-full
        //                         after:bg-bgColor-light
        //                     '
        //                 >
        //                     Užimtumas
        //                 </Link>
        //             </div>
        //             {/* <Popover.Close /> */}
        //             {/* <Popover.Arrow /> */}
        //         </Popover.Content>
        //     </Popover.Portal>
        // </Popover.Root>
    )
}

export default MobileMenu