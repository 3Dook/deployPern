import React from "react";
import './App.css';

//components
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <div>
      <div className="container">
        <InputTodo/>
        <ListTodo/>
      </div>
    </div>
  );
}

export default App;
