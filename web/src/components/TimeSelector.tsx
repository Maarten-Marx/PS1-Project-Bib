import React, { useState } from 'react'
import Axios from 'axios'
import Loading from './Loading'
import moment from 'moment'
import TimeRangeSelector from './TimeRangeSelector'

type Timeslot = {
    id: number,
    openingTime: string,
    closingTime: string,
    numberOfSeats: number
}

type TimeslotsResponse = {
    day: string
    timeslots: Timeslot[]
}


type TimeSelectorProps = {
    day: string
    toggleTimeslots: (...ids: number[]) => void
    selectedIDs: number[]
}


function TimeSelector(props: TimeSelectorProps) {
    const [timeslots, setTimeslots] = useState<Timeslot[]>()

    if (timeslots === undefined) {
        getTimeslots(props.day)
            .then(res => setTimeslots(res.timeslots))
        return <Loading />
    } else {
        const groupedSlots = timeslots.reduce((groups: Record<number, Timeslot[]>, slot) => {
            const hour = moment(slot.openingTime).hour()
            groups[hour] = groups[hour] || []
            groups[hour].push(slot)
            return groups
        }, {})

        return <>
            <h1>Kies uw gewenste tijdstippen</h1>
            <div id='timeRangeSelectors'>
                {Object.values(groupedSlots).map((slots, i) =>
                    <TimeRangeSelector
                        timeslots={slots}
                        toggleTimeslots={props.toggleTimeslots}
                        selectedIDs={props.selectedIDs}
                        key={i} />
                )}
            </div>
        </>
    }
}

async function getTimeslots(day: string): Promise<TimeslotsResponse> {
    return await Axios.get<TimeslotsResponse>(`http://127.0.0.1:8080/timeslots/${day}`)
        .then(res => res.data)
        .catch(() => {
            return {
                day: day,
                timeslots: []
            }
        })
}

export default TimeSelector

export type { Timeslot }
