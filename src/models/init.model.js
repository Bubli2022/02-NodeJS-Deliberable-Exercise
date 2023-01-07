//Vamos a importar todos nuetros modelos creados

const Users = require("./users.models")
const Todos = require("./todos.models")
const Categories = require("./categories.models")
const TodosCategories = require("./todos-categories.models")
const initModels = () => {
   //Vamos a crear las relaciones
   //hasOne => para indicar que tiene uno solo, solo se usa para relaciones uno a uno
   //hasMany =>para indicar que tiene muchos
   //belongsTo => para indicar que pertenece a, pertenece a la llave foránea

   Todos.belongsTo(Users, { as: "author", foreignKey: "user_id" })
   Users.hasMany(Todos, { as: "task", foreignKey: "user_id" })

   //relacion M-M entre categories y todos
   TodosCategories.belongsTo(Todos, { as: "task", foreignKey: "todo_id" })
   Todos.hasMany(TodosCategories, { as: "category", foreignKey: "todo_id" })

   TodosCategories.belongsTo(Categories, {
      as: "category",
      foreignKey: "category_id",
   })
   Categories.hasMany(TodosCategories, {
      as: "task",
      foreignKey: "category_id",
   })
}

module.exports = initModels
