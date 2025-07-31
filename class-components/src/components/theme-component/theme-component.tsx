import { useTheme } from '../../context/theme';
import './theme-component.css';

export default function ThemeComponent() {
  const { toggleTheme, darkMode } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}> Switch theme </button>
    </div>
  );
}
