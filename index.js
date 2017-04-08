var reminderService = require("./service/reminderService");

console.log("birtday reminder");
reminderService.remindSubscribers(new Date());