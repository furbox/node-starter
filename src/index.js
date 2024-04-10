import envs from "./config/envs.js"
import { CronController } from "./modules/cron/cron.controller.js";


export class Start {

    run() {
        console.log(`Starting ${envs.APP_NAME} server`)
        const job = new CronController()
        job.createJob('*/4 * * * * *', () => {
            console.log('Cron excecute: ', Date(), 'America/Mexico')
        })
    }
}

const server = new Start();

server.run()