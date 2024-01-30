import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

export default function Layout() {
  const location = useLocation();
  console.log({ location });
  return (
    <>
      <div className="container mx-auto max-w-screen-lg lg:max-w-screen-xs h-screen">
        <div className="relative flex flex-col h-full bg-[#F9F9FB] lg:max-h-[960px] ">
          {location.pathname === '/' && <NavBar />}
          <main className={`h-full px-3 pb-28 ${location.pathname === '/' ? ' rounded-t-3xl' : ''}`}>
            <Outlet />
          </main>
          <footer className={`bg-neutral-200 p-[1rem] ${location.pathname === '/' && 'absolute inset-x-0 bottom-0'}`}>
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
}
