'use client'

import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { doc, onSnapshot } from "firebase/firestore"
import { database } from "@/app/firebase"
import useStore from "@/app/state"
import { House, Gallery, Cog, News, BoxIcon } from "@/components/Svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAuth, signOut } from "firebase/auth";

export default function RootLayout({ children }) {

    const unsub = useRef(null)
    // const pathname = usePathname()
    const router = useRouter()
    const { user, admin, setNameliai, setToast } = useStore((state) => state)

    const logoff = (e) => {
        e.preventDefault()
        const auth = getAuth()
        signOut(auth).then(() => {

        }).catch((error) => {
            console.error(error)
            setToast(
                'warning',
                'Klaida! Pabandykite vėliau.'      
            )
        })
    }

    useEffect(() => {
	    if (!user && !admin) router.push('/personalas')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [admin])

    useEffect(() => {
        if (admin) {
            try {
                unsub.current = onSnapshot(doc(database, 'nameliai/visi'), (doc) => {
                    let data = doc.data()
                    data.sarasas.sort((a, b) => a.numeris - b.numeris)
                    // console.log("Nameliai => ", data)
                    setNameliai(data)
                })
            } catch(err) {
                console.log(err)
                setToast('warning', 'Klaida! Nepavyko užkrauti namelių informacijos.')
            }
        }
	   
        return function cleanup() {
            if(unsub.current) unsub.current()
        }  
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (        
        <main className='w-full h-full flex min-h-screen p-4 gap-4'>
            <nav className='
                w-72
                px-4
                py-4
                rounded-lg
                flex 
                flex-col 
                text-bgColor-light
                bg-fontColor-dark 
                '
            >
                <Link href="/personalas" className='font-TitleFont font-bold text-3xl md:text-4xl mx-auto mb-2'>Tauro Stovykla</Link>
                <div className="
                    w-full 
                    h-px
                    bg-bgColor-light
                    rounded-full
                "/>
                    <div className="flex flex-col gap-2 py-4">
                        <Link 
                            href="/personalas" 
                            className='
                                font-bold 
                                text-lg 
                                md:text-xl
                                flex 
                                flex-col
                                hover:text-bgColor-input
                                transition-all 
                                ease-in-out 
                                duration-500
                                after:mt-1
                                after:-translate-y-1
                                after:transition-all 
                                after:ease-in-out 
                                after:duration-500
                                after:block
                                after:w-0
                                hover:after:w-full
                                after:h-0.5
                                after:rounded-full
                                after:bg-bgColor-input
                                '
                        >
                            <div className="flex gap-6">
                                <House className='h-6 w-6'/>
                                Nameliai
                            </div>
                        </Link>
                        <Link 
                            href="/personalas/naujienos" 
                            className='
                                font-bold 
                                text-lg 
                                md:text-xl
                                flex 
                                flex-col
                                hover:text-bgColor-input
                                transition-all 
                                ease-in-out 
                                duration-500
                                after:mt-1
                                after:-translate-y-1
                                after:transition-all 
                                after:ease-in-out 
                                after:duration-500
                                after:block
                                after:w-0
                                hover:after:w-full
                                after:h-0.5
                                after:rounded-full
                                after:bg-bgColor-input
                                '
                        >
                            <div className="flex gap-6">
                                <News className='h-6 w-6'/>
                                Naujienos
                            </div>
                        </Link>
                        <Link 
                            href="/personalas/turinys" 
                            className='
                                font-bold 
                                text-lg 
                                md:text-xl
                                flex 
                                flex-col
                                hover:text-bgColor-input
                                transition-all 
                                ease-in-out 
                                duration-500
                                after:mt-1
                                after:-translate-y-1
                                after:transition-all 
                                after:ease-in-out 
                                after:duration-500
                                after:block
                                after:w-0
                                hover:after:w-full
                                after:h-0.5
                                after:rounded-full
                                after:bg-bgColor-input
                                '
                        >
                            <div className="flex gap-6">
                                <BoxIcon className='h-6 w-6'/>
                                Turinys
                            </div>
                        </Link>
                        <Link 
                            href="/personalas/galerija" 
                            className='
                                font-bold 
                                text-lg 
                                md:text-xl
                                flex 
                                flex-col
                                hover:text-bgColor-input
                                transition-all 
                                ease-in-out 
                                duration-500
                                after:mt-1
                                after:-translate-y-1
                                after:transition-all 
                                after:ease-in-out 
                                after:duration-500
                                after:block
                                after:w-0
                                hover:after:w-full
                                after:h-0.5
                                after:rounded-full
                                after:bg-bgColor-input
                                '
                        >
                            <div className="flex gap-6">
                                <Gallery className='h-6 w-6'/>
                                Galerija
                            </div>
                        </Link>
                        <Link 
                            href="/personalas/nustatymai" 
                            className='
                                font-bold 
                                text-lg 
                                md:text-xl
                                flex 
                                flex-col
                                hover:text-bgColor-input
                                transition-all 
                                ease-in-out 
                                duration-500
                                after:mt-1
                                after:-translate-y-1
                                after:transition-all 
                                after:ease-in-out 
                                after:duration-500
                                after:block
                                after:w-0
                                hover:after:w-full
                                after:h-0.5
                                after:rounded-full
                                after:bg-bgColor-input
                                '
                        >
                            <div className="flex gap-6">
                                <Cog className='h-6 w-6'/>
                                Nustatymai
                            </div>
                        </Link>
                    </div>
                {user &&
                    <div className="w-full mt-auto">
                        <div className="
                            w-full 
                            h-px
                            my-4
                            bg-bgColor-light
                            rounded-full
                        "/>
                        <div className="flex gap-4 items-center">
                            <Avatar>
                                <AvatarImage src={user.photoURL} />
                                <AvatarFallback className='bg-bgColor-light text-fontColor-dark'>{user.displayName.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')}</AvatarFallback>
                            </Avatar>
                            <div className="text-bgColor-light text-sm flex flex-col gap-1">
                                <p>{user.displayName}</p>
                                <a 
                                    href='/' 
                                    onClick={logoff}
                                    className="text-sm underline hover:text-bgColor-input transition-all ease-in-out duration-150"
                                >
                                    Atsijungti
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </nav>
            <section className='w-full'>
                {children}
            </section>
        </main>
  	)
}
