var configReader = require('properties-reader')('./config/eventnotifier.properties');
var propertiesReader = require('properties-reader')(configReader.get('eventnotifier.config.path'));

module.exports = {
	mail:{
		from: {
			address: propertiesReader.get('eventnotifier.mail.from.address'),	
			name: propertiesReader.get('eventnotifier.mail.from.name')
		},
		subject: {
			event : {
				present: propertiesReader.get('eventnotifier.mail.subject.event.present'),
				future: propertiesReader.get('eventnotifier.mail.subject.event.future')
			}	
		}
	},
	vendor:{
		mailgun: {
			domain: propertiesReader.get('eventnotifier.vendor.mailgun.domain'),
			apikey: propertiesReader.get('eventnotifier.vendor.mailgun.apikey')
		}
	},
	template: {
		location: configReader.get('eventnotifier.template.location'),
		event: {
			present: propertiesReader.get('eventnotifier.template.event.present'),
			future: propertiesReader.get('eventnotifier.template.event.future') 	
		}
	},
	data: {
		location: configReader.get('eventnotifier.data.location'),
		file: {
			events: propertiesReader.get('eventnotifier.data.file.events'),
			subscribers: propertiesReader.get('eventnotifier.data.file.subscribers'),
		}
	}
}