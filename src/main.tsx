import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { validateEnv } from './utils/validateEnv.ts';

try {
	validateEnv();
} catch (error) {
	console.error(error);
	throw new Error('Ошибка загрузки переменных окружения');
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
