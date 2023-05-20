package dev.rumamuse

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import org.jetbrains.exposed.sql.Database

val webHost = System.getenv("web-host") ?: throw Exception("Missing environment variable: web-host")

fun main() {
    val dbUser = System.getenv("db-user") ?: throw Exception("Missing environment variable: db-user")
    val dbPass = System.getenv("db-pass") ?: throw Exception("Missing environment variable: db-pass")
    Database.connect("jdbc:mysql://localhost:3306/library", user = dbUser, password = dbPass)

    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    install(CORS) {
        allowHost(webHost)

        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Delete)

        allowHeader(HttpHeaders.Authorization)
        allowNonSimpleContentTypes = true
        allowSameOrigin = true
    }

    install(ContentNegotiation) {
        json()
    }

    configureRoutes()
}
