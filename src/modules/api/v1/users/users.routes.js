import { Router } from "express";
import UserController from "./users.controller.js";

export class UserRoutes {
    static get routes() {
        const router = Router();
        const userController = new UserController()

        //definir todas nuestras rutas que tengan que ver con el usuario

        //obtener todos los usuarios
        router.get('/', userController.getUsersPagination)
        //obtener un usuario por id
        router.get('/:id', userController.getUserById)
        //obtener un usuario por email
        router.post('/email/', userController.getUserByEmail)
        //verificar un usuario
        router.post('/verify', userController.verifyUser)
        //crear un usuario
        router.post('/', userController.createUser)
        //editar un usario
        router.put('/:id', userController.updateUser)
        //eliminar un usuario
        router.delete('/:id', userController.deleteUser)

        return router
    }
}