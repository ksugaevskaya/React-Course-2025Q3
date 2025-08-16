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
    } else {
      router.replace(pathname, { locale: 'en' });
    }
  };

  return (
    <>
      <button onClick={handleLanguageSwitcher}> {locale}</button>
    </>
  );
}
