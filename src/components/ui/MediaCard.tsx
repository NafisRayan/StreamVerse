import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Calendar, Clock } from 'lucide-react';
import { Media } from '../../types';

interface MediaCardProps {
  media: Media;
  size?: 'sm' | 'md' | 'lg';
}

const MediaCard: React.FC<MediaCardProps> = ({ media, size = 'md' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'w-32 md:w-40',
    md: 'w-40 md:w-56',
    lg: 'w-48 md:w-64',
  };

  return (
    <div 
      className={`card ${sizeClasses[size]} flex-shrink-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/title/${media.id}`} className="block relative">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
            alt={media.title || media.name}
            className="w-full h-full object-cover transition-all duration-500"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-dark-900/70 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button className="btn btn-primary rounded-full p-3">
              <Play className="h-5 w-5" fill="currentColor" />
            </button>
          </div>
          
          {/* Rating badge */}
          {media.vote_average && (
            <div className="absolute top-2 left-2 flex items-center space-x-1 bg-dark-900/90 backdrop-blur-sm rounded-md px-2 py-1">
              <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
              <span className="text-xs font-medium">{media.vote_average.toFixed(1)}</span>
            </div>
          )}
          
          {/* Media type badge */}
          <div className="absolute top-2 right-2 bg-primary-600/90 backdrop-blur-sm rounded-md px-2 py-1">
            <span className="text-xs font-medium">{media.media_type || 'Movie'}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium leading-tight line-clamp-1">
            {media.title || media.name}
          </h3>
          
          <div className="flex items-center space-x-3 mt-2 text-xs text-slate-400">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0] || 'N/A'}</span>
            </div>
            
            {media.runtime && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{media.runtime} min</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MediaCard;