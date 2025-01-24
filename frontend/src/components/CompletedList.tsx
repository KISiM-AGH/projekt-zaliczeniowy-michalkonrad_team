import React from 'react'; // importujemy React

// definiujemy interfejs dla pojedynczego zadania
interface Todo {
    id: number; // unikalny identyfikator zadania
    text: string; // treść zadania
    completed: boolean; // status ukończenia zadania
}

// definiujemy interfejs dla propsów komponentu CompletedList
interface CompletedListProps {
    completedTodos: Todo[]; // lista ukończonych zadań
    onUndo: (id: number) => void; // funkcja do przywracania zadania na listę nieukończonych
}

// komponent wyświetlający listę ukończonych zadań
const CompletedList: React.FC<CompletedListProps> = ({ completedTodos, onUndo }) => {
    return (
        // kontener dla listy ukończonych zadań
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <h2 style={{ color: '#4CAF50' }}>Ukończone zadania</h2>
            {/* tabela wyświetlająca ukończone zadania */}
            <table style={{ borderCollapse: 'collapse', width: '80%', maxWidth: '600px', margin: '0 auto' }}>
                <thead>
                {/* nagłówki tabeli */}
                <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>#</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd' }}>Zadanie</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {/* mapowanie ukończonych zadań na wiersze tabeli */}
                {completedTodos.map((todo, index) => (
                    <tr key={todo.id}>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{index + 1}</td>
                        {/* wyświetlanie tekstu zadania z przekreśleniem */}
                        <td style={{ padding: '12px', border: '1px solid #ddd', textDecoration: 'line-through' }}>
                            {todo.text}
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                            {/* przycisk do przywrócenia zadania */}
                            <button
                                onClick={() => onUndo(todo.id)} // wywołanie funkcji onUndo z ID zadania
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