import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <h1>StockWatch (NavBar)</h1>
      <div className="container mx-auto px-2">
        <Outlet />
      </div>
      {/* <h2>Footer here</h2> */}

      {/* <Outlet /> */}
    </>
  );
}
