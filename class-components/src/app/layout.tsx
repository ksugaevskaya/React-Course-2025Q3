import type { Metadata } from 'next';
import { ThemeProvider } from '../context/theme';
import ThemeComponent from '../components/theme-component/theme-component';
import Providers from './[locale]/providers';
import { getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import LanguageSwitcher from '../components/locale-switcher/LocaleSwitcher';
import './layout.css';

export const metadata: Metadata = {
  title: 'Pokemon search',
  description: 'Pokemon search',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <NextIntlClientProvider>
            <Providers>
              <ThemeProvider>
                <div className="languageButton">
                  <ThemeComponent></ThemeComponent>
                  <LanguageSwitcher></LanguageSwitcher>
                </div>
                {children}
              </ThemeProvider>
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
