import * as Tooltip_ from '@radix-ui/react-tooltip'

const Tooltip = ({children, text}) => {
    return (
        <Tooltip_.Provider delayDuration={100}>
            <Tooltip_.Root>
                <Tooltip_.Trigger asChild>
                    {children}
                </Tooltip_.Trigger>
                <Tooltip_.Portal>
                    <Tooltip_.Content 
                        sideOffset={5} 
                        className="
                            rounded-md 
                            py-1
                            px-2
                            bg-bgColor-input
                            drop-shadow-md
                            select-none
                            text-fontColor-dark
                            data-[state='delayed-open']:animate-slideDownAndFade
                            data-[state='delayed-closed']:animate-slideUpAndFade
                        "
                    >
                        {text}
                        <Tooltip_.Arrow className='fill-bgColor-input'/>
                    </Tooltip_.Content>
                </Tooltip_.Portal>
            </Tooltip_.Root>
        </Tooltip_.Provider>
    )
}

export default Tooltip