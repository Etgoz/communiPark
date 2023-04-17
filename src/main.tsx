import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'react-bootstrap';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider dir='rtl'>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
