package dev.rumamuse.endpoints

import dev.rumamuse.getValue
import dev.rumamuse.payload.ReservationData
import dev.rumamuse.schema.Reservation
import dev.rumamuse.schema.ReservationTimeslot
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

    post("$prefix/new") {
        val data = call.receive<ReservationData>()

        val success = transaction {
            val reservationId = Reservation.insertAndGetId {
                it[firstName] = data.firstName
                it[name] = data.lastName
                it[email] = data.email
                it[timestamp] = Clock.System.now().toJavaInstant()
                it[cancelHash] = sha256(data)
            }

            ReservationTimeslot.batchInsert(data.timeslotIDs) {
                this[ReservationTimeslot.reservationId] = reservationId
                this[ReservationTimeslot.timeslotId] = it
            }.isNotEmpty()
        }

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
