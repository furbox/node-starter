import { Router } from "express";
import UserController from "./users.controller.js";
import { auth, validation } from "../../../../middlewares/validations.middleware.js";
import { createUserSchema, updateUserSchema, validateEmailSchema } from "../../../../utils/validations.helper.js";

export class UserRoutes {
    static get routes() {
        const router = Router();
        const userController = new UserController()

        //definir todas nuestras rutas que tengan que ver con el usuario

        //obtener todos los usuarios
        router.get('/', auth, userController.getUsersPagination)
        //obtener un usuario por id
        router.get('/:id', auth, userController.getUserById)
        //obtener un usuario por email
        router.post('/email/', auth, validation(validateEmailSchema), userController.getUserByEmail)
        //crear un usuario
        router.post('/', auth, validation(createUserSchema), userController.createUser)
        //editar un usario
        router.put('/:id', auth, validation(updateUserSchema), userController.updateUser)
        //eliminar un usuario
        router.delete('/:id', auth, userController.deleteUser)

        return router
    }
}