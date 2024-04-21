import prisma from '../../../../data/prisma.js'

export default class UserModel {

    //obtener todos los usuarios con paginacion
    async getPagination() {
        try {
            return await prisma.user.findMany();            
        } catch (error) {
            console.log(`User Model getPagination: ${error}`)
            return [];
        }
    }

    //obtener un usuario por id
    async getById(id) {        
        try {
            const user = await prisma.user.findUnique({
                where:{
                    user_id: id
                }
            })
            return user
        } catch (error) {
            console.log(`User Model getById: ${error}`)
            return false;
        }
    }

    //obtener un usuario por email
    async getByEmail(email) {
        try {
            const user = await prisma.user.findUnique({
                where:{
                    user_email: email
                }
            })
            return user
        } catch (error) {
            console.log(`User Model getByEmail: ${error}`)
            return false;
        }
    }

    //crear un usuario
    async create(user) {
        try {
            const newUser = await prisma.user.create({
                data: user
            })
            return newUser;
        } catch (error) {
            console.log(`User Model create: ${error}`)
            return false
        }
    }

    //editar un usuario
    async update(id, userData) {
        try {
            const updatedUser = await prisma.user.update({
                where:{
                    user_id: id
                },
                data: userData
            }) 

            return updatedUser
        } catch (error) {
            console.log(`User Model update: ${error}`)
            return false            
        }
    }

    //eliminar un usuario de manera permanente
    async delete(id){
        try {
            const deletedUser = await prisma.user.delete({
                where:{
                    user_id: id
                }
            })
            return deletedUser;
        } catch (error) {
            console.log(`User Model delete: ${error}`)
            return false            
        }
    }

    async deleteLogic(id){
        try {
            const deletedUser = await prisma.user.update({
                where: {
                    user_id: id
                },
                data:{
                    user_status: false
                }
            })
            return deletedUser
        } catch (error) {
            console.log(`User Model deleteLogic: ${error}`)
            return false
        }
    }
}