import envs from "./config/envs.js"
import { CronController } from "./modules/cron/cron.controller.js";


export class Server {

    constructor(){
        this.crons()
    }

    crons(){
        const jobs = new CronController()
        jobs.excecuteJob()
    }

    start(){
        console.log('Server start')
    }
}
