const db = require("../utils/database")
const Users = require("../models/users.models")
const Todos = require("../models/todos.models")

const users = [
   {
      username: "ArielMarcos",
      email: "ariel@gmail.com",
      password: "1234",
   }, //id: 1
   {
      username: "Jhorman",
      email: "jhorman@gmail.com",
      password: "1234",
   }, //id: 2
   {
      username: "Lucero",
      email: "lucero@gmail.com",
      password: "1234",
   }, //id:3
]

const todos = [
   { title: "Tarea 1", description: "Descripcion para 1", userId: 1 },
   { title: "Tarea 2", description: "Descripcion para 2", userId: 2 },
   { title: "Tarea 3", description: "Descripcion para 3", userId: 3 },
   { title: "Tarea 4", description: "Descripcion para 4", userId: 4 },
]

// const categories = []

// const todosCategories = []

//create
//findOnde, findAll, findByPk
//update
//destroy

db.sync({ force: true })
   .then(() => {
      console.log("Iniciando con el sembradío malicioso")
      users.forEach((user) => Users.create(user))

      setTimeout(() => {
         todos.forEach((todo) => Todos.create(todo))
      }, 100)
   })
   .catch((error) => console.log(error))
