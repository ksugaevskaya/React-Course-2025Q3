'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../i18n/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocale();

  const handleLanguageSwitcher = () => {
    if (locale === 'en') {
      router.replace(pathname, { locale: 'ru' });
      router.refresh();
    } else {
      router.replace(pathname, { locale: 'en' });
      router.refresh();
    }
  };

  return (
    <div className="theme">
      <button onClick={handleLanguageSwitcher}>
        {locale === 'ru' ? '🇷🇺' : '🇬🇧'}
      </button>
    </div>
  );
}
