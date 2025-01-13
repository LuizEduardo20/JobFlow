import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedJobs from './components/FeaturedJobs';
import AboutProject from './components/AboutProject';
import Profile from './components/Profile';
import Courses from './components/Courses';
import CompanyArea from './components/CompanyArea';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
        {currentPage === 'profile' ? (
          <Profile />
        ) : currentPage === 'courses' ? (
          <Courses />
        ) : currentPage === 'company' ? (
          <CompanyArea />
        ) : (
          <>
            <Hero />
            <FeaturedJobs />
            <AboutProject />
          </>
        )}
      </div>
    </>
  );
}