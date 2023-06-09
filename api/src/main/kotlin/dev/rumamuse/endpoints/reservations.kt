package dev.rumamuse.endpoints

import dev.rumamuse.cancelUrl
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
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.batchInsert
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insertAndGetId
import org.jetbrains.exposed.sql.transactions.transaction
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.datetime.Clock
import kotlinx.datetime.toJavaInstant

fun Routing.reservations() {
    val prefix = "/reservations"

    val emailAddr = System.getenv("email-addr") ?: throw Exception("Missing environment variable: email-addr")
    val emailPass = System.getenv("email-pass") ?: throw Exception("Missing environment variable: email-pass")

    options("$prefix/new") {
        call.respond(HttpStatusCode.OK)
    }

    post("$prefix/new") {
        val data = call.receive<ReservationData>()
        val hash = sha256(data)

        if (data.timeslotIDs.isEmpty()) return@post call.respond(HttpStatusCode.BadRequest)

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

        runBlocking {
            if (success) launch {
                sendMail(
                    "Uw reservatie is geplaatst!",
                    "Dag ${data.firstName}!\n" +
                            "We hebben uw reservatie goed ontvangen.\n" +
                            "Als u wenst deze reservatie te annuleren, klik dan <a href=\"${cancelUrl(hash)}\">hier</a>.",
                    emailAddr,
                    data.email,
                    emailPass
                )
            }

            call.respond(if (success) HttpStatusCode.OK else HttpStatusCode.NotModified)
        }
    }

    options("$prefix/{hash}") {
        call.respond(HttpStatusCode.OK)
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
