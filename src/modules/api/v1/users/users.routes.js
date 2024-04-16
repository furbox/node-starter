import { Router  } from "express";

export class UserRoutes{
    static get routes () {
        const router = Router();

        //definir todas nuestras rutas que tengan que ver con el usuario

        //obtener todos los usuario
        router.get('/', (req, res) => {
            res.json({
                message: "Get all Users"
            })
        })
        //obtener un usuario por id
        router.get('/:id', (req, res) => {
            const id = req.params.id
            res.json({
                id,
                message: "Get User by id"
            })
        })
        //obtener un usuario por email
        router.get('/email/:email', (req, res) => {
            const email = req.params.email
            res.json({
                email,
                message: "Get User by email"
            })
        })
        //verificar un usuario
        router.post('/verify', (req, res) => {
            res.json({
                message: "Verify User"
            })
        })
        //crear un usuario
        router.post('/', (req, res) => {
            const data = req.body;
            res.json({
                data,
                message: "Create User"
            })
        })
        //editar un usario
        router.put('/:id', (req, res) => {
            const id = req.params.id;
            const data = req.body;
            res.json({
                id,
                data,
                message: "Update User"
            })
        })
        //eliminar un usuario
        router.delete('/:id', (req, res) => {
            const id = req.params.id;
            res.json({
                id,
                message: "Delete User"
            })
        })

        return router
    }
}