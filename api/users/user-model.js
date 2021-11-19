const db = require("../../data/db-config");





function getAll() {
    return db("users");
}


function findById(id) {
    return db("users")
        .where({ id })
        .first();
}




exports = module.exports = {
    getAll,
    findById
}