var nodemailer = require('nodemailer');
var config = require('../config/config');
var mailgun = require('nodemailer-mailgun-transport');

module.exports = {
 
    sendEmail : function(toAddress, content){
    	var authentication = {
    		auth: {
        		api_key: config.emailPreferences.apiKey,
        		domain: config.emailPreferences.domain
    		}
    	};
        var transporter = nodemailer.createTransport(mailgun(authentication));

		var mailOptions = {
    		from: config.emailPreferences.fromAddress,
    		to: toAddress,
    		subject: config.emailPreferences.subject,
    		html: content
		};

		console.log(mailOptions);

		transporter.sendMail(mailOptions, function(error, info){
    		if(error){
        		return console.log(error);
    		}
    		console.log('Message sent: ' + info.response);
		});
    }
}
