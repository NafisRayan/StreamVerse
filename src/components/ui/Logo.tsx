import { Play } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-6 w-6" }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center rounded-md bg-primary-600 text-white overflow-hidden`}>
      <Play className="fill-white h-4/6 w-4/6" fill="currentColor" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-primary-800"></div>
    </div>
  );
};

export default Logo;