const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'TempCode',
    tableName: 'temp_code',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        key: {
            type: 'varchar',
            notEmpty: true
        },
        createdAt: {
            type: 'datetime',
            notEmpty: true
        }
    },
    relations: {
        user: {
            target: "User",
            type: "one-to-one",
            joinColumn: true,
            cascade: true,
            eager: true
        }
    }

})