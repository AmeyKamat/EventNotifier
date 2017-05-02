var eventDao = require("../dao/eventDAO");
var dtUtils = require("../util/dataTransformationUtils");

module.exports = {

    getEventsByDateAndProfiles : function(date, profiles){
 		var events = eventDao.getEventsByDateAndProfiles(date, profiles);

 		for(var i=0; i<events.length; i++){
 			events[i].yearsPassed = dtUtils.getNumberOfYearsFromPastYear(events[i].year);
 		}

 		return events;
    }
}