package dev.rumamuse.payload

import kotlinx.datetime.Instant
import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class TimeslotsResponse(val day: LocalDate, val timeslots: List<TimeslotData>)

@Serializable
data class TimeslotData(
    val id: Int,
    val openingTime: Instant,
    val closingTime: Instant,
    val numberOfSeats: Int
)
