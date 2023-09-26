'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Plus, Spinner } from './Svgs'

const Patvirtinimas = ({ patvirtinimasState, setPatvirtinimasState, text, funcToExecute, actionText }) => {

    const handleOpenChange = (isOpen) => {
        setPatvirtinimasState({
            ...patvirtinimasState,
            open: isOpen
        })
    }

    return (
        <Dialog.Root open={patvirtinimasState.open} onOpenChange={handleOpenChange} >
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 backdrop-blur fixed inset-0 animate-overlayShow z-40"/>
                <Dialog.Content className="px-4 py-2 rounded-lg text-fontColor-dark bg-bgColor-light fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 focus:outline-none animate-contentShow z-50">
                    <div className='flex justify-end'>
                        <Dialog.Close className='focus:outline-none'>
                            <Plus className='h-6 w-6 rotate-45 hover:text-fontColor-light transition ease-in-out duration-200'/>
                        </Dialog.Close>
                    </div>
                    <p className='pb-4 pt-2 text-xl'>
                        {text}
                    </p>
                    <div className='flex justify-between w-full gap-2'>
                        <button 
                            onClick={() => handleOpenChange(false)}
                            className='
                                flex
                                justify-center
                                items-center
                                text-bgColor-light
                                bg-btnGreen-main
                                hover:bg-btnGreen-hover
                                active:bg-btnGreen-active
                                w-2/4
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
                                bg-btnRed-main
                                hover:bg-btnRed-hover
                                active:bg-btnRed-active
                                disabled:opacity-50
                                w-2/4
                                px-4
                                py-2
                                rounded-md
                                drop-shadow-md
                                transition-all 
                                ease-in-out 
                                duration-200
                            " 
                            type="submit" 
                            onClick={funcToExecute}
                            id="formSubmitButton"
                            disabled={patvirtinimasState.loading}
                        >
                            {patvirtinimasState.loading ?
                                <Spinner className='h-6 w-6 animate-spin-reverse text-bgColor-light'/>
                            :
                                <p>{actionText}</p>
                            }
                            
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Patvirtinimas