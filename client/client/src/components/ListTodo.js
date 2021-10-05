import React, {useEffect, useState} from "react";

import EditTodo from "./EditTodo";

const ListTodo = () =>{

    const [ todos, setTodos] = useState([])

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    };

    const getTodos = async () =>{
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json();
            setTodos(jsonData)
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(()=>{
        getTodos();
    }, [])


    return (
        <div>
            <h1> LIST TODO</h1>
  <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>DESCRIPTION</th>
        <th>EDIT</th>
        <th>DELETE</th>
      </tr>
    </thead>
    <tbody>
{/*       <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
    {todos.map(todo =>(
        <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo}/></td>
            <td>
                <button className="btn btn-danger" onClick={()=> deleteTodo(todo.todo_id)}>Delete</button>
            </td>
        </tr>
    ))}
    </tbody>
  </table>
        </div>
    )
}

export default ListTodo;