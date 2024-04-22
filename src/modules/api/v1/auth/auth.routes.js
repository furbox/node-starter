import { Router } from "express";
import AuthController from "./auth.controller.js";

export class AuthRoutes {
    static get routes() {
        const router = Router();
        const authController = new AuthController();

        //ruta para registro
        router.post('/signup', authController.register)

        //ruta para login
        router.post('/signin', authController.login)

        //ruta para verificar
        router.get('/verify/:code', authController.verify)

        //ruta recuperar contraseña
        router.post('/recovey-password', authController.recover)

        //ruta cambiar su contraseña
        router.post('/change-password', authController.changePassword)

        //TODO:login google,facebook,twitter,instagram, github etc.

        return router
    }
}