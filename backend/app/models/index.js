const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.fields = require("./fieldModel")(mongoose);
db.users = require("./userModel")(mongoose);
db.campaigns = require("./campaignModel")(mongoose);
db.adsets = require("./adsetModel")(mongoose);
db.ads = require("./adModel")(mongoose);

module.exports = db;
