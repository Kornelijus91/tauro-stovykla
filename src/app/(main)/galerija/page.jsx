import { query, getDocs, collection, orderBy } from "firebase/firestore"
import { database } from "@/app/firebase"
import { DividerInverted, Divider } from "@/components/Svgs"
import Link from "next/link"
import Image from "next/image"

const Galerija = async () => {
    let albums = []
    try {
        const q = query(collection(database, "galerija"), orderBy("created", "desc"))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            albums.push({
                id: doc.id,
                images: data.images,
                created: data.created,
                title: data.title
            })
        })
    } catch (err) {
        console.error(err)
    }

    return (
        <main className='flex flex-col items-center grow w-full'>
            <DividerInverted className='block h-4 md:h-10 w-full text-bgColor-light drop-shadow-topDivider'/>
            <section className='flex flex-col grow w-full xl:w-[80rem] pb-6 gap-4'>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='font-TitleFont font-bold text-4xl text-center text-fontColor-dark'>Galerija</h1>
                </div>
                <div className="grid grid-cols-4 w-full gap-4">
                    {albums.length > 0 ? albums.map((album) =>
                        <Link 
                            key={album.id} 
                            href={`/galerija/${album.id}`} 
                            className="
                                flex 
                                flex-col 
                                grow
                                rounded-lg 
                                overflow-hidden 
                                shadow-md 
                                group
                                max-h-52
                                relative
                            "
                        >
                            <Image
                                src={album.images[0]}
                                width={192}
                                height={108}
                                alt="Straipsnio nuotrauka"
                                className='
                                    h-full 
                                    w-full 
                                    object-cover 
                                    group-hover:scale-125
                                    transition-all 
                                    ease-in-out 
                                    duration-150
                                    z-10
                                '
                            />
                            <div className="absolute bottom-0 flex w-full py-1 px-2 text-pretty z-40 bg-bgColor-input">
                                <p>{album.title}</p>
                            </div>
                        </Link>
                    )
                    :
                        <p>Albumų nėra.</p>
                    }
                </div>
            </section>
            <Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
        </main>
    )
}

export default Galerija