import { useState, useEffect } from 'react';
import { PencilIcon, MapPinIcon, PhoneIcon, MailIcon, BriefcaseIcon, BookOpenIcon, LogOutIcon } from 'lucide-react';
import { Course } from './Courses';

type UserData = {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  courses?: number[];
  resume?: {
    name: string;
    type: string;
  };
};

function CandidateProfile({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [applications, setApplications] = useState<string[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserData | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    const userStr = localStorage.getItem('currentUser');

    if (!isUserLoggedIn || !userStr) {
      onNavigate('login');
      return;
    }

    const userDataFromStorage = JSON.parse(userStr);
    
    if (!userData || userData.id !== userDataFromStorage.id) {
      setUserData(userDataFromStorage);
      setEditForm(userDataFromStorage);
    }

    const coursesData = JSON.parse(localStorage.getItem('coursesData') || '[]');
    if (userDataFromStorage.courses && userDataFromStorage.courses.length > 0) {
      const userEnrolledCourses = coursesData.filter((course: Course) => 
        userDataFromStorage.courses.includes(course.id)
      );
      setEnrolledCourses(userEnrolledCourses);
    }

    const savedApplications = localStorage.getItem('applications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, [onNavigate, userData?.id]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isUserLoggedIn');
    onNavigate('login');
  };

  const handleSaveProfile = () => {
    if (editForm) {
      localStorage.setItem('currentUser', JSON.stringify(editForm));
      
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const updatedUsers = registeredUsers.map((user: UserData) => 
        user.id === editForm.id ? editForm : user
      );
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      setUserData(editForm);
      setIsEditing(false);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editForm) {
      setEditForm({
        ...editForm,
        resume: {
          name: file.name,
          type: file.type
        }
      });
    }
  };

  const loadUserData = () => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserData(user);
      if (user.courses) {
        setEnrolledCourses(user.courses);
      }
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="-mt-12 mb-4 sm:mb-0">
                <div className="inline-block h-20 w-20 sm:h-24 sm:w-24 rounded-full ring-4 ring-white bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl text-gray-600">
                    {userData?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full sm:flex-row sm:w-auto mt-4 sm:mt-6">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2.5 border border-blue-600 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2.5 border border-red-600 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Sair
                </button>
              </div>
            </div>
            {userData && !isEditing ? (
              <div className="mt-4 space-y-6">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{userData.name}</h1>
                  <div className="mt-2 space-y-2">
                    <p className="flex items-center text-gray-600">
                      <MailIcon className="h-4 w-4 mr-2" />
                      {userData.email}
                    </p>
                    {userData.phone && (
                      <p className="flex items-center text-gray-600">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        {userData.phone}
                      </p>
                    )}
                    {userData.location && (
                      <p className="flex items-center text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {userData.location}
                      </p>
                    )}
                  </div>
                </div>

                {(userData?.bio || (userData?.skills && userData.skills.length > 0)) && (
                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    {userData.bio && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Sobre mim</h2>
                        <p className="text-gray-600 whitespace-pre-line">{userData.bio}</p>
                      </div>
                    )}
                    {userData.skills && userData.skills.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Habilidades</h2>
                        <div className="flex flex-wrap gap-2">
                          {userData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-500" />
                    Minhas Candidaturas
                  </h2>
                  {applications.length > 0 ? (
                    <div className="space-y-3">
                      {applications.map((company, index) => (
                        <div
                          key={index}
                          className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100"
                        >
                          <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                            <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{company}</p>
                            <p className="text-sm text-gray-500">Candidatura enviada</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BriefcaseIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <p>Você ainda não se candidatou para nenhuma vaga.</p>
                      <button
                        onClick={() => onNavigate('jobs')}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Ver vagas disponíveis
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <BookOpenIcon className="h-5 w-5 mr-2 text-gray-500" />
                      Meus Cursos
                    </h2>
                    <button
                      onClick={() => onNavigate('my-courses')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Ver todos os cursos
                    </button>
                  </div>

                  {enrolledCourses.length > 0 ? (
                    <div className="space-y-3">
                      {enrolledCourses.slice(0, 3).map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100"
                        >
                          <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                            <BookOpenIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{course.title}</p>
                            <p className="text-sm text-gray-500">
                              Instrutor: {course.instructor || course.company}
                            </p>
                          </div>
                          <button
                            onClick={() => onNavigate('my-courses')}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Ver detalhes
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpenIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <button
                        onClick={() => onNavigate('courses')}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Ver cursos disponíveis
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-500" />
                    Currículo
                  </h2>
                  
                  {userData.resume ? (
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                          <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{userData.resume.name}</p>
                          <p className="text-sm text-gray-500">Curriculo</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Atualizar
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BriefcaseIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <p>Você ainda não enviou seu currículo.</p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Adicionar currículo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Editar Informações</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      value={editForm?.name || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev!, name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="tel"
                      value={editForm?.phone || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev!, phone: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                    <input
                      type="text"
                      value={editForm?.location || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev!, location: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sobre mim</label>
                    <textarea
                      value={editForm?.bio || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev!, bio: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Habilidades
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editForm?.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                        >
                          {skill}
                          <button
                            onClick={() => {
                              setEditForm(prev => ({
                                ...prev!,
                                skills: prev!.skills?.filter((_, i) => i !== index)
                              }));
                            }}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          if (skillInput.trim()) {
                            setEditForm(prev => ({
                              ...prev!,
                              skills: [...(prev!.skills || []), skillInput.trim()]
                            }));
                            setSkillInput('');
                          }
                        }
                      }}
                      placeholder="Digite uma habilidade e pressione Enter"
                      className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currículo (PDF)
                    </label>
                    <div className="mt-1">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleResumeUpload}
                        className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    {editForm?.resume && (
                      <p className="mt-2 text-sm text-gray-500">
                        Currículo atual: {editForm.resume.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateProfile;