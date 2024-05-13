import { ImageResponse } from 'next/og'
import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"
 
export const alt = 'Tauro Stovykla'
export const size = {
    width: 1200,
    height: 630,
}
 
export const contentType = 'image/jpeg'
 
export default async function Image() {
    // const sloganPrimary = fetch(
    //     new URL('/taurasMainFont-Regular.woff', import.meta.url)
    // ).then((res) => res.arrayBuffer())

    // const sloganSecondary = fetch(
    //     new URL('/taurasTitleFont-Clean.woff', import.meta.url)
    // ).then((res) => res.arrayBuffer())

    const nameliaiRef = doc(database, 'pageData/homepage')
    const nameliaiReq = await getDoc(nameliaiRef)
    const mainPageData = nameliaiReq.data()
 
    return new ImageResponse(
        (
            <div 
                style={{
                    backgroundImage: `url(${mainPageData.mainImgUrl})`,
                    backgrouundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '36px'
                }}
            >
                <h1 
                    className='font-TitleFont'
                    style={{
                        color: '#264653',
                        fontFamily: 'SloganPrimary',
                        fontWeight: 'bold',
                        fontSize: '72px',
                        textShadow: '-2px 0 0 #F4E7CB, 2px 0 0 #F4E7CB, 0 -2px 0 #F4E7CB, 0 2px 0 #F4E7CB',
                        transform: 'skewX(-6deg)'
                    }}
                >
                    {mainPageData.sloganPrimary}
                </h1>
                <p 
                    className='font-TitleSecondFont'
                    style={{
                        color: '#264653',
                        fontFamily: 'SloganSecondary',
                        fontSize: '18px',
                        textShadow: '2px 2px 0 #F4E7CB',
                        letterSpacing: '2px'
                    }}
                >
                    {mainPageData.sloganSecondary}
                </p>
            </div>
        ),
        {
            ...size,
            // fonts: [
            //     {
            //         name: 'SloganPrimary',
            //         data: await sloganPrimary,
            //         style: 'normal',
            //         weight: 400,
            //     },
            //     {
            //         name: 'SloganSecondary',
            //         data: await sloganSecondary,
            //         style: 'normal',
            //         weight: 400,
            //     },
            // ],
        }
    )
}