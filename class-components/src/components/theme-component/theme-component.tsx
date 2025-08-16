'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/theme';
import './theme-component.css';

export default function ThemeComponent() {
  const { toggleTheme } = useTheme();
  const t = useTranslations('MainPage');
  return (
    <div className="theme">
      <button onClick={toggleTheme}> {t('switch')}</button>
    </div>
  );
}
