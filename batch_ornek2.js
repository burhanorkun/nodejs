/**
 * Created by TCBORKUN on 27.12.2015.
 */
var CronJob = require('cron').CronJob;
var job = new CronJob('00 30 11 * * 1-5', function() {
        /*
         * haftanici tum gunlerde (pzt - cuma)
         * at 11:30:00 AM. cumartesi gunu calismaz
         * or Sunday.
         */
    }, function () {
        /* This function is executed when the job stops */
        console.log('Sadece haftaici gunleri saat 11:30 da calisacaktir.');
    },
    true, /* Start the job right now */
    'America/Los_Angeles' /* Time zone of this job. */
);
job.start();