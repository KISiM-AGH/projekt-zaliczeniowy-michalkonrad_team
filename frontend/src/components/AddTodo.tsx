import React, { useState } from 'react'; //importujemy React i hook useState

// definiujemy typy dla propsów komponentu
interface AddTodoProps {
    onAdd: (text: string) => void; // funkcja przekazana w propsach do dodawania nowego elementu
}

// komponent AddTodo, który zawiera pole tekstowe i przycisk do dodawania nowych elementów
const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [text, setText] = useState(''); // stan przechowujący wartość wpisaną w polu tekstowym

    // funkcja obsługująca wysyłanie formularza
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // zatrzymujemy domyślne działanie formularza
        if (text.trim()) { // sprawdzamy, czy użytkownik wpisał jakiś tekst
            onAdd(text); // wywołujemy funkcję przekazaną w propsach z tekstem z inputa
            setText(''); // czyścimy pole tekstowe po dodaniu
        }
    };

    return (
        // formularz do dodawania nowych elementów
        <form
            onSubmit={handleSubmit} // przypisujemy funkcję obsługującą wysłanie formularza
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
            }}
        >
            <input
                type="text"
                value={text} // powiązanie wartości inputa z wartością stanu
                onChange={(e) => setText(e.target.value)} // aktualizacja stanu przy zmianie wartości w input
                placeholder="Dodaj nowe zadanie" // tekst podpowiedzi w polu tekstowym
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '10px',
                    width: '300px',
                }}
            />
            <button
                type="submit" // typ przycisku ustawiony jako submit, co powoduje wysłanie formularza
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Dodaj
            </button>
        </form>
    );
};

export default AddTodo;