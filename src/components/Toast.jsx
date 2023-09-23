"use client"

import { useState, useEffect } from 'react'
import * as Toast_ from '@radix-ui/react-toast'
import useStore from '@/app/state'

const Toast = () => {

    const { toast, setToast } = useStore((state) => state)
    const [open, setOpen] = useState(false)

    const toastStateChange = (toastState) => {
        if(!toastState) {
            setOpen(false)
            setTimeout(function() { setToast('warning', '') }, 1000)
        }
    }

    useEffect(() => {
        if(toast.message !== '') setOpen(true)
    }, [toast.message])

    return (
        <Toast_.Provider swipeDirection="right">
            <Toast_.Root 
                open={open} 
                onOpenChange={toastStateChange} 
                className={`
                    ${toast.type === 'warning' ?
                        'bg-toastColor-warning'
                        :
                        'bg-toastColor-success'
                    }
                    rounded-md 
                    px-4 
                    py-2
                    text-fontColor-dark
                    data-[state='open']:animate-slideIn
                    data-[state='closed']:animate-hide
                    data-[state='end']:animate-slideOut
                `}
            >
                <Toast_.Title className='font-bold text-xl'>{toast.type === 'warning' ? 'Klaida!' : 'Atlikta!'}</Toast_.Title>
                <Toast_.Description >
                    <p>{toast.message}</p>
                </Toast_.Description>
            </Toast_.Root>
            <Toast_.Viewport className='fixed bottom-0 left-0 flex flex-col p-6 m-0 z-50 outline-none list-none'/>
        </Toast_.Provider>
    )
}

export default Toast