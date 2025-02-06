import { useState } from 'react';
import { ArrowLeftIcon, PlayCircleIcon } from 'lucide-react';
import { Job } from './Jobs';

type JobDetailsProps = {
  job: Job;
  onBack: () => void;
  onNavigate: (page: string) => void;
};

function JobDetails({ job, onBack, onNavigate }: JobDetailsProps) {
  const [isApplying, setIsApplying] = useState(false);
  
  const handleApply = () => {
    const isLoggedIn = localStorage.getItem('isUserLoggedIn');
    
    if (!isLoggedIn) {
      onNavigate('login');
      return;
    }

    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      
      if (!user.resume) {
        alert('Por favor, atualize seu perfil e adicione seu currículo antes de se candidatar.');
        onNavigate('profile');
        return;
      }

      setIsApplying(true);

      setTimeout(() => {
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        if (!applications.includes(job.company)) {
          applications.push(job.company);
          localStorage.setItem('applications', JSON.stringify(applications));
        }

        alert('Currículo enviado com sucesso!');
        setIsApplying(false);
        onNavigate('profile');
      }, 1500);
    }
  };

  const handleEnrollCourse = () => {
    const isLoggedIn = localStorage.getItem('isUserLoggedIn');
    
    if (!isLoggedIn) {
      onNavigate('login');
      return;
    }

    try {
      const userStr = localStorage.getItem('currentUser');
      if (userStr && job.modules) {
        const user = JSON.parse(userStr);
        
        const courseData = {
          id: job.id,
          title: job.title,
          company: job.company,
          instructor: job.company,
          duration: job.modules.reduce((total, module) => 
            total + module.videos.reduce((sum, video) => 
              sum + parseInt(video.duration.split(':')[0]) || 0, 0
            ), 0
          ) + " minutos",
          mode: "Online",
          modules: job.modules.length,
          progress: 0,
          enrollmentDate: new Date().toISOString(),
          modulesList: job.modules.map(module => ({
            id: Date.now() + Math.random(),
            title: module.title,
            completed: false,
            videos: module.videos.map(video => ({
              id: Date.now() + Math.random(),
              title: video.title,
              duration: video.duration,
              url: video.url,
              completed: false
            }))
          }))
        };

        const userCourses = user.courses || [];
        if (!userCourses.some(c => c.id === courseData.id)) {
          user.courses = [...userCourses, courseData];
          localStorage.setItem('currentUser', JSON.stringify(user));

          const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
          const updatedUsers = users.map(u => 
            u.email === user.email ? user : u
          );
          localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

          alert('Matrícula realizada com sucesso!');
          onNavigate('my-courses');
        } else {
          alert('Você já está matriculado neste curso!');
          onNavigate('my-courses');
        }
      }
    } catch (error) {
      console.error('Erro ao matricular no curso:', error);
      alert('Erro ao realizar matrícula. Tente novamente.');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Voltar para vagas
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 mb-2">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
            </div>
            <span className="text-green-600 font-semibold text-xl">R$ {job.salary}</span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Habilidades Necessárias</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={`skill-${skill.id}`}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrição da Vaga</h2>
            <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefícios</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Vale Refeição</li>
              <li>Vale Transporte</li>
              <li>Plano de Saúde</li>
              <li>Plano Odontológico</li>
              <li>Seguro de Vida</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cursos Recomendados</h2>
            {job.recommendedCourses && job.recommendedCourses.length > 0 ? (
              <div className="space-y-4">
                {job.recommendedCourses.map((course) => (
                  <div
                    key={`course-${course.id}`}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                  >
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-gray-600">Instrutor: {course.instructor}</p>
                    <button
                      onClick={() => onNavigate('course-details')}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Ver detalhes do curso
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Esta vaga não tem nenhum curso recomendado.</p>
            )}
          </div>

          {job.modules && job.modules.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Curso Incluso na Vaga
              </h2>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Conteúdo do Curso
                  </h3>
                  <p className="text-gray-600">
                    {job.modules.length} módulos disponíveis
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  {job.modules.map((module, index) => (
                    <div key={module.id} className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Módulo {index + 1}: {module.title}
                      </h4>
                      <ul className="space-y-2">
                        {module.videos.map((video, vIndex) => (
                          <li key={vIndex} className="flex items-center text-gray-600">
                            <PlayCircleIcon className="h-4 w-4 mr-2" />
                            <span>{video.title}</span>
                            <span className="ml-2 text-sm text-gray-500">
                              ({video.duration})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleEnrollCourse}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Matricular no Curso
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleApply}
            disabled={isApplying}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApplying ? 'Enviando currículo...' : 'Candidatar-se'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails; 
