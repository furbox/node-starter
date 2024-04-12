import express from 'express'

export class AboutRoutes{
    static get routes(){
        const router = express.Router()

        //Definir las rutas de index
        router.get('/',(req, res) => {
            res.render('about',{
                title: "About : Starter Web Server"
            })
        })
        
        return router
    }
}