import { Link } from 'react-router-dom';

export default function MainMenu() {
  return (
    <>
      <div className="flex justify-center">
        <p className="font-medium text-lg">Main menu</p>
      </div>
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
