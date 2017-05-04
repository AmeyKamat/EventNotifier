# EventNotifier
Notifies events with prior and same-day reminders to the subscribers.

## How Does It Work?
Event Notifier picks events from data files and sends mails to the subscribers on the data files using highly customizable html templates. Reminders can also be sent in advance.
It uses Mailgun API to send mails and handlebars as a template engine.

## System Requirements
* Linux
* Node (Tested on Node 6.10.2)

## Installation
1. Install ```node``` and ```npm```.
2. Create acount on [Mailgun](https://www.mailgun.com/) and create a domain.
3. In project root folder run ```npm install```.
4. Customize the app through config files. (See [Configurations](#configuration))
5. Add data files at required location. (See [Data Files](#data-files))
6. Add Customized Email Templates at required location. (See [Customizing Templates](#customizing-templates))
7. Do ```cd {project_root}```.
8. Run ```node index.js``` or use cron job to automate the execution of app periodically. (See [Scripting and Automation](Scripting-and-Automation))

## Configuration
Event Notifier is designed to be highly configurable. The app follows two levels of configurations. 
First level of configuration lies within the root folder and it contains absolute paths pointing to the second level of configuration, data location and template location.
This 2-level configuration keeps segregation of properties and deployment in production and development environments.

These configurations are written in ```.properties``` files in ```{property_name}={property_vale}``` format. All properties are ***mandatory***.

### First Level of Configuration
This configuration must lie inside the project root folder in ```{project_root}/config/eventnotifier.properties``` file (Henceforth refered as ```eventnotifier.properties``` file).
Following are the properties one needs to set in this file:

|Property                        |Description                                                                                                                                          |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
|eventnotifier.data.location     |Absolute location of folder with data files                                                                                                          |
|eventnotifier.config.path       |Absolute path of second level configuration file (Note that this should be path to the file and **NOT** path to the folder containing property file) |
|eventnotifier.template.location |Absolute location of folder with templates                                                                                                           |

### Second Level of Configuration
Name and path of this property file should be as defined by ```eventnotifier.config.path``` property in ```eventnotifier.properties``` file.
Following are the properties one can set in this file.

|Property                                 |Description                                                                                                                                                                                            |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|eventnotifier.mail.from.address          |Email address from which mails are to be sent                                                                                                                                                          |
|eventnotifier.mail.from.name             |Name of the Sender of the Email                                                                                                                                                                        |
|eventnotifier.mail.subject.event.present |Subject of the email sent for notifying same-day events                                                                                                                                                |
|eventnotifier.mail.subject.event.future  |Subject of the email sent for notifying future events                                                                                                                                                  |
|eventnotifier.vendor.mailgun.domain      |Mailgun domain from which mails are to be sent                                                                                                                                                         |
|eventnotifier.vendor.mailgun.apikey      |API key of th Mailgun domain                                                                                                                                                                           |
|eventnotifier.template.event.present     |HTML template file name of template to be used for same-day events (File with same name should exist at the location given by ```eventnotifier.template.location``` in ```eventnotifier.properties```) |
|eventnotifier.template.event.future      |HTML template file name of template to be used for future events (File with same name should exist at the location given by ```eventnotifier.template.location``` in ```eventnotifier.properties```)   |
|eventnotifier.data.file.events           |JSON file name of data file having events data (File with same name should exist at the location given by ```eventnotifier.data.location``` in ```eventnotifier.properties```)                         |
|eventnotifier.data.file.subscribers      |JSON file name of data file having subscribers data (File with same name should exist at the location given by ```eventnotifier.data.location``` in ```eventnotifier.properties```)                    |

## Data Files
Event Notifier reads data files in ```JSON``` format. The data files must exist at location defined by ```eventnotifier.data.location``` in ```eventnotifier.properties``` file.
This location must have two files one each describing events data and subscribers data.

### Event Data File
Event data file name is defined by ```eventnotifier.data.file.events``` property in second level configuration file. A sample event data file is shown below:

```
[
  {
    "date": 4,
    "month": 5,
    "year": 1936,
    "name": "Event",
    "eventees": [
      "Demo Eventee",
      .
      .
      .
    ],
    "profiles": [
      "profile1",
      .
      .
      .
    ]
  },
  .
  .
  .
]
```

The attributes shown in the sample data is descibed below:

|Property   |Description                                                                                       |Required |
|-----------|--------------------------------------------------------------------------------------------------|---------|
|date       |Date of the event                                                                                 |Yes      |
|month      |Month of the event                                                                                |Yes      |
|year       |Year of the event                                                                                 |No       |
|name       |Name of the event                                                                                 |No       |
|eventees   |Array containing all the eventees for the event                                                   |Yes      |
|profiles   |profile of the event. Only those events are notified to the subscribers that match their profiles |Yes      |

#### Notes:
1. Those non mandatory fields which are not set in data file are not accessible in templates.
2. If ```year``` is not set, ```years_since``` helper returns null in the template.
3. If ```eventees``` and/or ```profiles``` contain empty list, such events will not be notified ever.

### Subscriber Data File
Subscriber data file name is defined by ```eventnotifier.data.file.subscribers``` property in second level configuration file. A sample subscriber data file is shown below:

```
[
  {
    "name": "Demo User",
    "email": "x@abc.com",
    "profiles": [
      "profile1",
      .
      .
      .
    ],
    "priorReminderPeriod": 1
  },
  .
  .
  .
]
```

The attributes shown in the sample data is descibed below:

|Property            |Description                                                                                            |Required |
|--------------------|-------------------------------------------------------------------------------------------------------|---------|
|name                |Name of the subscriber                                                                                 |Yes      |
|email               |Email id of the subscriber                                                                             |Yes      |
|profiles            |Profile of the subscriber. Only those events are notified to the subscribers that match their profiles |Yes      |
|priorReminderPeriod |Number of days in advance the future event should be notified to the subscriber                        |No       |

#### Notes:
1. Those non mandatory fields which are not set in data file are not accessible in templates.
2. If ```profiles``` contain empty list, such subscribers will not be notified any events.
3. If ```priorReminderPeriod``` is not set, future notifications are not enabled for the subscriber.

## Customizing Templates
Event Notifier reads template files in ```HTML``` format. The templte files must exist at location defined by ```eventnotifier.template.location``` in ```eventnotifier.properties``` file.
This location must have two files one each for present event notification (name defined by ```eventnotifier.template.event.present```) and future event notification (name defined by ```eventnotifier.template.event.future```).

The app uses [Handlebars](http://handlebarsjs.com/) as templating engine and hence any templating helper block provided by Handlebars can be used in the templates. 
The json objects from data file can be accessed in the template as ```subscriber``` object and ```events``` array.

Apart from the helpers provided by Handlebars, app provides three more commonly used relevent helpers. 

|Helper              |Usage                         |Description                                                                                    |
|--------------------|------------------------------|-----------------------------------------------------------------------------------------------|
|list                |{{{list event.eventees}}}     |Wraps array in html <ul> tag                                                                   |
|ordinal             |{{{ordinal 1}}}               |Converts cardinal number to its ordinal form                                                   |
|years_since          |{{{years_since event.year}}} |Takes an year as input, and coverts it calculates number of years between today and input year |

#### Note:
Two helper blocks can be nested. For example ```{{{years_since 2016}}}``` in 2017 will return ```1```, but ```{{{ordinal (years_since 2016)}}}``` will return ```1st```.

## Scripting and Automation
Following script runs the app from any location. Let us say this script is called ```eventNotifier.sh```.

```
#!/bin/sh
cd {project_root}
{path_to_node_binary} {project_root}/index.js
```

To run this app periodically,
1. Run command ```crontab -e``` on bash console.
2. Append the file with ```00 00 * * * chmod 777 {path_to_eventNotifier.sh}/eventNotifier.sh; {path_to_eventNotifier.sh}/eventNotifier.sh```
3. Press ```Ctrl``` + ```X```
This line indicates that at 00:00 midnight, eventNotifier.sh has to be set as executable and the executed.

## Licence
The Software is released under [GNU Lesser General Public License v3.0](LICENSE),

## Contact
Author: Amey Kamat

Email: [amey@ameykamat.in](mailto:amey@ameykamat.in)

Website: [wwww.ameykamat.in](http://www.ameykamat.in)

Github: [AmeyKamat](https://github.com/AmeyKamat)
