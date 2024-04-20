"use server"

import { redirect } from 'next/navigation'

export const navigate = (url) => {
    redirect(url)
}