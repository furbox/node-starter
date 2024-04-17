import { Router } from "express";
import UserController from "./users.controller.js";
import { validation } from "../../../../middlewares/validations.middleware.js";
import { createUserSchema, updateUserSchema, validateEmailSchema } from "../../../../utils/validations.helper.js";

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
        router.post('/email/', validation(validateEmailSchema), userController.getUserByEmail)
        //verificar un usuario
        router.post('/verify', userController.verifyUser)
        //crear un usuario
        router.post('/', validation(createUserSchema), userController.createUser)
        //editar un usario
        router.put('/:id', validation(updateUserSchema), userController.updateUser)
        //eliminar un usuario
        router.delete('/:id', userController.deleteUser)

        return router
    }
}