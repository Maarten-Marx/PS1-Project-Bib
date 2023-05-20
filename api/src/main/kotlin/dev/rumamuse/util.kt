package dev.rumamuse

import io.ktor.http.*
import kotlin.reflect.KProperty
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import org.apache.commons.mail.DefaultAuthenticator
import org.apache.commons.mail.HtmlEmail
import java.security.MessageDigest

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

fun sha256(data: Any): String {
    val bytes = data.hashCode().toString().toByteArray()
    val md = MessageDigest.getInstance("SHA-256")
    val digested = md.digest(bytes)
    return digested.fold("") { res, byte ->
        res + "%02x".format(byte)
    }
}

fun sendMail(title: String, body: String, from: String, to: String, password: String) {
    val email = HtmlEmail().apply {
        hostName = "smtp.gmail.com"
        setSmtpPort(465)
        setAuthenticator(DefaultAuthenticator(from, password))
        isSSLOnConnect = true
        setFrom(from)
        subject = title
        setMsg("<html><body>$body</body></html>")
        addTo(to)
    }

    email.send()
}

@Suppress("HttpUrlsUsage")
fun cancelUrl(hash: String) = "http://${webHost}/cancel/${hash}"
