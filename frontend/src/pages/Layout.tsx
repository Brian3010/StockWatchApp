import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Layout() {
  const location = useLocation();
  console.log({ location });
  return (
    <>
      <div className="relavtive container relative mx-auto flex min-h-screen max-w-screen-lg flex-col bg-gami-primary">
        {location.pathname === '/' && <NavBar />}
        <main
          className={`min-h-screen bg-[#F9F9FB] px-3 pb-28 ${location.pathname === '/' && 'min-h-[calc(100vh-64px)] rounded-t-3xl'}`}
        >
          <Outlet />
        </main>
        <footer className={`bg-[#E5E5E5] p-[2rem] ${location.pathname === '/' && 'absolute inset-x-0 bottom-0'}`}>
          <div>Footer here</div>
        </footer>
      </div>
    </>
  );
}
