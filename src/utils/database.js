const { Sequelize } = require("sequelize")

//crear una instancia con parametros de configuacion de nuestra base de datos
//Necesitamos un objeto de configuracion que no es mas que las credenciales de mi base de datos
const db = new Sequelize({
   database: "todoapp",
   username: "postgres", // postgres para nosotros
   host: "localhost", //127.0.0.1 que es lo mismo al anterior
   port: "5432",
   password: "root",
   dialect: "postgres", // define el gestor que estamos usando
})

module.exports = db
