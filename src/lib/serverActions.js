"use server"

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const navigate = (url) => {
    redirect(url)
}

export const revalidatePage = (url) => {
    revalidatePath(url)
}
