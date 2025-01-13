import React from 'react';
import { SearchIcon } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-white py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Bem-vindo ao JobFlow</h1>
      <p className="text-xl text-gray-600 mb-8">Conectando talentos às melhores oportunidades</p>
      
      <div className="flex justify-center gap-4">
        <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
          Explorar Vagas
        </button>
        <button className="bg-gray-200 text-black px-6 py-3 rounded-md hover:bg-gray-300 transition">
          Ver Cursos
        </button>
      </div>
      
      <div className="max-w-2xl mx-auto mt-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar vagas..."
            className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
        </div>
      </div>
    </div>
  );
}

export default Hero;