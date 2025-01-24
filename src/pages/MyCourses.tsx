import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpenIcon, ClockIcon, UsersIcon, PlayCircleIcon, CheckCircle, BookOpen } from 'lucide-react';

type Video = {
  id: string;
  title: string;
  duration: string;
  url: string;
  completed: boolean;
};

type Module = {
  id: string;
  title: string;
  completed: boolean;
  videos: Video[];
};

type Course = {
  id: number;
  title: string;
  company: string;
  instructor: string;
  duration: string;
  mode: string;
  modules: number;
  progress: number;
  enrollmentDate: string;
  modulesList: Module[];
};

function MyCourses({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: string) => void }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      setCourses(user.courses || []);
    }
  }, []);

  const handleVideoComplete = (courseId: number, moduleId: string, videoId: string) => {
    setCourses(prevCourses => {
      const updatedCourses = prevCourses.map(course => {
        if (course.id === courseId) {
          const updatedModules = course.modulesList.map(module => {
            if (module.id === moduleId) {
              const updatedVideos = module.videos.map(video => {
                if (video.id === videoId) {
                  return { ...video, completed: true };
                }
                return video;
              });
              return {
                ...module,
                completed: updatedVideos.every(v => v.completed),
                videos: updatedVideos
              };
            }
            return module;
          });

          const totalVideos = course.modulesList.reduce(
            (sum, module) => sum + module.videos.length,
            0
          );
          const completedVideos = course.modulesList.reduce(
            (sum, module) => sum + module.videos.filter(v => v.completed).length,
            0
          );
          const progress = Math.round((completedVideos / totalVideos) * 100);

          return {
            ...course,
            modulesList: updatedModules,
            progress
          };
        }
        return course;
      });

      // Atualiza o localStorage
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.courses = updatedCourses;
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Atualiza a lista de usuários registrados
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const updatedUsers = users.map(u => 
          u.email === user.email ? user : u
        );
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      }

      return updatedCourses;
    });
  };

  return (
    <div className="flex-1 bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar para perfil
          </button>
          <button
            onClick={() => onNavigate('courses')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Explorar mais cursos
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Cursos</h1>

        {!selectedCourse ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div 
                key={course.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">{course.title}</h2>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-2">{course.company}</p>
                <p className="text-gray-500 mb-4">Instrutor: {course.instructor}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Progresso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 rounded-full h-2" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>{course.modules} módulos</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <button
              onClick={() => {
                setSelectedCourse(null);
                setCurrentVideo(null);
              }}
              className="text-blue-600 hover:text-blue-700 mb-6"
            >
              ← Voltar aos cursos
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedCourse.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="space-y-4">
                  {selectedCourse.modulesList.map(module => (
                    <div key={module.id} className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        {module.completed && (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        {module.title}
                      </h3>
                      <div className="space-y-2">
                        {module.videos.map(video => (
                          <button
                            key={video.id}
                            onClick={() => setCurrentVideo(video)}
                            className={`flex items-center w-full text-left p-2 rounded hover:bg-gray-50 ${
                              currentVideo?.id === video.id ? 'bg-blue-50' : ''
                            }`}
                          >
                            {video.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            ) : (
                              <PlayCircleIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                            )}
                            <span className="text-sm text-gray-600">{video.title}</span>
                            <span className="text-xs text-gray-400 ml-auto">{video.duration}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                {currentVideo ? (
                  <div className="space-y-4">
                    <div className="aspect-w-16 aspect-h-9">
                      <video
                        src={currentVideo.url}
                        controls
                        className="rounded-lg w-full"
                        onEnded={() => {
                          const currentModule = selectedCourse.modulesList.find(
                            module => module.videos.some(v => v.id === currentVideo.id)
                          );
                          if (currentModule) {
                            handleVideoComplete(
                              selectedCourse.id,
                              currentModule.id,
                              currentVideo.id
                            );
                          }
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{currentVideo.title}</h3>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Selecione um vídeo para começar
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourses; 