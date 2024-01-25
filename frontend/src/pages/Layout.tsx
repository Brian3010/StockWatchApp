import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Layout() {
  return (
    <>
      <div className="container max-w-screen-lg mx-auto ">
        <NavBar />
        <main className="px-3 h-lvh bg-[#F9F9FB]">
          <Outlet />
        </main>
        <footer>Footer here</footer>
      </div>
    </>
  );
}
