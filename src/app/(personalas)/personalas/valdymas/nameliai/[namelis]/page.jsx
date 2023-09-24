'use client'

import React from 'react'
import useStore from "@/app/state"
import KambarioKalendorius from '@/components/KambarioKalendorius'

const Page = ({ params }) => {

    const { nameliai } = useStore((state) => state)
    
    return (
        <section className='text-fontColor-dark'>
            <h1 className='text-xl font-bold'>Namelis {params.namelis}</h1>
            <div className='grid grid-cols-4 py-4 gap-4'>
                <div className='flex w-full h-full gap-4'>
                    <div className='flex flex-col gap-2 w-full h-full'>
                        {nameliai !== null && nameliai.sarasas[params.namelis].kambariai.map((room, index) => 
                            <div key={index} className='w-full outline outline-1 outline-fontColor-dark rounded-md flex items-center justify-start px-2'>
                                <p>Kambarys - {room.kambarioNumeris}</p>
                            </div>
                        )}
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