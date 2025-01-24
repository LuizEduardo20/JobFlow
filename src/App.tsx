import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CandidateProfile from './pages/CandidateProfile';
import MyCourses from './pages/MyCourses';
import LoginCompany from './pages/LoginCompany';
import RegisterCompany from './pages/RegisterCompany';
import CourseContent from './pages/CourseContent';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isUserLoggedIn');
    setIsLoggedIn(!!userLoggedIn);
  }, []);

  const handleNavigate = (page: string) => {
    if (page === 'login') {
      setIsLoggedIn(false);
    } else if (page === 'dashboard' || page === 'profile' || page === 'my-courses') {
      const userLoggedIn = localStorage.getItem('isUserLoggedIn');
      setIsLoggedIn(!!userLoggedIn);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'jobs':
        return selectedJob ? (
          <JobDetails 
            job={selectedJob} 
            onBack={() => setSelectedJob(null)} 
            onNavigate={handleNavigate} 
          />
        ) : (
          <Jobs 
            onSelectJob={setSelectedJob} 
            onNavigate={handleNavigate} 
          />
        );
      case 'courses':
        return selectedCourse ? (
          <CourseDetails 
            course={selectedCourse} 
            onBack={() => setSelectedCourse(null)} 
            onNavigate={handleNavigate} 
          />
        ) : (
          <Courses 
            onSelectCourse={setSelectedCourse} 
            onNavigate={handleNavigate} 
          />
        );
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'profile':
        return <CandidateProfile onNavigate={handleNavigate} />;
      case 'my-courses':
        return <MyCourses onBack={() => handleNavigate('profile')} onNavigate={handleNavigate} />;
      case 'course-content':
        return <CourseContent onBack={() => handleNavigate('my-courses')} onNavigate={handleNavigate} />;
      case 'loginCompany':
        return <LoginCompany onNavigate={handleNavigate} />;
      case 'registerCompany':
        return <RegisterCompany onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigate} />
      <div className={isLoggedIn ? "pt-16" : ""}>
        {renderPage()}
      </div>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;