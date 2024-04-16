export default class UserController {

    //obtener todos los usuarios
    getUsersPagination = (req, res) => {
        res.json({
            message: "Get all Users"
        })
    }

    //obtener un usuario por id
    getUserById = (req, res) => {
        const id = req.params.id
        res.json({
            id,
            message: "Get User by id"
        })
    }

    //obtener un usuario por email
    getUserByEmail = (req, res) => {
        const { email } = req.body;
        res.json({
            email,
            message: "Get User by email"
        })
    }

    //verificar un usuario
    verifyUser = (req, res) => {
        res.json({
            message: "Verify User"
        })
    }

    //crear un usuario
    createUser = (req, res) => {
        const data = req.body;
        res.json({
            data,
            message: "Create User"
        })
    }

    //editar un usario
    updateUser = (req, res) => {
        const id = req.params.id;
        const data = req.body;
        res.json({
            id,
            data,
            message: "Update User"
        })
    }

    //eliminar un usuario
    deleteUser = (req, res) => {
        const id = req.params.id;
        res.json({
            id,
            message: "Delete User"
        })
    }

}