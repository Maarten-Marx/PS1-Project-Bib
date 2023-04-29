package dev.rumamuse.schema

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object ReservationTimeslot : IntIdTable("reservation_timeslot", "reservation_timeslot_id") {
    val reservationId = reference("reservation_id", Reservation)
    val timeslotId = reference("timeslot_id", Timeslot)
}

data class ReservationTimeslotEntry(val key: EntityID<Int>): IntEntity(key) {
    companion object : IntEntityClass<ReservationTimeslotEntry>(ReservationTimeslot)

    val reservationId by ReservationTimeslot.reservationId
    val timeslotId by ReservationTimeslot.timeslotId
}
