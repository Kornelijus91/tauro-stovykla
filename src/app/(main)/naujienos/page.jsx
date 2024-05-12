import { query, getDocs, collection, orderBy } from "firebase/firestore"
import { database } from "@/app/firebase"
import { DividerInverted, Divider } from "@/components/Svgs"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
    title: 'Tauro Stovykla - Naujienos',
    alternates: {
        canonical: '/naujienos',
    },
}

const Naujienos = async () => {
    let news = []
    try {
        const q = query(collection(database, "naujienos"), orderBy("created", "desc"))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            news.push({
                id: doc.id,
                content: data.content,
                imageURL: data.imageURL,
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
            <section className='flex flex-col grow w-full xl:w-[80rem] pb-6 px-4 xl:px-0 gap-4'>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='font-TitleFont font-bold text-4xl text-center text-fontColor-dark'>Naujienos</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
                    {news.length > 0 ? news.map((article) =>
                        <Link 
                            key={article.id} 
                            href={`/naujienos/${article.id}`} 
                            className="
                                flex 
                                flex-col 
                                grow
                                rounded-lg 
                                overflow-hidden 
                                shadow-md 
                                group
                                max-h-80
                            "
                        >
                            <Image
                                src={article.imageURL}
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
                            <div className="flex w-full py-1 px-2 text-pretty z-40 bg-bgColor-input">
                                <p>{article.title}</p>
                            </div>
                        </Link>
                    )
                    :
                        <p>Naujienų nėra.</p>
                    }
                </div>
            </section>
            <Divider className='block h-4 md:h-10 w-full text-fontColor-dark drop-shadow-dividerFixFooter'/>
        </main>
    )
}

export default Naujienos