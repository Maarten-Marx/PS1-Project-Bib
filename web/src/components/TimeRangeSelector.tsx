import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

function TimeSlot() {
    return (
        <div className='timeSlot'>
            <p>xx:xx - xx:xx</p>
            <p>xx <FontAwesomeIcon className='icon' icon={solid('user')} /></p>
        </div>
    )
}

export default function TimeRangeSelector() {
    return (
        <div className='timeRangeSelector'>
            <div className='timeRangeDetails'>
                <p>xx:xx - xx:xx</p>
                <p><FontAwesomeIcon className='icon' icon={solid('angle-left')} /></p>
            </div>
            <div className='timeRangeSlots'>
                <TimeSlot />
                <TimeSlot />
                <TimeSlot />
                <TimeSlot />
            </div>
        </div>
    )
}