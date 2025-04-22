import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Facebook } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold">StreamVerse</span>
            </div>
            <p className="text-slate-400 text-sm">
              Your ultimate destination for movies, TV shows, and anime. 
              Stream your favorite content anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-400">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-primary-400">Home</Link>
              </li>
              <li>
                <Link to="/browse/movies" className="text-slate-400 hover:text-primary-400">Movies</Link>
              </li>
              <li>
                <Link to="/browse/tv" className="text-slate-400 hover:text-primary-400">TV Shows</Link>
              </li>
              <li>
                <Link to="/browse/anime" className="text-slate-400 hover:text-primary-400">Anime</Link>
              </li>
              <li>
                <Link to="/browse" className="text-slate-400 hover:text-primary-400">New Releases</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-primary-400">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-primary-400">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-primary-400">Contact</Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-400 hover:text-primary-400">Help Center</Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-primary-400">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-slate-400 text-sm mb-4">
              Get updates on new releases and exclusive offers
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="input w-full"
              />
              <button type="submit" className="btn btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              © {currentYear} StreamVerse. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-slate-500 text-sm hover:text-slate-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-500 text-sm hover:text-slate-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-slate-500 text-sm hover:text-slate-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;