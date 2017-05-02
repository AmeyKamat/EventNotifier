var moment = require('moment');
moment().format();

module.exports = {
 
    getNumberOfYearsFromPastYear : function(pastYear){
        var today = moment();
        if(today.year() >= pastYear){
        	return today.year() - pastYear
    	}
    	return null;
		
    }
}
