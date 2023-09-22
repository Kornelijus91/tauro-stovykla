import Image from 'next/image'
import { Divider, DividerInverted, Phone, Mail, Pin } from '@/components/Svgs'
import Galerija from '@/components/Galerija'
import Zemelapis from '@/components/Zemelapis'

const galleryImages = [
	'/bg1.webp',
	'/bg2.webp',
	'/bg3.webp',
	'/bg4.webp',
	'/bg5.webp',
	'/bg6.webp',
	'/bg7.webp',
	'/bg8.webp',
	'/bg9.webp',
]

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between">
			<section className='w-full h-[34rem] sm:h-[20rem] portrait:md:h-[40rem] lg:h-[40rem] xl:h-[54rem] bg-forest bg-center bg-cover xl:bg-top flex flex-col z-10'>
				<DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
				<div className='self-center h-full flex flex-col items-center justify-center gap-8 mb-8'>
					<h1 className='text-fontColor-dark font-TitleFont font-bold text-7xl md:text-6xl portrait:md:text-8xl lg:text-8xl xl:text-9xl drop-shadow-title max-w-[90vw] lg:max-w-2xl xl:max-w-4xl text-center -skew-y-6'>Lorem ipsum dolor sit amet</h1>
					<p className='font-TitleSecondFont text-fontColor-dark text-xl md:text-xl portrait:md:text-2xl lg:max-w-2xl xl:text-3xl drop-shadow-secondTitle tracking-widest'>consectetur adipiscing elit</p>
				</div>
				<Divider className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-bottomDivider'/>
			</section>
			<section className='w-full bg-bgColor-light flex justify-center pt-8 pb-12'>
				<div className='w-full md:w-[80rem] px-6 xl:px-0 flex'>
					<div className='w-full md:w-2/4 flex flex-col gap-6'>
						<h1 className='font-TitleFont font-bold text-5xl text-fontColor-dark'>Apie mus</h1>
						<p className='leading-7 text-fontColor-dark text-justify'>Etiam efficitur rhoncus ante a rhoncus. Pellentesque faucibus ex at sapien dapibus, vitae elementum purus congue. Maecenas vitae libero varius ligula pharetra mattis in sit amet purus. Cras egestas massa vel massa pharetra, interdum pulvinar ex bibendum. Nulla semper commodo mi vel congue. Morbi ullamcorper, lacus vel consequat tristique, ipsum arcu pretium arcu, eu rutrum risus eros ut orci. Pellentesque sit amet lacus sem. Ut sed lacus diam. Maecenas vestibulum convallis quam ac faucibus. Sed sit amet nisi accumsan, egestas ipsum at, malesuada purus. Aliquam quis aliquet est. In bibendum nunc in viverra condimentum.</p>
					</div>
					<div className='hidden md:flex w-2/4 justify-end items-center pl-20 h-full'>
						<Image
							src="/bg6.webp"
							width={480}
							height={270}
							alt="Apie mus skyriaus paveikslėlis"
							className='rounded-lg h-full w-full object-cover'
						/>
					</div>
				</div>
			</section>
			<section className='flex flex-col items-center w-full bg-gradient-to-b from-orangeBg-top to-orangeBg-bottom'>
				<Divider className='block h-4 md:h-10 w-full text-bgColor-light rotate-180 drop-shadow-dividerFix'/>
				<Galerija images={galleryImages}/>
				<Divider className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-dividerFix'/>
			</section>
			<section className='w-full bg-bgColor-light flex flex-col justify-center items-center'>
				<div className='w-full xl:w-[80rem] flex flex-col-reverse md:flex-row gap-8 md:gap-20 pt-8 pb-12'>
					<div className='h-full w-full md:w-2/4 flex justify-center items-center px-6 xl:px-0'>
						<Zemelapis />
					</div>
					<div className='w-full md:w-2/4 flex flex-col gap-6 px-6 xl:px-0' id="kontaktai">
						<h1 className='font-TitleFont font-bold text-5xl text-fontColor-dark'>Kontaktai</h1>
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
				</div>
				<Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
			</section>
		</main>
	)
}
