import React, { useEffect, useState } from "react";
import "./App.css";
import { getTodos, addTodo, delTodo, upTodo } from "./api";

const App = () => {
  const defaultTodo = {
    id: null,
    nom: "",
    statut: "En cours",
    description: "",
    dueDate: "",
  };

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(defaultTodo);
  const [todoEditing, setTodoEditing] = useState(defaultTodo);
  //const [editingText, setEditingText] = useState(defaultTodo);

  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    addTodo(todo).then((todo) => {
      setTodos([...todos, todo]);
      setTodo(defaultTodo);
    });
  }

  function deleteTodo(id) {
    delTodo(id).then((res) => {
      let updatedTodos = [...todos].filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    });
  }

  function toggleComplete(id, todo) {
    /* let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos); */
    /* let todoCompleted = {...todo, statut:todo.statut === "fini!" ? "En cours" : "fini!"}
    console.log(todoCompleted)
    upTodo(todoCompleted).then((res) => {
      setTodo(currentList => [...currentList.map(list => list.id === res.data.result.id ? list = res.data.result : list)])
    }) */
  }

  function submitEdits(id) {
    upTodo(id, todoEditing).then((todo) => {
      const updatedTodos = todos.map((oldTodo) => {
        if (oldTodo.id === todo.id) {
          oldTodo = todo;
        }
        return oldTodo;
      });
      setTodos(updatedTodos);
      setTodoEditing(defaultTodo);
    });
  }

  return (
    <div id="todo-list">
      <h1>💪🏾 La Todo List de ce bon vieux Jojo 🙋🏾‍♂️</h1>
      <form onSubmit={handleSubmit} method="POST" action="App.jsx">
        <input
          required
          type="text"
          onChange={(e) => setTodo({ ...todo, nom: e.target.value })}
          placeholder="Nom de la to-do"
          value={todo.nom}
        />
        <input
          required
          type="text"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          placeholder="Description de la to-do"
          value={todo.description}
        />
        <input
          type="date"
          value={todo.dueDate.replace("Z", "")}
          onChange={(e) => {
            setTodo({ ...todo, dueDate: e.target.value });
          }}
        />
        <button type="submit">Ajoute une Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            {
              <input
                type="checkbox"
                id="completed"
                checked={false}
                onChange={() => toggleComplete(todo)}
              />
            }
            {todo.id === todoEditing.id ? (
              <div>
                <input
                  type="text"
                  onChange={(e) =>
                    setTodoEditing({ ...todoEditing, nom: e.target.value })
                  }
                  value={todoEditing.nom}
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setTodoEditing({
                      ...todoEditing,
                      description: e.target.value,
                    })
                  }
                  value={todoEditing.description}
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setTodoEditing({ ...todoEditing, statut: e.target.value })
                  }
                  value={todoEditing.statut}
                />
              </div>
            ) : (
              <div>
                <div>{todo.nom}</div>
                <div>{todo.dueDate}</div>
              </div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing.id ? (
              <button onClick={() => submitEdits(todoEditing.id)}>
                On édite!
              </button>
            ) : (
              <button onClick={() => setTodoEditing(todo)}>Édite</button>
            )}
            <div>{todo.description}</div>
            <button onClick={() => deleteTodo(todo.id)}>Suppr</button>
          </div>
          <div align="center">
            <div>Statut : {todo.statut}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
