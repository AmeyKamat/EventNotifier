var fs = require("fs");

var pathUtils = require('../util/pathUtils');
var config = require('../util/configFactory');

var data = fs.readFileSync(pathUtils.getAbsoluteDataPath(config.data.file.subscribers));
var subscribers = JSON.parse(data);

module.exports = {
 
    getAllSubscribers : function(){
 		return subscribers;
    }
}