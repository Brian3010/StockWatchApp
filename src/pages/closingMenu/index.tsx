import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';

export default function ClosingMenu() {
  return (
    <>
      <div className="flex border-b p-4">
        <BackButton className="mr-auto" to="../" />
        <p className="mr-auto font-medium">Closing Tasks</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="mt-10 rounded-md  border shadow-sm">
          <Link className="relative flex flex-col gap-1  p-5" to={`/boh-closing-tasks-menu/closing-tasks`}>
            <span className="font-medium">BOH Tasks</span>

            <div className="pr-inherit absolute right-0 top-1/2 -translate-y-1/2 transform ">
              <span className={`inline-block w-fit rounded-xl px-3  py-1 text-xs font-semibold text-gray-700`}>
                Not submited today
              </span>
            </div>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link
            className="inline-block rounded-xl bg-orange-300 p-2 shadow-sm"
            to={`/boh-closing-tasks-menu/submited-tasks-history`}
          >
            <span className="text-sm font-semibold">Yesterday Uploads</span>
          </Link>
          <Link
            className="inline-block rounded-xl bg-amber-300 p-2 shadow-sm "
            to={`/boh-closing-tasks-menu/submited-tasks-history`}
          >
            <span className="text-sm font-semibold ">Today Uploads</span>
          </Link>
        </div>
      </div>
    </>
  );
}
