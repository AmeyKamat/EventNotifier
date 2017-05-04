var templateService = require('./templateService');
var emailSender = require('../util/emailSender');

var config = require('../util/configFactory');

module.exports = {
 
    notifySubscriberOfPresentEvents : function(subscriber, events){
        var emailContent = templateService.generateEmailContent(subscriber, events, config.template.event.present);
        emailSender.sendEmail(subscriber.email, config.mail.subject.event.present, emailContent);
    },

    notifySubscriberOfFutureEvents : function(subscriber, events){
        var emailContent = templateService.generateEmailContent(subscriber, events, config.template.event.future);
        emailSender.sendEmail(subscriber.email, config.mail.subject.event.future, emailContent);
    }
}
