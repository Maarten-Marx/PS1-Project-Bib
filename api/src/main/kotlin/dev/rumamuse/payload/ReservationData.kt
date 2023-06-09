package dev.rumamuse.payload

import kotlinx.serialization.Serializable

@Serializable
data class ReservationData(
    val timeslotIDs: List<Int>,
    val firstName: String,
    val lastName: String,
    val email: String
)
