import { ImageResponse } from 'next/og'
import { doc, getDoc } from "firebase/firestore"
import { database } from "@/app/firebase"
// import * as http from 'http'
// import fs from 'fs'
// import path from 'path'

// const sloganPrimaryFontFile = fs.readFileSync(path.join(process.cwd(), '/', 'taurasTitleFont-Clean.woff'))
// const sloganPrimary = Buffer.from(sloganPrimaryFontFile)

// const sloganSecondaryFontFile = fs.readFileSync(path.join(process.cwd(), '/', 'taurasTitleFont-Clean.woff'))
// const sloganSecondary = Buffer.from(sloganSecondaryFontFile)
 
export const alt = 'Tauro Stovykla'
export const size = {
    width: 1200,
    height: 630,
    revalidate: 3600 * 12
}
 
export const contentType = 'image/jpeg'
 
export default async function Image() {

    // const sloganPrimary = fetch(
    //     new URL('../resources/fonts/taurasMainFont-Regular.woff', import.meta.url)
    // ).then((res) => res.arrayBuffer())

    // const sloganSecondary = fetch(
    //     new URL('../resources/fonts/taurasTitleFont-Clean.woff', import.meta.url)
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
                    width: `${size.width}px`,
                    height: `${size.height}px`,
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
            //         // weight: 400,
            //     },
            //     {
            //         name: 'SloganSecondary',
            //         data: await sloganSecondary,
            //         style: 'normal',
            //         // weight: 400,
            //     },
            // ],
        }
    )
}