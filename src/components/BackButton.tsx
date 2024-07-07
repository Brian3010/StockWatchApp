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
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>

      {/* <span>Go back</span> */}
    </button>
  );
}
