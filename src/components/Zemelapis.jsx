import React from 'react'

const Zemelapis = ({link}) => {
    return (
        <iframe 
            src={link}
            style={{
                border: 0,
            }}
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className='w-full h-full min-h-[20rem] rounded-md'
            title="Google žemėlapis"
        />
    )
}

export default Zemelapis