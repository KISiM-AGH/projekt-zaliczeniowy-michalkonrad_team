import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import CompletedList from './components/CompletedList';
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
        axios.post('http://localhost:5000/todos', { text, completed: false }).then((response) => {
            setTodos([...todos, response.data]);
        });
    };

    const deleteTodo = (id: number) => {
        axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
            setTodos(todos.filter((todo) => todo.id !== id));
        });
    };

    const toggleTodo = (id: number, completed: boolean) => {
        axios.put(`http://localhost:5000/todos/${id}`, { completed }).then((response) => {
            setTodos(
                todos.map((todo) => (todo.id === id ? { ...todo, completed: response.data.completed } : todo))
            );
        });
    };

    const activeTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    return (
        <div>
            <div className="container">
                <h1>Lista Todo</h1>
                <AddTodo onAdd={addTodo} />
                <TodoList
                    todos={activeTodos}
                    onToggle={(id) => toggleTodo(id, true)}
                    onDelete={deleteTodo}
                />
                <CompletedList
                    completedTodos={completedTodos}
                    onUndo={(id) => toggleTodo(id, false)}
                />
            </div>
        </div>
    );
};

export default App;
