var fs = require("fs");

module.exports = {
 
    getAllSubscribers : function(){
        var content = fs.readFileSync("./data/subscribers.json");
 		var subscribers = JSON.parse(content);
 		return subscribers;
    }
}