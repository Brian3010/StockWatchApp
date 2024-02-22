import { Link } from 'react-router-dom';
import FlashMessage from '../../components/FlashMessage';
import Heading from '../../components/Heading';
import { TODAY_DATE, YESTERDAY_DATE } from '../../firebase';

export default function ClosingMenu() {
  return (
    <>
      <Heading to="../" headerName="Closing Checklists" />

      <div className="flex flex-col gap-2">
        <div className="mt-10 rounded-md  border shadow-sm">
          <Link className="relative flex flex-col gap-1  p-5" to={`/boh-closing-tasks-menu/closing-tasks`}>
            <span className="font-medium">BOH Checklist</span>

            <div className="pr-inherit absolute right-0 top-1/2 -translate-y-1/2 transform ">
              <span className={`inline-block w-fit rounded-xl px-3  py-1 text-xs font-semibold text-gray-700`}>
                Not submited today
              </span>
            </div>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link
            className="inline-block rounded-2xl bg-orange-200 p-2 text-orange-950 shadow-sm"
            to={`/boh-closing-tasks-menu/submited-tasks-history/${YESTERDAY_DATE}`}
          >
            <span className="text-sm font-semibold">Yesterday Uploads</span>
          </Link>
          <Link
            className="inline-block rounded-2xl bg-amber-200 p-2  text-amber-950 shadow-sm "
            to={`/boh-closing-tasks-menu/submited-tasks-history/${TODAY_DATE}`}
          >
            <span className="text-sm font-semibold">Today Uploads</span>
          </Link>
        </div>
      </div>
      <FlashMessage />
    </>
  );
}
