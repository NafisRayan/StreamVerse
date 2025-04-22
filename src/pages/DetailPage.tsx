import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailHero from '../components/detail/DetailHero';
import EpisodeList from '../components/detail/EpisodeList';
import MediaSlider from '../components/home/MediaSlider';
import LoadingScreen from '../components/ui/LoadingScreen';
import { getMediaDetails, getSimilarMedia, getEpisodes, getCast } from '../services/api';
import { Media, Episode, Cast } from '../types';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [media, setMedia] = useState<Media | null>(null);
  const [similarMedia, setSimilarMedia] = useState<Media[]>([]);
  const [cast, setCast] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const details = await getMediaDetails(parseInt(id));
        setMedia(details);
        
        // Fetch related data
        const [similarContent, castMembers] = await Promise.all([
          getSimilarMedia(parseInt(id), details.media_type),
          getCast(parseInt(id), details.media_type)
        ]);
        
        setSimilarMedia(similarContent);
        setCast(castMembers);
      } catch (error) {
        console.error('Error fetching media details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaDetails();
  }, [id]);

  const handleEpisodeSelect = (episode: Episode) => {
    // Navigate to player with episode ID
    window.location.href = `/watch/${media?.id}?episode=${episode.id}`;
  };

  if (loading || !media) {
    return <LoadingScreen />;
  }

  return (
    <div className="pt-16">
      {/* Hero section with details */}
      <DetailHero media={media} cast={cast} />
      
      {/* Episodes for TV shows */}
      {media.media_type === 'tv' && media.seasons && media.seasons.length > 0 && (
        <EpisodeList 
          seasons={media.seasons} 
          onEpisodeSelect={handleEpisodeSelect} 
        />
      )}
      
      {/* Similar content */}
      {similarMedia.length > 0 && (
        <div className="py-8">
          <MediaSlider
            title="More Like This"
            medias={similarMedia}
            isLoading={false}
          />
        </div>
      )}
    </div>
  );
};

export default DetailPage;