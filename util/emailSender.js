var nodemailer = require('nodemailer');
var config = require('../config/config');
var mailgun = require('nodemailer-mailgun-transport');

var authentication = {
    auth: {
        api_key: config.email.api.key,
        domain: config.email.api.domain
    }
};
var transporter = nodemailer.createTransport(mailgun(authentication));

module.exports = {
 
    sendEmail : function(toAddress, content){

		var mailOptions = {
    		from: config.email.fromAddress,
    		to: toAddress,
    		subject: config.email.subject,
    		html: content
		};

		console.log("Message sent to " + toAddress);

		transporter.sendMail(mailOptions, function(error, info){
    		if(error){
        		return console.log(error);
    		}
    		console.log('Message sent: ' + info);
		});
    }
}
