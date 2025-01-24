import { useState, useEffect } from 'react';
import ListItem from './components/ListItem';
import Form from './components/Form';
import serviceCall, { ACTIONS } from './services/apiServices.mjs';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get('http://localhost:3000/api/todos');
        setTodos(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    
    getData()
  }, []);

  let list = () =>
    todos.map((todo) => {
      return <ListItem key={todo._id} todo={todo} todos={todos} setTodos={setTodos} />;
    });

  return (
    <main>
      <h1>Todo List:</h1>
      <Form setTodos={setTodos} todos={todos} />
      <div>{todos ? list() : <p>Nothing Todo...</p>}</div>
    </main>
  );
}

export default App;
