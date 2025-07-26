import { Outlet } from 'react-router';
import App from './App';

export default function SearchPage() {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <App />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
