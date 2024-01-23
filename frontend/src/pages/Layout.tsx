import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <h1>StockWatch (NavBar)</h1>
      <div className="p-2 max-w-sm">
        <Outlet />
      </div>
      {/* <h2>Footer here</h2> */}

      {/* <Outlet /> */}
    </>
  );
}
