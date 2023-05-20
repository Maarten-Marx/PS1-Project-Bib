import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios'
import Loading from './Loading'
import moment from 'moment'
import TimeRangeSelector from './TimeRangeSelector'
import { apiHost } from '../util'

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
    const dayRef = useRef(props.day)

    useEffect(() => {
        if (dayRef.current !== props.day) {
            dayRef.current = props.day
            setTimeslots(undefined)
        }
    })

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
    // noinspection HttpUrlsUsage
    return await Axios.get<TimeslotsResponse>(`http://${apiHost}/timeslots/${day}`)
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
