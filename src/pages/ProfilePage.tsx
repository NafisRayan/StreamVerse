import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Download, Clock, Heart, LogOut } from 'lucide-react';
import MediaCard from '../components/ui/MediaCard';
import { useAuthStore } from '../store/authStore';
import { getUserWatchlist, getUserWatchHistory } from '../services/api';
import { Media } from '../types';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('watchlist');
  const [watchlist, setWatchlist] = useState<Media[]>([]);
  const [watchHistory, setWatchHistory] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const [watchlistData, historyData] = await Promise.all([
          getUserWatchlist(),
          getUserWatchHistory()
        ]);
        
        setWatchlist(watchlistData);
        setWatchHistory(historyData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Profile header */}
        <div className="bg-dark-800 rounded-lg overflow-hidden mb-8">
          {/* Cover image */}
          <div className="h-40 bg-gradient-to-r from-primary-900 to-secondary-900"></div>
          
          {/* Profile info */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-12 bg-primary-600 text-white rounded-full p-4 border-4 border-dark-800 shadow-lg">
              <User className="h-12 w-12" />
            </div>
            
            <div className="pt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">{user?.name || 'User'}</h1>
                <p className="text-slate-400">{user?.email || 'user@example.com'}</p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex space-x-4">
                <button className="btn btn-ghost border border-slate-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="btn btn-ghost border border-slate-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 border-b border-slate-800">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`flex items-center px-4 py-3 border-b-2 font-medium whitespace-nowrap ${
                activeTab === 'watchlist'
                  ? 'border-primary-600 text-primary-500'
                  : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Heart className="mr-2 h-4 w-4" />
              My Watchlist
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center px-4 py-3 border-b-2 font-medium whitespace-nowrap ${
                activeTab === 'history'
                  ? 'border-primary-600 text-primary-500'
                  : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Clock className="mr-2 h-4 w-4" />
              Watch History
            </button>
            
            <button
              onClick={() => setActiveTab('downloads')}
              className={`flex items-center px-4 py-3 border-b-2 font-medium whitespace-nowrap ${
                activeTab === 'downloads'
                  ? 'border-primary-600 text-primary-500'
                  : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Download className="mr-2 h-4 w-4" />
              Downloads
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div>
          {activeTab === 'watchlist' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Watchlist</h2>
              
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-dark-800 aspect-[2/3] rounded-lg mb-2"></div>
                      <div className="h-4 bg-dark-800 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-dark-800 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : watchlist.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {watchlist.map(item => (
                    <MediaCard key={item.id} media={item} />
                  ))}
                </div>
              ) : (
                <div className="bg-dark-800 rounded-lg p-10 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                  <h3 className="text-xl mb-2">Your watchlist is empty</h3>
                  <p className="text-slate-400 mb-6">Start adding movies and shows you want to watch later</p>
                  <button 
                    onClick={() => navigate('/browse')}
                    className="btn btn-primary"
                  >
                    Browse Content
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'history' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Watch History</h2>
              
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-dark-800 aspect-[2/3] rounded-lg mb-2"></div>
                      <div className="h-4 bg-dark-800 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-dark-800 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : watchHistory.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {watchHistory.map(item => (
                    <MediaCard key={item.id} media={item} />
                  ))}
                </div>
              ) : (
                <div className="bg-dark-800 rounded-lg p-10 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                  <h3 className="text-xl mb-2">No watch history yet</h3>
                  <p className="text-slate-400 mb-6">Your recently watched content will appear here</p>
                  <button 
                    onClick={() => navigate('/')}
                    className="btn btn-primary"
                  >
                    Discover Content
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'downloads' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Downloads</h2>
              <div className="bg-dark-800 rounded-lg p-10 text-center">
                <Download className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                <h3 className="text-xl mb-2">No downloads</h3>
                <p className="text-slate-400 mb-6">Download movies and shows to watch offline</p>
                <button 
                  onClick={() => navigate('/browse')}
                  className="btn btn-primary"
                >
                  Browse Content
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;