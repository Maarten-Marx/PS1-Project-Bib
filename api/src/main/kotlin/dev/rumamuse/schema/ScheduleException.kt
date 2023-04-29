package dev.rumamuse.schema

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.timestamp

object ScheduleException : IntIdTable("schedule_exception") {
    val date = date("date")
    val openingTime = timestamp("opening_time")
    val closingTime = timestamp("closing_time")
}

data class ScheduleExceptionEntry(val key: EntityID<Int>) : IntEntity(key) {
    companion object : IntEntityClass<ScheduleExceptionEntry>(ScheduleException)

    val date by ScheduleException.date
    val openingTime by ScheduleException.openingTime
    val closingTime by ScheduleException.closingTime
}
