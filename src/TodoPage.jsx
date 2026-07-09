import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';

function TodoPage({ theme, toggleTheme, setIsLoggedIn }) {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (!task.trim()) return;
    setTodos([...todos, task]);
    setTask('');
  };

  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setEditIndex(index);
    setTask(todos[index]);
  };

  const saveEdit = () => {
    if (!task.trim()) return;
    const updated = todos.map((t, i) => (i === editIndex ? task : t));
    setTodos(updated);
    setTask('');
    setEditIndex(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        <i className={theme === 'light' ? 'ti ti-moon' : 'ti ti-sun'}></i>
      </button>

      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>

      <h1 className="title">TO DO List</h1>

      <Link to="/watches" className="nav-link">
        View Watch List →
      </Link>

      <input
        type="text"
        className="input"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') editIndex !== null ? saveEdit() : addTask();
        }}
      />

      <button className="btn-add" onClick={editIndex !== null ? saveEdit : addTask}>
        {editIndex !== null ? 'Save' : 'Add Task'}
      </button>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span>{todo}</span>
            <div className="btn-group">
              <button className="btn-delete" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button className="btn-edit" onClick={() => editTask(index)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;