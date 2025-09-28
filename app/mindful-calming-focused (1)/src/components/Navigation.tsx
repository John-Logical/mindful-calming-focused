import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X, User, Settings, LogOut } from 'lucide-react';
import { User as UserType } from '@/types';

interface NavigationProps {
  user: UserType | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onProfile: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  user, onSignIn, onSignOut, onProfile, currentPage, onNavigate 
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = user ? [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'library', label: 'Library' },
    { id: 'progress', label: 'Progress' },
    { id: 'subscription', label: 'Subscription' }
  ] : [];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-sage-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
          >
            <Sparkles className="w-8 h-8 text-sage-600 mr-2" />
            <span className="text-xl font-bold text-navy-900">Truth Within</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-sage-700 border-b-2 border-sage-600'
                    : 'text-navy-600 hover:text-sage-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-navy-600">Welcome, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={onProfile}>
                  <User className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={onSignIn} className="bg-sage-600 hover:bg-sage-700">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sage-100">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-navy-600 hover:text-sage-700 hover:bg-sage-50"
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <div className="border-t border-sage-100 pt-4 mt-4">
                <button
                  onClick={onProfile}
                  className="block w-full text-left px-4 py-2 text-navy-600 hover:text-sage-700"
                >
                  Profile
                </button>
                <button
                  onClick={onSignOut}
                  className="block w-full text-left px-4 py-2 text-navy-600 hover:text-sage-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="px-4 pt-4">
                <Button onClick={onSignIn} className="w-full bg-sage-600 hover:bg-sage-700">
                  Sign In
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;