

// Export mail connection configuration
module.exports = {
    type: process.env.DATABASE_TYPE,
    url: process.env.DATABASE_URL,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: false,
    entities: [
        "api/entity/*.js"
    ]
}