var path = require("path");
var fs = require("fs");

module.exports = function(app){
    
    app.get("/api/friends", function(req,res){
        res.sendFile(path.join(__dirname, "../data/friends.js"))

});
    
    app.post("/api/friends", function(req, res){
        fs.readFile("./app/data/friends.js", function(err, data){
        
            //   getting current users info and scores
            var myData = req.body;
            var myScore = myData["scores[]"];
            console.log(myScore);

            // get data from friends.js and put in array 
            
            var friendsArray = JSON.parse(data);
            
            // calculating compatibility with each friend
            var lowest = 100;
            var friendName = "";
            var image = "";
            
            friendsArray.forEach(function(friend){
                var friendScore = friend["scores[]"]
                var totalDifference = 0;
                for(var i = 0; i < myScore.length; i++){
                    var difference = Math.abs( myScore[i] - friendScore[i]);
                    totalDifference += difference;
                    
                };

                if (totalDifference < lowest){
                    lowest=totalDifference;
                    friendName = friend.name;
                    image = friend.photo;
                };


            });


            // adding current users data to array
            friendsArray.push(req.body);
            // writing new data to friends.js
            fs.writeFile("./app/data/friends.js", JSON.stringify(friendsArray),function(err, data){
                    console.log("writing to file");

            });
            // send back results
            res.send({
                name: friendName, 
                photo: image
            });

        });

            


    });
    
}
