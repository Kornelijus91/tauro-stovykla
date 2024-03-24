import { DividerInverted, Divider } from "@/components/Svgs"

export default function Loading() {
    return (
        <main className='flex flex-col grow w-full'>
            <section className='relative flex flex-col grow w-full'>
                <DividerInverted className='absolute block top-0 left-0 h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
                <div className='grid grid-cols-1 md:grid-cols-2 grow w-full h-full'>
                    <div className='hidden md:block w-full h-full bg-black'>
                        <div className='h-full w-full object-cover opacity-40 animate-pulse bg-black'/>
                    </div>
                    <div className='flex flex-col items-center gap-10 w-full h-full py-10 md:py-20 px-4 md:px-10'>
                        <h1 className='font-TitleFont font-bold text-5xl text-center text-fontColor-dark'>Kontaktai</h1>
                        <div className='flex flex-col items-start gap-6 w-full px-6 md:px-10 xl:px-20'>
                            <div className="h-10 w-full opacity-40 animate-pulse bg-black"/>
                            <div className="h-10 w-full opacity-40 animate-pulse bg-black"/>
                            <div className="h-10 w-full opacity-40 animate-pulse bg-black"/>
                            
                        </div>
                        <div className='flex grow w-full px-6 md:px-10 xl:px-20 opacity-40 animate-pulse bg-black'/>
                    </div>
                </div>
                <Divider className='absolute bottom-0 left-0 block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
            </section>
        </main>
    )
}