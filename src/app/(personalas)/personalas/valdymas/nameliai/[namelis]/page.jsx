import React from 'react'

const Page = ({ params }) => {
    return (
        <section>
            <h1>Namelis {params.namelis}</h1>
        </section>
    )
}

export default Page