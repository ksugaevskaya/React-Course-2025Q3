import './about.css';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../../components/locale-switcher/LocaleSwitcher';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function About() {
  const t = useTranslations('AboutPage');
  return (
    <>
      <LanguageSwitcher />
      <div className="card-container">
        <div>
          {' '}
          <Image
            alt="girl smiling"
            className="KG-image"
            width={300}
            height={300}
            src="/images/KG.png"
          />
        </div>
        <div className="text-container">
          <a
            href="https://github.com/ksugaevskaya"
            rel="noreferrer"
            target="_blank"
            data-testid="github-link"
          >
            <div className="name">{t('title')} </div>
          </a>

          <div className="text">{t('description')}</div>
        </div>
      </div>
      <a
        href="https://rs.school/courses/reactjs"
        rel="noreferrer"
        target="_blank"
        data-testid="rss-github-link"
      >
        <div className="rs-logo">
          <Image alt="logo" height={50} width={50} src="/images/rss-logo.svg" />
        </div>
      </a>
    </>
  );
}
