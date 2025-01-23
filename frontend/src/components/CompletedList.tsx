import React from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface CompletedListProps {
    completedTodos: Todo[];
    onUndo: (id: number) => void;
}

const CompletedList: React.FC<CompletedListProps> = ({ completedTodos, onUndo }) => {
    return (
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <h2 style={{ color: '#4CAF50' }}>Ukończone zadania</h2>
            <table style={{ borderCollapse: 'collapse', width: '80%', maxWidth: '600px', margin: '0 auto' }}>
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>#</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>Zadanie</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {completedTodos.map((todo, index) => (
                    <tr key={todo.id}>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{index + 1}</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textDecoration: 'line-through' }}>
                            {todo.text}
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <button
                                onClick={() => onUndo(todo.id)}
                                style={{
                                    backgroundColor: '#2196F3',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Przywróć
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompletedList;
