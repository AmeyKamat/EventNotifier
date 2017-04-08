module.exports = {
 
    classifySubscribersByProfile : function(subscribers){
        var classifiedSubscribers = {};
		for(var i=0; i<subscribers.length; i++){
			var subscriber = subscribers[i];
			for(var j=0; j<subscriber.profiles.length; j++){
				var profile = subscriber.profiles[j];
				
				if(classifiedSubscribers[profile] == undefined){
					classifiedSubscribers[profile] = [];
				}
				classifiedSubscribers[profile].push(subscriber);
			}
		}
		return classifiedSubscribers;
    },

    classifyEventsByProfile : function(events){
        var classifiedEvents = {};
		for(var i=0; i<events.length; i++){
			var event = events[i];
			for(var j=0; j<event.profiles.length; j++){
				var profile = event.profiles[j];
				
				if(classifiedEvents[profile] == undefined){
					classifiedEvents[profile] = [];
				}
				classifiedEvents[profile].push(event);
			}
		}
		return classifiedEvents;
    }
}
