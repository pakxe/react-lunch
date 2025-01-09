import { css, Global, ThemeProvider } from '@emotion/react';
import theme from './theme';
import { GlobalStyle } from './GlobalStyle';
import Layout from './components/Layout';
import { BottomSheetProvider } from './hooks/bottomSheets/useBottomSheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RestaurantsPage from './pages/RestaurantsPage';
import { Suspense } from 'react';

function App() {
  const queryClient = new QueryClient();

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
      `}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Global styles={GlobalStyle} />
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <BottomSheetProvider>
                <RestaurantsPage />
              </BottomSheetProvider>
            </Suspense>
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
