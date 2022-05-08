const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

app.use(cors());

const port = 4000


const sequelize = new Sequelize("todo", "root", "", {
    dialect: "mysql",
    host: "localhost"
});

try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}

const Todo = sequelize.define('Todo', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING
    },
    fin: {
        type: DataTypes.BOOLEAN
    }
});

console.log(Todo === sequelize.models.Todo);


function handleTodoId (req, res, next){
    const {todoId} = req.query;

    if (!todoId) {
        res.status(422).json({ error: 'iso parameter is required!' })
        return;
    }
    next()
}




















/* 

app.post('/api/todos', ({Todo}, res) => {

    res.status(201).json({
        id: Todo.id, 
        nom: Todo.nom,
        fini: Todo.fin,
    });
    const newTodo = await sequelize.query("INSERT INTO `todo` (nom, fini) VALUES ", { type: QueryTypes.SELECT });

})

*/


app.get('/api/todos', (req, res) => {

    res.send('Liste des Todos')
    /*  
        res.status(200).json({
            id: Todo.id
            nom: Todo.nom,
            fini: Todo.fin,
        });

    */

})

/* 

app.put('/api/todos', handleTodoId,({Todo}, res) => {

    res.status(200).json({
        id: Todo.id, 
        nom: Todo.nom,
        fini: Todo.fin,
    });

})

*/

/*  

app.get('/api/todos', handleTodoId,({Todo}, res) => {

    res.status(200).json({
        id: Todo.id, 
        nom: Todo.nom,
        fini: Todo.fin,
    });

})

*/

/* 

app.delete('/api/todos', handleTodoId,({Todo}, res) => {

    res.status(204).json({
        id: Todo.id, 
        nom: Todo.nom,
        fini: Todo.fin,
    });

})

*/


app.listen(port, () => {
  console.log(`L'appli guette dans le quartier : http://localhost:${port}`)
})