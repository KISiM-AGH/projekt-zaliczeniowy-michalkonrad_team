import React from 'react';

interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                    style={{ marginRight: '8px' }}
                />
                <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</span>
            </div>
            <button onClick={() => onDelete(id)} style={{ marginLeft: '16px' }}>
                Usuń
            </button>
        </div>
    );
};

export default TodoItem;
