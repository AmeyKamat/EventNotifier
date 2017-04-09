var moment = require('moment');
moment().format();

var notificationService = require("./notificationService");

var subscriberDao = require("../dao/subscriberDAO");
var eventDao = require("../dao/eventDAO");

var classificationUtils = require("../util/classificationUtils");

module.exports = {
 
    remindSubscribers : function(){
        var subscribers = subscriberDao.getAllSubscribers();
        for(var i=0; i<subscribers.length; i++){
            notifyPresentEvents(subscribers[i]);
            if(subscribers[i].priorReminderPeriod != undefined){
                notifyFutureEvents(subscribers[i]);
            }
        }
    }
}

function notifyPresentEvents(subscriber){
    var today = moment();
    console.log("today's date: " + today.date() + "/" + today.month());
    var profiles = subscriber.profiles;
    var todaysEvents = eventDao.getEventsByDateAndProfiles(today, profiles);
    if(todaysEvents.length>0){
        notificationService.notifySubscriberOfPresentEvents(subscriber, todaysEvents);
    }
}

function notifyFutureEvents(subscriber){
    var priorReminderPeriod = subscriber.priorReminderPeriod;
    var profiles = subscriber.profiles;
            
    var futureDate = moment().add(priorReminderPeriod, "days");
    var futureEvents = eventDao.getEventsByDateAndProfiles(futureDate, profiles);
    if(futureEvents.length>0){
        notificationService.notifySubscriberOfFutureEvents(subscriber, futureEvents);
    }
}
