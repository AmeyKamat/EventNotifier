var notificationService = require("./notificationService");

var subscriberDao = require("../dao/subscriberDAO");
var eventDao = require("../dao/eventDAO");

var classificationUtils = require("../util/classificationUtils");

module.exports = {
 
    remindSubscribers : function(date){
        console.log("today's date: " + date.getDate() + "/" + date.getMonth()+1);
        
        var events = eventDao.getEventsByDate(date);
        var subscribers = subscriberDao.getAllSubscribers();

        var classifiedEvents = classificationUtils.classifyEventsByProfile(events);
        var classifiedSubscribers = classificationUtils.classifySubscribersByProfile(subscribers);
        
        for(var profile in classifiedEvents){
        	var requiredEvents = classifiedEvents[profile];
        	var requiredSubscribers = classifiedSubscribers[profile];
        	for(var i=0; i<requiredSubscribers.length; i++){
        		notificationService.notifySubscriber(requiredSubscribers[i], requiredEvents);
        	}
        }
    }


}
