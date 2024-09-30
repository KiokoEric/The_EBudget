import './index.css';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import Theme from './Components/Theme/Theme.ts';
import { BrowserRouter } from "react-router-dom";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add the imported icons to the library
library.add(fas);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SnackbarProvider>
      <ThemeProvider theme={Theme} >
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </BrowserRouter>
)
