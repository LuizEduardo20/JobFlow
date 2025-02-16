import { SearchIcon, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import JobDetails from './JobDetails';

export interface Job {
  id: string;
  title: string;
  company: string;
  cidade?: string;
  estado?: string;
  salary?: string;
  tipo_contrato?: string;
  modalidade?: string;
  status?: string;
  skills?: string[];
  description?: string;
  requirements?: string;
  beneficios?: string[];
  recommendedCourses?: {
    id: string;
    title: string;
    instructor: string;
  }[];
  modules?: {
    id: string;
    title: string;
    videos: {
      id: string;
      title: string;
      duration: string;
      url: string;
    }[];
  }[];
}

type Video = {
  id: string;
  title: string;
  duration: string;
  url?: string;
  fileName?: string;
};

const defaultJobs: Job[] = [
  {
    id: "1",
    title: "Vendedor",
    company: "Magazine Center",
    cidade: "São Paulo",
    estado: "SP",
    salary: " 2-3k",
    description: "Procuramos vendedor com experiência em vendas de varejo e atendimento ao cliente...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Presencial",
    skills: ["Vendas", "Atendimento", "Proatividade"],
    beneficios: [],
    status: "Aberta"
  },
  {
    id: "2",
    title: "Desenvolvedor Frontend",
    company: "Digital Innovation Corp",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    salary: " 6-9k",
    description: "Procuramos desenvolvedor frontend para criar interfaces modernas e responsivas...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Híbrido",
    skills: ["React", "JavaScript", "CSS"],
    beneficios: [],
    status: "Aberta",
    modules: [
      {
        id: "react-module-1",
        title: "Introdução ao React",
        videos: [
          {
            id: "react-1",
            title: "Fundamentos do React",
            duration: "15:00",
            url: "https://example.com/video1.mp4"
          },
          {
            id: "react-2",
            title: "Componentes e Props",
            duration: "20:00",
            url: "https://example.com/video2.mp4"
          }
        ]
      },
      {
        id: "react-module-2",
        title: "Hooks e Estado",
        videos: [
          {
            id: "react-3",
            title: "useState e useEffect",
            duration: "25:00",
            url: "https://example.com/video3.mp4"
          },
          {
            id: "react-4",
            title: "Custom Hooks",
            duration: "18:00",
            url: "https://example.com/video4.mp4"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Marketing Digital",
    company: "Agência Pulse",
    cidade: "Remoto",
    estado: "",
    salary: " 4-6k",
    description: "Especialista em marketing digital para gerenciar campanhas e redes sociais...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Remoto",
    skills: ["Social Media", "Analytics", "SEO"],
    beneficios: [],
    status: "Aberta"
  },
  {
    id: "4",
    title: "Analista Financeiro",
    company: "Banco NextGen",
    cidade: "São Paulo",
    estado: "SP",
    salary: " 5-7k",
    description: "Analista financeiro para gestão de relatórios e análise de dados bancários...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Híbrido",
    skills: ["Excel", "Power BI", "SQL"],
    beneficios: [],
    status: "Aberta"
  },
  {
    id: "5",
    title: "Designer UX/UI",
    company: "Creative Tech",
    cidade: "Florianópolis",
    estado: "SC",
    salary: " 7-10k",
    description: "Designer para criar experiências digitais inovadoras e interfaces intuitivas...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Remoto",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    beneficios: [],
    status: "Aberta",
    modules: [
      {
        id: "ux-module-1",
        title: "Fundamentos de UX/UI",
        videos: [
          {
            id: "ux-1",
            title: "Introdução ao Design de Interfaces",
            duration: "20:00",
            url: "https://example.com/ux-video1.mp4"
          },
          {
            id: "ux-2",
            title: "Princípios de Usabilidade",
            duration: "25:00",
            url: "https://example.com/ux-video2.mp4"
          }
        ]
      },
      {
        id: "ux-module-2",
        title: "Prototipagem",
        videos: [
          {
            id: "ux-3",
            title: "Figma Básico",
            duration: "30:00",
            url: "https://example.com/ux-video3.mp4"
          },
          {
            id: "ux-4",
            title: "Criando Protótipos Interativos",
            duration: "35:00",
            url: "https://example.com/ux-video4.mp4"
          }
        ]
      }
    ]
  },
  {
    id: "6",
    title: "Gerente de Projetos",
    company: "Consultoria Inova",
    cidade: "Belo Horizonte",
    estado: "MG",
    salary: " 8-12k",
    description: "Gerente de projetos com experiência em metodologias ágeis...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Presencial",
    skills: ["Scrum", "Jira", "Liderança"],
    beneficios: [],
    status: "Aberta"
  },
  {
    id: "7",
    title: "Analista de Dados",
    company: "Data Solutions",
    cidade: "Porto Alegre",
    estado: "RS",
    salary: " 6-8k",
    description: "Analista para trabalhar com big data e business intelligence...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Híbrido",
    skills: ["Python", "SQL", "Tableau"],
    beneficios: [],
    status: "Aberta",
    modules: [
      {
        id: "data-module-1",
        title: "Introdução à Análise de Dados",
        videos: [
          {
            id: "data-1",
            title: "Fundamentos de SQL",
            duration: "25:00",
            url: "https://example.com/data-video1.mp4"
          },
          {
            id: "data-2",
            title: "Python para Análise de Dados",
            duration: "30:00",
            url: "https://example.com/data-video2.mp4"
          }
        ]
      },
      {
        id: "data-module-2",
        title: "Visualização de Dados",
        videos: [
          {
            id: "data-3",
            title: "Introdução ao Tableau",
            duration: "28:00",
            url: "https://example.com/data-video3.mp4"
          },
          {
            id: "data-4",
            title: "Criando Dashboards Efetivos",
            duration: "32:00",
            url: "https://example.com/data-video4.mp4"
          }
        ]
      }
    ]
  },
  {
    id: "8",
    title: "Recepcionista",
    company: "Hospital Central",
    cidade: "Curitiba",
    estado: "PR",
    salary: " 2-3k",
    description: "Recepcionista para atendimento em hospital, turno integral...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Presencial",
    skills: ["Atendimento", "Organização", "Pacote Office"],
    beneficios: [],
    status: "Aberta"
  },
  {
    id: "9",
    title: "DevOps Engineer",
    company: "Cloud Tech",
    cidade: "Recife",
    estado: "PE",
    salary: " 9-13k",
    description: "Engenheiro DevOps para automatização e gestão de infraestrutura...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Remoto",
    skills: ["AWS", "Docker", "Jenkins"],
    beneficios: [],
    status: "Aberta"
  },
  {
    id: "10",
    title: "Assistente Administrativo",
    company: "Grupo Empresarial",
    cidade: "Brasília",
    estado: "DF",
    salary: " 2.5-3.5k",
    description: "Assistente para rotinas administrativas e suporte à gestão...",
    requirements: "",
    tipo_contrato: "CLT",
    modalidade: "Presencial",
    skills: ["Excel", "Organização", "Comunicação"],
    beneficios: [],
    status: "Aberta"
  }
];

function Jobs({ onNavigate }: { onNavigate: (page: string, job?: Job) => void }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const jobsPerPage = 6;

  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs');
    const customJobs = savedJobs ? JSON.parse(savedJobs) : [];
    
    const allJobs = [...defaultJobs, ...customJobs];
    
    const sortedJobs = allJobs.sort((a, b) => b.id - a.id);
    
    setJobs(sortedJobs);

    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      localStorage.removeItem('searchTerm');
    }
  }, []);

  const filteredJobs = jobs.filter(job => {
    const searchLower = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      (job.description?.toLowerCase().includes(searchLower) || false) ||
      (job.skills?.some(skill => skill.toLowerCase().includes(searchLower)) || false)
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (selectedJob) {
    return (
      <JobDetails 
        job={selectedJob} 
        onBack={() => setSelectedJob(null)}
        onNavigate={onNavigate}
        onApply={(job) => {
          // Save the application to localStorage
          const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
          applications.push(job);
          localStorage.setItem('userApplications', JSON.stringify(applications));
          
          setSelectedJob(null);
          onNavigate('applications'); // Navigate to applications page
        }}
      />
    );
  }

  return (
    <div className="flex-1 bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vagas Disponíveis</h1>
        </div>

        <div className="mb-8">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar vagas por título, empresa ou habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {currentJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h2>
                    {job.modules && job.modules.length > 0 && (
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Curso Incluso
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-gray-500 mb-4">{job.cidade}, {job.estado}</p>
                  <div className="flex gap-2 mb-4">
                    {job.skills?.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-green-600 font-semibold">R$ {job.salary}</span>
              </div>
              <p className="text-gray-600 mb-4">{job.description?.substring(0, 200)}...</p>
              {job.modules && job.modules.length > 0 && (
                <div className="mt-4 flex items-center text-blue-600">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{job.modules.length} módulos disponíveis</span>
                </div>
              )}
              <button 
                onClick={() => setSelectedJob(job)}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
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
        )}
      </div>
    </div>
  );
}

export default Jobs;
