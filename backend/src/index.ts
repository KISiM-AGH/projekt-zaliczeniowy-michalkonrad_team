import express, { Request, Response } from 'express'; // import Express i typów
import cors from 'cors'; // import obsługi CORS
import fs from 'fs'; // import do pracy z plikami
import path from 'path'; // import do obsługi ścieżek plików

const app = express(); // inicjalizacja aplikacji Express
const PORT = 5000; // port, na którym działa serwer

// ścieżka do pliku `todos.json`
const TODOS_FILE_PATH = path.join(__dirname, 'data', 'todos.json');

// funkcja tworząca plik `todos.json` i katalog, jeśli nie istnieją
const ensureFileExists = () => {
    const dir = path.dirname(TODOS_FILE_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(TODOS_FILE_PATH)) {
        fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify([]));
    }
};

// funkcja do odczytu danych z pliku JSON
const readTodosFromFile = () => {
    ensureFileExists();
    const data = fs.readFileSync(TODOS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

// funkcja do zapisu danych do pliku JSON
const writeTodosToFile = (todos: any[]) => {
    ensureFileExists();
    fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(todos, null, 2));
};

// middleware
app.use(cors()); // Obsługa CORS
app.use(express.json()); // Parsowanie ciała żądań JSON

// endpoint: Pobierz wszystkie TODO
app.get('/todos', (req: Request, res: Response) => {
    const todos = readTodosFromFile();
    res.json(todos);
});

// endpoint: Dodaj nowe TODO
app.post('/todos', (req: Request, res: Response) => {
    const todos = readTodosFromFile();
    const newTodo = req.body;
    todos.push(newTodo);
    writeTodosToFile(todos);
    res.status(201).json(newTodo);
});

// endpoint: Usuń TODO po ID
app.delete('/todos/:id', (req: Request, res: Response) => {
    const todos = readTodosFromFile();
    const idToDelete = parseInt(req.params.id, 10);
    const filteredTodos = todos.filter((todo: { id: number; }) => todo.id !== idToDelete);
    writeTodosToFile(filteredTodos);
    res.status(204).send();
});

// uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});