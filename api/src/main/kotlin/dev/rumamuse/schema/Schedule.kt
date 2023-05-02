package dev.rumamuse.schema

import dev.rumamuse.data.DayInfo
import kotlinx.datetime.*
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.time

object Schedule : IntIdTable("schedule", "schedule_id") {
    val weekDayIndex = integer("week_day_index")
    val numberOfSeats = integer("number_of_seats")
    val openingTime = time("opening_time").nullable()
    val closingTime = time("closing_time").nullable()
}

data class ScheduleEntry(val key: EntityID<Int>) : IntEntity(key) {
    companion object : IntEntityClass<ScheduleEntry>(Schedule)

    val weekDayIndex by Schedule.weekDayIndex
    val numberOfSeats by Schedule.numberOfSeats
    val openingTime by Schedule.openingTime
    val closingTime by Schedule.closingTime
}
