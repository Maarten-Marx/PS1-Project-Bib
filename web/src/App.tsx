import React from 'react'
import logo from './logo.svg'
import './App.css'
import TimeRangeSelector from './components/TimeRangeSelector'
import DaySelector from './components/DaySelector'
import { PrimaryHorizontalDivider, SecondaryHorizontalDivider } from './components/HorizontalDivider'

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
            <div id='rightPanel'>
                <div className='form'>
                    <div>
                        <p>Bibliotheek</p>
                        <p>Geel</p>
                    </div>
                    <div>
                        <h2>Een plaats reserveren</h2>
                        <SecondaryHorizontalDivider />
                        <p>Vul uw gegevens in om plaatsen te reserveren. U ontvangt een bevestiging per e-mail.</p>
                        <form action=''>
                            <label htmlFor='firstName'>Voornaam</label>
                            <input type='text' name='firstName' id='firstName' />
                            <label htmlFor='surName'>Achternaam</label>
                            <input type='text' name='surName' id='surName' />
                            <label htmlFor='emailAddress'>E-mailadres</label>
                            <input type='email' name='emailAddress' id='emailAddress' />
                            <input type='submit' value='Bevestigen' />
                        </form>
                    </div>
                </div>
                <p>RUMAMUSE © 2023</p>
            </div>
        </main>
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.tsx</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>

    )
}

export default App
