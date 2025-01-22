"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 5000;
const TODOS_FILE = path_1.default.join(__dirname, 'data', 'todos.json');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Odczyt z pliku JSON
const readTodosFromFile = () => {
    if (!fs_1.default.existsSync(TODOS_FILE)) {
        fs_1.default.writeFileSync(TODOS_FILE, JSON.stringify([]));
    }
    const data = fs_1.default.readFileSync(TODOS_FILE, 'utf-8');
    return JSON.parse(data);
};
// Zapis do pliku JSON
const writeTodosToFile = (todos) => {
    fs_1.default.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
};
// Pobranie wszystkich zadań
app.get('/todos', (req, res) => {
    const todos = readTodosFromFile();
    res.json(todos);
});
// Dodanie nowego zadania
app.post('/todos', (req, res) => {
    const { text } = req.body;
    const todos = readTodosFromFile();
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    writeTodosToFile(todos);
    res.status(201).json(newTodo);
});
// Usuwanie zadania
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    let todos = readTodosFromFile();
    todos = todos.filter((todo) => todo.id !== parseInt(id, 10));
    writeTodosToFile(todos);
    res.status(200).json({ message: 'Todo deleted' });
});
// Zmiana statusu zadania
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todos = readTodosFromFile();
    const todo = todos.find((todo) => todo.id === parseInt(id, 10));
    if (todo) {
        todo.completed = !todo.completed;
        writeTodosToFile(todos);
        res.json(todo);
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
