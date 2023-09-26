'use client'

import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { doc, onSnapshot } from "firebase/firestore"
import { database } from "@/app/firebase"
import useStore from "@/app/state"

export default function RootLayout({ children }) {

    const unsub = useRef(null)
    const pathname = usePathname()
    const router = useRouter()
    const { user, admin, setNameliai, setToast } = useStore((state) => state)

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
        <main className='w-full flex flex-col items-center'>
            <nav className='w-full xl:w-[80rem] px-2 xl:px-0 py-4 flex flex-col justify-between after:w-full after:h-1 after:bg-fontColor-dark after:rounded-full'>
                <div className='flex justify-between'>
                    <Link href="/personalas/valdymas" className='font-TitleFont font-bold text-4xl md:text-5xl'>Personalas</Link>
                    {/* <ul className='flex items-center gap-6'>
                        <li>
                            <Link 
                                href="/personalas/valdymas/nameliai" 
                                className={`
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
                                    ${pathname === '/personalas/valdymas/nameliai' ? 'after:w-full' : 'after:w-0'}
                                    hover:after:w-full
                                    after:h-0.5
                                    after:rounded-full
                                    after:bg-fontColor-dark
                                `}
                            >
                                Nameliai
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/personalas/valdymas/paskyros" 
                                className={`
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
                                    ${pathname === '/personalas/valdymas/paskyros' ? 'after:w-full' : 'after:w-0'}
                                    hover:after:w-full
                                    after:h-0.5
                                    after:rounded-full
                                    after:bg-fontColor-dark
                                `}
                            >
                                Paskyros
                            </Link>
                        </li>
                    </ul> */}
                </div>
            </nav>
            <section className='w-full xl:w-[80rem]'>
                {children}
            </section>
        </main>
  	)
}
