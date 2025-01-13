import React from 'react';

const AboutProject = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Projeto Desenvolvido por Alunos do IFPI</h2>
          <p className="text-gray-600 mb-6">
            O JobFlow é um projeto inovador criado por estudantes talentosos do
            Instituto Federal do Piauí (IFPI), demonstrando o potencial e a criatividade dos
            alunos em desenvolver soluções tecnológicas para o mercado de trabalho.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            Saiba Mais
          </button>
        </div>
        
        <div>
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f"
            alt="Campus IFPI"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutProject;