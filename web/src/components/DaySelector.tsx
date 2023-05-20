import React, { useState } from 'react'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment, { Moment } from 'moment'
import 'moment/locale/nl-be'
import Axios from 'axios'
import Loading from './Loading'
import { apiHost, capitalize } from '../util'

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
    day: Day,
    selectedDate: string | undefined,
    setSelectedDate: (date: string) => void
}

function Day(props: DayProps) {
    const date = moment(props.day.date, 'YYYY-MM-DD')
    const startOfDay = moment().hour(0).minute(0).second(0).millisecond(0)
    date.locale('nl-be')

    const disabled = props.day.openingTime == null || date.isBefore(startOfDay)
    const selected = props.selectedDate === props.day.date

    return (
        <div className={
            'day'
            + (disabled ? ' disabled' : '')
            + (selected ? ' selected' : '')
        } onClick={() => {
            if (disabled) return
            props.setSelectedDate(props.day.date)
        }}>
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
    const first = props.days.at(0)
    const last = props.days.at(-1)

    if (first === undefined || last === undefined) return <></>

    const firstDate = moment(first.date)
    const lastDate = moment(last.date)

    return (
        <div id='dayRange'>
            <button onClick={() => props.setDate(-1)}>
                <FontAwesomeIcon className='icon' icon={solid('angle-left')} />
            </button>
            <p>{firstDate.format('D MMMM')} - {lastDate.format('D MMMM')}</p>
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

type DaySelectorProps = {
    selectedDate: string | undefined,
    onDaySelect: (date: string) => void
}

export default function DaySelector(props: DaySelectorProps) {
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
        return <main>
            <Loading />
        </main>
    } else {
        return (
            <div id='daySelector'>
                <DayRangePicker days={state.daysOfWeek} setDate={setDate} />
                <div id='daySelectorDays'>
                    {state.daysOfWeek.map((day, i) => <Day day={day} key={i} setSelectedDate={props.onDaySelect} selectedDate={props.selectedDate}/>)}
                </div>
            </div>
        )
    }
}

async function getDaysInWeek(day: Moment): Promise<Day[]> {
    // noinspection HttpUrlsUsage
    return await Axios.get<WeekResponse>(`http://${apiHost}/week/${day.format('YYYY-MM-DD')}`)
        .then(response => {
            const daysOfWeek: Day[] = []
            for (const dayOfWeek of response.data.days) {
                daysOfWeek.push(dayOfWeek)
            }
            return daysOfWeek
        })
        .catch(() => [])
}