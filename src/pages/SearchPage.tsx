import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MediaCard from '../components/ui/MediaCard';
import LoadingScreen from '../components/ui/LoadingScreen';
import { searchMedia } from '../services/api';
import { Media } from '../types';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const performSearch = async () => {
      if (!query || query.trim().length < 2) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      setError('');
      
      try {
        const searchResults = await searchMedia(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setError('An error occurred while searching. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-slate-400 mb-8">
          {query ? `Showing results for "${query}"` : 'Enter a search term to find movies, TV shows, and anime'}
        </p>

        {error && (
          <div className="bg-error-900 border border-error-700 text-white p-4 rounded-md mb-8">
            {error}
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map((item) => (
              <MediaCard key={item.id} media={item} />
            ))}
          </div>
        ) : (
          <div className="bg-dark-800 rounded-lg p-10 text-center">
            {query ? (
              <>
                <h3 className="text-xl mb-2">No results found</h3>
                <p className="text-slate-400">
                  We couldn't find any media matching "{query}". Try checking your spelling or using different keywords.
                </p>
              </>
            ) : (
              <p className="text-slate-400">
                Use the search box above to find your favorite movies, TV shows, and anime.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;