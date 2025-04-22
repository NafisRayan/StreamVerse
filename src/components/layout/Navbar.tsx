import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Film, Tv, TrendingUp } from 'lucide-react';
import Logo from '../ui/Logo';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-dark-900/95 backdrop-blur-sm shadow-md' : 'bg-gradient-to-b from-dark-900/80 to-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="hidden text-xl font-bold text-white md:block">StreamVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-primary-400' : 'text-slate-300 hover:text-white'}`}>
              Home
            </Link>
            <Link to="/browse/movies" className={`nav-link ${location.pathname.includes('/browse/movies') ? 'text-primary-400' : 'text-slate-300 hover:text-white'}`}>
              Movies
            </Link>
            <Link to="/browse/tv" className={`nav-link ${location.pathname.includes('/browse/tv') ? 'text-primary-400' : 'text-slate-300 hover:text-white'}`}>
              TV Shows
            </Link>
            <Link to="/browse/anime" className={`nav-link ${location.pathname.includes('/browse/anime') ? 'text-primary-400' : 'text-slate-300 hover:text-white'}`}>
              Anime
            </Link>
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-48 bg-dark-800/70 pl-10 pr-4 py-1.5 text-sm"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </form>

            {isAuthenticated ? (
              <Link to="/profile" className="btn btn-ghost p-2">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {user?.name?.charAt(0) || <User className="h-4 w-4" />}
                  </div>
                  <span className="hidden md:block">{user?.name || 'Profile'}</span>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              className="p-2 rounded-md md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-sm py-4 animate-slide-down">
          <div className="container-custom space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full bg-dark-800/70 pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </form>

            <nav className="flex flex-col space-y-4">
              <Link to="/" className="flex items-center space-x-2 p-2 rounded-md hover:bg-dark-800">
                <TrendingUp className="h-5 w-5 text-primary-400" />
                <span>Home</span>
              </Link>
              <Link to="/browse/movies" className="flex items-center space-x-2 p-2 rounded-md hover:bg-dark-800">
                <Film className="h-5 w-5 text-primary-400" />
                <span>Movies</span>
              </Link>
              <Link to="/browse/tv" className="flex items-center space-x-2 p-2 rounded-md hover:bg-dark-800">
                <Tv className="h-5 w-5 text-primary-400" />
                <span>TV Shows</span>
              </Link>
              <Link to="/browse/anime" className="flex items-center space-x-2 p-2 rounded-md hover:bg-dark-800">
                <Film className="h-5 w-5 text-primary-400" />
                <span>Anime</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;