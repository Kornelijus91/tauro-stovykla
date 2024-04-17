import { Spinner} from "@/components/Svgs"

export default function Loading() {
    return (
        <main className='flex flex-col grow w-full justify-center items-center'>
            <h1 className="font-TitleFont font-bold text-3xl md:text-4xl">Kraunasi...</h1>
            <Spinner className='h-8 w-8 animate-spin-reverse'/>
        </main>
    )
}