import mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db:any = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.match = require("./match");
db.score = require("./score");
db.mails = require("./mails");
db.gameTransaction = require("./gameTransaction");
db.emailVerification = require("./emailVerification");

db.ROLES = ["user", "admin"];

module.exports = db;
db.transaction = require("./transaction")
db.reference = require("./Reference")
db.ROLES = ["user", "admin"];

module.exports = db;
