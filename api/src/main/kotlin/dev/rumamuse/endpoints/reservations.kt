package dev.rumamuse.endpoints

import dev.rumamuse.getValue
import dev.rumamuse.payload.ReservationData
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Routing.reservations() {
    val prefix = "/reservations"

    post("$prefix/new") {
        val data = call.receive<ReservationData>()

        // TODO: Save new data to the database when it is implemented.

        call.respond(HttpStatusCode.NotImplemented, "Not implemented.")
    }

    delete("$prefix/{hash}") {
        val hash by call.parameters

        // TODO: Delete the correct entry from the database when it is implemented.

        call.respond(HttpStatusCode.NotImplemented, "Not implemented.")
    }
}
