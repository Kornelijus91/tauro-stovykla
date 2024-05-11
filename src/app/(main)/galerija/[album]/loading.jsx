import { DividerInverted, Divider } from "@/components/Svgs"

export default function Loading() {
    return (
        <main className='flex flex-col items-center grow w-full'>
            <DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
            <section className='relative flex flex-col gap-2 grow w-full xl:w-[80rem] pb-6'>
                <div className={'flex flex-col justify-start items-center h-8 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                <div className='grid grid-cols-4 outline-fontColor-dark text-fontColor-dark rounded-md gap-2'>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-40 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                </div>
            </section>
            <Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
        </main>
    )
}