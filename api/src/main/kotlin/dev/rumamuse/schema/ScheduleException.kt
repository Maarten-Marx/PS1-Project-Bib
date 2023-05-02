package dev.rumamuse.schema

import dev.rumamuse.data.DayInfo
import kotlinx.datetime.*
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.time

object ScheduleException : IntIdTable("schedule_exception", "schedule_exception_id") {
    val date = date("date")
    val numberOfSeats = integer("number_of_seats")
    val openingTime = time("opening_time").nullable()
    val closingTime = time("closing_time").nullable()
}

data class ScheduleExceptionEntry(val key: EntityID<Int>) : IntEntity(key) {
    companion object : IntEntityClass<ScheduleExceptionEntry>(ScheduleException)

    val date by ScheduleException.date
    val numberOfSeats by ScheduleException.numberOfSeats
    val openingTime by ScheduleException.openingTime
    val closingTime by ScheduleException.closingTime

    fun toDayInfo() = DayInfo(
        date.toKotlinLocalDate(),
        openingTime?.toKotlinLocalTime(),
        closingTime?.toKotlinLocalTime(),
        numberOfSeats
    )
}
