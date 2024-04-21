'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Plus } from './Svgs'

const DelArticleConfirm = ({ deletingArticleConfirm, setDeletingArticleConfirm, delFunction }) => {

    const handleOpenChange = (isOpen) => {
        setDeletingArticleConfirm({
            ...deletingArticleConfirm,
            open: isOpen
        })
    }

    return (
        <Dialog.Root open={deletingArticleConfirm.open} onOpenChange={handleOpenChange} >
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 backdrop-blur fixed inset-0 animate-overlayShow z-40"/>
                <Dialog.Content className="w-[90vw] sm:w-max max-w-[90vw] xl:max-w-[30vw] break-all px-4 py-2 rounded-lg text-fontColor-dark bg-bgColor-light fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 focus:outline-none animate-contentShow z-50">
                    <div className='flex justify-end'>
                        <Dialog.Close className='focus:outline-none'>
                            <Plus className='h-6 w-6 rotate-45 hover:text-fontColor-light transition ease-in-out duration-200'/>
                        </Dialog.Close>
                    </div>
                    {deletingArticleConfirm.item &&
                        <p className='pb-8 pt-6 px-2 text-xl'>
                            Ar tikrai norite ištrinti naujieną - {deletingArticleConfirm.item.title} ?
                        </p>
                    }
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
                                bg-btnRed-main
                                hover:bg-btnRed-hover
                                active:bg-btnRed-active
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
                            onClick={() => {
                                handleOpenChange(false)
                                delFunction(deletingArticleConfirm.item)
                            }}
                            id="formSubmitButton"
                            // disabled={deletingArticleConfirm.loading.curr || deletingArticleConfirm.loading.all}
                        >
                            <p>Ištrinti</p>
                        </button>
                      
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default DelArticleConfirm