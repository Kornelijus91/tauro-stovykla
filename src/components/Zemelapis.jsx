import React from 'react'

const Zemelapis = () => {
    return (
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17913.906578185677!2d23.121594498365393!3d55.858531415775516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e5e6d8c2a0093d%3A0xed40d7ff54a6a386!2sBubiai%2C%20%C5%A0iauliai%20District%20Municipality!5e0!3m2!1sen!2slt!4v1695384095221!5m2!1sen!2slt" 
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