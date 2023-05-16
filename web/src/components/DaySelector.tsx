import React, { useState } from 'react'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment, { Moment } from 'moment'
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
    date.locale('nl-be')

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

type DayRangePickerProps = {
    days: Day[]
    setDate: (offset: number) => void
}

function DayRangePicker(props: DayRangePickerProps) {
    moment.locale('nl-be')
    const first = moment(props.days[0].date)
    const last = moment(props.days.reverse()[0].date)

    return (
        <div id='dayRange'>
            <button onClick={() => props.setDate(-1)}>
                <FontAwesomeIcon className='icon' icon={solid('angle-left')} />
            </button>
            <p>{first.format('D MMMM')} - {last.format('D MMMM')}</p>
            <button onClick={() => props.setDate(1)}>
                <FontAwesomeIcon className='icon' icon={solid('angle-right')} />
            </button>
        </div>
    )
}

type DaySelectorState = {
    daysOfWeek: Day[]
    currentDate: Moment
    selectedIndex: number | null
}

export default function DaySelector() {
    const [state, setState] = useState<DaySelectorState>()

    function setDate(offset: number) {
        const date = (state !== undefined && state.currentDate !== undefined) ? state.currentDate : moment()
        date.add(offset, 'weeks')
        getDaysInWeek(date).then((res) => setState({
            daysOfWeek: res,
            currentDate: date,
            selectedIndex: null
        }))
    }

    if (state === undefined || state.daysOfWeek === undefined) {
        setDate(0)
        return <main className='cancel'>
            <Loading />
        </main>
    } else {
        return (
            <div id='daySelector'>
                <DayRangePicker days={state.daysOfWeek} setDate={setDate} />
                <div id='daySelectorDays'>
                    {state.daysOfWeek.map((day, i) => <Day day={day} key={i}/>)}
                </div>
            </div>
        )
    }
}

async function getDaysInWeek(day: Moment): Promise<Day[]> {
    return await Axios.get<WeekResponse>(`http://127.0.0.1:8080/week/${day.format('YYYY-MM-DD')}`)
        .then(response => {
            const daysOfWeek: Day[] = []
            for (const dayOfWeek of response.data.days) {
                daysOfWeek.push(dayOfWeek)
            }
            return daysOfWeek
        })
        .catch(() => [])
}