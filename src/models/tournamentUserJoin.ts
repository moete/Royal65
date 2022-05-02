import mongoose = require("mongoose");

const TournamentUserJoin = mongoose.model(
    "TournamentUserJoin",
    new mongoose.Schema(
        {
            tournament: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tournament",
                required: true,
            },
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            score: { type: Number, requied: true, default: 0 },
            joining_order: { type: Number, requied: true },
            played_rounds: { type: Number, requied: true, default: 0 },
            eligible_rounds_count: { type: Number, requied: true}
        },
        { timestamps: true }
    )
);
module.exports = TournamentUserJoin;
