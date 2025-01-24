import { ArrowLeft, BookOpenIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { Course } from './Courses';

type CourseDetailsProps = {
  course: Course;
  onBack: () => void;
  onNavigate: (page: string) => void;
};

function CourseDetails({ course, onBack, onNavigate }: CourseDetailsProps) {
  const handleEnroll = () => {
    const isLoggedIn = localStorage.getItem('isUserLoggedIn');
    
    if (!isLoggedIn) {
      onNavigate('login');
      return;
    }

    try {
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        const user = JSON.parse(userStr);
        
        // Prepara os dados do curso para salvar
        const courseData = {
          id: course.id,
          title: course.title,
          instructor: course.instructor,
          duration: course.duration,
          mode: course.mode,
          description: course.description,
          modulesList: course.modulesList,
          progress: 0,
          enrollmentDate: new Date().toISOString()
        };

        // Verifica se o usuário já está matriculado
        const userCourses = user.courses || [];
        if (!userCourses.some(c => c.id === courseData.id)) {
          // Atualiza os cursos do usuário
          user.courses = [...userCourses, courseData];
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Atualiza a lista de usuários registrados
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
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para cursos
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <p className="text-gray-600 mb-4">Instrutor: {course.instructor}</p>

            <div className="flex items-center gap-6 mb-6 text-gray-500">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5" />
                <span>{course.modules} módulos</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                <span>{course.mode}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Descrição do Curso</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>

            <button
              onClick={handleEnroll}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Matricular-se no Curso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;