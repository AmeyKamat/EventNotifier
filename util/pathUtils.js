var config = require('./configFactory');
var path = require('path');

module.exports = {
 
    getAbsoluteTemplatePath : function(file){
        return path.join(config.template.location, file);
    },

    getAbsoluteDataPath : function(file){
        return path.join(config.data.location, file);
    } 
};
