import { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, SkipForward, 
  SkipBack, Maximize, Minimize, Settings 
} from 'lucide-react';
import { Media } from '../../types';

interface VideoPlayerProps {
  media: Media;
  videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ media, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleWaiting = () => {
      setBuffering(true);
    };

    const handlePlaying = () => {
      setBuffering(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  // Controls visibility timeout
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Play/Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  // Volume
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const value = parseFloat(e.target.value);
    video.volume = value;
    setVolume(value);
    
    if (value === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const value = parseFloat(e.target.value);
    video.currentTime = value;
    setCurrentTime(value);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    const container = document.querySelector('.video-fullscreen-container');
    if (!container) return;
    
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration);
  };

  // Format time
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    return [
      h > 0 ? h.toString().padStart(2, '0') : null,
      m.toString().padStart(2, '0'),
      s.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  return (
    <div className="video-fullscreen-container relative w-full bg-black aspect-video overflow-hidden">
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full"
        onClick={togglePlay}
        poster={media.backdrop_path ? `https://image.tmdb.org/t/p/original${media.backdrop_path}` : undefined}
      />
      
      {/* Buffering indicator */}
      {buffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )}
      
      {/* Controls */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Title bar */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4">
          <h2 className="text-white font-medium">{media.title || media.name}</h2>
        </div>
        
        {/* Play/Pause center button */}
        <button 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-5 hover:bg-primary-600 transition-colors"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" fill="currentColor" />
          ) : (
            <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
          )}
        </button>
        
        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress bar */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-slate-700 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #8b5cf6 ${(currentTime / (duration || 1)) * 100}%, rgba(100, 116, 139, 0.5) ${(currentTime / (duration || 1)) * 100}%)`,
              }}
            />
          </div>
          
          {/* Controls row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button 
                className="text-white hover:text-primary-400"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              
              {/* Skip back 10s */}
              <button 
                className="text-white hover:text-primary-400"
                onClick={() => skip(-10)}
              >
                <SkipBack className="h-5 w-5" />
              </button>
              
              {/* Skip forward 10s */}
              <button 
                className="text-white hover:text-primary-400"
                onClick={() => skip(10)}
              >
                <SkipForward className="h-5 w-5" />
              </button>
              
              {/* Volume */}
              <div className="flex items-center space-x-2">
                <button 
                  className="text-white hover:text-primary-400"
                  onClick={toggleMute}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                
                <div className="hidden sm:block w-24">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-slate-700 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 ${(isMuted ? 0 : volume) * 100}%, rgba(100, 116, 139, 0.5) ${(isMuted ? 0 : volume) * 100}%)`,
                    }}
                  />
                </div>
              </div>
              
              {/* Time */}
              <div className="text-sm text-slate-300">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Settings */}
              <button className="text-white hover:text-primary-400">
                <Settings className="h-5 w-5" />
              </button>
              
              {/* Fullscreen */}
              <button 
                className="text-white hover:text-primary-400"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;