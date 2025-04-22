import { useNavigate } from 'react-router-dom';
import { Play, InfoIcon, Plus } from 'lucide-react';
import { Media } from '../../types';

interface HeroSectionProps {
  media: Media | null;
  isLoading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ media, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading || !media) {
    return (
      <div className="h-[70vh] bg-gradient-to-b from-dark-900 to-dark-950 animate-pulse">
        <div className="container-custom h-full flex flex-col justify-end pb-16">
          <div className="w-2/3 h-8 bg-dark-800 rounded-md mb-4"></div>
          <div className="w-1/2 h-6 bg-dark-800 rounded-md mb-8"></div>
          <div className="flex space-x-4">
            <div className="w-32 h-10 bg-dark-800 rounded-md"></div>
            <div className="w-32 h-10 bg-dark-800 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = media.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${media.backdrop_path}`
    : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/60 to-transparent"></div>
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative h-full flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-2xl animate-fade-in">
          <div className="flex items-center mb-3">
            {media.genres && media.genres.slice(0, 3).map((genre, index) => (
              <span key={index} className="text-sm text-slate-300 mr-2">
                {genre.name}
                {index < Math.min(media.genres?.length ?? 0, 3) - 1 && ' • '}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            {media.title || media.name}
          </h1>
          
          <div className="flex items-center space-x-4 mb-4">
            {media.vote_average && (
              <div className="flex items-center">
                <span className="text-yellow-500 font-medium mr-1">{media.vote_average.toFixed(1)}</span>
                <span className="text-slate-400 text-sm">/ 10</span>
              </div>
            )}
            
            <span className="text-slate-400">
              {media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0]}
            </span>
            
            {media.runtime && (
              <span className="text-slate-400">{media.runtime} min</span>
            )}
          </div>
          
          <p className="text-slate-300 mb-8 line-clamp-3 md:line-clamp-none">
            {media.overview}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate(`/watch/${media.id}`)}
              className="btn btn-primary py-3 px-6"
            >
              <Play className="mr-2 h-5 w-5" fill="currentColor" />
              Play Now
            </button>
            
            <button
              onClick={() => navigate(`/title/${media.id}`)}
              className="btn btn-ghost border border-slate-700 py-3 px-6"
            >
              <InfoIcon className="mr-2 h-5 w-5" />
              More Info
            </button>
            
            <button className="btn btn-ghost p-3 rounded-full">
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;