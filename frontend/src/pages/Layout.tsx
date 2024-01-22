import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <h1>StockWatch (NavBar)</h1>
      <Outlet />
      {/* <h2>Footer here</h2> */}

      {/* <Outlet /> */}
    </>
  );
}
