var subscriberDao = require("../dao/subscriberDAO");

module.exports = {
    getAllSubscribers : function(){
 		return subscriberDao.getAllSubscribers();
    }
}