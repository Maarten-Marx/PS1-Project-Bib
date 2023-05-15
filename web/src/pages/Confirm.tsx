import React from 'react'
import '../css/Confirm.css'

function Confirm() {
    return <main className='confirm'>
        <div>
            <h1>Uw afspraak is gemaakt.</h1>
            <p>
                U ontvangt een e-mail ter bevestiging, met een annulatie-link om de afspraak te annuleren.
            </p>
            <p>
                <a href='/'>Terug naar reservatiepagina</a>
            </p>
        </div>
        <p id='copy'>RUMAMUSE &copy; 2023</p>
    </main>
}

export default Confirm
