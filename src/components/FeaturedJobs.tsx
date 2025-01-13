import React from 'react';
import { BriefcaseIcon, MapPinIcon, CurrencyIcon } from 'lucide-react';

const jobs = [
  {
    title: 'Desenvolvedor Frontend',
    company: 'TechCorp',
    location: 'São Paulo, SP',
    salary: 'R$ 8.000 - R$ 12.000',
    type: 'Tempo Integral',
  },
  {
    title: 'UX Designer Senior',
    company: 'Design Studios',
    location: 'Rio de Janeiro, RJ',
    salary: 'R$ 10.000 - R$ 15.000',
    type: 'Remoto',
  },
  {
    title: 'Desenvolvedor Backend',
    company: 'Startup Inc',
    location: 'Florianópolis, SC',
    salary: 'R$ 7.000 - R$ 11.000',
    type: 'Híbrido',
  },
];

const FeaturedJobs = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Vagas em Destaque</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4">{job.company}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <MapPinIcon size={18} className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <CurrencyIcon size={18} className="mr-2" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <BriefcaseIcon size={18} className="mr-2" />
                  <span>{job.type}</span>
                </div>
              </div>
              
              <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedJobs;