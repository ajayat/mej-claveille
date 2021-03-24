const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Article",
    tableName: "articles",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar",
            notEmpty: true,
            unique: false
        },
        content: {
            type: "longtext"
        },
        createdAt: {
            type: "datetime",
            notEmpty: true
        },
        updatedAt: {
            type: "datetime",
            notEmpty: true
        }
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            cascade: true,
            eager: true
        }
    }
});