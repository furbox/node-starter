import { Router } from "express";
import { WwwRoutes } from "./www-routes/routes.js";

export class ModuleRoutes{
    static get routes(){
        const router = Router()

        //Definir las rutas dentro de modules
        router.use('/', WwwRoutes.routes)

        return router
    }
}