package dev.rumamuse

import dev.rumamuse.endpoints.reservations
import dev.rumamuse.endpoints.timeslots
import dev.rumamuse.endpoints.week
import io.ktor.server.routing.*
import io.ktor.server.application.*

fun Application.configureRoutes() {
    routing {
        reservations()
        week()
        timeslots()
    }
}
