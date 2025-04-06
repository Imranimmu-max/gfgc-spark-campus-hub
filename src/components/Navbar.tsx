
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  className="h-10 w-auto"
                  src="/college-logo.png"
                  alt="GFGC Logo"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/40x40?text=GFGC";
                  }}
                />
                <span className="ml-2 text-xl font-heading font-bold text-college-800 dark:text-white">
                  GFGC <span className="text-college-600">Chikkaballpur</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className="nav-link"
              >
                {link.name}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="ml-2"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="nav-link block px-3 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
