import { query, getDocs, collection, orderBy } from "firebase/firestore"
import { database } from "@/app/firebase"


export default async function sitemap() {

    let dynamicUrls = []

    try {
        const q = query(collection(database, "naujienos"), orderBy("created", "desc"))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            dynamicUrls.push({
                url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/naujienos/${doc.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            })
        })
    } catch (err) {
        console.error(err)
    }
    
    try {
        const q = query(collection(database, "galerija"), orderBy("created", "desc"))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            dynamicUrls.push({
                url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/galerija/${doc.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            })
        })
    } catch (err) {
        console.error(err)
    }

    return [
        {
            url: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL),
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/paslaugos`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/apiemus`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/uzimtumas`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/kontaktai`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/naujienos`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/galerija`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...dynamicUrls
    ]
  }