"use client"

import { useEffect } from 'react'
import useStore from "@/app/state"
import { useRouter } from 'next/navigation'

const Admin = () => {

    const { user, admin } = useStore((state) => state)
    const router = useRouter()

    useEffect(() => {
	    if (!user || !admin) router.push('/personalas')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [admin])

    return (
        <div>Admin</div>
    )
}

export default Admin