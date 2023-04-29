package dev.rumamuse.schema

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.timestamp

object Reservation : IntIdTable("reservation", "reservation_id") {
    val firstName = varchar("first_name", 30)
    val name = varchar("name", 20)
    val email = varchar("email", 180)
    val timestamp = timestamp("timestamp")
    val cancelHash = char("cancel_hash", 64)
}

data class ReservationEntry(val key: EntityID<Int>): IntEntity(key) {
    companion object : IntEntityClass<ReservationEntry>(Reservation)

    val firstName by Reservation.firstName
    val name by Reservation.name
    val email by Reservation.email
    val timestamp by Reservation.timestamp
    val cancelHash by Reservation.cancelHash
}
