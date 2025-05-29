
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <span className="text-lg font-bold text-white">IQ</span>
          </div>
          <span className="text-xl font-bold">IQ Test</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/tentang" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/tentang') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            About
          </Link>
          <Link to="/tes">
            <Button 
              variant={isActive('/tes') ? 'default' : 'outline'} 
              size="sm"
              className="transition-all duration-200 hover:scale-105"
            >
              Start Test
            </Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-9 h-9 p-0"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
