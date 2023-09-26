import Kalendorius from "@/components/Kalendorius"
import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"
import { DividerInverted, Divider } from "@/components/Svgs"

export const revalidate = 3600

const fetchData = async () => {
    const nameliaiRef = doc(database, 'nameliai/visi')
    const nameliaiReq = await getDoc(nameliaiRef)
    return nameliaiReq.data()
}

const Uzimtumas = async () => {
    const data = await JSON.parse(JSON.stringify(await fetchData()))
    return (
        <main className='flex flex-col items-center grow w-full'>
            <DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
            <section className='relative flex flex-col grow w-full xl:w-[80rem] pb-6'>
                <Kalendorius nameliai={data}/>
            </section>
            <Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
        </main>
    )
}

export default Uzimtumas