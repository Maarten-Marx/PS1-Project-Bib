package dev.rumamuse.endpoints

import dev.rumamuse.getValue
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter

fun Routing.week() {
    val prefix = "/week"

    get("$prefix/{day}") {
        val day by call.parameters

        val date = try {
            LocalDate.parse(day, DateTimeFormatter.ofPattern("dd-MM-yyyy"))
        } catch (e: Exception) {
            return@get call.respond(HttpStatusCode.BadRequest, "Day could not be parsed, use format DD-MM-YYYY.")
        }

        val dayIdx = date.dayOfWeek.value - 1L
        val monday = date.minusDays(dayIdx)

        // TODO: Get required data from the database when it is implemented.

        call.respond(HttpStatusCode.NotImplemented, "Not implemented.")
    }
}
