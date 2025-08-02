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
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ThemeComponent from './components/theme-component/theme-component.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>
            <ThemeComponent></ThemeComponent>
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
      </Provider>
    </StrictMode>
  );
}
