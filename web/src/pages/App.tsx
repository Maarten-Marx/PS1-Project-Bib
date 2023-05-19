import React, { FormEvent, useState } from 'react'
import '../css/App.css'
import DaySelector from '../components/DaySelector'
import { PrimaryHorizontalDivider, PrimaryVerticalDivider, SecondaryHorizontalDivider } from '../components/Divider'
import Axios from 'axios'
import TimeSelector from '../components/TimeSelector'

type AppState = {
    timeslotIDs: number[]
    firstName: string
    lastName: string
    email: string
    date: string | undefined
}

type ReservationPayload = {
    timeslotIDs: number[]
    firstName: string
    lastName: string
    email: string
}

function App() {
    const [state, setState] = useState<AppState>()
    const formDisabled = !state
        || !state.timeslotIDs
        || state.timeslotIDs.length === 0
        || !state.firstName
        || !state.lastName
        || !state.email

    function handleInputChange(event: FormEvent<HTMLInputElement>) {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
        const prevState = state || { timeslotIDs: [], firstName: '', lastName: '', email: '', date: undefined }
        setState({ ...prevState, [name]: value })
    }

    function placeReservation() {
        if (!state) return

        Axios.post<any, any, ReservationPayload>('http://127.0.0.1:8080/reservations/new', { ...state })
            .then(res => {
                if (res.status == 200) location.href = '/confirm'
            })
            .catch(() => {})
    }

    function toggleTimeslots(...ids: number[]) {
        if (!state) return

        let newIDs = state.timeslotIDs
        if (ids.some(id => !newIDs.includes(id))) {
            ids.forEach(id => {
                if (!newIDs.includes(id)) newIDs.push(id)
            })
        } else {
            newIDs = newIDs.filter(id => !ids.includes(id))
        }

        setState({
            ...state,
            timeslotIDs: newIDs
        })

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
                    {
                        (state !== undefined && state.date !== undefined) ?
                            <TimeSelector day={state.date}
                                          toggleTimeslots={toggleTimeslots}
                                          selectedIDs={state.timeslotIDs} /> :
                            <></>
                    }
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
                    <button disabled={formDisabled}
                            className={formDisabled ? 'disabled' : ''}
                            onClick={placeReservation}>
                        Bevestigen
                    </button>
                </div>
                <p id='copy'>RUMAMUSE &copy; 2023</p>
            </div>
        </main>
    )
}

export default App
