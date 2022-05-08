import axios from 'axios';
const baseUrl = 'http://localhost:4000/api'

export async function getTodos() {
    const {data} = await axios.get(`${baseUrl}/todos`)
    return data
}

export async function addTodo(todo) {
    const {data} = await axios.post(`${baseUrl}/todos`, {
        nom: todo.nom,
        statut: todo.statut,
        description: todo.description
    })
    return data
}

export async function getTodo(id) {
    const {data} = await axios.get(`${baseUrl}/todos/${id}`)
    return data
}

export async function delTodo(id){
    await axios.delete(`${baseUrl}/todos/${id}`)
}

export async function upTodo(id, todo) {
    const {data} = await axios.put(`${baseUrl}/todos/${id}`, {
        nom: todo.nom,
        statut: todo.statut,
        description: todo.description
    })
    return data
}