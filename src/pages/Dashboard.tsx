import { BookmarkIcon, PlusIcon, XIcon, PencilIcon, MapPinIcon, PhoneIcon, MailIcon, BuildingIcon, LogOutIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

type Video = {
  title: string;
  duration: string;
  file: File | null;
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
  requirements: string;
  skills: string[];
  modules?: Module[];
  status: string;
};

interface FormData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
  skills: string[];
  modules: Module[];
}

interface DashboardProps {
  onNavigate: (page: string) => void;
}

function Dashboard({ onNavigate }: DashboardProps) {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    skills: [],
    modules: []
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [companyData, setCompanyData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const companyStr = localStorage.getItem('companyUser');
    if (companyStr) {
      const data = JSON.parse(companyStr);
      setCompanyData(data);
      setEditForm(data);
    }
  }, []);

  useEffect(() => {
    // Carrega os cursos disponíveis da empresa
    const coursesData = JSON.parse(localStorage.getItem('coursesData') || '[]');
    setAvailableCourses(coursesData);
  }, []);

  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const newJob: Job = {
        id: Date.now(),
        title: formData.title,
        company: 'Empresa Tecnologia LTDA',
        location: formData.location || 'Remoto',
        salary: formData.salary || 'A combinar',
        description: formData.description,
        requirements: formData.requirements,
        skills: formData.skills,
        status: 'Aberta'
      };

      if (formData.modules.length > 0) {
        newJob.modules = formData.modules.map(module => ({
          title: module.title,
          videos: module.videos.map(video => ({
            title: video.title,
            duration: video.duration,
            url: video.file ? URL.createObjectURL(video.file) : '',
            fileName: video.file?.name || ''
          }))
        }));
      }

      const updatedJobs = [...jobs, newJob];
      setJobs(updatedJobs);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));

      setShowPublishModal(false);
      setFormData({
        title: '',
        description: '',
        requirements: '',
        location: '',
        salary: '',
        skills: [],
        modules: []
      });

      alert('Vaga publicada com sucesso!');
    } catch (error) {
      console.error('Erro ao publicar vaga:', error);
      alert('Erro ao publicar a vaga. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('companyUser');
    localStorage.removeItem('isCompanyLoggedIn');
    onNavigate('home');
  };

  // Atualiza o contador de vagas baseado no array de jobs
  const totalJobs = jobs.length;

  const handleDeleteJob = (jobId: number) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setSelectedJob(null); // Fecha o modal após excluir
  };

  const handleSaveProfile = () => {
    if (editForm) {
      // Atualiza na lista de empresas registradas
      const companies = JSON.parse(localStorage.getItem('registeredCompanies') || '[]');
      const updatedCompanies = companies.map((company: any) => 
        company.id === editForm.id ? editForm : company
      );
      localStorage.setItem('registeredCompanies', JSON.stringify(updatedCompanies));
      
      // Atualiza usuário atual
      localStorage.setItem('companyUser', JSON.stringify(editForm));
      setCompanyData(editForm);
      setIsEditing(false);
    }
  };

  // Funções para gerenciar módulos
  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [
        ...prev.modules,
        { title: '', videos: [] }
      ]
    }));
  };

  const addVideo = (moduleIndex: number) => {
    setFormData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].videos = [
        ...newModules[moduleIndex].videos,
        { title: '', duration: '', file: null }
      ];
      return { ...prev, modules: newModules };
    });
  };

  const updateModule = (moduleIndex: number, title: string) => {
    setFormData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].title = title;
      return { ...prev, modules: newModules };
    });
  };

  const updateVideo = (
    moduleIndex: number,
    videoIndex: number,
    field: keyof Video,
    value: string | File
  ) => {
    setFormData(prev => {
      const newModules = [...prev.modules];
      if (field === 'file') {
        newModules[moduleIndex].videos[videoIndex].file = value as File;
      } else {
        newModules[moduleIndex].videos[videoIndex][field] = value as string;
      }
      return { ...prev, modules: newModules };
    });
  };

  const handleSaveCourse = () => {
    const courseData = {
      id: Date.now(),
      title: courseTitle,
      instructor: instructor || 'Sem Nome do Instrutor',
      modules: modules,
      // ... outros dados do curso ...
    };

    // ... lógica de salvamento ...
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button
              onClick={() => setShowPublishModal(true)}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Publicação
            </button>
            <button
              onClick={() => setShowProfileModal(true)}
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300"
            >
              <BuildingIcon className="h-5 w-5 mr-2" />
              Perfil da Empresa
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              <LogOutIcon className="h-5 w-5 mr-2" />
              Sair
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <BookmarkIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500">Total de Vagas</p>
                <p className="text-2xl font-semibold">{totalJobs}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600 mt-1">{job.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === 'Aberta' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {job.status}
                </span>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Descrição</h4>
                <p className="mt-1 text-gray-600">{job.description}</p>
              </div>

              {job.modules && job.modules.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Curso Incluído</h4>
                  <div className="mt-2">
                    <div className="flex items-center text-blue-600">
                      <BookmarkIcon className="h-5 w-5 mr-2" />
                      <span>{job.modules.length} módulos disponíveis</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedJob(job);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Detalhes da Vaga */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                  <p className="text-gray-600 mt-1">{selectedJob.company}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição da Vaga</h3>
                  <p className="text-gray-600 whitespace-pre-line">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Requisitos</h3>
                  <p className="text-gray-600 whitespace-pre-line">{selectedJob.requirements}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <button
                    onClick={() => handleDeleteJob(selectedJob.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Excluir Vaga
                  </button>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showPublishModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl">
              <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título da Vaga
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição da Vaga
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requisitos
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salário
                    </label>
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: R$ 3.000,00 ou A combinar"
                      required
                    />
                  </div>

                  {/* Seção de Módulos */}
                  <div className="border-t pt-6 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-lg font-medium text-gray-900">
                        Módulos do Curso
                      </label>
                      <button
                        type="button"
                        onClick={addModule}
                        className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50"
                      >
                        + Adicionar Módulo
                      </button>
                    </div>

                    <div className="space-y-6">
                      {formData.modules.map((module, moduleIndex) => (
                        <div
                          key={moduleIndex}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Título do Módulo {moduleIndex + 1}
                            </label>
                            <input
                              type="text"
                              value={module.title}
                              onChange={(e) => updateModule(moduleIndex, e.target.value)}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder="Ex: Introdução ao Curso"
                            />
                          </div>

                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <label className="text-sm font-medium text-gray-700">
                                Vídeos do Módulo
                              </label>
                              <button
                                type="button"
                                onClick={() => addVideo(moduleIndex)}
                                className="text-sm text-blue-600 hover:text-blue-700"
                              >
                                + Adicionar Vídeo
                              </button>
                            </div>

                            {module.videos.map((video, videoIndex) => (
                              <div
                                key={`${moduleIndex}-${videoIndex}`}
                                className="bg-white p-4 rounded-lg border border-gray-200 space-y-3"
                              >
                                <div>
                                  <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Título do Vídeo
                                  </label>
                                  <input
                                    type="text"
                                    value={video.title}
                                    onChange={(e) => updateVideo(moduleIndex, videoIndex, 'title', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: Introdução ao Módulo"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Duração
                                  </label>
                                  <input
                                    type="text"
                                    value={video.duration}
                                    onChange={(e) => updateVideo(moduleIndex, videoIndex, 'duration', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: 10:00"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Vídeo
                                  </label>
                                  <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) updateVideo(moduleIndex, videoIndex, 'file', file);
                                    }}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                  />
                                  {video.file && (
                                    <p className="mt-1 text-sm text-gray-500">
                                      Arquivo selecionado: {video.file.name}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowPublishModal(false)}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Publicando...' : 'Publicar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Perfil */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Editar Perfil da Empresa' : 'Perfil da Empresa'}
                </h2>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              {!isEditing ? (
                // Visualização do perfil
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{companyData?.name}</h3>
                      <p className="text-gray-500">{companyData?.segment}</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Editar
                    </button>
                  </div>

                  <div className="space-y-3">
                    <p className="flex items-center text-gray-600">
                      <BuildingIcon className="h-5 w-5 mr-2" />
                      CNPJ: {companyData?.cnpj}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <MailIcon className="h-5 w-5 mr-2" />
                      {companyData?.email}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      {companyData?.phone}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      {companyData?.address?.street}, {companyData?.address?.city} - {companyData?.address?.state}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Informações Adicionais</h4>
                    <p className="text-gray-600">Porte: {companyData?.companySize}</p>
                  </div>
                </div>
              ) : (
                // Formulário de edição
                <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
                    <input
                      type="text"
                      value={editForm?.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">CNPJ</label>
                    <input
                      type="text"
                      value={editForm?.cnpj || ''}
                      onChange={(e) => setEditForm({ ...editForm, cnpj: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Segmento</label>
                    <input
                      type="text"
                      value={editForm?.segment || ''}
                      onChange={(e) => setEditForm({ ...editForm, segment: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={editForm?.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                      type="tel"
                      value={editForm?.phone || ''}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Endereço</label>
                    <input
                      type="text"
                      value={editForm?.address?.street || ''}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        address: { ...editForm.address, street: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cidade</label>
                      <input
                        type="text"
                        value={editForm?.address?.city || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          address: { ...editForm.address, city: e.target.value }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estado</label>
                      <input
                        type="text"
                        value={editForm?.address?.state || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          address: { ...editForm.address, state: e.target.value }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;