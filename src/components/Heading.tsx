import BackButton from './BackButton';

interface HeadingProps {
  to: string;
  headerName: string;
}

export default function Heading({ to, headerName }: HeadingProps) {
  return (
    <div className="flex border-b p-4">
      <BackButton className="mr-auto" to={to} />
      <p className="mr-auto text-lg font-bold">{headerName}</p>
    </div>
  );
}
