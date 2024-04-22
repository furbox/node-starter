import { Router } from "express";
import { WwwRoutes } from "./www-routes/routes.js";
import { UserRoutes } from "./api/v1/users/users.routes.js";
import { AuthRoutes } from "./api/v1/auth/auth.routes.js";

export class ModuleRoutes{
    static get routes(){
        const router = Router()

        //Definir las rutas dentro de modules
        router.use('/', WwwRoutes.routes)
        router.use('/api/v1/users', UserRoutes.routes)
        router.use('/api/v1/auth', AuthRoutes.routes)

        return router
    }
}