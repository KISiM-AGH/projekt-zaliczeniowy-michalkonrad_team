/* importujemy React oraz hooki useState i useEffect */
import React, { useState, useEffect } from 'react';

/* import komponentów do wyświetlania listy zadań, dodawania nowych zadań i listy ukończonych */
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import CompletedList from './components/CompletedList';

/* importujemy bibliotekę axios do obsługi zapytań HTTP */
import axios from 'axios';

/* definiujemy typ dla pojedynczego zadania */
type Todo = {
    id: number; /* unikalny identyfikator zadania */
    text: string; /* treść zadania */
    completed: boolean; /* status ukończenia zadania */
};

/* główny komponent aplikacji */
const App: React.FC = () => {
    /* stan przechowujący listę zadań */
    const [todos, setTodos] = useState<Todo[]>([]);

    /* używamy useEffect do pobrania danych z serwera po załadowaniu aplikacji */
    useEffect(() => {
        axios.get('http://localhost:5000/todos').then((response) => {
            setTodos(response.data); /* ustawiamy listę zadań na podstawie odpowiedzi z serwera */
        });
    }, []); /* pusty array powoduje, że efekt uruchomi się tylko raz */

    /* funkcja dodająca nowe zadanie */
    const addTodo = (text: string) => {
        axios.post('http://localhost:5000/todos', { text, completed: false }).then((response) => {
            setTodos([...todos, response.data]); /* dodajemy nowe zadanie do istniejącej listy */
        });
    };

    /* funkcja usuwająca zadanie na podstawie ID */
    const deleteTodo = (id: number) => {
        axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
            setTodos(todos.filter((todo) => todo.id !== id)); /* filtrujemy listę i usuwamy zadanie */
        });
    };

    /* funkcja przełączająca status zadania (ukończone / nieukończone) */
    const toggleTodo = (id: number, completed: boolean) => {
        axios.put(`http://localhost:5000/todos/${id}`, { completed }).then((response) => {
            setTodos(
                todos.map((todo) =>
                    todo.id === id ? { ...todo, completed: response.data.completed } : todo /* aktualizujemy status zadania */
                )
            );
        });
    };

    /* lista aktywnych (nieukończonych) zadań */
    const activeTodos = todos.filter((todo) => !todo.completed);

    /* lista ukończonych zadań */
    const completedTodos = todos.filter((todo) => todo.completed);

    return (
        /* główny interfejs aplikacji */
        <div>
            <div className="container">
                <h1>Lista Todo</h1> {/* nagłówek aplikacji */}
                <AddTodo onAdd={addTodo} /> {/* komponent do dodawania nowych zadań */}
                <TodoList
                    todos={activeTodos} /* przekazujemy listę aktywnych zadań */
                    onToggle={(id) => toggleTodo(id, true)} /* przekazujemy funkcję zmieniającą status na ukończony */
                    onDelete={deleteTodo} /* przekazujemy funkcję usuwającą zadanie */
                />
                <CompletedList
                    completedTodos={completedTodos} /* przekazujemy listę ukończonych zadań */
                    onUndo={(id) => toggleTodo(id, false)} /* przekazujemy funkcję przywracającą zadanie jako aktywne */
                />
            </div>
        </div>
    );
};

/* eksportujemy główny komponent aplikacji */
export default App;
