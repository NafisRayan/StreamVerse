import { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import MediaSlider from '../components/home/MediaSlider';
import { getPopularMovies, getPopularTVShows, getPopularAnime, getTrending } from '../services/api';
import { Media } from '../types';

const HomePage = () => {
  const [featuredMedia, setFeaturedMedia] = useState<Media | null>(null);
  const [trendingMedia, setTrendingMedia] = useState<Media[]>([]);
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Media[]>([]);
  const [popularAnime, setPopularAnime] = useState<Media[]>([]);
  const [loading, setLoading] = useState({
    hero: true,
    trending: true,
    movies: true,
    tvShows: true,
    anime: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trending for hero
        const trending = await getTrending();
        if (trending.length > 0) {
          setFeaturedMedia(trending[0]);
          setTrendingMedia(trending);
        }
        setLoading(prev => ({ ...prev, hero: false, trending: false }));

        // Fetch popular content
        const movies = await getPopularMovies();
        setPopularMovies(movies);
        setLoading(prev => ({ ...prev, movies: false }));

        const tvShows = await getPopularTVShows();
        setPopularTVShows(tvShows);
        setLoading(prev => ({ ...prev, tvShows: false }));

        const anime = await getPopularAnime();
        setPopularAnime(anime);
        setLoading(prev => ({ ...prev, anime: false }));
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        setLoading({
          hero: false,
          trending: false,
          movies: false,
          tvShows: false,
          anime: false,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <HeroSection media={featuredMedia} isLoading={loading.hero} />

      {/* Media Sliders */}
      <div className="mt-8">
        <MediaSlider 
          title="Trending Now"
          medias={trendingMedia}
          isLoading={loading.trending}
          viewMoreLink="/browse"
        />

        <MediaSlider
          title="Popular Movies"
          medias={popularMovies}
          isLoading={loading.movies}
          viewMoreLink="/browse/movies"
        />

        <MediaSlider
          title="Popular TV Shows"
          medias={popularTVShows}
          isLoading={loading.tvShows}
          viewMoreLink="/browse/tv"
        />

        <MediaSlider
          title="Popular Anime"
          medias={popularAnime}
          isLoading={loading.anime}
          viewMoreLink="/browse/anime"
        />
      </div>
    </div>
  );
};

export default HomePage;