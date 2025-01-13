import React from 'react';
import { BookOpen, Clock, GraduationCap } from 'lucide-react';

const courses = [
  {
    title: 'Microsoft Word Essencial',
    duration: '15 horas',
    level: 'Iniciante',
    description: 'Aprenda as funcionalidades essenciais do Microsoft Word para criar documentos profissionais.'
  },
  {
    title: 'Excel Avançado',
    duration: '25 horas',
    level: 'Avançado',
    description: 'Domine fórmulas complexas, tabelas dinâmicas e automação com macros no Microsoft Excel.'
  },
  {
    title: 'PowerPoint para Apresentações Impactantes',
    duration: '20 horas',
    level: 'Intermediário',
    description: 'Crie apresentações visualmente atraentes e eficazes usando recursos avançados do PowerPoint.'
  },
  {
    title: 'React Avançado',
    duration: '30 horas',
    level: 'Avançado',
    description: 'Aprenda técnicas avançadas de React e crie aplicações complexas e escaláveis.'
  },
  {
    title: 'UX/UI Design Fundamentals',
    duration: '25 horas',
    level: 'Intermediário',
    description: 'Aprenda os princípios de design de interface e experiência do usuário para criar produtos digitais eficientes.'
  },
  {
    title: 'Data Science com Python',
    duration: '40 horas',
    level: 'Avançado',
    description: 'Aprenda a analisar e visualizar dados usando Python e bibliotecas populares como Pandas e Matplotlib.'
  }
];

const Courses = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Cursos Disponíveis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4">{course.title}</h2>
            
            <div className="space-y-3 mb-6 flex-grow">
              <div className="flex items-center text-gray-600">
                <Clock size={20} className="mr-2" />
                <span>Duração: {course.duration}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <GraduationCap size={20} className="mr-2" />
                <span>Nível: {course.level}</span>
              </div>
              
              <div className="flex items-start text-gray-600">
                <BookOpen size={20} className="mr-2 mt-1 flex-shrink-0" />
                <p>{course.description}</p>
              </div>
            </div>
            
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition w-full">
              Iniciar Curso
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;