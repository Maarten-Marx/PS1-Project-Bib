package dev.rumamuse.schema

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.timestamp

object Schedule : IntIdTable("schedule", "schedule_id") {
    val weekDayIndex = integer("week_day_index")
    val openingTime = timestamp("opening_time")
    val closingTime = timestamp("closing_time")
}

data class ScheduleEntry(val key: EntityID<Int>): IntEntity(key) {
    companion object : IntEntityClass<ScheduleEntry>(Schedule)

    val weekDayIndex by Schedule.weekDayIndex
    val openingTime by Schedule.openingTime
    val closingTime by Schedule.closingTime
}
