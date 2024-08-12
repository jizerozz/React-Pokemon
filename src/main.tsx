import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './Router';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Router />);
} else {
  console.error('Root element not found');
}
