import { useState, useEffect } from 'react';
import { SearchIcon, BookOpenIcon, ClockIcon, UsersIcon, PlayCircleIcon, XIcon } from 'lucide-react';
import CourseDetails from './CourseDetails';

export type Course = {
  id: number;
  title: string;
  description: string;
  duration: string;
  modules: number;
  mode: string;
  instructor: string;
  image: string;
  skills: string[];
  price: string;
  modulesList?: {
    id: number;
    title: string;
    videos: {
      id: number;
      title: string;
      duration: string;
      url: string;
    }[];
  }[];
};

const coursesData: Course[] = [
  {
    id: 1,
    title: "Desenvolvimento Web Full Stack",
    description: "Aprenda a criar aplicações web completas com as tecnologias mais demandadas do mercado.",
    duration: "120h",
    modules: 12,
    mode: "Online",
    instructor: "João Silva",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    price: "$100",
    modulesList: [
      {
        id: 1,
        title: "Introdução ao HTML e CSS",
        videos: [
          {
            id: 101,
            title: "Estrutura básica HTML",
            duration: "15:00",
            url: "https://example.com/video1.mp4"
          },
          {
            id: 102,
            title: "Estilização com CSS",
            duration: "20:00",
            url: "https://example.com/video2.mp4"
          }
        ]
      },
      {
        id: 2,
        title: "JavaScript Fundamentos",
        videos: [
          {
            id: 201,
            title: "Variáveis e Tipos",
            duration: "18:00",
            url: "https://example.com/video3.mp4"
          },
          {
            id: 202,
            title: "Funções e Objetos",
            duration: "25:00",
            url: "https://example.com/video4.mp4"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Marketing Digital",
    description: "Domine as principais estratégias de marketing digital e mídias sociais.",
    duration: "80h",
    modules: 8,
    mode: "Online",
    instructor: "Maria Santos",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a",
    skills: ["SEO", "Google Ads", "Facebook Ads", "Analytics"],
    price: "$80",
    modulesList: [
      {
        id: 1,
        title: "Fundamentos de Marketing Digital",
        videos: [
          {
            id: 301,
            title: "Introdução ao Marketing Digital",
            duration: "20:00",
            url: "https://example.com/marketing1.mp4"
          },
          {
            id: 302,
            title: "Estratégias de Conteúdo",
            duration: "25:00",
            url: "https://example.com/marketing2.mp4"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Design UX/UI",
    description: "Aprenda a criar interfaces intuitivas e experiências memoráveis para usuários.",
    duration: "100h",
    modules: 10,
    mode: "Híbrido",
    instructor: "Pedro Costa",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    price: "$100"
  },
  {
    id: 4,
    title: "Data Science e Machine Learning",
    description: "Aprenda análise de dados, estatística e algoritmos de machine learning para resolver problemas complexos.",
    duration: "160h",
    modules: 14,
    mode: "Online",
    instructor: "Ana Oliveira",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
    skills: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "Estatística"],
    price: "$160"
  },
  {
    id: 5,
    title: "Gestão de Projetos Ágeis",
    description: "Domine metodologias ágeis e ferramentas para gerenciar projetos de forma eficiente.",
    duration: "60h",
    modules: 6,
    mode: "Híbrido",
    instructor: "Ricardo Santos",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    skills: ["Scrum", "Kanban", "Lean", "Liderança", "Comunicação"],
    price: "$60"
  },
  {
    id: 6,
    title: "Cloud Computing AWS",
    description: "Aprenda a desenvolver e implantar aplicações na nuvem usando Amazon Web Services.",
    duration: "90h",
    modules: 8,
    mode: "Online",
    instructor: "Carlos Mendes",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    skills: ["AWS", "Docker", "Kubernetes", "DevOps", "Microserviços"],
    price: "$90"
  },
  {
    id: 7,
    title: "Desenvolvimento Mobile Flutter",
    description: "Crie aplicativos móveis multiplataforma com Flutter e Dart.",
    duration: "100h",
    modules: 10,
    mode: "Online",
    instructor: "Juliana Costa",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    skills: ["Flutter", "Dart", "UI/UX Mobile", "APIs", "Firebase"],
    price: "$100"
  },
  {
    id: 8,
    title: "Cibersegurança Essencial",
    description: "Aprenda fundamentos de segurança da informação e proteção de sistemas.",
    duration: "80h",
    modules: 8,
    mode: "Online",
    instructor: "Rafael Silva",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    skills: ["Segurança de Redes", "Criptografia", "Ethical Hacking", "Análise de Vulnerabilidades"],
    price: "$80"
  },
  {
    id: 9,
    title: "Análise de Dados com Excel",
    description: "Do básico ao avançado em análise de dados usando Microsoft Excel.",
    duration: "50h",
    modules: 5,
    mode: "Online",
    instructor: "Marina Rocha",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    skills: ["Excel Avançado", "Power Query", "VBA", "Dashboard", "Análise de Dados"],
    price: "$50"
  },
  {
    id: 10,
    title: "Soft Skills para Profissionais",
    description: "Desenvolva habilidades interpessoais essenciais para o mercado de trabalho.",
    duration: "40h",
    modules: 4,
    mode: "Híbrido",
    instructor: "Paulo Martins",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
    skills: ["Comunicação", "Liderança", "Trabalho em Equipe", "Resolução de Conflitos", "Gestão do Tempo"],
    price: "$40"
  }
];

function Courses({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const coursesPerPage = 6;

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      localStorage.removeItem('searchTerm');
    }
    
    localStorage.setItem('coursesData', JSON.stringify(coursesData));
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const getCurrentPageCourses = () => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCourseSelect = (course: Course) => {
    localStorage.setItem('currentCourse', JSON.stringify(course));
    onNavigate('course-content');
  };

  if (selectedCourse) {
    return (
      <CourseDetails 
        course={selectedCourse} 
        onBack={() => setSelectedCourse(null)}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="flex-1 bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cursos Profissionalizantes</h1>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentPageCourses().map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={course.image}
                alt={`${course.title} thumbnail`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center gap-4 text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpenIcon className="h-4 w-4" />
                    <span>{course.modules} módulos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UsersIcon className="h-4 w-4" />
                    <span>{course.mode}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => handleCourseSelect(course)}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-2">
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-gray-100'
              }`}
            >
              Anterior
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:bg-gray-100'
              }`}
            >
              Próxima
            </button>
          </nav>
        </div>
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            {selectedVideo ? (
              <div className="space-y-4">
                <div className="aspect-w-16 aspect-h-9">
                  <video
                    src={selectedVideo.url}
                    controls
                    className="rounded-lg w-full"
                    onEnded={() => {
                      console.log('Vídeo concluído:', selectedVideo.id);
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedVideo.title}</h3>
                  <span className="text-sm text-gray-500">{selectedVideo.duration}</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCourse.modulesList?.map((module) => (
                  <div 
                    key={module.id} 
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <h3 className="font-medium text-lg mb-4">{module.title}</h3>
                    <div className="space-y-2">
                      {module.videos.map((video) => (
                        <button
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className="flex items-center w-full p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <PlayCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-gray-700">{video.title}</span>
                          <span className="ml-auto text-sm text-gray-500">
                            {video.duration}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;