import UserModel from './users.model.js'

export default class UserController {

    constructor() {
        this.userModel = new UserModel()
    }

    //obtener todos los usuarios
    getUsersPagination = (req, res) => {
        const users = this.userModel.getPagination() || [];
        res.json({
            data: users,
            message: "Ok getUsersPagination"
        })
    }

    //obtener un usuario por id
    getUserById = (req, res) => {
        const id = req.params.id
        const user = this.userModel.getById(+id)

        return user ?
            res.json({
                data: user,
                message: "Get User by id"
            }) :
            res.status(404).json({
                error: "User not found"
            })
    }

    //obtener un usuario por email
    getUserByEmail = (req, res) => {
        const { email } = req.body;
        const user = this.userModel.getByEmail(email)

        return user ?
            res.json({
                data: user,
                message: "Get User by email"
            }) :
            res.status(404).json({
                error: "User not found"
            })
    }

    //verificar un usuario
    //TODO: jwt
    verifyUser = (req, res) => {
        res.json({
            message: "Verify User"
        })
    }

    //crear un usuario
    createUser = (req, res) => {
        const { fullname, email, pass } = req.body;
        if (!fullname || !email || !pass) {
            return res.status(400).json({
                error: 'Los campos fullname, email y pass son obligatorios'
            })
        }
        const lastId = this.userModel.getLastId();

        const newUser = {
            user_id: +lastId + 1,
            user_fullname: fullname,
            user_email: email,
            user_pass: pass,
            user_status: true,
            user_verify: false,
            user_createdAt: new Date(),
            user_updatedAt: '',
            user_lastloginAt: '',
            user_img_profile: 'user.png'
        }

        const user = this.userModel.create(newUser);

        res.json({
            data: user,
            message: "ok Create User"
        })
    }

    //editar un usario
    updateUser = (req, res) => {
        const id = req.params.id;
        const { fullname, email, pass } = req.body;
        const user = this.userModel.getById(+id)
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        if (fullname && fullname !== user.user_fullname) {
            user.user_fullname = fullname
        }

        if (email && email !== user.user_email) {
            user.user_email = email
        }

        if (pass && pass !== user.user_pass) {
            user.user_pass = pass
        }

        user.user_updatedAt = new Date()

        const updateUser = this.userModel.update(user.user_id, user)

        res.json({
            data: updateUser,
            message: "ok Update User"
        })
    }

    //eliminar un usuario
    deleteUser = (req, res) => {
        const id = req.params.id;
        const user = this.userModel.getById(+id)
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        const deleteUser = this.userModel.delete(user.user_id)
        if (deleteUser) {
            res.json({
                data: user,
                message: "Delete User"
            })
        } else {
            res.status(500).json({
                error: "Internal server Error"
            })
        }

    }

}