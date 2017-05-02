var handlebars = require('handlebars');

module.exports = {
 
    registerListBuilder: function(handlebarsRef){
        handlebarsRef.registerHelper('list', buildList);
    },

    registerOrdinalBuilder: function(handlebarsRef){
        handlebarsRef.registerHelper('ordinal', buildOrdinal);
    }
}

function buildList(array) {
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
}

function buildOrdinal(number) {
    var suffix = "th";

    if(number%10 == 1 && number != 11){
        suffix = "st";
    }
    else if(number%10 == 2 && number != 12){
        suffix = "nd";
    }
    else if(number%10 == 3 && number != 13){
        suffix = "rd";
    }

    var ordinal = handlebars.escapeExpression(number.toString()) + suffix;
    console.log(ordinal);
    return new handlebars.SafeString(ordinal);
}