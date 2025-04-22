import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import VideoPlayer from '../components/video/VideoPlayer';
import MediaSlider from '../components/home/MediaSlider';
import LoadingScreen from '../components/ui/LoadingScreen';
import { getMediaDetails, getSimilarMedia, getEpisodes, getStreamingSources } from '../services/api';
import { Media, StreamingSource } from '../types';

const PlayerPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get('episode');
  
  const [media, setMedia] = useState<Media | null>(null);
  const [streamingSources, setStreamingSources] = useState<StreamingSource[]>([]);
  const [selectedSource, setSelectedSource] = useState<StreamingSource | null>(null);
  const [similarMedia, setSimilarMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaAndSources = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Get media details
        const details = await getMediaDetails(parseInt(id));
        setMedia(details);
        
        // Get streaming sources
        const sources = await getStreamingSources(parseInt(id), details.media_type, episodeId ? parseInt(episodeId) : undefined);
        setStreamingSources(sources);
        
        if (sources.length > 0) {
          setSelectedSource(sources[0]);
        }
        
        // Get similar content
        const similar = await getSimilarMedia(parseInt(id), details.media_type);
        setSimilarMedia(similar);
      } catch (error) {
        console.error('Error fetching media and sources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaAndSources();
  }, [id, episodeId]);

  const handleSourceSelect = (source: StreamingSource) => {
    setSelectedSource(source);
  };

  if (loading || !media) {
    return <LoadingScreen />;
  }

  // Placeholder video source (in a real app, this would come from the API)
  const placeholderVideoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="pt-16 bg-black min-h-screen">
      {/* Video player */}
      <VideoPlayer 
        media={media} 
        videoSrc={selectedSource?.url || placeholderVideoSrc} 
      />
      
      {/* Source selection */}
      {streamingSources.length > 1 && (
        <div className="container-custom py-6">
          <h3 className="text-lg font-medium mb-3">Sources</h3>
          <div className="flex flex-wrap gap-2">
            {streamingSources.map((source, index) => (
              <button
                key={index}
                onClick={() => handleSourceSelect(source)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  selectedSource?.id === source.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-slate-300 hover:bg-dark-700'
                }`}
              >
                {source.quality} - {source.provider}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Similar media */}
      {similarMedia.length > 0 && (
        <div className="py-8 bg-dark-950">
          <MediaSlider
            title="You May Also Like"
            medias={similarMedia}
            isLoading={false}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerPage;