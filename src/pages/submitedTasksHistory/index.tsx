import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const images = [
  'https://images.unsplash.com/photo-1707910090015-01bb56aa94df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1707757112182-5167a5e17444?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1674205710296-606898df6642?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1707638121146-c0a0178a3e47?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1706530664711-ad4704cd27f1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1707909123862-d230b874c073?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
export default function SubmitedTasksHistory() {
  const { DATE } = useParams();
  console.log({ DATE });

  return (
    <>
      <div className="flex border-b p-4">
        <BackButton className="mr-auto" to="/boh-closing-tasks-menu" />
        <p className="mr-auto font-medium">BOH Closing Tasks</p>
      </div>

      {/** Content */}
      <div className="xl:scrollbar-hide mb-3 pt-10 xl:h-[750px] xl:overflow-scroll">
        <table className="w-full text-left">
          <thead>
            <tr className="border">
              <th scope="col" className="border px-4 py-3 text-left">
                Task
              </th>
              <th scope="col" className="px-4 py-3 text-left ">
                Image
              </th>
            </tr>
          </thead>
          <tbody className="overflow-scroll">
            {images.map((img, index) => (
              <tr key={index} className="border-blue-gray-200 border">
                <td className="min-w-24 border p-1 font-medium">Fryer 1 completely off</td>
                <td className="p-1 ">
                  <img src={img} alt="image task" className="aspect-[9/16] h-full w-full object-fill" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/** ===========*/}
    </>
  );
}
