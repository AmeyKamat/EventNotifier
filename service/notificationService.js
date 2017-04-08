var templateService = require('./templateService');
var emailSender = require('../util/emailSender');

var config = require('../config/config');

module.exports = {
 
    notifySubscriber : function(subscriber, events){
        var emailContent = templateService.generateEmailContent(subscriber, events);
        emailSender.sendEmail(subscriber.email, emailContent);
    }
}
