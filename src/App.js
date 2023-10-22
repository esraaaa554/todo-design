import {React, useState} from 'react';
import TodoForm from './components/TodoForm';
import "./App.css";
import Todo from './components/Todo';



const App = () => {
  let [todos, setTodos] = useState([]);
  const [todoToShow, settodoToShow] = useState("all");
  const [toggleAllComplete, settoggleAllComplete] = useState(true);
  const addTodo = (todo) => {
        setTodos([todo, ...todos]);
  };
  const handleDelete =(id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  };

  const updateTodoToShow = (s) => {
      settodoToShow(s);
  };

  const removeAllTodosThatAreComplete = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };

  const toggleComplete = (id) => {
       setTodos (todos.map((todo) => {
        if (todo.id === id) {
             return {
              ...todo,
              complete : !todo.complete
             } 
             }else {
              return todo;
        }
       }))
  };

  if (todoToShow === "active") {
      todos = todos.filter((todo) => !todo.complete);
  }else if (todoToShow === "complete") {
     todos = todos.filter((todo) => todo.complete);
  }


  return (
    <div className='container'>
      <TodoForm onSubmit = {addTodo}/>
      {
        todos.map((todo) => (
          <Todo key={todo.id} todo ={todo} onDelete = { () => handleDelete(todo.id)} toggleComplete = {() => toggleComplete(todo.id)} />
           ))
      }
      <div>
        <button className='update-btn btn'onClick={() => updateTodoToShow("all")}>All</button>
        <button className='update-btn btn'onClick={() => updateTodoToShow("active")}>Active</button>
        <button className='update-btn btn'onClick={() => updateTodoToShow("complete")}>Complete</button>
      </div>
        {todos.some((todo) => todo.complete) ? (<button className='all-btn btn' onClick={removeAllTodosThatAreComplete}>Remove All Complete todos</button>) : null}
         <button className='all-btn btn' onClick={() => {
          setTodos (
            todos.map((todo) => ({
              ...todo,
              complete : toggleAllComplete
            }))
          )
         }}>Toggle All Complete  : {`${toggleAllComplete}`}</button>
    </div>
  )
}

export default App;

