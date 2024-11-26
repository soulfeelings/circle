import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {worker} from "./lib/mocks/msw.ts";

if (process.env.NODE_ENV === 'development' && localStorage.getItem('mocked')) {
    worker.start();
}

createRoot(document.getElementById('root')!).render(
    <App/>
)
