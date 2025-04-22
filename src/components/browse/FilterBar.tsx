import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  categories: { id: string; name: string }[];
  genres: { id: number; name: string }[];
  onFilterChange: (filters: any) => void;
  activeCategory: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  categories, 
  genres, 
  onFilterChange,
  activeCategory
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [yearRange, setYearRange] = useState({ min: 1950, max: new Date().getFullYear() });
  
  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres(prev => {
      if (prev.includes(genreId)) {
        return prev.filter(id => id !== genreId);
      } else {
        return [...prev, genreId];
      }
    });
  };
  
  const applyFilters = () => {
    onFilterChange({
      genres: selectedGenres,
      sortBy,
      yearRange
    });
    
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };
  
  return (
    <div className="bg-dark-900 border-b border-slate-800 sticky top-16 z-10">
      <div className="container-custom py-4">
        {/* Categories */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(category => (
            <a
              key={category.id}
              href={`/browse/${category.id}`}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === category.id 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-dark-800 text-slate-300 hover:bg-dark-700'
              }`}
            >
              {category.name}
            </a>
          ))}
          
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-1.5 bg-dark-800 text-slate-300 rounded-full text-sm whitespace-nowrap hover:bg-dark-700 ml-auto md:ml-2"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Filter panel */}
        {isFilterOpen && (
          <div className="bg-dark-800 mt-4 p-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-down">
            {/* Genres */}
            <div>
              <h3 className="font-medium mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreToggle(genre.id)}
                    className={`px-3 py-1 rounded-full text-xs border ${
                      selectedGenres.includes(genre.id)
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'border-slate-700 text-slate-300 hover:bg-dark-700'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort */}
            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-full"
              >
                <option value="popularity.desc">Popularity (High to Low)</option>
                <option value="popularity.asc">Popularity (Low to High)</option>
                <option value="vote_average.desc">Rating (High to Low)</option>
                <option value="vote_average.asc">Rating (Low to High)</option>
                <option value="release_date.desc">Release Date (Newest)</option>
                <option value="release_date.asc">Release Date (Oldest)</option>
              </select>
            </div>
            
            {/* Year Range */}
            <div>
              <h3 className="font-medium mb-3">Year Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">From</label>
                  <select
                    value={yearRange.min}
                    onChange={(e) => setYearRange({ ...yearRange, min: parseInt(e.target.value) })}
                    className="input w-full"
                  >
                    {Array.from({ length: 75 }, (_, i) => 1950 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">To</label>
                  <select
                    value={yearRange.max}
                    onChange={(e) => setYearRange({ ...yearRange, max: parseInt(e.target.value) })}
                    className="input w-full"
                  >
                    {Array.from({ length: 75 }, (_, i) => 1950 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Apply button */}
            <div className="md:col-span-3 text-right mt-4">
              <button 
                onClick={applyFilters}
                className="btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;