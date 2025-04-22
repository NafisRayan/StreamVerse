import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MediaCard from '../ui/MediaCard';
import { Media } from '../../types';

interface MediaSliderProps {
  title: string;
  medias: Media[];
  isLoading: boolean;
  viewMoreLink?: string;
}

const MediaSlider: React.FC<MediaSliderProps> = ({ 
  title, 
  medias, 
  isLoading,
  viewMoreLink 
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const { current } = sliderRef;
    const scrollAmount = direction === 'left' 
      ? -current.clientWidth * 0.75 
      : current.clientWidth * 0.75;
      
    current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-4">
            <div className="h-7 w-48 bg-dark-800 rounded-md animate-pulse"></div>
            <div className="h-7 w-24 bg-dark-800 rounded-md animate-pulse"></div>
          </div>
          
          <div className="flex space-x-4 overflow-x-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-40 md:w-56 flex-shrink-0">
                <div className="aspect-[2/3] bg-dark-800 rounded-lg animate-pulse"></div>
                <div className="h-5 w-3/4 bg-dark-800 rounded-md mt-3 animate-pulse"></div>
                <div className="h-4 w-1/2 bg-dark-800 rounded-md mt-2 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          {viewMoreLink && (
            <a href={viewMoreLink} className="text-primary-400 hover:text-primary-300 text-sm font-medium">
              View More
            </a>
          )}
        </div>
        
        <div className="relative group">
          <div 
            ref={sliderRef}
            className="media-slider"
          >
            {medias.map((media) => (
              <MediaCard key={media.id} media={media} />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-dark-900/80 backdrop-blur-sm rounded-r-md p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-dark-900/80 backdrop-blur-sm rounded-l-md p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaSlider;