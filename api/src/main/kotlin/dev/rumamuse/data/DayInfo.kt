package dev.rumamuse.data

import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalTime

data class DayInfo(
    val date: LocalDate,
    val openingTime: LocalTime?,
    val closingTime: LocalTime?,
    val numberOfSeats: Int?
)
