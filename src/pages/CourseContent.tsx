import { useState, useEffect } from 'react';
import { ArrowLeft, PlayCircleIcon, CheckCircleIcon } from 'lucide-react';
import { Course } from './Courses';  // Importar o tipo Course

type Video = {
  id: number;
  title: string;
  duration: string;
  url: string;
  completed?: boolean;
};

type Module = {
  id: number;
  title: string;
  videos: Video[];
};

type CourseContentProps = {
  onBack: () => void;
  onNavigate: (page: string) => void;
};

function CourseContent({ onBack, onNavigate }: CourseContentProps) {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = () => {
    try {
      const courseStr = localStorage.getItem('currentCourse');
      if (!courseStr) {
        alert('Erro ao carregar o curso.');
        onNavigate('my-courses');
        return;
      }

      const course = JSON.parse(courseStr);
      setCurrentCourse(course);

      // Se houver módulos, seleciona o primeiro por padrão
      if (course.modulesList && course.modulesList.length > 0) {
        setCurrentModule(course.modulesList[0]);
        
        // Se houver vídeos no módulo, seleciona o primeiro
        if (course.modulesList[0].videos && course.modulesList[0].videos.length > 0) {
          setCurrentVideo(course.modulesList[0].videos[0]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar curso:', error);
      alert('Erro ao carregar o conteúdo do curso.');
      onNavigate('my-courses');
    }
  };

  if (!currentCourse) {
    return (
      <div className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Carregando curso...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleVideoComplete = (videoId: number) => {
    setCompletedVideos(prev => [...prev, videoId]);
    
    // Salva o progresso no localStorage
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      const progress = user.courseProgress || {};
      progress[currentCourse.id] = progress[currentCourse.id] || { completedVideos: [] };
      progress[currentCourse.id].completedVideos = [...completedVideos, videoId];
      
      user.courseProgress = progress;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('my-courses')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para meus cursos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Módulos e Vídeos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-xl font-bold text-gray-900 mb-4">
                {currentCourse?.title}
              </h1>
              <p className="text-gray-600 mb-6">
                Instrutor: {currentCourse?.instructor || 'Sem Nome do Instrutor'}
              </p>

              <div className="space-y-4">
                {currentCourse.modulesList?.map((module: Module) => (
                  <div key={module.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h3 className="font-medium text-gray-900">
                        Módulo: {module.title}
                      </h3>
                    </div>
                    <div className="divide-y">
                      {module.videos.map((video: Video) => (
                        <button
                          key={video.id}
                          onClick={() => setCurrentVideo(video)}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <PlayCircleIcon className="h-5 w-5 text-blue-600 mr-3" />
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-900">
                                {video.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {video.duration}
                              </p>
                            </div>
                          </div>
                          {completedVideos.includes(video.id) && (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Área do Vídeo */}
          <div className="lg:col-span-2">
            {currentVideo ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <video
                    src={currentVideo.url}
                    controls
                    className="w-full h-full rounded-lg"
                    controlsList="nodownload"
                    onEnded={() => {
                      if (currentVideo) {
                        handleVideoComplete(currentVideo.id);
                      }
                    }}
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleVideoComplete(currentVideo.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Marcar como concluído
                  </button>
                  <button 
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Emitir Certificado
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <PlayCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecione um vídeo para começar
                </h3>
                <p className="text-gray-500">
                  Escolha um vídeo da lista de módulos para iniciar o curso
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseContent; 