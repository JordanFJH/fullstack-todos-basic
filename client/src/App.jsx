import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";

export default function App() {
  let [todos, setTodos] = useState([]);
  let [input, setInput] = useState("");
  let [listType, setListType] = useState("all");

  useEffect(() => {

    async function getData() {
      try {
        const response = await fetch("/api/todos")
        const data = await response.json()
        console.log("Data from UseEffect - ", data);
        setTodos(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])



  async function addToList() {
    let todo = {
      text: input,
    };
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const newTodo = await response.json()
    console.log(newTodo)

    let newTodos = [...todos, newTodo];
    setTodos(newTodos);

    setInput("");
  }

  function handleChange(event) {
    setInput(event.target.value);
  }

  async function deleteTodo(id) {
    let newTodos;
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      console.log(data)
      newTodos = todos.filter((todo) => todo._id !== id);

    } catch (error) {
      console.log(error)
    }

    setTodos(newTodos);
  }

  async function completeTodo(id) {

    let newTodos = [...todos]
    let currentTodo = newTodos.find(t => t._id === id)
    currentTodo.completed = !currentTodo.completed;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(currentTodo),
        headers: {
          "Content-Type": "application/json"
        }
      })
    } catch (error) {
      console.log(error)
    }

    setTodos(newTodos);
  }

  return (
    <div>
      <h1>Todos ({listType})</h1>

      <TodoList
        todos={todos}
        listType={listType}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />

      <input value={input} onChange={handleChange} />
      <button onClick={addToList}>Submit</button>

      <br />
      <br />

      <button onClick={() => setListType("all")}>All</button>
      <button onClick={() => setListType("complete")}>Completed</button>
      <button onClick={() => setListType("incomplete")}>Incomplete</button>
    </div>
  );
}
