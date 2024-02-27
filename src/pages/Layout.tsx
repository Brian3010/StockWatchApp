import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <div className={`pt-safe-top mx-auto h-screen bg-gami-primary xl:h-[950px] xl:max-w-screen-xs`}>
        <div className="relative flex min-h-full flex-col bg-[#F9F9FB] xl:h-full ">
          {location.pathname === '/' && <NavBar />}
          {/* <main className={`min-h-screen px-3 pb-20 xl:h-full ${location.pathname === '/' ? 'rounded-t-3xl' : ''}`}> */}
          <main className={`h-full px-3 pb-20 xl:h-full ${location.pathname === '/' ? 'rounded-t-3xl' : ''}`}>
            <Outlet />
          </main>
          {/* {location.pathname === '/' && (
            <footer className={`bg-neutral-200 p-3 ${location.pathname === '/' && 'absolute inset-x-0 bottom-0'}`}>
              <Footer />
            </footer>
          )} */}
        </div>
      </div>
    </>
  );
}
