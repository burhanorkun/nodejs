/**
 * Created by TCBORKUN on 27.12.2015.
 */
var CronJob = require('cron').CronJob;

new CronJob('* * * * * *', function() {
    console.log('Her saniyede bu mesaji alacaksiniz.');
}, null, true, 'America/Los_Angeles');


/*
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6
*/