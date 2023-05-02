package dev.rumamuse.endpoints

import dev.rumamuse.data.DayInfo
import dev.rumamuse.getValue
import dev.rumamuse.parseOrNull
import dev.rumamuse.payload.DayData
import dev.rumamuse.payload.WeekResponse
import dev.rumamuse.schema.Timeslot
import dev.rumamuse.tz
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.Max
import org.jetbrains.exposed.sql.Min
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import kotlinx.datetime.*

internal val earliestTimeslot = Min(Timeslot.startTime, Timeslot.startTime.columnType)
internal val latestTimeslot = Max(Timeslot.endTime, Timeslot.endTime.columnType)

/**
 * **Known issue:**
 * When the timeslots of any weekday have been requested through `/timeslots/{day}`,
 * the first query will not be empty, and thus the timeslots for the rest of the weekdays will not be added.
 *
 * No obvious solution comes to mind as of now.
 */
fun Routing.week() {
    val prefix = "/week"

    get("$prefix/{day}") {
        val day by call.parameters

        val date = LocalDate.parseOrNull(day) ?: return@get call.respond(
            HttpStatusCode.BadRequest, "No day with format YYYY-MM-DD was provided."
        )

        val monday = date.minus(date.dayOfWeek.value - 1, DateTimeUnit.DAY)
        val sunday = monday.plus(6, DateTimeUnit.DAY)

        val dayInfo = transaction {
            Timeslot.slice(Timeslot.date, earliestTimeslot, latestTimeslot).select {
                (Timeslot.date greaterEq monday.toJavaLocalDate()) and (Timeslot.date lessEq sunday.toJavaLocalDate())
            }.groupBy(Timeslot.date).map {
                DayInfo(
                    it[Timeslot.date].toKotlinLocalDate(),
                    it[earliestTimeslot]?.toKotlinInstant()?.toLocalDateTime(tz)?.time,
                    it[latestTimeslot]?.toKotlinInstant()?.toLocalDateTime(tz)?.time,
                    null
                )
            }.ifEmpty {
                Timeslot.insertForWeek(monday)
            }
        }.associateBy { it.date }

        val res = WeekResponse((0..6).map { dayOffset ->
            monday.plus(dayOffset, DateTimeUnit.DAY).let { weekDay ->
                DayData(
                    weekDay,
                    weekDay.dayOfWeek.value - 1,
                    dayInfo[weekDay]?.openingTime,
                    dayInfo[weekDay]?.closingTime
                )
            }
        })

        call.respond(res)
    }
}
