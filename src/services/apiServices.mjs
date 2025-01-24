import axios from 'axios';

export const ACTIONS = {
  create: 'create',
  read: 'read',
  update: 'update',
  delete: 'delete',
};

export default async function serviceCall(action, formData, id) {
  const url = 'https://todobe-sonv.onrender.com/api/todos';

  switch (action) {
    case ACTIONS.create:
      return createTodo(url, formData);
    case ACTIONS.read:
      return getTodos(url);
    case ACTIONS.update:
      return updateTodo(url, id, formData);
    case ACTIONS.delete:
      return deleteTodo(url, id);
  }
}

async function getTodos(url) {
  try {
    let res = await axios.get(url);

    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function createTodo(url, formData) {
  try {
    const res = await axios.post(url, formData);

    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function updateTodo(url, id, formData) {
  try {
    let res = await axios.put(`${url}/${id}`, formData);

    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function deleteTodo(url, id) {
  try {
    let res = await axios.delete(`${url}/${id}`);

    return res.data;
  } catch (err) {
    console.error(err);
  }
}
