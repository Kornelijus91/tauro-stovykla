"use client"

import Image from "next/image"
import Link from "next/link"
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from "react"
import { Plus } from "./Svgs" 
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

const Modal = ({ images, open, setModalOpen, currentImage }) => {

    return (
        <Dialog.Root open={open} onOpenChange={setModalOpen} >
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 backdrop-blur fixed inset-0 animate-overlayShow z-60"/>
                <Dialog.Content 
                    className="
                        px-4 
                        py-2 
                        rounded-lg 
                        text-fontColor-dark 
                        bg-bgColor-light 
                        fixed 
                        top-2/4 
                        left-2/4 
                        -translate-x-2/4 
                        -translate-y-2/4 
                        max-w-[96vw] 
                        max-h-[96vh] 
                        sm:max-w-[57vw] 
                        md:max-w-[50vw] 
                        portrait:md:max-w-[90vw] 
                        lg:max-w-[90vw] 
                        xl:w-[70vw] 
                        xl:max-w-[70vw] 
                        focus:outline-none 
                        animate-contentShow 
                        z-100
                    "
                >
                    <div className='flex justify-between mb-4'>
                        <Dialog.Title className='font-TitleFont text-5xl'>Galerija</Dialog.Title>
                        <Dialog.Close className='focus:outline-none'>
                            <Plus className='h-6 w-6 rotate-45 hover:text-fontColor-light transition ease-in-out duration-200'/>
                        </Dialog.Close>
                    </div>
                    <Carousel 
                        className="flex flex-col grow"
                        selectedItem={currentImage} 
                        showStatus={false}
                        renderThumbs={() => images.map((img, index) => 
                            <div key={index}>
                                <Image 
                                    src={img}
                                    width={480}
                                    height={270}
                                    alt={`galerijos paveikslėlis ${index}`}
                                    className='h-full w-auto hover:drop-shadow-title cursor-pointer transition ease-in-out duration-150 select-none object-cover'
                                />
                            </div>
                        )}
                    >
                        {images.map((img, index) => 
                            <div key={index}>
                                <Image 
                                    src={img}
                                    width={1980}
                                    height={1080}
                                    alt={`galerijos paveikslėlis ${index}`}
                                    className='h-full w-auto hover:drop-shadow-title cursor-pointer transition ease-in-out duration-150 select-none object-cover'
                                />
                            </div>
                        )}
                    </Carousel>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

const Galerija = ({ images }) => {

    const [modalOpaen, setModalOpen] = useState(false)
    const [currentImage, setCurrentImage] = useState(0)

    const openModal = (index) => {
        setCurrentImage(index)
        setModalOpen(true)
    }

    return (
        <>
            <Modal images={images} open={modalOpaen} setModalOpen={setModalOpen} currentImage={currentImage}/>
            {images.map((img, index) => 
                <Image 
                    onClick={() => openModal(index)}
                    key={index}
                    src={img}
                    width={480}
                    height={270}
                    alt={`galerijos paveikslėlis ${index}`}
                    className='rounded-lg h-full w-auto hover:drop-shadow-title cursor-pointer transition ease-in-out duration-150 select-none object-cover'
                />
            )}
        </>
    )
}

export default Galerija