import { CacheManager } from '../../../../data/redis.js';
import { NcryptHelper } from '../../../../utils/ncrypt.helper.js';
import UserModel from './users.model.js'

export default class UserController {

    constructor() {
        this.userModel = new UserModel()
        this.hashPassword = NcryptHelper.hash;
        this.comparePassword = NcryptHelper.compare;
        this.cacheManager = new CacheManager();
    }

    //obtener todos los usuarios
    getUsersPagination = async (req, res) => {
        const users = await this.userModel.getPagination();
        res.json({
            data: users,
            message: "Ok getUsersPagination"
        })
    }

    //obtener un usuario por id
    getUserById = async (req, res) => {
        const id = req.params.id;
        let user;
        //primero validar en cache
        const keyInCache = `UserController__getUserById__${id}`;
        const userInCache = await this.cacheManager.get(keyInCache);
        if (userInCache) {
            user = userInCache;
        } else {
            //validar en db
            user = await this.userModel.getById(id)
            if (user) {
                //guardar en cache 
                await this.cacheManager.set(keyInCache, user)
            }
        }

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
    getUserByEmail = async (req, res) => {
        const { email } = req.body;
        let user;
        //primero validar en cache
        const keyInCache = `UserController__getUserByEmail__${email}`;
        const userInCache = await this.cacheManager.get(keyInCache);
        if(userInCache){
            user = userInCache
        }else{
            user = await this.userModel.getByEmail(email)
            if (user) {
                //guardar en cache 
                await this.cacheManager.set(keyInCache, user)
            }
        }

        return user ?
            res.json({
                data: user,
                message: "Get User by email"
            }) :
            res.status(404).json({
                error: "User not found"
            })
    }

    //crear un usuario
    createUser = async (req, res) => {
        const { fullname, email, pass } = req.body;

        const newUser = {
            user_fullname: fullname,
            user_email: email,
            user_pass: this.hashPassword(pass)
        }
        try {
            const user = await this.userModel.create(newUser);

            res.json({
                data: user,
                message: "ok Create User"
            })
        } catch (error) {
            console.log(`User Controller createUser: ${error}`)
            res.status(500).json({
                error,
                message: error.message
            })
        }

    }

    //editar un usario
    updateUser = async (req, res) => {
        const id = req.params.id;
        const { fullname, email, pass } = req.body;

        let user = {};

        if (!fullname && !pass && !email) {
            return res.status(404).json({
                error: "Es necesario al menos un dato a actualizar"
            })
        }

        try {
            user = await this.userModel.getById(id)
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

            if (pass) {
                const isMatching = this.comparePassword(pass, user.user_pass)
                if (!isMatching) {
                    user.user_pass = this.hashPassword(pass)
                }
            }

            user.user_updatedAt = new Date()

            const updateUser = await this.userModel.update(user.user_id, user)
            if(updateUser){
                await this.cacheManager.set(`UserController__getUserById__${updateUser.user_id}`, updateUser)
                await this.cacheManager.set(`UserController__getUserByEmail__${updateUser.user_email}`, updateUser)
            }

            res.json({
                data: updateUser,
                message: "ok Update User"
            })
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            })
        }
    }

    //eliminar un usuario
    deleteUser = async (req, res) => {
        const id = req.params.id;
        try {
            const user = await this.userModel.getById(id)
            if (!user) {
                return res.status(404).json({
                    error: "User not found"
                })
            }

            //const deletedUser = await this.userModel.delete(user.user_id)
            const deletedUser = await this.userModel.deleteLogic(user.user_id)
            
            if(deletedUser){
                await this.cacheManager.set(`UserController__getUserById__${deletedUser.user_id}`, deletedUser)
                await this.cacheManager.set(`UserController__getUserByEmail__${deletedUser.user_email}`, deletedUser)
            }

            res.json({
                data: deletedUser,
                message: "Delete User"
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: "Internal server Error",
                message: error.message
            })
        }


    }

}