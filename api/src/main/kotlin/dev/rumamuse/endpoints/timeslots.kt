package dev.rumamuse.endpoints

import dev.rumamuse.getValue
import dev.rumamuse.parseOrNull
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.datetime.LocalDate

fun Routing.timeslots() {
    val prefix = "/timeslots"

    get("$prefix/{day}") {
        val day by call.parameters

        val date = LocalDate.parseOrNull(day)
            ?: return@get call.respond(HttpStatusCode.BadRequest, "No day with format YYYY-MM-DD was provided.")

        // TODO: Get required data from the database when it is implemented.

        call.respond(HttpStatusCode.NotImplemented, "Not implemented.")
    }
}