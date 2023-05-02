package dev.rumamuse.payload

import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalTime
import kotlinx.serialization.Serializable

@Serializable
data class WeekResponse(val days: List<DayData>)

@Serializable
data class DayData(val day: LocalDate, val weekDayIndex: Int, val openingTime: LocalTime?, val closingTime: LocalTime?)
