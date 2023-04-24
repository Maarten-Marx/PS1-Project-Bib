package dev.rumamuse.payload

data class ReservationData(
    val timeslotIDs: List<Int>,
    val firstName: String,
    val lastName: String,
    val email: String
)
