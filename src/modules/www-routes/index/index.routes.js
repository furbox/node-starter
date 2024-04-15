import express from 'express'
import getBaseUrl from '../../../utils/base-url.helper.js'

export class IndexRoutes{
    static get routes(){
        const router = express.Router()

        //Definir las rutas de index
        router.get('/',(req, res) => {
            const baseUrl = getBaseUrl(req)
            const desc = "Mi descripción de mi pagína"
            res.render('index',{
                title: "Home : Starter Web Server",
                base_url: baseUrl,
                desc: desc,
                keywords: "nodejs, express, programació",
                meta_title: "Esta es mi meta title",
                meta_desc: desc,
                meta_img: baseUrl + '/images/animation_lkm4hz0u_small.gif',
                meta_url: baseUrl + '/'
            })
        })
        return router
    }
}