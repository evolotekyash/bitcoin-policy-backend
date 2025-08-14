import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Mining Plan', href: '/mining' },
    { name: 'Policy Library', href: '/policy' },
    { name: 'Strategic Reserve', href: '/reserve' },
    { name: 'Education', href: '/education' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 w-full bg-white/98 backdrop-blur-lg border-b border-gray-200/50 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center group transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src="/bpi.jpeg" 
                  alt="Bitcoin Policy Institute India" 
                  className="h-16 w-24 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-orange-100 group-hover:border-orange-200 bg-white ring-2 ring-white/50"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/10 to-transparent group-hover:from-orange-400/20 transition-all duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  location.pathname === item.href 
                    ? 'text-orange-600 bg-orange-50 shadow-sm' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 border border-gray-200 hover:border-orange-200"
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-lg">
            <nav className="flex flex-col space-y-2 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-all duration-200 font-semibold text-base px-5 py-4 mx-2 rounded-xl ${
                    location.pathname === item.href 
                      ? 'text-orange-600 bg-orange-50 shadow-md' 
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;