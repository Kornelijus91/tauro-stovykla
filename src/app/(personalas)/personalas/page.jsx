"use client"

import { GoogleIcon, Spinner } from "@/components/Svgs"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import useStore from "@/app/state"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp, database } from "@/app/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from 'next/navigation'

const Login = () => {

    const { setUser, setAdmin, setToast, loading, setLoading } = useStore((state) => state)

    const auth = getAuth(firebaseApp)
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            setLoading(false)
        } catch(err) {
            setLoading(false)
            // console.log(err)
            setToast(
                'warning',
                'Klaida! Pabandykite vėliau.'      
            )
        }
    }

    useEffect(() => {
        setLoading(true)
        const checkIfAdmin = (userID) => {
            return new Promise(async (resolve) => {
                try {
                    const adminListRef = doc(database, 'admins/list')
                    const adminListReq = await getDoc(adminListRef)
                    const adminList = adminListReq.data()
                    const isAdmin = adminList.list.includes(userID)
                    setAdmin(isAdmin)
                    resolve(isAdmin)
                } catch (err) {
                    setAdmin(false)
                    resolve(false)
                }
            })
        }
        const authSub = onAuthStateChanged(auth, async (user) => {
            setUser(user)
            if (user) {
                const isAdmin = await checkIfAdmin(user.uid)
                setLoading(false)
                if (isAdmin) {
                    router.push('/personalas/valdymas')
                } else {
                    setToast('warning', 'Neturite administratoriaus teisių.')
                }
            }
        })

        return function cleanup() {
            authSub()
            setLoading(false)
        }  
    }, [auth, setUser, setAdmin, setLoading, setToast, router])

    return (
        <section className='w-full md:w-[80rem] flex flex-col items-center justify-center gap-6'>
            <h1 className='font-TitleFont font-bold text-4xl md:text-5xl'>Personalas</h1>
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
    )
}

export default Login