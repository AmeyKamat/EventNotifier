var handlebars = require('handlebars');
var fs = require('fs');

var templateHelpers = require("../util/templateHelpers")
templateHelpers.registerListBuilder(handlebars);
templateHelpers.registerOrdinalBuilder(handlebars);

module.exports = {
 
    generateEmailContent : function(subscriber, events, templateFile){
    	var context = buildContext(subscriber, events);
    	console.log(context);
    	var content = fs.readFileSync(templateFile, "utf8");
        var template = handlebars.compile(content);
        return template(context);
    }
}

function buildContext(subscriber, events){
	var context = {};
	context.events = events;
	context.subscriber = subscriber;
	return context;
}