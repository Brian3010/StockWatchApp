import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <div className="container max-w-screen-xs mx-auto">
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-gami-primary">
          <div className="flex w-full flex-wrap items-center justify-center p-1">
            <div>
              <a className="mx-2 my-1 flex items-center" href="/">
                <span className="font-medium text-lg">Stock Watch (Gami Hawthorn)</span>
              </a>
            </div>
          </div>
        </nav>
        <div className="px-3 py-5">
          <Outlet />
        </div>
      </div>
      {/* <h2>Footer here</h2> */}
    </>
  );
}
