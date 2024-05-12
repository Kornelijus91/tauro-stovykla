import Image from 'next/image'
import Link from 'next/link'
import { Divider, DividerInverted, Phone, Mail, Pin } from '@/components/Svgs'
import GalerijaOutter from '@/components/GalerijaOutter'
import Zemelapis from '@/components/Zemelapis'
import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"

export default async function Home() {

	const nameliaiRef = doc(database, 'pageData/homepage')
    const nameliaiReq = await getDoc(nameliaiRef)
    const mainPageData = nameliaiReq.data()

	return (
		<main className="flex flex-col items-center justify-between">
			<section 
				className='w-full h-[34rem] sm:h-[20rem] portrait:md:h-[40rem] lg:h-[40rem] xl:h-[54rem] bg-center bg-cover xl:bg-top flex flex-col z-10'
				style={{
					backgroundImage: `url(${mainPageData.mainImgUrl})`
				}}
			>
				<DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
				<div className='self-center h-full flex flex-col items-center justify-center gap-8 mb-8'>
					<h1 className='text-fontColor-dark font-TitleFont font-bold text-7xl md:text-6xl portrait:md:text-8xl lg:text-8xl xl:text-9xl drop-shadow-title max-w-[90vw] lg:max-w-2xl xl:max-w-4xl text-center -skew-y-6'>{mainPageData.sloganPrimary}</h1>
					<p className='font-TitleSecondFont text-fontColor-dark text-xl md:text-xl portrait:md:text-2xl lg:max-w-2xl xl:text-3xl drop-shadow-secondTitle tracking-widest'>{mainPageData.sloganSecondary}</p>
				</div>
				<Divider className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-bottomDivider'/>
			</section>
			<section className='w-full bg-bgColor-light flex justify-center py-20'>
				<div className='w-full md:w-[80rem] px-6 xl:px-0 grid grid-cols-1 lg:grid-cols-2 gap-32'>
					<section
						className='
							flex
							flex-col
							justify-start
							items-center
							gap-8
						'
					>
						<Image
							src={mainPageData.aboutImgUrl}
							width={480}
							height={270}
							alt="Apie mus skyriaus paveikslėlis"
							className='w-auto rounded-lg h-60 object-cover'
						/>
						<h1 className='font-TitleFont font-bold text-5xl text-fontColor-dark'>Apie mus</h1>
						<p className='leading-7 text-fontColor-dark text-justify'>{mainPageData.apiemusAprasymas}</p>
						<Link href="/apiemus" className='text-fontColor-light hover:text-fontColor-button underline'>Plačiau...</Link>
					</section>
					<section
						className='
							flex
							flex-col
							justify-start
							items-center
							gap-8
						'
					>
						<Image
							src={mainPageData.paslaugosImgUrl}
							width={480}
							height={270}
							alt="Apie mus skyriaus paveikslėlis"
							className='w-auto rounded-lg h-60 object-cover'
						/>
						<h1 className='font-TitleFont font-bold text-5xl text-fontColor-dark'>Paslaugos</h1>
						<p className='leading-7 text-fontColor-dark text-justify'>{mainPageData.paslaugosAprasymas}</p>
						<Link href="/paslaugos" className='text-fontColor-light hover:text-fontColor-button underline'>Plačiau...</Link>
					</section>
				</div>
			</section>
			<section className='flex flex-col items-center w-full bg-gradient-to-b from-orangeBg-top to-orangeBg-bottom'>
				<Divider className='block h-4 md:h-10 w-full text-bgColor-light rotate-180 drop-shadow-dividerFix'/>
				<GalerijaOutter images={mainPageData.featuredPhotos}/>
				<Divider className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-dividerFix'/>
			</section>
			<section className='w-full bg-bgColor-light flex flex-col justify-center items-center'>
				<div className='w-full xl:w-[80rem] flex flex-col-reverse md:flex-row gap-8 md:gap-20 pt-20 pb-28'>
					<div className='h-full w-full md:w-2/4 flex justify-center items-center px-6 xl:px-0'>
						<Zemelapis link={mainPageData.mapLink}/>
					</div>
					<div className='w-full md:w-2/4 flex flex-col gap-6 px-6 xl:px-0' id="kontaktai">
						<h1 className='font-TitleFont font-bold text-5xl text-fontColor-dark'>Kontaktai</h1>
						<a href={`tel:${mainPageData.telNr}`} className='flex items-center gap-6 text-xl text-fontColor-dark w-max'>
							<Phone className='h-10 w-10'/>
							<p>{mainPageData.telNr}</p>
						</a>
						<a href={`mailto: ${mainPageData.email}`} className='flex items-center gap-6 text-xl text-fontColor-dark w-max'>
							<Mail className='h-10 w-10'/>
							<p>{mainPageData.email}</p>
						</a>
						<div className='flex items-center gap-6 text-xl text-fontColor-dark'>
							<Pin className='h-10 w-10'/>
							<p>{mainPageData.address}</p>
						</div>
					</div>
				</div>
				<Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
			</section>
		</main>
	)
}
