import BackButton from './BackButton';

interface HeadingProps {
  to: string;
  headerName: string;
}

export default function Heading({ to, headerName }: HeadingProps) {
  return (
    <div className="flex border-b pt-2 pb-3 px-5 bg-gami-primary absolute inset-x-0">
      <BackButton className="mr-auto" to={to} />
      <p className="mr-auto text-xl text-gami-text font-semibold">{headerName}</p>
    </div>
  );
}
