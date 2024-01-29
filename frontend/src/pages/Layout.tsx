import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Layout() {
  const location = useLocation();
  console.log({ location });
  return (
    <>
      <div className="container mx-auto max-w-screen-lg ">
        {location.pathname === '/' && <NavBar />}
        <main className="h-lvh bg-[#F9F9FB] px-3">
          <Outlet />
        </main>
        <footer>Footer here</footer>
      </div>
    </>
  );
}
