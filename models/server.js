const express = require('express')
var cors = require('cors')
const {dbConnection} = require('../database/config.db')


class Server {

    constructor(){
        this.app  = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        //COectar a BD
        this.conectarDB()


        //Middlewares
        this.middlewares()

        //rutas
        this.routes()
    }

    //Conectar BD
    async conectarDB(){
        await dbConnection()
    }

    //middlewares
    middlewares(){
        //CORS
        this.app.use(cors())
        
        //lectura y parseo del body
        this.app.use( express.json() )

        
        
    }

    //rutas
    routes(){
        //importamos las rutas
        //directorio publico
        this.app.use( express.static('public') )
        //rutas usuario
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