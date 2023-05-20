import dotenv from 'dotenv'
dotenv.config()

function capitalize(s: String): String {
    if (s.length == 0) return s
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const apiHost = process.env['REACT_APP_API_HOST'] || (() => {
    throw 'Missing environment variable: REACT_APP_API_HOST'
})()

export {
    capitalize,
    apiHost
}