const getBaseUrl = (req) => {
    const protocol = req.headers['x-forwarded-proto'] ?? req.protocol
    const host = req.headers.host
    return `${protocol}://${host}`
}

export default getBaseUrl