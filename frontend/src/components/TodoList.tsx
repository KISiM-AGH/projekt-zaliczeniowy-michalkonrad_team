import React from 'react';

// definiujemy interfejs dla pojedynczego zadania
interface Todo {
    id: number; // unikalny identyfikator zadania
    text: string; // treść zadania
    completed: boolean; // status ukończenia zadania
}

// definiujemy interfejs dla propsów komponentu TodoList
interface TodoListProps {
    todos: Todo[]; // lista zadań do wyświetlenia
    onToggle: (id: number) => void; // funkcja do zmiany statusu ukończenia zadania
    onDelete: (id: number) => void; // funkcja do usuwania zadania
}

// komponent TodoList, który wyświetla listę zadań
const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
    return (
        // kontener dla tabeli z zadaniami
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <table style={{ borderCollapse: 'collapse', width: '80%', maxWidth: '600px' }}>
                <thead>
                {/* nagłówki tabeli */}
                <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>#</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>Zadanie</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Zakończone</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {/* mapowanie zadań na wiersze tabeli */}
                {todos.map((todo, index) => (
                    <tr key={todo.id}>
                        {/* numer zadania */}
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{index + 1}</td>
                        {/* treść zadania */}
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{todo.text}</td>
                        {/* checkbox do oznaczania ukończenia zadania */}
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <input
                                type="checkbox"
                                checked={todo.completed} // sprawdzamy, czy zadanie jest ukończone
                                onChange={() => onToggle(todo.id)} // zmieniamy status ukończenia zadania
                            />
                        </td>
                        {/* przycisk do usunięcia zadania */}
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <button
                                onClick={() => onDelete(todo.id)} // wywołujemy funkcję usuwającą zadanie
                                style={{
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Usuń
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// eksportujemy komponent TodoList
export default TodoList;
