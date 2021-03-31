

// Export mail connection configuration
let databaseConfig = {
    type: process.env.DATABASE_DIALECT,
    url: process.env.DATABASE_URL,
    // rejectUnauthorized: false
    synchronize: process.env.NODE_ENV !== 'production',
    logging: false,
    entities: [
        "api/entity/*.js"
    ]
}

if(process.env.NODE_ENV === 'production') {
    databaseConfig.ssl = {
        rejectUnauthorized: false
    }
}

module.exports = databaseConfig
