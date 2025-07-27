import { Outlet } from 'react-router';
import App from './App';
import './App.css';

export default function SearchPage() {
  return (
    <div className="app-page-container">
      <div>
        <App />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
