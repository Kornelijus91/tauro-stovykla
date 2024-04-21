import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getStorage, ref, deleteObject } from "firebase/storage"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const deleteFile = (url) => {
    return new Promise(async (resolve, reject) => {
        const storage = getStorage()
        const fileRef = ref(storage, url)
        deleteObject(fileRef).then(() => {
            resolve('success')
        }).catch((error) => {
            console.error(error)
            reject('error')
        })
    })
}
