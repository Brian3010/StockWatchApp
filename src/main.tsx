import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppMenu from './App.tsx';
import { FlashMessageProvider } from './context/FlashMessageProvider.tsx';
import './index.css';
import ClosingMenu from './pages/closingMenu/index.tsx';
import ClosingTasks from './pages/ClosingTasks/index.tsx';
import ErrorPage from './pages/error-page.tsx';
import Layout from './pages/Layout.tsx';
import StockHistory from './pages/stockHistory/index.tsx';
import StockList from './pages/StockLists/index.tsx';
import StockMenu from './pages/stockMenu';
// import Root from './pages/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,

    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <AppMenu />,
          },
          {
            path: '/stocks',
            element: <StockMenu />,
          },
          {
            path: '/stocks/:category',
            element: <StockList />,
          },
          {
            path: '/stock-history',
            element: <StockHistory />,
          },
          {
            path: '/boh-closing-tasks-menu',
            element: <ClosingMenu />,
          },
          {
            path: '/boh-closing-tasks-menu/closing-tasks',
            element: <ClosingTasks />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FlashMessageProvider>
      <RouterProvider router={router} />
    </FlashMessageProvider>
    {/* <App /> */}
  </React.StrictMode>,
);
