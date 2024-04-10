import { CronJob } from 'cron'
import cron from 'node-cron'

export class CronLibrary {
    //usar libreria cron
    static createJob(time, callback, timeZone){
        return new CronJob(time, callback, null, true, timeZone)
    }

    static startJob(job){
        job.start()
    }

    //usar libreria node-cron
    static createJob2(time, callback, timezone){
        return cron.schedule(time, callback,{
            scheduled:true,
            timezone
        })
    }

    static startJob2(job){
        job.start()
    }
}