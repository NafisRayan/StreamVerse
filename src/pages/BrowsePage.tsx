import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FilterBar from '../components/browse/FilterBar';
import MediaCard from '../components/ui/MediaCard';
import LoadingScreen from '../components/ui/LoadingScreen';
import { getGenres, getMediaByCategory, searchMedia } from '../services/api';
import { Media } from '../types';

const BrowsePage = () => {
  const { category = 'all' } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [media, setMedia] = useState<Media[]>([]);
  const [genres, setGenres] = useState<{id: number; name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    genres: [] as number[],
    sortBy: 'popularity.desc',
    yearRange: { min: 1950, max: new Date().getFullYear() }
  });

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'movies', name: 'Movies' },
    { id: 'tv', name: 'TV Shows' },
    { id: 'anime', name: 'Anime' },
    { id: 'trending', name: 'Trending' },
    { id: 'top_rated', name: 'Top Rated' },
    { id: 'upcoming', name: 'Coming Soon' },
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const results = await getMediaByCategory(category, filters);
        setMedia(results);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [category, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Filter bar */}
      <FilterBar 
        categories={categories}
        genres={genres}
        onFilterChange={handleFilterChange}
        activeCategory={category}
      />

      {/* Content grid */}
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {category === 'all' ? 'Browse All' : category.replace('_', ' ')}
        </h1>

        {media.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {media.map((item) => (
              <MediaCard key={item.id} media={item} />
            ))}
          </div>
        ) : (
          <div className="bg-dark-800 rounded-lg p-10 text-center">
            <h3 className="text-xl mb-2">No results found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your filters or search for something else</p>
            <button 
              onClick={() => navigate('/browse')}
              className="btn btn-primary"
            >
              Browse All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;