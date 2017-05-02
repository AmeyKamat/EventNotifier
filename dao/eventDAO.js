var fs = require("fs");

var content = fs.readFileSync("./data/events.json");
var events = JSON.parse(content);

module.exports = {
 	getEventsByDateAndProfiles : function(date, profiles){
 		var selectedEvents = [];
 		for(var i=0; i<events.length;i++){
 			if(date.date() == events[i].date 
 				&& date.month()+1 == events[i].month 
 				&& intersect(profiles, events[i].profiles).length > 0){
 					selectedEvents.push(events[i]);
 			}
 		}

 		return selectedEvents;
    }
}

function intersect(array1, array2) {
    var temp;
    if (array2.length > array1.length) t = array2, array2 = array1, array1 = t;
    return array1.filter(function (e) {
    	return array2.indexOf(e) > -1;
	});

}