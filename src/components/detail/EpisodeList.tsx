import { useState } from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { Episode, Season } from '../../types';

interface EpisodeListProps {
  seasons: Season[];
  onEpisodeSelect: (episode: Episode) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ seasons, onEpisodeSelect }) => {
  const [activeSeason, setActiveSeason] = useState(seasons[0]?.id || 0);

  const currentSeason = seasons.find(season => season.id === activeSeason);

  return (
    <div className="container-custom py-10">
      <h2 className="text-2xl font-semibold mb-6">Episodes</h2>

      {/* Season selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => setActiveSeason(season.id)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeSeason === season.id
                ? 'bg-primary-600 text-white'
                : 'bg-dark-800 text-slate-300 hover:bg-dark-700'
            }`}
          >
            {season.name || `Season ${season.season_number}`}
          </button>
        ))}
      </div>

      {/* Episodes list */}
      {currentSeason?.episodes?.length ? (
        <div className="space-y-4">
          {currentSeason.episodes.map((episode) => (
            <div 
              key={episode.id} 
              className="bg-dark-800 rounded-lg overflow-hidden hover:bg-dark-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Episode thumbnail */}
                <div className="sm:w-64 overflow-hidden relative group">
                  <img
                    src={episode.still_path 
                      ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                      : 'https://via.placeholder.com/300x170?text=No+Image'
                    }
                    alt={episode.name}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => onEpisodeSelect(episode)}
                      className="btn btn-primary rounded-full p-3"
                    >
                      <Play className="h-5 w-5" fill="currentColor" />
                    </button>
                  </div>
                </div>
                
                {/* Episode details */}
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">
                        Episode {episode.episode_number}
                      </div>
                      <h3 className="font-medium text-lg mb-2">{episode.name}</h3>
                    </div>
                    <div className="hidden sm:block">
                      <button 
                        onClick={() => onEpisodeSelect(episode)}
                        className="btn btn-ghost p-2 rounded-full"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 line-clamp-2 mb-2">{episode.overview}</p>
                  <div className="text-xs text-slate-400">{episode.air_date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-dark-800 rounded-lg p-8 text-center">
          <p className="text-slate-400">No episodes available for this season.</p>
        </div>
      )}
    </div>
  );
};

export default EpisodeList;