import { Link } from 'react-router-dom';
function App() {
  return (
    <>
      <div>
        <Link to="/main-menu/stocks">Stock Lists</Link>
      </div>
      <div>
        <Link to="/main-menu/stock-history">Stock History</Link>
      </div>
    </>
  );
}

export default App;
