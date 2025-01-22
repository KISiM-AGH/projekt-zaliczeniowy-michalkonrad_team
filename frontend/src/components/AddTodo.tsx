import React, { useState } from 'react';

interface AddTodoProps {
    onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Dodaj nowe zadanie"
                style={{ marginRight: '8px' }}
            />
            <button type="submit">Dodaj</button>
        </form>
    );
};

export default AddTodo;
