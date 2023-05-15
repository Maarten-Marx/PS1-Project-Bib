import React from 'react'
import '../css/App.css'
import TimeRangeSelector from '../components/TimeRangeSelector'
import DaySelector from '../components/DaySelector'
import { PrimaryHorizontalDivider, PrimaryVerticalDivider, SecondaryHorizontalDivider } from '../components/Divider'

function App() {
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
                        <input type='text' name='firstName' id='firstName' />
                    </div>
                    <div className='formInput'>
                        <label htmlFor='surName'>Achternaam</label>
                        <input type='text' name='surName' id='surName' />
                    </div>
                    <div className='formInput'>
                        <label htmlFor='emailAddress'>E-mailadres</label>
                        <input type='email' name='emailAddress' id='emailAddress' />
                    </div>
                    <button>Bevestigen</button>
                </div>
                <p id="copy">RUMAMUSE &copy; 2023</p>
            </div>
        </main>
    )
}

export default App
