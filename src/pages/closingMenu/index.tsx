import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';

export default function ClosingMenu() {
  return (
    <>
      <div className="flex border-b p-4">
        <BackButton className="mr-auto" to="../" />
        <p className="mr-auto font-medium">BOH Closing tasks</p>
      </div>
    </>
  );
}
