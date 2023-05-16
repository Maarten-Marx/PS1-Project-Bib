import React, { useState } from 'react'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import 'moment/locale/nl-be'
import Axios from 'axios'
import Loading from './Loading'
import { capitalize } from '../util'

type Day = {
    date: string,
    weekdayIndex: number,
    openingTime?: string
    closingTime?: string
}

type WeekResponse = {
    days: Day[]
}

type DayProps = {
    day: Day
}

function Day(props: DayProps) {
    const date = moment(props.day.date, 'YYYY-MM-DD')
    date.locale("nl-be")

    return (
        <div className={`day${!props.day.openingTime ? ' disabled' : ''}`}>
            <div>
                <h2 className='dayName'>{capitalize(date.format('dddd'))}</h2>
                <p className='date'>{date.format('D MMMM')}</p>
            </div>
            <div>
                <p className='dayTimeRange'>{
                    props.day.closingTime ?
                        `${props.day.openingTime} - ${props.day.closingTime}` :
                        'Gesloten'
                }</p>
            </div>
        </div>
    )
}

function DayRangePicker() {
    return (
        <div id='dayRange'>
            <p><FontAwesomeIcon className='icon' icon={solid('angle-left')} /></p>
            <p>x xxxxxxxx - x xxxxxxxx</p>
            <p><FontAwesomeIcon className='icon' icon={solid('angle-right')} /></p>
        </div>
    )
}

export default function DaySelector() {
    const [daysOfWeek, setDaysOfWeek] = useState<Day[]>()


    if (daysOfWeek === undefined) {
        getDaysInWeek(moment().format('YYYY-MM-DD')).then(setDaysOfWeek)
        return <main className='cancel'>
            <Loading />
        </main>
    } else {
        const dayElements = []
        for (const day of daysOfWeek) {
            dayElements.push(<Day day={day} />)
        }

        return (
            <div id='daySelector'>
                <DayRangePicker />
                <div id='daySelectorDays'>
                    {dayElements}
                </div>
            </div>
        )
    }
}

async function getDaysInWeek(day: string): Promise<Day[]> {
    return await Axios.get<WeekResponse>(`http://127.0.0.1:8080/week/${day}`)
        .then(response => {
            const daysOfWeek: Day[] = []
            for (const dayOfWeek of response.data.days) {
                daysOfWeek.push(dayOfWeek)
            }
            return daysOfWeek
        })
        .catch(() => [])
}