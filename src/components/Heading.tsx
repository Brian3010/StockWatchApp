import BackButton from './BackButton';

interface HeadingProps {
  to: string;
  headerName: string;
}

export default function Heading({ to, headerName }: HeadingProps) {
  return (
    <div className="absolute inset-x-0 flex bg-[#F9F9FB] px-2 py-3 border-b">
      <BackButton className="grow" to={to} />
      <p className="grow text-base ml-[-30px] font-semibold text-gami-text">{headerName}</p>
    </div>
  );
}
