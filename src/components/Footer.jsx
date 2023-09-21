import { DividerInverted } from "./Svgs"

const Footer = () => {
    return (
        <footer className='mt-auto w-full bg-fontColor-dark flex flex-col items-center text-bgColor-light font-extralight'>
            <DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-dividerFixInverted'/>
            <div className='w-full xl:w-[80rem] py-2 px-6 xl:px-0 flex justify-between'>
                <p>&copy; {new Date().getFullYear()}</p>
                <p>Svetainę sukūrė <a href='https://www.linkedin.com/in/kornelijus-%C5%A1aulys-732418212/' target="_blank" className="underline cursor-pointer hover:text-bgColor-dark transition ease-in-out duration-150">Kornelijus Šaulys</a></p>
            </div>
        </footer>
    )
}

export default Footer