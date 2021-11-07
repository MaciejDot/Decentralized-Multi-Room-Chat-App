import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

const App = lazy(() => import('./App'));

ReactDOM.render(
    <Suspense fallback={<>is loading?</>}>
   { 
    <App />}
    </Suspense>,
  document.getElementById('root')
);
