import React, { FormEvent, useState } from 'react'
import '../css/App.css'
import TimeRangeSelector from '../components/TimeRangeSelector'
import DaySelector from '../components/DaySelector'
import { PrimaryHorizontalDivider, PrimaryVerticalDivider, SecondaryHorizontalDivider } from '../components/Divider'
import Axios from 'axios'

type AppState = {
    timeslotIDs: number[]
    firstName: string
    lastName: string
    email: string
}

type ReservationPayload = {
    timeslotIDs: number[]
    firstName: string
    lastName: string
    email: string
}

function App() {
    const [state, setState] = useState<AppState>()

    function handleInputChange(event: FormEvent<HTMLInputElement>) {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
        const prevState = state || { timeslotIDs: [], firstName: '', lastName: '', email: '' }
        setState({ ...prevState, [name]: value })
    }

    function placeReservation() {
        // TODO: Disable the submit button as long as required information is missing.
        if (!state) return

        Axios.post<any, any, ReservationPayload>('http://127.0.0.1:8080/reservations/new', { ...state })
            .then(res => {
                if (res.status == 200) location.href = '/confirm'
            })
            .catch(() => {})
    }

    return (
        <main>
            <div id='leftPanel'>
                <div id='dayPanel'>
                    <h1>Kies een dag</h1>
                    <DaySelector />
                </div>
                <PrimaryHorizontalDivider />
                <div id='timeSlotsPanel'>
                    <h1>Kies uw gewenste tijdstippen</h1>
                    <div id='timeRangeSelectors'>
                        <TimeRangeSelector />
                        <TimeRangeSelector />
                        <TimeRangeSelector />
                        <TimeRangeSelector />
                        <TimeRangeSelector />
                        <TimeRangeSelector />
                        <TimeRangeSelector />
                    </div>
                </div>
            </div>
            <PrimaryVerticalDivider />
            <div id='rightPanel'>
                <div id='formHeader'>
                    <div>
                        <img src='/bib_logo.svg' alt='Bib logo' />
                    </div>
                    <div>
                        <p className='title'>Bibliotheek</p>
                        <p className='subtitle'>Geel</p>
                    </div>
                </div>
                <div id='form'>
                    <h1>Een plaats reserveren</h1>
                    <SecondaryHorizontalDivider />
                    <p>Vul uw gegevens in om plaatsen te reserveren. U ontvangt een bevestiging per e-mail.</p>

                    <div className='formInput'>
                        <label htmlFor='firstName'>Voornaam</label>
                        <input type='text' name='firstName' id='firstName' onChange={handleInputChange} />
                    </div>
                    <div className='formInput'>
                        <label htmlFor='lastName'>Achternaam</label>
                        <input type='text' name='lastName' id='lastName' onChange={handleInputChange} />
                    </div>
                    <div className='formInput'>
                        <label htmlFor='email'>E-mailadres</label>
                        <input type='email' name='email' id='email' onChange={handleInputChange} />
                    </div>
                    <button onClick={placeReservation}>Bevestigen</button>
                </div>
                <p id='copy'>RUMAMUSE &copy; 2023</p>
            </div>
        </main>
    )
}

export default App
