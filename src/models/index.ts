import mongoose from 'mongoose'
mongoose.Promise = global.Promise;

const db:any = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");

db.ROLES = ["user", "admin"];

module.exports = db;