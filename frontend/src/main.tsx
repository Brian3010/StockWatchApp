import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorPage from './pages/error-page.tsx';
import Layout from './pages/Layout.tsx';
import MainMenu from './pages/mainMenu/index.tsx';
import StockList from './pages/StockLists/index.tsx';
// import Root from './pages/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainMenu />,
      },
      {
        path: '/main-menu/stocks',
        element: <App />,
      },
      {
        path: '/main-menu/stocks/:category',
        element: <StockList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
