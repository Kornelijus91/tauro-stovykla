"use client"

import { useEffect } from 'react'
import Toast from '@/components/Toast'
import useStore from "@/app/state"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp, database } from "@/app/firebase"
import { doc, getDoc } from "firebase/firestore"
// import { useRouter, usePathname } from 'next/navigation'
import { GoogleIcon, Spinner } from '@/components/Svgs'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default function RootLayout({ children }) {

	const { setUser, setAdmin, user, admin, setToast, loading, setLoading } = useStore((state) => state)

	const auth = getAuth(firebaseApp)
    // const router = useRouter()
	// const pathname = usePathname()

	const handleLogin = async () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            setLoading(false)
        } catch(err) {
            setLoading(false)
            setToast(
                'warning',
                'Klaida! Pabandykite vėliau.'      
            )
        }
    }

	const checkIfAdmin = (userID) => {
		setLoading(true)
		return new Promise(async (resolve) => {
			try {
				const adminListRef = doc(database, `admins/${userID}`)
				const adminListReq = await getDoc(adminListRef)
				const adminList = adminListReq.data()
				const isAdmin = adminList.admin === true ? true : false
				setLoading(false)
				setAdmin(isAdmin)
				resolve(isAdmin)
			} catch (err) {
				setLoading(false)
				setAdmin(false)
				resolve(false)
			}
		})
	}

	useEffect(() => {
		const authSub = onAuthStateChanged(auth, async (user) => {
            setUser(user)
            if (user) {
                await checkIfAdmin(user.uid)
            } else {
				setAdmin(false)
			}
        })

        return function cleanup() {
            authSub()
        }  
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{user && admin ?
				<main className='w-full flex flex-col justify-center items-center text-fontColor-dark'>
					{children}
				</main>
			:
				<section className='w-full flex flex-col min-h-[80vh] items-center justify-center gap-6'>
					<h1 className='font-TitleFont font-bold text-4xl text-fontColor-dark md:text-5xl'>Personalas</h1>
					<button 
						onClick={handleLogin}
						disabled={loading}
						className='min-w-[9.4rem] bg-white hover:bg-[#f2f2f2] active:bg-[#d9d9d9] disabled:opacity-80 py-2 px-4 rounded-md drop-shadow flex justify-center gap-4 transition-all ease-in-out duration-200'
					>
						{loading ?
							<Spinner className='h-6 w-6 animate-spin-reverse'/>
						:
							<>
								<GoogleIcon className='h-6 w-6'/>
								<p>Prisijungti</p>
							</>
						}
					</button>
				</section>
			}
			<Toast />
		</>
  	)
}
