import React from 'react';
import ReactDOM from 'react-dom/client'; // используем новую библиотеку для рендеринга
import { ThemeProvider } from '@gravity-ui/uikit';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

// Создаем root элемент
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme="dark">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
