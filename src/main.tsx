import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

async function enableMocking() {
  const { worker } = await import('./mocks/browser.js');

  if (import.meta.env.MODE === 'development') {
    // 개발 환경에서는 기본 경로 사용
    return worker.start();
  } else if (import.meta.env.MODE === 'production') {
    // 프로덕션 환경에서는 GitHub Pages 경로에 맞게 설정
    return worker.start({
      serviceWorker: {
        url: '/react-lunch/mockServiceWorker.js', // GitHub Pages 경로
      },
    });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
