package dev.rumamuse.schema

import dev.rumamuse.data.DayInfo
import dev.rumamuse.tz
import kotlinx.datetime.*
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

    fun insertForWeek(monday: LocalDate): List<DayInfo> {
        val sunday = monday.plus(6, DateTimeUnit.DAY)

        val defaults = Schedule.selectAll().map(ScheduleEntry::wrapRow).associateBy { it.weekDayIndex }

        val exceptions = ScheduleException.select {
            (ScheduleException.date greaterEq monday.toJavaLocalDate()) and (ScheduleException.date lessEq sunday.toJavaLocalDate())
        }.map(ScheduleExceptionEntry::wrapRow).associateBy { it.date.toKotlinLocalDate() }

        val schedule = (0..6).map { dayOffset ->
            val day = monday.plus(dayOffset, DateTimeUnit.DAY)
            exceptions[day]?.toDayInfo() ?: defaults[dayOffset]?.toDayInfo(day)
        }

        schedule.forEach { dayInfo ->
            insert(dayInfo ?: return@forEach)
        }

        return schedule.filterNotNull()
    }

    fun insertForDay(day: LocalDate): List<ResultRow> {
        val default = Schedule.select {
            Schedule.weekDayIndex eq day.dayOfWeek.value
        }.map(ScheduleEntry::wrapRow).firstOrNull()

        val exception = ScheduleException.select {
            ScheduleException.date eq day.toJavaLocalDate()
        }.map(ScheduleExceptionEntry::wrapRow).firstOrNull()

        val dayInfo = exception?.toDayInfo() ?: default?.toDayInfo(day) ?: return listOf()

        return insert(dayInfo)
    }


    private fun insert(dayInfo: DayInfo): List<ResultRow> {
        if (dayInfo.openingTime == null || dayInfo.closingTime == null) return listOf()

        val slots = mutableListOf<Pair<LocalTime, LocalTime>>()
        var start = dayInfo.openingTime.atDate(dayInfo.date)
        while (start.time < dayInfo.closingTime) {
            val next = (start.toInstant(tz) + 15.minutes).toLocalDateTime(tz)
            slots.add(start.time to next.time)
            start = next
        }

        return Timeslot.batchInsert(slots) {
            this[date] = dayInfo.date.toJavaLocalDate()
            this[startTime] = it.first.atDate(dayInfo.date).toInstant(tz).toJavaInstant()
            this[endTime] = it.second.atDate(dayInfo.date).toInstant(tz).toJavaInstant()
            this[numberOfSeats] = dayInfo.numberOfSeats ?: 0
        }
    }
}

data class TimeslotEntry(val key: EntityID<Int>) : IntEntity(key) {
    companion object : IntEntityClass<TimeslotEntry>(Timeslot)

    val startTime by Timeslot.startTime
    val endTime by Timeslot.endTime
    val date by Timeslot.date
    val numberOfSeats by Timeslot.numberOfSeats
}
