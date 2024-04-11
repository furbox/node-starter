import { CronLibrary } from "./cron.library.js";

export class CronController {
    createJob(time, callback, timeZone) {
        const job = CronLibrary.createJob2(time, callback, timeZone)
        CronLibrary.startJob2(job);
        return true;
    }

    excecuteJob(){
        this.validarWeb()
    }

    validarWeb(){
        this.createJob('*/4 * * * * *', async () => {
            const request = await fetch('https://google.com')
            if(!request.ok){
                //enviar emails
                //enviar sms
                //guardar en db
                console.error('Google no se encuentra online')
            }
            console.log('Cron excecute: ', Date(), 'America/Mexico')
        })
    }
}