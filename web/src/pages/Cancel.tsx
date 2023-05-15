import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Axios from 'axios'
import '../css/Cancel.css'

function Cancel() {
    const { hash } = useParams()
    const [succeeded, setSucceeded] = useState<boolean>()

    if (succeeded === undefined) {
        makeRequest(hash).then(setSucceeded)
        return <main className='cancel'>
            <Loading />
        </main>
    } else {
        return <main className='cancel'>
            <div>
                {
                    succeeded ? <>
                        <h1>Afspraak geannuleerd!</h1>
                        <p>Uw afspraak is bij deze geannuleerd.
                            Als u een andere afspraak wenst te maken, klik dan op de link hieronder.</p>
                    </> : <>
                        <h1>De afspraak kon niet geannuleerd worden.</h1>
                        <p>
                            De code <code>{hash}</code> is niet gelinkt aan een geldige afspraak.<br />
                            Als u een nieuwe afspraak wenst te maken, klik dan op de link hieronder.
                        </p>
                    </>
                }
                <p>
                    <a href='/'>Terug naar reservatiepagina</a>
                </p>
            </div>
            <p id="copy">RUMAMUSE &copy; 2023</p>
        </main>
    }
}

async function makeRequest(hash: string | undefined): Promise<boolean> {
    if (hash === undefined) return false

    return await Axios.delete(`http://127.0.0.1:8080/reservations/${hash}`)
        .then(res => res.status === 200)
        .catch(() => false)
}

export default Cancel
