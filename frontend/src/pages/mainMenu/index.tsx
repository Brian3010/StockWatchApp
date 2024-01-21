import { Link } from 'react-router-dom';

export default function MainMenu() {
  return (
    <>
      <div>display a menu including stock count and enddate check, stock report</div>
      {/* <Outlet /> */}
      <div>
        <Link to="/main-menu/stocks">Stock Lists</Link>
      </div>
      <div>
        <Link to="/main-menu/stock-history">Stock History</Link>
      </div>
    </>
  );
}
