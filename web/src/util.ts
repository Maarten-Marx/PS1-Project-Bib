function capitalize(s: String): String {
    if (s.length == 0) return s
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export {
    capitalize
}