import { Link } from 'react-router-dom';
function App() {
  return (
    <>
      <div>
        <p className='font-medium text-lg'>Menu</p>
        <div>
          <Link to="/main-menu/stocks">Stock Lists</Link>
        </div>
        <div>
          <Link to="/main-menu/stock-history">Stock History</Link>
        </div>
      </div>
    </>
  );
}

export default App;
