const db = require("../../data/db-config");


function getAll() {
    return db("users");
}

exports = module.exports = {
    getAll
}