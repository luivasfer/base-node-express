const express = require('express')
var cors = require('cors')


class Server {

    constructor(){
        this.app  = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        //Middlewares
        this.middlewares()

        //rutas
        this.routes()
    }

    //middlewares
    middlewares(){
        //CORS
        this.app.use(cors())
        
        //lectura y parseo del body
        this.app.use( express.json() )

        //directorio publico
        this.app.use(express.static('puclic'))
    }

    //rutas
    routes(){
        //importamos las rutas
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'))
    }

    // escuchando
    listen(){
        this.app.listen(this.port, () => {
            console.log("escuchando en el puerto", this.port);
        })
    }

}

module.exports = Server