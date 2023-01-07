// importabamos express

const express = require("express")
const db = require("./utils/database")
const initModels = require("./models/init.model")
const Users = require("./models/users.models")
const Todos = require("./models/todos.models")

//crear una instancia de express

const app = express()

app.use(express.json())

const PORT = 8000

//probando la conexion a la base de datos
db.authenticate()
   .then(() => console.log("autenticación exitosa"))
   .catch((error) => console.log(error))

initModels()
//vamos a utilizar el metodo sync de nuestra db
db.sync({ force: false }) //devuelve una promesa
   .then(() => console.log("Base de datos sincronizada"))
   .catch((error) => console.log(error))

app.get("/", (req, res) => {
   res.status(200).json({ message: "Bienvenido al servidor" })
})

//definir las rutas de nuestros endpoints (de ahora en adelante ep)
//todas las consultas de usuarios
//localhost:8000/users => todo para usuarios
//localhost:8000/todos => todo para tareas

//GET a /users
app.get("/users", async (req, res) => {
   try {
      //vamos a obtener el resultado de consultar a todos los usuarios de la base de datos
      const result = await Users.findAll() // es como un select * from users;
      res.status(200).json(result)
   } catch (error) {
      console.log(error)
   }
})

//obtener un usuario sabiendo su id
app.get("/users/:id", async (req, res) => {
   try {
      const { id } = req.params
      const result = await Users.findByPk(id)
      res.status(200).json(result)
   } catch (error) {
      console.log(error)
   }
})

//obtener un usuario por el username
app.get("/users/username/:username", async (req, res) => {
   try {
      const { username } = req.params
      const result = await Users.findOne({ where: { username } }) // SELECT * FROM users WHERE username = Ariel Marcos
      res.status(200).json(result)
   } catch (error) {
      console.log(error)
   }
})

//creando usuario
app.post("/users", async (req, res) => {
   try {
      const user = req.body
      const result = await Users.create(user)
      res.status(201).json(result)
   } catch (error) {
      res.status(400).json(error.message)
      console.log(error)
   }
})

//actualizar un usuario, solo podemos cambiar password
app.put("/users/:id", async (req, res) => {
   try {
      const { id } = req.params
      const field = req.body
      const result = await Users.update(field, {
         where: { id },
      })
      res.status(200).json(result)
   } catch (error) {
      res.status(400).json(error.message)
   }
})

//eliminar un usuario
app.delete("/users/:id", async (req, res) => {
   try {
      const { id } = req.params
      const result = await Users.destroy({
         where: { id },
      })
      res.status(200).json(result)
   } catch (error) {
      res.status(400).json(error.message)
   }
})

app.listen(PORT, () => {
   console.log(`servidor corriendo en el puerto ${PORT}`)
})

//vamos a terminar los modelos => rapido
//crear las relaciones entre los modelos
//les voy a enseñar a insertar info desde este mismo proyecto

//mañana estaremos haciendo los endpoints y consultas

//todo se hará desde users

//hoy vamos a insertar informacion en nuestra base de datos

//consultar la informacion con endpoints

//Entregable 02 - item 1: Obtener todas las tareas

//GET a /todos
app.get("/todos", async (req, res) => {
   try {
      //vamos a obtener el resultado de consultar a todos los todos de la base de datos
      const result = await Todos.findAll() // es como un select * from todos;
      res.status(200).json(result)
   } catch (error) {
      console.log(error)
   }
})

//Entregable 02 - item 2: Obtener una tarea por su id

//obtener un todo sabiendo su id
app.get("/todos/:id", async (req, res) => {
   try {
      const { id } = req.params
      const result = await Todos.findByPk(id)
      res.status(200).json(result)
   } catch (error) {
      console.log(error)
   }
})

//Entregable 02 - item 3: Crear una nueva todo
//creando todo
app.post("/todos", async (req, res) => {
   try {
      const user = req.body
      const result = await Todos.create(user)
      res.status(201).json(result)
   } catch (error) {
      res.status(400).json(error.message)
      console.log(error)
   }
})

//Entregable 02 - item 4: Actualizar un todo

//actualizar un todo, solo podemos cambiar isComplete
app.put("/todos/:id", async (req, res) => {
   try {
      const { id } = req.params
      const field = req.body
      const result = await Todos.update(field, {
         where: { id },
      })
      res.status(200).json(result)
   } catch (error) {
      res.status(400).json(error.message)
   }
})

//Entregable 02 - item 5: Eliminar un todo

//eliminar un usuario
app.delete("/todos/:id", async (req, res) => {
   try {
      const { id } = req.params
      const result = await Todos.destroy({
         where: { id },
      })
      res.status(200).json(result)
   } catch (error) {
      res.status(400).json(error.message)
   }
})
