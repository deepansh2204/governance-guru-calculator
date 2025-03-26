
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/governance', label: 'Governance' },
    { path: '/environmental', label: 'Environmental' },
    { path: '/social', label: 'Social' },
    { path: '/full-esg', label: 'Full ESG' },
  ];
  
  const getActiveClass = (path: string) => {
    return location.pathname === path 
      ? 'text-primary font-medium' 
      : 'text-foreground hover:text-primary';
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex space-x-1">
            <span className="h-6 w-1.5 bg-esg-env rounded-full animate-pulse-subtle" style={{ animationDelay: '0s' }}></span>
            <span className="h-6 w-1.5 bg-esg-soc rounded-full animate-pulse-subtle" style={{ animationDelay: '0.3s' }}></span>
            <span className="h-6 w-1.5 bg-esg-gov rounded-full animate-pulse-subtle" style={{ animationDelay: '0.6s' }}></span>
          </div>
          <span className="text-xl font-bold">Governance Guru</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`${getActiveClass(item.path)} transition-colors duration-200`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`${getActiveClass(item.path)} block py-2 transition-colors duration-200`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
