var templateService = require('./templateService');
var emailSender = require('../util/emailSender');

var config = require('../config/config');

module.exports = {
 
    notifySubscriberOfPresentEvents : function(subscriber, events){
        var emailContent = templateService.generateEmailContent(subscriber, events, config.email.template.presentevents);
        emailSender.sendEmail(subscriber.email, emailContent);
    },

    notifySubscriberOfFutureEvents : function(subscriber, events){
        var emailContent = templateService.generateEmailContent(subscriber, events, config.email.template.futureevents);
        emailSender.sendEmail(subscriber.email, emailContent);
    }
}
