var nodemailer = require('nodemailer');
var config = require('./configFactory');
var mailgun = require('nodemailer-mailgun-transport');

var authentication = {
    auth: {
        api_key: config.vendor.mailgun.apikey,
        domain: config.vendor.mailgun.domain
    }
};

var transporter = nodemailer.createTransport(mailgun(authentication));

module.exports = {
 
    sendEmail : function(toAddress, toSubject, content){

		var mailOptions = {
    		from: config.mail.from.address,
    		to: toAddress,
    		subject: toSubject,
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
