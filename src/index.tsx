import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

const App = lazy(() => import('./App'));
const HashRouter = lazy(() => import('react-router-dom/HashRouter'))

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<>is loading?</>}>
   { <HashRouter>
    <App />
    </HashRouter>}
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
