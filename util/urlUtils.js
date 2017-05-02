var config = require('../config/config');
var path = require('path');

module.exports = {
 
    getAbsoluteTemplatePath : function(file){
        return path.join(config.email.template.path, file);
    }
}
