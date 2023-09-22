"use client"

import { GoogleIcon, Spinner } from "@/components/Svgs"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import useStore from "@/app/state"
import { getAuth } from 'firebase/auth'
import { firebaseApp } from "@/app/firebase"

const Login = () => {

    const { setToast, loading, setLoading } = useStore((state) => state)

    const auth = getAuth(firebaseApp)

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

    return (
        <section className='w-full flex flex-col min-h-[80vh] items-center justify-center gap-6'>
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