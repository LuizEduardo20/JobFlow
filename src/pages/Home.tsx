import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface HomeProps {
  onNavigate?: (page: string) => void;
}

function Home({ onNavigate }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    // Cria uma nova vaga baseada no termo de busca
    const newJob: Job = {
      id: Date.now(), // ID único baseado no timestamp
      title: searchTerm,
      company: "Empresa em Destaque",
      location: "Local a definir",
      salary: "A combinar",
      description: `Vaga para ${searchTerm} com oportunidade de crescimento...`,
      skills: [searchTerm],
      status: "Aberta"
    };

    // Recupera vagas existentes ou inicializa array vazio
    const savedJobs = localStorage.getItem('jobs');
    const existingJobs = savedJobs ? JSON.parse(savedJobs) : [];

    // Adiciona nova vaga ao array
    const updatedJobs = [newJob, ...existingJobs];

    // Salva no localStorage
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));

    // Salva o termo de busca para usar na página de vagas
    localStorage.setItem('searchTerm', searchTerm);

    // Navega para a página de vagas
    onNavigate('jobs');
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bem-vindo ao JobFlow
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Facilitando sua vida profissional e educacional
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => onNavigate?.('jobs')} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
              Explorar Vagas
            </button>
            <button onClick={() => onNavigate?.('courses')} className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold">
              Ver Cursos
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar Vagas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button
              onClick={handleSearch} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Vagas em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <JobCard
              title="Desenvolvedor Front-end"
              company="Empresa XYZ"
              location="São Paulo, SP"
              description="Buscamos um desenvolvedor Front-end experiente em React e TypeScript."
              onNavigate={onNavigate}
            />
            <JobCard
              title="UX Designer"
              company="Empresa ABC"
              location="Rio de Janeiro, RJ"
              description="Procuramos um UX Designer criativo para liderar projetos inovadores."
              onNavigate={onNavigate}
            />
            <JobCard
              title="Analista de Dados"
              company="Empresa 123"
              location="Belo Horizonte, MG"
              description="Oportunidade para analista de dados com experiência em Big Data e BI."
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </section>

      {/* IFPI Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Projeto Desenvolvido por Alunos do IFPI</h2>
              <p className="text-gray-600 mb-6">
                O JobFlow é um projeto inovador criado por estudantes talentosos do 
                Instituto Federal do Piauí (IFPI), demonstrando o potencial e a criatividade dos 
                futuros profissionais de tecnologia.
              </p>
              <a
                href="https://www.ifpi.edu.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg inline-block hover:bg-gray-800"
              >
                Conheça o IFPI
              </a>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1186&q=80"
                alt="IFPI Campus"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-columns items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Impulsione sua carreira</h2>
              <p className="text-gray-300">
              Com o JobFlow, você tem acesso a um sistema completo de oportunidades profissionais e cursos profissionalizantes, cuidadosamente selecionados e divulgados diretamente pelas empresas do mercado. Nossa plataforma conecta você com as melhores vagas e recursos educacionais, permitindo que você desenvolva competências essenciais. Seja para encontrar seu próximo desafio profissional ou investir em sua qualificação, o JobFlow é seu parceiro ideal para impulsionar sua trajetória profissional</p>
            </div>
            <button
              onClick={() => onNavigate?.('register')}
              className="bg-white text-gray-900 my-10 px-8 py-3 rounded-lg font-semibold hover:bg-gray-500"
            >
              Cadastre-se Agora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  onNavigate?: (page: string) => void;
}

function JobCard({ title, company, location, description, onNavigate }: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{company}</p>
      <p className="text-gray-500 mb-4">{location}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <button
        onClick={() => onNavigate?.('jobs')}
        className="text-blue-600 font-semibold hover:text-blue-700"
      >
        Ver Detalhes
      </button>
    </div>
  );
}

export default Home;