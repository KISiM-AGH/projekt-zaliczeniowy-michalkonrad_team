import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Plik App.tsx w tym samym folderze
import reportWebVitals from './reportWebVitals'; // Plik reportWebVitals.ts w tym samym folderze

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();