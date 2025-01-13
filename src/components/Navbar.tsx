import React from 'react';
import { BriefcaseIcon, GraduationCapIcon, BuildingIcon, UserCircleIcon } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar = ({ onNavigate, currentPage }: NavbarProps) => {
  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')} 
          className="text-2xl font-bold hover:text-gray-300"
        >
          JobFlow
        </button>
        
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => onNavigate('jobs')} 
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <BriefcaseIcon size={20} />
            <span>Vagas</span>
          </button>
          <button 
            onClick={() => onNavigate('courses')} 
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <GraduationCapIcon size={20} />
            <span>Cursos</span>
          </button>
          <button 
            onClick={() => onNavigate('company')} 
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <BuildingIcon size={20} />
            <span>Area da Empresa</span>
          </button>
          <button 
            onClick={() => onNavigate('profile')} 
            className={`flex items-center space-x-2 hover:text-gray-300 ${
              currentPage === 'profile' ? 'text-gray-300' : ''
            }`}
          >
            <UserCircleIcon size={20} />
            <span>Meu Perfil</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;