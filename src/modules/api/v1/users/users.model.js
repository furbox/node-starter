import prisma from '../../../../data/prisma.js'
import userData from './users.data.json' assert {type: "json"};

export default class UserModel {
    constructor() {
        this.users = userData;
    }

    //obtener todos los usuarios con paginacion
    async getPagination() {
        return await prisma.user.findMany();
    }

    //obtener un usuario por id
    getById(id) {
        let user = this.users.filter(user => {
            return user.user_id === Number(id)
        })[0]

        return user;
    }

    //obtener un usuario por email
    getByEmail(email) {
        let user = this.users.filter(user => {
            return user.user_email === email
        })[0]

        return user;
    }

    //crear un usuario
    async create(user) {
        try {
            const newUser = await prisma.user.create({
                data: user
            })
            return newUser;
        } catch (error) {
            console.log('create user error: ', error)
            return false
        }
    }

    //editar un usuario
    update(id, userData) {
        let userIndex = this.users.findIndex((user) => {
            return user.user_id === +id
        })
        if (userIndex !== -1) {
            Object.assign(this.users[userIndex], userData);
            return this.users[userIndex]
        } else {
            return false
        }

    }

    //eliminar un usuario
    delete(id){
        this.users = this.users.filter(user => {
            return user.user_id != +id
        })
        return true
    }

    //obtener el ultimo id
    getLastId(){
        let lastUser = this.users[this.users.length - 1];
        let lastUserId = lastUser ? lastUser.user_id : 0
        return lastUserId;
    }
}