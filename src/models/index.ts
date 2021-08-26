import mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db:any = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.game = require("./game");
db.score = require("./score");
db.mails = require("./mails");
db.recla = require("./Recla")
db.emailVerification = require("./emailVerification");
db.tournament = require("./tournament")
db.ROLES = ["user", "admin"];

module.exports = db;
db.transaction = require("./transaction")
db.reference = require("./Reference")
db.ROLES = ["user", "admin"];

module.exports = db;
