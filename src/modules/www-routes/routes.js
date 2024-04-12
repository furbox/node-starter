import { Router } from "express";
import { IndexRoutes } from "./index/index.routes.js";
import { AboutRoutes } from "./about/about.routes.js";

export class WwwRoutes{
    static get routes(){
        const router = Router()

        //Definir las rutas dentro de www-router
        router.use('/', IndexRoutes.routes)
        router.use('/about', AboutRoutes.routes)

        return router
    }
}