import express from 'express'
import envs from "./config/envs.js"
import path from 'node:path'
import fs from 'node:fs'
import __dirname from './utils/path.js'
import { CronController } from "./modules/cron/cron.controller.js";
import { ModuleRoutes } from './modules/routes.js';
import morgan from 'morgan'
import { getFullDate } from './utils/get-date.helper.js'
import { CacheManager } from './data/redis.js'
import corsMiddleware from './middlewares/cors.middleware.js'


export class Server {

    constructor(){
        this.app = express()
        this.port = envs.PORT;
        this.router = ModuleRoutes.routes
        this.cacheManager = new CacheManager();

        //excecute engine
        this.engine()

        //excecute middlewares
        this.middlewares()

        //excecute rutas
        this.routes()

        //app crons
        //this.crons()
    }

    crons(){
        const jobs = new CronController()
        jobs.excecuteJob()
    }

    //engine ejs
    engine(){
        this.app.set("views", path.join(__dirname, "modules", "views"));
        this.app.set("view engine", "ejs");
    }

    //middlewares
    middlewares(){
        this.app.options('*', corsMiddleware)
        this.app.use(corsMiddleware)
        this.app.use(this.cacheManager.sessionMiddleware);
        const fecha = getFullDate();
        const accessLogStream = fs.createWriteStream(path.join(__dirname, `../logs/${fecha}.access.log`), { flags: 'a' })
        this.app.use(morgan('combined', { stream: accessLogStream }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(express.static("public"))
    }

    //routes
    routes(){
        this.app.use(this.router)
    }

    start(){
        this.app.listen(this.port, () => {
            console.log(`Server in runnin in http://localhost:${this.port}/`)
        })
    }
}
