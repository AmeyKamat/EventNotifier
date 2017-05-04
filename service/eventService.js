var eventDao = require("../dao/eventDAO");

module.exports = {

    getEventsByDateAndProfiles : function(date, profiles){
 		return eventDao.getEventsByDateAndProfiles(date, profiles);
    }
}