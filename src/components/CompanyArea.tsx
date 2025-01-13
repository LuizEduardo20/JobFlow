import React, { useState } from 'react';
import CompanyLogin from './CompanyLogin';
import CompanyRegister from './CompanyRegister';
import CompanyDashboard from './CompanyDashboard';

const CompanyArea = () => {
  const [view, setView] = useState<'login' | 'register' | 'dashboard'>('login');
  
  const handleLogin = () => {
    setView('dashboard');
  };

  const handleRegister = () => {
    setView('dashboard');
  };

  if (view === 'login') {
    return <CompanyLogin onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />;
  }

  if (view === 'register') {
    return <CompanyRegister onRegister={handleRegister} onSwitchToLogin={() => setView('login')} />;
  }

  return <CompanyDashboard />;
};

export default CompanyArea;