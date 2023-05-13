package dev.rumamuse.endpoints

import dev.rumamuse.getValue
import dev.rumamuse.parseOrNull
import dev.rumamuse.payload.TimeslotData
import dev.rumamuse.payload.TimeslotsResponse
import dev.rumamuse.schema.ReservationTimeslot
import dev.rumamuse.schema.Timeslot
import dev.rumamuse.schema.TimeslotEntry
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.Count
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import kotlinx.datetime.LocalDate
import kotlinx.datetime.toJavaLocalDate
import kotlinx.datetime.toKotlinInstant

fun Routing.timeslots() {
    val prefix = "/timeslots"

    options("$prefix/{day}") {
        call.respond(HttpStatusCode.OK)
    }

    get("$prefix/{day}") {
        val day by call.parameters

        val date = LocalDate.parseOrNull(day) ?: return@get call.respond(
            HttpStatusCode.BadRequest,
            "No day with format YYYY-MM-DD was provided."
        )

        val timeslotPairs = transaction {
            Timeslot
                .leftJoin(ReservationTimeslot)
                .slice(Timeslot.columns + Count(ReservationTimeslot.id))
                .select { Timeslot.date eq date.toJavaLocalDate() }
                .groupBy(Timeslot.id)
                .map {
                    TimeslotEntry.wrapRow(it) to it[Timeslot.numberOfSeats] - it[Count(ReservationTimeslot.id)].toInt()
                }.ifEmpty {
                    Timeslot.insertForDay(date).map {
                        TimeslotEntry.wrapRow(it) to it[Timeslot.numberOfSeats]
                    }
                }
        }

        val res = TimeslotsResponse(date, timeslotPairs.map {
            val (ts, availableSeats) = it
            TimeslotData(
                ts.id.value,
                ts.startTime.toKotlinInstant(),
                ts.endTime.toKotlinInstant(),
                availableSeats
            )
        })

        call.respond(res)
    }
}