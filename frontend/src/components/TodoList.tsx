import React from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <table style={{ borderCollapse: 'collapse', width: '80%', maxWidth: '600px' }}>
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>#</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>Zadanie</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Zakończone</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo, index) => (
                    <tr key={todo.id}>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{index + 1}</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{todo.text}</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => onToggle(todo.id)}
                            />
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <button
                                onClick={() => onDelete(todo.id)}
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

export default TodoList;
