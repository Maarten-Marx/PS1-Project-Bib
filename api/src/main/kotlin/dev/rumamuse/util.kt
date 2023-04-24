package dev.rumamuse

import io.ktor.http.*
import kotlin.reflect.KProperty

/**
 * For using delegation on parameters
 */
operator fun Parameters.getValue(thisRef: Any?, property: KProperty<*>): String? {
    return this[property.name]
}
