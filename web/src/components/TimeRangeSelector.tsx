import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Timeslot } from './TimeSelector'
import moment from 'moment'

type TimeSlotProps = {
    timeslot: Timeslot
    toggleTimeslot: () => void
    selectedIDs: number[]
}

function TimeSlot(props: TimeSlotProps) {
    const start = moment(props.timeslot.openingTime).format('HH:mm')
    const end = moment(props.timeslot.closingTime).format('HH:mm')

    const selected = props.selectedIDs.includes(props.timeslot.id)

    return (
        <div className={'timeSlot' + (selected ? ' selected' : '')} onClick={props.toggleTimeslot}>
            <p>{start} - {end}</p>
            <p>{props.timeslot.numberOfSeats} <FontAwesomeIcon className='icon' icon={solid('user')} /></p>
        </div>
    )
}

type TimeRangeSelectorProps = {
    timeslots: Timeslot[]
    toggleTimeslots: (...ids: number[]) => void
    selectedIDs: number[]
}

type TimeRangeSelectorState = {
    opened: boolean
}

export default function TimeRangeSelector(props: TimeRangeSelectorProps) {
    const [state, setState] = useState<TimeRangeSelectorState>()

    const first = props.timeslots.at(0)
    const last = props.timeslots.at(-1)

    if (first === undefined || last === undefined) return <></>

    const start = moment(first.openingTime).format('HH:mm')
    const end = moment(last.closingTime).format('HH:mm')

    const someSelected = props.timeslots.some(slot => props.selectedIDs.includes(slot.id))
    const allSelected = !props.timeslots.some(slot => !props.selectedIDs.includes(slot.id))

    return (
        <div className={'timeRangeSelector' + (state && state.opened ? ' opened' : '')}>
            <div className={
                'timeRangeDetails'
                + (someSelected ? ' someSelected' : '')
                + (allSelected ? ' selected' : '')
            }>
                <p onClick={() =>
                    props.toggleTimeslots(...props.timeslots.map(slot => slot.id))
                }>{start} - {end}</p>
                <button onClick={() => setState({
                    opened: !state || !state.opened
                })}>
                    <FontAwesomeIcon className='icon' icon={solid('angle-right')} />
                </button>
            </div>
            <div className={'timeRangeSlots'}>
                {props.timeslots.map((slot, i) =>
                    <TimeSlot timeslot={slot}
                              toggleTimeslot={() => props.toggleTimeslots(slot.id)}
                              selectedIDs={props.selectedIDs}
                              key={i} />
                )}
            </div>
        </div>
    )
}