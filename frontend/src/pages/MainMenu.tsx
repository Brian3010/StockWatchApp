import { Outlet } from 'react-router-dom';

export default function MainMenu() {
  return (
    <>
      <h1>StockWatch</h1>
      {/* <div>display a menu including stock count and endday check</div> */}
      <Outlet />
    </>
  );
}
