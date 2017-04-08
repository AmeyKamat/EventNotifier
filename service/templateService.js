var handlebars = require('handlebars');
var fs = require('fs');

module.exports = {
 
    generateEmailContent : function(subscriber, events){
    	var context = buildContext(subscriber, events);
    	console.log(context);
    	var content = fs.readFileSync("./templates/template.html", "utf8");
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

handlebars.registerHelper('list', function(array) {
	var list = "";
	if(array.length == 1){
		list = handlebars.escapeExpression(array[0]);
	}
	else{
		list = handlebars.escapeExpression(array[array.length-1]);
		list = " & " + list;

		for(var i=array.length-2; i>=1; i--){
			list = handlebars.escapeExpression(array[i]) + list;
			list = ", " + list;
		}

		list = handlebars.escapeExpression(array[0]) + list;
	}
	
  	return new handlebars.SafeString(list);
});