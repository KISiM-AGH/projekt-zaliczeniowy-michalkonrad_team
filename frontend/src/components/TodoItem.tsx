import React from 'react'; // importujemy React

// definiujemy interfejs dla propsów TodoItem
interface TodoItemProps {
    id: number; // unikalny identyfikator zadania
    text: string; // treść zadania
    completed: boolean; // status ukończenia zadania
    onToggle: (id: number) => void; // funkcja do przełączania statusu zadania (ukończone / nieukończone)
    onDelete: (id: number) => void; // funkcja do usuwania zadania
}

// komponent TodoItem, który wyświetla pojedyncze zadanie
const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
    return (
        // kontener dla elementu listy z zadaniem
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                // checkbox do oznaczenia zadania jako ukończone
                <input
                    type="checkbox"
                    checked={completed} // sprawdzamy, czy zadanie jest ukończone
                    onChange={() => onToggle(id)} // wywołujemy funkcję onToggle przy zmianie statusu
                    style={{ marginRight: '8px' }} // dodajemy margines do prawej strony
                />
                // tekst zadania, który jest przekreślony, jeśli zadanie jest ukończone
                <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</span>
            </div>
            // przycisk do usunięcia zadania
            <button onClick={() => onDelete(id)} style={{ marginLeft: '16px' }}>
                Usuń
            </button>
        </div>
    );
};

export default TodoItem; // eksportujemy komponent TodoItem