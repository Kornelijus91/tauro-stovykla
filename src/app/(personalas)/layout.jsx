"use client"

import { useEffect } from 'react'
import Footer from '@/components/Footer'
import Toast from '@/components/Toast'
import useStore from "@/app/state"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp, database } from "@/app/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useRouter, usePathname } from 'next/navigation'

export default function RootLayout({ children }) {

	const { setUser, setAdmin, setToast, setLoading, user, admin } = useStore((state) => state)

	const auth = getAuth(firebaseApp)
    const router = useRouter()
	const pathname = usePathname()

	const checkIfAdmin = (userID) => {
		return new Promise(async (resolve) => {
			try {
				const adminListRef = doc(database, `admins/${userID}`)
				const adminListReq = await getDoc(adminListRef)
				const adminList = adminListReq.data()
				const isAdmin = adminList.admin === true ? true : false
				setAdmin(isAdmin)
				resolve(isAdmin)
			} catch (err) {
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

	
	useEffect(() => {
		if (user && admin && pathname === '/personalas') {
			router.push('/personalas/valdymas')
		} else if (user && !admin) {
			setToast('warning', 'Nesate personalo narys!')
		} 
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [admin])

	return (
		<>
			<main className='w-full flex flex-col justify-center items-center text-fontColor-dark'>
				{children}
			</main>
			<Toast />
			<Footer />
		</>
  	)
}
