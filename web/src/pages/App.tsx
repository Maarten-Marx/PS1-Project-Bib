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

    function placeReservation(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!state) return

        const payload: ReservationPayload = {
            timeslotIDs: state.timeslotIDs,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email
        }

        Axios.post<any, any, ReservationPayload>('http://127.0.0.1:8080/reservations/new', payload)
            .then(res => {
                if (res.status == 200) location.href = '/confirm'
            })
            .catch(() => {
            })
    }

    function showTimeRangeSelectors(selectedDate: string) {
        const prevState = state || { timeslotIDs: [], firstName: '', lastName: '', email: '', date: undefined }
        setState({ ...prevState, timeslotIDs: [], date: selectedDate })
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
                    <DaySelector onDaySelect={showTimeRangeSelectors} selectedDate={state && state.date} />
                </div>
                <PrimaryHorizontalDivider />
                <div id='timeSlotsPanel'>
                    {
                        (state && state.date) ?
                            <>
                                <TimeSelector day={state.date}
                                          toggleTimeslots={toggleTimeslots}
                                          selectedIDs={state.timeslotIDs} />
                                <div id="topShadow"></div>
                                <div id="bottomShadow"></div>
                            </> :
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
                <form onSubmit={placeReservation}>
                    <h1>Een plaats reserveren</h1>
                    <SecondaryHorizontalDivider />
                    <p>Vul uw gegevens in om plaatsen te reserveren. U ontvangt een bevestiging per e-mail.</p>

                    <div className='formInput'>
                        <label htmlFor='firstName'>Voornaam</label>
                        <input type='text' name='firstName' id='firstName' onChange={handleInputChange} required />
                    </div>
                    <div className='formInput'>
                        <label htmlFor='lastName'>Achternaam</label>
                        <input type='text' name='lastName' id='lastName' onChange={handleInputChange} required />
                    </div>
                    <div className='formInput'>
                        <label htmlFor='email'>E-mailadres</label>
                        <input type='email' name='email' id='email' onChange={handleInputChange} required />
                    </div>
                    <input type='submit'
                           disabled={formDisabled}
                           className={formDisabled ? 'disabled' : ''}
                           value='Bevestigen' />
                </form>
                <p id='copy'>RUMAMUSE &copy; 2023</p>
            </div>
        </main>
    )
}

export default App
