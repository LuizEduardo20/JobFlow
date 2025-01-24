import { useState } from 'react';
import { Menu, X, User, BookOpen, LogOut } from 'lucide-react';

function Navbar({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('currentUser');
    onNavigate('login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Nome do App */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="text-xl font-bold text-gray-900"
            >
              JobsHub
            </button>
          </div>

          {/* Menu para Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onNavigate('profile')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <User className="h-5 w-5 mr-2" />
              Perfil
            </button>
            <button
              onClick={() => onNavigate('my-courses')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Meus Cursos
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </button>
          </div>

          {/* Botão Menu Hambúrguer para Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
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

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                onNavigate('profile');
                setIsMenuOpen(false);
              }}
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
            >
              <User className="h-5 w-5 mr-2" />
              Perfil
            </button>
            <button
              onClick={() => {
                onNavigate('my-courses');
                setIsMenuOpen(false);
              }}
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Meus Cursos
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 