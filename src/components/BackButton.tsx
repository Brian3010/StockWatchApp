import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to: string;
  className?: string;
}

export default function BackButton({ to, className }: BackButtonProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate(to);
  };
  return (
    <button onClick={handleClick} className={`flex items-center font-medium ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>

      {/* <span>Go back</span> */}
    </button>
  );
}
