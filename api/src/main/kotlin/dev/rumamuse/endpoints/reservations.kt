package dev.rumamuse.endpoints

import dev.rumamuse.getValue
import dev.rumamuse.payload.ReservationData
import dev.rumamuse.schema.Reservation
import dev.rumamuse.schema.ReservationTimeslot
import dev.rumamuse.sendMail
import dev.rumamuse.sha256
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.datetime.Clock
import kotlinx.datetime.toJavaInstant
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.batchInsert
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insertAndGetId
import org.jetbrains.exposed.sql.transactions.transaction

fun Routing.reservations() {
    val prefix = "/reservations"

    val emailAddr = System.getenv("email-addr")
    val emailPass = System.getenv("email-pass")

    post("$prefix/new") {
        val data = call.receive<ReservationData>()
        val hash = sha256(data)

        val success = transaction {
            val reservationId = Reservation.insertAndGetId {
                it[firstName] = data.firstName
                it[name] = data.lastName
                it[email] = data.email
                it[timestamp] = Clock.System.now().toJavaInstant()
                it[cancelHash] = hash
            }

            ReservationTimeslot.batchInsert(data.timeslotIDs) {
                this[ReservationTimeslot.reservationId] = reservationId
                this[ReservationTimeslot.timeslotId] = it
            }.isNotEmpty()
        }

        if (success) sendMail(
            "Your reservation has been made!",
            "Hello ${data.firstName}!\n" +
                    "We've successfully stored your reservation.\n" +
                    "If you would like to cancel this reservation, click <a href=\"http://127.0.0.1/cancel/${hash}\">here</a>.",
            emailAddr,
            data.email,
            emailPass
        )

        call.respond(if (success) HttpStatusCode.OK else HttpStatusCode.NotModified)
    }

    delete("$prefix/{hash}") {
        val hash by call.parameters

        val success = transaction {
            Reservation.deleteWhere {
                cancelHash eq (hash ?: "")
            } > 0
        }

        call.respond(if (success) HttpStatusCode.OK else HttpStatusCode.NotModified)
    }
}
