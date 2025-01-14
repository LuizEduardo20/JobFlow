import React from 'react';

const Profile = () => {
  const profile = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    summary: 'Desenvolvedor Full Stack com 5 anos de experiência em React, Node.js e TypeScript.'
  };

  const courses = [
    {
      name: 'React Avançado',
      progress: 60,
    },
    {
      name: 'Excel Avançado',
      progress: 30,
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold mb-8">Perfil do Candidato</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={profile.name}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              value={profile.phone}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <input
              type="text"
              value={profile.address}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">Resumo Profissional</label>
          <textarea
            value={profile.summary}
            readOnly
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>
        
        <div className="flex justify-end">
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
            Editar Perfil
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Meus Cursos em Andamento</h2>
        
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{course.name}</h3>
                <span className="text-sm text-gray-500">{course.progress}% concluído</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-black h-2.5 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                Continuar Curso
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
