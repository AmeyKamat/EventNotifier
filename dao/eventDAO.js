var fs = require("fs");

module.exports = {
 
    getEventsByDate : function(date){
        var content = fs.readFileSync("./data/events.json");
 		var events = JSON.parse(content);
 		var selectedEvents = [];
 		for(var i=0; i<events.length;i++){
 			if(date.getDate() == events[i].date && date.getMonth()+1 == events[i].month){
 				selectedEvents.push(events[i]);
 			}
 		}

 		return selectedEvents;
    }
}