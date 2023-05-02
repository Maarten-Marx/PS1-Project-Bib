package dev.rumamuse.schema

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.timestamp
import kotlin.time.Duration.Companion.minutes

object Timeslot : IntIdTable("timeslot", "timeslot_id") {
    val startTime = timestamp("start_time")
    val endTime = timestamp("end_time")
    val date = date("date")
    val numberOfSeats = integer("number_of_seats")
}

data class TimeslotEntry(val key: EntityID<Int>) : IntEntity(key) {
    companion object : IntEntityClass<TimeslotEntry>(Timeslot)

    val startTime by Timeslot.startTime
    val endTime by Timeslot.endTime
    val date by Timeslot.date
    val numberOfSeats by Timeslot.numberOfSeats
}
