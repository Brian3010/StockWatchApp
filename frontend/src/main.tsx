import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorPage from './pages/error-page.tsx';
import MainMenu from './pages/MainMenu.tsx';
// import Root from './pages/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />,
    errorElement: <ErrorPage />,
    children: [{
      path: '/stock',
      element: <App/>,
    }],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
