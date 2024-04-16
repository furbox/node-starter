import { Router } from "express";
import { WwwRoutes } from "./www-routes/routes.js";
import { UserRoutes } from "./api/v1/users/users.routes.js";

export class ModuleRoutes{
    static get routes(){
        const router = Router()

        //Definir las rutas dentro de modules
        router.use('/', WwwRoutes.routes)
        router.use('/api/v1/users', UserRoutes.routes)

        return router
    }
}