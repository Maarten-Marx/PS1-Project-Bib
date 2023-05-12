import React from 'react'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Day() {
    return (
        <div className='day'>
            <div>
                <h2 className='dayName'>xxxxxxxx</h2>
                <p className='date'>x xxxxxxxx</p>
            </div>
            <div>
                <p className='dayTimeRange'>xx:xx - xx:xx</p>
            </div>
        </div>
    )
}

export default function DaySelector() {
    return (
        <div id='daySelector'>
            <div id='dayRange'>
                <p><FontAwesomeIcon className='icon' icon={solid('angle-left')} /></p>
                <p>x xxxxxxxx - x xxxxxxxx</p>
                <p><FontAwesomeIcon className='icon' icon={solid('angle-right')} /></p>
            </div>
            <div id='daySelectorDays'>
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
            </div>
        </div>
    )
}