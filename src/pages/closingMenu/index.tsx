import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';

export default function ClosingMenu() {
  return (
    <>
      <div className="flex border-b p-4">
        <BackButton className="mr-auto" to="../" />
        <p className="mr-auto font-medium">BOH Closing tasks</p>
      </div>

      <div className="mt-10 rounded-md border">
        <Link className="relative flex flex-col gap-1 border-b p-5" to={`/boh-closing-tasks-menu/closing-tasks`}>
          <span className="font-medium">Closing Tasks</span>

          <span className={`inline-block w-fit rounded-xl bg-gami-primary px-3  py-1 text-xs font-medium`}>
            Not yet updated today
          </span>
          <div className="pr-inherit absolute right-0 top-1/2 -translate-y-1/2 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className=" h-6 w-6 text-gami-link"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </Link>
        <Link className="relative flex flex-col gap-1 border-b p-5" to={`/boh-closing-tasks-menu/submited-tasks`}>
          <span className="font-medium">Submited tasks</span>

          <span className={`inline-block w-fit rounded-xl bg-gami-primary px-3  py-1 text-xs font-medium`}>
            Not yet updated today
          </span>
          <div className="pr-inherit absolute right-0 top-1/2 -translate-y-1/2 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className=" h-6 w-6 text-gami-link"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </Link>
      </div>
    </>
  );
}
