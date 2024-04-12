import express from 'express'

export class IndexRoutes{
    static get routes(){
        const router = express.Router()

        //Definir las rutas de index
        router.get('/',(req, res) => {
            res.render('index',{
                title: "Home : Starter Web Server"
            })
        })
        return router
    }
}