
const path = require("path");
const { friends } = require("../data/friends.js");
const { friendObjects } = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", (req, res) => {
        res.json(friendObjects);
    });

    app.post("/api/friends", function (req, res) {
        console.log("req.body:", req.body);
        friends.push(req.body);
        res.json('Thanks for the info. I did nothing with it. Sincerely, -the server.');
    });
};