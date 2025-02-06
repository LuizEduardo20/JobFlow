import { SearchIcon, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import JobDetails from './JobDetails';
import { BookmarkIcon } from 'lucide-react';

type Video = {
  title: string;
  duration: string;
  url?: string;
  fileName?: string;
};

type Module = {
  title: string;
  videos: Video[];
};

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  status: string;
  modules?: Module[];
};

const defaultJobs: Job[] = [
  {
    id: 1,
    title: "Vendedor",
    company: "Magazine Center",
    location: "São Paulo, SP (Presencial)",
    salary: " 2-3k",
    description: "Procuramos vendedor com experiência em vendas de varejo e atendimento ao cliente...",
    skills: ["Vendas", "Atendimento", "Proatividade"],
    status: "Aberta"
  },
  {
    id: 2,
    title: "Desenvolvedor Frontend",
    company: "Digital Innovation Corp",
    location: "Rio de Janeiro, RJ (Híbrido)",
    salary: " 6-9k",
    description: "Procuramos desenvolvedor frontend para criar interfaces modernas e responsivas...",
    skills: ["React", "JavaScript", "CSS"],
    status: "Aberta",
    modules: [
      {
        title: "Introdução ao React",
        videos: [
          {
            title: "Fundamentos do React",
            duration: "15:00",
            url: "https://example.com/video1.mp4"
          },
          {
            title: "Componentes e Props",
            duration: "20:00",
            url: "https://example.com/video2.mp4"
          }
        ]
      },
      {
        title: "Hooks e Estado",
        videos: [
          {
            title: "useState e useEffect",
            duration: "25:00",
            url: "https://example.com/video3.mp4"
          },
          {
            title: "Custom Hooks",
            duration: "18:00",
            url: "https://example.com/video4.mp4"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Marketing Digital",
    company: "Agência Pulse",
    location: "Remoto",
    salary: " 4-6k",
    description: "Especialista em marketing digital para gerenciar campanhas e redes sociais...",
    skills: ["Social Media", "Analytics", "SEO"],
    status: "Aberta"
  },
  {
    id: 4,
    title: "Analista Financeiro",
    company: "Banco NextGen",
    location: "São Paulo, SP (Híbrido)",
    salary: " 5-7k",
    description: "Analista financeiro para gestão de relatórios e análise de dados bancários...",
    skills: ["Excel", "Power BI", "SQL"],
    status: "Aberta"
  },
  {
    id: 5,
    title: "Designer UX/UI",
    company: "Creative Tech",
    location: "Florianópolis, SC (Remoto)",
    salary: " 7-10k",
    description: "Designer para criar experiências digitais inovadoras e interfaces intuitivas...",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    status: "Aberta",
    modules: [
      {
        title: "Fundamentos de UX/UI",
        videos: [
          {
            title: "Introdução ao Design de Interfaces",
            duration: "20:00",
            url: "https://example.com/ux-video1.mp4"
          },
          {
            title: "Princípios de Usabilidade",
            duration: "25:00",
            url: "https://example.com/ux-video2.mp4"
          }
        ]
      },
      {
        title: "Prototipagem",
        videos: [
          {
            title: "Figma Básico",
            duration: "30:00",
            url: "https://example.com/ux-video3.mp4"
          },
          {
            title: "Criando Protótipos Interativos",
            duration: "35:00",
            url: "https://example.com/ux-video4.mp4"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Gerente de Projetos",
    company: "Consultoria Inova",
    location: "Belo Horizonte, MG (Presencial)",
    salary: " 8-12k",
    description: "Gerente de projetos com experiência em metodologias ágeis...",
    skills: ["Scrum", "Jira", "Liderança"],
    status: "Aberta"
  },
  {
    id: 7,
    title: "Analista de Dados",
    company: "Data Solutions",
    location: "Porto Alegre, RS (Híbrido)",
    salary: " 6-8k",
    description: "Analista para trabalhar com big data e business intelligence...",
    skills: ["Python", "SQL", "Tableau"],
    status: "Aberta",
    modules: [
      {
        title: "Introdução à Análise de Dados",
        videos: [
          {
            title: "Fundamentos de SQL",
            duration: "25:00",
            url: "https://example.com/data-video1.mp4"
          },
          {
            title: "Python para Análise de Dados",
            duration: "30:00",
            url: "https://example.com/data-video2.mp4"
          }
        ]
      },
      {
        title: "Visualização de Dados",
        videos: [
          {
            title: "Introdução ao Tableau",
            duration: "28:00",
            url: "https://example.com/data-video3.mp4"
          },
          {
            title: "Criando Dashboards Efetivos",
            duration: "32:00",
            url: "https://example.com/data-video4.mp4"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Recepcionista",
    company: "Hospital Central",
    location: "Curitiba, PR (Presencial)",
    salary: " 2-3k",
    description: "Recepcionista para atendimento em hospital, turno integral...",
    skills: ["Atendimento", "Organização", "Pacote Office"],
    status: "Aberta"
  },
  {
    id: 9,
    title: "DevOps Engineer",
    company: "Cloud Tech",
    location: "Recife, PE (Remoto)",
    salary: " 9-13k",
    description: "Engenheiro DevOps para automatização e gestão de infraestrutura...",
    skills: ["AWS", "Docker", "Jenkins"],
    status: "Aberta"
  },
  {
    id: 10,
    title: "Assistente Administrativo",
    company: "Grupo Empresarial",
    location: "Brasília, DF (Presencial)",
    salary: " 2.5-3.5k",
    description: "Assistente para rotinas administrativas e suporte à gestão...",
    skills: ["Excel", "Organização", "Comunicação"],
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
      job.description.toLowerCase().includes(searchLower) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchLower))
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
                  <p className="text-gray-500 mb-4">{job.location}</p>
                  <div className="flex gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-green-600 font-semibold">R$ {job.salary}</span>
              </div>
              <p className="text-gray-600 mb-4">{job.description.substring(0, 200)}...</p>
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
