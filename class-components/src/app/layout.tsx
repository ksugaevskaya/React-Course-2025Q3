import type { Metadata } from 'next';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../context/theme';
import ErrorBoundary from '../components/error-boundary/error-boundary';
import ThemeComponent from '../components/theme-component/theme-component';
import Providers from './[locale]/providers';
import { getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

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
                <>
                  <ThemeComponent></ThemeComponent>
                  {children}
                </>
              </ThemeProvider>
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
