import BackButton from './BackButton';

interface HeadingProps {
  to: string;
  headerName: string;
}

export default function Heading({ to, headerName }: HeadingProps) {
  return (
    <div className="absolute inset-x-0 flex border-b bg-gami-primary px-5 py-3">
      <BackButton className="grow" to={to} />
      <p className="grow text-xl font-semibold text-gami-text">{headerName}</p>
    </div>
  );
}
