import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './pages/app/AppPage.tsx';
import ErrorBoundary from './components/error-boundary/error-boundary.tsx';
import About from './pages/about/about-component.tsx';
import NotFound from './pages/not-found/not-found-component.tsx';
import Details from './pages/details/details.tsx';
import { ThemeProvider } from './context/theme.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/:pageId" element={<App />}>
                <Route path=":pokemonId" element={<Details />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </StrictMode>
  );
}
