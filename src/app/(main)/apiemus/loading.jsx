import { DividerInverted, Divider } from "@/components/Svgs"

export default function Loading() {
    return (
        <main className='flex flex-col items-center grow w-full'>
            <DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
            <section className='relative flex flex-col grow w-full xl:w-[80rem] pb-6'>
                <div className='text-fontColor-dark px-2 xl:px-0 flex flex-col gap-4'>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                    <div className={'flex flex-col justify-start items-center h-6 w-full outline outline-1 outline-fontColor-dark rounded-md opacity-40 animate-pulse bg-black'}/>
                </div>
            </section>
            <Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
        </main>
    )
}