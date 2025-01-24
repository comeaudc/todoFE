import './listItem.css';
import { useState, useEffect } from 'react';
import serviceCall, { ACTIONS } from '../services/apiServices.mjs';


const ListItem = ({ todo, todos, setTodos }) => {
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({ ...todo });

  async function handleCheckChange(e) {
    const updatedTodo = { ...todo, complete: e.target.checked };

    await serviceCall(ACTIONS.update, updatedTodo, todo._id);

    setTodos((prevTodos) =>
      prevTodos.map((td) => (td._id === todo._id ? updatedTodo : td))
    );
  }

  async function handleSave() {
    try {
      let res = await serviceCall(ACTIONS.update, formData, todo._id);
      setUpdate((u) => !u);

      let newList = todos.map((td) => (td._id === todo._id ? res : td));

      setTodos(newList);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setFormData({ ...todo });
  }, [todo]);

  async function handleDelete() {
    try {
      await serviceCall(ACTIONS.delete, null, todo._id);

      let filteredTodos = todos.filter((td) => td._id !== todo._id);

      setTodos(filteredTodos);
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, desc: e.target.value });
  }

  return (
    <div id='item-cont'>
      {update ? (
        <>
          <input type='text' value={formData.desc} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {' '}
          <input
            onChange={handleCheckChange}
            type='checkbox'
            checked={todo.complete}
          />
          <h3>{todo.desc}</h3>
          <button disabled={todo.complete} onClick={() => setUpdate((u) => !u)}>
            Edit
          </button>{' '}
          <button onClick={handleDelete} disabled={!todo.complete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default ListItem;
