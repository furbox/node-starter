import envs from "./config/envs.js"


export class Start{
    
    run(){
        console.log('Hola a todos!!', envs.APP_NAME)
    }
}

const server = new Start();

server.run()