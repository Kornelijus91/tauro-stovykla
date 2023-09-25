'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Plus, Spinner } from './Svgs'

const DelReserveationConfirm = ({ delRezervation, setDelRezervation, delFunction }) => {

    const handleOpenChange = (isOpen) => {
        setDelRezervation({
            open: isOpen,
            roomNum: null,
            resID: null,
            resName: null,
            loading: {
                all: false,
                curr: false
            }
        })
    }

    return (
        <Dialog.Root open={delRezervation.open} onOpenChange={handleOpenChange} >
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 backdrop-blur fixed inset-0 animate-overlayShow z-40"/>
                <Dialog.Content className="w-[90vw] sm:w-max px-4 py-2 rounded-lg text-fontColor-dark bg-bgColor-light fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 focus:outline-none animate-contentShow z-50">
                    <div className='flex justify-end'>
                        <Dialog.Close className='focus:outline-none'>
                            <Plus className='h-6 w-6 rotate-45 hover:text-fontColor-light transition ease-in-out duration-200'/>
                        </Dialog.Close>
                    </div>
                    <p className='pb-8 pt-6 px-2 text-xl'>
                        Ar tikrai norite ištrinti rezervaciją - {delRezervation.resName} ?
                    </p>
                    <div className='flex flex-col justify-between w-full gap-2'>
                        <button 
                            onClick={() => handleOpenChange(false)}
                            className='
                                flex
                                justify-center
                                items-center
                                bg-orangeBg-top
                                hover:bg-orangeBg-hover
                                active:bg-orangeBg-bottom
                                w-full
                                px-4
                                py-2
                                rounded-md
                                drop-shadow-md
                                transition-all 
                                ease-in-out 
                                duration-200
                            '
                        >
                            Atšaukti
                        </button>
                        <button 
                            className="
                                flex
                                justify-center
                                items-center
                                text-bgColor-light
                                bg-fontColor-button
                                hover:bg-fontColor-light
                                active:bg-fontColor-dark
                                disabled:opacity-50
                                w-full
                                px-4
                                py-2
                                rounded-md
                                drop-shadow-md
                                transition-all 
                                ease-in-out 
                                duration-200
                            " 
                            type="submit" 
                            onClick={() => delFunction('currentRoom')}
                            id="formSubmitButton"
                            disabled={delRezervation.loading.curr || delRezervation.loading.all}
                        >
                            {delRezervation.loading.curr ?
                                <Spinner className='h-6 w-6 animate-spin-reverse text-bgColor-light'/>
                            :
                                <p>Ištrinti iš kambario - {delRezervation.roomNum}</p>
                            }
                        </button>
                        <button 
                            className="
                                flex
                                justify-center
                                items-center
                                text-bgColor-light
                                bg-fontColor-button
                                hover:bg-fontColor-light
                                active:bg-fontColor-dark
                                disabled:opacity-50
                                w-full
                                px-4
                                py-2
                                rounded-md
                                drop-shadow-md
                                transition-all 
                                ease-in-out 
                                duration-200
                            " 
                            type="submit" 
                            onClick={() => delFunction('allRooms')}
                            id="formSubmitButton"
                            disabled={delRezervation.loading.curr || delRezervation.loading.all}
                        >
                            {delRezervation.loading.all ?
                                <Spinner className='h-6 w-6 animate-spin-reverse text-bgColor-light'/>
                            :
                                <p>Ištrinti iš visų kambarių.</p>
                            }
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default DelReserveationConfirm