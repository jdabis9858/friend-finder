var friends = require("../data/friends.js")


module.exports = function(app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------
  
  
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });
  
    // If no matching route is found default to home
    app.post("/api/friends", function(req, res) {
        console.log(req.body)
        var userData = req.body
        var bestMatch = {
            name: "",
            photo: "",
            score: 1000,
        }

        for (var i = 0;i < friends.length; i++) {
            var currentFriend = friends[i]
            var difference = 0

            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j]
                var userDataScore = userData.scores[j]

                difference += Math.abs(currentFriendScore - userDataScore)
            }

            if (difference <= bestMatch.score) {
                bestMatch.name = currentFriend.name
                bestMatch.photo = currentFriend.photo
                bestMatch.score = difference
            }

        }

        friends.push(bestMatch)
        res.json(bestMatch)

    });
  };
  