import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import axios from 'axios';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/todos').then((response) => {
            setTodos(response.data);
        });
    }, []);

    const addTodo = (text: string) => {
        axios.post('http://localhost:5000/todos', { text }).then((response) => {
            setTodos([...todos, response.data]);
        });
    };

    const deleteTodo = (id: number) => {
        axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
            setTodos(todos.filter((todo) => todo.id !== id));
        });
    };

    const toggleTodo = (id: number) => {
        axios.put(`http://localhost:5000/todos/${id}`).then((response) => {
            setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
        });
    };

    return (
        <div style={{ padding: '16px' }}>
            <h1>Lista Todo</h1>
            <AddTodo onAdd={addTodo} />
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>
    );
};

export default App;