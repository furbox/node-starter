import { CronLibrary } from "./cron.library.js";

export class CronController {
    createJob(time, callback, timeZone) {
        const job = CronLibrary.createJob2(time, callback, timeZone)
        CronLibrary.startJob2(job);
        return true;
    }
}