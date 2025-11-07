import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchTasks = async (query) => {
    if (!query.trim()) {
      fetchTasks();
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/search?q=${encodeURIComponent(query)}`);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to search tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
      setTasks([response.data, ...tasks]);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, updatedTask) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (id, completed) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.patch(`${API_BASE_URL}/tasks/${id}/status`, { completed });
      setTasks(tasks.map(task => task._id === id ? response.data : task));
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List App</h1>
      </header>
      <main>
        <TaskForm onAddTask={addTask} />
        <SearchBar onSearch={searchTasks} />
        {error && <p className="error">{error}</p>}
        {loading ? <p>Loading...</p> : <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} onToggleStatus={toggleTaskStatus} />}
      </main>
    </div>
  );
}

export default App;
