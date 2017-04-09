var fs = require("fs");

var content = fs.readFileSync("./data/subscribers.json");
var subscribers = JSON.parse(content);

module.exports = {
 
    getAllSubscribers : function(){
 		return subscribers;
    }
}