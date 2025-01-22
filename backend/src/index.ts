import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

// Ścieżka do pliku todos.json
const TODOS_FILE_PATH = path.join(__dirname, 'data', 'todos.json');

// Upewnij się, że plik i folder istnieją
const ensureFileExists = () => {
    const dir = path.dirname(TODOS_FILE_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(TODOS_FILE_PATH)) {
        fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify([]));
    }
};

// Wczytaj dane z pliku JSON
const readTodosFromFile = () => {
    ensureFileExists();
    const data = fs.readFileSync(TODOS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

// Zapisz dane do pliku JSON
const writeTodosToFile = (todos: any[]) => {
    ensureFileExists();
    fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(todos, null, 2));
};

// Middleware
app.use(cors());
app.use(express.json());

// Endpointy
app.get('/todos', (req: Request, res: Response) => {
    const todos = readTodosFromFile();
    res.json(todos);
});

app.post('/todos', (req: Request, res: Response) => {
    const todos = readTodosFromFile();
    const newTodo = req.body;
    todos.push(newTodo);
    writeTodosToFile(todos);
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req: Request, res: Response) => {
    const todos = readTodosFromFile();
    const idToDelete = parseInt(req.params.id, 10);
    const filteredTodos = todos.filter((todo: { id: number; }) => todo.id !== idToDelete);
    writeTodosToFile(filteredTodos);
    res.status(204).send();
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});