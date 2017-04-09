var propertiesReader = require('properties-reader')('../cust/eventNotifier.properties');

module.exports = {
	email:{
		fromAddress: propertiesReader.get('email.fromAddress'),
		fromName: propertiesReader.get('email.fromName'),
		subject: propertiesReader.get('email.subject'),
		api: {
			domain: propertiesReader.get('email.api.domain'),
			key: propertiesReader.get('email.api.key') 
		},
		template: {
			presentevents: propertiesReader.get('email.template.presentevents'),
			futureevents: propertiesReader.get('email.template.futureevents') 
		}
	}
}