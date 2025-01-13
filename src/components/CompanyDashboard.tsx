import React, { useState } from 'react';
import { Briefcase, GraduationCap, Users, Plus } from 'lucide-react';

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Desenvolvedor Frontend',
      description: 'Vaga para desenvolvedor frontend com experiência em React',
      requirements: ['React', 'TypeScript', '3 anos de experiência'],
      course: 'React Avançado',
      candidates: [
        { id: 1, name: 'João Silva', status: 'Em análise' },
        { id: 2, name: 'Maria Santos', status: 'Entrevista' }
      ]
    }
  ]);

  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requirements: '',
    course: ''
  });

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    setJobs([
      ...jobs,
      {
        id: jobs.length + 1,
        ...newJob,
        requirements: newJob.requirements.split(',').map(r => r.trim()),
        candidates: []
      }
    ]);
    setShowNewJobForm(false);
    setNewJob({ title: '', description: '', requirements: '', course: '' });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel da Empresa</h1>
        <button
          onClick={() => setShowNewJobForm(true)}
          className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <Plus size={20} className="mr-2" />
          Nova Vaga
        </button>
      </div>

      {showNewJobForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Publicar Nova Vaga</h2>
          <form onSubmit={handleAddJob} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título da Vaga
              </label>
              <input
                type="text"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requisitos (separados por vírgula)
              </label>
              <input
                type="text"
                value={newJob.requirements}
                onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Curso Recomendado (opcional)
              </label>
              <select
                value={newJob.course}
                onChange={(e) => setNewJob({ ...newJob, course: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Selecione um curso</option>
                <option value="React Avançado">React Avançado</option>
                <option value="UX/UI Design">UX/UI Design</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowNewJobForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Publicar Vaga
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{job.title}</h2>
            <p className="text-gray-600 mb-4">{job.description}</p>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Briefcase size={20} className="text-gray-400 mt-1" />
                <div>
                  <h3 className="font-medium">Requisitos:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {job.course && (
                <div className="flex items-center space-x-2">
                  <GraduationCap size={20} className="text-gray-400" />
                  <div>
                    <h3 className="font-medium">Curso Recomendado:</h3>
                    <p className="text-gray-600">{job.course}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-2">
                <Users size={20} className="text-gray-400 mt-1" />
                <div>
                  <h3 className="font-medium">Candidatos ({job.candidates.length}):</h3>
                  {job.candidates.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {job.candidates.map((candidate) => (
                        <li
                          key={candidate.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                        >
                          <span>{candidate.name}</span>
                          <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            {candidate.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">Nenhum candidato ainda</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;