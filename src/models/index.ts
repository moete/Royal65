import mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db:any = {};

db.mongoose = mongoose;
db.user = require("./User");
db.role = require("./Role");
db.match = require("./match");
db.score = require("./score");
db.mails = require("./mails");
db.recla = require("./Recla");
db.gameTransaction = require("./gameTransaction");
db.emailVerification = require("./emailVerification");
db.tournament = require("./tournament");
db.tournamentUserJoin = require("./tournamentUserJoin");
db.ROLES = ["user", "admin"];
db.transaction = require("./Transaction")
db.reference = require("./Reference")
db.tournamenttransaction = require('./tournamenttransaction');
db.coins = require("./coins");
db.withdrawal = require("./Withdrawal");
db.Forgotpassword = require("./forgotpassword");
module.exports = db;
