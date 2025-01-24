"use strict";

// funkcja pomocnicza do obsługi modułów ES
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });

// importujemy wymagane moduły
const express_1 = __importDefault(require("express")); // framework Express
const cors_1 = __importDefault(require("cors")); // middleware do obsługi CORS
const fs_1 = __importDefault(require("fs")); // moduł do pracy z plikami
const path_1 = __importDefault(require("path")); // moduł do pracy ze ścieżkami

// inicjalizacja aplikacji Express
const app = (0, express_1.default)();
const PORT = 5000; // port, na którym działa serwer

// ścieżka do pliku todos.json
const TODOS_FILE = path_1.default.join(__dirname, 'data', 'todos.json');

// middleware
app.use((0, cors_1.default)()); // obsługa CORS
app.use(express_1.default.json()); // parsowanie JSON z ciała żądań

// funkcja odczytująca dane z pliku JSON
const readTodosFromFile = () => {
    if (!fs_1.default.existsSync(TODOS_FILE)) {
        // jeśli plik nie istnieje, tworzymy go z pustą tablicą
        fs_1.default.writeFileSync(TODOS_FILE, JSON.stringify([]));
    }
    const data = fs_1.default.readFileSync(TODOS_FILE, 'utf-8'); // odczyt danych z pliku
    return JSON.parse(data); // parsowanie danych jako JSON
};

// funkcja zapisująca dane do pliku JSON
const writeTodosToFile = (todos) => {
    fs_1.default.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2)); // zapis z formatowaniem
};

// endpoint do pobrania wszystkich zadań
app.get('/todos', (req, res) => {
    const todos = readTodosFromFile(); // odczyt danych z pliku
    res.json(todos); // zwracamy listę zadań jako JSON
});

// endpoint do dodawania nowego zadania
app.post('/todos', (req, res) => {
    const { text } = req.body; // pobieramy tekst nowego zadania z ciała żądania
    const todos = readTodosFromFile(); // odczytujemy istniejące zadania
    const newTodo = { id: Date.now(), text, completed: false }; // tworzymy nowe zadanie
    todos.push(newTodo); // dodajemy zadanie do listy
    writeTodosToFile(todos); // zapisujemy zaktualizowaną listę do pliku
    res.status(201).json(newTodo); // zwracamy nowo dodane zadanie z kodem 201 (utworzono)
});

// endpoint do usuwania zadania
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params; // pobieramy ID zadania z parametru ścieżki
    let todos = readTodosFromFile(); // odczytujemy istniejące zadania
    todos = todos.filter((todo) => todo.id !== parseInt(id, 10)); // filtrujemy zadania, usuwając to o podanym ID
    writeTodosToFile(todos); // zapisujemy zaktualizowaną listę do pliku
    res.status(200).json({ message: 'Todo deleted' }); // zwracamy potwierdzenie usunięcia
});

// endpoint do zmiany statusu zadania
app.put('/todos/:id', (req, res) => {
    const { id } = req.params; // pobieramy ID zadania z parametru ścieżki
    const todos = readTodosFromFile(); // odczytujemy istniejące zadania
    const todo = todos.find((todo) => todo.id === parseInt(id, 10)); // znajdujemy zadanie o podanym ID
    if (todo) {
        todo.completed = !todo.completed; // zmieniamy status ukończenia zadania
        writeTodosToFile(todos); // zapisujemy zaktualizowaną listę do pliku
        res.json(todo); // zwracamy zaktualizowane zadanie
    } else {
        res.status(404).json({ message: 'Todo not found' }); // zwracamy błąd 404, jeśli zadanie nie istnieje
    }
});

// uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`); // informacja o uruchomieniu serwera
});
