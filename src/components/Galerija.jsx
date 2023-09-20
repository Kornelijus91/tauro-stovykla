"use client"

import Image from "next/image"
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from "react"
import { Close } from "./Svgs" //Next
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

const Modal = ({ images, open, setModalOpen, currentImage }) => {

    return (
        <Dialog.Root open={open} onOpenChange={setModalOpen} >
            {/* <Dialog.Trigger /> */}
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 backdrop-blur fixed inset-0 animate-overlayShow z-40"/>
                <Dialog.Content className="px-4 py-2 rounded-lg text-fontColor-dark bg-bgColor-light fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 max-w-[96vw] max-h-[96vh] sm:max-w-[57vw] md:max-w-[50vw] portrait:md:max-w-[90vw] lg:max-w-[90vw] xl:w-[70vw] xl:max-w-[70vw] focus:outline-none animate-contentShow z-50">
                    <div className='flex justify-between mb-4'>
                        <Dialog.Title className='font-TitleFont text-5xl'>Galerija</Dialog.Title>
                        <Dialog.Close className='focus:outline-none'>
                            <button>
                                <Close className='h-6 w-6 hover:text-fontColor-light transition ease-in-out duration-150'/>
                            </button>
                        </Dialog.Close>
                    </div>
                    <Carousel 
                        selectedItem={currentImage} 
                        showStatus={false}
                        renderThumbs={() => images.map((img, index) => 
                            <div key={index}>
                                <Image 
                                    src={img}
                                    width={480}
                                    height={270}
                                    alt={`galerijos paveikslėlis ${index}`}
                                    className='h-auto w-auto hover:drop-shadow-title cursor-pointer transition ease-in-out duration-150 select-none'
                                />
                            </div>
                        )}
                        // renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        //     hasPrev && (
                        //         <button type="button" onClick={onClickHandler} title={label} >
                        //             <Next className="h-10 w-10 absolute top-2/4 cursor-pointer text-bgColor-light hover:text-bgColor-dark transition ease-in-out duration-150 select-none"/>
                        //         </button>
                        //     )
                        // }
                        // renderArrowNext={(onClickHandler, hasNext, label) =>
                        //     hasNext && (
                        //         <button type="button" onClick={onClickHandler} title={label}>
                        //             <Next className="rotate-180 h-10 w-10 absolute top-2/4 cursor-pointer text-bgColor-light hover:text-bgColor-dark transition ease-in-out duration-150 select-none"/>
                        //         </button>
                        //     )
                        // }
                    >
                        {images.map((img, index) => 
                            <div key={index}>
                                <Image 
                                    src={img}
                                    width={1980}
                                    height={1080}
                                    alt={`galerijos paveikslėlis ${index}`}
                                    className='h-auto w-auto hover:drop-shadow-title cursor-pointer transition ease-in-out duration-150 select-none'
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
            <div className='w-full xl:w-[80rem] flex flex-col gap-8 items-center pt-12 pb-16 px-6 xl:px-0'>
                <h1 className='font-TitleFont font-bold text-5xl text-fontColor-dark drop-shadow-title'>Galerija</h1>	
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {images.map((img, index) => 
                        <Image 
                            onClick={() => openModal(index)}
                            key={index}
                            src={img}
                            width={480}
                            height={270}
                            alt={`galerijos paveikslėlis ${index}`}
                            className='rounded-lg h-auto w-auto hover:drop-shadow-title cursor-pointer transition ease-in-out duration-150 select-none'
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default Galerija