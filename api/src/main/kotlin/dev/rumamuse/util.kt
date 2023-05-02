package dev.rumamuse

import io.ktor.http.*
import kotlin.reflect.KProperty
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone

val tz = TimeZone.of("Europe/Brussels")

/**
 * For using delegation on parameters
 */
operator fun Parameters.getValue(thisRef: Any?, property: KProperty<*>): String? {
    return this[property.name]
}

fun LocalDate.Companion.parseOrNull(string: String?): LocalDate? {
    if (string == null) return null

    return try {
        parse(string)
    } catch (e: Exception) {
        null
    }
}
