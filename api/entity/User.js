const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        email: {
            type: "varchar",
            notEmpty: true,
            unique: true
        },
        username: {
            type: "varchar",
            default: 'null'
        },
        password: {
            type: "varchar",
            default: 'null'
        },
        verified: {
            type: "boolean",
            default: false
        },
        role: {
            type: "varchar",
            default: JSON.stringify([
                'READER'
            ])
        },
        lastLogin: {
            type: "timestamp",
            notEmpty: true
        },
        createdAt: {
            type: "timestamp",
            notEmpty: true
        }
    }
});