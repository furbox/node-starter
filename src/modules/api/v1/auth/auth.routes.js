import { Router } from "express";
import AuthController from "./auth.controller.js";
import { auth, validation } from "../../../../middlewares/validations.middleware.js";
import { createUserSchema, validateChangePassword, validateEmailSchema, validateLoginSchema } from "../../../../utils/validations.helper.js";

export class AuthRoutes {
    static get routes() {
        const router = Router();
        const authController = new AuthController();

        //ruta para registro
        router.post('/signup', validation(createUserSchema), authController.register)

        //ruta para login
        router.post('/signin', validation(validateLoginSchema), authController.login)

        //ruta para verificar
        router.get('/verify/:code', authController.verify)

        //ruta recuperar contraseña
        router.post('/recovery-password', validation(validateEmailSchema), authController.recover)

        //ruta cambiar su contraseña
        router.post('/change-password', [auth, validation(validateChangePassword)], authController.changePassword)

        //TODO:login google,facebook,twitter,instagram, github etc.

        return router
    }
}