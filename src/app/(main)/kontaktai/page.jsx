import { Divider, DividerInverted, Phone, Mail, Pin } from '@/components/Svgs'
import Image from 'next/image'
import Zemelapis from '@/components/Zemelapis'

const Kontaktai = () => {
    return (
        <section className='relative flex flex-col grow w-full'>
            <DividerInverted className='absolute block top-0 left-0 h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
            <div className='grid grid-cols-1 md:grid-cols-2 grow w-full h-full'>
                <div className='hidden md:block w-full h-full bg-black'>
                    <Image
                        src="/bg8.webp"
                        width={1920}
                        height={1080}
                        alt="Stovyklos nuotrauka"
                        className='h-full w-full object-cover'
                    />
                </div>
                <div className='flex flex-col items-center gap-10 w-full h-full py-20'>
                    <h1 className='font-TitleFont font-bold text-5xl text-center text-fontColor-dark'>Kontaktai</h1>
                    <div className='flex flex-col items-start gap-6 w-full px-6 md:px-10 xl:px-20'>
                        <a href='tel:+37000000000' className='flex items-center gap-6 text-xl text-fontColor-dark w-max'>
                            <Phone className='h-10 w-10'/>
                            <p>+370 000 00000</p>
                        </a>
                        <a href='mailto: Artis@example.com' className='flex items-center gap-6 text-xl text-fontColor-dark w-max'>
                            <Mail className='h-10 w-10'/>
                            <p>Artis@example.com</p>
                        </a>
                        <div className='flex items-center gap-6 text-xl text-fontColor-dark'>
                            <Pin className='h-10 w-10'/>
                            <p>Netoli bubiu, vidury miška.</p>
                        </div>
                    </div>
                    <div className='flex grow w-full px-6 md:px-10 xl:px-20'>
                        <Zemelapis />
                    </div>
                </div>
            </div>
            <Divider className='absolute bottom-0 left-0 block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
        </section>
    )
}

export default Kontaktai