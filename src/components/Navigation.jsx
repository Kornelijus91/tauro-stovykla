import Link from 'next/link'
import MobileMenu from './MobileMenu'

const Navigation = () => {
    return (
        <header className='flex justify-center pt-2 px-6 xl:px-0 md:pt-4 pb-2 md:pb-0 bg-bgColor-light text-fontColor-dark z-50'>
            <div className='flex justify-between items-center w-full xl:w-[80rem] z-50'>
                <Link href="/" className='font-TitleFont font-bold text-4xl md:text-5xl'>Tauro Stovykla</Link>
                <div>
                    <MobileMenu />
                    <ul className='hidden md:flex gap-8'>
                        <li>
                            <Link 
                                href="#kontaktai" 
                                className='
                                    font-TitleFont 
                                    font-bold 
                                    text-3xl 
                                    hover:text-fontColor-light
                                    transition-all 
                                    ease-in-out 
                                    duration-500
                                    after:-translate-y-1
                                    after:transition-all 
                                    after:ease-in-out 
                                    after:duration-500
                                    after:block
                                    after:w-0
                                    hover:after:w-full
                                    after:h-0.5
                                    after:rounded-full
                                    after:bg-fontColor-light
                                '
                            >
                                Kontaktai
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/uzimtumas" 
                                className='
                                    font-TitleFont 
                                    font-bold 
                                    text-3xl 
                                    hover:text-fontColor-light
                                    transition-all 
                                    ease-in-out 
                                    duration-500
                                    after:-translate-y-1
                                    after:transition-all 
                                    after:ease-in-out 
                                    after:duration-500
                                    after:block
                                    after:w-0
                                    hover:after:w-full
                                    after:h-0.5
                                    after:rounded-full
                                    after:bg-fontColor-light
                                '
                            >
                                Užimtumas
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navigation