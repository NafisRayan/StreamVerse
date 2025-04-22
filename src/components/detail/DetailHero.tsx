import { PlayCircle, Plus, Download, Star, Calendar, Clock } from 'lucide-react';
import { Media, Cast } from '../../types';

interface DetailHeroProps {
  media: Media;
  cast?: Cast[];
}

const DetailHero: React.FC<DetailHeroProps> = ({ media, cast }) => {
  const backdropUrl = media.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${media.backdrop_path}`
    : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';
  
  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 h-[70vh] z-0">
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/60 to-transparent"></div>
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Poster */}
          <div className="hidden md:block">
            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
              <img 
                src={posterUrl} 
                alt={media.title || media.name}
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          {/* Details */}
          <div className="md:col-span-2 lg:col-span-3">
            {media.genres && (
              <div className="flex flex-wrap gap-2 mb-3">
                {media.genres.map((genre, index) => (
                  <span key={index} className="badge bg-dark-800/80 backdrop-blur-sm text-white border border-slate-700">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              {media.title || media.name}
            </h1>
            
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-slate-300">
              {media.vote_average && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="font-medium">{media.vote_average.toFixed(1)}</span>
                </div>
              )}
              
              {(media.release_date || media.first_air_date) && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0]}</span>
                </div>
              )}
              
              {media.runtime && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{media.runtime} min</span>
                </div>
              )}
              
              {media.number_of_seasons && (
                <span>{media.number_of_seasons} Season{media.number_of_seasons > 1 ? 's' : ''}</span>
              )}
            </div>
            
            {/* Overview */}
            <p className="text-slate-300 mb-6">
              {media.overview}
            </p>
            
            {/* Cast */}
            {cast && cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {cast.slice(0, 10).map((person) => (
                    <span key={person.id} className="text-slate-300 text-sm">
                      {person.name}
                      {cast.indexOf(person) < Math.min(cast.length, 10) - 1 && ','}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <a href={`/watch/${media.id}`} className="btn btn-primary">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Now
              </a>
              
              <button className="btn btn-ghost border border-slate-700">
                <Plus className="mr-2 h-5 w-5" />
                Add to Watchlist
              </button>
              
              <button className="btn btn-ghost border border-slate-700">
                <Download className="mr-2 h-5 w-5" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHero;